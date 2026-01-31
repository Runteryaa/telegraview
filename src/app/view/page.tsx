'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';

function ViewerContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  
  const [data, setData] = useState<{ title: string; content: Array<{ type: 'image'; src: string } | { type: 'buttons'; items: { text: string; url: string }[] } | { type: 'text'; html: string }> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      {/* Ad Placeholder: Top of Page */}
      {/* <div id="ad-top" className="w-full h-24 bg-gray-800 flex items-center justify-center text-xs text-gray-500">Ad Space (Top)</div> */}
      
      <main className="max-w-3xl mx-auto bg-black shadow-2xl min-h-screen">
        <div className="p-4 text-center border-b border-gray-800">
          <h1 className="text-lg sm:text-xl font-bold break-words whitespace-normal">{data.title}</h1>
        </div>

        <div className="flex flex-col">
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
        </div>
      </main>

      {/* Ad Placeholder: Bottom of Page */}
      {/* <div id="ad-bottom" className="w-full h-24 bg-gray-800 flex items-center justify-center text-xs text-gray-500 mt-8">Ad Space (Bottom)</div> */}
      
      {/* Ad Placeholder: Pop-under */}
      {/* <script> // Pop-under script would go here </script> */}
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
