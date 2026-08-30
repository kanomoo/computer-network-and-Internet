const fs = require('fs');

function parseSlides(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Look for slide blocks
    // In these files, how are slides separated?
    // Let's find patterns around <h3>
    const regex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
    let match;
    const slides = [];
    while ((match = regex.exec(content)) !== null) {
        slides.push(match[1].replace(/<[^>]+>/g, '').trim());
    }
    return slides;
}

console.log('--- Chapter 1 Slides (1-89) ---');
const ch1Slides = parseSlides('New/Chapter_1_Fundamental-Network_models_1-89.html');
ch1Slides.forEach((s, idx) => console.log(`[Slide ${idx+1}] ${s}`));

console.log('\n--- Chapter 2 Slides (1-119) ---');
const ch2Slides = parseSlides('New/Chapter_2_Application_Layer_1-119.html');
ch2Slides.forEach((s, idx) => console.log(`[Slide ${idx+1}] ${s}`));

console.log('\n--- Chapter 3 Slides (1-154) ---');
const ch3Slides = parseSlides('New/Chapter_3_ Transport_Layer_1-154.html');
ch3Slides.slice(0, 30).forEach((s, idx) => console.log(`[Slide ${idx+1}] ${s}`));
console.log(`... and ${ch3Slides.length - 30} more slides in Chapter 3`);
