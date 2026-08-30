const fs = require('fs');
const path = require('path');

const masterContent = `---
tags:
  - networking
  - lecture
  - data-plane
  - router-architecture
  - ip-addressing
  - subnetting
  - nat
  - ipv6
  - openflow
  - sdn
  - middleboxes
  - end-to-end-principle
  - v9-current
created: 2026-08-30
updated: 2026-08-30
curriculum: Current v9.0 (Slides 1-102)
type: lecture-note
---

# Lecture 4: Network Layer — Data Plane (Current v9.0 Complete Master Guide)

> [!SUMMARY]
> **เอกสารสรุปคลังความรู้วิชา Computer Networks: Chapter 4 Network Layer — Data Plane (ฉบับหลักสูตรปัจจุบัน v9.0 สไลด์ 1–102 สมบูรณ์ 100%)**
> รวบรวมและเรียบเรียงเนื้อหาทุกสไลด์ ทุกหัวข้อ ทุกสมการ และทุกโปรโตคอลอย่างละเอียด ไม่มีการตัดทอนหรือจัดกลุ่มรวบรัด พร้อมแผนภาพสถาปัตยกรรม Mermaid, แผนผัง Packet Header Bitfield, ตารางเปรียบเทียบเชิงลึก, ตัวอย่างการคำนวณ Step-by-step (IP Fragmentation, CIDR Subnetting, Buffer Sizing, WFQ Scheduling, NAT Translation) และการวิเคราะห์ Wireshark Trace จริง

---

## 📑 สารบัญเนื้อหาหลัก (Master Table of Contents)

1. [[#1. ภาพรวม Network Layer: Data Plane vs Control Plane และ Service Models (Slides 1–13)]]
   - [[#1.1 สถาปัตยกรรมและหน้าที่หลักของ Network Layer]]
   - [[#1.2 ความแตกต่างระหว่าง Data Plane และ Control Plane]]
   - [[#1.3 รูปแบบการควบคุม: Per-Router Control Plane vs SDN Control Plane]]
   - [[#1.4 แบบจำลองการให้บริการของเครือข่าย (Network Service Models & Best-Effort Service)]]
2. [[#2. โครงสร้างภายในและกลไกการทำงานของเร้าเตอร์ (What's Inside a Router) (Slides 14–40)]]
   - [[#2.1 สถาปัตยกรรมเร้าเตอร์ระดับฮาร์ดแวร์ (Router Architecture Overview)]]
   - [[#2.2 พอร์ตรับข้อมูล (Input Port Processing) และการส่งต่อแบบกระจายศูนย์]]
   - [[#2.3 การจับคู่คำนำหน้าที่ยาวที่สุด (Longest Prefix Matching - LPM) และชิป TCAM]]
   - [[#2.4 สวิตชิ่งแฟบริก 3 รูปแบบหลัก (Switching Fabrics: Memory, Bus, Interconnection Network)]]
   - [[#2.5 ปัญหาการเข้าคิวและ Head-of-Line (HOL) Blocking ที่พอร์ตขาเข้า]]
   - [[#2.6 พอร์ตส่งข้อมูลออก (Output Port Processing) และการเกิดคิวสะสม]]
   - [[#2.7 การคำนวณขนาดบัฟเฟอร์ที่เหมาะสม (Buffer Sizing: Rule-of-Thumb vs N-Flows Formula)]]
   - [[#2.8 การจัดการบัฟเฟอร์ (Buffer Management: Tail Drop, Priority Drop, AQM/RED)]]
   - [[#2.9 นโยบายการจัดลำดับการส่งแพ็กเก็ต (Packet Scheduling: FCFS, Strict Priority, Round Robin, WFQ)]]
   - [[#2.10 ประเด็นความเป็นกลางทางเครือข่าย (Network Neutrality & FCC Regulations)]]
3. [[#3. อินเทอร์เน็ตโปรโตคอล IPv4, การกำหนดแอดเดรส และ DHCP (Slides 41–63)]]
   - [[#3.1 สถาปัตยกรรม Internet Network Layer]]
   - [[#3.2 โครงสร้าง IPv4 Datagram Header (ทุกฟิลด์แบบ Bitfield)]]
   - [[#3.3 การกำหนดหมายเลข IP, อินเทอร์เฟซ และนิยามของซับเน็ต (Subnets)]]
   - [[#3.4 การกำหนดแอดเดรสแบบไร้คลาส (CIDR: Classless Inter-Domain Routing)]]
   - [[#3.5 โปรโตคอลกำหนดค่า IP อัตโนมัติ (DHCP: Dynamic Host Configuration Protocol - DORA Exchange)]]
   - [[#3.6 การจัดสรรช่วง IP แบบลำดับชั้นและการรวมเส้นทาง (Hierarchical Addressing & Route Aggregation)]]
4. [[#4. การแปลงที่อยู่เครือข่าย (Network Address Translation - NAT) (Slides 64–68)]]
   - [[#4.1 แรงจูงใจและช่วงแอดเดรสส่วนตัว (Private Address Space RFC 1918)]]
   - [[#4.2 กลไกการทำงานของ NAT/NAPT และตารางการแปลงพอร์ต (Translation Table)]]
   - [[#4.3 ข้อถกเถียงและข้อจำกัดทางสถาปัตยกรรมของ NAT (NAT Controversy & End-to-End Principle)]]
5. [[#5. สถาปัตยกรรม IPv6 และการเปลี่ยนผ่าน (Slides 69–76)]]
   - [[#5.1 แรงจูงใจในการพัฒนา IPv6 (128-bit Address Space)]]
   - [[#5.2 โครงสร้าง Header แบบคงที่ 40 ไบต์ของ IPv6 (IPv6 Fixed Header)]]
   - [[#5.3 ยุทธศาสตร์การเปลี่ยนผ่านจาก IPv4 สู่ IPv6 (Dual Stack และ IPv6-in-IPv4 Tunneling)]]
   - [[#5.4 สภาพการใช้งานจริงและการยอมรับ IPv6 ในระดับโลก]]
6. [[#6. การส่งต่อแบบทั่วไปและสถาปัตยกรรม SDN (Generalized Forwarding & OpenFlow) (Slides 77–87)]]
   - [[#6.1 แนวคิด Match-plus-Action เหนือการส่งต่อแบบเดิม]]
   - [[#6.2 โครงสร้างตารางโฟลว์ (Flow Table Abstraction: Pattern, Counter, Actions)]]
   - [[#6.3 ชุดฟิลด์การตรวจสอบของ OpenFlow ข้ามเลเยอร์ L2/L3/L4]]
   - [[#6.4 ตัวอย่างการประยุกต์ใช้งานจริง: Routing, Firewall, NAT, Server Load Balancing]]
   - [[#6.5 การประสานการทำงานทั่วทั้งเครือข่าย (Network-Wide Flow Table Orchestration)]]
7. [[#7. อุปกรณ์ตัวกลางในระบบเครือข่าย (Middleboxes) (Slides 88–90)]]
   - [[#7.1 นิยามและประเภทของ Middleboxes ในเครือข่ายปัจจุบัน]]
   - [[#7.2 การเปลี่ยนผ่านสู่ Programmable Infrastructure และ NFV]]
8. [[#8. ปรัชญาและหลักการออกแบบสถาปัตยกรรมอินเทอร์เน็ต (Internet Architecture & Design Principles) (Slides 91–98)]]
   - [[#8.1 สถาปัตยกรรมรูปทรงนาฬิกาทรายของอินเทอร์เน็ต (The IP Hourglass Model)]]
   - [[#8.2 หลักการทำงานแบบจุดต่อจุด (The End-to-End Argument - Saltzer et al., 1984)]]
   - [[#8.3 ตำแหน่งความฉลาดของระบบเครือข่าย (Smart Edge vs Simple Core)]]
9. [[#9. ภาคผนวกเจาะลึก: การแบ่งส่วนข้อมูลและการวิเคราะห์ Wireshark (Slides 99–102)]]
   - [[#9.1 กลไก IP Fragmentation and Reassembly (พร้อมตัวอย่างตารางคำนวณ Step-by-Step)]]
   - [[#9.2 การวิเคราะห์แพ็กเก็ต DHCP จาก Wireshark Trace จริง (Home LAN Environment)]]

---

# 1. ภาพรวม Network Layer: Data Plane vs Control Plane และ Service Models (Slides 1–13)

## 1.1 สถาปัตยกรรมและหน้าที่หลักของ Network Layer

Network Layer (ชั้นเครือข่าย) ทำหน้าที่ส่งมอบแพ็กเก็ตข้อมูลจาก **โฮสต์ต้นทาง (Sending Host)** ไปยัง **โฮสต์ปลายทาง (Receiving Host)** ข้ามโครงข่ายอินเทอร์เน็ต (Host-to-Host Communication Service) โดยทำงานครอบคลุมทั้งบน End Systems (โฮสต์) และอุปกรณ์เราเตอร์ทุกตัวในแกนกลางของเครือข่าย

```mermaid
flowchart LR
    subgraph HostA ["โฮสต์ต้นทาง (Sender)"]
        AppA["Application"] --> TransA["Transport Layer (Segments)"]
        TransA --> NetA["Network Layer (Encapsulate into Datagrams)"]
        NetA --> LinkA["Link / Physical Layer"]
    end

    subgraph Core ["โครงข่ายเราเตอร์ (Network Core)"]
        R1["Router 1<br/>(Inspect Header & Forward)"]
        R2["Router 2<br/>(Inspect Header & Forward)"]
        R3["Router 3<br/>(Inspect Header & Forward)"]
        R1 <--> R2 <--> R3
    end

    subgraph HostB ["โฮสต์ปลายทาง (Receiver)"]
        LinkB["Link / Physical Layer"] --> NetB["Network Layer (Extract & Decapsulate)"]
        NetB --> TransB["Transport Layer"]
        TransB --> AppB["Application"]
    end

    LinkA --> R1
    R3 --> LinkB
