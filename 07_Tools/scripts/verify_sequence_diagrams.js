const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

let issues = 0;

files.forEach(file => {
  const content = fs.readFileSync(path.join(wikiDir, file), 'utf8');
  const mermaidBlocks = content.match(/```mermaid[\s\S]*?```/g) || [];

  mermaidBlocks.forEach((block, idx) => {
    if (block.includes('sequenceDiagram')) {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      let seenRect = false;
      lines.forEach((l, lIdx) => {
        if (l.startsWith('rect ')) seenRect = true;
        if (l.startsWith('actor ') || l.startsWith('participant ')) {
          if (seenRect) {
            console.log(`[WARNING] In ${file} (Block ${idx+1}): actor/participant inside or after rect at line ${lIdx}: ${l}`);
            issues++;
          }
        }
        if (l.includes('[') && l.includes(']') && (l.includes('->>') || l.includes('-->>'))) {
          console.log(`[WARNING] In ${file} (Block ${idx+1}): potential bracket in sequence message: ${l}`);
          issues++;
        }
      });
    }
  });
});

console.log(`Checked all sequence diagrams. Issues found: ${issues}`);
