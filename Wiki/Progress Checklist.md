---
tags:
  - networking
  - checklist
  - progress
created: 2026-08-17
updated: 2026-08-17
type: checklist
---

# Computer Network & Internet Wiki - Progress Checklist

> [!SUMMARY] ภาพรวมสถานะการจัดทำคลังความรู้ (Wiki)
> ตรวจสอบความสมบูรณ์ของการถอดรหัสและสรุปเนื้อหาจากทุกแหล่งไฟล์: สไลด์ทุกหน้า (ไม่มีการข้าม 100%), เว็บไซต์บทเรียนโต้ตอบ (Interactive Courseware ch1-ch3), หนังสือ Kurose & Ross (8th Edition), การบ้าน และคลังข้อสอบ

---

## 📚 1. โครงสร้างคลังความรู้ (Master Modules & Interactive Guides)

### 🔹 Core Lecture Notes (บันทึกบรรยายหลักแบบละเอียดสมบูรณ์ 100%):
- [x] **[[Computer Network and Internet Master Index]]** — สารบัญดัชนีหลัก, Mindmap สถาปัตยกรรม, แผนที่เตรียมสอบ 80 ข้อ และตาราง Port มาตรฐาน
- [x] **[[Lecture 1 - Fundamental of Computer Network]]** — พื้นฐานการสื่อสารข้อมูล เครือข่าย Switching, Topology, Delays, Performance และประวัติอินเทอร์เน็ต (สไลด์ 1–89)
- [x] **[[Lecture 2 - Network Models and Layered Architecture]]** — สถาปัตยกรรมแบบลำดับชั้น, OSI 7 Layers vs TCP/IP 5 Layers, PDU, Encapsulation, Header และ Trace www.google.com
- [x] **[[Lecture 3 - Application Layer Protocols and Architectures]]** — สถาปัตยกรรม Application, Sockets, HTTP/1.0, HTTP/1.1, HTTP/2, HTTP/3, HTTPS, DNS, Email (SMTP/IMAP/POP3), CDN, Video Streaming DASH, Socket Programming Python (สไลด์ 1–119)
- [x] **[[Lecture 4 - Transport Layer Protocols and Mechanics]]** — บริการ Transport Layer, Mux/Demux (2-tuple vs 4-tuple), UDP Header & Checksum, Principles of RDT (rdt 1.0 - 3.0), GBN vs SR, โครงสร้าง TCP Header & Flags, 3-Way Handshake, Sequence & ACK Numbers, Cumulative ACK, RTT Estimation, Fast Retransmit, Flow Control (rwnd), Congestion Control (AIMD, Slow Start, Congestion Avoidance, Fast Recovery, ECN, BBR) (สไลด์ 1–154)
- [x] **[[Lecture 5 - Network Layer, Routing, and IP Addressing]]** — Data Plane vs Control Plane, Router Architecture, IPv4 Header & Fragmentation, Subnetting & VLSM Master Table, NAT/NAPT, ICMP, IPv6 Architecture, Dijkstra Link-State Trace Table, Bellman-Ford Distance Vector, OSPF, BGP-4, SDN OpenFlow
- [x] **[[Lecture 6 - Link Layer, Local Area Networks, and Wireless]]** — Link Layer Services, Error Detection (Parity, Checksum, CRC Modulo-2 Trace), Multiple Access (ALOHA, CSMA/CD Minimum Frame Size & Backoff, CSMA/CA RTS/CTS), MAC Addressing, ARP Protocol, Ethernet Switch Self-Learning, VLAN 802.1Q Tagging, Wi-Fi 802.11 Architecture, Bluetooth, Cellular 4G/5G & Mobility
- [x] **[[Calculations and Trace Workbook]]** — รวมสูตรวิธีคำนวณและ Trace Table: Delays, Internet Checksum, TCP Handshake & Byte Stream, Subnetting VLSM, Dijkstra Routing, CRC Polynomial Division
- [x] **[[Exam Preparation Guide and Master 80-Question Bank]]** — รวมข้อสอบเสมือนจริง 80 ข้อ (Close Book Prep) + เฉลยและวิเคราะห์ข้อสอบ Quiz 1–11, Post-Test, Quiz Chapter 3 อย่างละเอียด