```

### หน้าที่สำคัญ 2 ประการที่ทำงานควบคู่กัน:
1. **Forwarding (การส่งต่อ - Data Plane):** ย้ายแพ็กเก็ตจากอินพุตลิงก์ของเร้าเตอร์ไปยังเอาต์พุตลิงก์ที่เหมาะสม เกิดขึ้นในระดับ **ฮาร์ดแวร์เฉพาะทาง (Hardware)** ภายในเวลาไม่กี่นาโนวินาที (Nanoseconds)
2. **Routing (การเลือกเส้นทาง - Control Plane):** คำนวณและกำหนดเส้นทางทั้งหมดตั้งแต่ต้นทางจนถึงปลายทาง (End-to-End Path Determination) ผ่านอัลกอริทึมการหาเส้นทาง ทำงานในระดับซอฟต์แวร์ภายในเวลาเสี้ยววินาที (Milliseconds ถึง Seconds)

> [!DEFINITION]
> **การเปรียบเทียบเชิงอุปมา (Analogy):**
> - **Routing:** เหมือนการวางแผนการเดินทางขับรถข้ามประเทศ (Trip Planning) กำหนดว่าจะผ่านเมืองใดบ้าง
> - **Forwarding:** เหมือนการขับรถผ่านสี่แยกแต่ละแยก (Passing through a Single Interchange) ตามป้ายบอกทาง

---

## 1.2 ความแตกต่างระหว่าง Data Plane และ Control Plane

โครงสร้าง Network Layer ถูกแบ่งออกเป็น 2 ระนาบการทำงานที่มีบทบาทและช่วงเวลาทำงานต่างกันชัดเจน:

```mermaid
flowchart TD
    subgraph CP ["Control Plane (ระนาบควบคุม - Network-Wide Logic)"]
        RoutingLogic["Routing Algorithms / SDN Controller<br/>(คำนวณและสร้างตาราง Forwarding Table / Flow Rules)"]
    end

    subgraph DP ["Data Plane (ระนาบข้อมูล - Local, Per-Router Function)"]
        direction LR
        InPort["Input Link"] --> HW_Switch["Hardware Switching Fabric<br/>(Lookup Header & Switch)"] --> OutPort["Output Link"]
    end

    RoutingLogic ==>|"ส่งและติดตั้งตารางค้นหาเส้นทาง (Forwarding Table)"| HW_Switch
```

| มิติการเปรียบเทียบ | Data Plane (ระนาบข้อมูล) | Control Plane (ระนาบควบคุม) |
| :--- | :--- | :--- |
| **ขอบเขตการทำงาน (Scope)** | เฉพาะตัวเร้าเตอร์ (Local, Per-router) | ครอบคลุมทั้งเครือข่าย (Network-wide logic) |
| **หน้าที่หลัก** | ตรวจสอบ Header แล้วสลับส่งแพ็กเก็ตจาก Input ไป Output | คำนวณเส้นทางและสร้างตาราง Forwarding Table |
| **การประมวลผล** | ฮาร์ดแวร์ความเร็วสูง (Nanoseconds) | ซอฟต์แวร์ / CPU / Controller (Milliseconds) |
| **โครงสร้างสถาปัตยกรรม** | Traditional Hardware / OpenFlow Switch Data Path | Per-Router Routing Protocols หรือ Centralized SDN Controller |

---

## 1.3 รูปแบบการควบคุม: Per-Router Control Plane vs SDN Control Plane

ในสถาปัตยกรรมเครือข่ายปัจจุบัน มีรูปแบบการควบคุม Control Plane อยู่ 2 รูปแบบหลัก:

### แบบที่ 1: การควบคุมแบบกระจายศูนย์บนแต่ละเร้าเตอร์ (Per-Router Control Plane)
เร้าเตอร์แต่ละตัวจะมีคอมโพเนนต์ Routing Algorithm ทำงานอยู่ภายใน และสื่อสารแลกเปลี่ยนข้อมูลสถานะของเครือข่ายระหว่างกันผ่านโปรโตคอล (เช่น OSPF, BGP) เพื่อคำนวณหาเส้นทางและสร้าง Forwarding Table ภายในตัวเอง

```mermaid
flowchart LR
    subgraph R1 ["Router 1"]
        RC1["Routing Algorithm Component"]
        FT1["Forwarding Table"]
        RC1 --> FT1
    end
    subgraph R2 ["Router 2"]
        RC2["Routing Algorithm Component"]
        FT2["Forwarding Table"]
        RC2 --> FT2
    end
    RC1 <== "แลกเปลี่ยน Routing Messages (OSPF/BGP)" ==> RC2
```

### แบบที่ 2: การควบคุมแบบรวมศูนย์ด้วยซอฟต์แวร์ (Software-Defined Networking - SDN Control Plane)
แยก Routing Logic ออกจากตัวเร้าเตอร์ แล้วนำไปไว้ที่ **Remote SDN Controller (เซิร์ฟเวอร์ควบคุมศูนย์กลาง)** ซึ่งเป็นผู้คำนวณเส้นทางทั้งหมด จากนั้นจึงส่ง Flow Table / Forwarding Table มาติดตั้งยังเร้าเตอร์ผ่าน Southbound API (เช่น OpenFlow)

```mermaid
flowchart TD
    subgraph Controller ["Remote SDN Controller (Control Plane)"]
        RoutingApp["Routing / Policy Application"]
    end

    subgraph CA1 ["CA Agent (Router 1)"]
        DP1["Data Plane Switching (CA Agent + Table)"]
    end
    subgraph CA2 ["CA Agent (Router 2)"]
        DP2["Data Plane Switching (CA Agent + Table)"]
    end

    Controller ==>|"ติดตั้ง Flow Table (OpenFlow)"| CA1
    Controller ==>|"ติดตั้ง Flow Table (OpenFlow)"| CA2
```

---

## 1.4 แบบจำลองการให้บริการของเครือข่าย (Network Service Models & Best-Effort Service)

สถาปัตยกรรมเครือข่ายแต่ละแบบอาจมีรูปแบบการรับประกันคุณภาพบริการ (Quality of Service - QoS) ที่แตกต่างกัน:

### คุณสมบัติการรับประกันที่เป็นไปได้ของ Network Service Model:
1. **Guaranteed Delivery:** รับประกันว่าแพ็กเก็ตทุกตัวจะถึงปลายทางแน่นอน
2. **Guaranteed Delivery with Bounded Delay:** รับประกันว่าจะถึงปลายทางภายในระยะเวลาที่กำหนด (เช่น ไม่เกิน 40 ms)
3. **In-Order Packet Delivery:** รับประกันลำดับของแพ็กเก็ตตรงตามที่ส่ง
4. **Guaranteed Minimal Bandwidth:** รับประกันแบนด์วิดท์ขั้นต่ำในการส่ง
5. **Security Services:** มีการเข้ารหัสข้อมูลที่ระดับ Network Layer

```mermaid
classDiagram
    class NetworkServiceModels {
        <<Service Architectures>>
    }
    class Internet_IP {
        +Model: Best-Effort
        +Bandwidth: None (Variable)
        +Loss: No Guarantee
        +Order: No Guarantee
        +Timing: No Guarantee
        +Congestion Feedback: ECN (Optional)
    }
    class ATM_CBR {
        +Model: Constant Bit Rate
        +Bandwidth: Constant Rate Guaranteed
        +Loss: Guaranteed No Loss
        +Order: In-Order Delivery
        +Timing: Strictly Maintained
        +Congestion: No Congestion
    }
    class ATM_ABR {
        +Model: Available Bit Rate
        +Bandwidth: Minimum Guaranteed
        +Loss: No Guarantee
        +Order: In-Order Delivery
        +Timing: No Guarantee
        +Congestion: Congestion Feedback
    }
    NetworkServiceModels <|-- Internet_IP
    NetworkServiceModels <|-- ATM_CBR
    NetworkServiceModels <|-- ATM_ABR
```

> [!IMPORTANT]
> **ปรัชญา Best-Effort Service ของ Internet IP:**
> อินเทอร์เน็ตเลือกใช้รูปแบบ **"Best-Effort" (พยายามส่งให้ดีที่สุดโดยไม่มีการรับประกันใดๆ)**
> - **ทำไม Best-Effort ถึงประสบความสำเร็จอย่างล้นหลาม?**
>   1. **Simplicity:** แกนกลางเครือข่าย (Core) ทำงานเรียบง่าย ไม่ต้องจดจำ State หรือจัดสรรทรัพยากรล่วงหน้า ทำให้เราเตอร์ทำงานได้เร็วมากและรองรับการขยายตัว (Scalability) ได้ระดับโลก
>   2. **Flexibility:** เชื่อมต่อกับเทคโนโลยี Link Layer หลากหลายประเภทได้ง่ายดาย
>   3. **End-to-End Control:** ผลักภาระความน่าเชื่อถือ (Reliability), การควบคุมความแออัด (Congestion Control) และการกู้คืนข้อมูลสูญหายไปไว้ที่โฮสต์ปลายทาง (Transport Layer เช่น TCP)

---

# 2. โครงสร้างภายในและกลไกการทำงานของเร้าเตอร์ (What's Inside a Router) (Slides 14–40)

## 2.1 สถาปัตยกรรมเร้าเตอร์ระดับฮาร์ดแวร์ (Router Architecture Overview)

โครงสร้างภายในของเร้าเตอร์ประกอบด้วย 4 องค์ประกอบหลักที่ประสานการทำงานร่วมกันระหว่าง Data Plane (ระดับนาโนวินาที) และ Control Plane (ระดับมิลลิวินาที):

```mermaid
flowchart TD
    subgraph ControlPlane ["Control Plane (ซอฟต์แวร์ / CPU - Milliseconds)"]
        RoutingProcessor["Routing Processor (Management & Routing Protocols OSPF/BGP/SDN)"]
    end

    subgraph DataPlane ["Data Plane (ฮาร์ดแวร์ความเร็วสูง - Nanoseconds)"]
        direction LR
        subgraph InPorts ["พอร์ตขาเข้า (Input Ports)"]
            IP1["Input Port 1"]
            IP2["Input Port 2"]
        end
        
        subgraph SwitchFabric ["สวิตชิ่งแฟบริก (Switching Fabric)"]
            SF["High-Speed Interconnection Fabric"]
        end
        
        subgraph OutPorts ["พอร์ตขาออก (Output Ports)"]
            OP1["Output Port 1"]
            OP2["Output Port 2"]
        end
        
        IP1 --> SF
        IP2 --> SF
        SF --> OP1
        SF --> OP2
    end

    RoutingProcessor <== "กำหนด Forwarding Table" ==> InPorts
    RoutingProcessor <== "ตรวจสอบสถานะและควบคุม" ==> OutPorts
