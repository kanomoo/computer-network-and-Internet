const fs = require('fs');

function countVisualCoverage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const slideHeaders = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^## 📄 Slide (\d+)/);
    if (m) slideHeaders.push({num: parseInt(m[1]), line: i});
  }

  let withStructuralVisual = [];
  let withCalculation = [];
  let withStructuredDefinition = [];
  let withCalloutOnly = [];
  let withoutVisual = [];
  
  for (let s = 0; s < slideHeaders.length; s++) {
    const start = slideHeaders[s].line;
    const end = s < slideHeaders.length - 1 ? slideHeaders[s+1].line : lines.length;
    const section = lines.slice(start, end).join('\n');
    
    const hasCode = section.includes('```');
    const hasTable = /\n\|[^\n]+\|\n\|[\s:\-|]+\|\n/.test(section);
    const hasCalculation = section.includes('$$');
    const hasStructuredDefinition = section.includes('[!DEFINITION]');
    const hasCallout = /^> \[!(?:DEFINITION|EXAMPLE|INFO|NOTE)\]/m.test(section);
    
    if (hasCode || hasTable) {
      withStructuralVisual.push(slideHeaders[s].num);
    } else if (hasCalculation) {
      withCalculation.push(slideHeaders[s].num);
    } else if (hasStructuredDefinition) {
      withStructuredDefinition.push(slideHeaders[s].num);
    } else if (hasCallout) {
      withCalloutOnly.push(slideHeaders[s].num);
    } else {
      withoutVisual.push(slideHeaders[s].num);
    }
  }
  
  return { total: slideHeaders.length, withStructuralVisual, withCalculation, withStructuredDefinition, withCalloutOnly, withoutVisual };
}

const lectureFiles = [
  'Wiki/Lecture 1 - Fundamental of Computer Network.md',
  'Wiki/Lecture 2 - Network Models and Layered Architecture.md',
  'Wiki/Lecture 3 - Application Layer Protocols and Architectures.md',
  'Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md',
  'Wiki/Lecture 5 - Network Layer, Routing, and IP Addressing.md',
  'Wiki/Lecture 6 - Link Layer, Local Area Networks, and Wireless.md',
];

lectureFiles.forEach(f => {
  const r = countVisualCoverage(f);
  if (r.total === 0) {
    const content = fs.readFileSync(f, 'utf8');
    const renderedTables = (content.match(/\n\|[^\n]+\|\n\|[\s:\-|]+\|\n/g) || []).length;
    const renderedCodeBlocks = Math.floor((content.match(/^```(?:[\w-]+)?\s*$/gm) || []).length / 2);
    console.log(f.replace('Wiki/', '').substring(0, 55));
    console.log('  Topic-based document (no per-slide H2 headings)');
    console.log('  Tables: ' + renderedTables + ', code/flow blocks: ' + renderedCodeBlocks);
    console.log('');
    return;
  }
  const meaningful = r.withStructuralVisual.length + r.withCalculation.length + r.withStructuredDefinition.length;
  const pct = r.total ? Math.round(meaningful / r.total * 100) : 0;
  console.log(f.replace('Wiki/', '').substring(0, 55));
  console.log('  Total slides: ' + r.total + ', Meaningful visual/structured aids: ' + meaningful + ' (' + pct + '%)');
  console.log('  Tables/flows: ' + r.withStructuralVisual.length + ', calculation-only: ' + r.withCalculation.length + ', definition-only: ' + r.withStructuredDefinition.length);
  console.log('  Summary-only slides: ' + r.withCalloutOnly.length + ', No aid: ' + r.withoutVisual.length);
  if (r.withCalloutOnly.length > 0 && r.withCalloutOnly.length <= 80) {
    console.log('  Summary-only slides: ' + r.withCalloutOnly.join(', '));
  }
  if (r.withoutVisual.length > 0 && r.withoutVisual.length <= 40) {
    console.log('  Missing slides: ' + r.withoutVisual.join(', '));
  }
  console.log('');
});
