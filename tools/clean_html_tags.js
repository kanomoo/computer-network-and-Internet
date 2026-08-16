const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(f => {
  const filePath = path.join(wikiDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove any leftover html artifacts
  const oldLen = content.length;
  content = content.replace(/<article\b[^>]*>/gi, '');
  content = content.replace(/<\/article>/gi, '');
  content = content.replace(/<article\s*class="[^"]*"/gi, '');
  content = content.replace(/<article[^>]*$/gim, '');
  content = content.replace(/>\s*-\s*<article[^>\n]*/gi, '');
  content = content.replace(/>\s*-\s*allow-split/gi, '');
  content = content.replace(/allow-split/gi, '');
  
  // Clean up any empty bullets in callouts
  content = content.split('\n').filter(line => {
    if (/^>\s*-\s*$/.test(line.trim())) return false;
    if (/^>\s*,\s*$/.test(line.trim())) return false;
    return true;
  }).join('\n');

  if (content.length !== oldLen) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned HTML tags in ${f}`);
  }
});
