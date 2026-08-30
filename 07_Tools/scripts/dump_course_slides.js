const fs = require('fs');

function dumpCourseSlides(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    // find slides in js or html
    const jsMatch = html.match(/const slides\s*=\s*(\[[\s\S]*?\]);\s*let current/i) || html.match(/let slides\s*=\s*(\[[\s\S]*?\]);/i) || html.match(/slides\s*=\s*(\[[\s\S]*?\]);/i);
    if (jsMatch) {
        console.log('Found slides array in', filePath);
        try {
            // eval or parse
            const data = eval(jsMatch[1]);
            console.log('Slides count:', data.length);
            data.forEach((s, idx) => {
                console.log(`Slide ${idx+1}: ${s.title || s.heading || s.name || 'Untitled'}`);
            });
            return data;
        } catch(e) {
            console.log('Eval error:', e.message);
        }
    }
}

console.log('--- CH2 ---');
dumpCourseSlides('computer-network-course/ch2/index.html');
console.log('\n--- CH3 ---');
dumpCourseSlides('computer-network-course/ch3/index.html');