```

1. **Routing Processor (CPU):** ประมวลผลโปรโตคอลเลือกเส้นทาง (Control Plane), จัดการสถานะและเชื่อมต่อกับ SDN Controller, คำนวณ Forwarding Table แล้วโหลดสำเนาลงสู่พอร์ตขาเข้า
2. **Input Ports:** รับสัญญาณระดับกายภาพ, ถอดรหัส Link Layer, ค้นหา Forwarding Table และส่งต่อแพ็กเก็ตเข้าสู่ Switching Fabric
3. **Switching Fabric:** เครือข่ายการเชื่อมต่อความเร็วสูง ทำหน้าที่ย้ายแพ็กเก็ตจาก Input Port ไปยัง Output Port เป้าหมาย
4. **Output Ports:** รับแพ็กเก็ตจาก Switching Fabric, จัดการคิวและบัฟเฟอร์ (Queuing & Buffer Management), จัดลำดับการส่ง (Packet Scheduling) และส่งข้อมูลออกสู่ลิงก์

---

## 2.2 พอร์ตรับข้อมูล (Input Port Processing) และการส่งต่อแบบกระจายศูนย์

โครงสร้างภายในของ Input Port แต่ละพอร์ตประกอบด้วย 3 ส่วนย่อยที่ทำงานเรียงลำดับ:

```mermaid
flowchart LR
    LineIn["Physical Line"] --> LineTerm["1. Line Termination<br/>(Physical Layer - Bit Level)"]
    LineTerm --> LinkProc["2. Link Layer Processing<br/>(Data Link - Ethernet Decap, CRC)"]
    LinkProc --> LookupQueue["3. Lookup, Forwarding & Queuing<br/>(Decentralized Switching via TCAM)"]
    LookupQueue --> SwitchFab["Switching Fabric"]
```

> [!DEFINITION]
> **Decentralized Switching (การส่งต่อแบบกระจายศูนย์):**
> เร้าเตอร์สมัยใหม่จะคัดลอก Forwarding Table จาก Routing Processor ไปเก็บไว้ในหน่วยความจำความเร็วสูงของ **Input Port ทุกพอร์ต** ทำให้การค้นหาเส้นทางและการตัดสินใจส่งต่อเกิดขึ้นได้พร้อมๆ กันในระดับฮาร์ดแวร์ (Hardware-Speed Lookup) โดยไม่ต้องส่งสัญญาณรบกวน Central CPU เลย

---

## 2.3 การจับคู่คำนำหน้าที่ยาวที่สุด (Longest Prefix Matching - LPM) และชิป TCAM

ในการส่งต่อแพ็กเก็ตตาม IP ปลายทาง (Destination-Based Forwarding) เร้าเตอร์ไม่สามารถเก็บรายการ IP Address ทั้งหมด $2^{32}$ บิตลงในตารางได้ จึงต้องใช้ **Address Prefixes (ช่วงคำนำหน้า IP)**

### กฎ Longest Prefix Matching (LPM):
เมื่อค้นหาเส้นทางสำหรับ Destination IP แอดเดรสใดๆ เร้าเตอร์จะเลือกรายการในตารางที่มี **Prefix บิตตรงกับ IP ปลายทางยาวที่สุด (Longest Subnet Match)**

```
ตัวอย่าง Forwarding Table:
Prefix Match                     Output Port
-------------------------------- -----------
11001000 00010111 00010*** ********  -> Port 1 (200.23.16.0/21)
11001000 00010111 00011000 ********  -> Port 2 (200.23.24.0/24)
11001000 00010111 00011*** ********  -> Port 3 (200.23.24.0/21)
otherwise                            -> Port 4 (Default Gateway)
```

#### ตัวอย่างการทดสอบการจับคู่:
1. **ปลายทาง A:** `11001000 00010111 00010110 10100001` (200.23.22.161)
   - ตรงกับ Prefix 1 (21 บิตแรกตรงกัน) $\rightarrow$ ส่งออก **Port 1**
2. **ปลายทาง B:** `11001000 00010111 00011000 10101010` (200.23.24.170)
   - ตรงกับ Prefix 2 (24 บิตตรง) และ Prefix 3 (21 บิตตรง)
   - ตามกฎ LPM เลือกรายการที่ยาวที่สุด (24 บิต) $\rightarrow$ ส่งออก **Port 2**

```mermaid
flowchart TD
    DestIP["IP ปลายทาง (32 บิต)"] --> Match{"เทียบกับ Forwarding Table"}
    Match -->|"ตรง 21 บิต (Prefix 3)"| Cand1["Port 3"]
    Match -->|"ตรง 24 บิต (Prefix 2)"| Cand2["Port 2"]
    Cand1 & Cand2 --> Resolve["กฎ Longest Prefix Match (LPM)<br/>เลือก Prefix ที่ตรงมากที่สุด (24 บิต > 21 บิต)"]
    Resolve ==> Selected["ส่งออก Port 2"]
```

> [!INFO]
> **Ternary Content Addressable Memory (TCAM):**
> เร้าเตอร์ระดับองค์กรและ ISP ใช้ชิปฮาร์ดแวร์พิเศษเรียกว่า **TCAM** ซึ่งสามารถค้นหาข้อมูลและเปรียบเทียบบิตพร้อมกันทุกรายการในหน่วยความจำได้ภายใน **1 รอบสัญญาณนาฬิกา (Single Clock Cycle / ~1 นาโนวินาที)** โดยไม่ขึ้นกับขนาดของตาราง Forwarding Table

---

## 2.4 สวิตชิ่งแฟบริก 3 รูปแบบหลัก (Switching Fabrics: Memory, Bus, Interconnection Network)

หน้าที่ของ Switching Fabric คือการส่งผ่านแพ็กเก็ตจากพอร์ตขาเข้าไปยังพอร์ตขาออกด้วยความเร็วสูงสุด โดยมีวิวัฒนาการ 3 รูปแบบหลัก:

```mermaid
flowchart TD
    subgraph Type1 ["1. Switching via Memory (รุ่นแรก)"]
        In1["Input Port"] --> MemBus1["System Bus"] --> CPU_Mem["Main Memory (CPU Controlled)"]
        CPU_Mem --> MemBus2["System Bus"] --> Out1["Output Port"]
    end

    subgraph Type2 ["2. Switching via Bus (รุ่นที่สอง)"]
        In2["Input Port"] --> SharedBus["Shared Bus (ครั้งละ 1 แพ็กเก็ต)"] --> Out2["Output Port"]
    end

    subgraph Type3 ["3. Interconnection Network / Crossbar (รุ่นปัจจุบัน)"]
        In3A["In 1"] & In3B["In 2"] --> Crossbar["Crossbar Matrix Switch / Multi-Stage Fabric<br/>(ส่งข้อมูลคู่ขนานได้พร้อมกัน)"]
        Crossbar --> Out3A["Out 1"] & Out3B["Out 2"]
    end
```

| คุณสมบัติ | Memory Switching | Bus Switching | Interconnection Network (Crossbar) |
| :--- | :--- | :--- | :--- |
| **สถาปัตยกรรม** | คัดลอกผ่าน System Bus เข้า Memory | แพ็กเก็ตวิ่งผ่าน Shared Bus โดยตรง | เมทริกซ์เชื่อมต่อแบบ Crossbar หลายระนาบ |
| **ขีดจำกัดความเร็ว** | ถูกจำกัดโดย Bandwidth ของ Memory (ช้าสุด) | ถูกจำกัดโดยความเร็วของ Bus รวม | รองรับความเร็วสูงระดับ Terabits/sec |
| **การทำงานคู่ขนาน** | ไม่สามารถทำได้ | ทำไม่ได้ (ส่งได้ทีละ 1 แพ็กเก็ตต่อเวลา) | **ทำได้พร้อมกัน (Parallel Switching)** หากไม่ชนพอร์ตปลายทางเดียวกัน |

---

## 2.5 ปัญหาการเข้าคิวและ Head-of-Line (HOL) Blocking ที่พอร์ตขาเข้า

หาก Switching Fabric มีความเร็วไม่เพียงพอ (เช่น ช้ากว่าผลรวมความเร็วของ Input Links) หรือเกิดการแย่งพอร์ตขาออกเดียวกัน แพ็กเก็ตจะต้องรอในคิวของ Input Port

> [!WARNING]
> **Head-of-Line (HOL) Blocking:**
> ปัญหาที่แพ็กเก็ตตัวแรกที่หัวแถว (Head of Line) กำลังรอคิวเพื่อเข้าสู่ Output Port ที่กำลังติดสาย (Busy) ส่งผลให้แพ็กเก็ตตัวถัดๆ ไปในคิวเดียวกัน **ถูกบล็อกไม่ให้เดินทางต่อ** แม้ว่า Output Port ปลายทางของแพ็กเก็ตตัวหลังจะว่างอยู่ก็ตาม

```mermaid
sequenceDiagram
    participant In1 as Input Port 1
    participant In2 as Input Port 2
    participant Fabric as Switching Fabric
    participant Out1 as Output Port 1 (Red)
    participant Out2 as Output Port 2 (Green)

    Note over In1: คิว: [Red Packet 1] -> [Green Packet 1]
    Note over In2: คิว: [Red Packet 2]

    In1->>Fabric: ส่ง Red Packet 1 ไป Out 1
    In2->>Fabric: ขอส่ง Red Packet 2 ไป Out 1 (เกิด Contention!)
    Note over In2: Red Packet 2 ต้องรอคิว Out 1 ว่าง
    Note over In1: Green Packet 1 ติดแหง็กอยู่หลัง Red 1 (HOL Blocking!) ทั้งที่ Out 2 ว่างอยู่
```

---

## 2.6 พอร์ตส่งข้อมูลออก (Output Port Processing) และการเกิดคิวสะสม

โครงสร้างภายในของ Output Port ประกอบด้วยส่วนย่อย:

```mermaid
flowchart LR
    SwitchFab["Switching Fabric"] --> QueuingBuff["1. Queuing & Buffer Management<br/>(Drop Policies & Sizing)"]
    QueuingBuff --> SchedEngine["2. Packet Scheduler<br/>(FCFS, Priority, RR, WFQ)"]
    SchedEngine --> LinkEnc["3. Data Link & Line Term<br/>(MAC Frame Encapsulation & Transmit)"]
    LinkEnc --> OutLine["Physical Link Out"]
