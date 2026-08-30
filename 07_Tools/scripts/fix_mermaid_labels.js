const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace mermaid blocks
  content = content.replace(/```mermaid\s*([\s\S]*?)```/g, (match, code) => {
    let lines = code.split('\n');
    let newLines = lines.map(line => {
      let l = line;
      // Match patterns like NodeId[Text with & or / or ()] where Text does not start with quote
      l = l.replace(/\b([A-Za-z0-9_]+)\[([^"\]\n]+)\]/g, (nMatch, id, label) => {
        if (label.includes('&') || label.includes('/') || label.includes('(') || label.includes(')') || label.includes('#') || label.includes(';')) {
          changed = true;
          // Escape inner quotes if any
          const cleanLabel = label.replace(/"/g, "'");
          return `${id}["${cleanLabel}"]`;
        }
        return nMatch;
      });
      return l;
    });
    return '```mermaid\n' + newLines.join('\n') + '\n```';
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated quoted node labels in ${file}`);
  }
});
