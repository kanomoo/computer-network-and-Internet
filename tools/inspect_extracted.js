const fs = require('fs');

function inspectExtracted() {
  const data = JSON.parse(fs.readFileSync('tools/new_ch_extracted.json', 'utf8'));
  ['res1', 'res2', 'res3'].forEach(k => {
    const item = data[k];
    console.log('==============================================');
    console.log(`FILE: ${item.filePath}, Sections: ${item.sectionsCount}, JS Data objects: ${item.jsDataCount}`);
    item.sections.forEach((s, idx) => {
      console.log(`  [Sec ${idx+1}] ID: ${s.id || 'none'} | H1: ${s.h1} | H2: ${s.h2} | H3: ${s.h3} (chars: ${s.textLength})`);
    });
  });
}
inspectExtracted();