```

เมื่ออัตราการเดินทางมาถึงของแพ็กเก็ตจาก Fabric สูงกว่าอัตราความเร็วของลิงก์ส่งออก (Link Transmission Rate) แพ็กเก็ตจะต้องเข้าคิวในบัฟเฟอร์ขาออก หากบัฟเฟอร์เต็ม จะเกิด **Packet Loss (แพ็กเก็ตตกหล่น)**

---

## 2.7 การคำนวณขนาดบัฟเฟอร์ที่เหมาะสม (Buffer Sizing)

### 1. กฎดั้งเดิมของเร้าเตอร์ (Rule-of-Thumb / RFC 3439):
ขนาดบัฟเฟอร์รวม $B$ ควรมีขนาดเท่ากับผลคูณของค่าเฉลี่ย Round-Trip Time ($\text{RTT}$) กับความจุของลิงก์ ($C$):
$$B = \text{RTT} \cdot C$$

- **ตัวอย่างการคำนวณ:** ลิงก์ $C = 10\text{ Gbps}$, ค่าเฉลี่ย $\text{RTT} = 250\text{ ms} = 0.25\text{ s}$
  $$B = 0.25\text{ s} \times 10\text{ Gbps} = 2.5\text{ Gbits} = 312.5\text{ MBytes}$$

### 2. กฎการปรับขนาดบัฟเฟอร์เมื่อมีหลาย TCP Flows ($N$ Flows):
จากการวิจัยพบว่า เมื่อมีโฟลว์ของ TCP อิสระจำนวนมาก ($N$) ที่ไม่ได้ Synchronize กัน ขนาดบัฟเฟอร์ที่เหมาะสมจะลดลงตามสมการ:
$$B = \frac{\text{RTT} \cdot C}{\sqrt{N}}$$

> [!TIP]
> การลดขนาดบัฟเฟอร์ตาม $\sqrt{N}$ ช่วยลดความหน่วงสะสมในเครือข่าย (**Bufferbloat**) และลดต้นทุนชิปหน่วยความจำของเร้าเตอร์ได้อย่างมหาศาล

---

## 2.8 การจัดการบัฟเฟอร์ (Buffer Management: Drop Policies)

เมื่อบัฟเฟอร์ของ Output Port กำลังจะเต็ม เร้าเตอร์ต้องมีนโยบายในการจัดการข้อมูล:

1. **Tail Drop:** นโยบายพื้นฐานที่สุด หากบัฟเฟอร์เต็ม แพ็กเก็ตใหม่ที่เพิ่งมาถึงจะถูกทิ้งทันที
2. **Priority Drop:** ทิ้งแพ็กเก็ตที่มีระดับความสำคัญต่ำก่อน (Drop based on priority classification)
3. **Active Queue Management (AQM) / Random Early Detection (RED):**
   - คำนวณความยาวคิวเฉลี่ยอย่างต่อเนื่อง
   - สุ่มทิ้งหรือทำเครื่องหมาย (Mark ECN bit) บนแพ็กเก็ตล่วงหน้าด้วยความน่าจะเป็น ก่อนที่บัฟเฟอร์จะเต็มจริง เพื่อส่งสัญญาณเตือนให้โฮสต์ต้นทางลดความเร็วในการส่งข้อมูลลง ป้องกันการเกิด Global TCP Synchronization

---

## 2.9 นโยบายการจัดลำดับการส่งแพ็กเก็ต (Packet Scheduling Policies)

Packet Scheduler ทำหน้าที่ตัดสินใจว่าจะเลือกแพ็กเก็ตใดในบัฟเฟอร์ส่งออกสู่ลิงก์เป็นลำดับถัดไป:

```mermaid
flowchart TD
    subgraph FCFS_Box ["1. First-Come First-Served (FCFS)"]
        F1["Packet 1"] --> F2["Packet 2"] --> F3["Packet 3"] --> TransmitF["ส่งตามลำดับเวลาที่มาถึงเป๊ะๆ"]
    end

    subgraph Priority_Box ["2. Priority Scheduling (Strict Priority)"]
        HighQ["High Priority Queue (VoIP/Gaming)"] --> SchedP{"ส่ง High Q ให้หมดก่อน"}
        LowQ["Low Priority Queue (Best-effort Email)"] --> SchedP
        SchedP --> TransmitP["Link Out (High Priority Preempts)"]
    end

    subgraph RR_WFQ_Box ["3. Round Robin & Weighted Fair Queueing (WFQ)"]
        Class1["Class 1 (Weight w1)"] --> FairSched{"Round Robin / WFQ Scheduler"}
        Class2["Class 2 (Weight w2)"] --> FairSched
        FairSched --> TransmitW["จัดสรร Bandwidth ตามสัดส่วนน้ำหนัก w_i / Sum(w)"]
    end
```

### การเปรียบเทียบนโยบาย Scheduling:
1. **FCFS (First-Come, First-Served):** ส่งแพ็กเก็ตตามลำดับเวลาที่มาถึง ง่ายที่สุด ไม่มีการจัดลำดับความสำคัญ
2. **Strict Priority:** แยกเป็นคิวหลายระดับความสำคัญ (เช่น High Priority สำหรับ Voice/Video, Low Priority สำหรับ Data) ตราบใดที่มีแพ็กเก็ตใน High Queue จะถูกส่งก่อนเสมอ
3. **Round Robin (RR):** วนรอบหยิบแพ็กเก็ตจากคิวแต่ละคลาสสลับกัน $1 \rightarrow 2 \rightarrow 3 \rightarrow 1$ ป้องกันไม่ให้คิวระดับต่ำเกิด Starvation
4. **Weighted Fair Queueing (WFQ):** รุ่นพัฒนาของ Round Robin โดยกำหนดค่าน้ำหนัก $w_i$ ให้แต่ละคลาส การันตีว่าคลาส $i$ จะได้รับแบนด์วิดท์ขั้นต่ำเท่ากับ:
$$\text{Bandwidth Share}_i = \frac{w_i}{\sum_{j} w_j} \cdot C$$

---

## 2.10 ประเด็นความเป็นกลางทางเครือข่าย (Network Neutrality & FCC Regulations)

- **Network Neutrality (Net Neutrality):** หลักการที่กำหนดให้ผู้ให้บริการอินเทอร์เน็ต (ISPs) ต้องปฏิบัติต่อแพ็กเก็ตและข้อมูลทุกประเภทอย่างเท่าเทียมกัน ไม่เลือกปฏิบัติ ไม่บล็อก ไม่หน่วงเวลา (Throttling) หรือคิดเงินเพิ่มเพื่อให้ได้ช่องทางพิเศษ (Paid Fast Lanes)
- **การจัดประเภทของ FCC (สหรัฐอเมริกา):**
  - **Title II (Telecommunications Service):** ถูกควบคุมเหมือนบริการสาธารณูปโภคพื้นฐาน ห้ามเลือกปฏิบัติตามหลัก Net Neutrality
  - **Title I (Information Service):** ควบคุมอย่างผ่อนปรน อนุญาตให้ ISP ทำการค้าและจัดสรรแพ็กเกจช่องทางพิเศษได้

---

# 3. อินเทอร์เน็ตโปรโตคอล IPv4, การกำหนดแอดเดรส และ DHCP (Slides 41–63)

## 3.1 สถาปัตยกรรม Internet Network Layer

สถาปัตยกรรม Network Layer ของอินเทอร์เน็ตประกอบด้วย 3 ส่วนหลักที่ประสานกัน:

```mermaid
flowchart TD
    subgraph HostTransport ["Transport Layer (TCP / UDP)"]
        TransMsg["Transport Segments"]
    end

    subgraph NetLayer ["Network Layer"]
        RoutingProto["Routing Protocols (OSPF, BGP)<br/>คำนวณเส้นทาง"]
        IPProto["IP Protocol (IPv4/IPv6)<br/>- Addressing Conventions<br/>- Datagram Format<br/>- Packet Handling"]
        ICMPProto["ICMP Protocol<br/>- Error Reporting<br/>- Signaling (Ping, Traceroute)"]
    end

    subgraph LinkLayer ["Link Layer"]
        LinkFrames["Link-Layer Frames (Ethernet, Wi-Fi)"]
    end

    TransMsg --> IPProto
    RoutingProto --> IPProto
    ICMPProto <--> IPProto
    IPProto --> LinkFrames
```

---

## 3.2 โครงสร้าง IPv4 Datagram Header

IPv4 Datagram Header มีขนาดพื้นฐาน **20 ไบต์ (เมื่อไม่มี Options)** โดยมีโครงสร้างระดับบิตดังนี้:

```bitfield
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|     Fragment Offset     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |        Header Checksum        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source IP Address                       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination IP Address                     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (0 to 40 bytes)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             Data                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### คำอธิบายฟิลด์อย่างละเอียด:
1. **Version (4 บิต):** หมายเลขเวอร์ชันของ IP (สำหรับ IPv4 คือ `0100` = 4)
2. **IHL - Internet Header Length (4 บิต):** ความยาวของ Header ในหน่วยของคำ 32 บิต (4 ไบต์) ค่าปกติคือ `5` ($5 \times 4 = 20\text{ ไบต์}$)
3. **Type of Service / DiffServ & ECN (8 บิต):** บ่งบอกระดับความสำคัญของแพ็กเก็ต (QoS) และแจ้งเตือนความแออัดแบบ Explicit Congestion Notification
4. **Total Length (16 บิต):** ความยาวรวมทั้งหมดของ Datagram (Header + Data) ในหน่วยไบต์ ขนาดสูงสุดตามทฤษฎีคือ $2^{16}-1 = 65,535\text{ ไบต์}$
5. **Identification (16 บิต), Flags (3 บิต), Fragment Offset (13 บิต):** ใช้สำหรับกระบวนการ **IP Fragmentation and Reassembly**
6. **Time to Live - TTL (8 บิต):** จำนวน Hop สูงสุดที่แพ็กเก็ตสามารถเดินทางผ่านเร้าเตอร์ได้ โดยเร้าเตอร์แต่ละตัวจะลดค่า TTL ลง 1 หากเหลือ 0 แพ็กเก็ตจะถูกทิ้งและแจ้ง ICMP Time Exceeded กลับ เพื่อป้องกันแพ็กเก็ตวิ่งวนใน Loop ตลอดกาล
7. **Protocol (8 บิต):** ระบุโปรโตคอลชั้นบนที่บรรจุอยู่ใน Data field (`6` = TCP, `17` = UDP, `1` = ICMP)
8. **Header Checksum (16 บิต):** ค่าตรวจสอบความถูกต้องของเฉพาะส่วน Header เพื่อตรวจจับข้อผิดพลาดในการประมวลผลบิต
9. **Source IP Address (32 บิต):** ที่อยู่ IP ของเครื่องต้นทาง
10. **Destination IP Address (32 บิต):** ที่อยู่ IP ของเครื่องปลายทาง

