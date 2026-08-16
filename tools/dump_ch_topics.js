const fs = require('fs');

function dumpTopics(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\n======================================================`);
    console.log(`TOPIC DUMP: ${filePath}`);
    
    // Find all card or section contents
    const regex = /<section[^>]*>([\s\S]*?)<\/section>/gi;
    let match;
    let sCount = 0;
    while ((match = regex.exec(content)) !== null) {
        sCount++;
        const sContent = match[1];
        const titleMatch = sContent.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : `Section ${sCount}`;
        
        // Extract paragraphs / list items
        const textSnippets = [];
        const pRegex = /<(?:p|li|blockquote)[^>]*>([\s\S]*?)<\/(?:p|li|blockquote)>/gi;
        let pMatch;
        while ((pMatch = pRegex.exec(sContent)) !== null) {
            const pText = pMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            if (pText.length > 10) {
                textSnippets.push(pText);
            }
        }
        
        console.log(`\n--- [${sCount}] ${title} ---`);
        if (textSnippets.length > 0) {
            console.log(textSnippets.slice(0, 3).join('\n * '));
        }
    }
}

dumpTopics('New/ch1.html');
dumpTopics('New/ch2.html');
dumpTopics('New/ch3.html');
