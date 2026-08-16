const fs = require('fs');

function dumpCompleteChapter(filePath, outPath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract all inline script variables (data models)
  const scripts = [];
  const sRe = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let sm;
  while ((sm = sRe.exec(content)) !== null) {
    scripts.push(sm[1]);
  }

  // Extract all section content with clean formatting
  const sections = [];
  const secRe = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
  let secm;
  while ((secm = secRe.exec(content)) !== null) {
    sections.push({
      attributes: secm[1],
      html: secm[2]
    });
  }

  fs.writeFileSync(outPath, JSON.stringify({ filePath, scriptCount: scripts.length, scripts, sectionCount: sections.length, sections }, null, 2));
  console.log(`Saved ${outPath}: ${sections.length} sections, ${scripts.length} scripts`);
}

dumpCompleteChapter('New/ch1.html', 'tools/ch1_full_dump.json');
dumpCompleteChapter('New/ch2.html', 'tools/ch2_full_dump.json');
dumpCompleteChapter('New/ch3.html', 'tools/ch3_full_dump.json');
