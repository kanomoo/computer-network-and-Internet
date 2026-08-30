const fs = require('fs');

const ch1Data = JSON.parse(fs.readFileSync('tools/ch1_parsed.json', 'utf8'));

// Slides 1 to 49 for Lecture 1
const l1Slides = ch1Data.filter(s => s.slideNum >= 1 && s.slideNum <= 49);
// Slides 50 to 89 for Lecture 2
const l2Slides = ch1Data.filter(s => s.slideNum >= 50 && s.slideNum <= 89);

console.log(`Lecture 1 slides count: ${l1Slides.length} (Slides 1-49)`);
console.log(`Lecture 2 slides count: ${l2Slides.length} (Slides 50-89)`);
