const fs = require('fs');

// This improved script replaces generic EXAMPLE boxes with 
// content-specific visuals based on deeper keyword analysis

function analyzeAndGenerate(slideNum, content) {
  const lower = content.toLowerCase();
  
  // === APPLICATION LAYER SPECIFICS ===
  
  // HTTP
  if (lower.includes('http') && (lower.includes('request') || lower.includes('response') || lower.includes('method') || lower.includes('get') || lower.includes('post'))) {
    if (lower.includes('cookie') || lower.includes('คุกกี้')) {
      return `| องค์ประกอบ Cookie | หน้าที่ | ตัวอย่าง |
| :--- | :--- | :--- |
| **Cookie Header Line (Response)** | Server สร้าง Cookie ส่งกลับ | \`Set-Cookie: id=1678\` |
| **Cookie Header Line (Request)** | Client ส่ง Cookie กลับไป | \`Cookie: id=1678\` |
| **Cookie File (Browser)** | เก็บ Cookie ไว้ใน Disk | \`amazon.com: id=1678\` |
| **Back-end Database** | Server เก็บข้อมูลผู้ใช้แมปกับ Cookie ID | \`id=1678 → สินค้าในตะกร้า\` |`;
    }
    if (lower.includes('persistent') || lower.includes('non-persistent') || lower.includes('pipelining')) {
      return `| รูปแบบ HTTP Connection | กลไก | จำนวน TCP Connection |
| :--- | :--- | :--- |
| **Non-Persistent (HTTP/1.0)** | เปิด TCP ใหม่ทุกครั้งต่อ 1 Object | N objects = N connections |
| **Persistent w/o Pipelining** | ใช้ TCP เดิม แต่ส่งทีละ Object | 1 connection, sequential |
| **Persistent w/ Pipelining (HTTP/1.1)** | ส่ง Request หลายตัวต่อเนื่องไม่ต้องรอ Response | 1 connection, parallel requests |
| **HTTP/2 Multiplexing** | แบ่งข้อมูลเป็น Frames สลับส่งใน 1 TCP | 1 connection, interleaved frames |`;
    }
    if (lower.includes('status') || lower.includes('200') || lower.includes('404') || lower.includes('301')) {
      return `| Status Code | ความหมาย | เมื่อไหร่ที่เกิด |
| :---: | :--- | :--- |
| **200 OK** | สำเร็จ ส่งข้อมูลกลับได้ | Request ถูกต้องและทรัพยากรมีอยู่ |
| **301 Moved Permanently** | ย้ายถาวร | URL เปลี่ยนไปแล้ว → ให้ Redirect |
| **400 Bad Request** | คำขอผิดรูปแบบ | Syntax ผิดหรือ Parameter ไม่ถูกต้อง |
| **404 Not Found** | ไม่พบทรัพยากร | ไฟล์/หน้าเว็บไม่มีอยู่บน Server |
| **505 HTTP Version Not Supported** | เวอร์ชัน HTTP ไม่รองรับ | Client ใช้ HTTP เวอร์ชันที่ Server ไม่รู้จัก |`;
    }
    return `\`\`\`
[ HTTP Request/Response Flow ]
Client                                 Server
  │── HTTP Request ──────────────────────>│
  │   (Method: GET/POST, URL, Headers)    │
  │                                       │
  │<──────────────── HTTP Response ───────│
  │   (Status: 200/404, Headers, Body)    │
\`\`\``;
  }
  
  // DNS
  if (lower.includes('dns') && (lower.includes('query') || lower.includes('resolve') || lower.includes('name server') || lower.includes('โดเมน') || lower.includes('domain'))) {
    if (lower.includes('iterative') || lower.includes('recursive')) {
      return `\`\`\`
[ DNS Resolution: Iterative vs Recursive ]

Iterative:
Host ─(query)─> Local DNS ─(query)─> Root DNS ──> "ไปถาม .com DNS"
                    │<──(referral)──<──┘
                    │─(query)─> .com TLD DNS ──> "ไปถาม Authoritative"
                    │<──(referral)──<──┘
                    │─(query)─> Authoritative DNS ──> "IP = 93.184.216.34"
                    │<──(answer)──<──┘
Host <──(answer)──<─┘

Recursive:
Host ─(query)─> Local DNS ─(query)─> Root ─(query)─> TLD ─(query)─> Auth
Host <──(answer)──<── Local <──(answer)──<── Root <──(answer)──<── TLD <──(answer)──<── Auth
\`\`\``;
    }
    if (lower.includes('record') || lower.includes('type a') || lower.includes('type ns') || lower.includes('cname') || lower.includes('mx')) {
      return `| Record Type | Format | ตัวอย่าง | หน้าที่ |
| :---: | :--- | :--- | :--- |
| **A** | (name, IP, A, TTL) | (example.com, 1.2.3.4, A) | แปลงชื่อเป็น IPv4 |
| **NS** | (domain, nameserver, NS, TTL) | (example.com, dns1.example.com, NS) | ชี้ไปยัง Name Server |
| **CNAME** | (alias, canonical, CNAME, TTL) | (www.ibm.com, servereast.ibm.com, CNAME) | Alias ชื่อ |
| **MX** | (domain, mailserver, MX, TTL) | (example.com, mail.example.com, MX) | ชี้ไปยัง Mail Server |`;
    }
    return `\`\`\`
[ DNS Hierarchy ]
         ┌─────────────────────┐
         │   Root DNS (.)      │  ← 13 Root Servers (A-M)
         └────┬────────────┬───┘
              │            │
     ┌────────▼──┐    ┌───▼────────┐
     │ .com TLD  │    │ .org TLD   │  ← Top-Level Domain
     └────┬──────┘    └───┬────────┘
          │               │
   ┌──────▼───────┐  ┌───▼──────────┐
   │ google.com   │  │ wikipedia.org│  ← Authoritative DNS
   │ Auth DNS     │  │ Auth DNS     │
   └──────────────┘  └──────────────┘
\`\`\``;
  }
  
  // SMTP / Email
  if (lower.includes('smtp') || lower.includes('email') || lower.includes('mail') || lower.includes('อีเมล')) {
    if (lower.includes('imap') || lower.includes('pop3') || lower.includes('pop')) {
      return `| โปรโตคอล | หน้าที่ | Port | ทิศทาง |
| :---: | :--- | :---: | :--- |
| **SMTP** | ส่งอีเมลจาก Client/Server ไป Server | 25/587 | Push (ส่งออก) |
| **POP3** | ดึงอีเมลจาก Server มา Client (Download + Delete) | 110 | Pull (ดึงเข้า) |
| **IMAP** | จัดการอีเมลบน Server จาก Client (Sync) | 143 | Pull + Manage |
| **HTTP** | เข้าถึงอีเมลผ่าน Web Browser (Gmail, Outlook) | 80/443 | Pull (Web-based) |`;
    }
    return `\`\`\`
[ Email Delivery Flow ]
Sender UA ──(SMTP)──> Sender Mail Server ──(SMTP)──> Receiver Mail Server ──(POP3/IMAP)──> Receiver UA
    │                    │ Queue              │ Mailbox                │
    │                    │ (รอส่ง)            │ (กล่องจดหมาย)          │
\`\`\``;
  }
  
  // FTP
  if (lower.includes('ftp') && (lower.includes('file transfer') || lower.includes('control') || lower.includes('data connection'))) {
    return `\`\`\`
[ FTP Dual Connection Model ]
Client                          Server
  │════ Control Connection (Port 21) ═══════│  ← ส่งคำสั่ง (ls, get, put)
  │      (Persistent, ค้างไว้ตลอด Session)  │
  │                                         │
  │──── Data Connection (Port 20) ─────────>│  ← ส่งไฟล์ (เปิดใหม่ทุกครั้ง)
  │      (Non-Persistent, ปิดเมื่อส่งเสร็จ) │
\`\`\``;
  }
  
  // Socket Programming
  if (lower.includes('socket') && (lower.includes('programming') || lower.includes('api') || lower.includes('bind') || lower.includes('listen') || lower.includes('accept'))) {
    return `\`\`\`
[ TCP Socket Programming Flow ]
       Server                          Client
  ┌─────────────┐                ┌──────────────┐
  │ socket()    │                │ socket()     │
  │ bind()      │                │              │
  │ listen()    │                │              │
  │ accept()    │<── TCP SYN ───│ connect()    │
  │  (block)    │── SYN-ACK ──> │              │
  │             │<── ACK ───────│              │
  │ read()      │<── Data ──────│ write()      │
  │ write()     │── Data ──────>│ read()       │
  │ close()     │               │ close()      │
  └─────────────┘               └──────────────┘
\`\`\``;
  }
  
  // P2P
  if (lower.includes('p2p') || lower.includes('peer-to-peer') || lower.includes('bittorrent') || lower.includes('torrent')) {
    return `\`\`\`
[ P2P Architecture: ทุก Peer เป็นทั้ง Client และ Server ]
  Peer A ◄──────────► Peer B
    ▲  ╲               ╱  ▲
    │    ╲             ╱    │
    │      ╲         ╱      │
    ▼        ╲     ╱        ▼
  Peer D ◄────► Peer C
  
  (ยิ่งมี Peer มาก → Capacity ยิ่งสูง → ปรับขนาดได้ดีกว่า Client-Server)
\`\`\``;
  }
  
  // CDN
  if (lower.includes('cdn') || lower.includes('content distribution') || lower.includes('content delivery')) {
    return `\`\`\`
[ CDN: Content Delivery Network ]
  Origin Server (เก็บต้นฉบับ)
       │
       ▼
  ┌─── CDN Infrastructure ────────────────┐
  │ Edge Server A (กรุงเทพ)               │
  │ Edge Server B (สิงคโปร์)              │  ← กระจายสำเนาไว้ใกล้ผู้ใช้
  │ Edge Server C (โตเกียว)               │
  └───────────────────────────────────────┘
       │
       ▼
  User → DNS Redirect → ไปยัง Edge ที่ใกล้ที่สุด → ลด Latency
\`\`\``;
  }
  
  // Video Streaming / DASH
  if (lower.includes('video streaming') || lower.includes('dash') || lower.includes('adaptive') || lower.includes('manifest') || lower.includes('chunk')) {
    return `| องค์ประกอบ DASH | หน้าที่ | รายละเอียด |
| :--- | :--- | :--- |
| **Manifest File (MPD)** | รายการ URL ของ Chunk ทุกคุณภาพ | Client ดาวน์โหลดก่อนเริ่มเล่น |
| **Video Chunks** | ไฟล์วิดีโอแบ่งเป็นท่อนสั้นๆ (2-10 วินาที) | แต่ละท่อนมีหลายคุณภาพ (240p-4K) |
| **Client Intelligence** | เลือกคุณภาพ Chunk ถัดไป | ปรับตาม Bandwidth ที่วัดได้ + Buffer Level |
| **Buffer** | เก็บ Chunk ที่ดาวน์โหลดรอเล่น | Buffer เยอะ = เล่นลื่น, Buffer น้อย = สะดุด |`;
  }
  
  // === TRANSPORT LAYER SPECIFICS ===
  
  // TCP Connection (3-Way Handshake)
  if (lower.includes('3-way') || lower.includes('three-way') || lower.includes('syn') || lower.includes('handshake') || lower.includes('connection establishment')) {
    return `\`\`\`
[ TCP 3-Way Handshake ]
Client                          Server
  │── SYN (seq=x) ────────────────>│   Step 1: Client ส่ง SYN
  │                                │
  │<── SYN-ACK (seq=y, ack=x+1) ──│   Step 2: Server ตอบ SYN-ACK
  │                                │
  │── ACK (seq=x+1, ack=y+1) ────>│   Step 3: Client ส่ง ACK → เชื่อมต่อสำเร็จ!
  │                                │
  │══════════ Data Transfer ══════>│
\`\`\``;
  }
  
  // TCP / Connection Close
  if (lower.includes('fin') || lower.includes('connection close') || lower.includes('timed wait') || lower.includes('4-way')) {
    return `\`\`\`
[ TCP Connection Close (4-Way) ]
Client                          Server
  │── FIN ────────────────────────>│   Client ขอปิด
  │<── ACK ────────────────────────│   Server รับทราบ
  │<── FIN ────────────────────────│   Server ขอปิดด้วย
  │── ACK ────────────────────────>│   Client รับทราบ
  │  (TIMED WAIT: 2*MSL)          │   รอให้แน่ใจว่า ACK ถึง
  │── [Connection Closed] ────────>│
\`\`\``;
  }
  
  // TCP Congestion Control
  if (lower.includes('congestion') || lower.includes('cwnd') || lower.includes('slow start') || lower.includes('aimd') || lower.includes('ssthresh')) {
    return `> [!DEFINITION] TCP Congestion Control Phases
> 1. **Slow Start:** $cwnd$ เริ่มจาก 1 MSS, เพิ่มเป็นสองเท่าทุก RTT (exponential)
> 2. **Congestion Avoidance:** เมื่อ $cwnd \\geq ssthresh$ → เพิ่มทีละ 1 MSS ต่อ RTT (linear, AIMD)
> 3. **Fast Recovery (TCP Reno):** เมื่อได้ 3 Duplicate ACKs → $ssthresh = cwnd/2$, $cwnd = ssthresh + 3$
> 4. **Timeout:** เมื่อ Timeout → $ssthresh = cwnd/2$, $cwnd = 1$ MSS (กลับ Slow Start)`;
  }
  
  // TCP Flow Control
  if (lower.includes('flow control') || lower.includes('receive window') || lower.includes('rwnd') || lower.includes('receiver buffer')) {
    return `> [!DEFINITION] TCP Flow Control (ควบคุมอัตราส่งไม่ให้ล้น Buffer ผู้รับ)
> $$rwnd = \\text{RcvBuffer} - [\\text{LastByteRcvd} - \\text{LastByteRead}]$$
> - **RcvBuffer**: ขนาด Buffer ทั้งหมดของผู้รับ
> - **rwnd (Receive Window)**: พื้นที่ว่างที่เหลือ → ส่งผ่าน TCP Header กลับมาหาผู้ส่ง
> - ผู้ส่งจำกัด: $\\text{LastByteSent} - \\text{LastByteAcked} \\leq rwnd$`;
  }
  
  // Reliable Data Transfer (rdt)
  if (lower.includes('rdt') || lower.includes('reliable data transfer') || lower.includes('fsm') || lower.includes('state machine') || lower.includes('stop-and-wait') || lower.includes('stop and wait')) {
    if (lower.includes('rdt 1.0') || lower.includes('rdt1.0')) {
      return `\`\`\`
[ rdt 1.0: Reliable Transfer over Reliable Channel ]
Sender: make_pkt(data) → udt_send(packet)    (ส่งเลย ไม่ต้องรอ)
Receiver: extract(packet, data) → deliver_data(data)  (รับเลย ไม่ต้องตรวจ)
*** ช่องสื่อสารเชื่อถือได้ 100% → ไม่มี Error, ไม่มี Loss ***
\`\`\``;
    }
    if (lower.includes('rdt 2') || lower.includes('rdt2') || lower.includes('ack') || lower.includes('nak') || lower.includes('checksum')) {
      return `\`\`\`
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
\`\`\``;
    }
    if (lower.includes('rdt 3') || lower.includes('rdt3') || lower.includes('timer') || lower.includes('sequence number')) {
      return `\`\`\`
[ rdt 3.0: Stop-and-Wait with Timer ]
Sender ──(pkt 0)──> Receiver
  │ [Start Timer]     │── ส่ง ACK 0
  │<──── ACK 0 ───────│
  │ [Stop Timer]      │
  │──(pkt 1)──>       │── ส่ง ACK 1
  │ [Start Timer]     │
  │  *** Timeout! *** │   (ACK หาย)
  │──(pkt 1 ซ้ำ)──>   │── ส่ง ACK 1 (ซ้ำ, Receiver ทิ้ง Duplicate)
\`\`\``;
    }
    return `> [!DEFINITION] หลักการ Reliable Data Transfer
> - **Checksum:** ตรวจจับ Bit Error ในข้อมูล
> - **ACK/NAK:** แจ้งผู้ส่งว่ารับสำเร็จหรือไม่
> - **Sequence Number:** ตรวจจับ Duplicate Packet
> - **Timer + Retransmit:** จับเวลาและส่งซ้ำเมื่อ Timeout
> - **Pipelining:** ส่งหลาย Packet พร้อมกันเพื่อเพิ่มประสิทธิภาพ`;
  }
  
  // GBN / Selective Repeat / Pipelining
  if (lower.includes('go-back-n') || lower.includes('gbn') || lower.includes('selective repeat') || lower.includes('pipelining') || lower.includes('window size')) {
    if (lower.includes('selective repeat')) {
      return `| คุณสมบัติ | Go-Back-N (GBN) | Selective Repeat (SR) |
| :--- | :--- | :--- |
| **Window Size** | Sender มี Window, Receiver ไม่มี | ทั้ง Sender และ Receiver มี Window |
| **ACK Type** | Cumulative ACK | Individual ACK |
| **เมื่อเกิด Loss** | ส่งซ้ำทุก Packet ตั้งแต่ที่หาย | ส่งซ้ำเฉพาะ Packet ที่หาย |
| **Buffer ฝั่ง Receiver** | ไม่ต้อง Buffer (ทิ้ง Out-of-order) | ต้อง Buffer Packet ที่มาก่อน |
| **ประสิทธิภาพ** | เปลือง Bandwidth ถ้า Loss เยอะ | ประหยัด Bandwidth แต่ซับซ้อนกว่า |`;
    }
    return `> [!DEFINITION] Pipelining: ส่งหลาย Packet พร้อมกันโดยไม่ต้องรอ ACK ทีละตัว
> - **Window Size (N):** จำนวน Packet สูงสุดที่ส่งได้โดยยังไม่ได้ ACK
> - **Utilization:** $U_{sender} = \\frac{N \\cdot L/R}{RTT + L/R}$
> - เมื่อ N = 1 → Stop-and-Wait (ช้ามาก)
> - เมื่อ N > 1 → Pipeline (เร็วขึ้น N เท่า)`;
  }
  
  // UDP
  if (lower.includes('udp') && (lower.includes('segment') || lower.includes('datagram') || lower.includes('connectionless') || lower.includes('checksum'))) {
    if (lower.includes('checksum')) {
      return `> [!DEFINITION] UDP Checksum Calculation
> 1. แบ่งข้อมูลเป็นกลุ่ม 16-bit words
> 2. บวกทุก word ด้วย 1's complement addition
> 3. กลับบิต (complement) ผลลัพธ์ → ได้ Checksum
> 4. ฝั่งรับ: บวกทุก word + checksum → ต้องได้ \`1111111111111111\`
> 5. ถ้าไม่ใช่ → มี Error!`;
    }
    return `| คุณสมบัติ | TCP | UDP |
| :--- | :--- | :--- |
| **Connection** | Connection-oriented (3-Way Handshake) | Connectionless |
| **Reliability** | Reliable (ACK, Retransmit, Seq#) | Unreliable (Best-effort) |
| **Ordering** | In-order delivery | No ordering guarantee |
| **Flow Control** | Yes (rwnd) | No |
| **Congestion Control** | Yes (cwnd, AIMD) | No |
| **Speed** | ช้ากว่า (Overhead) | เร็วกว่า (Lightweight) |
| **Use Case** | Web, Email, File Transfer | DNS, VoIP, Gaming, Streaming |`;
  }
  
  // Multiplexing / Demultiplexing
  if (lower.includes('multiplex') || lower.includes('demultiplex') || lower.includes('port number') || lower.includes('พอร์ต')) {
    return `\`\`\`
[ Transport Layer: Multiplexing / Demultiplexing ]
              ┌── App P1 (Port 80)
              ├── App P2 (Port 443)
Transport ────┤                        ← Demux: ส่ง Segment ไปยัง Socket ที่ถูกต้อง
              ├── App P3 (Port 53)        โดยดูจาก Dest Port Number
              └── App P4 (Port 8080)
  
  Mux: หลาย App ส่งข้อมูลลง Transport Layer เดียวกัน
  Demux: Transport Layer แยกข้อมูลไปยัง App ที่ถูกต้อง
\`\`\``;
  }
  
  // TCP Segment Structure / Header
  if ((lower.includes('tcp') && lower.includes('header')) || lower.includes('segment structure') || lower.includes('sequence number') || lower.includes('acknowledgment number')) {
    if (lower.includes('sequence number') && lower.includes('acknowledgment')) {
      return `> [!DEFINITION] TCP Sequence & Acknowledgment Numbers
> - **Sequence Number:** หมายเลขไบต์แรกของข้อมูลใน Segment นี้
> - **ACK Number:** หมายเลขไบต์ถัดไปที่คาดว่าจะได้รับ (Cumulative ACK)
> - ตัวอย่าง: ถ้า Host A ส่งข้อมูลเริ่มที่ byte 42, ขนาด 10 bytes → seq=42
> - Host B ตอบ ACK=52 (หมายถึง "ได้รับถึง byte 51 แล้ว รอ byte 52")`;
    }
    return `\`\`\`
[ TCP Segment Header Format (20 bytes minimum) ]
+------+------+-----+-----+------+-----+------+--------+
| Source Port (16)  | Destination Port (16)             |
+-------------------+-----------------------------------+
| Sequence Number (32 bits)                             |
+-------------------------------------------------------+
| Acknowledgment Number (32 bits)                       |
+------+------+-----+-----+------+-----+------+--------+
|HdrLen| Unused|U|A|P|R|S|F| Receive Window (16 bits)  |
+------+-------+-+-+-+-+-+-+---------------------------+
| Checksum (16) | Urgent Data Pointer (16)              |
+---------------+---------------------------------------+
| Options (variable)          | Padding                 |
+-----------------------------+-------------------------+
| Application Data (Payload)                            |
+-------------------------------------------------------+
\`\`\``;
  }
  
  // RTT Estimation / Timeout
  if (lower.includes('rtt') || lower.includes('estimated') || lower.includes('timeout') || lower.includes('sample')) {
    return `> [!DEFINITION] TCP RTT Estimation & Timeout
> $$EstimatedRTT = (1-\\alpha) \\cdot EstimatedRTT + \\alpha \\cdot SampleRTT$$
> $$DevRTT = (1-\\beta) \\cdot DevRTT + \\beta \\cdot |SampleRTT - EstimatedRTT|$$
> $$TimeoutInterval = EstimatedRTT + 4 \\cdot DevRTT$$
> - $\\alpha = 0.125$, $\\beta = 0.25$ (ค่ามาตรฐาน RFC 6298)
> - SampleRTT: เวลาจริงที่วัดได้ (ผันผวน), EstimatedRTT: ค่าเฉลี่ยแบบ EWMA`;
  }
  
  // Fast Retransmit
  if (lower.includes('fast retransmit') || lower.includes('duplicate ack') || lower.includes('triple duplicate') || lower.includes('3 duplicate')) {
    return `\`\`\`
[ TCP Fast Retransmit ]
Sender                              Receiver
  │── Segment 1 (seq=100) ──────────>│ ACK 200
  │── Segment 2 (seq=200) ──X LOST   │
  │── Segment 3 (seq=300) ──────────>│ ACK 200 (Dup #1) ← ยังรอ byte 200
  │── Segment 4 (seq=400) ──────────>│ ACK 200 (Dup #2)
  │── Segment 5 (seq=500) ──────────>│ ACK 200 (Dup #3)
  │  *** ได้ 3 Dup ACKs → Retransmit Segment 2 ทันที! ***
  │── Segment 2 (seq=200) ──────────>│ ACK 600 (Cumulative)
\`\`\``;
  }
  
  // Client-Server Architecture
  if (lower.includes('client-server') || lower.includes('client server') || lower.includes('always-on')) {
    return `\`\`\`
[ Client-Server Architecture ]
  ┌─────────────────────┐
  │  Server              │  ← Always-on, มี Fixed IP
  │  (data center)       │  ← รอรับ Request ตลอดเวลา
  └──────────┬──────────┘
       ┌─────┼─────┐
       ▼     ▼     ▼
     [C1]  [C2]  [C3]  ← Clients: ติดต่อ Server, ไม่สื่อสารกันเอง
     (Dynamic IP, มาๆ ไปๆ)
\`\`\``;
  }
  
  // Web / Browser
  if (lower.includes('web') && (lower.includes('browser') || lower.includes('url') || lower.includes('html') || lower.includes('object'))) {
    return `> [!DEFINITION] Web Page Structure
> - **Web Page** ประกอบด้วย **Base HTML File** + **Referenced Objects** (รูปภาพ, CSS, JS, Video)
> - แต่ละ Object ระบุตำแหน่งด้วย **URL**: \`http://hostname/path/to/object.html\`
> - Browser ดาวน์โหลด Base HTML ก่อน → Parse หา Referenced Objects → ดาวน์โหลดเพิ่ม`;
  }
  
  // Proxy / Cache
  if (lower.includes('proxy') || lower.includes('cache') || lower.includes('conditional get') || lower.includes('if-modified-since')) {
    return `\`\`\`
[ Web Cache (Proxy Server) Flow ]
Client ──(HTTP GET)──> Proxy Cache ──(HTTP GET)──> Origin Server
  │                       │ ถ้ามี Cache Hit:         │
  │<─(Cached Response)────│ ส่งกลับทันที              │
  │                       │                           │
  │                       │ ถ้า Cache Miss:           │
  │                       │──(Forward Request)──────>│
  │<──────────────────────│<──(Response)──────────────│
  │                       │ เก็บ Cache ไว้ใช้ครั้งหน้า │
\`\`\``;
  }

  // === GENERIC FALLBACK for topics not caught ===
  
  // Process / Application
  if (lower.includes('process') || lower.includes('กระบวนการ') || lower.includes('โปรเซส')) {
    return `> [!DEFINITION] Process Communication
> - **Process:** โปรแกรมที่รันอยู่ในโฮสต์
> - **Client Process:** กระบวนการที่เริ่มต้นการสื่อสาร (Initiator)
> - **Server Process:** กระบวนการที่รอรับการติดต่อ (Listener)
> - **Socket:** ช่องทาง (Door) ระหว่าง Application Layer กับ Transport Layer`;
  }
  
  // Addressing / Identifier
  if (lower.includes('identifier') || lower.includes('addressing') || lower.includes('ip address') || lower.includes('port') || lower.includes('ที่อยู่')) {
    return `> [!DEFINITION] Process Addressing
> ในการส่งข้อมูลไปยัง Process ที่ถูกต้อง ต้องระบุ:
> 1. **IP Address:** ระบุ Host ปลายทาง (32-bit สำหรับ IPv4)
> 2. **Port Number:** ระบุ Process บน Host นั้น (16-bit, 0-65535)
> - ตัวอย่าง: Web Server = IP + Port 80, Mail Server = IP + Port 25`;
  }
  
  // Transport Service
  if (lower.includes('transport service') || lower.includes('data integrity') || lower.includes('timing') || lower.includes('security') || lower.includes('service requirements')) {
    return `| ความต้องการของ App | Data Integrity | Throughput | Timing | Security |
| :--- | :---: | :---: | :---: | :---: |
| **Web / Email** | ต้อง 100% | ยืดหยุ่น | ไม่เข้มงวด | ต้องการ |
| **Audio/Video Call** | ทนได้บ้าง | ต้องขั้นต่ำ | ≤ 400ms | - |
| **Online Gaming** | ทนได้บ้าง | ต้องขั้นต่ำ | ≤ 100ms | - |
| **File Transfer** | ต้อง 100% | ยืดหยุ่น | ไม่เข้มงวด | ต้องการ |`;
  }
  
  return null; // No match - skip
}

