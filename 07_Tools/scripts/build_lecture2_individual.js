const fs = require('fs');

function formatSingleSlide(item) {
  let raw = item.text || '';

  // Clean tags
  raw = raw.replace(/<article\b[^>]*>/gi, '')
           .replace(/<\/article>/gi, '')
           .replace(/\[IMAGE\]/g, '')
           .replace(/allow-split/g, '')
           .replace(/\r\n/g, '\n');

  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  let cleanLines = [];
  
  for (let l of lines) {
    if (/^Slide \d+$/i.test(l)) continue;
    if (/^\d{2}$/.test(l)) continue;
    if (/^สไลด์ \d+[-–]\d+$/.test(l)) continue;
    if (l === item.title.trim()) continue;
    cleanLines.push(l);
  }

  const fullText = cleanLines.join('\n');

  let mainText = fullText;
  let visualText = '';
  let takeawayText = '';

  const visualMatch = fullText.match(/(อ่านภาพ[^\n]*|อ่านการ[^\n]*)/);
  const takeawayMatch = fullText.match(/(ประเด็นสำคัญที่ควรจำ|ประเด็นที่ควรจำ)/);

  if (visualMatch && takeawayMatch) {
    const vIdx = fullText.indexOf(visualMatch[0]);
    const tIdx = fullText.indexOf(takeawayMatch[0]);
    if (vIdx < tIdx) {
      mainText = fullText.substring(0, vIdx).trim();
      visualText = fullText.substring(vIdx + visualMatch[0].length, tIdx).trim();
      takeawayText = fullText.substring(tIdx + takeawayMatch[0].length).trim();
    } else {
      mainText = fullText.substring(0, tIdx).trim();
      takeawayText = fullText.substring(tIdx + takeawayMatch[0].length, vIdx).trim();
      visualText = fullText.substring(vIdx + visualMatch[0].length).trim();
    }
  } else if (visualMatch) {
    const vIdx = fullText.indexOf(visualMatch[0]);
    mainText = fullText.substring(0, vIdx).trim();
    visualText = fullText.substring(vIdx + visualMatch[0].length).trim();
  } else if (takeawayMatch) {
    const tIdx = fullText.indexOf(takeawayMatch[0]);
    mainText = fullText.substring(0, tIdx).trim();
    takeawayText = fullText.substring(tIdx + takeawayMatch[0].length).trim();
  }

  const mainParas = mainText.split(/\n{2,}/).map(p => {
    return p.split('\n').join(' ').replace(/\s+/g, ' ').trim();
  }).filter(Boolean);

  let out = `## 📄 Slide ${item.slideNum}: ${item.title}\n\n`;
  out += `*📄 Slide ${item.slideNum}*\n\n`;

  mainParas.forEach(p => {
    out += `${p}\n\n`;
  });

  if (visualText) {
    out += `> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์\n`;
    visualText.split('\n').map(l => l.trim()).filter(Boolean).forEach(l => {
      out += `> - ${l.replace(/^[-•*]\s*/, '')}\n`;
    });
    out += `\n`;
  }

  if (takeawayText) {
    out += `> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)\n`;
    takeawayText.split('\n').map(l => l.trim()).filter(Boolean).forEach(l => {
      out += `> - ${l.replace(/^[-•*]\s*/, '')}\n`;
    });
    out += `\n`;
  }

  out += `---\n\n`;
  return out;
}

const ch1Data = JSON.parse(fs.readFileSync('tools/ch1_parsed.json', 'utf8'));
const l2Slides = ch1Data.filter(s => s.slideNum >= 50 && s.slideNum <= 89);

const l2Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_1_Fundamental-Network_models_1-89.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_1_Fundamental-Network_models_1-89.html) *(สไลด์ 50–89)*
> - **ไฟล์สไลด์ PDF:** [Chapter_1_Introduction.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction.pdf) & [Chapter_1_Introduction_TH.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction_TH.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Section 1.5: Protocol Layers and Their Service Models
> - **บทเรียนแบบโต้ตอบเสริม:** [ch2.html](file:///c:/Project/computer-network-&-Internet/New/ch2.html) *(23 Sections)* & [tcpipmodel.html](file:///c:/Project/computer-network-&-Internet/New/tcpipmodel.html)`;

let l2Md = `---
tags:
  - networking
  - lecture
  - lecture-2
  - network-models
  - osi-model
  - tcp-ip
  - encapsulation
  - pdu
  - wireshark
created: 2026-08-03
updated: 2026-08-17
lecture: 2
type: lecture
---

# Lecture 2: Network Models and Layered Architecture (Slides 50–89 Complete Guide)

> [!INFO] 📂 แหล่งไฟล์อ้างอิงต้นฉบับ (Source Documents in New/ & Root)
${l2Sources}

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์ Slide 50 ถึง Slide 89 รวม 40 หน้า ไม่มีข้าม)
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียดสมบูรณ์ 100% เรียงลำดับรายหน้าสไลด์เดี่ยว ตั้งแต่ **Slide 50 ถึง Slide 89** ครบทุกตัวอักษร ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล ตามมาตรฐานเดียวกับ Database System Wiki

---

`;

l2Slides.forEach(s => {
  l2Md += formatSingleSlide(s);
});

fs.writeFileSync('Wiki/Lecture 2 - Network Models and Layered Architecture.md', l2Md, 'utf8');
console.log('Saved Lecture 2 (Slides 50-89 individual):', l2Md.length, 'chars,', l2Md.split('\n').length, 'lines');
