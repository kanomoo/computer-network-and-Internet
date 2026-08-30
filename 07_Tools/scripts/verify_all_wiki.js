const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

console.log(`Found ${files.length} Markdown files in ${wikiDir}:`);
const fileBaseNames = new Set(files.map(f => f.replace(/\.md$/, '')));

let allPassed = true;
let totalLinks = 0;
let brokenLinks = 0;
let totalMermaid = 0;

files.forEach(f => {
  const fullPath = path.join(wikiDir, f);
  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(`- ${f} (${content.length} chars, ${content.split('\n').length} lines)`);
  
  // Check internal links [[Link]]
  const linkRegex = /\[\[([^\]\|#]+)(?:[\|#][^\]]*)?\]\]/g;
  let lm;
  while ((lm = linkRegex.exec(content)) !== null) {
    totalLinks++;
    const target = lm[1].trim();
    if (!fileBaseNames.has(target)) {
      console.warn(`  [BROKEN LINK in ${f}]: [[${target}]]`);
      brokenLinks++;
      allPassed = false;
    }
  }

  // Check mermaid blocks
  const mermaidRegex = /```mermaid\s*([\s\S]*?)```/g;
  let mm;
  while ((mm = mermaidRegex.exec(content)) !== null) {
    totalMermaid++;
    const code = mm[1].trim();
    if (!code.startsWith('flowchart') && !code.startsWith('sequenceDiagram') && !code.startsWith('mindmap') && !code.startsWith('timeline') && !code.startsWith('graph')) {
      console.warn(`  [UNKNOWN MERMAID TYPE in ${f}]: ${code.slice(0, 30)}`);
    }
  }
});

console.log('\n--- VERIFICATION SUMMARY ---');
console.log(`Total Markdown Files: ${files.length}`);
console.log(`Total Internal Links Checked: ${totalLinks}`);
console.log(`Broken Links: ${brokenLinks}`);
console.log(`Total Mermaid Diagrams: ${totalMermaid}`);
console.log(`Overall Status: ${allPassed ? 'ALL TESTS PASSED 100%' : 'FAILURES DETECTED'}`);
