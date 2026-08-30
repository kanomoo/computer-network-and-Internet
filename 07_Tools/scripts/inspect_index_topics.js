const fs = require('fs');

const content = fs.readFileSync('computer-network-course/index.html', 'utf8');
// Let's find sections or tabs or topics
const titles = content.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi) || [];
console.log('Total headings in index.html:', titles.length);
titles.slice(0, 30).forEach(t => console.log(t.replace(/<[^>]+>/g, '').trim()));
