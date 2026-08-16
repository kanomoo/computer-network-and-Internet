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

    lines.forEach(l => {
      let trimmed = l.trim();

      // Remove rect rgb and its corresponding end if it wraps sequence
      if (trimmed.startsWith('rect rgb') || trimmed.startsWith('rect rgba')) {
        return; // skip rect
      }

      // Quote actor/participant alias if not already quoted
      if (trimmed.startsWith('actor ') || trimmed.startsWith('participant ')) {
        // match: actor/participant <id> as <alias>
        const match = trimmed.match(/^(actor|participant)\s+([A-Za-z0-9_]+)\s+as\s+(.*)$/);
        if (match) {
          const type = match[1];
          const id = match[2];
          let alias = match[3].trim();
          // strip existing outer quotes if any
          alias = alias.replace(/^"(.*)"$/, '$1');
          // clean any bad characters or just wrap cleanly in double quotes
          newLines.push(`    ${type} ${id} as "${alias}"`);
          return;
        }
      }

      newLines.push(l);
    });

    return newLines.join('\n');
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Successfully quoted all participant and actor aliases across all Wiki files');
