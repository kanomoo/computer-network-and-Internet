const fs = require('fs');

function cleanSlideText(rawText) {
  return rawText
    .replace(/<article\b[^>]*>/gi, '')
    .replace(/<\/article>/gi, '')
    .replace(/\[IMAGE\]/g, '')
    .replace(/Slide \d+/g, '')
    .replace(/\r\n/g, '\n')
    .trim();
}

function generateLectureMarkdown(title, lectureNum, tagList, sourceDesc, slidesData) {
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
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียด 100% ครบทุกหน้าสไลด์ ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล (ไม่มีการจัดกลุ่มหรือข้ามหน้าสไลด์) เรียงลำดับตั้งแต่ Slide ${slidesData[0].slideNum} ถึง Slide ${slidesData[slidesData.length-1].slideNum}

---

`;

  slidesData.forEach(s => {
    const cleanText = cleanSlideText(s.text);
    
    // Split into reading parts if available
    let mainContent = cleanText;
    let visualPart = '';
    let takeawaysPart = '';
    
    if (cleanText.includes('อ่านภาพ') || cleanText.includes('อ่านการ')) {
      const parts = cleanText.split(/อ่านภาพ[^\n]*|อ่านการ[^\n]*/);
      mainContent = parts[0].trim();
      const rest = parts[1] || '';
      if (rest.includes('ประเด็นที่ควรจำ') || rest.includes('ประเด็นสำคัญที่ควรจำ')) {
        const subParts = rest.split(/ประเด็นที่ควรจำ|ประเด็นสำคัญที่ควรจำ/);
        visualPart = subParts[0].trim();
        takeawaysPart = subParts[1].trim();
      } else {
        visualPart = rest.trim();
      }
    } else if (cleanText.includes('ประเด็นที่ควรจำ') || cleanText.includes('ประเด็นสำคัญที่ควรจำ')) {
      const parts = cleanText.split(/ประเด็นที่ควรจำ|ประเด็นสำคัญที่ควรจำ/);
      mainContent = parts[0].trim();
      takeawaysPart = parts[1].trim();
    }

    md += `## 📄 Slide ${s.slideNum}: ${s.title}\n\n`;
    md += `*📄 Slide ${s.slideNum}*\n\n`;
    
    // Main text
    md += `${mainContent}\n\n`;
    
    // Visual breakdown if exists
    if (visualPart) {
      md += `> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์\n`;
      visualPart.split('\n').filter(l => l.trim()).forEach(l => {
        md += `> ${l.trim()}\n`;
      });
      md += `\n`;
    }
    
    // Takeaways if exists
    if (takeawaysPart) {
      md += `> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)\n`;
      takeawaysPart.split('\n').filter(l => l.trim()).forEach(l => {
        md += `> - ${l.trim().replace(/^[-•*]\s*/, '')}\n`;
      });
      md += `\n`;
    }
    
    md += `---\n\n`;
  });

  return md;
}

const ch1Data = JSON.parse(fs.readFileSync('tools/ch1_parsed.json', 'utf8'));
const ch2Data = JSON.parse(fs.readFileSync('tools/ch2_parsed.json', 'utf8'));
const ch3Data = JSON.parse(fs.readFileSync('tools/ch3_parsed.json', 'utf8'));

// Generate Lecture 1 (Slides 1 to 49)
const l1Slides = ch1Data.filter(s => s.slideNum >= 1 && s.slideNum <= 49);
const l1Sources = `> - **สไลด์บทเรียนหลัก:** [Chapter_1_Fundamental-Network_models_1-89.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_1_Fundamental-Network_models_1-89.html) *(สไลด์ 1–49)*
> - **ไฟล์สไลด์ PDF:** [Chapter_1_Introduction.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction.pdf) & [Chapter_1_Introduction_TH.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction_TH.pdf)
> - **หนังสือเรียนอ้างอิง:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Kurose & Ross — Chapter 1: Computer Networks and the Internet
> - **บทเรียนเว็บโต้ตอบ:** [ch1.html](file:///c:/Project/computer-network-&-Internet/New/ch1.html) & [computer-network-course/ch1/index.html](file:///c:/Project/computer-network-&-Internet/computer-network-course/ch1/index.html)`;

const l1Md = generateLectureMarkdown(
  'Lecture 1: Fundamental of Computer Network — Slide-by-Slide Complete Guide',
  1,
  ['fundamentals', 'network-edge', 'network-core', 'delays', 'packet-switching', 'history'],
  l1Sources,
  l1Slides
);
fs.writeFileSync('Wiki/Lecture 1 - Fundamental of Computer Network.md', l1Md, 'utf8');
console.log('Saved Lecture 1 (Slides 1-49):', l1Md.length, 'chars');

