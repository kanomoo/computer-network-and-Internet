const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix ASCII packet diagrams that have +-+-+- lines not in code blocks
  // Find lines starting with +-+-+ or +-----+ that are not inside ``` code blocks
  let lines = content.split('\n');
  let newLines = [];
  let inCode = false;
  let inAsciiBox = false;

  for (let i = 0; i < lines.length; i++) {
    let l = lines[i];

    if (l.trim().startsWith('```')) {
      inCode = !inCode;
      newLines.push(l);
      continue;
    }

    if (!inCode) {
      const isAsciiBorder = /^\s*\+[\-\+\s\|]+\+\s*$/.test(l) || /^\s*\+[\-]+\+\s*$/.test(l);
      const isAsciiRow = /^\s*\|[^\n]+\|\s*$/.test(l) && (l.includes('+-+-+') || l.includes('bits') || l.includes('Address') || l.includes('IPv4') || l.includes('IPv6') || l.includes('Bytes') || l.includes('Octets'));

      if ((isAsciiBorder || isAsciiRow) && !inAsciiBox) {
        // Check if next line is also ascii box border/row
        if (isAsciiBorder) {
          inAsciiBox = true;
          newLines.push('');
          newLines.push('```');
          newLines.push(l);
          continue;
        }
      } else if (inAsciiBox) {
        newLines.push(l);
        if (isAsciiBorder) {
          // check if next line is not border or row
          let next = lines[i + 1] ? lines[i + 1].trim() : '';
          if (!next.startsWith('+') && !next.startsWith('|')) {
            inAsciiBox = false;
            newLines.push('```');
            newLines.push('');
          }
        }
        continue;
      }
    }

    newLines.push(l);
  }

  if (inAsciiBox) {
    newLines.push('```');
    newLines.push('');
  }

  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
});

console.log('Successfully wrapped all ASCII diagrams in code blocks');
