const fs = require('fs');
const path = require('path');
const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(wikiDir, file), 'utf8');
  const lines = content.split('\n');
  let inCode = false;
  let openLine = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        openLine = i + 1;
      } else {
        inCode = false;
        openLine = -1;
      }
    }
  }
  
  if (inCode) {
    console.log('[UNCLOSED CODE BLOCK] ' + file + ' opened at line ' + openLine);
  }
});

// Now check for callout block issues (> [!...] syntax)
files.forEach(file => {
  const content = fs.readFileSync(path.join(wikiDir, file), 'utf8');
  const lines = content.split('\n');
  let inCode = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('```')) inCode = !inCode;
    if (inCode) continue;
    
    // Check for > [! with missing ]
    if (/^>\s*\[!/.test(lines[i]) && !/^>\s*\[![A-Z]+\]/.test(lines[i])) {
      console.log('[BAD CALLOUT] ' + file + ':' + (i+1) + ' -> ' + lines[i].substring(0, 60));
    }
  }
});

console.log('Code block and callout check complete.');
