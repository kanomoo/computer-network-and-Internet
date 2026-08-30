const fs = require('fs');

const ch2 = JSON.parse(fs.readFileSync('tools/ch2_parsed.json', 'utf8'));

console.log('Total items in ch2:', ch2.length);
console.log('Item 0:', ch2[0].slideNum, ch2[0].title);
console.log('Item 1:', ch2[1].slideNum, ch2[1].title);
console.log('Item 2:', ch2[2].slideNum, ch2[2].title);
console.log('Item 3:', ch2[3].slideNum, ch2[3].title);
