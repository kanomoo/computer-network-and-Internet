const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/```mermaid\s*sequenceDiagram[\s\S]*?```/g, (block) => {
    let lines = block.split('\n');
    let newLines = [];
    let openBlocks = 0;

    lines.forEach(l => {
      let trimmed = l.trim();

      if (trimmed.startsWith('alt ') || trimmed.startsWith('loop ') || trimmed.startsWith('opt ') || trimmed.startsWith('par ') || trimmed.startsWith('critical ') || trimmed.startsWith('rect ') || trimmed.startsWith('break ')) {
        openBlocks++;
        newLines.push(l);
        return;
      }

      if (trimmed === 'end') {
        if (openBlocks > 0) {
          openBlocks--;
          newLines.push(l);
        } else {
          // Dangling end without opening block! Drop it!
          console.log(`Dropped dangling 'end' in ${file}`);
        }
        return;
      }

      newLines.push(l);
    });

    return newLines.join('\n');
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Fixed all sequenceDiagram dangling end keywords');
