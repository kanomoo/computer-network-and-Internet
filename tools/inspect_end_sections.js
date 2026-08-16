const fs = require('fs');

['tools/ch1_full_dump.json', 'tools/ch2_full_dump.json', 'tools/ch3_full_dump.json'].forEach(f => {
  const data = JSON.parse(fs.readFileSync(f, 'utf8'));
  console.log(`\n================== ${f} DETAILED HTML & DATA ==================`);
  data.sections.forEach((sec, idx) => {
    // Check if section contains quiz, match, activity, review
    if (idx >= data.sections.length - 6 || /quiz|match|scenario|order|check/i.test(sec.html)) {
      console.log(`\n--- Section ${idx+1} ---`);
      // print full innerHTML (or clean text)
      const text = sec.html.replace(/<style[\s\S]*?<\/style>/gi, '')
                           .replace(/<script[\s\S]*?<\/script>/gi, '')
                           .replace(/<[^>]+>/g, ' ')
                           .replace(/\s+/g, ' ')
                           .trim();
      console.log(text);
    }
  });
});
