const fs = require('fs');

const html = fs.readFileSync('Chapter_4_Network_Layer_Data_Plane_1-102.html', 'utf8');

const articleRegex = /<article[^>]*id=["']slide-(\d+)["'][^>]*>([\s\S]*?)<\/article>/gi;
let match;
const slides = [];

while ((match = articleRegex.exec(html)) !== null) {
  const num = parseInt(match[1], 10);
  const raw = match[2];
  
  // Extract heading or title
  const hMatch = raw.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);
  const title = hMatch ? hMatch[1].replace(/<[^>]+>/g, '').trim() : 'Unknown';
  
  // Extract key points
  const keyPointsMatch = raw.match(/<section[^>]*class=["'][^"']*key-points[^"']*["'][^>]*>([\s\S]*?)<\/section>/i);
  
  slides.push({
    num,
    title,
    rawLength: raw.length
  });
}

console.log('Total parsed slides:', slides.length);
slides.forEach(s => {
  console.log(`[Slide ${String(s.num).padStart(3, '0')}] ${s.title}`);
});
