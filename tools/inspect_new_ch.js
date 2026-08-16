const fs = require('fs');
const path = require('path');

['New/ch1.html', 'New/ch2.html', 'New/ch3.html', 'New/Chapter_1_Fundamental-Network_models_1-89.html', 'New/Chapter_2_Application_Layer_1-119.html', 'New/Chapter_3_ Transport_Layer_1-154.html'].forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    console.log('=== ' + f + ' === (' + content.length + ' bytes)');
    const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');
    
    // Check for sections / slides
    const sectionMatches = content.match(/<section[\s\S]*?<\/section>/gi) || [];
    console.log('Sections count:', sectionMatches.length);

    // Check headings
    const headings = [];
    const hRe = /<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi;
    let hm;
    while ((hm = hRe.exec(content)) !== null) {
      headings.push(hm[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
    }
    console.log('Headings count:', headings.length);
    console.log('First 10 headings:', headings.slice(0, 10));
  }
});
