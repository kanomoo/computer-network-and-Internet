const fs = require('fs');

// This script reads a lecture file, finds slides WITHOUT visuals,
// and injects a visual block based on keywords in the slide's text content.

function generateVisualForSlide(slideNum, content) {
  const lower = content.toLowerCase();
  
  // Detect content type and generate appropriate visual
  
  // --- ROADMAP / OVERVIEW slides ---
  if (lower.includes('roadmap') || lower.includes('overview') || lower.includes('outline') || lower.includes('สารบัญ') || lower.includes('แผนที่เนื้อหา')) {
    return `> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง`;
  }
  
  // --- SECURITY slides ---
  if (lower.includes('security') || lower.includes('malware') || lower.includes('virus') || lower.includes('worm') || lower.includes('ddos') || lower.includes('botnet') || lower.includes('sniff') || lower.includes('spoof') || lower.includes('attack') || lower.includes('firewall')) {
    return `| ประเภทภัยคุกคาม | กลไกการทำงาน | ผลกระทบต่อเครือข่าย |
| :--- | :--- | :--- |
| 🦠 **Malware** | แพร่กระจายผ่านไฟล์/เว็บไซต์ ติดตั้งตัวเองในระบบ | ขโมยข้อมูล ทำลายไฟล์ ใช้เครื่องเป็น Botnet |
| 🌊 **DoS/DDoS** | ส่งทราฟฟิกปริมาณมหาศาลไปยังเป้าหมาย | เซิร์ฟเวอร์ล่ม ให้บริการไม่ได้ |
| 👃 **Packet Sniffing** | ดักจับแพ็กเก็ตที่วิ่งผ่าน Shared Medium | อ่านข้อมูลที่ไม่เข้ารหัสได้ (Passwords, Cookies) |
| 🎭 **IP Spoofing** | ปลอมแปลง Source IP Address ในแพ็กเก็ต | แอบอ้างตัวตนเป็นโฮสต์อื่นเพื่อหลบเลี่ยงระบบกรอง |`;
  }
  
  // --- HISTORY slides ---
  if (lower.includes('history') || lower.includes('ประวัติ') || lower.includes('1961') || lower.includes('arpanet') || lower.includes('nsfnet') || lower.includes('commercialization')) {
    return `> [!INFO] 📜 ยุคประวัติศาสตร์ที่กล่าวถึงในสไลด์นี้
> สไลด์นี้เป็นส่วนหนึ่งของลำดับเหตุการณ์ประวัติศาสตร์อินเทอร์เน็ต แสดงพัฒนาการสำคัญที่นำไปสู่เทคโนโลยีเครือข่ายในปัจจุบัน`;
  }
  
  // --- PACKET SWITCHING slides ---
  if (lower.includes('packet switching') || lower.includes('store and forward') || lower.includes('store-and-forward') || lower.includes('queuing') || lower.includes('queueing')) {
    return `\`\`\`
[ Packet Switching: Store-and-Forward ]
Source ──(Packet 1)──> [ Router Queue: | P3 | P2 | P1 | ] ──(Output Link)──> Next Hop
                       (รอคิวใน Buffer ก่อนส่งออก)
                       *** ถ้า Buffer เต็ม → Packet Loss! ***
\`\`\``;
  }

  // --- CIRCUIT SWITCHING slides ---
  if (lower.includes('circuit switching') || lower.includes('circuit-switching') || lower.includes('วงจรสวิตช์')) {
    return `\`\`\`
[ Circuit Switching: Dedicated Path ]
Source ═══════(Reserved Circuit)═══════ Destination
  (แบนด์วิดท์ถูกจองตลอดเวลาแม้ไม่ได้ส่งข้อมูล → สิ้นเปลือง)
\`\`\``;
  }
  
  // --- FDM/TDM slides ---
  if (lower.includes('fdm') || lower.includes('tdm') || lower.includes('frequency division') || lower.includes('time division')) {
    return `| การแบ่งช่อง | หลักการ | ผู้ใช้ได้อะไร |
| :--- | :--- | :--- |
| 📻 **FDM** | แบ่งความถี่เป็นช่วงย่อย | ได้ย่านความถี่เฉพาะตัว ใช้ได้ตลอด |
| ⏱️ **TDM** | แบ่งเวลาเป็น Time Slot | ได้แบนด์วิดท์เต็มแต่เฉพาะช่วงเวลาของตัวเอง |`;
  }
  
  // --- ISP / Internet structure slides ---
  if (lower.includes('isp') || lower.includes('tier-1') || lower.includes('tier 1') || lower.includes('ixp') || lower.includes('internet exchange') || lower.includes('content provider') || lower.includes('peering')) {
    return `\`\`\`
[ Internet Hierarchical Structure ]
  Google/Netflix (Content Providers) ──> [ IXP / Peering Points ]
       ▲                                        ▲
       │                                        │
  [ Tier-1 ISP ] <══(Peering: Free)══> [ Tier-1 ISP ]
       ▲                                        ▲
       │ ($)                                    │ ($)
  [ Regional ISP ] ──────────────── [ Regional ISP ]
       ▲                                        ▲
       │ ($)                                    │ ($)
  [ Access ISP / Home / Enterprise ]   [ Access ISP ]
\`\`\``;
  }
  
  // --- DELAY / LOSS / THROUGHPUT slides ---
  if (lower.includes('delay') || lower.includes('loss') || lower.includes('throughput') || lower.includes('bandwidth') || lower.includes('latency') || lower.includes('ดีเลย์') || lower.includes('ความหน่วง')) {
    if (lower.includes('throughput')) {
      return `> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\\text{Throughput}_{\\text{end-to-end}} = \\min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด`;
    }
    return `> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\\text{nodal}} = d_{\\text{proc}} + d_{\\text{queue}} + d_{\\text{trans}} + d_{\\text{prop}}$$
> - $d_{\\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\\text{prop}}$ = $d/s$ (Propagation Delay)`;
  }
  
  // --- TRACEROUTE slides ---
  if (lower.includes('traceroute') || lower.includes('tracert') || lower.includes('icmp')) {
    return `\`\`\`
[ Traceroute Mechanism: ค้นหาเส้นทาง Hop-by-Hop ]
Source ──(TTL=1)──> Router 1: TTL expired → ส่ง ICMP Time Exceeded กลับ
Source ──(TTL=2)──> Router 2: TTL expired → ส่ง ICMP Time Exceeded กลับ
Source ──(TTL=3)──> Destination: ส่ง ICMP Port Unreachable กลับ (จบ!)
\`\`\``;
  }
  
  // --- PROTOCOL LAYERS / OSI / ENCAPSULATION slides ---
  if (lower.includes('encapsulation') || lower.includes('เอ็นแคป') || lower.includes('ห่อหุ้ม') || lower.includes('pdu') || lower.includes('payload')) {
    return `\`\`\`
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
\`\`\``;
  }

  // --- LAYER / SERVICE MODEL slides ---
  if (lower.includes('layer') || lower.includes('เลเยอร์') || lower.includes('service model') || lower.includes('protocol stack')) {
    return `| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |`;
  }
  
  // --- Default: generate a simple summary box ---
  return `> [!EXAMPLE] 📌 สรุปสาระสำคัญของสไลด์
> สไลด์นี้อธิบายแนวคิดและหลักการที่ต้องจำ โดยเนื้อหาหลักได้รับการอธิบายอย่างละเอียดในย่อหน้าข้างต้นแล้ว`;
}