---

## 3.3 การกำหนดหมายเลข IP, อินเทอร์เฟซ และนิยามของซับเน็ต (Subnets)

- **IP Address:** ตัวระบุหมายเลขขนาด 32 บิต (สำหรับ IPv4) ที่ผูกอยู่กับ **อินเทอร์เฟซของอุปกรณ์ (Network Interface)** ไม่ได้ผูกกับตัวเครื่องโดยตรง (โฮสต์ทั่วไปมักมี 1-2 อินเทอร์เฟซ ขณะที่เร้าเตอร์มีหลายอินเทอร์เฟซ)
- **Subnet (เครือข่ายย่อย):** กลุ่มของอินเทอร์เฟซของอุปกรณ์ที่สามารถสื่อสารหากันได้โดยตรงในระดับกายภาพ (ผ่าน Switch หรือ Hub) **โดยไม่ต้องผ่านเร้าเตอร์คั่นกลาง**

```mermaid
flowchart TD
    subgraph Subnet1 ["Subnet 1: 223.1.1.0/24"]
        H1["Host 223.1.1.1"] --- SW1["Switch"]
        H2["Host 223.1.1.2"] --- SW1
        H3["Host 223.1.1.3"] --- SW1
        SW1 --- R_IF1["Router Interface 223.1.1.4"]
    end

    subgraph Subnet2 ["Subnet 2: 223.1.2.0/24"]
        H4["Host 223.1.2.1"] --- SW2["Switch"]
        H5["Host 223.1.2.2"] --- SW2
        SW2 --- R_IF2["Router Interface 223.1.2.9"]
    end

    subgraph PointToPoint ["Point-to-Point Subnet: 223.1.3.0/24"]
        R_IF3["Router 1 IF 223.1.3.1"] <== "Serial Link" ==> R_IF4["Router 2 IF 223.1.3.2"]
    end
```

> [!TIP]
> **วิธีระบุ Subnet ในแผนภาพเครือข่าย (Recipe for defining subnets):**
> ตัดการเชื่อมต่อที่เข้าสู่เร้าเตอร์ทุกตัวออก แต่ละเกาะของระบบเครือข่ายที่แยกขาดออกจากกันอย่างอิสระคือ **1 Subnet**

---

## 3.4 การกำหนดแอดเดรสแบบไร้คลาส (CIDR: Classless Inter-Domain Routing)

ในอดีตอินเทอร์เน็ตใช้ระบบ Classful Addressing (Class A, B, C) ซึ่งทำให้สิ้นเปลือง IP Address อย่างมาก ปัจจุบันจึงใช้ **CIDR (RFC 4632)** ซึ่งกำหนดช่วง IP ด้วยรูปแบบ:
$$\text{a.b.c.d / x}$$
โดยที่:
- **$x$ (Prefix Length):** จำนวนบิตแรกที่เป็น **Subnet Portion (Network ID)**
- **$32 - x$:** จำนวนบิตที่เหลือสำหรับ **Host Portion**
- **จำนวน Host ที่ใช้งานได้จริง:** $2^{32-x} - 2$ (หัก Network Address และ Broadcast Address)

```
ตัวอย่าง: 200.23.16.0 / 23
Subnet Mask: 255.255.254.0 (23 บิตแรกเป็น 1)
Host Bits: 32 - 23 = 9 บิต
จำนวน IP ทั้งหมด: 2^9 = 512 IPs
จำนวน Usable Host IPs: 512 - 2 = 510 Hosts (200.23.16.1 ถึง 200.23.17.254)
```

---

## 3.5 โปรโตคอลกำหนดค่า IP อัตโนมัติ (DHCP: Dynamic Host Configuration Protocol - DORA Exchange)

DHCP เป็นโปรโตคอลใน Application Layer (ทำงานบน UDP พอร์ต 67 สำหรับ Server และพอร์ต 68 สำหรับ Client) ทำหน้าที่จ่าย IP Address, Subnet Mask, Default Gateway และ DNS Server ให้กับอุปกรณ์แบบ Plug-and-Play ผ่านกระบวนการ **D-O-R-A 4 ขั้นตอน**:

```mermaid
sequenceDiagram
    autonumber
    participant Client as DHCP Client (เครื่องเปิดใหม่)
    participant Server as DHCP Server (เราเตอร์/เซิร์ฟเวอร์)

    Note over Client: 1. ยังไม่มี IP Address<br/>Src: 0.0.0.0:68, Dst: 255.255.255.255:67
    Client->>Server: DHCP DISCOVER (Broadcast)<br/>yiaddr: 0.0.0.0, Transaction ID: 654
    
    Note over Server: 2. เตรียม IP ว่างในสระ (Pool)<br/>Src: 192.168.1.1:67, Dst: 255.255.255.255:68
    Server-->>Client: DHCP OFFER (Broadcast)<br/>yiaddr: 192.168.1.100, Lifetime: 3600s
    
    Note over Client: 3. เลือกร่างข้อเสนอและยืนยัน<br/>Src: 0.0.0.0:68, Dst: 255.255.255.255:67
    Client->>Server: DHCP REQUEST (Broadcast)<br/>yiaddr: 192.168.1.100, Server ID: 192.168.1.1
    
    Note over Server: 4. บันทึกการเช่า (Lease) ลงฐานข้อมูล<br/>Src: 192.168.1.1:67, Dst: 255.255.255.255:68
    Server-->>Client: DHCP ACK (Broadcast)<br/>yiaddr: 192.168.1.100 + Mask + Gateway + DNS
```

> [!INFO]
> **ทำไม DHCP REQUEST ถึงยังต้องส่งแบบ Broadcast (255.255.255.255)?**
> เพื่อแจ้งเตือนให้ **DHCP Server ตัวอื่นๆ** ในเครือข่ายรับรู้ว่า Client ได้เลือกรับข้อเสนอของ Server ตัวใด เพื่อให้ Server ตัวอื่นสามารถดึง IP ที่เคยเสนอไว้กลับคืนสู่ Pool ได้

---

## 3.6 การจัดสรรช่วง IP แบบลำดับชั้นและการรวมเส้นทาง (Hierarchical Addressing & Route Aggregation)

การจัดสรร IP แบบลำดับชั้นช่วยให้ ISP สามารถประกาศกลุ่มของซับเน็ตย่อยหลายๆ วงออกไปสู่โลกอินเทอร์เน็ตภายนอกได้ด้วย **เส้นทางสรุปเพียงเส้นทางเดียว (Single Aggregated Route)** เรียกว่า **Route Aggregation หรือ Route Summarization**

```mermaid
flowchart LR
    subgraph ISP1 ["Fly-By-Night ISP"]
        Org0["Org 0: 200.23.16.0/24"]
        Org1["Org 1: 200.23.18.0/24"]
        Org7["Org 7: 200.23.30.0/24"]
        Org0 & Org1 & Org7 --> ISPRouter["ISP Router"]
    end

    ISPRouter ==>|"ประกาศเส้นทางรวม (Route Aggregation):<br/>'ส่ง 200.23.16.0/20 มาที่ฉันได้เลย!'"| Internet["Internet Backbone Routers"]
```

### การจัดการกรณีพิเศษ (More Specific Routes):
หากองค์กรหนึ่ง (เช่น Org 1: `200.23.18.0/24`) ย้ายไปใช้บริการกับ ISP อื่น (เช่น ISPs-R-Us) เร้าเตอร์ใน Backbone จะใช้กฎ **Longest Prefix Match** โดยอัตโนมัติ:
- แพ็กเก็ตสำหรับ `200.23.18.10` จะตรงกับ `/24` ของ ISPs-R-Us มากกว่า `/20` ของ ISP เดิม จึงถูกส่งไปยังผู้ให้บริการใหม่ได้อย่างถูกต้องโดยไม่ต้องรื้อระบบ IP ทั้งหมด

---

# 4. การแปลงที่อยู่เครือข่าย (Network Address Translation - NAT) (Slides 64–68)

## 4.1 แรงจูงใจและช่วงแอดเดรสส่วนตัว (Private Address Space RFC 1918)

เพื่อแก้ปัญหาการขาดแคลนหมายเลข IPv4 เร้าเตอร์ตามบ้านและองค์กรจึงใช้เทคโนโลยี **NAT (RFC 3022)** ร่วมกับช่วงแอดเดรสส่วนตัว (Private IP):
- `10.0.0.0/8` (10.0.0.0 - 10.255.255.255)
- `172.16.0.0/12` (172.16.0.0 - 172.31.255.255)
- `192.168.0.0/16` (192.168.0.0 - 192.168.255.255)

### ข้อดีของเครือข่าย NAT:
1. เครือข่าย LAN ภายในใช้อินเทอร์เน็ตภายนอกได้โดยใช้ **Public IP Address เพียงหมายเลขเดียว**
2. สามารถเปลี่ยนผู้ให้บริการ ISP หรือเปลี่ยนช่วง IP ภายในบ้านได้โดยไม่ต้องตั้งค่าอุปกรณ์ภายนอกใหม่
3. อุปกรณ์ภายในไม่สามารถถูกเข้าถึงโดยตรงจากภายนอก เป็นการเพิ่มความปลอดภัยพื้นฐาน

---

## 4.2 กลไกการทำงานของ NAT/NAPT และตารางการแปลงพอร์ต (Translation Table)

NAT แปลงทั้งหมายเลข IP และหมายเลขพอร์ตระดับ Transport Layer (Network Address Port Translation - NAPT):

```mermaid
sequenceDiagram
    autonumber
    participant Host as Host ภายใน (10.0.0.1)
    participant NAT as NAT Router (WAN: 138.76.29.7)
    participant Web as Web Server (128.119.40.186:80)

    Note over Host: สร้าง Datagram<br/>Src: 10.0.0.1, Port: 3345<br/>Dst: 128.119.40.186, Port: 80
    Host->>NAT: ส่ง Datagram ขาออก
    
    Note over NAT: 1. แปลง Src IP เป็น WAN IP (138.76.29.7)<br/>2. กำหนดพอร์ตใหม่: 5001<br/>3. บันทึกลง NAT Translation Table
    NAT->>Web: ส่ง Datagram ออกสู่ Internet<br/>Src: 138.76.29.7, Port: 5001<br/>Dst: 128.119.40.186, Port: 80
    
    Web-->>NAT: ตอบกลับ Datagram<br/>Src: 128.119.40.186, Port: 80<br/>Dst: 138.76.29.7, Port: 5001
    
    Note over NAT: เปิดดู NAT Table:<br/>Port 5001 -> Map กลับเป็น 10.0.0.1:3345
    NAT-->>Host: ส่งมอบ Datagram สู่เครื่องภายใน<br/>Src: 128.119.40.186, Port: 80<br/>Dst: 10.0.0.1, Port: 3345
```

