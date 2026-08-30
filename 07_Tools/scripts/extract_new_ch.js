const fs = require('fs');
const path = require('path');

function extractHtmlContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('Extracting:', filePath);
  
  // Extract all script variables or data objects
  const jsData = [];
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let sMatch;
  while ((sMatch = scriptRegex.exec(content)) !== null) {
    const scriptCode = sMatch[1];
    // Find const/let/var definitions
    const varMatches = scriptCode.match(/(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(\[[\s\S]*?\]|\{[\s\S]*?\});/g);
    if (varMatches) {
      jsData.push(...varMatches);
    }
  }

  // Extract sections
  const sections = [];
  const secRegex = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
  let secMatch;
  while ((secMatch = secRegex.exec(content)) !== null) {
    const attrs = secMatch[1];
    const body = secMatch[2];
    const id = (attrs.match(/id=[\"']([^\"']+)[\"']/) || [])[1] || '';
    const h1 = (body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
    const h2 = (body.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i) || [])[1] || '';
    const h3 = (body.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i) || [])[1] || '';
    
    // Clean text
    const text = body.replace(/<script[\s\S]*?<\/script>/gi, '')
                     .replace(/<style[\s\S]*?<\/style>/gi, '')
                     .replace(/<[^>]+>/g, ' ')
                     .replace(/\s+/g, ' ')
                     .trim();
                     
    sections.push({ id, h1: h1.replace(/<[^>]+>/g, '').trim(), h2: h2.replace(/<[^>]+>/g, '').trim(), h3: h3.replace(/<[^>]+>/g, '').trim(), textLength: text.length, textSnippet: text.slice(0, 300) });
  }

  return { filePath, jsDataCount: jsData.length, jsDataSnippet: jsData.map(d => d.slice(0, 60)), sectionsCount: sections.length, sections };
}

const res1 = extractHtmlContent('New/ch1.html');
const res2 = extractHtmlContent('New/ch2.html');
const res3 = extractHtmlContent('New/ch3.html');

fs.writeFileSync('tools/new_ch_extracted.json', JSON.stringify({ res1, res2, res3 }, null, 2));
console.log('Saved tools/new_ch_extracted.json');