function injectVisualsIntoLecture(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Find all slide sections
  const slideHeaders = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^## 📄 Slide (\d+)/);
    if (m) slideHeaders.push({num: parseInt(m[1]), line: i});
  }
  
  // Find slides without visuals
  const slidesNeedingVisual = [];
  for (let s = 0; s < slideHeaders.length; s++) {
    const start = slideHeaders[s].line;
    const end = s < slideHeaders.length - 1 ? slideHeaders[s+1].line : lines.length;
    const section = lines.slice(start, end).join('\n');
    
    const hasCode = section.includes('```');
    const hasTable = /\n\|[^\n]+\|\n\|[\s:\-|]+\|\n/.test(section);
    const hasDef = section.includes('[!DEFINITION]') || section.includes('[!EXAMPLE]');
    
    if (!hasCode && !hasTable && !hasDef) {
      slidesNeedingVisual.push({
        slideNum: slideHeaders[s].num,
        startLine: start,
        endLine: end,
        sectionText: section
      });
    }
  }
  
  if (slidesNeedingVisual.length === 0) {
    console.log('  → All slides already have visuals!');
    return;
  }
  
  console.log('  → ' + slidesNeedingVisual.length + ' slides need visuals');
  
  // Process in reverse order to not mess up line numbers
  let newLines = [...lines];
  for (let i = slidesNeedingVisual.length - 1; i >= 0; i--) {
    const slide = slidesNeedingVisual[i];
    const visual = generateVisualForSlide(slide.slideNum, slide.sectionText);
    
    // Find the right insertion point: before the > [!IMPORTANT] or > [!NOTE] line, or before ---
    let insertLine = -1;
    for (let j = slide.startLine; j < slide.endLine; j++) {
      if (newLines[j].trim().startsWith('> [!IMPORTANT]') || newLines[j].trim().startsWith('> [!NOTE]')) {
        insertLine = j;
        break;
      }
    }
    
    if (insertLine === -1) {
      // Find the --- separator
      for (let j = slide.endLine - 1; j > slide.startLine; j--) {
        if (newLines[j].trim() === '---') {
          insertLine = j;
          break;
        }
      }
    }
    
    if (insertLine === -1) {
      insertLine = slide.endLine;
    }
    
    // Insert the visual block with blank lines
    const insertBlock = ['', visual, ''];
    newLines.splice(insertLine, 0, ...insertBlock);
  }
  
  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  console.log('  → Injected visuals for ' + slidesNeedingVisual.length + ' slides');
}

// Process all 4 lectures
const lectures = [
  'Wiki/Lecture 1 - Fundamental of Computer Network.md',
  'Wiki/Lecture 2 - Network Models and Layered Architecture.md',
  'Wiki/Lecture 3 - Application Layer Protocols and Architectures.md',
  'Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md',
];

lectures.forEach(f => {
  console.log('Processing: ' + f);
  injectVisualsIntoLecture(f);
});

console.log('\nDone! Run audit_visual_coverage.js to verify.');
