const fs = require('fs');
const zlib = require('zlib');

function readAllPptxSlides(pptxPath) {
    const buffer = fs.readFileSync(pptxPath);
    let offset = 0;
    const slides = {};
    while (offset < buffer.length - 4) {
        const sig = buffer.readUInt32LE(offset);
        if (sig === 0x04034b50) {
            const compMethod = buffer.readUInt16LE(offset + 8);
            const compSize = buffer.readUInt32LE(offset + 18);
            const nameLen = buffer.readUInt16LE(offset + 26);
            const extraLen = buffer.readUInt16LE(offset + 28);
            const filename = buffer.toString('utf8', offset + 30, offset + 30 + nameLen);
            const dataOffset = offset + 30 + nameLen + extraLen;
            
            if (filename.startsWith('ppt/slides/slide') && filename.endsWith('.xml')) {
                const compData = buffer.slice(dataOffset, dataOffset + compSize);
                let xml = '';
                if (compMethod === 8) xml = zlib.inflateRawSync(compData).toString('utf8');
                else if (compMethod === 0) xml = compData.toString('utf8');
                
                const clean = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                slides[filename] = clean;
            }
            offset = dataOffset + compSize;
        } else {
            offset++;
        }
    }
    return slides;
}

const pptxSlides = readAllPptxSlides('Assignments.pptx');
console.log('Assignments.pptx slides count:', Object.keys(pptxSlides).length);
for (const [k, v] of Object.entries(pptxSlides)) {
    console.log(`=== ${k} ===\n${v}\n`);
}
