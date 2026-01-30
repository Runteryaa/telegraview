import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  console.log(`[API] Fetching: ${url}`);

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
    console.log(`[API] Title: ${title}`);

    // Extract Content (Images, Buttons, Text)
    const content: ({ type: 'image'; src: string } | { type: 'buttons'; items: { text: string; url: string }[] } | { type: 'text'; html: string })[] = [];
    
    // Helper to resolve relative URLs
    const resolveUrl = (link: string | undefined) => {
      if (!link) return null;
      return link.startsWith('/') ? `https://telegra.ph${link}` : link;
    };

    // Locate the main content container
    const container = $('.tl_article_content').first().length ? $('.tl_article_content').first() : ($('article').length ? $('article').first() : $('body'));
    console.log(`[API] Container found: ${container.get(0)?.tagName}, Children: ${container.children().length}`);

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
          console.log(`[API] Potential Markdown Buttons detected in <${tagName}>`);
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
          } else {
            console.log(`[API] Markdown buttons detected but extraction failed.`);
          }
        }

        // Sub-Case 2b: HTML Button Row
        const cloneForCheck = el.clone();
        const linkCount = cloneForCheck.find('a').length;
        cloneForCheck.find('a').remove();
        cloneForCheck.find('br').remove();
        const remainingText = cloneForCheck.text().replace(invisibleCharRegex, '');

        if (linkCount > 0 && remainingText.length === 0) {
          console.log(`[API] HTML Buttons detected in <${tagName}>`);
          const buttons: { text: string; url: string }[] = [];
          el.find('a').each((_, aTag) => {
            const a = $(aTag);
            const rawHref = a.attr('href');
            const url = resolveUrl(rawHref);
            if (url) {
              buttons.push({ text: a.text().trim(), url });
            }
          });
          if (buttons.length > 0) {
            content.push({ type: 'buttons', items: buttons });
          } else {
             console.log(`[API] HTML buttons detected but none resolved.`);
             // If validation fails, we should technically fall through to text, 
             // but here we just drop it or it falls to the next block?
             // Actually, if we are here, we skip the 'else'.
          }
        } else {
          // Sub-Case 2c: Standard Text Block
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
      }
    });

    console.log(`[API] Final content count: ${content.length}`);
    return NextResponse.json({ title, content });
  } catch (error: any) {
    console.error('Scraping error:', error);
    return NextResponse.json({ error: 'Failed to scrape the URL', details: error.message }, { status: 500 });
  }
}
