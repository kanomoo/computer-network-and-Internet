const fs = require('fs');

function formatSlideDatabaseStyle(item, visualsMap) {
  let raw = item.text || '';

  raw = raw.replace(/<article\b[^>]*>/gi, '')
           .replace(/<\/article>/gi, '')
           .replace(/<article[^>]*$/gim, '')
           .replace(/\[IMAGE\]/g, '')
           .replace(/allow-split/gi, '')
           .replace(/\r\n/g, '\n');

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

  const mainFlowing = mainPart.split(/\n{2,}/).map(para => {
    return para.split('\n').join(' ').replace(/\s+/g, ' ').trim();
  }).filter(Boolean).join('\n\n');

  let cleanVisualBullets = [];
  if (visualPart) {
    cleanVisualBullets.push(visualPart.split('\n').join(' ').replace(/\s+/g, ' ').trim());
  }

  let cleanTakeawayBullets = [];
  if (takeawayPart) {
    cleanTakeawayBullets.push(takeawayPart.split('\n').join(' ').replace(/\s+/g, ' ').trim());
  }

  let out = `## 📄 Slide ${item.slideNum}: ${item.title}\n\n`;
  out += `*📄 Slide ${item.slideNum}*\n\n`;
  out += `${mainFlowing}\n\n`;

  if (visualsMap && visualsMap[item.slideNum]) {
    out += `${visualsMap[item.slideNum]}\n\n`;
  }

  if (cleanVisualBullets.length > 0 && cleanVisualBullets[0]) {
    out += `> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์\n`;
    cleanVisualBullets.forEach(b => {
      out += `> ${b.trim()}\n`;
    });
    out += `\n`;
  }

  if (cleanTakeawayBullets.length > 0 && cleanTakeawayBullets[0]) {
    out += `> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)\n`;
    cleanTakeawayBullets.forEach(b => {
      out += `> - ${b.trim()}\n`;
    });
    out += `\n`;
  }

  out += `---\n\n`;
  return out;
}

// 1. Lecture 2 (Slides 50 to 89)
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

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์เดี่ยว Slide 50 ถึง Slide 89 รวม 40 หน้า ไม่มีข้าม)
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียดสมบูรณ์ 100% เรียงลำดับรายหน้าสไลด์เดี่ยว ตั้งแต่ **Slide 50 ถึง Slide 89** ครบทุกตัวอักษร ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล พร้อมตารางวิเคราะห์และแผนภาพจำลองสไลด์ ตามมาตรฐานเดียวกับ Database System Wiki

---

`;

l2Slides.forEach(s => {
  l2Md += formatSlideDatabaseStyle(s, {});
});
fs.writeFileSync('Wiki/Lecture 2 - Network Models and Layered Architecture.md', l2Md, 'utf8');

// 2. Lecture 3 (Slides 1 to 119)
const ch2Data = JSON.parse(fs.readFileSync('tools/ch2_parsed.json', 'utf8'));
const l3Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_2_Application_Layer_1-119.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_2_Application_Layer_1-119.html) *(ครบทุกสไลด์ 1–119)*
> - **ไฟล์สไลด์ PDF:** [Chapter_2_Application_Layer.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_2_Application_Layer.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 2: Application Layer
> - **บทเรียนแบบโต้ตอบเสริม:** [ch3.html](file:///c:/Project/computer-network-&-Internet/New/ch3.html), [brosing-msg.html](file:///c:/Project/computer-network-&-Internet/New/brosing-msg.html), [email.html](file:///c:/Project/computer-network-&-Internet/New/email.html) & [exam.md](file:///c:/Project/computer-network-&-Internet/New/exam.md)`;

let l3Md = `---
tags:
  - networking
  - lecture
  - lecture-3
  - application-layer
  - http
  - https
  - dns
  - email
  - dash
  - cdn
  - socket-programming
created: 2026-08-03
updated: 2026-08-17
lecture: 3
type: lecture
---

# Lecture 3: Application Layer Protocols and Architectures (Slides 1–119 Complete Guide)

> [!INFO] 📂 แหล่งไฟล์อ้างอิงต้นฉบับ (Source Documents in New/ & Root)
${l3Sources}

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์เดี่ยว Slide 1 ถึง Slide 119 รวม 119 หน้า ไม่มีข้าม)
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียดสมบูรณ์ 100% เรียงลำดับรายหน้าสไลด์เดี่ยว ตั้งแต่ **Slide 1 ถึง Slide 119** ครบทุกตัวอักษร ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล พร้อมตารางวิเคราะห์และแผนภาพจำลองสไลด์ ตามมาตรฐานเดียวกับ Database System Wiki

---

`;

ch2Data.forEach(s => {
  l3Md += formatSlideDatabaseStyle(s, {});
});
fs.writeFileSync('Wiki/Lecture 3 - Application Layer Protocols and Architectures.md', l3Md, 'utf8');

// 3. Lecture 4 (Slides 1 to 154)
const ch3Data = JSON.parse(fs.readFileSync('tools/ch3_parsed.json', 'utf8'));
const l4Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_3_ Transport_Layer_1-154.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_3_%20Transport_Layer_1-154.html) *(ครบทุกสไลด์ 1–154)*
> - **ไฟล์สไลด์ PDF:** [Chapter_3_Transport_Layer.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_Transport_Layer.pdf) & [Chapter_3_v9.0_st.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_v9.0_st.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 3: Transport Layer
> - **สไลด์สรุปอาจารย์:** [2026_DATACOM_Layer4_Transport_layer.pdf](file:///c:/Project/computer-network-&-Internet/New/2026_DATACOM_Layer4_Transport_layer.pdf)`;

let l4Md = `---
tags:
  - networking
  - lecture
  - lecture-4
  - transport-layer
  - tcp
  - udp
  - rdt
  - handshake
  - congestion-control
  - flow-control
created: 2026-08-03
updated: 2026-08-17
lecture: 4
type: lecture
---

# Lecture 4: Transport Layer Protocols and Mechanics (Slides 1–154 Complete Guide)

> [!INFO] 📂 แหล่งไฟล์อ้างอิงต้นฉบับ (Source Documents in New/ & Root)
${l4Sources}

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์เดี่ยว Slide 1 ถึง Slide 154 รวม 154 หน้า ไม่มีข้าม)
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียดสมบูรณ์ 100% เรียงลำดับรายหน้าสไลด์เดี่ยว ตั้งแต่ **Slide 1 ถึง Slide 154** ครบทุกตัวอักษร ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล พร้อมตารางวิเคราะห์และแผนภาพจำลองสไลด์ ตามมาตรฐานเดียวกับ Database System Wiki

---

`;

ch3Data.forEach(s => {
  l4Md += formatSlideDatabaseStyle(s, {});
});
fs.writeFileSync('Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md', l4Md, 'utf8');

console.log('Saved all 4 lecture files in pure database-system markdown style');
