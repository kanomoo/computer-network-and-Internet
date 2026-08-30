const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

console.log('Deep scanning all mermaid blocks across all wiki files...');

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract all mermaid blocks
  const mermaidRegex = /```mermaid\s*([\s\S]*?)```/g;
  let match;
  let blockIndex = 0;

  while ((match = mermaidRegex.exec(content)) !== null) {
    blockIndex++;
    const code = match[1];
    const lines = code.split('\n');
    
    lines.forEach((line, lIdx) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('%%') || trimmed.startsWith('subgraph') || trimmed.startsWith('end') || trimmed.startsWith('autonumber') || trimmed.startsWith('actor') || trimmed.startsWith('participant') || trimmed.startsWith('Note') || trimmed.startsWith('box')) {
        return;
      }
      
      // Check for arrows with quotes directly on them
      if (/[<=-]{2,}"[^"]+"[=>-]{2,}/.test(trimmed)) {
        console.log(`[SYNTAX ERROR in ${file} (Block ${blockIndex}, line ${lIdx+1})]: ${trimmed}`);
      }
      // Check for unquoted node labels with parentheses or brackets
      // e.g. Node1[Title (Extra)] or Node1(Title [Extra])
      const badNodeMatch = trimmed.match(/\b([A-Za-z0-9_]+)\[([^"\]]+)\]/);
      if (badNodeMatch) {
        const inner = badNodeMatch[2];
        if ((inner.includes('(') || inner.includes(')') || inner.includes('[') || inner.includes(']') || inner.includes('"') || inner.includes('#') || inner.includes('&') || inner.includes(';')) && !inner.startsWith('"')) {
          console.log(`[UNQUOTED SPECIAL CHARS in ${file} (Block ${blockIndex}, line ${lIdx+1})]: ${trimmed}`);
        }
      }
    });
  }
});
