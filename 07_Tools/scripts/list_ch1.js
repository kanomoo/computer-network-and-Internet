const fs = require('fs');

function extractSlideData(htmlPath) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    // In these files, each slide has <div class="slide" id="slide-X"> or similar, or <h3>
    // Let's split by <div class="card" or <h3> or check the DOM structure
    // Let's see how the HTML is structured
    const sections = html.split(/<h3[^>]*>/i);
    const result = [];
    for (let i = 1; i < sections.length; i++) {
        const sec = sections[i];
        const titleEnd = sec.indexOf('</h3>');
        const title = sec.substring(0, titleEnd).replace(/<[^>]+>/g, '').trim();
        const body = sec.substring(titleEnd + 5);
        // clean body up to next section or end
        const cleanText = body.replace(/<style[\s\S]*?<\/style>/gi, '')
                              .replace(/<script[\s\S]*?<\/script>/gi, '')
                              .replace(/<[^>]+>/g, ' ')
                              .replace(/&nbsp;/g, ' ')
                              .replace(/&lt;/g, '<')
                              .replace(/&gt;/g, '>')
                              .replace(/&amp;/g, '&')
                              .replace(/\s+/g, ' ')
                              .trim();
        result.push({ slideNum: i, title, text: cleanText.slice(0, 300) });
    }
    return result;
}

const ch1 = extractSlideData('New/Chapter_1_Fundamental-Network_models_1-89.html');
console.log('CH1 Count:', ch1.length);
ch1.forEach(s => console.log(`Slide ${s.slideNum}: ${s.title}`));
