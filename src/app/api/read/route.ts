import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the page: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract Title
    const title = $('h1').first().text().trim() || $('title').text().trim() || 'Untitled';

    // Extract Content (Images, Buttons, Text)
    const content: ({ type: 'image'; src: string } | { type: 'buttons'; items: { text: string; url: string }[] } | { type: 'text'; html: string })[] = [];
    
    // Helper to resolve relative URLs
    const resolveUrl = (link: string | undefined) => {
      if (!link) return null;
      return link.startsWith('/') ? `https://telegra.ph${link}` : link;
    };

    // Locate the main content container
    const container = $('.tl_article_content').first().length ? $('.tl_article_content').first() : ($('article').length ? $('article').first() : $('body'));

    container.children().each((_, element) => {
      const el = $(element);
      const tagName = element.tagName.toLowerCase();

      // Case 1: Direct Image or Figure containing Image
      if (tagName === 'img' || tagName === 'figure') {
        const img = tagName === 'img' ? el : el.find('img').first();
        if (img.length) {
          const rawSrc = img.attr('src');
          const src = resolveUrl(rawSrc);
          if (src) {
            content.push({ type: 'image', src });
          }
        }
        return; 
      }

      // Case 2: Paragraphs and other text blocks
      if (['p', 'h3', 'h4', 'blockquote', 'aside', 'ul', 'ol'].includes(tagName)) {
        const textContent = el.text().trim();
        
        // Sub-Case 2a: Markdown-style Button Row
        const markdownLinkRegex = /\[([^\]]+)\]\s*\(([^)]+)\)/g;
        const invisibleCharRegex = /[\s\u200B-\u200D\uFEFF]/g;
        const remainingAfterMarkdown = textContent.replace(markdownLinkRegex, '').replace(invisibleCharRegex, '');
        
        const isMarkdownMatch = textContent.match(markdownLinkRegex);
        
        if (remainingAfterMarkdown.length === 0 && isMarkdownMatch) {
          const buttons: { text: string; url: string }[] = [];
          let match;
          while ((match = markdownLinkRegex.exec(textContent)) !== null) {
            const btnText = match[1].trim();
            const rawUrl = match[2].trim();
            const url = resolveUrl(rawUrl);
            if (url) {
              buttons.push({ text: btnText, url });
            }
          }
          if (buttons.length > 0) {
            content.push({ type: 'buttons', items: buttons });
            return;
          }
        }

        // Sub-Case 2b: Standard Text Block (Fallback)
        const contentClone = el.clone();
        contentClone.find('img').each((_, img) => {
            const $img = $(img);
            const src = resolveUrl($img.attr('src'));
            if (src) $img.attr('src', src);
        });
        contentClone.find('a').each((_, a) => {
            const $a = $(a);
            const href = resolveUrl($a.attr('href'));
            if (href) $a.attr('href', href);
        });
        
        content.push({ type: 'text', html: contentClone.html() || '' });
      }
    });

    return NextResponse.json({ title, content });
  } catch (error: any) {
    console.error('Scraping error:', error);
    return NextResponse.json({ error: 'Failed to scrape the URL', details: error.message }, { status: 500 });
  }
}
