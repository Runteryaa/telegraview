'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, ArrowRight, X, ExternalLink, Zap } from 'lucide-react';

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
          <h1 className="text-4xl font-extrabold tracking-tight">
            TelegraView
          </h1>
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
            <p>Paste a link like <code>https://telegra.ph/TelegraView-02-02</code></p>
        </div>

        {/* --- RECOMMENDED USERSCRIPTS SECTION --- */}
        <div className="pt-6">
          <div className="grid gap-3">
            <a 
              href="https://greasyfork.org/en/scripts/564741-openin-telegraview"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-gray-900 transition-all"
            >
              <div>
                <p className="text-sm font-medium text-gray-200 group-hover:text-blue-400 transition-colors">OpenIn Telegraview</p>
                <p className="text-xs text-gray-500 mt-1">you can use Open in TelegraView userscript to easily open the pages in TelegraView</p>
              </div>
              <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-400 mt-1" />
            </a>

            <a 
              href="https://greasyfork.org/en/scripts/564934-telegra-ph-imagebb-uploader"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-blue-500/50 hover:bg-gray-900 transition-all"
            >
              <div>
                <p className="text-sm font-medium text-gray-200 group-hover:text-blue-400 transition-colors">Telegra.ph ImageBB Uploader</p>
                <p className="text-xs text-gray-500 mt-1">you can use Telegra.ph image uploader to upload images with TelegraView feature</p>
              </div>
              <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-400 mt-1" />
            </a>
          </div>
        </div>
        {/* --- END SECTION --- */}
      </div>
    </div>
  );
}
