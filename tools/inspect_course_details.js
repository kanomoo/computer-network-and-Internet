const fs = require('fs');

function extractJsonOrData(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Search for embedded scripts or slides array
    console.log('===', filePath, '===');
    const slideMatches = content.match(/slides\s*=\s*(\[[\s\S]*?\]);/i);
    if (slideMatches) {
        console.log('Found slides array in js, length:', slideMatches[1].length);
    }
    // Let's also extract all h1, h2, h3, and paragraph texts
    const h2s = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    console.log('H2s count:', h2s.length);
    h2s.forEach(h => console.log('  -', h.replace(/<[^>]+>/g, '').trim()));
}

extractJsonOrData('computer-network-course/ch1/index.html');
extractJsonOrData('computer-network-course/ch2/index.html');
extractJsonOrData('computer-network-course/ch3/index.html');
