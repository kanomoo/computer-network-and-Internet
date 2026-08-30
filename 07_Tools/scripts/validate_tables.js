const fs = require('fs');
const path = require('path');
const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

let totalErrors = 0;

files.forEach(file => {
  const content = fs.readFileSync(path.join(wikiDir, file), 'utf8');
  const lines = content.split('\n');
  let inCode = false;
  let errors = [];
  
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    
    // Check table header + separator
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.split('|').length >= 3) {
      const nextLine = (i + 1 < lines.length) ? lines[i + 1].trim() : '';
      // Is this a table header?
      if (/^\|[\s:|-]+\|$/.test(nextLine)) {
        // Count columns
        const headerCols = trimmed.split('|').length - 2; // minus first/last empty
        const sepCols = nextLine.split('|').length - 2;
        if (headerCols !== sepCols) {
          errors.push('L' + (i+1) + ': Column mismatch header=' + headerCols + ' sep=' + sepCols);
        }
        
        // Check blank line before table
        if (i > 0 && lines[i - 1].trim() !== '' && !lines[i - 1].trim().startsWith('>')) {
          errors.push('L' + (i+1) + ': No blank line before table');
        }
        
        // Check data rows have same column count
        for (let j = i + 2; j < lines.length; j++) {
          const dataLine = lines[j].trim();
          if (!dataLine.startsWith('|') || !dataLine.endsWith('|')) break;
          const dataCols = dataLine.split('|').length - 2;
          if (dataCols !== headerCols) {
            errors.push('L' + (j+1) + ': Data row has ' + dataCols + ' cols, expected ' + headerCols);
          }
        }
      }
    }
  }
  
  if (errors.length > 0) {
    console.log('❌ ' + file + ':');
    errors.forEach(e => console.log('   ' + e));
    totalErrors += errors.length;
  }
});

if (totalErrors === 0) {
  console.log('✅ All tables in all Wiki files are valid!');
} else {
  console.log('\n❌ Total errors: ' + totalErrors);
}
