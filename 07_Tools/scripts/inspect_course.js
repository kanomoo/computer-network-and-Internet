const fs = require('fs');

function inspectCourseHtml(filePath) {
    console.log('=== File:', filePath, '===');
    const content = fs.readFileSync(filePath, 'utf8');
    const headings = content.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi) || [];
    headings.forEach(h => console.log(h.replace(/<[^>]+>/g, '').trim()));
}

inspectCourseHtml('computer-network-course/ch1/index.html');
inspectCourseHtml('computer-network-course/ch2/index.html');
inspectCourseHtml('computer-network-course/ch3/index.html');
