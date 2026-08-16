const fs = require('fs');

const file1 = 'Wiki/Lecture 1 - Fundamental of Computer Network.md';
let content = fs.readFileSync(file1, 'utf8');

const oldS8 = `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor A as 👤 Alice
    actor B as 👤 Bob
    actor C as 💻 Web Client
    actor S as 🗄️ Web Server
    rect rgb(240, 248, 255)
    Note over A,B: 👥 Human Protocol
    A->>B: สวัสดี
    B-->>A: สวัสดี
    A->>B: กี่โมงแล้ว?
    B-->>A: บ่าย 2 โมง
    end
    rect rgb(255, 250, 240)
    Note over C,S: 💻 Network Protocol
    C->>S: TCP SYN (Connection Request)
    S-->>C: TCP SYN-ACK (Connection Granted)
    C->>S: HTTP GET index.html
    S-->>C: HTTP 200 OK + (Data Payload)
    end
\`\`\``;

const newS8 = `\`\`\`mermaid
sequenceDiagram
    autonumber
    participant A as "Alice"
    participant B as "Bob"
    participant C as "Web Client"
    participant S as "Web Server"

    Note over A,B: Human Protocol (การสนทนาของมนุษย์)
    A->>B: Hi (สวัสดี)
    B-->>A: Hi (สวัสดี)
    A->>B: Got the time? (กี่โมงแล้ว?)
    B-->>A: 2:00 (บ่ายสองโมง)

    Note over C,S: Computer Network Protocol (โปรโตคอลเครือข่าย)
    C->>S: TCP Connection Request (SYN)
    S-->>C: TCP Connection Reply (SYN-ACK)
    C->>S: HTTP GET index.html
    S-->>C: HTTP 200 OK (Data File)
\`\`\``;

content = content.replace(oldS8, newS8);
fs.writeFileSync(file1, content, 'utf8');

// Also update in builder script
let bCode = fs.readFileSync('tools/build_master_lecture1_with_flows.js', 'utf8');
bCode = bCode.replace(oldS8, newS8);
fs.writeFileSync('tools/build_master_lecture1_with_flows.js', bCode, 'utf8');

console.log('Replaced Slide 8 with pure sequenceDiagram');
