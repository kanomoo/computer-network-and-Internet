const fs = require('fs');

const ch1Data = JSON.parse(fs.readFileSync('tools/ch1_parsed.json', 'utf8'));

console.log('--- SLIDE 3 ---');
console.log(ch1Data[2].text);
console.log('\n--- SLIDE 7 ---');
console.log(ch1Data[6].text);
console.log('\n--- SLIDE 18 ---');
console.log(ch1Data[17].text);
