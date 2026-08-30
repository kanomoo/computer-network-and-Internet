const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace square brackets inside sequence diagram messages
  content = content.replace(/```mermaid\s*sequenceDiagram[\s\S]*?```/g, (block) => {
    let lines = block.split('\n');
    let newLines = [];
    let actors = [];
    let insideRect = false;

    // First pass: extract actors declared inside rect or later
    lines.forEach(l => {
      let trimmed = l.trim();
      if (trimmed.startsWith('actor ') || trimmed.startsWith('participant ')) {
        // clean emoji or special symbols in alias
        actors.push(l);
      }
    });

    lines.forEach(l => {
      let trimmed = l.trim();

      // If actor was declared inside block, don't repeat here if we put it at top
      if (trimmed.startsWith('actor ') || trimmed.startsWith('participant ')) {
        return; // will be placed at top
      }

      if (trimmed === 'sequenceDiagram') {
        newLines.push(l);
        // Put all actors right after sequenceDiagram (or autonumber)
        return;
      }
      if (trimmed === 'autonumber') {
        newLines.push(l);
        actors.forEach(a => newLines.push('    ' + a.trim()));
        return;
      }

      // Sanitize brackets in message arrows (->>, -->>, -)
      if (l.includes('->>') || l.includes('-->>') || l.includes('->') || l.includes('--)')) {
        let sanitized = l.replace(/\[/g, '(').replace(/\]/g, ')');
        newLines.push(sanitized);
      } else {
        newLines.push(l);
      }
    });

    // If autonumber wasn't there, insert actors after sequenceDiagram
    if (!block.includes('autonumber') && actors.length > 0) {
      let seqIdx = newLines.findIndex(l => l.trim() === 'sequenceDiagram');
      if (seqIdx !== -1) {
        newLines.splice(seqIdx + 1, 0, ...actors.map(a => '    ' + a.trim()));
      }
    }

    return newLines.join('\n');
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Sanitized all sequence diagrams in Wiki');
