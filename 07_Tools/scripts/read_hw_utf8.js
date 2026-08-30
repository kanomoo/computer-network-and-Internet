const fs = require('fs');
const cp = require('child_process');

['Homework1', 'Homework2', 'Homework3', 'Homework4', 'Homework5'].forEach(name => {
    const docxPath = `Homework/${name}.docx`;
    if (fs.existsSync(docxPath)) {
        try {
            cp.execSync(`tar.exe -xf "${docxPath}" word/document.xml`);
            const xml = fs.readFileSync('word/document.xml', 'utf8');
            const clean = xml.replace(/<w:p[^>]*>/gi, '\n')
                             .replace(/<[^>]+>/g, '')
                             .replace(/&lt;/g, '<')
                             .replace(/&gt;/g, '>')
                             .replace(/&amp;/g, '&')
                             .replace(/[ \t]+/g, ' ')
                             .replace(/\n\s*\n+/g, '\n')
                             .trim();
            console.log(`==================== ${name} ====================`);
            console.log(clean);
        } catch(e) {
            console.log('Err:', e.message);
        }
    }
});

// clean up
if (fs.existsSync('word')) {
    fs.rmSync('word', { recursive: true, force: true });
}
