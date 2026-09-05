---
tags:
  - networking
  - chapter-02
  - reading-guide
  - application-layer
  - http
  - dns
created: 2026-09-05
updated: 2026-09-05
type: reading-guide
---

# 📖 Chapter 02: Application Layer (Study & Reading Guide)

> [!IMPORTANT]
> **เป้าหมายของบทนี้:** ทำความเข้าใจการทำงานของโพรโทคอลระดับ Application Layer (ชั้นบนสุดที่ติดต่อกับผู้ใช้), สถาปัตยกรรม Client-Server vs P2P, วิวัฒนาการของ HTTP/1.0 ถึง HTTP/3, ระบบชื่อโดเมน (DNS Hierarchy & Query Trace), ระบบอีเมล (SMTP, POP3, IMAP), FTP Dual-Channel, และการเขียนโปรแกรมเครือข่ายด้วย Socket API

---

## 🚦 ลำดับการอ่านบทที่ 2 ให้เข้าใจเร็วที่สุด (Recommended Reading Flow)

```mermaid
graph TD
    Step1["<b>Step 1: อ่านทฤษฎี Application Layer ตัวเต็ม</b><br/>📄 01_Lecture_03_Application_Layer_Protocols.md<br/><i>(HTTP Methods/Status Codes, Cookies, DNS Records, Email Ports, Socket API)</i>"] --> Step2["<b>Step 2: ศึกษา Interactive Lab & Packet Capture</b><br/>📄 02_Interactive_Lab_Guide_Chapter_3.md<br/><i>(Wireshark Lab, Socket Lifecycle, DNS Recursive Trace, HTTP Flow)</i>"]
    Step2 --> Step3["<b>Step 3: ตะลุยโจทย์ทดสอบ 20 ข้อจาก Classroom</b><br/>📄 โฟลเดอร์ Comprehensive_Exam_and_Calculations/Exam Preparation Guide and Master 80-Question Bank.md"]

    style Step1 fill:#fefce8,stroke:#ca8a04
    style Step2 fill:#dbeafe,stroke:#2563eb
    style Step3 fill:#fdf2f8,stroke:#db2777
```

---

## 📂 รายชื่อเอกสารในโฟลเดอร์นี้

1. **[[01_Lecture_03_Application_Layer_Protocols]]** — บันทึกการสอนหลักครอบคลุมสไลด์บทที่ 2 (1–119): สถาปัตยกรรม Client-Server, HTTP/1.0-HTTP/3, DNS (A, AAAA, CNAME, MX), SMTP/POP3/IMAP, CDN และ Socket Lifecycle
2. **[[02_Interactive_Lab_Guide_Chapter_3]]** — คู่มือถอดรหัสบทเรียนโต้ตอบ 36 Sections พร้อม Wireshark Trace และ Packet Analysis
