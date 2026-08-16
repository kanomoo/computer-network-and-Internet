const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/```mermaid\s*sequenceDiagram[\s\S]*?```/g, (block) => {
    return block.replace(/:\s*"([^"]+)"/g, ': $1');
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Removed outer message quotes in all sequence diagrams');
