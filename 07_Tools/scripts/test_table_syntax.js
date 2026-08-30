const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

let totalTables = 0;
let tableErrors = 0;

files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let inCode = false;
  let inTable = false;
  let tableHeaderCols = 0;
  let tableStartLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      continue;
    }

    if (inCode) continue;

    // A real markdown table row starts with | and ends with | and does not look like an ascii border (+-+-+)
    const isTableRow = line.trim().startsWith('|') && line.trim().endsWith('|') && !line.includes('+-+-+') && !line.includes('+---+');

    if (isTableRow) {
      if (!inTable) {
        // Table start
        inTable = true;
        totalTables++;
        tableStartLine = i + 1;
        // Count columns in header
        tableHeaderCols = line.split('|').length - 2;

        // Check blank line before table
        if (i > 0 && lines[i - 1].trim() !== '' && !lines[i - 1].trim().startsWith('#') && !lines[i - 1].trim().startsWith('>')) {
          console.log(`[TABLE ERROR] ${file}:${tableStartLine} - Missing blank line before table! Line above: "${lines[i - 1]}"`);
          tableErrors++;
        }
      } else {
        // Delimiter or row check
        const cols = line.split('|').length - 2;
        if (cols !== tableHeaderCols) {
          console.log(`[TABLE ERROR] ${file}:${i + 1} - Column count mismatch! Expected ${tableHeaderCols}, got ${cols}: "${line}"`);
          tableErrors++;
        }
      }
    } else {
      if (inTable) {
        inTable = false;
        // Check blank line after table
        if (line.trim() !== '' && !line.trim().startsWith('#') && !line.trim().startsWith('>')) {
          console.log(`[TABLE ERROR] ${file}:${i + 1} - Missing blank line after table! Line: "${line}"`);
          tableErrors++;
        }
      }
    }
  }
});

console.log(`\n--- TABLE SYNTAX AUDIT RESULT ---`);
console.log(`Total Tables Checked: ${totalTables}`);
console.log(`Total Table Errors Found: ${tableErrors}`);
