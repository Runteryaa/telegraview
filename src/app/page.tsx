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
      {/* Ads remain the same... */}
      {/* [Left Ad, Right Ad, and Bottom Ad blocks remain here] */}

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-900/50">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Telegraview
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

        {/* --- RECOMMENDED USERSCRIPTS SECTION --- */}
        <div className="mt-10 pt-6 border-t border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-gray-300">
            <Zap size={18} className="text-yellow-500" />
            <h2 className="text-sm font-semibold uppercase tracking-wider">Enhance your experience</h2>
          </div>
          
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

        <div className="text-center text-xs text-gray-600 mt-8">
            <p>Paste a link like <code>https://telegra.ph/TelegraView-02-02</code></p>
        </div>
      </div>
    </div>
  );
}