function upgradeGenericBoxes(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const slideHeaders = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^## 📄 Slide (\d+)/);
    if (m) slideHeaders.push({num: parseInt(m[1]), line: i});
  }
  
  let replaced = 0;
  let newLines = [...lines];
  
  // Process in reverse to preserve line numbers
  for (let s = slideHeaders.length - 1; s >= 0; s--) {
    const start = slideHeaders[s].line;
    const end = s < slideHeaders.length - 1 ? slideHeaders[s+1].line : newLines.length;
    const section = newLines.slice(start, end).join('\n');
    
    // Check if this slide has a generic box
    if (!section.includes('📌 สรุปสาระสำคัญของสไลด์') && !section.includes('📌 สาระสำคัญจากสไลด์')) {
      continue;
    }
    
    // Try to generate a specific visual
    const visual = analyzeAndGenerate(slideHeaders[s].num, section);
    if (!visual) continue;
    
    // Find and replace the generic box
    for (let j = start; j < end; j++) {
      if (newLines[j].includes('📌 สรุปสาระสำคัญของสไลด์') || newLines[j].includes('📌 สาระสำคัญจากสไลด์')) {
        // Find the extent of the callout block (consecutive > lines)
        let blockEnd = j;
        while (blockEnd + 1 < end && newLines[blockEnd + 1].startsWith('>')) {
          blockEnd++;
        }
        
        // Replace the generic block
        const visualLines = visual.split('\n');
        newLines.splice(j, blockEnd - j + 1, ...visualLines);
        replaced++;
        break;
      }
    }
  }
  
  if (replaced > 0) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  }
  return replaced;
}

const lectures = [
  'Wiki/Lecture 3 - Application Layer Protocols and Architectures.md',
  'Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md',
];

let total = 0;
lectures.forEach(f => {
  const r = upgradeGenericBoxes(f);
  console.log(f.replace('Wiki/', '').substring(0, 50) + ': upgraded ' + r + ' generic boxes');
  total += r;
});
console.log('Total upgraded: ' + total);
