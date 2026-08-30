const fs = require('fs');
const zlib = require('zlib');

function readZipEntry(buffer, entryName) {
    let offset = 0;
    while (offset < buffer.length - 4) {
        const sig = buffer.readUInt32LE(offset);
        if (sig === 0x04034b50) { // Local file header
            const compMethod = buffer.readUInt16LE(offset + 8);
            const compSize = buffer.readUInt32LE(offset + 18);
            const uncompSize = buffer.readUInt32LE(offset + 22);
            const nameLen = buffer.readUInt16LE(offset + 26);
            const extraLen = buffer.readUInt16LE(offset + 28);
            const filename = buffer.toString('utf8', offset + 30, offset + 30 + nameLen);
            const dataOffset = offset + 30 + nameLen + extraLen;
            
            if (filename === entryName) {
                const compData = buffer.slice(dataOffset, dataOffset + compSize);
                if (compMethod === 8) {
                    return zlib.inflateRawSync(compData).toString('utf8');
                } else if (compMethod === 0) {
                    return compData.toString('utf8');
                }
            }
            offset = dataOffset + compSize;
        } else {
            offset++;
        }
    }
    return null;
}

['Homework1', 'Homework2', 'Homework3', 'Homework4', 'Homework5'].forEach(name => {
    const docxPath = `Homework/${name}.docx`;
    if (fs.existsSync(docxPath)) {
        const buf = fs.readFileSync(docxPath);
        const xml = readZipEntry(buf, 'word/document.xml');
        if (xml) {
            const clean = xml.replace(/<w:p[^>]*>/gi, '\n')
                             .replace(/<[^>]+>/g, '')
                             .replace(/&lt;/g, '<')
                             .replace(/&gt;/g, '>')
                             .replace(/&amp;/g, '&')
                             .replace(/[ \t]+/g, ' ')
                             .replace(/\n\s*\n+/g, '\n')
                             .trim();
            console.log(`\n==================== ${name} ====================`);
            console.log(clean);
        }
    }
});
