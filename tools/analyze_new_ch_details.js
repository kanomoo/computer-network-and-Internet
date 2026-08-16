const fs = require('fs');

['New/ch1.html', 'New/ch2.html', 'New/ch3.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log('====================================================');
  console.log('FILE:', f);
  
  // Extract all slide elements / sections / data structures
  // Let's check for any script data or DOM sections
  const sections = content.match(/<section[\s\S]*?<\/section>/gi) || [];
  console.log('Number of <section> blocks:', sections.length);
  sections.forEach((sec, idx) => {
    const idMatch = sec.match(/id=[\"']([^\"']+)[\"']/i);
    const hMatch = sec.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
    const id = idMatch ? idMatch[1] : 'no-id';
    const h = hMatch ? hMatch[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : 'no-h';
    console.log(`  Section ${idx + 1} [${id}]: ${h}`);
  });
});
