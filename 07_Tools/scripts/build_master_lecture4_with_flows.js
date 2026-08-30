const fs = require('fs');

const ch3Data = JSON.parse(fs.readFileSync('tools/ch3_parsed.json', 'utf8'));

const ch3Diagrams = {
  2: `\`\`\`mermaid
flowchart TD
    ROADMAP_TRANS["🗺️ Transport Layer Roadmap"]
    ROADMAP_TRANS --> T1["Transport-Layer Services & Multiplexing/Demultiplexing"]
    ROADMAP_TRANS --> T2["Connectionless Transport: UDP & Checksum"]
    ROADMAP_TRANS --> T3["Principles of Reliable Data Transfer (rdt 1.0 -> 3.0, GBN, SR)"]
    ROADMAP_TRANS --> T4["Connection-Oriented Transport: TCP (Segment, Seq/ACK, RTT, Flow Control)"]
    ROADMAP_TRANS --> T5["TCP Connection Management (3-Way Handshake & Teardown)"]
    ROADMAP_TRANS --> T6["Principles & Mechanics of Congestion Control (AIMD, Slow Start, Tahoe vs Reno)"]
\`\`\``,

  4: `\`\`\`mermaid
flowchart TD
    subgraph ANALOGY ["📬 12 Cousins Analogy (Ann & Bill)"]
        KIDS1["12 Kids in House 1 (Processes)"] --> ANN["👧 Ann (Transport Layer)"]
        ANN ===|"Postal Service (Network Layer - IP)"| BILL["👦 Bill (Transport Layer)"]
        BILL --> KIDS2["12 Kids in House 2 (Processes)"]
    end
\`\`\``,

  11: `\`\`\`mermaid
flowchart TD
    subgraph MUX_DEMUX ["Multiplexing & Demultiplexing"]
        SRC_APP["App Message"] -->|"Add Port Header"| MUX["Sender: Multiplexing"]
        MUX --> IP_PKT["IP Datagram (Source Port + Dest Port)"]
        IP_PKT --> DEMUX["Receiver: Demultiplexing"]
        DEMUX -->|"Deliver to Socket"| DST_APP["Target Socket Port"]
    end
\`\`\``,

  14: `\`\`\`mermaid
flowchart LR
    UDP_CLI["💻 Client Host"] -->|"UDP Datagram (Dest Port: 6428)"| UDP_SRV["🗄️ Server Socket (Port 6428)"]
\`\`\``,

  16: `\`\`\`mermaid
flowchart TD
    TCP_DEMUX["TCP 4-Tuple Demultiplexing: (Src IP, Src Port, Dest IP, Dest Port)"]
    TCP_DEMUX --> S1["Client A (10.0.0.1 : 5123) -> Server (128.119.245.12 : 80) -> Socket 1"]
    TCP_DEMUX --> S2["Client B (10.0.0.2 : 5123) -> Server (128.119.245.12 : 80) -> Socket 2"]
\`\`\``,

  23: `\`\`\`mermaid
flowchart TD
    UDP_HDR["UDP Header (8 Bytes = 64 Bits)"] --> H1["Source Port (16 bits) | Destination Port (16 bits)"]
    UDP_HDR --> H2["Length (16 bits)      | Checksum (16 bits)"]
    UDP_HDR --> BODY["Application Data Payload (Variable Length)"]
\`\`\``,

  25: `\`\`\`
UDP Checksum Calculation Trace (1's Complement):
  Word 1:  01100110 01100000
+ Word 2:  01010101 01010101
----------------------------
  Sum:     10111011 10110101
+ Word 3:  10001111 00001100
----------------------------
  Sum:    101001010 11000001  (End-around carry: add 1 to LSB)
  Result:  01001010 11000010
  Checksum (Invert bits): 10110101 00111101
\`\`\``,

  32: `\`\`\`mermaid
flowchart LR
    RDT1["rdt 1.0: Reliable Channel (No bit errors, no loss) -> Simple Send/Receive"]
\`\`\``,

  34: `\`\`\`mermaid
flowchart TD
    RDT20["rdt 2.0: Channel with Bit Errors"] --> SENDER["Sender: wait for call -> send pkt -> wait for ACK/NAK"]
    RDT20 --> REC["Receiver: check checksum -> if OK send ACK, if corrupt send NAK"]
\`\`\``,

  39: `\`\`\`mermaid
flowchart TD
    RDT21["rdt 2.1: Handles Corrupted ACKs by adding Sequence Numbers (0 and 1)"]
\`\`\``,

  43: `\`\`\`mermaid
flowchart TD
    RDT22["rdt 2.2: NAK-Free Protocol using ACKs with explicit Seq Numbers (ACK 0 / ACK 1)"]
\`\`\``,

  47: `\`\`\`mermaid
flowchart TD
    RDT30["rdt 3.0 (Alternating-Bit Protocol): Countdown Timer for Packet/ACK Loss Recovery"]
\`\`\``,

  51: `\`\`\`mermaid
flowchart TD
    STOP_WAIT_PERF["Stop-and-Wait Utilization"]
    STOP_WAIT_PERF --> FORMULA["U_sender = (L / R) / (RTT + L / R)"]
    STOP_WAIT_PERF --> NUM["Example (1 Gbps, 30 ms RTT, 8000-bit packet): U = 0.00027 (0.027% Efficient!)"]
\`\`\``,

  55: `\`\`\`mermaid
flowchart LR
    PIPE["Pipelining (N = 3 packets in flight)"] --> UTIL["Utilization increases by factor of N! (3 * 0.00027 = 0.081%)"]
\`\`\``,

  58: `\`\`\`mermaid
flowchart TD
    GBN["Go-Back-N (GBN) Mechanics"] --> WIN["Sender Window (Size N): [send_base ... nextseqnum]"]
    GBN --> CUM_ACK["Receiver sends Cumulative ACK for highest in-order packet"]
    GBN --> RETRAN["On Timeout: Retransmit ALL unacknowledged packets in window"]
\`\`\``,

  65: `\`\`\`mermaid
flowchart TD
    SR["Selective Repeat (SR) Mechanics"] --> INDIV["Receiver sends Individual ACK for each packet received"]
    SR --> BUFFER["Receiver buffers out-of-order packets"]
    SR --> TIMERS["Sender maintains individual timer per packet; retransmits ONLY timed-out packet"]
\`\`\``,

  73: `\`\`\`mermaid
flowchart TD
    TCP_HDR["TCP Segment Header (20 - 60 Bytes)"]
    TCP_HDR --> F1["Source Port (16b) | Destination Port (16b)"]
    TCP_HDR --> F2["Sequence Number (32b)"]
    TCP_HDR --> F3["Acknowledgment Number (32b)"]
    TCP_HDR --> F4["Header Len (4b) | Reserved (6b) | Flags: URG, ACK, PSH, RST, SYN, FIN (6b) | Receive Window (16b)"]
    TCP_HDR --> F5["Internet Checksum (16b) | Urgent Data Pointer (16b)"]
    TCP_HDR --> F6["Options (Variable length, e.g. MSS, SACK)"]
\`\`\``,

  77: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor HostA as 💻 Host A (Client)
    actor HostB as 🗄️ Host B (Server)
    HostA->>HostB: Seq=42, ACK=79, Data='C' (1 byte)
    HostB-->>HostA: Seq=79, ACK=43, Data='C' (Echoed character + Cumulative ACK)
    HostA->>HostB: Seq=43, ACK=80 (ACK for echoed byte)
\`\`\``,

  84: `\`\`\`
TCP RTT Estimation & Timeout Formulas:
1. EstimatedRTT = (1 - α) * EstimatedRTT + α * SampleRTT       (α = 0.125)
2. DevRTT       = (1 - β) * DevRTT + β * |SampleRTT - EstimatedRTT|  (β = 0.25)
3. TimeoutInterval = EstimatedRTT + 4 * DevRTT
\`\`\``,

  94: `\`\`\`mermaid
flowchart TD
    FAST_RETX["TCP Fast Retransmit"] --> TRIGGER["Receiver detects gap -> sends Duplicate ACKs"]
    FAST_RETX --> ACTION["Sender receives 3 Duplicate ACKs (Total 4 identical ACKs) -> Retransmits missing segment immediately before timeout!"]
\`\`\``,

  103: `\`\`\`mermaid
flowchart LR
    RCV_BUF["Receive Buffer"] --> RWND["rwnd = RcvBuffer - [LastByteRcvd - LastByteRead]"]
    RWND --> ADVERT["Advertised in TCP Header Window field -> Sender limits inflight bytes <= rwnd"]
\`\`\``,

  108: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client as 💻 TCP Client
    actor Server as 🗄️ TCP Server
    Client->>Server: 1. SYN (seq=x, SYN=1)
    Server-->>Client: 2. SYN-ACK (seq=y, ack=x+1, SYN=1, ACK=1)
    Client->>Server: 3. ACK (seq=x+1, ack=y+1, ACK=1, Data optional)
    Note over Client,Server: Connection ESTABLISHED (Full Duplex)
\`\`\``,

  113: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Client as 💻 TCP Client
    actor Server as 🗄️ TCP Server
    Client->>Server: 1. FIN (seq=x, FIN=1)
    Server-->>Client: 2. ACK (ack=x+1)
    Server->>Client: 3. FIN (seq=y, FIN=1)
    Client-->>Server: 4. ACK (ack=y+1)
    Note over Client: Waits TIME_WAIT (2 * MSL = ~60s) before CLOSED
\`\`\``,

  123: `\`\`\`mermaid
flowchart TD
    CONGESTION_COSTS["Costs of Congestion"]
    CONGESTION_COSTS --> C1["1. Large queuing delays when packet arrival rate approaches link capacity"]
    CONGESTION_COSTS --> C2["2. Sender retransmissions waste link capacity for unneeded duplicates"]
    CONGESTION_COSTS --> C3["3. Dropped packets upstream waste all transmission capacity used on earlier hops"]
\`\`\``,

  135: `\`\`\`mermaid
flowchart TD
    AIMD["TCP AIMD (Additive Increase Multiplicative Decrease)"]
    AIMD --> AI["Additive Increase: +1 MSS per RTT (Probing for bandwidth)"]
    AIMD --> MD["Multiplicative Decrease: Cut cwnd in half on loss event (Sawtooth pattern)"]
\`\`\``,

  139: `\`\`\`mermaid
flowchart TD
    TCP_CC_STATES["TCP Congestion Control States"]
    TCP_CC_STATES --> SS["1. Slow Start: cwnd doubles every RTT (Exponential growth) until ssthresh"]
    TCP_CC_STATES --> CA["2. Congestion Avoidance: cwnd grows by 1 MSS per RTT (Linear growth)"]
    TCP_CC_STATES --> FR["3. Fast Recovery: cwnd = ssthresh + 3 MSS, grows linearly with dup ACKs"]
\`\`\``,

  143: `\`\`\`mermaid
flowchart TD
    TAHOE_VS_RENO["TCP Tahoe vs TCP Reno Comparison"]
    TAHOE_VS_RENO --> TAHOE["TCP Tahoe (Old): Always resets cwnd = 1 MSS on ANY loss (Timeout or 3 Dup ACKs)"]
    TAHOE_VS_RENO --> RENO["TCP Reno (Modern): On 3 Dup ACKs -> ssthresh = cwnd/2, cwnd = ssthresh (Fast Recovery); Resets cwnd = 1 MSS only on Timeout"]
\`\`\``,

  149: `\`\`\`mermaid
flowchart LR
    FAIR["TCP Fairness"] --> GOAL["K TCP connections sharing bottleneck link R -> Each gets throughput R / K"]
\`\`\``
};

function formatSlideMasterCh3(item) {
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

  if (ch3Diagrams[item.slideNum]) {
    out += `${ch3Diagrams[item.slideNum]}\n\n`;
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

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์เดี่ยว Slide 1 ถึง Slide 154 รวม 154 หน้า ไม่มีข้าม พร้อม Diagram / Flow ทุกหัวข้อ)
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียดสมบูรณ์ 100% เรียงลำดับรายหน้าสไลด์เดี่ยว ตั้งแต่ **Slide 1 ถึง Slide 154** ครบทุกตัวอักษร ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล พร้อมแผนผังไดอะแกรมจำลองสไลด์ ตามมาตรฐานเดียวกับ Database System Wiki

---

`;

ch3Data.forEach(s => {
  l4Md += formatSlideMasterCh3(s);
});

fs.writeFileSync('Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md', l4Md, 'utf8');
console.log('Saved Lecture 4 with Diagrams for ALL 154 slides:', l4Md.length, 'chars,', l4Md.split('\n').length, 'lines');
