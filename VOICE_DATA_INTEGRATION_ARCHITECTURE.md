# Voice Data Integration & Architectural Ingestion Guide
## Project: computer-network-&-Internet (Kurose & Ross 8th Ed. Wiki & Lab Hub)

เอกสารฉบับนี้จัดทำขึ้นเพื่อระบุโครงสร้างสถาปัตยกรรมของโครงการ `computer-network-&-Internet` อย่างละเอียดที่สุด และกำหนดแนวทางการบูรณาการข้อมูลการถอดความเสียง (Voice Transcripts), การคำนวณอัลกอริทึมเครือข่าย (Distance Vector & CRC), และโจทย์การบ้านเข้าสู่ระบบ Wiki และ Web Course อย่างเป็นระบบ

---

## 1. การวิเคราะห์โครงสร้างโครงการ (Project Architectural Inventory)

โครงสร้างโฟลเดอร์ของ `C:\Project\computer-network-&-Internet\` ประกอบด้วย:

```text
C:\Project\computer-network-&-Internet\
├── 01_Textbooks/                   <-- หนังสือเรียนอ้างอิง Kurose & Ross 8th Edition
├── 02_Slides/                      <-- สไลด์ประกอบการสอนประจำแต่ละสัปดาห์
├── 03_Homework/                    <-- แหล่งรวมโจทย์และการบ้าน
├── 04_Quizzes_and_Exams/           <-- คลังข้อสอบและแนวข้อสอบกลางภาค-ปลายภาค
├── 05_Wiki/                        <-- ระบบ Wiki จัดหมวดหมู่ตาม Layer ใน 5-Layer Internet Architecture
│   ├── Chapter_04_Network_Data_Plane/
│   ├── Chapter_05_Network_Control_Plane/  <-- ที่จัดเก็บโน้ต Distance Vector & BGP Routing
│   ├── Chapter_06_Link_Layer_and_Wireless/ <-- ที่จัดเก็บโน้ต CRC & Multiple Access Protocols
│   └── Comprehensive_Exam_and_Calculations/ <-- รวมโจทย์คำนวณ Checksum, CRC, Subnetting
├── 06_Web_Course/                  <-- เว็บไซต์แสดงเนื้อหาบทเรียนออนไลน์
├── 07_Tools/                       <-- เครื่องมือจำลองและคำนวณเครือข่าย
├── Transcripts/                    <-- แหล่งจัดเก็บ Verbatim Transcripts (.txt) จากไฟล์เสียงทุกสัปดาห์
└── README.md                       <-- เอกสารสารบัญใหญ่
```

---

## 2. แผนที่การนำข้อมูลเสียงเข้าสู่โปรเจกต์ (Voice Ingestion Mapping)

| ข้อมูลนำเข้าจาก `C:\Project\Voice\` | ปลายทางใน `computer-network-&-Internet\` | วัตถุประสงค์และการประมวลผล |
| :--- | :--- | :--- |
| **ไฟล์เสียงดิบ (.aac)** | ย้ายไป `C:\Project\Voice\Success\` | **ห้ามก๊อปปี้ไฟล์เสียงเข้าโปรเจกต์เด็ดขาด** แยก Audio Storage อย่างชัดเจน |
| **Transcript วันที่ 14 ก.ย. (.txt)** | `Transcripts/20260914_132959.txt` | การถอดความเรื่อง Distance Vector, Bellman-Ford, Hierarchical Routing, BGP |
| **Transcript วันที่ 21 ก.ย. (.txt)** | `Transcripts/20260921_135415.txt` | การถอดความเรื่อง Data Link Layer, 1D/2D Parity, Checksum, CRC, CSMA/CD |
| **โน้ต Control Plane & Routing** | `05_Wiki/Chapter_05_Network_Control_Plane/Distance_Vector_and_BGP_Lecture_Notes.md` | สรุปสมการ Bellman-Ford และปัญหา Count-to-Infinity |
| **คู่มือและเฉลยการบ้าน CRC** | `05_Wiki/Chapter_06_Link_Layer_and_Wireless/CRC_Calculation_and_MAC_Protocols.md` | แสดงขั้นตอนการตั้งหาร XOR หา CRC และเฟรมที่ส่งจริง |

---

## 3. สรุปสาระสำคัญและจุดลวงในข้อสอบ (Exam Traps & Formula Cheatsheet)

1. **การคำนวณ CRC ด้วยการหาร Modulo-2:**
   - การหารใช้ตัวดำเนินการ **XOR ($\oplus$)** เท่านั้น (เหมือนกันเป็น 0, ต่างกันเป็น 1, ไม่มีการยืมบิต)
   - หากตัวหาร $G$ มีความยาว $L$ บิต ต้องเติมศูนย์ต่อท้ายข้อมูล $D$ จำนวน **$L - 1$ ตัว**
   - เมื่อบิตซ้ายสุดเป็น 0 ให้ XOR ด้วย `0000` (ห้ามเลื่อนข้ามโดยไม่ทำ XOR)
2. **การแปลง Polynomial เป็นบิตตัวหาร:**
   - $x^3 + 1 \implies x^3 + 0x^2 + 0x^1 + 1x^0 \implies \mathbf{1 0 0 1}$
   - $x^3 + x + 1 \implies x^3 + 0x^2 + 1x^1 + 1x^0 \implies \mathbf{1 0 1 1}$
3. **การเปรียบเทียบ Multiple Access Protocols:**
   - Slotted ALOHA ประสิทธิภาพสูงสุดเพียง **37% ($1/e$)**
   - CSMA/CD ใช้บนสายแลน Ethernet (ฟังก่อนส่ง + ตรวจจับการชนระหว่างส่ง)
   - CSMA/CA ใช้บน Wi-Fi ไร้สาย (ฟังก่อนส่ง + หลีกเลี่ยงการชนล่วงหน้า)
4. **Distance Vector Bellman-Ford Equation:**
   - $d_x(y) = \min_v \{ c(x,v) + d_v(y) \}$
   - จุดอ่อน: Count-to-Infinity Problem เมื่อลิงก์มี Cost สูงขึ้นหรือขาด แก้ไขด้วย Split Horizon / Poisoned Reverse
