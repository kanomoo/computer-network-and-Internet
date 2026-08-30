const fs = require('fs');

function mockAndEval(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    const jsMatch = html.match(/const slides\s*=\s*(\[[\s\S]*?\]);\s*let current/i) || 
                    html.match(/let slides\s*=\s*(\[[\s\S]*?\]);/i) || 
                    html.match(/slides\s*=\s*(\[[\s\S]*?\]);/i);
    if (!jsMatch) {
        console.log('No slides match in', filePath);
        return;
    }
    const globalObj = {
        document: { createElement: () => ({}), getElementById: () => ({}) },
        window: {},
        escapeHTML: (s) => s
    };
    const fn = new Function('document', 'window', 'escapeHTML', `return ${jsMatch[1]};`);
    try {
        const slides = fn(globalObj.document, globalObj.window, globalObj.escapeHTML);
        console.log(`=== ${filePath}: ${slides.length} slides ===`);
        slides.forEach((s, idx) => {
            console.log(`[${idx+1}] ${s.title || 'No Title'}`);
            if (s.bullets) console.log('   Bullets:', s.bullets.slice(0, 3));
            if (s.notes) console.log('   Notes preview:', s.notes.slice(0, 100));
        });
        return slides;
    } catch(e) {
        console.error('Error:', e);
    }
}

mockAndEval('computer-network-course/ch2/index.html');
mockAndEval('computer-network-course/ch3/index.html');
