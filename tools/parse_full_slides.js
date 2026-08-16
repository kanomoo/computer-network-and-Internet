const fs = require('fs');

function parseHtmlSlidesFull(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    // Find all <article class="card"> or <div class="slide"> or <section> or split by slide id
    // Let's see how slides are delimited
    const slideMatches = [...html.matchAll(/id="slide-(\d+)"[^>]*>([\s\S]*?)(?=(?:id="slide-\d+"|<\/main>|$))/gi)];
    console.log(`Found ${slideMatches.length} slides with id="slide-N" in ${filePath}`);
    
    if (slideMatches.length === 0) {
        // Let's check other delimiters
        const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3|$)/gi)];
        console.log(`Found ${h3Matches.length} slides delimited by <h3> in ${filePath}`);
        return h3Matches.map((m, idx) => ({
            num: idx + 1,
            title: m[1].replace(/<[^>]+>/g, '').trim(),
            rawContent: m[2]
        }));
    }

    return slideMatches.map(m => ({
        num: parseInt(m[1]),
        title: (m[2].match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i) || ['', ''])[1].replace(/<[^>]+>/g, '').trim(),
        rawContent: m[2]
    }));
}

const ch1 = parseHtmlSlidesFull('New/Chapter_1_Fundamental-Network_models_1-89.html');
console.log('CH1 first 5:', ch1.slice(0, 5).map(s => `Slide ${s.num}: ${s.title}`));

const ch2 = parseHtmlSlidesFull('New/Chapter_2_Application_Layer_1-119.html');
console.log('CH2 first 5:', ch2.slice(0, 5).map(s => `Slide ${s.num}: ${s.title}`));

const ch3 = parseHtmlSlidesFull('New/Chapter_3_ Transport_Layer_1-154.html');
console.log('CH3 first 5:', ch3.slice(0, 5).map(s => `Slide ${s.num}: ${s.title}`));
