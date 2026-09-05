# 🌐 Computer Network & Internet Knowledge Base & Study Repository

ยินดีต้อนรับสู่คลังความรู้และแหล่งรวบรวมสื่อการเรียนการสอนวิชา **Computer Networks and the Internet**

---

## 📁 โครงสร้างไดเรกทอรี (Directory Layout)

```
computer-network-&-Internet/
│
├── 📁 01_Textbooks/                 # หนังสือเรียนและตำราอ้างอิงหลัก
│   ├── Computer Networking A Top-Down Approach (8th Edition).pdf
│   └── Computer Networking A Top-Down Approach (James Kurose, Keith Ross).pdf
│
├── 📁 02_Slides/                    # สไลด์การสอนแยกตามบท (แยกโฟลเดอร์ปีใหม่และปีเก่าชัดเจน)
│   ├── 📂 Chapter_01_Introduction/
│   │   ├── 📁 Current_Year_Course/          # [ปีปัจจุบัน] สไลด์ HTML Course 1-89
│   │   └── 📁 Archive_Old_Curriculum/       # [ปีเก่า] สไลด์ PDF เดิม
│   ├── 📂 Chapter_02_Application_Layer/
│   │   ├── 📁 Current_Year_Course/          # [ปีปัจจุบัน] สไลด์ HTML 1-119, browsing, email
│   │   └── 📁 Archive_Old_Curriculum/       # [ปีเก่า] สไลด์ PDF เดิม
│   ├── 📂 Chapter_03_Transport_Layer/
│   │   ├── 📁 Current_Year_Course_v9.0/     # [ปีปัจจุบัน v9.0] สไลด์ 1-154, DATACOM 2026
│   │   └── 📁 Archive_Old_Curriculum/       # [ปีเก่า] สไลด์ PDF เดิม
│   ├── 📂 Chapter_04_Network_Data_Plane/
│   │   ├── 📁 Current_Year_Course_v9.0/     # [ปีปัจจุบัน v9.0] สไลด์ 1-102, PPTX v9.0
│   │   └── 📁 Archive_Old_Curriculum/       # [ปีเก่า] สไลด์ PDF เดิม
│   ├── 📂 Chapter_05_Network_Control_Plane/
│   ├── 📂 Chapter_06_Link_Layer/
│   ├── 📂 Chapter_07_Wireless/
│   └── 📂 CCNA_Special_Topics/              # สไลด์ฝึกปฏิบัติการ IP Address & Subnet
│
├── 📁 03_Homework/                  # เอกสารการบ้านและเฉลย
│   ├── 📁 Current_Year_Assignments/         # การบ้านปีปัจจุบัน (Homework 1-5, Assignments 2026)
│   └── 📁 Archive_Old_Assignments/          # แฟ้มการบ้านปีเก่า
│
├── 📁 04_Quizzes_and_Exams/         # ข้อสอบและแบบทดสอบ
│   └── 📁 Current_Year_Quizzes/             # แบบทดสอบปีปัจจุบัน (Quiz 2026, Exam Review, Screenshots)
│
├── 📁 05_Wiki/                      # คลังความรู้ Obsidian Vault จัดระเบียบแยกตามบทเรียน
│   ├── 📂 00_Master_Roadmap_and_Index/      # แผนที่นำทางการอ่านทั้งวิชา, Master Index, Checklist
│   ├── 📂 Chapter_01_Fundamentals_and_Architecture/ # บทที่ 1 & 2: พื้นฐานเครือข่าย และโมเดล OSI/TCP-IP
│   ├── 📂 Chapter_02_Application_Layer/     # บทที่ 2 (Kurose ch2): HTTP/1-3, DNS, Sockets, CDN
│   ├── 📂 Chapter_03_Transport_Layer/       # บทที่ 3: TCP/UDP, Handshake, Checksum, Congestion Control
│   ├── 📂 Chapter_04_Network_Data_Plane/    # บทที่ 4: Router, IPv4/v6, Subnetting FLSM/VLSM, NAT
│   ├── 📂 Chapter_05_Network_Control_Plane/ # บทที่ 5: Routing Algorithms, Dijkstra, OSPF, BGP, SDN
│   ├── 📂 Chapter_06_Link_Layer_and_Wireless/ # บทที่ 6 & 7: MAC, Switches, VLAN, WiFi 802.11, CRC
│   ├── 📂 Comprehensive_Exam_and_Calculations/ # คลังข้อสอบ 80 ข้อ และคู่มือรวมวิธีคำนวณทุกบท
│   ├── 📂 Archive_Old_Curriculum_Notes/     # [ปีเก่า] โน้ตความรู้ฉบับหลักสูตรปีก่อนหน้า (แยกเด็ดขาด)
│   └── 📂 Assets/                           # รูปภาพและสื่อประกอบ
│
├── 📁 06_Web_Course/                # เว็บไซต์และ Interactive Web Slides
├── 📁 07_Tools/                     # สคริปต์เครื่องมือประมวลผลข้อมูล
└── 📁 08_Archive/                   # แฟ้มเก็บไฟล์สำรองและไฟล์ชั่วคราว
```

---

## 🚀 สรุปเนื้อหาสำคัญในคลังความรู้ (`05_Wiki/`)

| โฟลเดอร์บทเรียน | เอกสารนำทางและเนื้อหาหลัก | รายละเอียดการศึกษา |
| :--- | :--- | :--- |
| **00_Master_Roadmap** | `00_START_HERE_Reading_Roadmap.md` | แผนที่นำทางการอ่านทั้งวิชาทีละสเต็ป พร้อมเทคนิคเตรียมตัวสอบ |
| **Chapter_01** | `00_Chapter_01_Reading_Guide.md` | ทฤษฎีพื้นฐาน, โมเดล OSI 7 ชั้น vs TCP/IP 5 ชั้น, Lab Guide ch1 & ch2 |
| **Chapter_02** | `00_Chapter_02_Reading_Guide.md` | โพรโทคอล Application, HTTP/1-3, DNS, Sockets, Lab Guide ch3 |
| **Chapter_03** | `00_Chapter_03_Reading_Guide.md` | Transport Layer, UDP Checksum, TCP Handshake & Flow/Congestion Control |
| **Chapter_04** | `00_Chapter_04_Reading_Guide.md` | Network Data Plane, ถอดรหัส Video.md & เฉลยแบบฝึกหัด Subnetting Example.md |
| **Chapter_05** | `00_Chapter_05_Reading_Guide.md` | Network Control Plane, Dijkstra Shortest Path, Distance Vector |
| **Chapter_06** | `00_Chapter_06_Reading_Guide.md` | Link Layer, MAC, Switches, VLAN, WiFi 802.11, CRC Polynomial Division |
| **Comprehensive_Exam** | `Exam Preparation Guide & Question Bank` | คลังข้อสอบ 80 ข้อเสมือนจริง และสมุดรวมวิธีทำโจทย์คำนวณ Workbook |

---
