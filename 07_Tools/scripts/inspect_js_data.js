const fs = require('fs');

function inspectJsData(dumpFile) {
  const data = JSON.parse(fs.readFileSync(dumpFile, 'utf8'));
  console.log(`\n======================================================`);
  console.log(`JS DATA IN: ${dumpFile}`);
  data.scripts.forEach((s, idx) => {
    console.log(`--- Script ${idx + 1} (Length: ${s.length}) ---`);
    // Find all const / let / var assignments
    const lines = s.split('\n');
    lines.forEach(l => {
      if (/^(const|let|var)\s+[a-zA-Z0-9_]+\s*=/i.test(l.trim())) {
        console.log('  ', l.trim().slice(0, 100));
      }
    });
  });
}

inspectJsData('tools/ch1_full_dump.json');
inspectJsData('tools/ch2_full_dump.json');
inspectJsData('tools/ch3_full_dump.json');
