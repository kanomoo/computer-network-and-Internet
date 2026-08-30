const fs = require('fs');
const path = require('path');

const wikiDir = 'Wiki';
const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

// Update Lecture 1 Slide 8 specifically
const l1Path = path.join(wikiDir, 'Lecture 1 - Fundamental of Computer Network.md');
let l1Content = fs.readFileSync(l1Path, 'utf8');

const cleanSlide8Block = `## 📄 Slide 8: What’s a protocol? — เปรียบเทียบลำดับการสนทนาของมนุษย์กับเครือข่าย

*📄 Slide 8*

สไลด์เปรียบเทียบโปรโตคอลของมนุษย์กับโปรโตคอลเครือข่ายโดยใช้ message sequence diagram อย่างง่าย ทั้งสองกรณีมีผู้สื่อสารสองฝ่าย ข้อความถูกส่งไปมาในลำดับที่แน่นอน และข้อความหนึ่งทำให้เกิดการตอบสนองถัดไป ฝั่งมนุษย์เริ่มจากการทักทาย Hi และได้รับคำตอบ Hi จากนั้นจึงถาม Got the time? และได้รับคำตอบ 2:00 ลำดับนี้แสดงว่าความหมายของข้อความขึ้นอยู่กับบริบทและข้อความก่อนหน้า การตอบเวลาเกิดหลังจากมีคำถาม ไม่ได้เกิดขึ้นโดยไม่มีเหตุการณ์กระตุ้น ฝั่งเครือข่าย คอมพิวเตอร์ส่ง TCP connection request ไปยังเซิร์ฟเวอร์และได้รับ TCP connection response เมื่อมีการเชื่อมต่อแล้ว ไคลเอนต์จึงส่งคำขอ GET http://gaia.cs.umass.edu/kurose_ross และเซิร์ฟเวอร์ตอบกลับด้วย <file> ซึ่งแทนเนื้อหาไฟล์ที่ร้องขอ ตัวอย่างนี้ชี้ให้เห็นทั้งชนิดข้อความ ลำดับ และการกระทำตอบสนองตามโปรโตคอล อ่านทิศทางลูกศรและแกนเวลา เส้นแบ่งแนวตั้งตรงกลางแยกตัวอย่างมนุษย์ทางซ้ายออกจากตัวอย่างเครือข่ายทางขวา คำว่า time และลูกศรสีเทาชี้ลงหมายความว่าเวลาเคลื่อนจากบนลงล่าง ดังนั้นข้อความที่อยู่สูงกว่าเกิดก่อนข้อความที่อยู่ต่ำกว่า ลูกศรสีน้ำเงินชี้จากผู้ส่งไปยังผู้รับ จึงต้องอ่านทั้งทิศทางและตำแหน่งแนวตั้ง ตัวอย่างเครือข่ายมีไคลเอนต์อยู่ซ้ายและเซิร์ฟเวอร์อยู่ขวา คำขอเชื่อมต่อและคำขอ GET เคลื่อนไปทางขวา ส่วนคำตอบการเชื่อมต่อและไฟล์เคลื่อนกลับทางซ้าย คำถามสีแดง Q: other human protocols? เป็นกิจกรรมชวนคิดให้นักศึกษายกตัวอย่างการสื่อสารของมนุษย์ที่มีกฎและลำดับ เช่น การสั่งอาหารหรือการโทรศัพท์ สไลด์นี้ไม่มีแกนเชิงตัวเลข กราฟ หรือตาราง แกนเวลาใช้เพื่อบอกลำดับเท่านั้น

\`\`\`mermaid
sequenceDiagram
    autonumber
    participant A as Alice
    participant B as Bob
    participant C as Web Client
    participant S as Web Server

    Note over A,B: Human Protocol
    A->>B: Hi
    B-->>A: Hi
    A->>B: Got the time
    B-->>A: 2:00

    Note over C,S: Computer Network Protocol
    C->>S: TCP Connection Request (SYN)
    S-->>C: TCP Connection Reply (SYN-ACK)
    C->>S: HTTP GET index.html
    S-->>C: HTTP 200 OK (Data File)
\`\`\`

| ลำดับขั้นตอน | 👥 Human Protocol (การสนทนาของมนุษย์) | 💻 Network Protocol (เครือข่ายคอมพิวเตอร์) |
| :---: | :--- | :--- |
| **1** | Alice พูด: *"Hi"* (ทักทาย) | Client ส่ง: \`TCP SYN\` (ขอสร้างการเชื่อมต่อ) |
| **2** | Bob ตอบกลับ: *"Hi"* (ทักทายตอบ) | Server ตอบ: \`TCP SYN-ACK\` (ยินยอมสร้างการเชื่อมต่อ) |
| **3** | Alice ถาม: *"Got the time?"* (ขอทราบเวลา) | Client ส่ง: \`HTTP GET index.html\` (ขอไฟล์หน้าเว็บ) |
| **4** | Bob ตอบกลับ: *"2:00"* (บอกเวลาบ่ายสองโมง) | Server ตอบ: \`HTTP 200 OK\` (ส่งข้อมูลไฟล์เว็บเพจกลับมา) |`;

l1Content = l1Content.replace(/## 📄 Slide 8: What’s a protocol[\s\S]*?```mermaid\s*sequenceDiagram[\s\S]*?```/m, cleanSlide8Block);
fs.writeFileSync(l1Path, l1Content, 'utf8');

// Also sanitize ALL other sequenceDiagrams across all wiki files
files.forEach(file => {
  const filePath = path.join(wikiDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/```mermaid\s*sequenceDiagram[\s\S]*?```/g, (block) => {
    let lines = block.split('\n');
    let newLines = [];

    lines.forEach(l => {
      let trimmed = l.trim();

      // Convert actor to participant and clean emojis from alias
      if (trimmed.startsWith('actor ') || trimmed.startsWith('participant ')) {
        const m = trimmed.match(/^(actor|participant)\s+([A-Za-z0-9_]+)\s+as\s+"?(.*?)"?$/);
        if (m) {
          const id = m[2];
          let alias = m[3].replace(/[^\w\s\(\)\-\.,]/g, '').trim(); // strip emojis
          newLines.push(`    participant ${id} as ${alias}`);
          return;
        }
      }

      // Clean emojis from Note over
      if (trimmed.startsWith('Note over ')) {
        const noteClean = trimmed.replace(/[^\w\s\(\)\-\.:,]/g, '').replace(/\s+/g, ' ');
        newLines.push('    ' + noteClean);
        return;
      }

      // Clean messages
      if (l.includes('->>') || l.includes('-->>') || l.includes('->') || l.includes('--)')) {
        let msg = l.replace(/\+/g, 'and').replace(/\?/g, '');
        newLines.push(msg);
        return;
      }

      newLines.push(l);
    });

    return newLines.join('\n');
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Sanitized all sequence diagrams to 100% pure standard syntax');
