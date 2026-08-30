const fs = require('fs');

// Update Slide 8 in tools/build_master_lecture1_with_flows.js
let builderCode = fs.readFileSync('tools/build_master_lecture1_with_flows.js', 'utf8');

const oldSlide8 = `  8: \\\`\\\`\\\`mermaid
sequenceDiagram
    autonumber
    rect rgb(240, 248, 255)
    Note over A,B: 👥 Human Protocol
    actor A as 👤 Alice
    actor B as 👤 Bob
    A->>B: "สวัสดี"
    B-->>A: "สวัสดี"
    A->>B: "กี่โมงแล้ว?"
    B-->>A: "บ่าย 2 โมง"
    end
    rect rgb(255, 250, 240)
    Note over C,S: 💻 Network Protocol
    actor C as 💻 Web Client
    actor S as 🗄️ Web Server
    C->>S: TCP SYN (Connection Request)
    S-->>C: TCP SYN-ACK (Connection Granted)
    C->>S: HTTP GET index.html
    S-->>C: HTTP 200 OK + [Data Payload]
    end
\\\`\\\`\\\``;

const newSlide8 = `  8: \\\`\\\`\\\`mermaid
sequenceDiagram
    autonumber
    actor A as Alice
    actor B as Bob
    actor C as Web Client
    actor S as Web Server

    rect rgb(240, 248, 255)
    Note over A,B: Human Protocol
    A->>B: สวัสดี (Hi)
    B-->>A: สวัสดี (Hi)
    A->>B: กี่โมงแล้ว? (Got the time?)
    B-->>A: บ่าย 2 โมง (2:00)
    end

    rect rgb(255, 250, 240)
    Note over C,S: Network Protocol
    C->>S: TCP Connection Request (SYN)
    S-->>C: TCP Connection Reply (SYN-ACK)
    C->>S: HTTP GET index.html
    S-->>C: HTTP 200 OK (File Data)
    end
\\\`\\\`\\\``;

builderCode = builderCode.replace(oldSlide8, newSlide8);
fs.writeFileSync('tools/build_master_lecture1_with_flows.js', builderCode, 'utf8');
console.log('Updated Slide 8 in builder script');
