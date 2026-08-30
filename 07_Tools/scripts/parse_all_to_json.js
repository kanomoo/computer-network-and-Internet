const fs = require('fs');

function parseFullHtml(filePath, outJson) {
    const html = fs.readFileSync(filePath, 'utf8');
    const slideMatches = [...html.matchAll(/id="slide-(\d+)"[^>]*>([\s\S]*?)(?=(?:id="slide-\d+"|<\/main>|$))/gi)];
    
    const parsed = slideMatches.map(m => {
        const slideNum = parseInt(m[1]);
        const content = m[2];
        
        // Extract title
        const titleMatch = content.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : `Slide ${slideNum}`;
        
        // Extract plain text without base64 img
        const withoutImg = content.replace(/<img[^>]*src="data:image[^"]*"[^>]*>/gi, '[IMAGE]');
        const textClean = withoutImg.replace(/<style[\s\S]*?<\/style>/gi, '')
                                   .replace(/<script[\s\S]*?<\/script>/gi, '')
                                   .replace(/<[^>]+>/g, '\n')
                                   .replace(/&nbsp;/g, ' ')
                                   .replace(/&lt;/g, '<')
                                   .replace(/&gt;/g, '>')
                                   .replace(/&amp;/g, '&')
                                   .replace(/\n\s*\n/g, '\n')
                                   .trim();
        return {
            slideNum,
            title,
            text: textClean
        };
    });

    fs.writeFileSync(outJson, JSON.stringify(parsed, null, 2), 'utf8');
    console.log(`Saved ${parsed.length} slides to ${outJson}`);
}

parseFullHtml('New/Chapter_1_Fundamental-Network_models_1-89.html', 'tools/ch1_parsed.json');
parseFullHtml('New/Chapter_2_Application_Layer_1-119.html', 'tools/ch2_parsed.json');
parseFullHtml('New/Chapter_3_ Transport_Layer_1-154.html', 'tools/ch3_parsed.json');