### 🔹 Interactive Courseware & Lab Guides (ระบบบทเรียนและชุดแล็บโต้ตอบใหม่):
- [x] **[[Interactive Lab Guide - Chapter 1 Network Fundamentals]]** — ถอดรหัสครบ 25 Sections จาก `New/ch1.html`: 5 องค์ประกอบ, Messenger Message Trace, โหมด Simplex/Duplex, โทโปโลยี 6 แบบพร้อม Failure Analysis, 3-Tier Enterprise Design, สื่อสัญญาณ Guided/Unguided, Scenario Labs, Quiz Bank
- [x] **[[Interactive Lab Guide - Chapter 2 Network Models & Layered Stack]]** — ถอดรหัสครบ 23 Sections จาก `New/ch2.html`: Flight Booking 5-Layer Analogy, OSI 7 Layers, Troubleshooting Diagnostic Matrix (L1–L7), OSI vs TCP/IP, Encapsulation/Decapsulation Step-by-Step, PDU Naming, Multi-Layer Task Simulations, Quiz Bank
- [x] **[[Interactive Lab Guide - Chapter 3 Application Layer Protocols]]** — ถอดรหัสครบ 36 Sections จาก `New/ch3.html`: Socket API Lifecycle, DNS Recursive Trace & RRs, HTTP/1.0 ถึง HTTP/3, Cookies & Session Management, Caching & Proxies, HTTPS/TLS, DHCP DORA & Relay Agent, FTP Dual-Channel, Email Architecture, Wireshark Packet Capture Analysis Lab, Quiz Bank

---

## 🎯 2. สรุปความครอบคลุม 4 บทหลักสำหรับการสอบ 80 ข้อ

### บทที่ 1: Fundamental of Computer Network
- [x] องค์ประกอบการสื่อสารข้อมูล 5 ส่วน (Message, Sender, Receiver, Medium, Protocol)
- [x] Transmission Mode (Simplex, Half-Duplex, Full-Duplex)
- [x] Connection Type (Point-to-Point, Multipoint/Broadcast)
- [x] Network Topology (Mesh $N(N-1)/2$, Star, Bus, Ring, Tree, Hybrid)
- [x] Geographic Scope (PAN, LAN, CAN, MAN, WAN, Internet)
- [x] Transmission Media (Guided: Twisted Pair Cat5e/6, Coax, Fiber Single/Multi-mode; Unguided: Radio, Microwave, IR, Satellite)
- [x] Network Core vs Network Edge (Packet Switching Store-and-Forward vs Circuit Switching FDM/TDM)
- [x] Performance Delays ($d_{proc}, d_{queue}, d_{trans}=L/R, d_{prop}=d/s$), Caravan Analogy, Traffic Intensity ($La/R$), Throughput & Bottleneck
- [x] Protocol และ RFC (IETF RFC process, Standards)
- [x] ประวัติอินเทอร์เน็ต (1961–1972 ARPANET, 1972–1980 TCP/IP, 1980–1990 DNS, 1990s Web, 2000s–ปัจจุบัน Cloud/CDN/SDN)

### บทที่ 2: Network Models
- [x] Physical vs Logical Communication (Direct Hop-by-Hop vs Virtual Peer-to-Peer)
- [x] Network Edge vs Network Core Layering (Hosts vs Routers L1-L3 vs Switches L1-L2)
- [x] OSI 7-Layer Model (Physical, Data Link, Network, Transport, Session, Presentation, Application)
- [x] Internet Protocol Stack / TCP/IP 5-Layer & 4-Layer DoD Model
- [x] หน้าที่และความรับผิดชอบของแต่ละ Layer อย่างละเอียด
- [x] Protocol Data Unit (PDU): Message, Segment, Datagram, Frame, Bits
- [x] Encapsulation / De-encapsulation (การห่อหุ้มและการถอด Header)
- [x] Header vs Payload Structure
- [x] Protocol vs Service (Vertical Services vs Horizontal Protocols)
- [x] ตัวอย่างการส่ง www.google.com ผ่านทุก Layer

