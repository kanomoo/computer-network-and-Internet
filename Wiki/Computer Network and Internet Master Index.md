---
tags:
  - networking
  - index
  - master-guide
  - obsidian-wiki
created: 2026-08-17
updated: 2026-08-17
type: index
---

# Computer Network & Internet - Master Knowledge Index

> [!INFO] 📂 แหล่งไฟล์อ้างอิงต้นฉบับของอาจารย์ผู้สอน (Source Documents in New/)
> - **สไลด์บทที่ 1 & 2:** [Chapter_1_Fundamental-Network_models_1-89.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_1_Fundamental-Network_models_1-89.html) *(สไลด์ที่ 1–89)*
> - **สไลด์บทที่ 3 (Application):** [Chapter_2_Application_Layer_1-119.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_2_Application_Layer_1-119.html) *(สไลด์ที่ 1–119)*
> - **สไลด์บทที่ 4 (Transport):** [Chapter_3_ Transport_Layer_1-154.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_3_%20Transport_Layer_1-154.html) *(สไลด์ที่ 1–154)*
> - **บทเรียนแบบโต้ตอบใหม่ (Interactive Courseware):**
>   - [ch1.html](file:///c:/Project/computer-network-&-Internet/New/ch1.html) *(Chapter 1 Fundamentals: 25 Interactive Sections)*
>   - [ch2.html](file:///c:/Project/computer-network-&-Internet/New/ch2.html) *(Chapter 2 Network Models: 23 Interactive Sections)*
>   - [ch3.html](file:///c:/Project/computer-network-&-Internet/New/ch3.html) *(Chapter 3 Application Layer: 36 Interactive Sections)*
> - **สไลด์สรุปอาจารย์:** [2026_DATACOM_Layer4_Transport_layer.pdf](file:///c:/Project/computer-network-&-Internet/New/2026_DATACOM_Layer4_Transport_layer.pdf)
> - **แบบทดสอบจริงจาก Classroom:** [exam.md](file:///c:/Project/computer-network-&-Internet/New/exam.md) *(Quiz Chapter 3 20 ข้อ)*
> - **บทเรียนเว็บโต้ตอบ:** [brosing-msg.html](file:///c:/Project/computer-network-&-Internet/New/brosing-msg.html), [email.html](file:///c:/Project/computer-network-&-Internet/New/email.html), [tcpipmodel.html](file:///c:/Project/computer-network-&-Internet/New/tcpipmodel.html)
> - **การบ้านและแบบฝึกหัด:** [Assignments.pptx](file:///c:/Project/computer-network-&-Internet/Assignments.pptx)
> - **คอร์สเรียนเว็บแอปพลิเคชัน:** [computer-network-course](file:///c:/Project/computer-network-&-Internet/computer-network-course/index.html)

> [!SUMMARY] คลังความรู้และคู่มือเตรียมสอบวิชา Computer Network and Internet ระดับสมบูรณ์แบบ
> นี่คือสารบัญดัชนีหลัก (**Master Index**) ที่รวบรวม **Mega Guides** สำหรับวิชาเครือข่ายคอมพิวเตอร์และอินเทอร์เน็ต (Computer Network & Internet) โดยสรุปและวิเคราะห์อย่างละเอียดจากทุกสไลด์ ทุกหน้า ทุกหัวข้อ (ไม่มีการข้าม 100%) ตามเนื้อหาการสอนของอาจารย์ใน `New/` และหนังสืออ้างอิง *Computer Networking: A Top-Down Approach (Kurose & Ross 8th Edition)*:

```mermaid
mindmap
  root((COMPUTER NETWORKS<br/>& INTERNET WIKI))
    "Part 1: Network Fundamentals"
      "Lecture 1: Fundamentals of Networking"
      "Interactive Lab Guide: Chapter 1"
      "Transmission Modes & Media"
      "Topologies & Switching"
      "Performance & Delays"
    "Part 2: Network Models"
      "Lecture 2: Architecture & Models"
      "Interactive Lab Guide: Chapter 2"
      "OSI 7 Layers vs TCP/IP 5 Layers"
      "PDU & Encapsulation"
      "Troubleshooting Matrix"
    "Part 3: Application Layer"
      "Lecture 3: Application Protocols"
      "Interactive Lab Guide: Chapter 3"
      "HTTP/1.0 - HTTP/3 & HTTPS"
      "DNS Distributed Architecture"
      "Email, DHCP, FTP & Sockets"
      "Wireshark Capture Lab"
    "Part 4: Transport Layer"
      "Lecture 4: Transport Protocols & Mechanics"
      "Multiplexing / Demultiplexing"
      "UDP Header & Checksum"
      "Principles of RDT (rdt1.0 - 3.0)"
      "Pipelining (GBN vs SR)"
      "TCP Handshake, Teardown & FSM"
      "Seq/ACK, Flow Control & Congestion Control"
    "Part 5: Core & Lower Layers"
      "Lecture 5: Network Layer & Routing"
      "Subnetting, VLSM, IPv4/IPv6, BGP"
      "Lecture 6: Link Layer & Wireless"
      "CRC, Ethernet, Switches, VLAN, WiFi"
    "Part 6: Calculations & Exam Bank"
      "Calculations & Trace Workbook"
      "Exam Prep & 80-Question Bank"

```

---

## 🎯 แผนผังเตรียมตัวสอบ 80 ข้อ (Close Book Exam Matrix)

ข้อสอบปรนัยจำนวน **80 ข้อ** เน้นวัดความเข้าใจเชิงแนวคิด (Conceptual Understanding), กลไกการทำงานระดับ Low-level, และการวิเคราะห์สถานการณ์จำลองใน 4 บทหลัก:

| บทที่ | หัวข้อหลักในการสอบ | เอกสารอ้างอิงและโน้ตใน Wiki | หัวข้อย่อยที่ต้องเน้นย้ำพิเศษ |
| :--- | :--- | :--- | :--- |
| **1** | **Fundamental of Computer Network** | • [[Lecture 1 - Fundamental of Computer Network]]<br>• [[Interactive Lab Guide - Chapter 1 Network Fundamentals]]<br>• Chapter 1 Slides 1–89<br>• `ch1.html` (25 Sections) | • องค์ประกอบการสื่อสาร 5 ส่วน<br>• Transmission Modes (Simplex/Half/Full)<br>• Topologies (Mesh $N(N-1)/2$, Star, Bus, Ring, Tree)<br>• 3-Tier Enterprise Network (Access, Distribution, Core)<br>• Transmission Media (UTP Cat6, Fiber SMF/MMF, Wi-Fi, IR)<br>• Packet Switching vs Circuit Switching (FDM/TDM)<br>• 4 Delays ($d_{proc}, d_{queue}, d_{trans}=L/R, d_{prop}=d/s$)<br>• Traffic Intensity ($La/R$), Throughput & Bottleneck |
| **2** | **Network Models** | • [[Lecture 2 - Network Models and Layered Architecture]]<br>• [[Interactive Lab Guide - Chapter 2 Network Models & Layered Stack]]<br>• `ch2.html` (23 Sections)<br>• `tcpipmodel.html` | • Flight Booking 5-Layer Analogy<br>• Physical vs Logical Communication<br>• Network Edge vs Network Core<br>• OSI 7 Layers vs TCP/IP 5 Layers<br>• OSI Layer-by-Layer Troubleshooting Matrix<br>• PDU (Message, Segment, Datagram, Frame, Bits)<br>• Encapsulation & De-encapsulation Mechanics (Bit-by-bit)<br>• Header vs Payload, Protocol (Syntax, Semantics, Timing) |
| **3** | **Application Layer** | • [[Lecture 3 - Application Layer Protocols and Architectures]]<br>• [[Interactive Lab Guide - Chapter 3 Application Layer Protocols]]<br>• Chapter 2 Slides 1–119<br>• `ch3.html` (36 Sections)<br>• `brosing-msg.html`, `email.html` | • Application Architecture (Client-Server, P2P, CDN)<br>• Sockets API Lifecycle (bind, listen, accept, connect)<br>• HTTP/1.0 ถึง HTTP/3 (QUIC), Persistent vs Non-Persistent<br>• Stateless HTTP, Cookies, Session, LocalStorage & JWT<br>• HTTP Methods, Status Codes (1xx–5xx), URL Breakdown<br>• DNS Hierarchy, Recursive vs Iterated Trace, RR Types (A, AAAA, MX, CNAME)<br>• DHCP DORA Process, Lease Timers, DHCP Relay Agent<br>• FTP Dual-Channel (Port 21 Control, Port 20 Data, PASV Mode)<br>• Email (SMTP Port 25/587, POP3 110, IMAP 143/993, MIME)<br>• Wireshark Packet Capture Trace Analysis Lab |
| **4** | **Transport Layer** | • [[Lecture 4 - Transport Layer Protocols and Mechanics]]<br>• Chapter 3 Slides 1–154<br>• `2026_DATACOM_Layer4_Transport_layer.pdf` | • หน้าที่ของ Transport Layer (Process-to-Process)<br>• Multiplexing / Demultiplexing (2-tuple vs 4-tuple)<br>• TCP vs UDP, UDP Header (8 Bytes) & Checksum<br>• Principles of RDT (rdt 1.0, 2.0, 2.1, 2.2, 3.0)<br>• GBN vs SR Pipelining<br>• TCP Three-Way Handshake & Teardown (SYN, ACK, FIN)<br>• Sequence & ACK Numbers (Byte Stream, Cumulative ACK)<br>• RTT Estimation (EWMA, DevRTT, TimeoutInterval)<br>• Fast Retransmit (3 Duplicate ACKs)<br>• Flow Control (`rwnd`) vs Congestion Control (`cwnd`)<br>• AIMD, Slow Start, Congestion Avoidance, Fast Recovery<br>• ECN Signaling & TCP Fairness |

---

## 📚 รายละเอียดชุดเอกสารใน Wiki (Complete Wiki Knowledge Base)

### 🔹 1. หมวดบันทึกการสอนหลัก (Core Lecture Series):
1. **[[Lecture 1 - Fundamental of Computer Network]]** — พื้นฐานการสื่อสาร, Topologies, สื่อสัญญาณ, Delays, Packet Switching, ประวัติอินเทอร์เน็ต
2. **[[Lecture 2 - Network Models and Layered Architecture]]** — สถาปัตยกรรมแบบลำดับชั้น, OSI 7 Layer vs TCP/IP 5 Layer, PDU, Encapsulation Trace
3. **[[Lecture 3 - Application Layer Protocols and Architectures]]** — สถาปัตยกรรม Application, HTTP/1.0-3, DNS, Email, Sockets, CDN, DASH
4. **[[Lecture 4 - Transport Layer Protocols and Mechanics]]** — Mux/Demux, UDP Checksum, RDT 1.0-3.0, GBN/SR, TCP Handshake, Seq/ACK, Flow/Congestion Control
5. **[[Lecture 5 - Network Layer, Routing, and IP Addressing]]** — Data/Control Plane, IPv4/v6 Header, Subnetting, VLSM Master Table, NAT, ICMP, Dijkstra, Bellman-Ford, OSPF, BGP, SDN
6. **[[Lecture 6 - Link Layer, Local Area Networks, and Wireless]]** — Link Services, CRC Modulo-2, CSMA/CD, CSMA/CA, ARP, Ethernet Switches, VLAN 802.1Q, Wi-Fi 802.11, Bluetooth, Mobility

### 🔹 2. หมวดคู่มือบทเรียนโต้ตอบและแล็บปฏิบัติการ (Interactive Courseware & Lab Guides):
1. **[[Interactive Lab Guide - Chapter 1 Network Fundamentals]]** — คู่มือถอดรหัส `New/ch1.html` ครบ 25 Sections (Messenger Trace, Topologies, 3-Tier Hierarchy, Scenario Labs, Quiz Bank)
2. **[[Interactive Lab Guide - Chapter 2 Network Models & Layered Stack]]** — คู่มือถอดรหัส `New/ch2.html` ครบ 23 Sections (Flight Analogy, OSI Troubleshooting Matrix, Bit-by-bit Encapsulation, Quiz Bank)
3. **[[Interactive Lab Guide - Chapter 3 Application Layer Protocols]]** — คู่มือถอดรหัส `New/ch3.html` ครบ 36 Sections (Socket API Lifecycle, DNS Recursive Trace, HTTP Evolution, DHCP DORA/Relay, FTP, Wireshark Lab, Quiz Bank)

### 🔹 3. หมวดแบบฝึกหัดคำนวณและคลังข้อสอบ (Calculations & Exam Bank):
1. **[[Calculations and Trace Workbook]]** — รวมสูตรวิธีคำนวณ Step-by-Step พร้อม Trace Table: Delays, Internet Checksum, TCP Byte Stream, Subnetting VLSM, Dijkstra Routing, CRC Modulo-2 Division
2. **[[Exam Preparation Guide and Master 80-Question Bank]]** — คลังข้อสอบ 80 ข้อเสมือนจริง พร้อมเฉลย วิเคราะห์เหตุผล และคลังข้อสอบจริง Quiz 1–11, Post-Test, Chapter 3 Quiz

---

## ⚡ ตาราง Port มาตรฐานที่ต้องจำสำหรับห้องสอบ (Well-Known Ports Cheatsheet)

| Port Number | Protocol | Transport | รายละเอียดและหน้าที่สำคัญ |
| :---: | :---: | :---: | :--- |
| **20 / 21** | **FTP** | TCP | File Transfer Protocol (Port 21 = Control Connection, Port 20 = Data Connection) |
| **22** | **SSH** | TCP | Secure Shell (การรีโมตควบคุมเครื่องแบบเข้ารหัส ปลอดภัย) |
| **23** | **Telnet** | TCP | Terminal Network (การรีโมตแบบข้อความธรรมดา ไม่เข้ารหัส ไม่ปลอดภัย) |
| **25** | **SMTP** | TCP | Simple Mail Transfer Protocol (ใช้สำหรับ Server-to-Server Email Relay) |
| **53** | **DNS** | UDP / TCP | Domain Name System (แปลงชื่อโดเมนเป็น IP; ใช้ UDP 53 สำหรับ Query ทั่วไป, TCP สำหรับ Zone Transfer) |
| **67 / 68** | **DHCP** | UDP | Dynamic Host Configuration Protocol (Port 67 = Server, Port 68 = Client) |
| **69** | **TFTP** | UDP | Trivial File Transfer Protocol (ส่งไฟล์แบบง่าย ไร้ระบบยืนยันตัวตน) |
| **80** | **HTTP** | TCP | Hypertext Transfer Protocol (การรับส่งเว็บเพจแบบไม่เข้ารหัส) |
| **110** | **POP3** | TCP | Post Office Protocol version 3 (ดึงอีเมลลงเครื่อง Client, default download-and-delete) |
| **123** | **NTP** | UDP | Network Time Protocol (ซิงโครไนซ์เวลาระหว่างเครื่องคอมพิวเตอร์) |
| **143** | **IMAP** | TCP | Internet Message Access Protocol (ดึงอีเมลและซิงก์โฟลเดอร์บน Server) |
| **161 / 162**| **SNMP** | UDP | Simple Network Management Protocol (Port 161 = Queries, Port 162 = Traps) |
| **443** | **HTTPS** | TCP | HTTP over TLS/SSL (การรับส่งเว็บเพจแบบเข้ารหัส ปลอดภัย) |
| **465** | **SMTPS** | TCP | SMTP over SSL/TLS (Legacy Secure SMTP) |
| **587** | **SMTP Submission** | TCP | Message Submission สำหรับ Mail Client ส่งอีเมลไปยัง Mail Server (พร้อมการยืนยันตัวตน) |
| **993** | **IMAPS** | TCP | IMAP over TLS/SSL (ดึงอีเมลแบบเข้ารหัส ปลอดภัย) |
| **995** | **POP3S** | TCP | POP3 over TLS/SSL (ดึงอีเมลแบบเข้ารหัส ปลอดภัย) |
| **3306** | **MySQL** | TCP | MySQL Database Server Port |
| **5432** | **PostgreSQL** | TCP | PostgreSQL Database Server Port |
| **8080** | **HTTP-Alt** | TCP | Web Proxy / Alternative Web Server Port |

---

## 📐 สรุปสูตรคำนวณที่สำคัญ (Essential Formulas Summary)

```

1. Transmission Delay (เวลาในการบีบอัด/ผลักบิตลงสาย):
   d_trans = L / R  [วินาที]
   (L = Packet Length ในหน่วย bits, R = Transmission Rate / Bandwidth ในหน่วย bps)

2. Propagation Delay (เวลาที่สัญญาณเดินทางในตัวกลาง):
   d_prop = d / s  [วินาที]
   (d = Distance ในหน่วย meters, s = Propagation Speed เช่น 2x10^8 m/s ในสายทองแดง/ไฟเบอร์)

3. Nodal Delay รวม:
   d_nodal = d_proc + d_queue + d_trans + d_prop

4. Traffic Intensity (ความหนาแน่นของการรอคิว):
   I = (L * a) / R
   (a = อัตราการมาถึงของแพ็กเก็ต [packets/sec], ถ้า I > 1 คิวจะยาวอนันต์และเกิด Packet Loss)

5. Mesh Topology จำนวนสายเชื่อมต่อ (Full Mesh):
   Links = N * (N - 1) / 2  (N = จำนวนโฮสต์/โหนด)

6. Stop-and-Wait Channel Utilization:
   U_sender = (L / R) / (RTT + L / R)

7. Pipelining Channel Utilization (Window size N):
   U_sender = [N * (L / R)] / (RTT + L / R)

8. TCP Estimated RTT (EWMA):
   EstimatedRTT = (1 - α) * EstimatedRTT + α * SampleRTT  (ค่ามาตรฐาน α = 0.125)

9. TCP DevRTT (RTT Variation):
   DevRTT = (1 - β) * DevRTT + β * |SampleRTT - EstimatedRTT|  (ค่ามาตรฐาน β = 0.25)

10. TCP Retransmission Timeout Interval:
    TimeoutInterval = EstimatedRTT + 4 * DevRTT

11. TCP Flow Control Receive Window:
    rwnd = RcvBuffer - (LastByteRcvd - LastByteRead)

12. TCP Maximum Segment Size (MSS) บน Ethernet:
    MSS = MTU - IP_Header (20B) - TCP_Header (20B) = 1500 - 40 = 1460 Bytes

13. Subnetting Usable Hosts:
    Usable Hosts = 2^h - 2  (h = Host bits)

14. Subnetting Number of Subnets:
    Subnets = 2^s  (s = Borrowed subnet bits)

15. Ethernet Minimum Frame Size (CSMA/CD):
    L_min = 2 * t_prop * R = 512 bits = 64 Bytes (at 10 Mbps)

16. CRC Modulo-2 Equation:
    (D * 2^r) XOR R = n * G  (R = Remainder)

```
