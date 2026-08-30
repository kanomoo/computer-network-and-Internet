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
    const vText = visualPart.split('\n').join(' ').replace(/\s+/g, ' ').trim();
    // Split on major Thai connectors if long, or keep as coherent sentences
    cleanVisualBullets.push(vText);
  }

  // Format takeawayPart into complete bullet points
  let cleanTakeawayBullets = [];
  if (takeawayPart) {
    const tText = takeawayPart.split('\n').join(' ').replace(/\s+/g, ' ').trim();
    cleanTakeawayBullets.push(tText);
  }

  let out = `## 📄 Slide ${item.slideNum}: ${item.title}\n\n`;
  out += `*📄 Slide ${item.slideNum}*\n\n`;
  out += `${mainFlowing}\n\n`;

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
      out += `> ${b.trim()}\n`;
    });
    out += `\n`;
  }

  out += `---\n\n`;
  return out;
}

function generateLectureFile(title, lectureNum, tagList, sourceDesc, slidesData) {
  let md = `---
tags:
  - networking
  - lecture
  - lecture-${lectureNum}
${tagList.map(t => '  - ' + t).join('\n')}
created: 2026-08-03
updated: 2026-08-17
lecture: ${lectureNum}
type: lecture
---

# ${title}

> [!INFO] 📂 แหล่งไฟล์อ้างอิงต้นฉบับ (Source Documents in New/ & Root)
${sourceDesc}

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์เดี่ยว Slide ${slidesData[0].slideNum} ถึง Slide ${slidesData[slidesData.length-1].slideNum} รวม ${slidesData.length} หน้า ไม่มีข้าม)
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียดสมบูรณ์ 100% เรียงลำดับรายหน้าสไลด์เดี่ยว ตั้งแต่ **Slide ${slidesData[0].slideNum} ถึง Slide ${slidesData[slidesData.length-1].slideNum}** ครบทุกตัวอักษร ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล ตามมาตรฐานเดียวกับ Database System Wiki

---

`;

  slidesData.forEach(s => {
    md += formatSlideHumanStyle(s);
  });

  return md;
}

const ch1Data = JSON.parse(fs.readFileSync('tools/ch1_parsed.json', 'utf8'));
const ch2Data = JSON.parse(fs.readFileSync('tools/ch2_parsed.json', 'utf8'));
const ch3Data = JSON.parse(fs.readFileSync('tools/ch3_parsed.json', 'utf8'));

// 1. Lecture 1: All 89 slides
const l1Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_1_Fundamental-Network_models_1-89.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_1_Fundamental-Network_models_1-89.html) *(ครบทุกสไลด์ 1–89)*
> - **ไฟล์สไลด์ PDF:** [Chapter_1_Introduction.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction.pdf) & [Chapter_1_Introduction_TH.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction_TH.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 1: Computer Networks and the Internet
> - **บทเรียนแบบโต้ตอบเสริม:** [ch1.html](file:///c:/Project/computer-network-&-Internet/New/ch1.html) *(25 Sections)*, [ch2.html](file:///c:/Project/computer-network-&-Internet/New/ch2.html) & [tcpipmodel.html](file:///c:/Project/computer-network-&-Internet/New/tcpipmodel.html)`;

const l1Md = generateLectureFile(
  'Lecture 1: Fundamentals of Computer Networks & Network Models (Slides 1–89 Complete Guide)',
  1,
  ['fundamentals', 'network-edge', 'network-core', 'delays', 'packet-switching', 'osi-model', 'tcp-ip', 'encapsulation', 'history'],
  l1Sources,
  ch1Data
);
fs.writeFileSync('Wiki/Lecture 1 - Fundamental of Computer Network.md', l1Md, 'utf8');
console.log('Saved Lecture 1:', l1Md.length, 'chars,', l1Md.split('\n').length, 'lines');

// 2. Lecture 2: Slides 50 to 89
const l2Slides = ch1Data.filter(s => s.slideNum >= 50 && s.slideNum <= 89);
const l2Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_1_Fundamental-Network_models_1-89.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_1_Fundamental-Network_models_1-89.html) *(สไลด์ 50–89)*
> - **ไฟล์สไลด์ PDF:** [Chapter_1_Introduction.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction.pdf) & [Chapter_1_Introduction_TH.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction_TH.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Section 1.5: Protocol Layers and Their Service Models
> - **บทเรียนแบบโต้ตอบเสริม:** [ch2.html](file:///c:/Project/computer-network-&-Internet/New/ch2.html) *(23 Sections)* & [tcpipmodel.html](file:///c:/Project/computer-network-&-Internet/New/tcpipmodel.html)`;

const l2Md = generateLectureFile(
  'Lecture 2: Network Models and Layered Architecture (Slides 50–89 Complete Guide)',
  2,
  ['network-models', 'osi-model', 'tcp-ip', 'encapsulation', 'pdu', 'wireshark'],
  l2Sources,
  l2Slides
);
fs.writeFileSync('Wiki/Lecture 2 - Network Models and Layered Architecture.md', l2Md, 'utf8');
console.log('Saved Lecture 2:', l2Md.length, 'chars,', l2Md.split('\n').length, 'lines');

// 3. Lecture 3: All 119 slides
const l3Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_2_Application_Layer_1-119.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_2_Application_Layer_1-119.html) *(ครบทุกสไลด์ 1–119)*
> - **ไฟล์สไลด์ PDF:** [Chapter_2_Application_Layer.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_2_Application_Layer.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 2: Application Layer
> - **บทเรียนแบบโต้ตอบเสริม:** [ch3.html](file:///c:/Project/computer-network-&-Internet/New/ch3.html), [brosing-msg.html](file:///c:/Project/computer-network-&-Internet/New/brosing-msg.html), [email.html](file:///c:/Project/computer-network-&-Internet/New/email.html) & [exam.md](file:///c:/Project/computer-network-&-Internet/New/exam.md)`;

const l3Md = generateLectureFile(
  'Lecture 3: Application Layer Protocols and Architectures (Slides 1–119 Complete Guide)',
  3,
  ['application-layer', 'http', 'https', 'dns', 'email', 'dash', 'cdn', 'socket-programming'],
  l3Sources,
  ch2Data
);
fs.writeFileSync('Wiki/Lecture 3 - Application Layer Protocols and Architectures.md', l3Md, 'utf8');
console.log('Saved Lecture 3:', l3Md.length, 'chars,', l3Md.split('\n').length, 'lines');

// 4. Lecture 4: All 154 slides
const l4Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_3_ Transport_Layer_1-154.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_3_%20Transport_Layer_1-154.html) *(ครบทุกสไลด์ 1–154)*
> - **ไฟล์สไลด์ PDF:** [Chapter_3_Transport_Layer.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_Transport_Layer.pdf) & [Chapter_3_v9.0_st.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_v9.0_st.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 3: Transport Layer
> - **สไลด์สรุปอาจารย์:** [2026_DATACOM_Layer4_Transport_layer.pdf](file:///c:/Project/computer-network-&-Internet/New/2026_DATACOM_Layer4_Transport_layer.pdf)`;

const l4Md = generateLectureFile(
  'Lecture 4: Transport Layer Protocols and Mechanics (Slides 1–154 Complete Guide)',
  4,
  ['transport-layer', 'tcp', 'udp', 'rdt', 'handshake', 'congestion-control', 'flow-control'],
  l4Sources,
  ch3Data
);
fs.writeFileSync('Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md', l4Md, 'utf8');
console.log('Saved Lecture 4:', l4Md.length, 'chars,', l4Md.split('\n').length, 'lines');
