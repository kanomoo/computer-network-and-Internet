const fs = require('fs');

const data = JSON.parse(fs.readFileSync('tools/ch2_full_dump.json', 'utf8'));
console.log('Total sections in ch2:', data.sections.length);

data.sections.forEach((sec, i) => {
  console.log(`\n================== SECTION ${i + 1} ==================`);
  const text = sec.html.replace(/<style[\s\S]*?<\/style>/gi, '')
                       .replace(/<script[\s\S]*?<\/script>/gi, '')
                       .replace(/<[^>]+>/g, ' ')
                       .replace(/\s+/g, ' ')
                       .trim();
  console.log(text);
});
