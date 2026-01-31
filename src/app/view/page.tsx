'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle, X, Home } from 'lucide-react';
import Disqus from './Disqus';

function ViewerContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  
  const [data, setData] = useState<{ title: string; content: Array<{ type: 'image'; src: string } | { type: 'buttons'; items: { text: string; url: string }[] } | { type: 'text'; html: string }> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showLeftAd, setShowLeftAd] = useState(true);
  const [showRightAd, setShowRightAd] = useState(true);
  const [showBottomAd, setShowBottomAd] = useState(true);
  const [showSettledAd, setShowSettledAd] = useState(true);

  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!q) {
      setShortenedUrl(null);
      return;
    }

    const shortenUrl = async () => {
      try {
        const res = await fetch(`/api/shorten?url=${encodeURIComponent(q)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.shortenedUrl) {
            setShortenedUrl(json.shortenedUrl);
          }
        }
      } catch (err) {
        console.error('Failed to shorten URL:', err);
      }
    };

    shortenUrl();
  }, [q]);

  useEffect(() => {
    if (!q) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/read?url=${encodeURIComponent(q)}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await res.json();
        if (json.error) {
          throw new Error(json.error);
        }
        setData(json);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q]);

  if (!q) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p>No URL provided. Please go back home.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-blue-500">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="mt-4 text-gray-400">Loading your content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
        <AlertCircle className="w-12 h-12 mb-4" />
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Sidebar Ad: Left */}
      {showLeftAd && (
        <div className="fixed top-0 left-4 bottom-0 w-40 hidden xl:flex flex-col items-center justify-center pointer-events-none">
          <div className="pointer-events-auto relative group">
              <button 
                  onClick={(e) => { e.preventDefault(); setShowLeftAd(false); }}
                  className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-50 hover:bg-red-700"
                  aria-label="Close Ad"
              >
                <X size={16} />
              </button>
              <a href="/api/ad/click?url=https%3A%2F%2Fexe.io%2Fref%2Frunterya" target="_blank" rel="noopener noreferrer">
                  <img src="/api/ad/image?url=https%3A%2F%2Fexe.io%2Fimg%2Fref%2Fr6.png" title="CuT URLs - Earn money by shortening links with the highest CPMs Ever!" alt="Ad" className="w-full rounded-md shadow-lg" />
              </a>
          </div>
        </div>
      )}

      {/* Sidebar Ad: Right */}
      {showRightAd && (
        <div className="fixed top-0 right-4 bottom-0 w-40 hidden xl:flex flex-col items-center justify-center pointer-events-none">
          <div className="pointer-events-auto relative group">
              <button 
                  onClick={(e) => { e.preventDefault(); setShowRightAd(false); }}
                  className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-50 hover:bg-red-700"
                  aria-label="Close Ad"
              >
                <X size={16} />
              </button>
              <a href="/api/ad/click?url=https%3A%2F%2Fexe.io%2Fref%2Frunterya" target="_blank" rel="noopener noreferrer">
                  <img src="/api/ad/image?url=https%3A%2F%2Fexe.io%2Fimg%2Fref%2Fr3.gif" title="CuT URLs - Earn money by shortening links with the highest CPMs Ever!" alt="Ad" className="w-full rounded-md shadow-lg" />
              </a>
          </div>
        </div>
      )}

      {/* Sticky Bottom Banner (Mobile/Tablet) */}
      {showBottomAd && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center bg-black/90 backdrop-blur border-t border-gray-800 p-2 xl:hidden">
          <button 
              onClick={(e) => { e.preventDefault(); setShowBottomAd(false); }}
              className="absolute -top-3 right-2 bg-red-600 text-white rounded-full p-1 shadow-md z-50 hover:bg-red-700"
              aria-label="Close Ad"
          >
            <X size={20} />
          </button>
          <a href="/api/ad/click?url=https%3A%2F%2Fexe.io%2Fref%2Frunterya" target="_blank" rel="noopener noreferrer" className="block w-full max-w-[728px]">
              <img 
                src="/api/ad/image?url=https%3A%2F%2Fexe.io%2Fimg%2Fref%2Fr4.png" 
                title="CuT URLs - Earn money by shortening links with the highest CPMs Ever!" 
                alt="Ad" 
                className="w-full h-auto rounded-md shadow-lg" 
              />
          </a>
        </div>
      )}

      <main className="max-w-3xl mx-auto bg-black shadow-2xl min-h-screen">
        <div className="relative p-4 pb-2 text-center border-b border-gray-800 flex items-center justify-center">
          <a href="/" className="absolute left-4 text-gray-400 hover:text-white transition-colors" aria-label="Go Home">
            <Home size={24} />
          </a>
          <a href={shortenedUrl || q} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-400 transition-colors">
            <h1 className="text-lg sm:text-xl font-bold break-words whitespace-normal">{data.title}</h1>
          </a>
        </div>

        <div className="flex flex-col items-center">
          
          {showSettledAd && (
            <div className="pointer-events-auto relative group pt-2 mb-2">
              <button 
                onClick={(e) => { e.preventDefault(); setShowSettledAd(false); }}
                className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-50 hover:bg-red-700"
                aria-label="Close Ad"
              >
                <X size={16} />
              </button>
                <a href="/api/ad/click?url=https%3A%2F%2Fexe.io%2Fref%2Frunterya" target="_blank" rel="noopener noreferrer">
                  <img src="/api/ad/image?url=https%3A%2F%2Fexe.io%2Fimg%2Fref%2Fr1.gif" title="CuT URLs - Earn money by shortening links with the highest CPMs Ever!" alt="Ad" className="w-full rounded-md shadow-lg" />
                </a>
            </div>
          )}


          {data.content.map((block, index) => {
            if (block.type === 'image') {
              return (
                <img
                  key={index}
                  src={block.src}
                  alt={`Content ${index + 1}`}
                  className="w-full block"
                  loading="lazy"
                  style={{ minHeight: '100px', backgroundColor: '#1a1a1a' }}
                />
              );
            } else if (block.type === 'buttons') {
              return (
                <div key={index} className="flex w-full rounded-md overflow-hidden">
                  {block.items.map((btn, btnIndex) => (
                    <a
                      key={btnIndex}
                      href={btn.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 px-2 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors border-r border-blue-800 last:border-r-0 truncate"
                    >
                      {btn.text}
                    </a>
                  ))}
                </div>
              );
            } else if (block.type === 'text') {
              return (
                <div 
                  key={index} 
                  className="px-4 py-2 text-lg leading-relaxed text-gray-300 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              );
            }
            return null;
          })}

          {showSettledAd && (
            <div className="pointer-events-auto relative group">
              <button 
                onClick={(e) => { e.preventDefault(); setShowSettledAd(false); }}
                className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-50 hover:bg-red-700"
                aria-label="Close Ad"
              >
                <X size={16} />
              </button>
                <a href="/api/ad/click?url=https%3A%2F%2Fexe.io%2Fref%2Frunterya" target="_blank" rel="noopener noreferrer">
                  <img src="/api/ad/image?url=https%3A%2F%2Fexe.io%2Fimg%2Fref%2Fr4.png" title="CuT URLs - Earn money by shortening links with the highest CPMs Ever!" alt="Ad" className="w-full rounded-md shadow-lg" />
                </a>
            </div>
          )}

          <Disqus 
            url={`https://telegraview.vercel.app/view?q=${encodeURIComponent(q)}`} 
            identifier={q} 
            title={data.title} 
          />

        </div>
      </main>
    </div>
  );
}

export default function ViewerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <ViewerContent />
    </Suspense>
  );
}
