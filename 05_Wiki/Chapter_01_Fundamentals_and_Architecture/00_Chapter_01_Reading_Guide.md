---
tags:
  - networking
  - chapter-01
  - reading-guide
  - fundamentals
  - osi-model
  - tcp-ip
created: 2026-09-05
updated: 2026-09-05
type: reading-guide
---

# 📖 Chapter 01: Fundamentals & Network Models (Study & Reading Guide)

> [!IMPORTANT]
> **เป้าหมายของบทนี้:** ปูพื้นฐานการสื่อสารข้อมูล 5 องค์ประกอบ, ทิศทางการส่งสัญญาณ (Simplex/Half/Full-Duplex), โทโพโลยีเครือข่าย, สื่อสัญญาณ (UTP, Fiber, Wireless), การสลับแพ็กเก็ต vs วงจร (Packet vs Circuit Switching), การคำนวณ Delays ($d_{\text{trans}}, d_{\text{prop}}$), และสถาปัตยกรรมแบ่งชั้น **OSI 7 Layers vs TCP/IP 5 Layers** พร้อมกลไก Encapsulation

---

## 🚦 ลำดับการอ่านบทที่ 1 ให้เข้าใจเร็วที่สุด (Recommended Reading Flow)

```mermaid
graph TD
    Step1["<b>Step 1: อ่านทฤษฎีพื้นฐานเครือข่าย</b><br/>📄 01_Lecture_01_Network_Fundamentals.md<br/><i>(องค์ประกอบการสื่อสาร, Topologies, สื่อสัญญาณ, Switching, Delays)</i>"]
    Step1 --> Step2["<b>Step 2: อ่านโมเดลลำดับชั้น OSI 7 Layers & TCP/IP</b><br/>📄 02_Lecture_02_Network_Models_and_Architecture.md<br/><i>(หน้าที่ของแต่ละ Layer, PDU, Encapsulation, Header/Trailer)</i>"]
    Step2 --> Step3["<b>Step 3: ตะลุย Interactive Lab Guide</b><br/>📄 03_Interactive_Lab_Guide_Chapter_1.md<br/>📄 04_Interactive_Lab_Guide_Chapter_2.md<br/><i>(แบบฝึกหัดโต้ตอบ, วิเคราะห์ Messenger, OSI Troubleshooting Matrix)</i>"]
    Step3 --> Step4["<b>Step 4: ฝึกทำโจทย์คำนวณ Delays</b><br/>📄 โฟลเดอร์ Comprehensive_Exam_and_Calculations/Calculations and Trace Workbook.md"]

    style Step1 fill:#f0fdf4,stroke:#16a34a
    style Step2 fill:#dbeafe,stroke:#2563eb
    style Step3 fill:#fef3c7,stroke:#d97706
    style Step4 fill:#faf5ff,stroke:#9333ea
```

---

## 📂 รายชื่อเอกสารในโฟลเดอร์นี้

1. **[[01_Lecture_01_Network_Fundamentals]]** — สรุปเนื้อหาพื้นฐานการสื่อสาร, Topologies, สายสัญญาณ UTP/Fiber, Circuit vs Packet Switching, และ 4 Network Delays
2. **[[02_Lecture_02_Network_Models_and_Architecture]]** — สรุปโมเดล OSI 7 ชั้น vs TCP/IP 5 ชั้น, Flight Booking Analogy, PDU แต่ละชั้น, Bit-by-bit Encapsulation Trace
3. **[[03_Interactive_Lab_Guide_Chapter_1]]** — คู่มือถอดรหัสสื่อการสอนโต้ตอบ Chapter 1 (25 Sections)
4. **[[04_Interactive_Lab_Guide_Chapter_2]]** — คู่มือถอดรหัสสื่อการสอนโต้ตอบ Chapter 2 (23 Sections) พร้อม Troubleshooting Matrix
