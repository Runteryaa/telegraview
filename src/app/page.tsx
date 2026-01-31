'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, ArrowRight, X } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter();
  
  const [showLeftAd, setShowLeftAd] = useState(true);
  const [showRightAd, setShowRightAd] = useState(true);
  const [showBottomAd, setShowBottomAd] = useState(true);

  const handleRead = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      router.push(`/view?q=${encodeURIComponent(url.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Sidebar Ad: Left */}
      {showLeftAd && (
        <div className="fixed top-0 left-4 bottom-0 w-40 hidden xl:flex flex-col items-center justify-center pointer-events-none">
          <div className="pointer-events-auto relative group">
              <button 
                  onClick={(e) => { e.preventDefault(); setShowLeftAd(false); }}
                  className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 hover:bg-red-700"
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
                  className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 hover:bg-red-700"
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

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-900/50">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Telegraph Proxy
          </h1>
          <p className="mt-2 text-gray-400">
            Read Telegra.ph articles in a seamless vertical scroll.
          </p>
        </div>

        <form onSubmit={handleRead} className="mt-8 space-y-4">
          <div className="rounded-md shadow-sm">
            <input
              type="url"
              required
              placeholder="Paste Telegra.ph URL here..."
              className="appearance-none relative block w-full px-4 py-4 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRight className="h-5 w-5 text-blue-300 group-hover:text-blue-100 transition-colors" />
              </span>
              Read Now
            </button>
          </div>
        </form>
        
        <div className="text-center text-xs text-gray-600 mt-8">
            <p>Paste a link like <code>https://telegra.ph/Your-Article-Title-12-34</code></p>
        </div>
      </div>
    </div>
  );
}