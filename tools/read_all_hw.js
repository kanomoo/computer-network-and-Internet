const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const tmpDir = path.join(__dirname, 'temp_hw');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

const files = ['Homework1.docx', 'Homework2.docx', 'Homework3.docx', 'Homework4.docx', 'Homework5.docx'];

files.forEach(f => {
    const filePath = path.join('Homework', f);
    if (!fs.existsSync(filePath)) return;
    
    const targetDir = path.join(tmpDir, f.replace('.', '_'));
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    
    cp.execSync(`tar -xf "${filePath}" -C "${targetDir}"`);
    const docXmlPath = path.join(targetDir, 'word', 'document.xml');
    if (fs.existsSync(docXmlPath)) {
        const xml = fs.readFileSync(docXmlPath, 'utf8');
        // extract text
        const text = xml.replace(/<w:p[^>]*>/gi, '\n')
                        .replace(/<[^>]+>/g, '')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&amp;/g, '&')
                        .replace(/[ \t]+/g, ' ')
                        .replace(/\n\s*\n+/g, '\n')
                        .trim();
        console.log(`==================== ${f} ====================`);
        console.log(text);
    }
});
