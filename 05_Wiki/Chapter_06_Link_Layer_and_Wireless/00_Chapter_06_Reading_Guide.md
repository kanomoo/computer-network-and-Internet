---
tags:
  - networking
  - chapter-06
  - reading-guide
  - link-layer
  - wireless
  - crc
created: 2026-09-05
updated: 2026-09-05
type: reading-guide
---

# 📖 Chapter 06: Link Layer & Local Area Networks (Study & Reading Guide)

> [!IMPORTANT]
> **เป้าหมายของบทนี้:** ทำความเข้าใจบริการของ Data Link Layer (Framing, Flow/Error Control, Half/Full Duplex, NIC Architecture), การตรวจจับข้อผิดพลาดด้วย **CRC (Cyclic Redundancy Check) Polynomial Division** ทั้งฝั่งส่งและฝั่งรับ, Multiple Access Protocols (TDMA, FDMA, Slotted/Pure ALOHA, CSMA, CSMA/CD Minimum Frame 64B & Backoff, Taking-Turns Polling/Token, DOCSIS Cable), การระบุตำแหน่งทางกายภาพ MAC Addressing (48 บิต), โปรโตคอล ARP และการ Trace ข้ามเครือข่ายย่อย, โครงสร้างสวิตช์อีเทอร์เน็ตและการเรียนรู้ตาราง MAC Table อัตโนมัติ (Self-Learning), การแบ่งเครือข่ายเสมือน **VLAN (IEEE 802.1Q)**, สถาปัตยกรรมเสมือนศูนย์ข้อมูล **VXLAN Overlay (24-bit VNI) & BGP EVPN**, สถาปัตยกรรมการสลับป้ายชื่อ **MPLS (Multiprotocol Label Switching)**, สถาปัตยกรรมศูนย์ข้อมูลสมัยใหม่ **2-Layer Leaf/Spine (Clos Network & Facebook F16, DCTCP, RoCE, ORION)**, และการสังเคราะห์ระดับมหาภาค **"A Day in the Life of a Web Request"**

---

## 🚦 ลำดับการอ่านบทที่ 6 (Recommended Reading Flow)

1. **Step 1: ศึกษาเนื้อหาหลักสูตรปัจจุบัน v9.0 ฉบับสมบูรณ์ (สไลด์ 1–111 ละเอียดยิบ 100%)**
   - 📄 [[01_Lecture_06_Chapter_6_Link_Layer_and_LANs_v9]] *(ฉบับทางการล่าสุด v9.0 ครอบคลุมสไลด์อาจารย์ + Kurose & Ross 8th Ed)*
   - 📄 [[01_Lecture_06_Link_Layer_LANs_and_Wireless]] *(บันทึกภาพรวมดั้งเดิมที่ครอบคลุมเนื้อหา Wireless/Wi-Fi/Cellular เพิ่มเติม)*
2. **Step 2: ฝึกทำโจทย์การคำนวณหารยาวพหุนาม CRC Modulo-2 (สไลด์, Quiz ภาควิชา 4 ข้อ และ Homework 5)**
   - 📄 ศึกษาวิธีทำแบบ Step-by-Step ทั้งฝั่งส่ง (Sender) และฝั่งรับ (Receiver Verification: Remainder $= 0$) ใน [[Calculations and Trace Workbook#6. การคำนวณ Cyclic Redundancy Check (CRC)]]
3. **Step 3: ศึกษากลไกการส่งข้อมูลข้ามเครือข่ายย่อย (Routing to Another Subnet Step-by-Step)**
   - 📄 ใน [[01_Lecture_06_Chapter_6_Link_Layer_and_LANs_v9#4.5 การส่งข้อมูลข้ามเครือข่ายย่อย (Routing to Another Subnet Step-by-Step)]]
4. **Step 4: ทำความเข้าใจ VLAN 802.1Q, VXLAN Data Center Virtualization และ MPLS Label Swapping**
   - 📄 ใน [[01_Lecture_06_Chapter_6_Link_Layer_and_LANs_v9#7. เครือข่ายเสมือน VLAN และระบบเสมือนศูนย์ข้อมูลยุคใหม่ (Slides 76–85)]] และ [[01_Lecture_06_Chapter_6_Link_Layer_and_LANs_v9#8. การสลับป้ายชื่อโปรโตคอลหลายชั้น (Multiprotocol Label Switching: MPLS - Slides 86–91)]]
5. **Step 5: ทบทวนการบูรณาการครบ 5 เลเยอร์ "A Day in the Life of a Web Request"**
   - 📄 ใน [[01_Lecture_06_Chapter_6_Link_Layer_and_LANs_v9#10. การสังเคราะห์ระดับมหาภาค: "A Day in the Life of a Web Request" (Slides 101–109)]]

---

## 📂 แหล่งไฟล์อ้างอิงต้นฉบับ (Source Documents)
- **สไลด์ PowerPoint v9.0:** `02_Slides/Chapter_06_Link_Layer/Current_Year_Course_v9.0/Chapter_6_v9.0_Datalink_Layer.pptx`
- **สไลด์บทอ่านนักศึกษา 1–111 หน้า:** `02_Slides/Chapter_06_Link_Layer/Current_Year_Course_v9.0/Chapter_6_The_Link_Layer_1-111.html`
- **เอกสารสรุปและโจทย์ Quiz CRC ภาควิชา:** `02_Slides/Chapter_06_Link_Layer/Current_Year_Course_v9.0/Chapter_6_Datalink_layer-CRC.pdf`