### โครงสร้าง NAT Translation Table:
| WAN Side (Public IP & Port) | LAN Side (Private IP & Port) |
| :--- | :--- |
| `138.76.29.7, 5001` | `10.0.0.1, 3345` |
| `138.76.29.7, 5002` | `10.0.0.2, 3345` |

---

## 4.3 ข้อถกเถียงและข้อจำกัดทางสถาปัตยกรรมของ NAT (NAT Controversy)

แม้ว่า NAT จะช่วยประหยัด IP Address และชะลอวิกฤต IPv4 ได้สำเร็จ แต่นักออกแบบสถาปัตยกรรมอินเทอร์เน็ตมองว่า NAT มีข้อเสียร้ายแรง:
1. **ละเมิดการแบ่งชั้นเลเยอร์ (Violation of Layering):** อุปกรณ์ใน Network Layer (L3) เข้าไปแก้ไขและอ่านค่า Port Numbers ใน Transport Layer (L4)
2. **ทำลายหลักการ End-to-End Argument:** โฮสต์ภายนอกไม่สามารถเปิดการเชื่อมต่อไปยังโฮสต์หลัง NAT ได้โดยตรง (ส่งผลกระทบต่อแอปพลิเคชัน P2P, VoIP, Online Gaming)
3. **ปัญหา NAT Traversal:** ต้องใช้วิธีการแก้ปัญหาที่ซับซ้อน เช่น STUN, TURN, UPnP หรือ Relay Servers เพื่อเจาะทะลุ NAT
4. **ความเห็นของกลุ่มผู้สนับสนุน IPv6:** มองว่าควรเปลี่ยนผ่านไปสู่ IPv6 ที่มี Address อย่างเหลือเฟือ แทนการใช้ NAT ต่อไป

---

# 5. สถาปัตยกรรม IPv6 และการเปลี่ยนผ่าน (Slides 69–76)

## 5.1 แรงจูงใจในการพัฒนา IPv6 (128-bit Address Space)

- **วิกฤต IPv4 หมดลง (Address Depletion):** พื้นที่ 32 บิต ($4.3 \times 10^9$ IPs) ไม่เพียงพอต่อการเติบโตของอุปกรณ์พกพาและ IoT
- **เพิ่มขนาดเป็น 128 บิต:** ให้พื้นที่หมายเลขแอดเดรสมากถึง $2^{128} \approx 3.4 \times 10^{38}$ IPs (เพียงพอที่จะกำหนดให้ทุกตารางมิลลิเมตรบนผิวโลก)
- **ปรับปรุงประสิทธิภาพ Header:** ออกแบบโครงสร้าง Header ให้มีขนาดคงที่และตัดฟิลด์ที่ไม่จำเป็นออก เพื่อให้เร้าเตอร์ประมวลผลได้เร็วที่สุด

---

## 5.2 โครงสร้าง Header แบบคงที่ 40 ไบต์ของ IPv6 (IPv6 Fixed Header)

```bitfield
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version| Traffic Class |           Flow Label                  |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Payload Length        |  Next Header  |   Hop Limit   |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                    Source IP Address                          +
|                       (128 bits)                              |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                                                               |
+                                                               +
|                                                               |
+                 Destination IP Address                        +
|                       (128 bits)                              |
+                                                               +
|                                                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### การเปลี่ยนแปลงสำคัญจาก IPv4:
1. **Fixed 40-byte Header:** ขนาด Header คงที่ 40 ไบต์เสมอ ตัดฟิลด์ `IHL` ทิ้ง
2. **ตัด Checksum ออก:** ไม่มี Header Checksum อีกต่อไป เพื่อลดภาระการคำนวณใหม่ที่เร้าเตอร์ทุก Hop (ปล่อยให้ Layer 2 CRC และ Layer 4 Checksum ตรวจสอบแทน)
3. **ตัด Fragmentation ที่เร้าเตอร์:** ห้ามเร้าเตอร์กลางทางทำ Fragmentation เด็ดขาด หากแพ็กเก็ตใหญ่เกินไป เร้าเตอร์จะส่งข้อความ ICMPv6 "Packet Too Big" กลับไปให้โฮสต์ต้นทางทำ **Path MTU Discovery** เพื่อลดขนาดลงเอง
4. **Next Header (8 บิต):** ทำหน้าที่ระบุโปรโตคอลชั้นบน (เหมือน Protocol field ใน IPv4) หรือระบุ Extension Headers ต่อขยาย
5. **Flow Label (20 บิต):** ใช้ระบุกลุ่มของแพ็กเก็ตที่อยู่ในโฟลว์เดียวกันเพื่อการจัดการ QoS พิเศษ

---

## 5.3 ยุทธศาสตร์การเปลี่ยนผ่านจาก IPv4 สู่ IPv6 (Dual Stack และ Tunneling)

อินเทอร์เน็ตไม่สามารถสั่งปิดระบบพร้อมกันทั่วโลกเพื่ออัปเกรดเป็น IPv6 ในวันเดียวได้ (No Flag Day) จึงต้องใช้เทคนิคการทำงานร่วมกัน:

### 1. Dual Stack:
ให้อุปกรณ์โฮสต์และเร้าเตอร์ติดตั้งทั้ง IPv4 และ IPv6 Stacks พร้อมกัน หากสื่อสารกับโฮสต์ที่เป็น IPv6 จะส่งผ่าน IPv6 หากคู่สนทนาเป็น IPv4 จะส่งผ่าน IPv4

### 2. IPv6-in-IPv4 Tunneling:
เมื่อแพ็กเก็ต IPv6 ต้องเดินทางข้ามโครงข่าย IPv4 เร้าเตอร์ต้นทางจะนำ Datagram ของ IPv6 ทั้งหมด **ห่อหุ้ม (Encapsulate) เข้าไปใน Payload ของ IPv4 Datagram ปกติ** แล้วส่งผ่านเร้าเตอร์ IPv4 เมื่อถึงปลายทาง อุโมงค์จะถอด IPv4 Header ออกแล้วส่งต่อ IPv6 ต่อไป

```mermaid
flowchart LR
    NodeA["IPv6 Source"] --> RouterB["IPv6 Router (Tunnel Entry)"]
    
    subgraph IPv4_Cloud ["โครงข่ายเร้าเตอร์ IPv4 ดั้งเดิม"]
        R_IPv4_1["IPv4 Router"] --> R_IPv4_2["IPv4 Router"]
    end
    
    RouterB ==>|"Encapsulate IPv6 in IPv4<br/>[IPv4 Hdr | IPv6 Datagram]"| R_IPv4_1
    R_IPv4_2 ==>|"Decapsulate<br/>ดึง IPv6 ออกมา"| RouterE["IPv6 Router (Tunnel Exit)"]
    RouterE --> NodeF["IPv6 Destination"]
```

---

## 5.4 สภาพการใช้งานจริงและการยอมรับ IPv6 ในระดับโลก

- **อัตราการเติบโต:** การใช้งาน IPv6 เติบโตอย่างต่อเนื่องโดยเฉพาะในกลุ่มผู้ให้บริการโทรศัพท์มือถือ (Mobile Networks) และเครือข่าย Content Delivery Networks (CDNs) เช่น Google, Meta, Cloudflare
- **ทำไมการเปลี่ยนผ่านถึงใช้เวลานาน?**
  1. เทคโนโลยี **NAT** ทำงานได้ดีเกินคาด ทำให้ยืดอายุการใช้งาน IPv4 ออกไปได้หลายสิบปี
  2. การอัปเกรดระบบเครือข่ายระดับองค์กรมีต้นทุนสูงและมีความเสี่ยงต่อระบบงานเดิม
  3. ปัญหา "ไก่กับไข่" (ผู้ให้บริการรอให้ผู้ใช้ขอใช้งาน ส่วนผู้ใช้รอให้ผู้ให้บริการรองรับ)

---

# 6. การส่งต่อแบบทั่วไปและสถาปัตยกรรม SDN (Generalized Forwarding & OpenFlow) (Slides 77–87)

## 6.1 แนวคิด Match-plus-Action เหนือการส่งต่อแบบเดิม

- **Traditional Forwarding (Destination-Based):** ตรวจสอบเฉพาะ Destination IP Address เพียงอย่างเดียว แล้วส่งออกพอร์ตเอาต์พุต
- **Generalized Forwarding (OpenFlow / SDN):** ใช้แนวคิด **"Match-plus-Action"** โดยสามารถตรวจสอบฟิลด์ของ Header ในหลายเลเยอร์พร้อมกัน (L2, L3, L4) แล้วสั่งการทำงานที่หลากหลาย:
  - **Match:** ตรวจสอบ MAC Address, VLAN ID, IP Address, Protocol, TCP/UDP Port
  - **Action:** ส่งต่อ (Forward), ทิ้งแพ็กเก็ต (Drop), แก้ไข Header (NAT), ทำสำเนาส่งออกหลายพอร์ต (Multicast), หรือส่งต่อไปยัง Controller

```mermaid
flowchart TD
    Packet["แพ็กเก็ตเข้าสู่ OpenFlow Switch"] --> MatchHeader{"ตรวจสอบ Header Fields<br/>(L2 MAC, L3 IP, L4 Port)"}
    
    MatchHeader -->|"ตรงกับ Rule 1"| Act1["Action: Forward out Port 3"]
    MatchHeader -->|"ตรงกับ Rule 2"| Act2["Action: Drop (Firewall)"]
    MatchHeader -->|"ตรงกับ Rule 3"| Act3["Action: Rewrite IP/Port (NAT) & Forward"]
    MatchHeader -->|"ไม่ตรงกับ Rule ใดๆ"| ActDef["Action: Send to SDN Controller (Table-Miss)"]
