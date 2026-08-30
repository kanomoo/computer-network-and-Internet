const fs = require('fs');
const zlib = require('zlib');

// simple unzip for docx word/document.xml using node
const cp = require('child_process');

['Homework1.docx', 'Homework2.docx', 'Homework3.docx', 'Homework4.docx', 'Homework5.docx'].forEach(file => {
    const filePath = 'Homework/' + file;
    if (fs.existsSync(filePath)) {
        try {
            // we can use powershell Expand-Archive or tar or git to inspect docx
            const res = cp.execSync(`powershell -command "[System.IO.Compression.ZipFile]::OpenRead('${filePath}').Entries | Where-Object { \\$_.FullName -eq 'word/document.xml' } | ForEach-Object { (New-Object System.IO.StreamReader(\\$_.Open())).ReadToEnd() }"`).toString();
            const cleanText = res.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
            console.log(`=== ${file} ===`);
            console.log(cleanText);
        } catch(e) {
            console.log(`Error reading ${file}:`, e.message);
        }
    }
});
