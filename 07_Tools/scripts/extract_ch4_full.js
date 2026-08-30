const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('Chapter_4_Network_Layer_Data_Plane_1-102.html', 'utf8');

const articleRegex = /<article[^>]*id=["']slide-(\d+)["'][^>]*>([\s\S]*?)<\/article>/gi;
let match;
const slidesData = [];

while ((match = articleRegex.exec(html)) !== null) {
  const num = parseInt(match[1], 10);
  const raw = match[2];
  
  const hMatch = raw.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);
  const title = hMatch ? hMatch[1].replace(/<[^>]+>/g, '').trim() : 'Slide ' + num;
  
  // Extract text content cleanly
  // Extract section text
  const sections = [];
  const secRegex = /<section[^>]*class=["']([^"']*)["'][^>]*>([\s\S]*?)<\/section>/gi;
  let secMatch;
  while ((secMatch = secRegex.exec(raw)) !== null) {
    const secClass = secMatch[1];
    const secContent = secMatch[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    sections.push({ class: secClass, text: secContent });
  }
  
  // Clean raw text if no sections
  const cleanFull = raw.replace(/<style[\s\S]*?<\/style>/gi, '')
                       .replace(/<script[\s\S]*?<\/script>/gi, '')
                       .replace(/<[^>]+>/g, '\n')
                       .split('\n')
                       .map(l => l.trim())
                       .filter(l => l.length > 0)
                       .join('\n');

  slidesData.push({
    num,
    title,
    sections,
    cleanFull
  });
}

fs.writeFileSync('07_Tools/scripts/ch4_extracted_slides.json', JSON.stringify(slidesData, null, 2), 'utf8');
console.log(`Successfully extracted ${slidesData.length} slides to 07_Tools/scripts/ch4_extracted_slides.json`);
