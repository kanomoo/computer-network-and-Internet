const fs = require('fs');

function inspectDump(dumpFile) {
  const data = JSON.parse(fs.readFileSync(dumpFile, 'utf8'));
  console.log(`\n======================================================`);
  console.log(`DUMP: ${dumpFile} (File: ${data.filePath})`);
  
  data.sections.forEach((sec, idx) => {
    console.log(`\n--- Section ${idx + 1} ---`);
    // Extract title/headings
    const headings = sec.html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi) || [];
    headings.forEach(h => console.log('  H:', h.replace(/<[^>]+>/g, '').trim()));
    
    // Extract plain text snippet
    const text = sec.html.replace(/<style[\s\S]*?<\/style>/gi, '')
                         .replace(/<script[\s\S]*?<\/script>/gi, '')
                         .replace(/<[^>]+>/g, ' ')
                         .replace(/\s+/g, ' ')
                         .trim();
    console.log('  Text length:', text.length);
    console.log('  Text sample:', text.slice(0, 300));
  });
}

inspectDump('tools/ch1_full_dump.json');