```

---

## 6.2 โครงสร้างตารางโฟลว์ (Flow Table Abstraction)

ในมาตรฐาน OpenFlow สวิตช์จะมี **Flow Table** ประกอบด้วยรายการ Flow Entries ซึ่งแต่ละรายการมี 3 องค์ประกอบหลัก:

1. **Header Fields (Match Pattern):** รูปแบบบิตที่ใช้เปรียบเทียบกับแพ็กเก็ตที่เข้ามา (รองรับ Wildcards `*`)
2. **Counters:** ตัวนับสถิติ (จำนวนแพ็กเก็ตที่ตรงกับกฎ, จำนวนไบต์, เวลาที่อัปเดตล่าสุด)
3. **Actions:** การกระทำที่จะปฏิบัติต่อแพ็กเก็ตเมื่อเงื่อนไขตรงกัน

```bitfield
+------------------------------------------+-----------------------+-----------------------------+
|        Match Fields (L2, L3, L4)         |        Counters       |           Actions           |
+------------------------------------------+-----------------------+-----------------------------+
| In-Port, MAC Dst, IP Src, TCP DstPort ...| Packet Count, Bytes ..| Forward, Drop, Modify, Send |
+------------------------------------------+-----------------------+-----------------------------+
```

---

## 6.3 ชุดฟิลด์การตรวจสอบของ OpenFlow ข้ามเลเยอร์ L2/L3/L4

OpenFlow สามารถตรวจสอบฟิลด์ต่างๆ ข้ามเลเยอร์ได้อย่างยืดหยุ่น:
- **Link Layer (L2):** Ingress Port, Source MAC, Destination MAC, Ethernet Type, VLAN ID, VLAN Priority
- **Network Layer (L3):** Source IP, Destination IP, IP Protocol, IP ToS (DSCP/ECN)
- **Transport Layer (L4):** TCP/UDP Source Port, TCP/UDP Destination Port

---

## 6.4 ตัวอย่างการประยุกต์ใช้งานจริงของ OpenFlow Rules

OpenFlow ทำให้อุปกรณ์ฮาร์ดแวร์ตัวเดียวสามารถทำหน้าที่ทดแทนอุปกรณ์เฉพาะทางได้หลากหลาย:

### 1. ทำหน้าที่เป็น Router (L3 Forwarding):
- **Match:** `IP Dst = 10.1.2.*`
- **Action:** `Forward(Port 3)`

### 2. ทำหน้าที่เป็น Firewall (ความปลอดภัย):
- **Match:** `IP Dst = 10.1.2.3, IP Protocol = 6, TCP DstPort = 22 (SSH)`
- **Action:** `Drop` (บล็อกการรีโมต SSH เข้าเซิร์ฟเวอร์ลับ)

### 3. ทำหน้าที่เป็น Layer 2 Switch:
- **Match:** `MAC Dst = 00:11:22:33:44:55`
- **Action:** `Forward(Port 2)`

### 4. ทำหน้าที่เป็น NAT Router:
- **Match:** `IP Src = 10.0.0.1, TCP SrcPort = 3345`
- **Action:** `Rewrite(IP Src = 138.76.29.7, TCP SrcPort = 5001), Forward(Port 1)`

---

## 6.5 การประสานการทำงานทั่วทั้งเครือข่าย (Network-Wide Flow Table Orchestration)

ในสถาปัตยกรรม SDN Central Controller สามารถโปรแกรม Flow Table บนสวิตช์หลายตัวพร้อมกัน เพื่อควบคุมพฤติกรรมของทราฟฟิกทั้งเครือข่าย เช่น การทำ Traffic Engineering (บังคับให้ทราฟฟิก HTTP วิ่งผ่านเส้นทาง A ขณะที่ทราฟฟิก Video วิ่งผ่านเส้นทาง B)

---

# 7. อุปกรณ์ตัวกลางในระบบเครือข่าย (Middleboxes) (Slides 88–90)

## 7.1 นิยามและประเภทของ Middleboxes ในเครือข่ายปัจจุบัน

> [!DEFINITION]
> **Middlebox (อุปกรณ์กล่องตรงกลาง):**
> อุปกรณ์หรือฟังก์ชันภายในเครือข่ายที่ทำการตรวจสอบ กรอง แปลงสภาพ หรือควบคุมทราฟฟิกนอกเหนือไปจากการส่งต่อแพ็กเก็ต IP ตามปกติ

```mermaid
flowchart TD
    PacketIn["Inbound Traffic"] --> MB_FW["Firewall & IDS/IPS<br/>(Inspect Deep Payload & Block Attacks)"]
    MB_FW --> MB_NAT["NAT Router<br/>(Address/Port Translation)"]
    MB_NAT --> MB_LB["Load Balancer<br/>(Distribute to Server Farms)"]
    MB_LB --> MB_Cache["Web Cache / CDN Proxy<br/>(Serve Local Content)"]
    MB_Cache --> Server["Target End Server"]
```

### ประเภทของ Middleboxes ที่พบมากที่สุด:
1. **Firewalls & IDS/IPS:** ตรวจสอบความปลอดภัย ป้องกันการโจมตีและการบุกรุก
2. **NAT Routers:** แปลงหมายเลข IP ส่วนตัวและแชร์ Public IP
3. **Application-Level Gateways (ALG) & Load Balancers:** กระจายโหลดคำขอไปยังคลัสเตอร์เซิร์ฟเวอร์
4. **Web Caches & WAN Accelerators:** เก็บสำเนาข้อมูลและบีบอัดทราฟฟิกเพื่อเพิ่มความเร็ว

---

## 7.2 การเปลี่ยนผ่านสู่ Programmable Infrastructure และ NFV

ในอดีต Middleboxes เป็นอุปกรณ์กล่องฮาร์ดแวร์เฉพาะทางราคาแพง (Proprietary Hardware Boxes) ปัจจุบันโลกเครือข่ายกำลังเปลี่ยนผ่านสู่ **Network Functions Virtualization (NFV)** และ SDN:
- รันฟังก์ชัน Middlebox ในรูปแบบของ **Virtual Machines (VMs) หรือ Containers** บนเซิร์ฟเวอร์ x86 มาตรฐานในคลาวด์
- สามารถปรับขนาด (Scale-up/down) และเคลื่อนย้ายฟังก์ชันได้อย่างยืดหยุ่นผ่านซอฟต์แวร์

---

# 8. ปรัชญาและหลักการออกแบบสถาปัตยกรรมอินเทอร์เน็ต (Internet Architecture & Design Principles) (Slides 91–98)

## 8.1 สถาปัตยกรรมรูปทรงนาฬิกาทรายของอินเทอร์เน็ต (The IP Hourglass Model)

ความสำเร็จอันยิ่งใหญ่ของอินเทอร์เน็ตเกิดจากการออกแบบที่เรียกว่า **"The Hourglass Architecture" (สถาปัตยกรรมรูปทรงนาฬิกาทราย)**:

```mermaid
flowchart TD
    subgraph TopApp ["Application Layer (กว้างมาก - หลากหลายนับไม่ถ้วน)"]
        Web["HTTP/Web"] --- Email["SMTP"] --- Video["Streaming/YouTube"] --- P2P["P2P/BitTorrent"] --- DNS["DNS"]
    end

    subgraph MidWaist ["Network Layer (เอวคอดบาง - จุดศูนย์รวมหนึ่งเดียว)"]
        IP["Internet Protocol (IPv4 / IPv6)<br/>'The Thin Waist of the Internet'"]
    end

    subgraph BotLink ["Link & Physical Layer (กว้างมาก - รองรับทุกตัวกลาง)"]
        Eth["Ethernet"] --- WiFi["Wi-Fi (802.11)"] --- Cell["Cellular (4G/5G)"] --- Fiber["Fiber Optic"] --- Sat["Satellite"]
    end

    TopApp --> IP
    IP --> BotLink
