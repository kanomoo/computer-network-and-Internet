const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk('05_Wiki');
console.log('Found ' + files.length + ' markdown files.');

let issues = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  let inMermaid = false;
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('```mermaid')) {
      inMermaid = true;
    } else if (inMermaid && trimmed.startsWith('```')) {
      inMermaid = false;
    } else if (inMermaid) {
      // Check arrow after pipe: |===>, |--->, |==>, |-->
      if (/\|={1,}>/.test(trimmed) || /\|-{1,}>/.test(trimmed)) {
        console.log('[ARROW AFTER PIPE]', f, 'Line ' + (idx + 1) + ':', trimmed);
        issues++;
      }
      // Check for <===| or <---|
      if (/<={1,}\|/.test(trimmed) || /<-{1,}\|/.test(trimmed)) {
        console.log('[ARROW BEFORE PIPE]', f, 'Line ' + (idx + 1) + ':', trimmed);
        issues++;
      }
      // Check for <===> or <--->
      if (/<={3,}>/.test(trimmed) || /<-{3,}>/.test(trimmed)) {
        console.log('[EXTRA EQUALS BIDIRECTIONAL]', f, 'Line ' + (idx + 1) + ':', trimmed);
        issues++;
      }
    }
  });
});

console.log('Total issues found: ' + issues);
