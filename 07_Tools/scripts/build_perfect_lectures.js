const fs = require('fs');

function formatSlideItem(item) {
  let raw = item.text || '';

  // Remove article and image tags
  raw = raw.replace(/<article\b[^>]*>/gi, '')
           .replace(/<\/article>/gi, '')
           .replace(/\[IMAGE\]/g, '')
           .replace(/allow-split/g, '')
           .replace(/\r\n/g, '\n');

  // Strip leading Slide N and title if already present in raw
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

  // Split by visual reading
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

  // Format mainText paragraphs
  // Replace single newlines within paragraphs with space, but keep double newlines
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

function buildMasterLecture(title, lectureNum, tagList, sourceDesc, slidesData) {
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

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (Slides ${slidesData[0].slideNum}–${slidesData[slidesData.length-1].slideNum})
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียด 100% ครบทุกหน้าสไลด์ ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล (ไม่มีการจัดกลุ่มหรือข้ามหน้าสไลด์) เรียงลำดับตั้งแต่ Slide ${slidesData[0].slideNum} ถึง Slide ${slidesData[slidesData.length-1].slideNum} ตามสไลด์การสอนของอาจารย์

---

`;

  slidesData.forEach(s => {
    md += formatSlideItem(s);
  });

  return md;
}

const ch2Data = JSON.parse(fs.readFileSync('tools/ch2_parsed.json', 'utf8'));
const ch3Data = JSON.parse(fs.readFileSync('tools/ch3_parsed.json', 'utf8'));

// Build Lecture 3 (Slides 1 to 119)
const l3Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_2_Application_Layer_1-119.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_2_Application_Layer_1-119.html) *(สไลด์ 1–119)*
> - **ไฟล์สไลด์ PDF:** [Chapter_2_Application_Layer.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_2_Application_Layer.pdf)
> - **หนังสือเรียนอ้างอิง:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 2: Application Layer
> - **บทเรียนแบบโต้ตอบเสริม:** [ch3.html](file:///c:/Project/computer-network-&-Internet/New/ch3.html), [brosing-msg.html](file:///c:/Project/computer-network-&-Internet/New/brosing-msg.html), [email.html](file:///c:/Project/computer-network-&-Internet/New/email.html) & [computer-network-course/ch3/index.html](file:///c:/Project/computer-network-&-Internet/computer-network-course/ch3/index.html)
> - **แบบทดสอบจริงจาก Classroom:** [exam.md](file:///c:/Project/computer-network-&-Internet/New/exam.md)`;

const l3Md = buildMasterLecture(
  'Lecture 3: Application Layer Protocols and Architectures — Slide-by-Slide Complete Guide',
  3,
  ['application-layer', 'http', 'https', 'dns', 'email', 'dash', 'cdn', 'socket-programming'],
  l3Sources,
  ch2Data
);
fs.writeFileSync('Wiki/Lecture 3 - Application Layer Protocols and Architectures.md', l3Md, 'utf8');
console.log('Built Lecture 3 (Slides 1-119):', l3Md.length, 'chars,', l3Md.split('\n').length, 'lines');

// Build Lecture 4 (Slides 1 to 154)
const l4Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_3_ Transport_Layer_1-154.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_3_%20Transport_Layer_1-154.html) *(สไลด์ 1–154)*
> - **ไฟล์สไลด์ PDF:** [Chapter_3_Transport_Layer.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_Transport_Layer.pdf) & [Chapter_3_v9.0_st.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_v9.0_st.pdf)
> - **หนังสือเรียนอ้างอิง:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 3: Transport Layer
> - **สไลด์สรุปอาจารย์:** [2026_DATACOM_Layer4_Transport_layer.pdf](file:///c:/Project/computer-network-&-Internet/New/2026_DATACOM_Layer4_Transport_layer.pdf)`;

const l4Md = buildMasterLecture(
  'Lecture 4: Transport Layer Protocols and Mechanics — Slide-by-Slide Complete Guide',
  4,
  ['transport-layer', 'tcp', 'udp', 'rdt', 'handshake', 'congestion-control', 'flow-control'],
  l4Sources,
  ch3Data
);
fs.writeFileSync('Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md', l4Md, 'utf8');
console.log('Built Lecture 4 (Slides 1-154):', l4Md.length, 'chars,', l4Md.split('\n').length, 'lines');