### บทที่ 3: Application Layer
- [x] Network Application Architecture (Client-Server, P2P, Hybrid CDN)
- [x] Process, Socket (API Boundary), IP Address และ Port Number
- [x] ความต้องการของ Application (Data Loss/Reliability, Bandwidth, Delay, Security)
- [x] HTTP / HTTPS (Port 80 vs Port 443, TLS Encryption, Authentication)
- [x] Stateless HTTP และการจัดการ State ด้วย Cookies (`Set-Cookie`, `Cookie`, Session DB)
- [x] Persistent HTTP (with/without Pipelining) vs Non-Persistent HTTP ($2 \text{ RTT} + \text{transfer}$ vs $1 \text{ RTT}$)
- [x] โครงสร้าง HTTP Request / Response Messages (Start line, Headers, `\r\n\r\n`, Body)
- [x] HTTP Methods (GET, POST, PUT, HEAD, DELETE, OPTIONS, PATCH)
- [x] HTTP Status Codes (1xx, 2xx, 3xx, 4xx, 5xx)
- [x] Web Caching, Proxy Servers, Conditional GET (`If-Modified-Since` -> `304 Not Modified`)
- [x] วิวัฒนาการ HTTP (HTTP/0.9 -> HTTP/1.0 -> HTTP/1.1 -> HTTP/2 Multiplexing/Framing -> HTTP/3 QUIC/UDP)
- [x] DNS Architecture (Hierarchical Database: Root, TLD, Authoritative, Local DNS Resolver)
- [x] DNS Resolution: Iterated Query vs Recursive Query, DNS Caching & TTL
- [x] DNS Resource Records (Types A, AAAA, NS, CNAME, MX, PTR, TXT)
- [x] Email Architecture & Protocols (SMTP Push Port 25/587, POP3 Pull Port 110/995, IMAP Pull Port 143/993)
- [x] ตาราง Port มาตรฐานที่สำคัญ (Well-known Ports 0–1023)
- [x] Video Streaming DASH (Dynamic Adaptive Streaming over HTTP), Manifest MPD, CDN (Enter Deep vs Bring Home, DNS CNAME)
- [x] Socket Programming ภาษา Python (UDP `AF_INET, SOCK_DGRAM` vs TCP `AF_INET, SOCK_STREAM`, Welcoming vs Connection Socket)

### บทที่ 4: Transport Layer
- [x] หน้าที่ของ Transport Layer (Process-to-Process Logical Communication)
- [x] Multiplexing / Demultiplexing และ Port Numbers (0–65535)
- [x] UDP Connectionless Demux (2-tuple: Dest IP, Dest Port) vs TCP Connection-Oriented Demux (4-tuple: Src IP, Src Port, Dest IP, Dest Port)
- [x] UDP Characteristics & Use Cases (Bare-bones, No handshake, Small header 8 bytes)
- [x] UDP Header Structure (Source Port, Dest Port, Length, Checksum)
- [x] Internet Checksum Algorithm (1's complement addition with carry wraparound)
- [x] Principles of Reliable Data Transfer (rdt 1.0, rdt 2.0 Checksum/ACK/NAK, rdt 2.1 Sequence 0/1, rdt 2.2 NAK-free, rdt 3.0 Timer/Loss)
- [x] Pipelining Protocols (Channel Utilization, Go-Back-N vs Selective Repeat)
- [x] TCP Segment Structure & Flags (URG, ACK, PSH, RST, SYN, FIN, ECE, CWR)
- [x] TCP Three-Way Handshake (SYN, SYN-ACK, ACK), SYN Flood Attack & SYN Cookies
- [x] TCP Connection Teardown (FIN, ACK, FIN, ACK, `TIME_WAIT` 2MSL)
- [x] Sequence Number & Acknowledgment Number (Byte Stream, Cumulative ACK)
- [x] การคำนวณ ACK จากจำนวน Byte และข้อมูล Data Payload
- [x] RTT Estimation (SampleRTT, EstimatedRTT EWMA, DevRTT, TimeoutInterval, Karn's Algorithm)
- [x] TCP Reliable Data Transfer in Practice & Fast Retransmit (3 Duplicate ACKs)
- [x] Flow Control & Receive Window ($\text{rwnd} = \text{RcvBuffer} - (\text{LastByteRcvd} - \text{LastByteRead})$)
- [x] Congestion Control Principles (Causes, Costs, End-to-end vs Network-assisted)
- [x] TCP Congestion Control Mechanisms (AIMD Sawtooth, Slow Start exponential growth, Congestion Avoidance linear growth, Fast Recovery)
- [x] TCP Tahoe vs TCP Reno (พฤติกรรมเมื่อเกิด Timeout vs 3 Duplicate ACKs)
- [x] Explicit Congestion Notification (ECN IP ECT/CE, TCP ECE/CWR)
- [x] TCP Fairness (AIMD convergence along $45^\circ$ line)
