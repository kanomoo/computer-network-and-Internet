const fs = require('fs');

const data = JSON.parse(fs.readFileSync('tools/ch3_full_dump.json', 'utf8'));
console.log('Total sections in ch3:', data.sections.length);

data.sections.forEach((sec, i) => {
  const text = sec.html.replace(/<style[\s\S]*?<\/style>/gi, '')
                       .replace(/<script[\s\S]*?<\/script>/gi, '')
                       .replace(/<[^>]+>/g, ' ')
                       .replace(/\s+/g, ' ')
                       .trim();
  console.log(`[Section ${i+1}] ${text.slice(0, 150)}...`);
});
