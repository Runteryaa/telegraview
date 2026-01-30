
const cheerio = require('cheerio');

// Mock resolveUrl
const resolveUrl = (link) => link;

function parseContent(html) {
    const $ = cheerio.load(html);
    const content = [];

    // Simulate the loop in route.ts
    const root = $('body'); 

    root.children().each((_, element) => {
      const el = $(element);
      const tagName = element.tagName.toLowerCase();

      // Logic from route.ts
      if (['p', 'h3', 'h4', 'blockquote', 'aside', 'ul', 'ol'].includes(tagName)) {
        const textContent = el.text().trim();
        
        console.log(`Analyzing <${tagName}> content: "${textContent}"`);
        console.log(`Hex dump:`, Buffer.from(textContent).toString('hex'));

        // Markdown Check
        const markdownLinkRegex = /\ \[([^\]]+)\]\(([^)]+)\)/g;
        const remainingAfterMarkdown = textContent.replace(markdownLinkRegex, '').replace(/\s/g, '');
        
        console.log(`Remaining after Markdown strip: "${remainingAfterMarkdown}" (Length: ${remainingAfterMarkdown.length})`);

        if (remainingAfterMarkdown.length === 0 && textContent.match(markdownLinkRegex)) {
            console.log('-> DETECTED AS MARKDOWN BUTTONS');
            return;
        }

        // HTML Check
        const cloneForCheck = el.clone();
        const linkCount = cloneForCheck.find('a').length;
        cloneForCheck.find('a').remove();
        cloneForCheck.find('br').remove();
        const remainingText = cloneForCheck.text().replace(/\s/g, '');

        console.log(`Remaining after HTML strip: "${remainingText}" (Length: ${remainingText.length})`);

        if (linkCount > 0 && remainingText.length === 0) {
           console.log('-> DETECTED AS HTML BUTTONS');
        } else {
           console.log('-> DETECTED AS TEXT');
        }
      }
    });
}

console.log('--- Test Case 1: Simple Markdown ---');
parseContent('<p>[Test](http://url)</p>');

console.log('\n--- Test Case 2: Markdown with non-breaking space ---');
parseContent('<p>[Test](http://url)&nbsp;</p>');

console.log('\n--- Test Case 3: Markdown with Zero Width Space (simulation) ---');
// Simulating typical copy-paste artifact
parseContent('<p>[Test](http://url)\u200B</p>');

console.log('\n--- Test Case 4: HTML Link with nbsp ---');
parseContent('<p><a href="foo">Link</a>&nbsp;</p>');

console.log('\n--- Test Case 5: HTML Link with surrounding newlines ---');
parseContent('<p>\n<a href="foo">Link</a>\n</p>');
