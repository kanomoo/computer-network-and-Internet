const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Normalize line endings to \n
  content = content.replace(/\r\n/g, '\n');

  // 2. Fix table separators: |:---| to | :--- |
  content = content.replace(/\|:---/g, '| :---');
  content = content.replace(/---\|/g, '--- |');

  // 3. Ensure blank line before tables
  content = content.replace(/([^\n])\n(\|[^\n]+\|\n\|[\s:\-\|]+\|)/g, '$1\n\n$2');

  // 4. Ensure blank line after tables
  content = content.replace(/(\|[^\n]+\|)\n([^\n\|])/g, '$1\n\n$2');

  // 5. Ensure blank line before and after code blocks
  content = content.replace(/([^\n])\n(```[^\n]*\n)/g, '$1\n\n$2');
  content = content.replace(/(\n```)\n([^\n])/g, '$1\n\n$2');

  // 6. Ensure blank line before and after callout blocks
  content = content.replace(/([^\n])\n(> \[![A-Z]+\])/g, '$1\n\n$2');

  // 7. Strip trailing spaces
  content = content.split('\n').map(l => l.trimEnd()).join('\n');

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Deep cleaned and formatted all markdown files across Wiki');
