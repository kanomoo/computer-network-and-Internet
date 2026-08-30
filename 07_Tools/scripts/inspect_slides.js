const fs = require('fs');
const path = require('path');

function inspectHtml(filePath) {
    console.log('========================================');
    console.log('Inspecting:', filePath);
    if (!fs.existsSync(filePath)) {
        console.log('File does not exist');
        return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('Size:', content.length, 'bytes');

    // Look for slide markers or headers
    const cardMatches = content.match(/<div class="card[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi) || [];
    console.log('Card matches count:', cardMatches.length);

    // Look for h2, h3, slide numbers
    const h1s = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h2s = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    const h3s = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
    console.log('H1 count:', h1s.length, 'H2 count:', h2s.length, 'H3 count:', h3s.length);

    console.log('Sample H2s:', h2s.slice(0, 15).map(h => h.replace(/<[^>]+>/g, '').trim()));
}

inspectHtml('New/Chapter_1_Fundamental-Network_models_1-89.html');
inspectHtml('New/Chapter_2_Application_Layer_1-119.html');
inspectHtml('New/Chapter_3_ Transport_Layer_1-154.html');
