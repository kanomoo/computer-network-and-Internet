const fs = require('fs');

function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\n======================================================`);
    console.log(`ANALYZING: ${filePath}`);
    
    // Extract sections or article tags or data-slide or id
    const sections = [];
    const sectionRegex = /<(?:section|article|div)[^>]*(?:id|class)=["']([^"']*(?:slide|topic|section|card|panel|module)[^"']*)["'][^>]*>([\s\S]*?)<\/(?:section|article|div)>/gi;
    
    // Extract all text inside <p>, <li>, <blockquote>, <code>
    // Let's also extract instructor notes if any
    const notes = [];
    const noteRegex = /class=["'][^"']*instructor-notes[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
    let nMatch;
    while ((nMatch = noteRegex.exec(content)) !== null) {
        const cleanNote = nMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (cleanNote) notes.push(cleanNote);
    }
    console.log(`Found ${notes.length} instructor notes.`);
    if (notes.length > 0) {
        console.log('Sample Notes:', notes.slice(0, 5));
    }
    
    // Extract key headings and summaries
    const hRegex = /<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi;
    let hMatch;
    const structure = [];
    while ((hMatch = hRegex.exec(content)) !== null) {
        const level = hMatch[1];
        const text = hMatch[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
        if (text && text !== '-' && text !== 'Instructor Notes' && text !== 'Topics in this week') {
            structure.push(`H${level}: ${text}`);
        }
    }
    console.log(`Structure items (${structure.length}):`);
    console.log(structure.slice(0, 35));
}

analyzeFile('New/ch1.html');
analyzeFile('New/ch2.html');
analyzeFile('New/ch3.html');
analyzeFile('New/main.html');