```

> [!SUMMARY]
> **ทำไม IP จึงเป็น "Thin Waist" (เอวคอดของนาฬิกาทราย)?**
> เพราะโปรโตคอล **IP คือมาตรฐานตัวเดียวตรงกลาง** ที่เชื่อมโยงแอปพลิเคชันทุกชนิดด้านบน เข้ากับเทคโนโลยีสายส่งทุกชนิดด้านล่าง ทำให้สามารถคิดค้นแอปพลิเคชันใหม่ๆ หรือเทคโนโลยีฮาร์ดแวร์ใหม่ๆ ได้โดยไม่ต้องรื้อแก้ส่วนอื่นของระบบ

---

## 8.2 หลักการทำงานแบบจุดต่อจุด (The End-to-End Argument - Saltzer et al., 1984)

หลักการออกแบบพื้นฐานที่ทรงอิทธิพลที่สุดของอินเทอร์เน็ต ซึ่งเสนอโดย J. Saltzer, D. Reed, และ D. Clark (1984):

> [!DEFINITION]
> **The End-to-End Principle:**
> ฟังก์ชันการทำงานของระบบเครือข่าย หากสามารถนำไปปฏิบัติได้อย่างสมบูรณ์และถูกต้องที่ **ระบบปลายทาง (End Hosts / Endpoints)** แล้ว ก็ไม่ควรนำฟังก์ชันนั้นไปใส่ไว้ใน **แกนกลางของเครือข่าย (Network Core)**

### ตัวอย่างการเปรียบเทียบ:
- **การส่งไฟล์ที่ถูกต้องและเชื่อถือได้ (Reliable File Transfer):** แม้ว่า Link Layer ทุกท่อนในเครือข่ายจะส่งข้อมูลไม่ผิดพลาดเลย แต่ไฟล์ก็อาจเสียหายได้จากบั๊กในหน่วยความจำของเราเตอร์ ดังนั้น **End Host ต้องเป็นผู้ตรวจสอบ Checksum ทั้งไฟล์เองอยู่ดี** ดังนั้น แกนกลางเครือข่ายจึงควรเน้นความเร็วสูงสุดแบบ Best-Effort แล้วให้ TCP ที่ End Host ดูแลเรื่อง Reliability

---

## 8.3 ตำแหน่งความฉลาดของระบบเครือข่าย (Smart Edge vs Simple Core)

| องค์ประกอบ | สถาปัตยกรรมเครือข่ายโทรศัพท์แบบดั้งเดิม (Telco / ATM) | สถาปัตยกรรมอินเทอร์เน็ต (Internet Architecture) |
| :--- | :--- | :--- |
| **ตำแหน่งความฉลาด (Intelligence)** | รวมศูนย์อยู่ใน **Network Core** (สวิตช์รู้สถานะสายทุกสาย) | อยู่ที่ **Network Edge** (สมาร์ทโฟน, คอมพิวเตอร์, เซิร์ฟเวอร์) |
| **แกนกลางเครือข่าย (Core)** | สลับซับซ้อน (Complex Core) รองรับบริการตายตัว | เรียบง่ายและเร็วที่สุด (Simple Core - Best Effort IP) |
| **นวัตกรรม (Innovation)** | เกิดขึ้นช้ามาก ต้องรอผู้ให้บริการโทรคมนาคมเปลี่ยนอุปกรณ์ | เกิดขึ้นเร็วมาก ใครๆ ก็เขียนแอปใหม่ลงบน End Host ได้ทันที |

---

# 9. ภาคผนวกเจาะลึก: การแบ่งส่วนข้อมูลและการวิเคราะห์ Wireshark (Slides 99–102)

## 9.1 กลไก IP Fragmentation and Reassembly (พร้อมตัวอย่างตารางคำนวณ Step-by-Step)

แต่ละเทคโนโลยี Link Layer มีขนาดสูงสุดของเฟรมที่สามารถส่งได้เรียกว่า **Maximum Transmission Unit (MTU)**:
- Ethernet MTU มาตรฐาน = **1,500 ไบต์**
- เมื่อ IP Datagram ขนาดใหญ่ (เช่น 4,000 ไบต์) ต้องวิ่งผ่านลิงก์ที่มี MTU เล็กกว่า (เช่น 1,500 ไบต์) เร้าเตอร์จะต้องทำ **Fragmentation (แบ่งย่อยแพ็กเก็ต)**
- **Reassembly (การรวมชิ้นส่วน):** เกิดขึ้นที่ **โฮสต์ปลายทาง (Destination Host) เท่านั้น** เร้าเตอร์กลางทางจะไม่นำแพ็กเก็ตมารวมกันใหม่

### กฎสำคัญในการคำนวณ Fragmentation:
1. **IP Header Size:** ขนาด 20 ไบต์
2. **Maximum Data per Fragment:** ต้องเป็นจำนวนที่ **หารด้วย 8 ลงตัวเสมอ** (เนื่องจาก Fragment Offset เก็บหน่วยเป็น 8-byte blocks)
3. **Flags:**
   - `DF = 1` (Don't Fragment): สั่งห้ามตัดแบ่ง หากเกิน MTU ให้ทิ้งและส่ง ICMP กลับ
   - `MF = 1` (More Fragments): ยังมีชิ้นส่วนถัดไปตามมา
   - `MF = 0` (Last Fragment): เป็นชิ้นส่วนสุดท้าย
4. **Fragment Offset:** คำนวณจาก:
$$\text{Offset} = \frac{\text{ผลรวมขนาดข้อมูล (Data Bytes) ก่อนหน้าชิ้นส่วนนี้}}{8}$$

---

### 📝 ตัวอย่างโจทย์คำนวณการแบ่งส่วนข้อมูล (Step-by-Step Worked Example)

**โจทย์:** มี IP Datagram ขนาดรวม **4,000 ไบต์** (Header 20 ไบต์ + Data 3,980 ไบต์) ส่งผ่านลิงก์ที่มี $\text{MTU} = 1,500\text{ ไบต์}$ จงคำนวณการแบ่งส่วน Datagram

#### ขั้นตอนการคำนวณ:
1. สำหรับ $\text{MTU} = 1,500\text{ ไบต์}$:
   - พื้นที่สำหรับ Data สูงสุด = $1500 - 20 = 1,480\text{ ไบต์}$
   - ตรวจสอบ: $\frac{1480}{8} = 185$ (หารด้วย 8 ลงตัวพอดี!) $\rightarrow$ บรรจุ Data ได้สูงสุด 1,480 ไบต์ต่อชิ้น
2. **Fragment ที่ 1:**
   - Data: ไบต์ที่ $0$ ถึง $1479$ (ขนาด 1,480 ไบต์)
   - Total Length = $1480 + 20 = 1,500\text{ ไบต์}$
   - $\text{Offset} = \frac{0}{8} = 0$
   - $\text{More Fragments Flag (MF)} = 1$
3. **Fragment ที่ 2:**
   - Data: ไบต์ที่ $1480$ ถึง $2959$ (ขนาด 1,480 ไบต์)
   - Total Length = $1480 + 20 = 1,500\text{ ไบต์}$
   - $\text{Offset} = \frac{1480}{8} = 185$
   - $\text{More Fragments Flag (MF)} = 1$
4. **Fragment ที่ 3 (ชิ้นสุดท้าย):**
   - ข้อมูลที่เหลือ = $3980 - 1480 - 1480 = 1,020\text{ ไบต์}$
   - Total Length = $1020 + 20 = 1,040\text{ ไบต์}$
   - $\text{Offset} = \frac{1480 + 1480}{8} = \frac{2960}{8} = 370$
   - $\text{More Fragments Flag (MF)} = 0$ (ชิ้นสุดท้าย)

```mermaid
flowchart TD
    OrigDatagram["Original Datagram (ID = 777)<br/>Total Length = 4000 Bytes (Header 20 + Data 3980)<br/>Offset = 0, MF = 0"]
    
    OrigDatagram --> RouterFrag["Router (MTU = 1500 Bytes)"]
    
    RouterFrag --> Frag1["Fragment 1 (ID = 777)<br/>Length = 1500 (Data 1480)<br/>Offset = 0, MF = 1"]
    RouterFrag --> Frag2["Fragment 2 (ID = 777)<br/>Length = 1500 (Data 1480)<br/>Offset = 185, MF = 1"]
    RouterFrag --> Frag3["Fragment 3 (ID = 777)<br/>Length = 1040 (Data 1020)<br/>Offset = 370, MF = 0"]
```

#### ตารางสรุปพารามิเตอร์การแบ่งส่วน:
| Fragment # | Identification | Total Length | Data Length | More Fragments (MF) | Fragment Offset |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **ต้นฉบับ** | `777` | 4,000 ไบต์ | 3,980 ไบต์ | 0 | 0 |
| **ชิ้นที่ 1** | `777` | 1,500 ไบต์ | 1,480 ไบต์ | **1** | **0** |
| **ชิ้นที่ 2** | `777` | 1,500 ไบต์ | 1,480 ไบต์ | **1** | **185** |
| **ชิ้นที่ 3** | `777` | 1,040 ไบต์ | 1,020 ไบต์ | **0** | **370** |

---

## 9.2 การวิเคราะห์แพ็กเก็ต DHCP จาก Wireshark Trace จริง (Home LAN Environment)

จากผลการดักจับแพ็กเก็ตการทำงานของ DHCP บนระบบเครือข่ายจริง (Home LAN):

```
Frame 4: 342 bytes on wire (2736 bits)
Ethernet II, Src: 00:0b:82:01:fc:42, Dst: ff:ff:ff:ff:ff:ff (Broadcast)
Internet Protocol Version 4, Src: 0.0.0.0, Dst: 255.255.255.255
User Datagram Protocol, Src Port: 68, Dst Port: 67
Bootstrap Protocol (DHCP)
    Message type: Boot Request (1)
    Hardware type: Ethernet (0x01)
    Client MAC address: 00:0b:82:01:fc:42
    Client IP address (ciaddr): 0.0.0.0
    Your (client) IP address (yiaddr): 0.0.0.0
    Next server IP address (siaddr): 0.0.0.0
    Relay agent IP address (giaddr): 0.0.0.0
    Transaction ID: 0x3d1d
    Magic cookie: DHCP (0x63825363)
    Option: (53) DHCP Message Type = DHCP Request
    Option: (50) Requested IP Address = 192.168.1.101
    Option: (54) DHCP Server Identifier = 192.168.1.1
    Option: (55) Parameter Request List (1, 3, 6, 15)
        Subnet Mask (1)
        Router / Default Gateway (3)
        Domain Name Server (6)
        Domain Name (15)
```

### การตอบกลับจาก DHCP Server (DHCP ACK):
- **Client IP assigned (`yiaddr`):** `192.168.1.101`
- **Subnet Mask (Option 1):** `255.255.255.0`
- **Default Router (Option 3):** `192.168.1.1`
- **DNS Servers (Option 6):** `24.10.112.5`, `24.10.112.6`
- **IP Address Lease Time (Option 51):** `86400s` (24 ชั่วโมง)

---

## 🎯 สรุปสาระสำคัญประจำบท (Chapter 4 Key Takeaways)

1. **Data Plane vs Control Plane:** Data Plane ทำงานเฉพาะที่เร้าเตอร์ระดับฮาร์ดแวร์ความเร็วสูง (Nanoseconds) ขณะที่ Control Plane คำนวณเส้นทางระดับเครือข่าย (ซอฟต์แวร์)
2. **Router Architecture:** Input Port ใช้ TCAM ทำ Longest Prefix Match, สวิตชิ่งแฟบริกแบบ Crossbar รองรับการส่งคู่ขนาน, บัฟเฟอร์ Output Port ต้องการขนาด $B = \frac{\text{RTT} \cdot C}{\sqrt{N}}$ เพื่อป้องกัน Bufferbloat
3. **IPv4 & CIDR:** IP ระบุตัวตนที่อินเทอร์เฟซ, CIDR ใช้รูปแบบ `/x`, DHCP ทำงานแบบ DORA (Discover, Offer, Request, ACK) ผ่าน UDP Broadcast
4. **NAT:** ช่วยประหยัด IP และเพิ่มความปลอดภัย แต่ละเมิดการแบ่งเลเยอร์และทำลายหลักการ End-to-End
5. **IPv6:** ขยายเป็น 128 บิต, Header ขนาดคงที่ 40 ไบต์, ตัด Checksum และห้ามเร้าเตอร์ตัดแบ่งแพ็กเก็ต (No Fragmentation at Routers), เปลี่ยนผ่านด้วย Dual-Stack และ Tunneling
6. **OpenFlow & Generalized Forwarding:** ปฏิวัติการส่งต่อด้วย Match-plus-Action ข้าม L2/L3/L4 ทำให้โปรแกรมเครือข่ายเป็นสวิตช์, เร้าเตอร์, ไฟร์วอลล์ หรือ NAT ได้อย่างอิสระ
7. **Internet Design Principles:** สถาปัตยกรรมนาฬิกาทรายโดยมี IP เป็น Thin Waist ตรงกลาง และยึดมั่นในหลักการ **End-to-End Argument (Simple Core, Smart Edge)**
`;

const targetFile = '05_Wiki/01_Lectures/Lecture 5 - Chapter 4 Network Layer Data Plane (v9.0 Current).md';
fs.writeFileSync(targetFile, masterContent, 'utf8');
console.log('Successfully wrote master note:', targetFile);
console.log('File size:', fs.statSync(targetFile).size, 'bytes');