// Generate Lecture 2 (Slides 50 to 89)
const l2Slides = ch1Data.filter(s => s.slideNum >= 50 && s.slideNum <= 89);
const l2Sources = `> - **สไลด์บทเรียนหลัก:** [Chapter_1_Fundamental-Network_models_1-89.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_1_Fundamental-Network_models_1-89.html) *(สไลด์ 50–89)*
> - **ไฟล์สไลด์ PDF:** [Chapter_1_Introduction.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction.pdf) & [Chapter_1_Introduction_TH.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction_TH.pdf)
> - **หนังสือเรียนอ้างอิง:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Kurose & Ross — Section 1.5: Protocol Layers and Their Service Models
> - **บทเรียนเว็บโต้ตอบ:** [ch2.html](file:///c:/Project/computer-network-&-Internet/New/ch2.html), [tcpipmodel.html](file:///c:/Project/computer-network-&-Internet/New/tcpipmodel.html) & [computer-network-course/ch2/index.html](file:///c:/Project/computer-network-&-Internet/computer-network-course/ch2/index.html)`;

const l2Md = generateLectureMarkdown(
  'Lecture 2: Network Models and Layered Architecture — Slide-by-Slide Complete Guide',
  2,
  ['network-models', 'osi-model', 'tcp-ip', 'encapsulation', 'pdu', 'wireshark'],
  l2Sources,
  l2Slides
);
fs.writeFileSync('Wiki/Lecture 2 - Network Models and Layered Architecture.md', l2Md, 'utf8');
console.log('Saved Lecture 2 (Slides 50-89):', l2Md.length, 'chars');

// Generate Lecture 3 (Slides 1 to 119)
const l3Sources = `> - **สไลด์บทเรียนหลัก:** [Chapter_2_Application_Layer_1-119.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_2_Application_Layer_1-119.html) *(สไลด์ 1–119)*
> - **ไฟล์สไลด์ PDF:** [Chapter_2_Application_Layer.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_2_Application_Layer.pdf)
> - **หนังสือเรียนอ้างอิง:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Kurose & Ross — Chapter 2: Application Layer
> - **บทเรียนเว็บโต้ตอบ:** [ch3.html](file:///c:/Project/computer-network-&-Internet/New/ch3.html), [brosing-msg.html](file:///c:/Project/computer-network-&-Internet/New/brosing-msg.html), [email.html](file:///c:/Project/computer-network-&-Internet/New/email.html) & [computer-network-course/ch3/index.html](file:///c:/Project/computer-network-&-Internet/computer-network-course/ch3/index.html)
> - **แบบทดสอบจริงจาก Classroom:** [exam.md](file:///c:/Project/computer-network-&-Internet/New/exam.md)`;

const l3Md = generateLectureMarkdown(
  'Lecture 3: Application Layer Protocols and Architectures — Slide-by-Slide Complete Guide',
  3,
  ['application-layer', 'http', 'https', 'dns', 'email', 'dash', 'cdn', 'socket-programming'],
  l3Sources,
  ch2Data
);
fs.writeFileSync('Wiki/Lecture 3 - Application Layer Protocols and Architectures.md', l3Md, 'utf8');
console.log('Saved Lecture 3 (Slides 1-119):', l3Md.length, 'chars');

// Generate Lecture 4 (Slides 1 to 154)
const l4Sources = `> - **สไลด์บทเรียนหลัก:** [Chapter_3_ Transport_Layer_1-154.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_3_%20Transport_Layer_1-154.html) *(สไลด์ 1–154)*
> - **ไฟล์สไลด์ PDF:** [Chapter_3_Transport_Layer.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_Transport_Layer.pdf) & [Chapter_3_v9.0_st.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_v9.0_st.pdf)
> - **หนังสือเรียนอ้างอิง:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Kurose & Ross — Chapter 3: Transport Layer
> - **สไลด์สรุปอาจารย์:** [2026_DATACOM_Layer4_Transport_layer.pdf](file:///c:/Project/computer-network-&-Internet/New/2026_DATACOM_Layer4_Transport_layer.pdf)`;

const l4Md = generateLectureMarkdown(
  'Lecture 4: Transport Layer Protocols and Mechanics — Slide-by-Slide Complete Guide',
  4,
  ['transport-layer', 'tcp', 'udp', 'rdt', 'handshake', 'congestion-control', 'flow-control'],
  l4Sources,
  ch3Data
);
fs.writeFileSync('Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md', l4Md, 'utf8');
console.log('Saved Lecture 4 (Slides 1-154):', l4Md.length, 'chars');
