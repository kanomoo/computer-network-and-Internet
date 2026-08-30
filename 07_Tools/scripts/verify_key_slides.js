const fs = require('fs');

const ch1 = JSON.parse(fs.readFileSync('tools/ch1_parsed.json', 'utf8'));
const ch2 = JSON.parse(fs.readFileSync('tools/ch2_parsed.json', 'utf8'));
const ch3 = JSON.parse(fs.readFileSync('tools/ch3_parsed.json', 'utf8'));

console.log('CH1 slides total:', ch1.length);
console.log('CH2 slides total:', ch2.length);
console.log('CH3 slides total:', ch3.length);

// Let's verify some key slides in CH1
console.log('\n--- CH1 Key Slides Sample ---');
[3, 7, 13, 21, 27, 30, 35, 48, 52, 60, 71, 79].forEach(num => {
    const s = ch1.find(x => x.slideNum === num);
    if (s) console.log(`Slide ${s.slideNum}: ${s.title}\n${s.text.slice(0, 150)}...\n`);
});

// Let's verify some key slides in CH2
console.log('\n--- CH2 Key Slides Sample ---');
[6, 12, 17, 24, 33, 44, 52, 61, 68, 76, 79, 92, 102, 106].forEach(num => {
    const s = ch2.find(x => x.slideNum === num);
    if (s) console.log(`Slide ${s.slideNum}: ${s.title}\n${s.text.slice(0, 150)}...\n`);
});

// Let's verify some key slides in CH3
console.log('\n--- CH3 Key Slides Sample ---');
[4, 11, 21, 23, 27, 34, 43, 56, 72, 85, 96, 108, 120, 136, 148].forEach(num => {
    const s = ch3.find(x => x.slideNum === num);
    if (s) console.log(`Slide ${s.slideNum}: ${s.title}\n${s.text.slice(0, 150)}...\n`);
});
