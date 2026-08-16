const fs = require('fs');

const files = [
  'Wiki/Lecture 1 - Fundamental of Computer Network.md',
  'Wiki/Lecture 2 - Network Models and Layered Architecture.md',
  'Wiki/Lecture 3 - Application Layer Protocols and Architectures.md',
  'Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md',
  'Wiki/Lecture 5 - Network Layer, Routing, and IP Addressing.md',
  'Wiki/Lecture 6 - Link Layer, Local Area Networks, and Wireless.md'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const text = fs.readFileSync(f, 'utf8');
    const lines = text.split('\n');
    console.log(`========================================`);
    console.log(`${f}: ${lines.length} lines, ${text.length} chars`);
    // Find headings
    const h2s = lines.filter(l => l.startsWith('## ')).map(l => l.replace('## ', ''));
    console.log('H2 Headings count:', h2s.length);
    console.log('Sample H2s:', h2s.slice(0, 10));
  } else {
    console.log(`Missing: ${f}`);
  }
});
