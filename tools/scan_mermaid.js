const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(f => {
    const filePath = path.join(wikiDir, f);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find mermaid blocks
    const mermaidRegex = /```mermaid([\s\S]*?)```/g;
    let match;
    let index = 1;
    while ((match = mermaidRegex.exec(content)) !== null) {
        const diagram = match[1];
        // check for common mermaid syntax issues:
        // 1. Edge text with parentheses not quoted: e.g. -->|...(...) ...|
        const edgeWithParen = diagram.match(/--[->]\|[^"|\n]*\([^"|\n]*\|/g);
        if (edgeWithParen) {
            console.log(`[!] Potential Mermaid issue in ${f} (Diagram ${index}):`);
            console.log('    Edges with unquoted parens:', edgeWithParen);
        }
        index++;
    }
});
console.log('Mermaid scan completed.');
