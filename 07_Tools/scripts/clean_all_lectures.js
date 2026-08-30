const fs = require('fs');

function cleanLectureFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove article tags
  content = content.replace(/<article\b[^>]*>/gi, '');
  content = content.replace(/<\/article>/gi, '');
  content = content.replace(/allow-split/gi, '');
  content = content.replace(/\[IMAGE\]/g, '');

  // Clean lines
  let lines = content.split('\n');
  let newLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Remove lines that are just numbers or raw section headers
    if (/^\d{2}$/.test(line.trim())) continue;
    if (/^สไลด์ \d+[-–]\d+$/.test(line.trim())) continue;
    if (/^<article/i.test(line.trim())) continue;
    if (/>\s*-\s*<article/i.test(line.trim())) continue;
    if (/>\s*-\s*allow-split/i.test(line.trim())) continue;

    // Fix empty callout bullets
    if (/>\s*-\s*$/.test(line.trim())) continue;
    if (/>\s*,\s*$/.test(line.trim())) continue;

    newLines.push(line);
  }

  content = newLines.join('\n');

  // Fix multiple consecutive newlines
  content = content.replace(/\n{4,}/g, '\n\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned ${filePath} -> ${content.length} chars, ${content.split('\n').length} lines`);
}

['Wiki/Lecture 3 - Application Layer Protocols and Architectures.md', 'Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md'].forEach(cleanLectureFile);
