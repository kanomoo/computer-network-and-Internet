---
tags:
  - networking
  - exam-prep
  - question-bank
  - quiz-solutions
  - classroom-exam
  - mock-exam
created: 2026-08-17
updated: 2026-08-17
type: exam-bank
---

# Exam Preparation Guide and Master 80-Question Bank

> [!INFO] 📂 แหล่งไฟล์อ้างอิงต้นฉบับของอาจารย์ผู้สอน (Source Documents)
> - **แบบทดสอบจริงจาก Classroom:** [exam.md](file:///c:/Project/computer-network-&-Internet/New/exam.md) *(Quiz Chapter 3 Transport Layer: TCP & Congestion Control 20 ข้อ)*
> - **สไลด์บทที่ 1 & 2:** [Chapter_1_Fundamental-Network_models_1-89.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_1_Fundamental-Network_models_1-89.html) *(สไลด์ 1–89)*
> - **สไลด์บทที่ 3 (Application):** [Chapter_2_Application_Layer_1-119.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_2_Application_Layer_1-119.html) *(สไลด์ 1–119)*
> - **สไลด์บทที่ 4 (Transport):** [Chapter_3_ Transport_Layer_1-154.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_3_%20Transport_Layer_1-154.html) *(สไลด์ 1–154)*
> - **การบ้านและแบบฝึกหัด:** [Assignments.pptx](file:///c:/Project/computer-network-&-Internet/Assignments.pptx) *(TCP Handshake & Internet Checksum)*
> - **บทเรียนเว็บโต้ตอบ:** [brosing-msg.html](file:///c:/Project/computer-network-&-Internet/New/brosing-msg.html), [email.html](file:///c:/Project/computer-network-&-Internet/New/email.html), [tcpipmodel.html](file:///c:/Project/computer-network-&-Internet/New/tcpipmodel.html)

> [!SUMMARY] ภาพรวมคลังข้อสอบและแนวทางเตรียมตัวสอบ (Close Book 80 ข้อ)
> เอกสารนี้รวบรวมข้อสอบจริงจาก Classroom อาจารย์, แบบฝึกหัดเสมือนจริง 80 ข้อ ครบ 4 บทเรียนตามประกาศสอบ และเฉลยคลังแบบทดสอบ Quiz 1–11:
> 1. [[#1. Official Classroom Exam: Quiz Chapter 3 (20 ข้อ)]] - ข้อสอบจริงเรื่อง TCP และ Congestion Control พร้อมเฉลยละเอียด
> 2. [[#2. Master 80-Question Practice Exam]] - ข้อสอบจำลอง 80 ข้อ ครบทั้ง 4 บทเรียนหลัก
> 3. [[#3. Answer Keys & Detailed Explanations]] - ตารางเฉลยและบทวิเคราะห์เหตุผลข้อสอบ 80 ข้อ
> 4. [[#4. Real Quiz & Post-Test Master Solutions]] - เฉลยคลังข้อสอบจริง Quiz 1–11 และ Post-Test

---

# 1. ข้อสอบจริงจาก Classroom อาจารย์: Quiz Chapter 3 (20 ข้อ)

*📌 ต้นฉบับจากไฟล์: [New/exam.md](file:///c:/Project/computer-network-&-Internet/New/exam.md)*

### 📝 ส่วนที่ 1: TCP (ข้อ 1–10)

#### 1. ลำดับการสร้าง TCP Connection แบบ Three-Way Handshake ที่ถูกต้องคือข้อใด
- **ก.** SYN $\to$ SYN-ACK $\to$ ACK
- **ข.** ACK $\to$ SYN $\to$ FIN
- **ค.** FIN $\to$ ACK $\to$ SYN
- **ง.** SYN-ACK $\to$ ACK $\to$ FIN

> [!TIP] **เฉลย: ก. SYN $\to$ SYN-ACK $\to$ ACK**
> *คำอธิบาย:* Client ส่ง SYN ขอเชื่อมต่อ $\to$ Server ตอบกลับ SYN-ACK $\to$ Client ส่ง ACK ยืนยันสมบูรณ์

---

#### 2. หาก TCP Sender ไม่ได้รับ ACK จนหมดเวลา Retransmission Timer โดยทั่วไปจะทำอย่างไร
- **ก.** ส่งข้อมูลที่คาดว่าสูญหายซ้ำ
- **ข.** เปลี่ยนไปใช้ UDP
- **ค.** ปิดโปรแกรมทันที
- **ง.** เปลี่ยน Destination Port

> [!TIP] **เฉลย: ก. ส่งข้อมูลที่คาดว่าสูญหายซ้ำ**
> *คำอธิบาย:* เมื่อเกิด Timeout บน Segment เก่าสุดที่ยังไม่ได้รับ ACK ฝ่ายส่งจะทำการ Retransmission ส่ง Segment นั้นซ้ำทันที

---

#### 3. ข้อใดอธิบาย Flow Control ได้ถูกต้องที่สุด
- **ก.** ป้องกัน Sender ส่งข้อมูลเร็วกว่าที่ Receiver รับไหว
- **ข.** เลือกเส้นทางที่สั้นที่สุดในเครือข่าย
- **ค.** ตรวจสอบ IP Address ของ Sender
- **ง.** เพิ่ม Bandwidth ของเครือข่าย

> [!TIP] **เฉลย: ก. ป้องกัน Sender ส่งข้อมูลเร็วกว่าที่ Receiver รับไหว**
> *คำอธิบาย:* Flow Control เป็นกลไกที่ Receiver ใช้ควบคุม Sender ผ่านฟิลด์ `rwnd` เพื่อป้องกันไม่ให้บัฟเฟอร์ของ Receiver ล้น

---

#### 4. TCP มองข้อมูลจาก Application ในลักษณะใด
- **ก.** Byte Stream ต่อเนื่อง
- **ข.** Ethernet Frame เท่านั้น
- **ค.** IP Address ต่อเนื่อง
- **ง.** ข้อความที่ต้องมีขนาดเท่ากันทุกครั้ง

> [!TIP] **เฉลย: ก. Byte Stream ต่อเนื่อง**
> *คำอธิบาย:* TCP มองข้อมูลเป็นสายธารของไบต์ที่ไหลต่อเนื่อง (Unstructured Byte Stream) โดยไม่มีการแบ่งขอบเขตข้อความของ Application

---

#### 5. คำว่า Full Duplex ของ TCP หมายถึงข้อใด
- **ก.** ทั้งสองฝั่งสามารถส่งข้อมูลหากันได้พร้อมกัน
- **ข.** ส่งข้อมูลได้เฉพาะ Client ไป Server
- **ค.** ส่งข้อมูลได้ครั้งละ 1 ไบต์
- **ง.** ต้องใช้ TCP สอง Connection เสมอ

> [!TIP] **เฉลย: ก. ทั้งสองฝั่งสามารถส่งข้อมูลหากันได้พร้อมกัน**
> *คำอธิบาย:* Full-Duplex Data หมายถึงทั้งสองฝั่งสามารถส่งและรับข้อมูลบน Connection เดียวกันได้ในเวลาเดียวกัน

---

#### 6. MSS (Maximum Segment Size) เกี่ยวข้องกับข้อใด
- **ก.** ปริมาณ Application Data สูงสุดที่ใส่ใน TCP Segment โดยทั่วไป
- **ข.** จำนวน Router สูงสุดที่ TCP ใช้ได้
- **ค.** จำนวน Port สูงสุดของ Server
- **ง.** จำนวน ACK สูงสุดต่อ Connection

> [!TIP] **เฉลย: ก. ปริมาณ Application Data สูงสุดที่ใส่ใน TCP Segment โดยทั่วไป**
> *คำอธิบาย:* MSS คือขนาดข้อมูล Application สูงสุดที่ใส่ใน 1 Segment (ไม่รวม TCP/IP Headers เช่น บน Ethernet MTU 1500B $\to$ MSS = 1460B)

---

#### 7. เหตุใด TCP Header จึงอาจมีความยาวไม่เท่ากันในแต่ละ Segment
- **ก.** เพราะอาจมี TCP Options เพิ่มเติม
- **ข.** เพราะ Source Port มีขนาดไม่แน่นอน
- **ค.** เพราะ Destination Port ถูกลบได้
- **ง.** เพราะ TCP ไม่มี Header ที่แน่นอน

> [!TIP] **เฉลย: ก. เพราะอาจมี TCP Options เพิ่มเติม**
> *คำอธิบาย:* Header พื้นฐานมี 20 Bytes แต่สามารถขยายได้ถึง 60 Bytes หากมีฟิลด์ Options (เช่น MSS Option, Window Scale, SACK, Timestamps)

---

#### 8. Cumulative ACK ของ TCP มีความหมายใกล้เคียงกับข้อใดมากที่สุด
- **ก.** ยืนยันว่ารับข้อมูลต่อเนื่องครบถึงก่อนหมายเลขที่ ACK ระบุ
- **ข.** ยืนยันเฉพาะ Segment ล่าสุดเท่านั้น
- **ค.** ใช้ยืนยัน IP Address ของ Router
- **ง.** ใช้สำหรับปิด Connection เท่านั้น

> [!TIP] **เฉลย: ก. ยืนยันว่ารับข้อมูลต่อเนื่องครบถึงก่อนหมายเลขที่ ACK ระบุ**
> *คำอธิบาย:* ค่า `ACK = N` หมายถึงได้รับข้อมูลต่อเนื่องครบทุกไบต์จนถึง $N-1$ แล้ว และกำลังรอรับไบต์ที่ $N$

---

#### 9. EstimatedRTT ใช้เพื่ออะไร
- **ก.** ประมาณค่า RTT โดยทำให้ค่าที่วัดได้เรียบขึ้น
- **ข.** กำหนดหมายเลข Port
- **ค.** เพิ่มขนาด TCP Header
- **ง.** เลือก Routing Protocol

> [!TIP] **เฉลย: ก. ประมาณค่า RTT โดยทำให้ค่าที่วัดได้เรียบขึ้น**
> *คำอธิบาย:* TCP ใช้สูตร EWMA: $\text{EstimatedRTT} = (1-\alpha)\text{EstimatedRTT} + \alpha\text{SampleRTT}$ เพื่อลดความผันผวนของ RTT

---

#### 10. ก่อนแลกเปลี่ยนข้อมูล TCP ต้องทำ Connection Management เพื่ออะไร
- **ก.** สร้างสถานะการเชื่อมต่อระหว่างสองฝั่ง
- **ข.** เปลี่ยน IP Address ของ Server
- **ค.** เพิ่มความเร็วของ Physical Link
- **ง.** ลบ TCP Header

> [!TIP] **เฉลย: ก. สร้างสถานะการเชื่อมต่อระหว่างสองฝั่ง**
> *คำอธิบาย:* เพื่อตกลงค่า Initial Sequence Number (ISN), จัดสรร Buffers, และสร้างสถานะ (State Variables) ทั้งสองฝั่ง

---

### 📝 ส่วนที่ 2: Congestion Control (ข้อ 11–20)

#### 11. Congestion เกิดขึ้นเมื่อใด
- **ก.** ปริมาณข้อมูลที่เข้าสู่เครือข่ายมากกว่าที่ทรัพยากรจะรองรับได้
- **ข.** Receiver มี Buffer ว่างมาก
- **ค.** ไม่มีข้อมูลถูกส่งในเครือข่าย
- **ง.** Application ปิดการทำงาน

> [!TIP] **เฉลย: ก. ปริมาณข้อมูลที่เข้าสู่เครือข่ายมากกว่าที่ทรัพยากรจะรองรับได้**
> *คำอธิบาย:* Congestion เกิดเมื่อโฮสต์ส่งข้อมูลเร็วเกินไปจนเกินความสามารถในการส่งต่อของ Routers/Links ใน Network Core

---

#### 12. AIMD ย่อมาจากข้อใด
- **ก.** Additive Increase, Multiplicative Decrease
- **ข.** Additive Increase, Maximum Delay
- **ค.** Automatic Internet Message Delivery
- **ง.** Adaptive Increase, Minimum Data

> [!TIP] **เฉลย: ก. Additive Increase, Multiplicative Decrease**
> *คำอธิบาย:* กลไกหลักของ TCP: เพิ่ม `cwnd` ทีละ 1 MSS ต่อ RTT เมื่อสำเร็จ และลด `cwnd` ลงครึ่งหนึ่ง (50%) เมื่อเกิด Packet Loss

---

#### 13. เมื่อ Router Buffer เต็ม อาจเกิดผลใด
- **ก.** Packet ถูก Drop
- **ข.** Bandwidth เพิ่มขึ้นเอง
- **ค.** RTT กลายเป็นศูนย์
- **ง.** TCP เปลี่ยนเป็น UDP

> [!TIP] **เฉลย: ก. Packet ถูก Drop**
> *คำอธิบาย:* เมื่อคิวใน Output Buffer ของเราเตอร์เต็ม แพ็กเก็ตที่มาถึงใหม่จะไม่มีที่เก็บและถูกทิ้ง (**Packet Loss / Drop**)

---

#### 14. เหตุใดการส่งข้อมูลซ้ำโดยไม่จำเป็นจึงเป็นผลเสียเมื่อเครือข่าย Congested
- **ก.** ใช้ Bandwidth ไปกับข้อมูลซ้ำ
- **ข.** ทำให้ Source Port หาย
- **ค.** ทำให้ IP Address เปลี่ยน
- **ง.** ทำให้ TCP Header ไม่มี Checksum

> [!TIP] **เฉลย: ก. ใช้ Bandwidth ไปกับข้อมูลซ้ำ**
> *คำอธิบาย:* การส่งซ้ำโดยไม่จำเป็น (Unneeded Retransmissions) ทำให้แบนด์วิธของลิงก์ที่คับคั่งอยู่แล้วถูกใช้งานไปกับข้อมูลที่ปลายทางอาจได้รับไปแล้ว

---

#### 15. Network-Assisted Congestion Control หมายถึงข้อใด
- **ก.** Router หรืออุปกรณ์เครือข่ายช่วยส่งข้อมูลเกี่ยวกับ Congestion
- **ข.** Application เปลี่ยนสาย LAN อัตโนมัติ
- **ค.** Receiver เพิ่ม RAM ให้ Sender
- **ง.** DNS Server ลดขนาด TCP Segment

> [!TIP] **เฉลย: ก. Router หรืออุปกรณ์เครือข่ายช่วยส่งข้อมูลเกี่ยวกับ Congestion**
> *คำอธิบาย:* เช่น กลไก ECN (Explicit Congestion Notification) ที่ Router ช่วยมาร์กบิต CE ใน IP Header แจ้งเตือนความคับคั่งโดยตรง

---

#### 16. ตัวแปร cwnd ใน TCP ใช้เกี่ยวข้องกับอะไร
- **ก.** ควบคุมปริมาณข้อมูลที่ Sender ส่งเข้าเครือข่าย
- **ข.** ระบุหมายเลข Port ของ Application
- **ค.** เก็บ IP Address ของ Router
- **ง.** ระบุชนิดของ Ethernet Frame

> [!TIP] **เฉลย: ก. ควบคุมปริมาณข้อมูลที่ Sender ส่งเข้าเครือข่าย**
> *คำอธิบาย:* `cwnd` (Congestion Window) คือขนาดหน้าต่างที่ฝ่ายส่งใช้จำกัดอัตราการส่งข้อมูลเข้าสู่เครือข่าย: $\text{Rate} \approx \text{cwnd}/\text{RTT}$

---

#### 17. ในช่วง Slow Start ค่า cwnd มีแนวโน้มเปลี่ยนอย่างไร
- **ก.** เพิ่มขึ้นอย่างรวดเร็ว
- **ข.** ลดลงเป็นศูนย์ทันที
- **ค.** คงที่ตลอดเวลา
- **ง.** เปลี่ยนเป็นค่า Destination Port

> [!TIP] **เฉลย: ก. เพิ่มขึ้นอย่างรวดเร็ว**
> *คำอธิบาย:* ใน Slow Start ค่า `cwnd` จะเพิ่มขึ้นเท่าตัวทุกๆ 1 RTT (Exponential Growth: $1 \to 2 \to 4 \to 8 \dots$)

---

#### 18. ssthresh ใช้ช่วยกำหนดการเปลี่ยนจาก Slow Start ไปสู่ช่วงใด
- **ก.** Congestion Avoidance
- **ข.** Connection Setup
- **ค.** Flow Control
- **ง.** Demultiplexing

> [!TIP] **เฉลย: ก. Congestion Avoidance**
> *คำอธิบาย:* `ssthresh` (Slow Start Threshold) เป็นจุดตัด เมื่อ $\text{cwnd} \ge \text{ssthresh}$ ระบบจะเปลี่ยนจากการเพิ่มแบบ Exponential ไปเป็นการเพิ่มเชิงเส้นใน Congestion Avoidance

---

#### 19. ECN ช่วยแจ้ง Congestion โดยวิธีใด
- **ก.** Mark ข้อมูลใน Packet เพื่อส่งสัญญาณ Congestion โดยไม่จำเป็นต้องรอให้ Packet ถูก Drop
- **ข.** เปลี่ยน TCP เป็น UDP
- **ค.** ลบ ACK Number
- **ง.** เพิ่ม Source Port

> [!TIP] **เฉลย: ก. Mark ข้อมูลใน Packet เพื่อส่งสัญญาณ Congestion โดยไม่จำเป็นต้องรอให้ Packet ถูก Drop**
> *คำอธิบาย:* Router จะตั้งค่าบิต CE (Congestion Experienced) ใน IP Header เพื่อให้ปลายทางส่ง TCP ACK พร้อมบิต ECE เตือนฝ่ายส่งล่วงหน้า

---

#### 20. แนวคิด TCP Fairness ต้องการให้หลาย TCP Connections ที่ใช้ Bottleneck Link ร่วมกันเป็นอย่างไร
- **ก.** แบ่ง Capacity กันอย่างเหมาะสมหรือใกล้เคียงกัน
- **ข.** Connection แรกใช้ Bandwidth ทั้งหมด
- **ค.** ทุก Connection หยุดส่งพร้อมกัน
- **ง.** ใช้ Destination Port เดียวกัน

> [!TIP] **เฉลย: ก. แบ่ง Capacity กันอย่างเหมาะสมหรือใกล้เคียงกัน**
> *คำอธิบาย:* TCP Fairness อาศัยกลไก AIMD ทำให้ทุกสายเชื่อมต่อที่แชร์ลิงก์คอขวดร่วมกัน ได้รับส่วนแบ่งแบนด์วิธที่เท่าเทียมกัน (ลู่เข้าสู่เส้น $45^\circ$)

---

# 2. ชุดข้อสอบเสมือนจริง 80 ข้อ (Master 80-Question Practice Exam)

*(อิงตามเนื้อหาในสไลด์ `New/Chapter_1_Fundamental-Network_models_1-89.html`, `New/Chapter_2_Application_Layer_1-119.html`, `New/Chapter_3_ Transport_Layer_1-154.html` อย่างเคร่งครัด)*

### 📌 Part 1: Fundamental of Computer Network (ข้อ 1–20)
1. ข้อใดไม่ใช่ องค์ประกอบหลัก 5 ประการของการสื่อสารข้อมูล? (ก. Protocol, ข. Transmission Medium, ค. Operating System, ง. Receiver)
2. การส่งสัญญาณโทรทัศน์ดิจิทัลแบบกระจายเสียง จัดเป็นโหมดใด? (ก. Simplex, ข. Half-Duplex, ค. Full-Duplex, ง. Multiplex)
3. โทโปโลยีใดมีจุดอ่อนคือ Single Point of Failure ที่ศูนย์กลาง? (ก. Mesh, ข. Bus, ค. Star, ง. Ring)
4. เชื่อมต่อ $N=8$ โหนดแบบ Full Mesh ต้องใช้สายกี่เส้น? (ก. 8, ข. 16, ค. 28, ง. 56)
5. สายสัญญาณใดมีภูมิคุ้มกันต่อสัญญาณรบกวน EMI 100%? (ก. UTP, ข. STP, ค. Coaxial, ง. Fiber Optic)
6. การบิดเกลียวของสาย UTP มีไว้เพื่ออะไร? (ก. เพิ่มความเหนียว, ข. ลด EMI และ Crosstalk, ค. เพิ่มความเร็วไฟฟ้า, ง. ป้องกันไฟดูด)
7. Cable Broadband (HFC) มีลักษณะการใช้งานสายสัญญาณอย่างไรเทียบกับ ADSL? (ก. Dedicated, ข. Shared Medium, ค. Direct Fiber, ง. ไม่มีโมเด็ม)
8. ข้อใดอธิบาย Circuit vs Packet Switching ได้ถูกต้อง? (ก. Circuit จองล่วงหน้า ส่วน Packet ใช้ Statistical Mux, ข. Packet ไม่มีคิว, ค. Circuit จุผู้ใช้ได้มากกว่า, ง. Packet ต้องจองวงจรก่อน)
9. สูตรคำนวณ Transmission Delay คือข้อใด? (ก. $d/s$, ข. $L/R$, ค. $La/R$, ง. $R/L$)
10. ส่งแพ็กเก็ต $L = 2,000\text{ bits}$ บนลิงก์ $R = 2\text{ Mbps}$ จะเกิด Transmission Delay เท่าใด? (ก. 1s, ข. 0.01s, ค. 1ms, ง. 0.1ms)
11. ระยะทาง $d = 200\text{ km}$, ความเร็ว $s = 2 \times 10^8\text{ m/s}$ จะเกิด Propagation Delay เท่าใด? (ก. 1ms, ข. 2ms, ค. 10ms, ง. 0.1ms)
12. เมื่อ Traffic Intensity $I \to 1$ จะเกิดผลใด? (ก. สายเร็วขึ้น, ข. Queuing Delay พุ่งสูงแบบ Exponential, ค. Loss มหาศาล, ง. คิวเป็นศูนย์)
13. คำสั่ง Traceroute อาศัยฟิลด์ใดใน IP Header? (ก. Checksum, ข. TTL, ค. Source Port, ง. Window Size)
14. Throughput สูงสุดของระบบถูกจำกัดโดยสิ่งใด? (ก. ลิงก์ที่เร็วสุด, ข. Bottleneck Link ลิงก์ที่ช้าสุด, ค. จำนวน Router, ง. ฮาร์ดดิสก์)
15. การสร้างแพ็กเก็ตโดยใส่ Source IP Address ปลอม เรียกว่าอะไร? (ก. Sniffing, ข. IP Spoofing, ค. DoS, ง. Phishing)
16. เครือข่ายระดับมหาวิทยาลัยหรือศูนย์ราชการคือประเภทใด? (ก. PAN, ข. LAN, ค. CAN, ง. WAN)
17. ศูนย์แลกเปลี่ยนข้อมูลตรงระหว่าง ISP เรียกว่าอะไร? (ก. CO, ข. IXP, ค. Root DNS, ง. Tier-1 Node)
18. วัน Flag Day (1 ม.ค. 1983) มีความสำคัญอย่างไร? (ก. กำเนิด Web, ข. ARPANET เปลี่ยนมาใช้ TCP/IP ทางการ, ค. อีเมลแรก, ง. ปล่อย Windows)
19. องค์กรใดกำหนดมาตรฐานอินเทอร์เน็ตและออกเอกสาร RFC? (ก. IEEE, ข. IETF, ค. ISO, ง. ITU-T)
20. เมื่อ Router Output Buffer เต็มจะเกิดอะไรขึ้น? (ก. แปลงเป็นเสียง, ข. ขยายบัฟเฟอร์เอง, ค. Packet Loss ถูก Drop, ง. ส่งกลับต้นทาง)

### 📌 Part 2: Network Models (ข้อ 21–40)
21. เรียงลำดับ OSI 7 Layers จากล่างขึ้นบน? (ก. Physical $\to$ Data Link $\to$ Network $\to$ Transport $\to$ Session $\to$ Presentation $\to$ Application)
22. เลเยอร์ใดใน OSI ทำหน้าที่ Encryption, Compression, Data Formatting? (ก. App, ข. Presentation, ค. Session, ง. Transport)
23. เลเยอร์ใดใน OSI ทำหน้าที่ Dialog Control และ Checkpoints? (ก. Session, ข. Transport, ค. Network, ง. Presentation)
24. เหตุใด TCP/IP จึงไม่มี Presentation และ Session Layers? (ก. ลืมใส่, ข. มองเป็นความต้องการเฉพาะของ Application ให้ผู้พัฒนาจัดการเอง, ค. Router ทำแทน, ง. เลิกเข้ารหัส)
25. การสื่อสารระดับ Application และ Transport จัดเป็นแบบใด? (ก. Physical Hop-by-Hop, ข. Logical End-to-End, ค. Direct Cable, ง. Broadcast)
26. เราเตอร์ (Router) ทั่วไปทำงานสูงสุดที่เลเยอร์ใด? (ก. L1, ข. L2, ค. Layer 3 Network, ง. L7)
27. สวิตช์ L2 (Ethernet Switch) ทำงานสูงสุดที่เลเยอร์ใด? (ก. L1, ข. Layer 2 Data Link, ค. L3, ง. L4)
28. จับคู่ PDU ถูกต้อง? (ก. App=Frame, ข. App=Message, Transport=Segment, Network=Datagram, Link=Frame, Phys=Bits)
29. การเติม Header ทีละชั้นที่ฝั่งส่ง เรียกว่าอะไร? (ก. De-encapsulation, ข. Encapsulation, ค. Demultiplexing, ง. Segmentation)
30. ส่วนท้าย Frame Trailer ใน Link Layer มีไว้เพื่ออะไร? (ก. ใส่ IP, ข. ใส่ Port, ค. CRC สำหรับ Error Detection, ง. รหัสผ่าน)
31. ความแตกต่าง Protocol vs Service? (ก. Protocol ข้อตกลงแนวนอน ส่วน Service บริการแนวตั้งข้าม Interface, ข. HW vs SW)
32. จุดเชื่อมต่อที่ Layer ด้านล่างเตรียมไว้ให้ Layer บนเรียกใช้ เรียกว่าอะไร? (ก. MAC, ข. SAP หรือ API เช่น Socket, ค. Routing Table, ง. Mask)
33. ข้อใดไม่ใช่หน้าที่ของ Transport Layer? (ก. Mux/Demux, ข. Process-to-Process, ค. Global Routing ข้ามโครงข่าย, ง. Flow/Congestion Control)
34. ข้อมูลใน Physical Layer อยู่ในรูปใด? (ก. Text, ข. Raw Bits สัญญาณไฟฟ้า/แสง, ค. JSON, ง. SQL)
35. ข้อมูลเริ่มกระบวนการ Encapsulation ที่ชั้นใดเป็นจุดแรก? (ก. Phys, ข. Net, ค. Application Layer, ง. Transport)
36. ข้อใดถูกต้องเกี่ยวกับ Header Length? (ก. คงที่ 20B เสมอ, ข. TCP และ IPv4 แปรผันได้หากมี Options, ค. UDP มี 8-60B, ง. Ethernet ยาวกว่า Payload)
37. การเปลี่ยนสายทองแดงเป็น Fiber ส่งผลต่อเลเยอร์ใดโดยตรง? (ก. App, ข. Transport, ค. Physical และ Data Link, ง. ไม่มีผล)
38. โมเดลใดพัฒนาโดย DoD และมี 4 เลเยอร์? (ก. OSI, ข. TCP/IP Original Model, ค. IEEE 802, ง. ISO)
39. การแกะ Header ออกทีละชั้นที่ฝั่งรับ เรียกว่าอะไร? (ก. Encapsulation, ข. De-encapsulation, ค. Decryption, ง. Modulation)
40. ประโยชน์หลักของ Layering คืออะไร? (ก. เร็วขึ้น 10 เท่า, ข. Modularity ปรับปรุงชั้นหนึ่งได้โดยไม่กระทบชั้นอื่น, ค. Delay=0, ง. กันไวรัส 100%)

### 📌 Part 3: Application Layer (ข้อ 41–60)
41. สถาปัตยกรรมที่ทุกโหนดเป็นทั้ง Client และ Server (Servent) คือแบบใด? (ก. Client-Server, ข. Master-Slave, ค. Peer-to-Peer, ง. Mainframe)
42. ประตูอินเทอร์เน็ตระหว่าง App Process กับ Transport OS คืออะไร? (ก. NIC, ข. Socket, ค. Subnet, ง. Gateway)
43. ระบุ Process บนเครื่อง ต้องใช้ข้อมูลคู่ใด? (ก. MAC+URL, ข. IP Address + Port Number, ค. Domain+Email, ง. Mask+Gateway)
44. แอปพลิเคชันใดไวต่อ Delay มาก แต่ยอมรับ Loss ได้บ้าง? (ก. FTP, ข. Web, ค. VoIP / Video Call, ง. การเงิน)
45. HTTP ทำงานบนพอร์ตและโปรโตคอลใด? (ก. UDP 80, ข. TCP Port 80, ค. TCP 443, ง. UDP 53)
46. HTTPS ทำงานบนพอร์ตใดและใช้ระบบความปลอดภัยใด? (ก. 80 MD5, ข. 8080 WPA2, ค. TCP Port 443 และ TLS/SSL, ง. 22 SSH)
47. Stateless ใน HTTP หมายถึงอะไร? (ก. รับได้ 1 คน, ข. Server ไม่จำสถานะในอดีต แต่ละ Request เป็นอิสระ, ค. ลบข้อมูลทิ้ง, ง. ใส่รูปไม่ได้)
48. เทคโนโลยีใดใช้จดจำสถานะผู้ใช้บน HTTP? (ก. DNS Cache, ข. Cookies และ Sessions, ค. ARP, ง. NAT)
49. ดาวน์โหลดเว็บ HTML 1 ไฟล์ + รูป 5 รูป บน HTTP/1.0 Non-Persistent ใช้ TCP Connection กี่ครั้ง? (ก. 1, ข. 5, ค. 6 ครั้ง, ง. 0)
50. ข้อได้เปรียบของ Persistent HTTP/1.1 คืออะไร? (ก. ส่งหลาย Object บน TCP เดิมได้ ลดเวลา RTT, ข. ไม่ต้องใช้ IP, ค. เข้ารหัสลับ, ง. ไม่ต้องมี Server)
51. Request Line บรรทัดแรกประกอบด้วยอะไร? (ก. Status Code, Phrase, Ver, ข. Method, URL/Path, HTTP Version, ค. Host, IP, Port, ง. Content-Type)
52. Method ใดใช้ส่งข้อมูลฟอร์มขนาดใหญ่ใน Entity Body? (ก. GET, ข. POST, ค. HEAD, ง. OPTIONS)
53. HTTP Status Code 304 Not Modified หมายถึงอะไร? (ก. ไม่พบไฟล์, ข. Server พัง, ค. แคชยังใหม่อยู่ ไม่ต้องโหลดซ้ำ, ง. ไม่มีสิทธิ์)
54. Status Code 404 Not Found อยู่กลุ่มใด? (ก. 2xx, ข. 3xx, ค. 4xx Client Error, ง. 5xx)
55. Conditional GET ใช้ Header ใดตรวจเวลาแก้ไข? (ก. `Host:`, ข. `If-Modified-Since:`, ค. `User-Agent:`, ง. `Set-Cookie:`)
56. DNS คือฐานข้อมูลประเภทใดและทำหน้าที่อะไร? (ก. รวมศูนย์, ข. Distributed Hierarchical DB แปลง Hostname เป็น IP, ค. เก็บ Password, ง. บล็อกเว็บ)
57. การที่ Local DNS วิ่งไล่ถาม Root, TLD, Auth ด้วยตนเอง เรียกว่าอะไร? (ก. Recursive, ข. Iterated Query, ค. Reverse, ง. Anycast)
58. Record Type MX เก็บข้อมูลอะไร? (ก. IPv4, ข. Mail Server Hostname, ค. Name Server, ง. Alias)
59. โปรโตคอลใดใช้ส่งอีเมล (Push) ระหว่าง Server ที่พอร์ต TCP 25? (ก. POP3, ข. IMAP, ค. SMTP, ง. HTTP)
60. โปรโตคอลรับอีเมลที่เน้นซิงก์โฟลเดอร์บนเซิร์ฟเวอร์คืออะไร? (ก. POP3 110, ข. IMAP 143/993, ค. SMTP 25, ง. FTP 21)

### 📌 Part 4: Transport Layer (ข้อ 61–80)
61. ข้อใดอธิบาย Demux TCP vs UDP ถูกต้อง? (ก. UDP 4-tuple, ข. UDP ใช้ 2-tuple `(Dest IP, Dest Port)` ส่วน TCP ใช้ 4-tuple `(Src IP, Src Port, Dest IP, Dest Port)`)
62. UDP Header ยาวกี่ไบต์และมีกี่ฟิลด์? (ก. 20B, ข. 8 Bytes มี 4 ฟิลด์ Src Port, Dest Port, Length, Checksum)
63. Internet Checksum ใช้วิธีคำนวณแบบใด? (ก. CRC, ข. 1's Complement Sum พร้อม Carry Wraparound และกลับบิต)
64. จุดบกพร่องร้ายแรงของ rdt 2.0 คืออะไร? (ก. ส่งไฟล์ใหญ่ไม่ได้, ข. รับมือกรณี ACK/NAK เสียหายไม่ได้)
65. rdt 2.1 แก้ปัญหา ACK/NAK เสียหายด้วยสิ่งใด? (ก. Port, ข. Sequence Number 0 และ 1)
66. rdt 2.2 ต่างจาก rdt 2.1 อย่างไร? (ก. ตัด NAK ทิ้ง ใช้ Duplicate ACK ระบุหมายเลข Seq แทน)
67. rdt 3.0 เพิ่มสิ่งใดเพื่อจัดการ Packet Loss? (ก. SACK, ข. Countdown Timer)
68. ลักษณะของ Go-Back-N (GBN) คืออะไร? (ก. Buffer out of order, ข. ทิ้ง Out-of-order ทั้งหมด และส่งซ้ำทั้ง Window เมื่อ Timeout)
69. ใน Selective Repeat ขนาด Window $N$ ต้องไม่เกินเท่าใด? (ก. $2^k$, ข. $\le 2^{k-1}$ ครึ่งหนึ่งของ Sequence Space)
70. ลำดับ Three-Way Handshake ที่ถูกต้อง? (ก. SYN $\to$ SYN-ACK $\to$ ACK)
71. Client ISN=100 ส่ง SYN ฝั่ง Server จะตอบ SYN-ACK ด้วย Ack เท่าใด? (ก. 100, ข. 101)
72. ส่งข้อมูล 100 Bytes เริ่มที่ Seq=500 ฝั่งรับจะตอบ Ack เท่าใด? (ก. 500, ข. 501, ค. 600)
73. Cumulative ACK หมายถึงอะไร? (ก. ยืนยันเฉพาะตัวล่าสุด, ข. ยืนยันว่าได้รับครบต่อเนื่องถึงก่อนเลขที่ระบุ)
74. ทำไมต้องรอในสถานะ `TIME_WAIT` (2MSL) ก่อนปิด TCP? (ก. สายเย็น, ข. มั่นใจว่า ACK สุดท้ายถึง และรอแพ็กเก็ตเก่าในระบบสลายตัว)
75. EstimatedRTT คำนวณด้วยสูตรใด? (ก. Simple Average, ข. EWMA ค่า $\alpha = 0.125$)
76. Fast Retransmit ทำงานเมื่อได้รับอะไร? (ก. 1 Dup ACK, ข. 3 Duplicate ACKs รวมเป็น 4 ACKs ซ้ำกัน)
77. TCP Flow Control ทำงานอย่างไร? (ก. คุมตาม Router, ข. Receiver ส่งค่า Receive Window `rwnd` แจ้งพื้นที่ว่างบัฟเฟอร์)
78. AIMD ทำงานอย่างไร? (ก. เพิ่ม 1 MSS ต่อ RTT และลดลง 50% เมื่อเกิด Loss)
79. ช่วง Slow Start ค่า `cwnd` เปลี่ยนแปลงอย่างไร? (ก. เพิ่มคงที่, ข. เพิ่ม 2 เท่าทุก 1 RTT แบบ Exponential)
80. TCP Reno เมื่อเกิด 3 Duplicate ACKs จะทำอย่างไร? (ก. รีเซ็ตเป็น 1 MSS, ข. ตั้ง $\text{cwnd} = \text{ssthresh} + 3\text{ MSS}$ เข้าสู่ Fast Recovery วิ่งต่อใน Congestion Avoidance ทันที)

---

# 3. ตารางเฉลยข้อสอบ 80 ข้อ (Answer Keys Master Matrix)

| ข้อ | เฉลย | ข้อ | เฉลย | ข้อ | เฉลย | ข้อ | เฉลย |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | ค | **21** | ก | **41** | ค | **61** | ข |
| **2** | ก | **22** | ข | **42** | ข | **62** | ข |
| **3** | ค | **23** | ก | **43** | ข | **63** | ข |
| **4** | ค | **24** | ข | **44** | ค | **64** | ข |
| **5** | ง | **25** | ข | **45** | ข | **65** | ข |
| **6** | ข | **26** | ค | **46** | ค | **66** | ก |
| **7** | ข | **27** | ข | **47** | ข | **67** | ข |
| **8** | ก | **28** | ข | **48** | ข | **68** | ข |
| **9** | ข | **29** | ข | **49** | ค | **69** | ข |
| **10**| ค | **30** | ค | **50** | ก | **70** | ก |
| **11**| ก | **31** | ก | **51** | ข | **71** | ข |
| **12**| ข | **32** | ข | **52** | ข | **72** | ค |
| **13**| ข | **33** | ค | **53** | ค | **73** | ข |
| **14**| ข | **34** | ข | **54** | ค | **74** | ข |
| **15**| ข | **35** | ค | **55** | ข | **75** | ข |
| **16**| ค | **36** | ข | **56** | ข | **76** | ข |
| **17**| ข | **37** | ค | **57** | ข | **77** | ข |
| **18**| ข | **38** | ข | **58** | ข | **78** | ก |
| **19**| ข | **39** | ข | **59** | ค | **79** | ข |
| **20**| ค | **40** | ข | **60** | ข | **80** | ข |

---

# 4. เฉลยและวิเคราะห์คลังข้อสอบจริง (Real Quiz Master Solutions)

### 📋 Quiz 1: Fundamental of Networking
1. *Protocol คือข้อกำหนดในการรับส่งข้อมูลระหว่างอุปกรณ์เครือข่าย* $\to$ **ถูก** (Protocol กำหนด Format และ Rules)
2. *Access Point เป็นอุปกรณ์ในส่วนของ Network Core* $\to$ **ผิด** (AP อยู่ในส่วนของ **Access Network / Network Edge**)
3. *Network Edge คืออุปกรณ์ที่เชื่อมเครือข่ายต่างๆ เข้าด้วยกัน* $\to$ **ผิด** (Network Edge คือ **End Systems / Hosts** ส่วนอุปกรณ์เชื่อมต่อเครือข่ายคือ Network Core Routers)
4. *Internet เป็นเครือข่ายแบบ Packet Switched Network* $\to$ **ถูก**
5. *Packet Loss เกิดจากการที่ buffer ที่เก็บคิวในอุปกรณ์เครือข่ายเต็ม* $\to$ **ถูก**

### 📋 Quiz 2: Application Layer Architecture
1. *Client คือเครื่องคอมพิวเตอร์ที่มักจะเปิดไว้ตลอดเวลา เพื่อรอให้บริการกับเครื่องคอมพิวเตอร์อื่น* $\to$ **ผิด** (คำนิยามนี้คือ **Server**)
2. *ในการรับส่งข้อมูลแบบ Peer-to-peer คอมพิวเตอร์แต่ละเครื่องทำหน้าที่เป็นทั้งผู้ให้บริการ และผู้รับบริการ* $\to$ **ถูก** (Servent)
3. *UDP เป็นการรับส่งข้อมูลที่มี Reliability มี flow control และ congestion control* $\to$ **ผิด** (คุณสมบัตินี้เป็นของ **TCP**)
4. *HTTP เป็นโพรโทคอลที่ใช้ในการรับส่งข้อมูลเว็บ* $\to$ **ถูก**
5. *HTTP เป็นโพรโทคอลแบบ Stateless ดังนั้นเมื่อต้องการให้มีการเก็บสถานะของการเชื่อมต่อ จึงต้องมีกลไกอื่นเข้ามาช่วย* $\to$ **ถูก** (ใช้ Cookies และ Sessions)

### 📋 Quiz 3: Web, DNS, Email & CDN
1. *Web Cache หรือ Proxy Server สามารถลดดีเลย์ในการติดต่อกับ Web Server ลงได้* $\to$ **ถูก**
2. *SMTP เป็นโพรโทคอลที่ใช้ในการรับส่งอีเมลระหว่าง Mail Server* $\to$ **ถูก** (Server-to-Server Relay TCP Port 25)
3. *IMAP เป็นโพรโทคอลที่ใช้ส่งอีเมล* $\to$ **ผิด** (IMAP เป็น **Pull Protocol ใช้ดึงและซิงก์อีเมลลงเครื่อง**)
4. *DNS ใช้ในการเปลี่ยน IP Address ไปเป็น URL* $\to$ **ผิด** (DNS ทำหน้าที่แปลง **Hostname/URL เป็น IP Address**)
5. *การมี CDN ช่วยลดเวลาการเข้าถึงไฟล์ Video ของผู้ใช้ลง* $\to$ **ถูก** (นำเนื้อหาไปวางใกล้ผู้ใช้)

### 📋 Quiz 4: Transport Layer & Sockets
1. *การทำงานของ Transport Layer เป็นการติดต่อสื่อสารระหว่าง Application Process ระหว่างอุปกรณ์ Network Edge* $\to$ **ถูก** (Process-to-Process Logical Communication)
2. *โพรโทคอล TCP เป็นโพรโทคอลแบบ Connection-oriented* $\to$ **ถูก**
3. *โพรโทคอล UDP ใช้ Source IP Address, Source Port, Destination IP Address และ Destination Port ในการทำ Multiplexing* $\to$ **ผิด** (UDP Demux ใช้เพียง **2-tuple: Dest IP และ Dest Port**)
4. *UDP ส่งข้อมูลในแบบ Best Effort* $\to$ **ถูก**
5. *HTTP/3 ใช้โพรโทคอล TCP ในชั้นทรานสปอร์ต* $\to$ **ผิด** (HTTP/3 ใช้ **QUIC เหนือ UDP**)

### 📋 Quiz 5: TCP Reliability & Congestion Control
1. *การส่งข้อมูลแบบ Go-Back-N จะมีการส่งข้อมูลซ้ำเฉพาะ packet ที่ไม่ได้รับ ACK เท่านั้น* $\to$ **ผิด** (GBN ส่งซ้ำ **ทุกแพ็กเก็ตใน Window ตั้งแต่ Base**; การส่งซ้ำเฉพาะตัวที่เสียคือ Selective Repeat)
2. *TCP ใช้ Sequence Number และ Acknowledgement Number ในการส่งข้อมูลแบบ Reliable* $\to$ **ถูก**
3. *RTT คือเวลาตั้งแต่ segment ถูกส่งออกไป นับต่อเนื่องไปจนได้รับ ACK ตอบกลับมา* $\to$ **ถูก**
4. *การที่มี Duplicate Ack เกิดขึ้นแสดงว่ามี packet loss เกิดขึ้น* $\to$ **ถูก**
5. *Fast Retransmission เกิดขึ้นเมื่อผู้ส่งได้รับ 3 Duplicate ACKs* $\to$ **ถูก**

### 📋 Quiz 6: Network Data Plane
1. *Forwarding คือการรับข้อมูลจากฝั่งขาเข้าของอุปกรณ์ แล้วส่งออกไปยังฝั่งขาออกของอุปกรณ์* $\to$ **ถูก**
2. *Data Plane ทำหน้าที่ตัดสินใจว่า Datagram จากเครื่องต้นทางจะถูกส่งไปยังเครื่องปลายทาง จะต้องผ่านเราเตอร์ตัวใดในเครือข่ายบ้าง* $\to$ **ผิด** (หน้าที่นี้คือ **Routing ใน Control Plane**)
3. *IPv6 ลดความซับซ้อนของ Header ลงจาก IPv4 โดยตัดบางฟิลด์ทิ้งไป* $\to$ **ถูก** (Header คงที่ 40 ไบต์ ตัด Checksum และ Fragmentation ออก)
4. *ในอินเตอร์เน็ต การให้บริการในชั้น Network เป็นแบบ Best Effort* $\to$ **ถูก**
5. *Priority Scheduling คือการที่อุปกรณ์ให้บริการแก่ datagram ตามลำดับก่อนหลัง datagram ใดเข้ามาใน buffer ก่อนก็จะถูกส่งออกไปก่อน* $\to$ **ผิด** (การส่งตามลำดับก่อนหลังคือ FIFO; Priority จะส่งแพ็กเก็ตที่มีความสำคัญสูงกว่าออกไปก่อนเสมอ)

### 📋 Quiz 7: Control Plane & Routing
1. *Per-Router Control Plane มีการแยกส่วนของ Control Plane ออกจากเราเตอร์ ไปทำงานใน Remote Controller แทน* $\to$ **ผิด** (คำนิยามนี้คือ **Software-Defined Networking: SDN**)
2. *หน้าที่ของ Routing Protocol คือเลือกเส้นทางที่ดีจากเครื่องต้นทางไปยังเครื่องปลายทาง ผ่านทางเครือข่ายของเราเตอร์* $\to$ **ถูก**
3. *Dynamic Routing คือการเลือกเส้นทางโดยใช้ Routing Protocol ในการเลือกเส้นทาง* $\to$ **ถูก**
4. *Dijkstra Algorithm ถูกใช้งานใน Distance Vector Routing Protocol* $\to$ **ผิด** (Dijkstra ใช้ใน **Link-State Routing Protocol**)
5. *มีโอกาสเกิดลูปใน Distance Vector Routing Protocol* $\to$ **ถูก** (เกิดปัญหา Count-to-Infinity & Routing Loop ได้)

### 📋 Quiz 8: Routing Protocols
1. *OSPF และ EIGRP เป็น Link-State Routing Protocol* $\to$ **ผิด** (OSPF เป็น Link-State แต่ EIGRP เป็น Advanced Distance Vector)
2. *EIGRP เคยเป็น Cisco-proprietary ในอดีต แต่ปัจจุบันเป็น Open standard แล้ว* $\to$ **ถูก**
3. *RIP และ IGRP เป็น Distance Vector Routing Protocol* $\to$ **ถูก**
4. *BGP เป็น Intra-AS Routing Protocol ตัวเดียวที่ใช้กันอยู่ในปัจจุบัน* $\to$ **ผิด** (BGP เป็น **Inter-AS Routing Protocol**)
5. *AS-Path ที่สั้นที่สุดเป็นกลไกแรกที่ BGP ใช้ในการเลือกเส้นทาง* $\to$ **ผิด** (BGP ตรวจสอบ **Local Preference Policy ก่อนเป็นอันดับแรก**)

### 📋 Quiz 9: Link Layer & MAC
1. *การส่งข้อมูลแบบ Full-Duplex เป็นการส่งข้อมูลไปกลับ 2 ทิศทาง ส่วน Half-Duplex เป็นการส่งข้อมูลแบบทิศทางเดียว* $\to$ **ผิด** (Half-Duplex เป็น **สองทิศทางสลับกัน** ไม่ใช่ทิศทางเดียว)
2. *Protocol Data Unit ของ Link Layer เรียกว่า Frame* $\to$ **ถูก**
3. *การส่งข้อมูลใน Link Layer เป็นการส่งข้อมูลแบบ End-to-end* $\to$ **ผิด** (Link Layer ส่งแบบ **Node-to-Node Hop-by-Hop**)
4. *Link แบบ Point-to-point เป็นช่องสัญญาณที่มีอุปกรณ์มากกว่า 2 ตัวเชื่อมอยู่บนช่องสัญญาณเดียวกัน* $\to$ **ผิด** (Point-to-Point มีเพียง **2 อุปกรณ์**)
5. *Slotted ALOHA เป็น MAC Protocol แบบ Random Access ที่มีการยืมวิธีการแบบ TDMA มาใช้* $\to$ **ถูก** (แบ่งเวลาเป็น Slot แบบ Time Slot)

### 📋 Quiz 10: Ethernet, Switch & VLAN
1. *Preamble ในเฮดเดอร์ของ Ethernet ใช้ในการทำ Synchronize* $\to$ **ถูก** (ซิงโครไนซ์สัญญาณนาฬิกา 8 ไบต์)
2. *CRC ที่ใช้ในการทำ Error Detection and Correction อยู่ในเฮดเดอร์ของ Ethernet Frame* $\to$ **ผิด** (CRC อยู่ในส่วนท้ายของเฟรม **Frame Trailer**)
3. *Ethernet Switch เป็นอุปกรณ์ในระดับ Link Layer ที่ทำหน้ารับส่งเฟรม* $\to$ **ถูก**
4. *VLAN คือการแบ่งเครือข่ายบน Switch ออกเป็นเครือข่ายย่อยๆ* $\to$ **ถูก**
5. *Trunk Port คือ Port ที่รองรับการรับส่งข้อมูลจากหลายๆ VLAN* $\to$ **ถูก** (ใช้มาตรฐาน IEEE 802.1Q Tagged)

### 📋 Quiz 11: Wireless LAN & Bluetooth
1. *MAC Protocol ใน Wireless LAN คือ CSMA/CD* $\to$ **ผิด** (Wireless LAN ใช้ **CSMA/CA** เพราะการ์ดไร้สายไม่สามารถตรวจจับการชนขณะส่งสัญญาณได้)
2. *Bluetooth ใช้การส่งข้อมูลแบบ Single Hop ที่ไม่มี Infrastructure* $\to$ **ถูก** (Piconet Ad-hoc)
3. *SNR คือค่าที่แสดงจำนวนของ Bit Error* $\to$ **ผิด** (SNR คือ **Signal-to-Noise Ratio** อัตราส่วนกำลังสัญญาณต่อสัญญาณรบกวน)
4. *Hidden Terminal เป็นปัญหาที่อุปกรณ์ไม่ได้ยินว่ามีอุปกรณ์อื่นใช้ช่องสัญญาณอยู่ จึงส่งข้อมูลลงไป แล้วเกิดการชนกันที่ปลายทาง* $\to$ **ถูก**
5. *การทำ Active Scanning จะทำเมื่อตัว Access Point จะไม่มีการประกาศ Beacon ออกมา* $\to$ **ถูก** (Client ส่ง Probe Request ออกไปเอง)
