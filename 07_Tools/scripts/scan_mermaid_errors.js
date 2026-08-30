const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

console.log('Scanning all files for invalid mermaid link syntax...');

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let inMermaid = false;
  let mermaidStartLine = 0;

  lines.forEach((line, idx) => {
    if (line.trim().startsWith('```mermaid')) {
      inMermaid = true;
      mermaidStartLine = idx + 1;
    } else if (inMermaid && line.trim().startsWith('```')) {
      inMermaid = false;
    } else if (inMermaid) {
      // Check for bad link syntax: arrows with quotes directly on them without pipe |...|
      // e.g. <===="text"====> or ===="text"====> or ----"text"----> or ---"text"--->
      if (/[=\-]{2,}"[^"]+"[=\-]{2,}>?/.test(line) || /<[=\-]{2,}"[^"]+"[=\-]{2,}>?/.test(line)) {
        console.log(`[SYNTAX ERROR] in ${file} at line ${idx + 1}: ${line.trim()}`);
      }
      // Check for <===> without pipe or improper double arrows
      if (/<={4,}/.test(line) && !line.includes('|')) {
        console.log(`[SUSPICIOUS ARROW] in ${file} at line ${idx + 1}: ${line.trim()}`);
      }
      // Check for parentheses inside unquoted node names
      // e.g. id[Some (text)] without quotes inside []
      const unquotedParenMatch = line.match(/\[([A-Za-z0-9_\s]+)\s*\(([^\]]+)\)\s*\]/);
      if (unquotedParenMatch && !line.includes('["') && !line.includes("['")) {
        console.log(`[UNQUOTED PARENTHESES] in ${file} at line ${idx + 1}: ${line.trim()}`);
      }
    }
  });
});
