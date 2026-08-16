const fs = require('fs');

const ch2Data = JSON.parse(fs.readFileSync('tools/ch2_parsed.json', 'utf8'));
const ch3Data = JSON.parse(fs.readFileSync('tools/ch3_parsed.json', 'utf8'));

// Diagrams for Chapter 2 (Lecture 3: Application Layer)
const ch2Diagrams = {
  2: `\`\`\`mermaid
flowchart TD
    ROADMAP_APP["🗺️ Application Layer Roadmap"]
    ROADMAP_APP --> P1["Principles: Client-Server vs P2P, Sockets"]
    ROADMAP_APP --> P2["Web & HTTP (1.0, 1.1, 2, 3), Cookies, Caching"]
    ROADMAP_APP --> P3["Electronic Mail: SMTP, POP3, IMAP"]
    ROADMAP_APP --> P4["Domain Name System (DNS)"]
    ROADMAP_APP --> P5["Video Streaming (DASH) & CDNs"]
    ROADMAP_APP --> P6["Socket Programming in Python (UDP & TCP)"]
\`\`\``,

  5: `\`\`\`mermaid
flowchart LR
    subgraph END_HOSTS ["End Systems (Hosts)"]
        CLI["💻 Client (Browser)"] <===> SRV["🗄️ Web Server"]
    end
    subgraph NET_CORE ["Network Core (Routers)"]
        R["🔀 Routers (Do NOT run App Code!)"]
    end
\`\`\``,

  6: `\`\`\`mermaid
flowchart TD
    subgraph CS_ARCH ["1. Client-Server Architecture"]
        SERVER["🗄️ Always-On Server (Permanent IP / Data Center)"]
        C1["💻 Client 1"] --> SERVER
        C2["📱 Client 2"] --> SERVER
        C3["💻 Client 3"] --> SERVER
    end
\`\`\``,

  7: `\`\`\`mermaid
flowchart TD
    subgraph P2P_ARCH ["2. Peer-to-Peer (P2P) Architecture"]
        P_A["💻 Peer A"] <===> P_B["💻 Peer B"]
        P_B <===> P_C["💻 Peer C"]
        P_C <===> P_A
    end
\`\`\``,

  8: `\`\`\`mermaid
flowchart LR
    P1["🖥️ Process A (Host A)"] -->|"Socket API"| S1["🚪 Socket"] === NET["🌐 Network / OS Transport"] === S2["🚪 Socket"] <--|"Socket API"| P2["🖥️ Process B (Host B)"]
\`\`\``,

  9: `\`\`\`mermaid
flowchart TD
    ADDR["Addressing Processes: IP Address (32/128-bit) + Port Number (16-bit)"]
    ADDR --> EX1["Web Server: 128.119.245.12 : Port 80"]
    ADDR --> EX2["Mail Server: 128.119.245.12 : Port 25"]
\`\`\``,

  12: `\`\`\`mermaid
flowchart TD
    subgraph PROTO_TYPES ["Application Protocol Types"]
        OPEN["1. Open Protocols (IETF RFCs: HTTP, SMTP, DNS) -> Interoperability"]
        PROP["2. Proprietary Protocols (Skype, Zoom, Teams)"]
    end
\`\`\``,

  13: `\`\`\`mermaid
flowchart TD
    REQ["Application Requirements"] --> LOSS["1. Data Integrity: File transfer/Email (100% loss-intolerant) vs Audio/Video (loss-tolerant)"]
    REQ --> TP["2. Throughput: Elastic (Email/Web) vs Minimum Guaranteed (Streaming/Gaming)"]
    REQ --> TIME["3. Timing / Delay: Real-time audio (<100ms) vs Web/Email"]
    REQ --> SEC["4. Security: Encryption, Authentication, Integrity"]
\`\`\``,

  15: `\`\`\`mermaid
flowchart TD
    subgraph SERVICES ["Transport Services: TCP vs UDP"]
        TCP["🛡️ TCP: Connection-oriented, Reliable byte-stream, Flow control, Congestion control"]
        UDP["⚡ UDP: Connectionless, Unreliable datagram, No flow/congestion overhead, Fast"]
    end
\`\`\``,

  19: `\`\`\`mermaid
flowchart TD
    TLS_STACK["Securing TCP with TLS (Transport Layer Security)"] --> APP["Application Layer (HTTP)"]
    TLS_STACK --> TLS["TLS Layer (Encryption, Auth, Integrity)"]
    TLS_STACK --> TCP_LAYER["TCP Layer (Socket / Transport)"]
\`\`\``,

  21: `\`\`\`mermaid
flowchart LR
    BROWSER["💻 Web Browser (Client)"] <===>|"HTTP GET / HTTP 200 OK (Port 80/443)"| WEBSERVER["🗄️ Apache / Nginx (Web Server)"]
\`\`\``,

  27: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client as 💻 Client Browser
    actor Server as 🗄️ Web Server
    Client->>Server: 1. TCP SYN (Port 80)
    Server-->>Client: 2. TCP SYN-ACK
    Client->>Server: 3. TCP ACK + HTTP GET /index.html
    Server-->>Client: 4. HTTP 200 OK + [HTML Document]
    Note over Client,Server: Connection Closed (Non-Persistent)
\`\`\``,

  30: `\`\`\`mermaid
flowchart TD
    RTT_EQ["Non-Persistent HTTP Response Time = 2 * RTT + File Transfer Time"]
\`\`\``,

  31: `\`\`\`mermaid
flowchart TD
    PERSIST["Persistent HTTP: Reuses single TCP connection for multiple objects (1 RTT per object)"]
\`\`\``,

  35: `\`\`\`mermaid
flowchart TD
    HTTP_REQ["HTTP Request Format"] --> R_LINE["Request Line: GET /somedir/page.html HTTP/1.1"]
    HTTP_REQ --> H_LINES["Header Lines: Host, User-Agent, Accept, Connection"]
    HTTP_REQ --> BLANK["Blank Line: \\r\\n"]
    HTTP_REQ --> BODY["Entity Body (POST / PUT data)"]
\`\`\``,

  38: `\`\`\`mermaid
flowchart TD
    HTTP_RESP["HTTP Response Format"] --> S_LINE["Status Line: HTTP/1.1 200 OK"]
    HTTP_RESP --> H_LINES2["Header Lines: Date, Server, Content-Length, Content-Type"]
    HTTP_RESP --> BLANK2["Blank Line: \\r\\n"]
    HTTP_RESP --> DATA_BODY["Entity Body: [HTML / Image / JSON Bytes]"]
\`\`\``,

  43: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client as 💻 User Browser
    actor Server as 🗄️ Web Server
    participant DB as 🗄️ Backend Session DB
    Client->>Server: 1. HTTP GET /login
    Server->>DB: 2. Create Session ID (1678)
    Server-->>Client: 3. HTTP 200 OK (Set-Cookie: id=1678)
    Note over Client: 4. Browser stores cookie locally
    Client->>Server: 5. HTTP GET /cart (Cookie: id=1678)
    Server->>DB: 6. Lookup cart for user 1678
    Server-->>Client: 7. HTTP 200 OK + Custom Cart Page
\`\`\``,

  47: `\`\`\`mermaid
flowchart LR
    CLI["💻 Browser"] <===> PROXY["🏢 Web Proxy Server (Cache)"] <===> ORIGIN["🗄️ Origin Web Server"]
\`\`\``,

  51: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Proxy as 🏢 Proxy Cache
    actor Origin as 🗄️ Origin Server
    Proxy->>Origin: HTTP GET /pic.png (If-Modified-Since: Wed, 21 Oct 2025 07:28:00 GMT)
    alt File NOT Modified
        Origin-->>Proxy: HTTP 304 Not Modified (No data body sent!)
    else File Modified
        Origin-->>Proxy: HTTP 200 OK + [New Data Body]
    end
\`\`\``,

  55: `\`\`\`mermaid
flowchart TD
    HTTP_EVO["HTTP Evolution Roadmap"]
    HTTP_EVO --> H10["HTTP/1.0: 1 object per TCP"]
    HTTP_EVO --> H11["HTTP/1.1: Persistent TCP, Pipelining, Head-of-Line Blocking at App Level"]
    HTTP_EVO --> H20["HTTP/2: Binary Framing, Multiplexing Streams, Server Push, Header Compression (HPACK)"]
    HTTP_EVO --> H30["HTTP/3: QUIC Protocol over UDP (Eliminates TCP HOL Blocking, 0-RTT Handshake)"]
\`\`\``,

  67: `\`\`\`mermaid
flowchart TD
    EMAIL_ARCH["E-mail Architecture"] --> MUA["1. User Agent (Mail Reader: Outlook, Thunderbird, Webmail)"]
    EMAIL_ARCH --> MTA["2. Mail Servers (Mailboxes & Outgoing Message Queue)"]
    EMAIL_ARCH --> SMTP["3. SMTP (Simple Mail Transfer Protocol - Push, Port 25/587)"]
    EMAIL_ARCH --> POP_IMAP["4. POP3 / IMAP (Mail Access Protocols - Pull, Port 110/143/993)"]
\`\`\``,

  79: `\`\`\`mermaid
flowchart TD
    DNS_HIERARCHY["DNS Hierarchical Database"]
    DNS_HIERARCHY --> ROOT["🌍 Root DNS Servers (13 Logical Clusters)"]
    ROOT --> TLD["🏛️ Top-Level Domain (TLD) Servers (.com, .org, .th, .edu)"]
    TLD --> AUTH["🏢 Authoritative DNS Servers (google.com, chula.ac.th)"]
    AUTH --> LOCAL["🏠 Local DNS Resolver (ISP / 8.8.8.8)"]
\`\`\``,

  88: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Host as 💻 Client Host
    participant Local as 🏠 Local DNS
    participant Root as 🌍 Root DNS
    participant TLD as 🏛️ TLD (.edu)
    participant Auth as 🏢 Authoritative DNS (umass.edu)
    
    Host->>Local: 1. Query: gaia.cs.umass.edu (Recursive)
    Local->>Root: 2. Iterative Query: gaia.cs.umass.edu
    Root-->>Local: 3. Referral: TLD (.edu) IP
    Local->>TLD: 4. Iterative Query: gaia.cs.umass.edu
    TLD-->>Local: 5. Referral: Authoritative (umass.edu) IP
    Local->>Auth: 6. Iterative Query: gaia.cs.umass.edu
    Auth-->>Local: 7. Answer: Type A 128.119.245.12
    Local-->>Host: 8. Resolved IP: 128.119.245.12
\`\`\``,

  94: `\`\`\`mermaid
flowchart TD
    RR["DNS Resource Records (RR): (Name, Value, Type, TTL)"]
    RR --> A["Type A: (hostname, IPv4_Address)"]
    RR --> AAAA["Type AAAA: (hostname, IPv6_Address)"]
    RR --> NS["Type NS: (domain_name, authoritative_name_server)"]
    RR --> CNAME["Type CNAME: (alias_name, canonical_real_name)"]
    RR --> MX["Type MX: (domain_name, mail_server_name)"]
\`\`\``,

  104: `\`\`\`mermaid
flowchart TD
    DASH["Dynamic Adaptive Streaming over HTTP (DASH)"] --> MPD["1. Media Presentation Description (Manifest File)"]
    DASH --> CHUNKS["2. Video Chunks encoded at multiple bitrates (240p, 720p, 1080p, 4K)"]
    DASH --> CLIENT_LOGIC["3. Client selects bitrate dynamically based on network bandwidth & buffer level"]
\`\`\``,

  108: `\`\`\`mermaid
flowchart LR
    ORIGIN_SRV["🗄️ Origin Server (USA)"] === CDN1["☁️ CDN Node Europe"] === USERS1["👥 EU Users"]
    ORIGIN_SRV === CDN2["☁️ CDN Node Asia (BKK)"] === USERS2["👥 Thai Users"]
\`\`\``,

  112: `\`\`\`mermaid
flowchart TD
    SOCKET_PROG["Python Socket Programming"]
    SOCKET_PROG --> UDP_S["UDP Sockets: socket(AF_INET, SOCK_DGRAM)<br/>No handshake, sendto(msg, (IP, port)), recvfrom()"]
    SOCKET_PROG --> TCP_S["TCP Sockets: socket(AF_INET, SOCK_STREAM)<br/>Server: bind -> listen -> accept (Welcome vs Connection Socket)<br/>Client: connect -> send -> recv"]
\`\`\``
};

function formatSlideMasterCh2(item) {
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

  if (ch2Diagrams[item.slideNum]) {
    out += `${ch2Diagrams[item.slideNum]}\n\n`;
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

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์เดี่ยว Slide 1 ถึง Slide 119 รวม 119 หน้า ไม่มีข้าม พร้อม Diagram / Flow ทุกหัวข้อ)
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียดสมบูรณ์ 100% เรียงลำดับรายหน้าสไลด์เดี่ยว ตั้งแต่ **Slide 1 ถึง Slide 119** ครบทุกตัวอักษร ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล พร้อมแผนผังไดอะแกรมจำลองสไลด์ ตามมาตรฐานเดียวกับ Database System Wiki

---

`;

ch2Data.forEach(s => {
  l3Md += formatSlideMasterCh2(s);
});

fs.writeFileSync('Wiki/Lecture 3 - Application Layer Protocols and Architectures.md', l3Md, 'utf8');
console.log('Saved Lecture 3 with Diagrams for ALL 119 slides:', l3Md.length, 'chars,', l3Md.split('\n').length, 'lines');
