const fs = require('fs');

// Inspect New/ch1.html, ch2.html, ch3.html complete data structures
function analyzeNewCh() {
  ['tools/ch1_full_dump.json', 'tools/ch2_full_dump.json', 'tools/ch3_full_dump.json'].forEach(dumpFile => {
    const data = JSON.parse(fs.readFileSync(dumpFile, 'utf8'));
    console.log(`\n======================================================`);
    console.log(`ANALYZING: ${data.filePath}`);
    
    // Look at JS data in script
    data.scripts.forEach((s, idx) => {
      // Find arrays of questions, steps, topologies, dataflows
      console.log(`Script ${idx + 1} size: ${s.length}`);
      const matches = s.match(/(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(\[[^\]]*\]|\{[^\}]*\})/g) || [];
      console.log('Short object definitions:', matches.slice(0, 15));
    });
  });
}

analyzeNewCh();
