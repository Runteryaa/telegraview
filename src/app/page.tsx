'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleRead = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      router.push(`/view?q=${encodeURIComponent(url.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-900/50">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Webtoon Proxy
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