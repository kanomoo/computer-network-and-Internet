const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for non-breaking spaces or strange unicode
  if (/[\u00a0\u200b\u200e\u200f\ufeff]/.test(content)) {
    console.log(`[UNICODE ISSUE] in ${file}: contains non-breaking or zero-width spaces!`);
  }

  const mermaidBlocks = content.match(/```mermaid[\s\S]*?```/g) || [];
  mermaidBlocks.forEach((block, idx) => {
    // Check if block has bad chars
    const lines = block.split('\n');
    lines.forEach((l, lIdx) => {
      // Check for unclosed brackets or quotes
      const openQuotes = (l.match(/"/g) || []).length;
      if (openQuotes % 2 !== 0) {
        console.log(`[UNBALANCED QUOTES] in ${file} (Block ${idx+1}, line ${lIdx}): ${l}`);
      }
      const openBrackets = (l.match(/\[/g) || []).length;
      const closeBrackets = (l.match(/\]/g) || []).length;
      if (openBrackets !== closeBrackets) {
        console.log(`[UNBALANCED BRACKETS] in ${file} (Block ${idx+1}, line ${lIdx}): ${l}`);
      }
    });
  });
});

console.log('Checked all files for unicode and syntax issues.');
