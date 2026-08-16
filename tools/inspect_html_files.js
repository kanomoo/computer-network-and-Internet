const fs = require('fs');

function checkFile(filePath) {
    console.log('===', filePath, '===');
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('Length:', content.length);
    const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'No title');
    const h1s = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    console.log('H1 count:', h1s.length, 'Sample:', h1s.slice(0, 3).map(h => h.replace(/<[^>]+>/g, '').trim()));
    const h2s = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    console.log('H2 count:', h2s.length, 'Sample:', h2s.slice(0, 10).map(h => h.replace(/<[^>]+>/g, '').trim()));
}

checkFile('computer-network-course/ch1/index.html');
checkFile('computer-network-course/index.html');
checkFile('computer-network-course/cn_week1_html_slides.html');
checkFile('New/brosing-msg.html');
checkFile('New/email.html');
checkFile('New/tcpipmodel.html');
checkFile('New/main.html');
