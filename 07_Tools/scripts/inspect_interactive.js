const fs = require('fs');

function inspectInteractiveHtml(filePath) {
    console.log('========================================');
    console.log('Inspecting interactive:', filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const textClean = content.replace(/<style[\s\S]*?<\/style>/gi, '')
                             .replace(/<script[\s\S]*?<\/script>/gi, '')
                             .replace(/<[^>]+>/g, '\n')
                             .replace(/&nbsp;/g, ' ')
                             .replace(/&lt;/g, '<')
                             .replace(/&gt;/g, '>')
                             .replace(/&amp;/g, '&')
                             .replace(/\n\s*\n+/g, '\n')
                             .trim();
    console.log(textClean.slice(0, 1500));
}

inspectInteractiveHtml('New/brosing-msg.html');
inspectInteractiveHtml('New/email.html');
inspectInteractiveHtml('New/tcpipmodel.html');
