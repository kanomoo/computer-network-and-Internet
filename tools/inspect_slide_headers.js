const fs = require('fs');

['tools/ch1_parsed.json', 'tools/ch2_parsed.json', 'tools/ch3_parsed.json'].forEach(f => {
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  console.log(`\n========================================`);
  console.log(`FILE: ${f} (Total slides: ${data.length})`);
  console.log(`First 5 slides:`);
  data.slice(0, 5).forEach(s => console.log(`  Slide ${s.slideNum}: ${s.title} (${s.text.length} chars)`));
  console.log(`Last 5 slides:`);
  data.slice(-5).forEach(s => console.log(`  Slide ${s.slideNum}: ${s.title} (${s.text.length} chars)`));
});
