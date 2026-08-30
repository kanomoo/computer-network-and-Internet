const fs = require('fs');

['New/ch1.html', 'New/ch2.html', 'New/ch3.html', 'New/main.html'].forEach(filePath => {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`\n========================================`);
        console.log(`=== ${filePath} === (Size: ${content.length} chars)`);
        
        const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
        console.log('Title:', titleMatch ? titleMatch[1] : 'No title');
        
        const headings = [];
        const headingRegex = /<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/gi;
        let m;
        while ((m = headingRegex.exec(content)) !== null) {
            const cleanText = m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
            if (cleanText) headings.push(cleanText);
        }
        console.log(`Headings count: ${headings.length}`);
        console.log('Headings sample:', headings.slice(0, 25));
    }
});
