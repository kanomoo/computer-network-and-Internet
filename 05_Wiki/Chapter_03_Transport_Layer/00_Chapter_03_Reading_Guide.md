---
tags:
  - networking
  - chapter-03
  - reading-guide
  - transport-layer
  - tcp
  - udp
created: 2026-09-05
updated: 2026-09-05
type: reading-guide
---

# 📖 Chapter 03: Transport Layer (Study & Reading Guide)

> [!IMPORTANT]
> **เป้าหมายของบทนี้:** ทำความเข้าใจการส่งข้อมูลแบบ Process-to-Process, กลไก Multiplexing / Demultiplexing (2-tuple vs 4-tuple), การทำงานของ UDP (Header 8 ไบต์ และ Checksum), ทฤษฎีการส่งข้อมูลที่เชื่อถือได้ (Principles of RDT 1.0–3.0, Go-Back-N vs Selective Repeat), และเจาะลึก TCP (Three-Way Handshake, Sequence/ACK Byte Stream, Flow Control `rwnd`, Congestion Control `cwnd`, AIMD, Slow Start)

---

## 🚦 ลำดับการอ่านบทที่ 3 ให้เข้าใจเร็วที่สุด (Recommended Reading Flow)

```mermaid
graph TD
    Step1["<b>Step 1: อ่านทฤษฎี Transport Layer ครบวงจร</b><br/>📄 01_Lecture_04_Transport_Layer_Protocols_and_Mechanics.md<br/><i>(Mux/Demux, UDP Checksum, RDT FSM, TCP Handshake, Seq/Ack, Congestion Control)</i>"] --> Step2["<b>Step 2: ฝึกทำโจทย์คำนวณ Checksum 16 บิต</b><br/>📄 ใน Calculations and Trace Workbook (Homework 2 & Assignment 1)"]
    Step2 --> Step3["<b>Step 3: วาด Trace Diagram ของ TCP Handshake & ส่งข้อมูล 'hello'</b><br/>📄 ใน Calculations and Trace Workbook (Assignment 2)"]
    Step3 --> Step4["<b>Step 4: ตะลุยข้อสอบจริง Quiz Chapter 3</b><br/>📄 ใน Exam Preparation Guide and Master 80-Question Bank.md"]

    style Step1 fill:#fef2f2,stroke:#dc2626
    style Step2 fill:#fef3c7,stroke:#d97706
    style Step3 fill:#dbeafe,stroke:#2563eb
    style Step4 fill:#fdf2f8,stroke:#db2777
```

---

## 📂 รายชื่อเอกสารในโฟลเดอร์นี้

1. **[[01_Lecture_04_Transport_Layer_Protocols_and_Mechanics]]** — บันทึกการสอนหลักครอบคลุมสไลด์บทที่ 3 สไลด์ 1–154 และชีต DATACOM 2026 อย่างละเอียดสมบูรณ์ 100%
2. **โจทย์คำนวณและเฉลยที่เกี่ยวข้อง:** ดูในโฟลเดอร์ `Comprehensive_Exam_and_Calculations/Calculations and Trace Workbook.md` (หัวข้อ Checksum และ TCP Handshake)
