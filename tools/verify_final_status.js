const fs = require('fs');

console.log('Verifying all wiki files...');
const files = [
  'Wiki/Lecture 1 - Fundamental of Computer Network.md',
  'Wiki/Lecture 2 - Network Models and Layered Architecture.md',
  'Wiki/Lecture 3 - Application Layer Protocols and Architectures.md',
  'Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md',
  'Wiki/Lecture 5 - Network Layer, Routing, and IP Addressing.md',
  'Wiki/Lecture 6 - Link Layer, Local Area Networks, and Wireless.md',
  'Wiki/Interactive Lab Guide - Chapter 1 Network Fundamentals.md',
  'Wiki/Interactive Lab Guide - Chapter 2 Network Models & Layered Stack.md',
  'Wiki/Interactive Lab Guide - Chapter 3 Application Layer Protocols.md',
  'Wiki/Calculations and Trace Workbook.md',
  'Wiki/Exam Preparation Guide and Master 80-Question Bank.md',
  'Wiki/Computer Network and Internet Master Index.md',
  'Wiki/Progress Checklist.md'
];

files.forEach(f => {
  const stat = fs.statSync(f);
  const text = fs.readFileSync(f, 'utf8');
  const lines = text.split('\n');
  const mermaidCount = (text.match(/```mermaid/g) || []).length;
  console.log(`[OK] ${f}: ${lines.length} lines | ${stat.size} bytes | ${mermaidCount} Mermaid diagrams`);
});
