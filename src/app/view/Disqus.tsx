'use client';

import { DiscussionEmbed } from 'disqus-react';

interface DisqusProps {
  url: string;
  identifier: string;
  title: string;
}

export default function Disqus({ url, identifier, title }: DisqusProps) {
  const shortname = 'telegraview'; // REPLACE THIS with your Disqus shortname

  const disqusConfig = {
    url: url,
    identifier: identifier, // Use the same identifier
    title: title,
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 mt-8 bg-black/50 rounded-lg">
      <DiscussionEmbed
        shortname={shortname}
        config={disqusConfig}
      />
    </div>
  );
}