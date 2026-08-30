const fs = require('fs');

function formatSlideHumanStyle(item) {
  let raw = item.text || '';

  // Clean raw html tags completely
  raw = raw.replace(/<article\b[^>]*>/gi, '')
           .replace(/<\/article>/gi, '')
           .replace(/<article[^>]*$/gim, '')
           .replace(/\[IMAGE\]/g, '')
           .replace(/allow-split/gi, '')
           .replace(/\r\n/g, '\n');

  // Strip leading Slide N and title lines
  const rawLines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  let cleanLines = [];
  for (let l of rawLines) {
    if (/^Slide \d+$/i.test(l)) continue;
    if (/^\d{2}$/.test(l)) continue;
    if (/^สไลด์ \d+[-–]\d+$/.test(l)) continue;
    if (l === item.title.trim()) continue;
    cleanLines.push(l);
  }

  const fullText = cleanLines.join('\n');

  let mainPart = fullText;
  let visualPart = '';
  let takeawayPart = '';

  const visualIdx = fullText.search(/(อ่านภาพ[^\n]*|อ่านการ[^\n]*)/);
  const takeawayIdx = fullText.search(/(ประเด็นสำคัญที่ควรจำ|ประเด็นที่ควรจำ)/);

  if (visualIdx !== -1 && takeawayIdx !== -1) {
    if (visualIdx < takeawayIdx) {
      mainPart = fullText.substring(0, visualIdx).trim();
      const vHeaderLen = fullText.substring(visualIdx).split('\n')[0].length;
      visualPart = fullText.substring(visualIdx + vHeaderLen, takeawayIdx).trim();
      const tHeaderLen = fullText.substring(takeawayIdx).split('\n')[0].length;
      takeawayPart = fullText.substring(takeawayIdx + tHeaderLen).trim();
    } else {
      mainPart = fullText.substring(0, takeawayIdx).trim();
      const tHeaderLen = fullText.substring(takeawayIdx).split('\n')[0].length;
      takeawayPart = fullText.substring(takeawayIdx + tHeaderLen, visualIdx).trim();
      const vHeaderLen = fullText.substring(visualIdx).split('\n')[0].length;
      visualPart = fullText.substring(visualIdx + vHeaderLen).trim();
    }
  } else if (visualIdx !== -1) {
    mainPart = fullText.substring(0, visualIdx).trim();
    const vHeaderLen = fullText.substring(visualIdx).split('\n')[0].length;
    visualPart = fullText.substring(visualIdx + vHeaderLen).trim();
  } else if (takeawayIdx !== -1) {
    mainPart = fullText.substring(0, takeawayIdx).trim();
    const tHeaderLen = fullText.substring(takeawayIdx).split('\n')[0].length;
    takeawayPart = fullText.substring(takeawayIdx + tHeaderLen).trim();
  }

  // Join lines of mainPart into coherent flowing Thai sentences
  const mainFlowing = mainPart.split(/\n{2,}/).map(para => {
    return para.split('\n').join(' ').replace(/\s+/g, ' ').trim();
  }).filter(Boolean).join('\n\n');

  // Format visualPart into complete sentences (joining broken lines)
  let cleanVisualBullets = [];
  if (visualPart) {
    // Split into sentences or major bullets
    const vLines = visualPart.split('\n').map(l => l.trim()).filter(Boolean);
    // Combine short dangling lines
    let cur = '';
    vLines.forEach(l => {
      if (l.startsWith('-') || l.startsWith('•') || l.startsWith('*')) {
        if (cur) cleanVisualBullets.push(cur);
        cur = l.replace(/^[-•*]\s*/, '');
      } else {
        if (cur.length > 0 && !cur.endsWith(' ') && !l.startsWith(' ')) {
          cur += ' ' + l;
        } else {
          cur += l;
        }
      }
    });
    if (cur) cleanVisualBullets.push(cur);
  }

  // Format takeawayPart into complete bullet points
  let cleanTakeawayBullets = [];
  if (takeawayPart) {
    const tLines = takeawayPart.split('\n').map(l => l.trim()).filter(Boolean);
    let cur = '';
    tLines.forEach(l => {
      if (l.startsWith('-') || l.startsWith('•') || l.startsWith('*')) {
        if (cur) cleanTakeawayBullets.push(cur);
        cur = l.replace(/^[-•*]\s*/, '');
      } else {
        if (cur.length > 0) {
          cur += ' ' + l;
        } else {
          cur = l;
        }
      }
    });
    if (cur) cleanTakeawayBullets.push(cur);
  }

  let out = `## 📄 Slide ${item.slideNum}: ${item.title}\n\n`;
  out += `*📄 Slide ${item.slideNum}*\n\n`;
  out += `${mainFlowing}\n\n`;

  if (cleanVisualBullets.length > 0) {
    out += `> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์\n`;
    cleanVisualBullets.forEach(b => {
      out += `> - ${b.trim()}\n`;
    });
    out += `\n`;
  }

  if (cleanTakeawayBullets.length > 0) {
    out += `> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)\n`;
    cleanTakeawayBullets.forEach(b => {
      out += `> - ${b.trim()}\n`;
    });
    out += `\n`;
  }

  out += `---\n\n`;
  return out;
}

const ch1Data = JSON.parse(fs.readFileSync('tools/ch1_parsed.json', 'utf8'));

// Test formatting on Slide 2
console.log('--- TEST FORMATTING SLIDE 2 ---');
console.log(formatSlideHumanStyle(ch1Data[1]));

console.log('--- TEST FORMATTING SLIDE 18 ---');
console.log(formatSlideHumanStyle(ch1Data[17]));
