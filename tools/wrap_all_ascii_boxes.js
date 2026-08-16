const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to find contiguous ASCII diagrams starting with +--- or +-+-+
  // that are NOT already in ``` blocks
  let lines = content.split('\n');
  let newLines = [];
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];

    if (l.trim().startsWith('```')) {
      inCode = !inCode;
      newLines.push(l);
      continue;
    }

    if (!inCode) {
      if (l.trim().startsWith('+-') || l.trim().startsWith('+=')) {
        // Start of ASCII packet/box diagram!
        // Collect all contiguous lines of this box
        let boxLines = [];
        while (i < lines.length && (lines[i].trim().startsWith('+') || lines[i].trim().startsWith('|') || lines[i].trim().startsWith('\\') || lines[i].trim().startsWith('/'))) {
          boxLines.push(lines[i]);
          i++;
        }
        i--; // step back one line

        newLines.push('');
        newLines.push('```');
        boxLines.forEach(bl => newLines.push(bl));
        newLines.push('```');
        newLines.push('');
        continue;
      }
    }

    newLines.push(l);
  }

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
});

console.log('Wrapped all bare ASCII diagrams across all Wiki files');
