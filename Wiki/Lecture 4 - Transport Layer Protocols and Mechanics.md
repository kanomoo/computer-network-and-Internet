---
tags:
  - networking
  - lecture
  - lecture-4
  - transport-layer
  - tcp
  - udp
  - rdt
  - handshake
  - congestion-control
  - flow-control
created: 2026-08-03
updated: 2026-08-17
lecture: 4
type: lecture
---

# Lecture 4: Transport Layer Protocols and Mechanics (Slides 1–154 Complete Guide)

> [!INFO] 📂 แหล่งไฟล์อ้างอิงต้นฉบับ (Source Documents in New/ & Root)
> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_3_ Transport_Layer_1-154.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_3_%20Transport_Layer_1-154.html) *(ครบทุกสไลด์ 1–154)*
> - **ไฟล์สไลด์ PDF:** [Chapter_3_Transport_Layer.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_Transport_Layer.pdf) & [Chapter_3_v9.0_st.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_3_v9.0_st.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 3: Transport Layer
> - **สไลด์สรุปอาจารย์:** [2026_DATACOM_Layer4_Transport_layer.pdf](file:///c:/Project/computer-network-&-Internet/New/2026_DATACOM_Layer4_Transport_layer.pdf)

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์เดี่ยว Slide 1 ถึง Slide 154 รวม 154 หน้า ไม่มีข้าม)
> โน้ตความรู้นี้เรียงเนื้อหาตาม **Slide 1 ถึง Slide 154** โดยไม่ข้ามหมายเลขสไลด์ และเสริมตาราง แผนภาพ สูตร และคำอธิบายในจุดที่ช่วยให้ติดตามแนวคิดได้ชัดเจน ตรวจสอบโครงสร้าง Markdown ด้วย parser และตัวตรวจลิงก์ใน `tools/`

---

## 📄 Slide 1: Chapter 3: Transport Layer

*📄 Slide 1*

ภาพรวม Transport Layer Transport Layer Overview สไลด์นี้เป็นหน้าปกของ จากหนังสือ Computer Networking: A Top-Down Approach ฉบับที่ 9 ของ Jim Kurose และ Keith Ross ซึ่งจัดพิมพ์โดย Pearson ในปี 2025 ส่วนภาพด้านขวาคือปกหนังสือที่เป็นแหล่งอ้างอิงของเนื้อหาในบทนี้ และข้อความด้านล่างระบุว่าสไลด์ชุดนี้เป็น Version 9.0 ที่ปรับปรุงให้สอดคล้องกับหนังสือฉบับที่ 9 เมื่อเดือนมิถุนายน 2025


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ด้านซ้ายเป็นชื่อบทและข้อความชี้แจงการใช้งานสไลด์ ผู้จัดทำอนุญาตให้อาจารย์ นักศึกษา และผู้อ่านนำไฟล์ PowerPoint ไปใช้ แก้ไข เพิ่ม หรือลบเนื้อหาได้ แต่เมื่อใช้ในการสอนหรือเผยแพร่บนเว็บไซต์ควรระบุว่าเนื้อหามาจากสไลด์ของ Kurose และ Ross พร้อมแสดงข้อมูลลิขสิทธิ์ ข้อความส่วนนี้จึงเป็นข้อมูลเกี่ยวกับแหล่งที่มาและสิทธิ์การใช้งาน ไม่ใช่เนื้อหาทางเทคนิคของ Transport Layer

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - บทนี้ศึกษา Transport Layer หรือชั้นขนส่ง เนื้อหาอ้างอิงจากหนังสือ Computer Networking: A Top-Down Approach ฉบับที่ 9 การนำสไลด์ไปใช้หรือเผยแพร่ควรระบุแหล่งที่มาและลิขสิทธิ์

---

## 📄 Slide 2: Transport layer: overview

*📄 Slide 2*

สไลด์นี้อธิบายเป้าหมายของบท โดยแบ่งออกเป็นสองส่วนใหญ่ ส่วนแรกคือการเข้าใจ หลักการเบื้องหลังบริการของ Transport Layer และส่วนที่สองคือการศึกษาว่าหลักการเหล่านั้นถูกนำไปใช้ในโพรโทคอลของอินเทอร์เน็ตอย่างไร หลักการสำคัญทางด้านซ้ายประกอบด้วย Multiplexing และ Demultiplexing ซึ่งเกี่ยวข้องกับการรับข้อมูลจากหลาย Application Process และส่งข้อมูลที่มาถึงไปยัง Process ที่ถูกต้อง, Reliable Data Transfer ซึ่งทำให้การส่งข้อมูลรับมือกับความผิดพลาดหรือการสูญหายได้, Flow Control ซึ่งป้องกันไม่ให้ผู้ส่งส่งข้อมูลเร็วกว่าที่ผู้รับจะจัดการได้ และ Congestion Control ซึ่งควบคุมอัตราการส่งเมื่อเครือข่ายมีความคับคั่ง


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์แบ่งเป็นสองคอลัมน์อย่างชัดเจน คอลัมน์ซ้ายคือ “แนวคิดหรือหลักการ” ที่ต้องเรียนรู้ ส่วนคอลัมน์ขวาคือ “โพรโทคอลจริง” ที่ใช้แนวคิดเหล่านั้น ได้แก่ UDP ซึ่งเป็นการส่งแบบไม่สร้างการเชื่อมต่อหรือ connectionless transport , TCP ซึ่งเป็นการส่งแบบสร้างการเชื่อมต่อและเชื่อถือได้หรือ connection-oriented reliable transport และกลไก TCP Congestion Control

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - เรียนหลักการก่อน แล้วจึงดูการนำไปใช้จริงใน UDP และ TCP Flow Control เน้นความสามารถของผู้รับ ส่วน Congestion Control เน้นสภาพของเครือข่าย UDP และ TCP ให้บริการ Transport Layer ในลักษณะที่แตกต่างกัน

---

## 📄 Slide 3: Transport layer: roadmap

*📄 Slide 3*

สไลด์ Roadmap แสดงลำดับเนื้อหาที่จะศึกษาใน Chapter 3 ตั้งแต่พื้นฐานไปจนถึงกลไกที่ซับซ้อนขึ้น รายการถูกเรียงจากบนลงล่างเพื่อให้เห็นเส้นทางการเรียนของทั้งบท เนื้อหาเริ่มจาก Transport-Layer Services เพื่อทำความเข้าใจหน้าที่ของชั้นขนส่ง จากนั้นเรียน Multiplexing and Demultiplexing ก่อนเข้าสู่ UDP ซึ่งเป็นโพรโทคอลแบบ connectionless ต่อด้วยหลักการ Reliable Data Transfer แล้วจึงนำหลักการเหล่านั้นไปอธิบาย TCP หลังจากนั้นจะศึกษาหลักการและกลไกของ Congestion Control และจบด้วยพัฒนาการของฟังก์ชันใน Transport Layer


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพปกหนังสือทางขวาทำหน้าที่เป็นภาพประจำบท ส่วนรายการหัวข้อทางซ้ายคือโครงสร้างหลักของเนื้อหา การเรียง UDP ก่อน Reliable Data Transfer และ TCP ช่วยให้ผู้เรียนเห็นความแตกต่างระหว่างโพรโทคอลที่เรียบง่ายกับโพรโทคอลที่เพิ่มความเชื่อถือได้และการควบคุมการส่ง

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - เริ่มจากบริการพื้นฐานและการส่งข้อมูลให้ถูก Process ศึกษา UDP ก่อนพัฒนาหลักการ Reliable Data Transfer นำหลักการความเชื่อถือได้ไปเชื่อมโยงกับ TCP ส่วนท้ายของบทเน้น Congestion Control และพัฒนาการของ Transport Layer

---

## 📄 Slide 4: Transport services and protocols

*📄 Slide 4*

Transport Layer ให้บริการ logical communication หรือการสื่อสารเชิงตรรกะระหว่าง Application Process ที่ทำงานอยู่บน Host คนละเครื่อง คำว่า “เชิงตรรกะ” หมายความว่า จากมุมมองของแอปพลิเคชันจะดูเสมือนว่า Process ที่ปลายทั้งสองด้านสื่อสารกันโดยตรง แม้ข้อมูลจริงจะต้องเดินทางผ่านเครือข่ายย่อย เราเตอร์ ผู้ให้บริการอินเทอร์เน็ต และลิงก์หลายประเภท การทำงานของ Transport Protocol เกิดขึ้นที่ end systems หรือเครื่องปลายทาง ฝั่งส่งรับ Application Message มา แบ่งหรือบรรจุข้อมูลเป็น Segment แล้วส่งต่อให้ Network Layer ส่วนฝั่งรับนำ Segment มาประกอบกลับเป็น Message และส่งขึ้นไปยัง Application Layer โดยแอปพลิเคชันอินเทอร์เน็ตมีโพรโทคอลหลักให้เลือกสองตัว คือ TCP และ UDP อ่านไดอะแกรมด้านขวา ภาพแสดงอุปกรณ์เคลื่อนที่ด้านบนและ Server ใน Data Center ด้านล่าง ซึ่งแต่ละเครื่องมี Protocol Stack ตั้งแต่ Application, Transport, Network, Data Link จนถึง Physical Layer ลูกศรสีแดงขนาดใหญ่เชื่อมเฉพาะ Transport Layer ของเครื่องปลายทั้งสอง และเขียนว่า “logical end-end transport” เพื่อเน้นว่าการสื่อสารของ Transport Layer เป็นแบบปลายทางถึงปลายทาง ส่วนภาพเครือข่ายและเราเตอร์ที่อยู่ระหว่างกลางถูกทำให้จางลง เพราะรายละเอียดเส้นทางจริงถูกซ่อนจาก Application Process


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Transport Layer ให้ Process-to-Process logical communication กลไก Transport Protocol ทำงานที่เครื่องปลายทาง ไม่ได้ทำงานเป็นชั้น Transport ในทุกเราเตอร์ระหว่างทาง ฝั่งส่งสร้าง Segment ส่วนฝั่งรับประกอบและส่ง Message ขึ้น Application Layer TCP และ UDP เป็นโพรโทคอล Transport หลักของอินเทอร์เน็ต

---

## 📄 Slide 5: Transport vs. network layer services and protocols

*📄 Slide 5*

สไลด์นี้เริ่มใช้อุปมา household analogy เพื่อช่วยแยกความแตกต่างระหว่างการส่งข้อมูลถึงเครื่องปลายทางกับการส่งข้อมูลถึงโปรแกรมภายในเครื่อง สมมติว่าบ้านของ Ann และบ้านของ Bill มีเด็กบ้านละ 12 คน และเด็กแต่ละคนต้องการส่งจดหมายถึงเด็กคนใดคนหนึ่งในอีกบ้าน


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพหญิงชรากับเด็กจำนวนมากใช้แทน “หนึ่งบ้านที่มีสมาชิกหลายคน” ซึ่งคล้ายกับหนึ่ง Host ที่มีหลาย Process ทำงานพร้อมกัน ในกรอบด้านขวาระบุความสัมพันธ์ว่า Host เปรียบเหมือนบ้าน , Process เปรียบเหมือนเด็กแต่ละคน และ Application Message เปรียบเหมือนจดหมายที่อยู่ในซอง ดังนั้นการนำจดหมายไปถึงบ้านที่ถูกต้องยังไม่เพียงพอ เพราะต้องรู้ด้วยว่าจดหมายนั้นเป็นของเด็กคนใด ภายในเครือข่ายก็เช่นเดียวกัน ข้อมูลต้องไปถึงทั้ง Host ที่ถูกต้องและ Process ที่ถูกต้อง อุปมานี้เป็นพื้นฐานสำหรับทำความเข้าใจว่า Network Layer และ Transport Layer มีขอบเขตหน้าที่ต่างกัน แม้ทั้งสองชั้นจะทำงานร่วมกันเพื่อส่งข้อมูลจากต้นทางไปยังปลายทาง

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - หนึ่ง Host สามารถมีหลาย Application Process ทำงานพร้อมกัน การส่งข้อมูลถึง Host ยังไม่เท่ากับการส่งถึง Process ที่ต้องการ Host = บ้าน, Process = เด็ก, Application Message = จดหมายในซอง

---

## 📄 Slide 6: Transport vs. network layer services and protocols

*📄 Slide 6*

สไลด์นี้สรุปความแตกต่างหลักระหว่างสองชั้นว่า Network Layer ให้การสื่อสารระหว่าง Host กับ Host ขณะที่ Transport Layer ให้การสื่อสารระหว่าง Process กับ Process กล่าวง่าย ๆ คือ Network Layer พาข้อมูลไปถึงเครื่องปลายทาง ส่วน Transport Layer จัดการให้ข้อมูลไปถึงโปรแกรมหรือ Process ที่ถูกต้องภายในเครื่องนั้น Transport Layer ต้อง relies on หรืออาศัยบริการของ Network Layer เพราะ Segment ต้องถูกส่งผ่านเครือข่ายไปยัง Host ปลายทาง และ Transport Layer อาจ enhances หรือเพิ่มความสามารถเหนือบริการของ Network Layer เช่น การส่งอย่างเชื่อถือได้ การควบคุมการไหล หรือการควบคุมความคับคั่ง ทั้งนี้ขึ้นอยู่กับโพรโทคอลที่เลือกใช้ เชื่อมโยงกับ household analogy ในอุปมา บริการไปรษณีย์ทำหน้าที่นำจดหมายจากบ้านของ Ann ไปยังบ้านของ Bill จึงเปรียบเหมือน Network Layer ที่ส่งแบบ Host-to-Host เมื่อจดหมายมาถึงบ้านแล้ว Ann หรือ Bill ต้องแจกจ่ายให้เด็กผู้รับที่ถูกต้อง จึงเปรียบเหมือน Transport Layer ที่ส่งแบบ Process-to-Process กรอบด้านขวายังคงแสดงการเทียบ Host, Process และ Application Message เพื่อให้เชื่อมโยงกับสไลด์ก่อนหน้า


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Network Layer: Host-to-Host Communication Transport Layer: Process-to-Process Communication Transport Layer อาศัยบริการ Network Layer และสามารถเพิ่มบริการบางอย่างได้ สองชั้นนี้ไม่ได้ทำงานแทนกัน แต่ทำงานต่อเนื่องกัน

---

## 📄 Slide 7: Transport Layer Actions — Sender

*📄 Slide 7*

สไลด์นี้แสดงขั้นตอนการทำงานของ Transport Layer ที่ ฝั่งส่งหรือ Sender โดยเริ่มจาก Application Layer ส่ง Application-Layer Message หรือในภาพเขียนว่า app. msg ลงมาให้ Transport Layer Transport Layer จะกำหนดค่าฟิลด์ต่าง ๆ ใน Segment Header แล้วนำ Header มาต่อกับ Application Message เพื่อสร้าง Transport-Layer Segment ในภาพ Header ถูกแทนด้วย T h ดังนั้นกล่อง T h + app. msg หมายถึง Segment ที่ประกอบด้วย Transport Header และข้อมูลจาก Application Layer จากนั้น Segment จะถูกส่งลงไปให้ IP ที่ Network Layer อ่านไดอะแกรมตามลำดับ ภาพมี End System สองฝั่งเชื่อมผ่านก้อนเมฆซึ่งแทนเครือข่าย แต่ฝั่งขวาถูกทำให้เด่นเพื่อให้ติดตามการทำงานของ Sender ข้อมูลเริ่มจากกล่อง app. msg ใน Application Layer เคลื่อนลงสู่ Transport Layer แล้วมี T h ถูกเพิ่มด้านหน้า กระบวนการเพิ่ม Header ให้ข้อมูลจากชั้นบนเรียกว่า encapsulation เมื่อสร้าง Segment เสร็จ Transport Layer จะส่งต่อให้ IP รับผิดชอบการนำข้อมูลไปยัง Host ปลายทาง ลำดับการทำงานของ Sender รับ Application-Layer Message จากชั้นบน กำหนดค่าฟิลด์ของ Transport Header รวม Header กับ Message เพื่อสร้าง Segment ส่ง Segment ต่อให้ IP


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

---

## 📄 Slide 8: Transport Layer Actions — Receiver

*📄 Slide 8*

สไลด์นี้แสดงการทำงานที่ ฝั่งรับหรือ Receiver ซึ่งเป็นกระบวนการย้อนกลับจากฝั่งส่ง เมื่อ Network Layer ส่ง Segment ขึ้นมา Transport Layer จะได้รับข้อมูลในรูป T h + app. msg แล้วตรวจสอบค่าต่าง ๆ ที่อยู่ใน Header หลังจากตรวจสอบ Header แล้ว Transport Layer จะแยกหรือสกัด Application-Layer Message ออกจาก Segment จากนั้นทำ Demultiplexing เพื่อส่ง Message ขึ้นไปยัง Application Process ที่ถูกต้องผ่าน Socket ดังนั้นหน้าที่ของ Receiver ไม่ใช่เพียงรับข้อมูลเข้ามาในเครื่อง แต่ต้องเลือกปลายทางภายในเครื่องให้ถูกต้องด้วย อ่านไดอะแกรมตามลำดับ ฝั่งซ้ายของภาพถูกทำให้เด่นเพื่อแสดง Receiver ส่วนฝั่งขวาถูกทำให้จาง Segment ที่ประกอบด้วย T h และ app. msg เดินทางขึ้นจาก Network Layer สู่ Transport Layer จากนั้น Header ถูกใช้ประกอบการตรวจสอบและตัดสินใจ ก่อนที่ app. msg จะถูกส่งผ่านจุดเชื่อมต่อที่แทน Socket ขึ้นไปยัง Application Layer วงกลมและลูกศรสีแดงเน้นขั้นตอน Demultiplexing จาก Transport Layer ไปยัง Application ลำดับการทำงานของ Receiver รับ Segment จาก IP ตรวจสอบค่าฟิลด์ใน Transport Header สกัด Application-Layer Message ออกจาก Segment Demultiplex Message ผ่าน Socket ไปยัง Application Process ที่ถูกต้อง


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

---

## 📄 Slide 9: Two principal Internet transport protocols

*📄 Slide 9*

อินเทอร์เน็ตมี Transport Protocol หลักสองตัว ได้แก่ TCP: Transmission Control Protocol และ UDP: User Datagram Protocol ทั้งสองตัวให้ logical end-to-end transport ระหว่าง Application Process แต่มีระดับบริการและกลไกภายในแตกต่างกัน TCP ให้การส่งข้อมูลแบบ reliable และ in-order delivery คือพยายามทำให้ข้อมูลถึงปลายทางอย่างถูกต้องและส่งขึ้น Application ตามลำดับ นอกจากนี้ยังมี Flow Control เพื่อไม่ให้ Sender ส่งข้อมูลเร็วจน Receiver รับไม่ไหว, มี Congestion Control เพื่อปรับการส่งตามสภาพความคับคั่งของเครือข่าย และต้องทำ Connection Setup ก่อนเริ่มแลกเปลี่ยนข้อมูล UDP เป็นโพรโทคอลแบบเรียบง่ายหรือ no-frills extension ของบริการ best-effort IP โดยไม่รับประกันว่าข้อมูลจะถึงปลายทางหรือถึงตามลำดับ คำว่า unreliable ในที่นี้ไม่ได้แปลว่าข้อมูลจะหายเสมอ แต่หมายถึงตัวโพรโทคอลไม่มีการรับประกันและกลไกกู้คืนแบบ TCP อ่านไดอะแกรมด้านขวา ภาพใช้เครือข่ายชุดเดียวกับสไลด์ก่อนหน้า โดยลูกศรสีแดง “logical end-end transport” เชื่อม Transport Layer ของอุปกรณ์ปลายทางทั้งสอง แสดงว่าไม่ว่าจะเลือก TCP หรือ UDP แอปพลิเคชันยังมองเห็นการสื่อสารแบบ Process-to-Process ผ่านเครือข่ายหลายชนิด ส่วนรายการด้านล่างระบุว่า ทั้ง TCP และ UDP ไม่ให้การรับประกันด้าน Delay และ Bandwidth กล่าวคือไม่สามารถรับรองเวลาที่ข้อมูลจะถึงหรืออัตรารับส่งขั้นต่ำที่แน่นอนได้ เปรียบเทียบที่ควรจำ TCP: reliable, in-order, มี Flow Control, Congestion Control และ Connection Setup UDP: ไม่รับประกัน Delivery และ Order และมีกลไกน้อยกว่า TCP ทั้ง TCP และ UDP ไม่รับประกัน Delay หรือ Bandwidth Application เลือกใช้ TCP หรือ UDP ตามบริการที่ต้องการ


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

---

## 📄 Slide 10: Chapter 3: roadmap

*📄 Slide 10*

Multiplexing และ Demultiplexing Multiplexing and Demultiplexing สไลด์ Roadmap นี้ทำหน้าที่บอกตำแหน่งปัจจุบันของบทเรียน โดยหัวข้อ Transport-Layer Services ที่เรียนมาแล้วถูกทำให้เป็นสีเทา ส่วน Multiplexing and Demultiplexing ถูกแสดงเป็นตัวอักษรสีเข้ม แสดงว่าหัวข้อถัดไปจะลงรายละเอียดเกี่ยวกับการเชื่อมโยงข้อมูลระหว่าง Application Process, Socket และ Transport-Layer Segment


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> หัวข้ออื่นใน Roadmap ถูกทำให้จางเพื่อไม่ให้รบกวนจุดสนใจ ขณะที่ Multiplexing and Demultiplexing เป็นหัวข้อเดียวที่เด่น ภาพปกหนังสือทางขวายังคงทำหน้าที่เป็นเครื่องหมายของ Roadmap ประจำบท การเปลี่ยนสีเช่นนี้จึงเป็นสัญญาณว่าเนื้อหาภาพรวมจบแล้วและกำลังเข้าสู่กลไกแรกของ Transport Layer Multiplexing คือการที่ Transport Layer ฝั่งส่งรับข้อมูลจากหลาย Socket หรือหลาย Process แล้วเพิ่มข้อมูล Header ที่จำเป็น ส่วน Demultiplexing คือการที่ฝั่งรับใช้ข้อมูลใน Header เพื่อส่ง Segment ที่มาถึงไปยัง Socket และ Process ที่ถูกต้อง รายละเอียดของสองกระบวนการนี้จะอธิบายในสไลด์ถัดไป

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - เรียนส่วน Transport-Layer Services เสร็จแล้ว หัวข้อถัดไปคือ Multiplexing และ Demultiplexing Multiplexing เกิดที่ฝั่งส่ง ส่วน Demultiplexing เกิดที่ฝั่งรับ Socket และข้อมูลใน Header เป็นองค์ประกอบสำคัญของกระบวนการนี้

---

## 📄 Slide 11: Multiplexing/Demultiplexing

*📄 Slide 11*

สไลด์นี้แนะนำกลไกสำคัญสองอย่างของ Transport Layer ซึ่งทำงานเป็นคู่กัน คือ Multiplexing ที่ฝั่งส่ง และ Demultiplexing ที่ฝั่งรับ กลไกทั้งสองทำให้หลาย Application Process บนโฮสต์เดียวกันสามารถใช้บริการเครือข่ายร่วมกันได้ โดยข้อมูลของแต่ละ Process ยังถูกส่งไปยังปลายทางที่ถูกต้อง ที่ฝั่งส่ง Transport Layer รับข้อมูลจากหลาย Socket แล้วสร้าง Transport-Layer Segment ให้ข้อมูลแต่ละชุด โดยเพิ่ม Transport Header ซึ่งบรรจุข้อมูลที่จำเป็นสำหรับการส่งและการแยกข้อมูลในภายหลัง จากนั้น Segment เหล่านี้จึงถูกส่งต่อไปยัง Network Layer กระบวนการนี้เรียกว่า Multiplexing ที่ฝั่งรับ Transport Layer รับ Segment ที่มาจาก Network Layer แล้วอ่านข้อมูลใน Header เพื่อพิจารณาว่า Segment นั้นควรถูกส่งให้ Socket ใด จากนั้นจึงส่ง Payload ขึ้นไปยัง Application Process ที่เกี่ยวข้อง กระบวนการนี้เรียกว่า Demultiplexing

| ฝั่งการทำงาน | ชื่อกลไก | กระบวนการและโครงสร้างข้อมูล |
| :--- | :--- | :--- |
| 📤 **Sender** | **Multiplexing** | รวบรวมข้อมูลจากหลาย Socket ใส่ Header (Port ต้นทาง/ปลายทาง) แล้วส่งลง Network Layer |
| 📥 **Receiver** | **Demultiplexing** | ตรวจสอบ Port ใน Header แล้วส่งมอบข้อมูล Segment ไปยัง Socket ที่ถูกต้อง |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ในภาพมีโฮสต์สามเครื่อง รูปวงรีสีฟ้า P1–P4 แทน Process ส่วนสี่เหลี่ยมสีเหลืองแทน Socket ซึ่งเป็นจุดเชื่อมระหว่าง Application Layer กับ Transport Layer โฮสต์ตรงกลางมี Process P1 และ P2 ทำงานพร้อมกัน จึงมีข้อมูลจากหลาย Socket ที่ต้องใช้ Transport และ Network Layer ร่วมกัน ลูกศรที่ไหลลงจากหลาย Process แสดงแนวคิด Multiplexing ส่วนลูกศรที่แยกขึ้นไปยัง Process ที่ต่างกันแสดงแนวคิด Demultiplexing สิ่งสำคัญคือ Multiplexing ไม่ได้รวม Payload หลายชุดให้กลายเป็นข้อความเดียว แต่เป็นการจัดการ Segment หลายชุดผ่านบริการชั้นล่างร่วมกัน

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Multiplexing เกิดที่ฝั่งส่ง: รับข้อมูลจากหลาย Socket และเพิ่ม Transport Header Demultiplexing เกิดที่ฝั่งรับ: อ่าน Header แล้วส่ง Segment ไปยัง Socket ที่ถูกต้อง Socket เป็นจุดเชื่อมระหว่าง Application Process กับ Transport Layer หลาย Process สามารถใช้เครือข่ายพร้อมกันได้โดยข้อมูลไม่ถูกส่งปะปนกัน

---

## 📄 Slide 12: HTTP Message Delivery Across Layers

*📄 Slide 12*

สไลด์นี้ใช้ตัวอย่างการส่ง HTTP Message จาก HTTP Server ไปยัง Browser เพื่อแสดงว่าข้อมูลเดินทางผ่านแต่ละ Layer อย่างไร และเพื่อปูพื้นฐานก่อนอธิบายว่า Transport Layer เลือก Application Process ปลายทางได้อย่างไร ฝั่ง HTTP Server เริ่มจาก Application Layer สร้าง HTTP Message จากนั้น Transport Layer เพิ่ม Transport Header (H t ) ทำให้เกิด Transport-Layer Segment และ Network Layer เพิ่ม Network Header (H n ) ทำให้เกิด IP Datagram ก่อนส่งผ่านเครือข่าย กระบวนการเพิ่ม Header ทีละชั้นนี้เรียกว่า Encapsulation เมื่อ Datagram ถึงเครื่อง Client การทำงานจะย้อนกลับ Network Layer ตรวจและนำ H n ออก แล้วส่ง Segment ให้ Transport Layer จากนั้น Transport Layer ตรวจ H t และส่ง HTTP Message ขึ้นไปยัง Application Layer กระบวนการนำ Header ออกทีละชั้นเรียกว่า Decapsulation


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพวาง HTTP Server ไว้ตรงกลางและ Client ไว้สองเครื่อง ลูกศรสีน้ำเงินแสดงเส้นทางของข้อมูลจาก Server ผ่าน Network ไปยัง Client ด้านซ้าย ที่ Server จะเห็นข้อมูลเปลี่ยนจาก “HTTP msg” เป็น “H t + HTTP msg” และ “H n + H t + HTTP msg” ตามลำดับ เมื่อถึง Client ด้านซ้าย Header ถูกนำออกจนเหลือ HTTP Message และลูกศรชี้ขึ้นไปยัง Firefox แสดงว่า Browser Process เป็นผู้รับข้อมูลในตัวอย่างนี้ ส่วน Client ด้านขวาแสดงว่าในเครือข่ายอาจมีโฮสต์อื่นอยู่ด้วย แต่ Datagram ชุดนี้ไม่ได้ถูกส่งไปยังเครื่องนั้น

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Application Layer สร้าง HTTP Message Transport Layer เพิ่ม Ht และ Network Layer เพิ่ม Hn ฝั่งส่งทำ Encapsulation ส่วนฝั่งรับทำ Decapsulation หลังถอด Header แล้ว HTTP Message ต้องถูกส่งให้ Browser Process ที่ถูกต้อง

---

## 📄 Slide 13: How Does Transport Select the Correct Process?

*📄 Slide 13*

สไลด์นี้ตั้งคำถามสำคัญว่า เมื่อ HTTP Message มาถึงเครื่อง Client แล้ว Transport Layer ทราบได้อย่างไรว่าควรส่งข้อมูลให้ Firefox ไม่ใช่ Netflix หรือ Skype ทั้งที่โปรแกรมเหล่านี้กำลังทำงานอยู่บนโฮสต์เดียวกันและต่างก็ใช้เครือข่ายได้ Network Layer มีหน้าที่นำ IP Datagram มาถึง โฮสต์ปลายทาง แต่ภายในโฮสต์ยังมีหลาย Application Process ดังนั้น Transport Layer ต้องทำงานต่ออีกขั้น โดยใช้ข้อมูลใน Transport Header เพื่อเลือก Socket ที่สัมพันธ์กับ Process ปลายทาง กระบวนการเลือกและส่งข้อมูลขึ้นไปยัง Process ที่ถูกต้องนี้คือ Demultiplexing คำตอบจึงไม่ได้มาจากการอ่านข้อความว่าเป็น “HTTP msg” เพียงอย่างเดียว แต่พิจารณาจากข้อมูลกำกับใน Header เช่น Port Number และข้อมูลอื่นที่โพรโทคอลกำหนด รายละเอียดว่าการเลือก Socket ของ UDP และ TCP แตกต่างกันอย่างไรจะอธิบายในสไลด์ถัดไปของหัวข้อนี้


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพด้านซ้ายแสดง Client ที่เปิด Skype, Netflix และ Firefox พร้อมกัน ลูกศรชี้ HTTP Message ขึ้นไปยัง Firefox ขณะที่เครื่องหมายคำถามและข้อความสีแดงด้านบนเน้นปัญหาที่ต้องแก้ โฮสต์ตรงกลางคือ HTTP Server และเส้นทางสีน้ำเงินแสดงว่า Datagram เดินทางมาถึง Client ได้แล้ว จุดที่ยังต้องตัดสินใจคือภายใน Application Layer ของ Client ว่าข้อมูลควรเข้าสู่ Process ใด

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - IP Address ช่วยนำข้อมูลมาถึงโฮสต์ที่ถูกต้อง Transport Layer ต้องเลือก Process หรือ Socket ภายในโฮสต์ Demultiplexing ใช้ข้อมูลใน Transport Header เพื่อเลือก Socket โฮสต์หนึ่งเครื่องสามารถมีหลาย Application Process ใช้เครือข่ายพร้อมกันได้

---

## 📄 Slide 14: Demultiplexing: One Input to Multiple Outputs

*📄 Slide 14*

สไลด์นี้ลดรายละเอียดของระบบจริงให้เหลือเป็นไดอะแกรมเชิงแนวคิด เพื่อให้เห็นทิศทางของ Demultiplexing อย่างชัดเจน ข้อมูลหนึ่งชุดเข้ามาจากด้านล่าง แล้วระบบต้องตัดสินใจว่าจะส่งออกไปทางใดในหลายปลายทางด้านบน วงกลมที่มีเครื่องหมายคำถามแทนกลไกการตัดสินใจของ Transport Layer เมื่อ Segment มาถึง ระบบต้องอ่านข้อมูลกำกับใน Header แล้วจับคู่กับ Socket ที่เหมาะสม จึงจะเลือกเส้นทางออกได้ถูกต้อง


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรด้านล่างชี้เข้าหาวงกลม แทน Segment ที่มาจาก Network Layer ส่วนลูกศรสามเส้นด้านบนชี้ออกจากวงกลม แทนทางเลือกไปยัง Socket หรือ Application Process หลายตัว จึงเป็นภาพแบบ one input → multiple possible outputs อย่างไรก็ตาม Segment หนึ่งชุดจะถูกส่งไปยังปลายทางที่ตรงกัน ไม่ได้ถูกคัดลอกส่งให้ทุก Process

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Demultiplexing ทำงานในทิศทางจากชั้นล่างขึ้นสู่ Application Transport Layer ต้องเลือกหนึ่งปลายทางจากหลาย Socket ข้อมูลใน Header เป็นเกณฑ์ในการตัดสินใจ Segment ไม่ได้ถูกส่งแบบ broadcast ให้ทุก Application

---

## 📄 Slide 15: Demultiplexing at the Transport Layer

*📄 Slide 15*

สไลด์นี้นำไดอะแกรมเชิงแนวคิดจากหน้าก่อนมาเชื่อมกับ Layer จริงของโฮสต์ โดยแสดงว่า Demultiplexing เกิดที่ Transport Layer ก่อนส่ง Payload ขึ้นไปยัง Application Layer เมื่อ Segment มาจาก Network Layer Transport Layer จะตรวจข้อมูลใน Header แล้วเลือก Socket ของ Application ที่ถูกต้อง ตัวอย่าง Application ที่แสดงคือ Skype, Firefox และ Netflix หาก Segment เป็นข้อมูล HTTP สำหรับ Browser ระบบต้องส่ง Payload ผ่าน Socket ของ Firefox ไม่ใช่ส่งให้โปรแกรมอื่น


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นประล่างแบ่ง Network Layer ออกจาก Transport Layer และเส้นประบนแบ่ง Transport Layer ออกจาก Application Layer ลูกศรจากด้านล่างเข้าสู่วงกลมหมายถึง Segment ที่มาถึง Transport Layer ส่วนลูกศรสามเส้นที่แยกขึ้นไปยังโลโก้โปรแกรมต่าง ๆ หมายถึง Socket ปลายทางหลายตัว เครื่องหมายคำถามในวงกลมย้ำว่าการแยกข้อมูลต้องอาศัยข้อมูลกำกับ ไม่ใช่การเดาหรือการเลือกแบบสุ่ม

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Demultiplexing เกิดที่ Transport Layer ของฝั่งรับ Application แต่ละตัวรับข้อมูลผ่าน Socket ของตน Transport Header ช่วยระบุ Socket ปลายทาง ข้อมูลหนึ่ง Segment ถูกส่งให้ Application ที่ตรงกันเพียงปลายทางเดียว

---

## 📄 Slide 16: Demultiplexing: Highway-Exit Analogy

*📄 Slide 16*

ภาพทางหลวงใช้เป็นอุปมาเพื่อช่วยให้เข้าใจ Demultiplexing รถหลายคันเดินทางมาบนถนนสายหลักร่วมกัน แต่เมื่อถึงบริเวณทางแยก รถแต่ละคันต้องเลือกทางออกให้ตรงกับจุดหมายของตน ในระบบเครือข่าย Segment หลายชุดเดินทางมาถึงโฮสต์ผ่านเส้นทางรับข้อมูลร่วมกัน จากนั้น Transport Layer ต้องแยก Segment ไปยัง Socket และ Application Process ที่ต่างกัน โดยอาศัยข้อมูลใน Header เปรียบเหมือนผู้ขับใช้ป้ายบอกทางเพื่อเลือกทางออก


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ในภาพมีทางออกหลายทางพร้อมป้ายชื่อเมืองและหมายเลขเส้นทาง รถทุกคันไม่ได้ใช้ทางออกเดียวกัน แต่เลือกตามปลายทางที่ระบุไว้ เช่นเดียวกับ Segment ที่มาถึง Transport Layer แล้วถูกส่งไปยัง Socket ที่สัมพันธ์กับ Destination Port หรือข้อมูลการเชื่อมต่อของตน อุปมานี้เน้นแนวคิด “เส้นทางร่วมเข้ามา แล้วแยกไปหลายปลายทาง”

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ถนนสายหลักเปรียบกับเส้นทางที่ Segment เดินทางเข้ามาร่วมกัน ทางออกเปรียบกับ Socket หรือ Application ปลายทาง ป้ายทางออกเปรียบกับข้อมูลกำกับใน Header Demultiplexing คือการแยกข้อมูลให้ไปยังปลายทางที่ถูกต้อง

---

## 📄 Slide 17: Multiplexing: Multiple Inputs to One Output

*📄 Slide 17*

สไลด์นี้แสดงทิศทางตรงข้ามกับ Demultiplexing คือ Multiplexing ข้อมูลจากหลายแหล่งด้านบนถูกส่งเข้ามายัง Transport Layer แล้วส่งต่อออกทางบริการของ Network Layer ด้านล่างร่วมกัน วงกลมตรงกลางแทนการทำงานของ Transport Layer ฝั่งส่ง ซึ่งรับข้อมูลจากหลาย Socket สร้าง Segment และเพิ่ม Header ให้แต่ละชุดก่อนส่งลงไป แม้ Segment หลายชุดจะใช้เส้นทางชั้นล่างร่วมกัน แต่ข้อมูลแต่ละชุดยังคงเป็น Segment แยกจากกัน


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรสามเส้นด้านบนชี้เข้าสู่วงกลม แทนข้อมูลจากหลาย Application Process ส่วนลูกศรเส้นเดียวด้านล่างชี้ออกจากวงกลม แทนการส่ง Segment ลงสู่ Network Layer จึงเป็นภาพแบบ multiple inputs → one shared output path วงกลมไม่ได้หมายถึงการผสม Payload ทั้งหมดเป็น Packet เดียว แต่หมายถึงจุดที่ Transport Layer รับและจัดการข้อมูลจากหลาย Socket

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Multiplexing ทำงานที่ฝั่งส่ง รับข้อมูลจากหลาย Socket หรือหลาย Process สร้าง Segment และเพิ่ม Header ให้แต่ละชุด หลาย Segment ใช้ Network Layer ร่วมกันแต่ยังคงแยกเป็นคนละ Segment

---

## 📄 Slide 18: Multiplexing at the Transport Layer

*📄 Slide 18*

สไลด์นี้เชื่อมไดอะแกรม Multiplexing เข้ากับ Layer ของโฮสต์ โดยแสดง Application หลายตัว ได้แก่ Skype, Firefox และ Netflix ส่งข้อมูลลงมายัง Transport Layer ผ่าน Socket ของตน Transport Layer รับข้อมูลจากแต่ละ Application เพิ่มข้อมูล Header ที่จำเป็น แล้วส่ง Segment ลงสู่ Network Layer ผ่านบริการร่วมกัน การมี Multiplexing จึงทำให้หลาย Application สามารถส่งข้อมูลพร้อมกันได้โดยไม่ต้องมี Network Layer แยกเฉพาะสำหรับแต่ละโปรแกรม


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นประบนแบ่ง Application Layer กับ Transport Layer ลูกศรจากโลโก้ทั้งสามชี้ลงมายังวงกลม แสดงข้อมูลจากหลาย Application เข้าสู่ Transport Layer ส่วนลูกศรที่ชี้ลงต่อไปยังด้านล่างแสดง Segment ถูกส่งให้ Network Layer การจัดวางภาพเป็นภาพกลับทิศของสไลด์ Demultiplexing: Multiplexing รวม “ทางเข้าในการจัดการ” จากหลาย Socket เข้าสู่เส้นทางชั้นล่างร่วมกัน

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Application แต่ละตัวส่งข้อมูลผ่าน Socket ของตน Transport Layer รับข้อมูลจากหลายแหล่งและเพิ่ม Header Segment แต่ละชุดยังมีตัวระบุของตนเพื่อให้ฝั่งรับแยกได้ Multiplexing ช่วยให้หลาย Application ใช้บริการเครือข่ายร่วมกัน

---

## 📄 Slide 19: Multiplexing: Highway-Merge Analogy

*📄 Slide 19*

ภาพถนนหลายสายที่รวมเข้าสู่ถนนสายหลักใช้เปรียบเทียบกับ Multiplexing รถจากทางลาดหรือช่องทางต่าง ๆ สามารถรวมเข้าสู่เส้นทางหลักเดียวกันและใช้โครงสร้างพื้นฐานถนนร่วมกันได้ ใน Transport Layer ข้อมูลจากหลาย Application Process เปรียบเหมือนรถจากหลายทาง Transport Layer รับข้อมูลเหล่านั้น สร้าง Segment แยกกัน แล้วส่งลง Network Layer ซึ่งเป็นเส้นทางบริการร่วมกัน แม้จะใช้ถนนเดียวกัน รถแต่ละคันยังเป็นคนละคัน เช่นเดียวกับ Segment ที่ยังเป็นข้อมูลคนละชุด


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพมองเห็นทางลาดหลายสายเชื่อมเข้าสู่ทางหลวงหลักตรงกลาง จึงสื่อถึงทิศทาง “หลายทางเข้า → ทางร่วม” ซึ่งตรงกับ Multiplexing อุปมานี้ควรใช้เพื่อเข้าใจการใช้ทรัพยากรร่วมกัน ไม่ควรตีความว่าข้อมูลจากหลาย Application ถูกนำมารวมเป็น Payload เดียว

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ทางลาดหลายสายเปรียบกับข้อมูลจากหลาย Application จุดรวมถนนเปรียบกับ Transport Layer ฝั่งส่ง ทางหลวงหลักเปรียบกับบริการ Network Layer ที่ใช้ร่วมกัน Multiplexing ไม่ได้รวมหลาย Payload ให้เป็นข้อความเดียว

---

## 📄 Slide 20: How Demultiplexing Works

*📄 Slide 20*

สไลด์นี้อธิบายข้อมูลที่โฮสต์ใช้ในการทำ Demultiplexing เมื่อโฮสต์รับ IP Datagram แต่ละ Datagram จะมี Source IP Address และ Destination IP Address ใน IP Header และภายใน Datagram จะบรรจุ Transport-Layer Segment หนึ่งชุด ใน Header ของ TCP หรือ UDP Segment มี Source Port Number และ Destination Port Number โดย Port Number ทำหน้าที่ระบุจุดปลายทางของ Application ที่ Transport Layer ติดต่อด้วย โฮสต์จึงใช้ข้อมูล IP Address ร่วมกับ Port Number เพื่อส่ง Segment ไปยัง Socket ที่เหมาะสม โดยทั่วไป Destination IP Address ช่วยระบุว่า Datagram ต้องมาถึงโฮสต์ใด ส่วน Destination Port Number ช่วยระบุว่าจะส่งข้อมูลต่อให้ Socket หรือบริการใดภายในโฮสต์นั้น Source IP Address และ Source Port Number ระบุฝั่งที่ส่งข้อมูลมา รายละเอียดว่าการทำ Demultiplexing ของ UDP และ TCP ใช้ชุดข้อมูลแตกต่างกันอย่างไรจะอธิบายในสไลด์ต่อไป


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ด้านขวาเป็นรูปแบบทั่วไปของ TCP/UDP Segment แถวบนมีความกว้างรวม 32 bits และแบ่งเป็น Source Port กับ Destination Port อย่างละ 16 bits วงรีสีแดงเน้นสอง Field นี้ ใต้ลงมาเป็น Other Header Fields และ Application Data หรือ Payload ภาพจึงชี้ให้เห็นว่า Port Number อยู่ใน Transport Header ไม่ได้อยู่ใน Payload และเป็นข้อมูลสำคัญที่ Transport Layer ใช้เลือก Socket

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - IP Datagram มี Source IP Address และ Destination IP Address ภายใน Datagram มี Transport-Layer Segment TCP/UDP Segment มี Source Port และ Destination Port Destination Port ช่วยเลือก Socket หรือ Application ปลายทาง รูปแบบการใช้ข้อมูลเพื่อ Demultiplex ของ UDP และ TCP จะมีรายละเอียดต่างกัน

---

## 📄 Slide 21: Connectionless Demultiplexing

*📄 Slide 21*

สไลด์นี้อธิบายการทำ Demultiplexing ของ UDP ซึ่งเป็นการส่ง UDP Segment ที่มาถึงโฮสต์ให้แก่ Socket ที่ถูกต้อง เนื่องจาก UDP เป็นแบบ Connectionless ระบบจึงไม่ได้สร้าง Connection แยกสำหรับผู้ส่งแต่ละราย แต่พิจารณาจาก Destination Port Number ที่อยู่ใน UDP Header เป็นหลัก เมื่อโปรแกรมสร้าง UDP Socket จะต้องกำหนด Host-Local Port Number ให้ Socket นั้น เช่น new DatagramSocket(12534) หมายถึงสร้าง UDP Socket และผูกไว้กับพอร์ต 12534 ภายในโฮสต์เครื่องนั้น คำว่า Host-Local ชี้ว่าหมายเลขพอร์ตนี้ใช้ระบุ Socket ภายในเครื่องปลายทาง ไม่ได้ระบุเครื่องบนเครือข่ายทั้งหมด เมื่อต้องการส่ง Datagram ผ่าน UDP Socket ผู้ส่งต้องระบุ Destination IP Address เพื่อเลือกโฮสต์ปลายทาง และ Destination Port Number เพื่อเลือก Socket ภายในโฮสต์นั้น เมื่อ UDP Segment มาถึง ผู้รับตรวจ Destination Port แล้วส่ง Segment ไปยัง Socket ที่ผูกกับพอร์ตดังกล่าว ดังนั้น Datagram ที่มี Destination Port เดียวกันจะถูกส่งเข้าหา Socket เดียวกัน แม้จะมาจาก Source IP Address หรือ Source Port ที่ต่างกันก็ตาม


| คุณสมบัติ | TCP | UDP |
| :--- | :--- | :--- |
| **Connection** | Connection-oriented (3-Way Handshake) | Connectionless |
| **Reliability** | Reliable (ACK, Retransmit, Seq#) | Unreliable (Best-effort) |
| **Ordering** | In-order delivery | No ordering guarantee |
| **Flow Control** | Yes (rwnd) | No |
| **Congestion Control** | Yes (cwnd, AIMD) | No |
| **Speed** | ช้ากว่า (Overhead) | เร็วกว่า (Lightweight) |
| **Use Case** | Web, Email, File Transfer | DNS, VoIP, Gaming, Streaming |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์แบ่งเป็นสองส่วน ด้านซ้ายทบทวนข้อมูลที่ต้องกำหนดตอนสร้าง Socket และตอนส่ง Datagram โดยวงรีสีแดงเน้นพอร์ต 12534 ด้านขวาแสดงขั้นตอนเมื่อ Segment มาถึง: ผู้รับตรวจ Destination Port แล้วชี้ลงไปยัง Socket ที่มีพอร์ตตรงกัน ข้อความสีแดงด้านล่างเน้นข้อสรุปว่า “Destination Port เดียวกัน → Socket เดียวกัน” แม้ผู้ส่งต้นทางจะต่างกัน

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - UDP Socket ต้องผูกกับหมายเลขพอร์ตภายในโฮสต์ การส่ง UDP Datagram ต้องระบุ Destination IP Address และ Destination Port UDP Demultiplexing เลือก Socket จาก Destination Port Number UDP Socket เดียวสามารถรับ Datagram จากผู้ส่งหลายรายได้

---

## 📄 Slide 22: Connectionless Demultiplexing: an Example

*📄 Slide 22*

สไลด์นี้ใช้โฮสต์สามเครื่องแสดงตัวอย่าง UDP Demultiplexing แบบครบวงจร แต่ละโฮสต์สร้าง Socket ด้วย SOCK_DGRAM ซึ่งหมายถึง Datagram Socket สำหรับ UDP และใช้ bind() เพื่อผูก Socket กับพอร์ตภายในเครื่อง โฮสต์ซ้ายผูกพอร์ต 9157 โฮสต์กลางผูกพอร์ต 6428 และโฮสต์ขวาผูกพอร์ต 5775 Datagram A เดินทางจากพอร์ต 9157 ไปยังพอร์ต 6428 ดังนั้นมี Source Port = 9157 และ Destination Port = 6428 ส่วน Datagram B เป็นข้อมูลตอบกลับจากโฮสต์กลางไปยังโฮสต์ซ้าย จึงมี Source Port = 6428 และ Destination Port = 9157 ในทำนองเดียวกัน Datagram C จากโฮสต์ขวาไปยังโฮสต์กลางมี Source Port = 5775 และ Destination Port = 6428 ขณะที่ Datagram D ที่ตอบกลับมี Source Port = 6428 และ Destination Port = 5775 จุดสำคัญคือ Datagram A และ C มาจากคนละโฮสต์และใช้ Source Port ต่างกัน แต่ทั้งคู่มี Destination Port = 6428 จึงถูกส่งเข้าสู่ UDP Socket เดียวของ Process P1 บนโฮสต์กลาง นี่แสดงให้เห็นว่า UDP ไม่สร้าง Socket แยกตามผู้ส่งแต่ละราย ผู้รับอาจใช้ Socket เดียวรับข้อมูลจากหลายแหล่ง แล้วพิจารณาข้อมูลต้นทางเมื่อต้องส่งคำตอบกลับ


```
[ TCP Socket Programming Flow ]
       Server                          Client
  ┌─────────────┐                ┌──────────────┐
  │ socket()    │                │ socket()     │
  │ bind()      │                │              │
  │ listen()    │                │              │
  │ accept()    │<── TCP SYN ───│ connect()    │
  │  (block)    │── SYN-ACK ──> │              │
  │             │<── ACK ───────│              │
  │ read()      │<── Data ──────│ write()      │
  │ write()     │── Data ──────>│ read()       │
  │ close()     │               │ close()      │
  └─────────────┘               └──────────────┘
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รูปวงรี P3, P1 และ P4 แทน Application Process ส่วนสี่เหลี่ยมสีเหลืองที่รอยต่อระหว่าง Application กับ Transport แทน Socket เส้นสีแดงแสดงเส้นทาง Datagram ผ่านชั้น Transport, Network, Link และ Physical กล่องสีน้ำเงิน A–D แทน Datagram ในแต่ละทิศทาง ไม่ใช่ชื่อโฮสต์ ลูกศรของ A และ C ชี้เข้าสู่โฮสต์กลาง ส่วน B และ D ชี้กลับไปยังโฮสต์ซ้ายและขวาตามลำดับ

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - A: 9157 → 6428 และ B: 6428 → 9157 C: 5775 → 6428 และ D: 6428 → 5775 A และ C ถูก Demultiplex ไปยัง Socket พอร์ต 6428 เดียวกัน Source Port ของข้อมูลตอบกลับมักเป็นพอร์ตปลายทางของข้อมูลที่รับมา

---

## 📄 Slide 23: Connection-Oriented Demultiplexing

*📄 Slide 23*

สไลด์นี้เปลี่ยนจาก UDP ไปอธิบาย Connection-Oriented Demultiplexing ของ TCP สำหรับ TCP การระบุ Socket ของ Connection หนึ่งชุดไม่ได้ใช้ Destination Port เพียงค่าเดียว แต่ใช้ข้อมูลสี่ค่าเรียกว่า 4-tuple ได้แก่ Source IP Address, Source Port Number, Destination IP Address และ Destination Port Number เหตุผลที่ต้องใช้ทั้งสี่ค่า คือ Server หนึ่งเครื่องอาจให้บริการที่พอร์ตเดียวกันแก่ Client หลายรายพร้อมกัน ตัวอย่างเช่น Web Server ใช้ Destination Port เดียวกัน แต่ Connection จาก Client แต่ละรายมี Source IP Address หรือ Source Port ต่างกัน จึงสามารถสร้างและแยก TCP Socket ของแต่ละ Connection ออกจากกันได้ เมื่อ TCP Segment มาถึง Receiver จะอ่านค่าทั้งสี่จาก IP Header และ TCP Header แล้วจับคู่กับ 4-tuple ของ Socket ที่มีอยู่ หากค่าตรงกับ Connection ใด Segment จะถูกส่งไปยัง Socket ของ Connection นั้น ดังนั้น TCP Server จึงรองรับหลาย Connection พร้อมกันได้ แม้ทุก Connection จะติดต่อบริการปลายทางพอร์ตเดียวกัน

```
[ โครงสร้าง UDP Header: ขนาด 8 ไบต์ (64 บิต) ]
 0                   15 16                  31
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Source Port (16 bits)   | Destination Port (16 bits)|
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|      Length (16 bits)     |    Checksum (16 bits)     |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Application Data Payload (ตัวแปร)            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์เป็นข้อความสองคอลัมน์ ด้านซ้ายแจกแจงองค์ประกอบของ 4-tuple และเน้นคำว่า “all four values” ด้วยสีแดง ด้านขวาอธิบายว่า Server สามารถมี TCP Socket หลายชุดพร้อมกัน โดยแต่ละ Socket เชื่อมโยงกับ Client คนละ Connection และมี 4-tuple ของตนเอง

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - TCP Socket ของ Connection ระบุด้วย 4-tuple 4-tuple = Source IP, Source Port, Destination IP และ Destination Port TCP Server ใช้พอร์ตบริการเดียวกับ Client หลายรายได้ Receiver ต้องใช้ค่าทั้งสี่เพื่อเลือก TCP Socket ที่ถูกต้อง

---

## 📄 Slide 24: Connection-Oriented Demultiplexing: Example

*📄 Slide 24*

สไลด์นี้แสดง Apache HTTP Server ที่ IP Address B ให้บริการที่ TCP Port และรับ Connection พร้อมกันสามชุด ได้แก่ A:9157 → B:80 , C:5775 → B:80 และ C:9157 → B:80 Segment ทั้งสามมี Destination IP และ Destination Port เหมือนกัน แต่มี Source IP หรือ Source Port ต่างกัน TCP จึงมอง Segment ทั้งสามเป็นคนละ Connection เพราะ 4-tuple ไม่เหมือนกัน ตัวอย่างแรกใช้ (A, 9157, B, 80) ตัวอย่างที่สองใช้ (C, 5775, B, 80) และตัวอย่างที่สามใช้ (C, 9157, B, 80) Server สามารถ Demultiplex Segment ไปยัง TCP Socket คนละชุดที่แสดงเป็น P4, P5 และ P6 ได้ ภาพยังชี้ให้เห็นว่า Source Port ค่าเดียวกันสามารถปรากฏบนคนละโฮสต์ได้ เช่น A:9157 และ C:9157 ไม่ใช่ Connection เดียวกัน เพราะ Source IP Address ต่างกัน เมื่อ Server ส่งข้อมูลตอบกลับ ค่าต้นทางและปลายทางจะสลับทิศ เช่น B:80 → A:9157 แต่ยังคงเป็น Connection เดิมตามคู่ 4-tuple


```
[ Transport Layer: Multiplexing / Demultiplexing ]
              ┌── App P1 (Port 80)
              ├── App P2 (Port 443)
Transport ────┤                        ← Demux: ส่ง Segment ไปยัง Socket ที่ถูกต้อง
              ├── App P3 (Port 53)        โดยดูจาก Dest Port Number
              └── App P4 (Port 8080)
  
  Mux: หลาย App ส่งข้อมูลลง Transport Layer เดียวกัน
  Demux: Transport Layer แยกข้อมูลไปยัง App ที่ถูกต้อง
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ด้านซ้ายคือ Client ที่ IP A มี P1 ด้านขวาคือ Client ที่ IP C มี P2 และ P3 ส่วนตรงกลางคือ Server IP B ที่รัน Apache HTTP Server เส้นสีแดงสามเส้นจาก Client เข้าสู่ Server จบที่ Socket คนละช่อง วงรีสีแดงเน้น Source IP/Port ที่ต่างกัน ข้อความด้านล่างสรุปชัดเจนว่า Segment ทั้งสามมุ่งไป B:80 เหมือนกัน แต่ถูกแยกไปยัง Socket ต่างกัน

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Connection 1: A:9157 ↔ B:80 Connection 2: C:5775 ↔ B:80 Connection 3: C:9157 ↔ B:80 Destination เดียวกันยังเป็นคนละ TCP Connection ได้ เพราะ Source ต่างกัน P4–P6 แทนปลายทาง Connection/Socket ฝั่ง Server ไม่จำเป็นต้องหมายถึงโปรแกรม Server คนละตัว

---

## 📄 Slide 25: Summary: Multiplexing and Demultiplexing

*📄 Slide 25*

สไลด์นี้สรุปว่า Multiplexing และ Demultiplexing อาศัยค่าที่อยู่ใน Header ของ Segment และ Datagram เพื่อรวมข้อมูลจากหลายแหล่งที่ฝั่งส่ง และแยกข้อมูลไปยังปลายทางที่ถูกต้องที่ฝั่งรับ ความแตกต่างหลักระหว่าง UDP กับ TCP คือจำนวนข้อมูลที่ใช้ระบุ Socket สำหรับ UDP Receiver ใช้ Destination Port Number เพื่อเลือก Socket ดังนั้น Datagram จากผู้ส่งหลายรายที่ส่งมาพอร์ตปลายทางเดียวกันจะเข้าสู่ Socket เดียวกัน ส่วน TCP ใช้ 4-tuple ซึ่งประกอบด้วย Source/Destination IP Address และ Source/Destination Port Number จึงแยก Connection หลายชุดที่ใช้พอร์ตบริการเดียวกันได้ ข้อความสุดท้ายระบุว่า Multiplexing และ Demultiplexing เกิดขึ้นได้ในทุก Layer หมายความว่าแต่ละชั้นมีวิธีรวมข้อมูลจากหลายแหล่งและแยกข้อมูลตามค่าของ Header ที่ชั้นนั้นรับผิดชอบ ไม่ใช่แนวคิดที่มีเฉพาะ Transport Layer แต่ในบทนี้เน้นการใช้ Port และ 4-tuple ที่ Transport Layer

> [!EXAMPLE] Trace Table: ตัวอย่างการคำนวณ Checksum แบบ 1's Complement (16 บิต)
> ```
>   คำที่ 1:  01100110 01100000
> + คำที่ 2:  01010101 01010101
> -----------------------------
>   ผลรวม:   10111011 10110101
> + คำที่ 3:  10001111 00001100
> -----------------------------
>   ผลรวม:  101001010 11000001  <=== มีตัวทดล้น 1 บิต (Wrap around carry)
>   บวกทด:   01001010 11000010
>   Checksum (กลับบิต 0 เป็น 1, 1 เป็น 0): 10110101 00111101
> ```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์เป็นรายการสรุป ไม่มีไดอะแกรมใหม่ คำว่า UDP และ TCP ใช้สีแดงเพื่อเน้นความแตกต่าง ข้อความ “destination port number (only)” เน้นว่า UDP ใช้พอร์ตปลายทาง ส่วนบรรทัด TCP ระบุครบว่าใช้ทั้ง IP Address และ Port Number ของต้นทางและปลายทาง

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Multiplexing/Demultiplexing อาศัย Header Field Values UDP ใช้ Destination Port Number ในการ Demultiplex TCP ใช้ Source/Destination IP และ Port รวมเป็น 4-tuple แนวคิด Multiplexing/Demultiplexingพบได้ในหลาย Layer

---

## 📄 Slide 26: Chapter 3: Roadmap — Connectionless Transport: UDP

*📄 Slide 26*

Connectionless Transport: UDP Connectionless Transport: UDP สไลด์ Roadmap แสดงตำแหน่งของเนื้อหาในบท โดยหัวข้อที่กำลังเริ่มศึกษา คือ Connectionless Transport: UDP ซึ่งถูกแสดงด้วยตัวอักษรสีน้ำเงิน ส่วน Transport-Layer Services และ Multiplexing/Demultiplexing ที่เรียนผ่านมาแล้วถูกทำให้เป็นสีเทา UDP เป็นหนึ่งในสอง Transport Protocol หลักของ Internet และให้บริการแบบ Connectionless กล่าวคือ ไม่ต้องสร้าง Connection ก่อนส่งข้อมูล เนื้อหาต่อจากนี้จะอธิบายคุณลักษณะของ UDP การทำงานฝั่งส่งและรับ โครงสร้าง UDP Segment และกลไกตรวจหาความผิดพลาดด้วย Checksum ก่อนเข้าสู่ Reliable Data Transfer และ TCP ในลำดับถัดไป การใช้ Roadmap ซ้ำในบทช่วยให้นักศึกษาเห็นว่าแต่ละหัวข้อเชื่อมโยงกันอย่างไร: เมื่อเข้าใจการเลือก Socket ด้วย Multiplexing/Demultiplexing แล้ว จึงสามารถศึกษาว่า UDP ใช้กลไกดังกล่าวจริงอย่างไร


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รายการด้านซ้ายคือหัวข้อทั้งบท โดยหัวข้อ UDP ถูกเน้นเป็นหัวข้อปัจจุบัน ภาพสะพานส่งน้ำหรือ Aqueduct ด้านขวาเป็นภาพประกอบเชิงสัญลักษณ์เกี่ยวกับการ “ขนส่ง” หรือการพาข้อมูลจากจุดหนึ่งไปยังอีกจุดหนึ่ง ไม่ใช่ไดอะแกรม Packet Flow หรือส่วนหนึ่งของโครงสร้าง UDP

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - หัวข้อปัจจุบันคือ Connectionless Transport: UDP พื้นฐาน Multiplexing/Demultiplexing จะถูกนำมาใช้กับ UDP หัวข้อถัดไปหลัง UDP คือ Reliable Data Transfer และ TCP ภาพสะพานเป็นภาพประกอบ ไม่ใช่กลไกของ Protocol

---

## 📄 Slide 27: UDP: User Datagram Protocol

*📄 Slide 27*

UDP ถูกเรียกว่าโปรโตคอลแบบ “no frills” หรือ “bare bones” เพราะมีบริการพื้นฐานและกลไกไม่ซับซ้อน UDP ใช้บริการแบบ Best Effort จาก IP ดังนั้น UDP Segment อาจสูญหายระหว่างทาง หรืออาจมาถึง Application ไม่ตรงตามลำดับที่ส่ง โดย UDP เองไม่ได้รับประกันการส่งถึงและการเรียงลำดับ คำว่า Connectionless หมายถึง UDP Sender และ Receiver ไม่ทำ Handshake เพื่อสร้าง Connection ก่อนส่งข้อมูล แต่ละ UDP Segment ถูกจัดการอย่างเป็นอิสระจาก Segment อื่น จึงไม่ต้องเก็บ Connection State ที่ Sender และ Receiver และไม่มีเวลาเพิ่มจากขั้นตอน Connection Establishment ซึ่งอาจเพิ่มความหน่วงประมาณหนึ่ง RTT ก่อนเริ่มส่งข้อมูล เหตุผลที่ยังต้องมี UDP คือโครงสร้างเรียบง่าย Header มีขนาดเล็ก และไม่มี Congestion Control ในตัว Application จึงสามารถส่งข้อมูลด้วยอัตราที่ต้องการได้โดย UDP ไม่ลดอัตราเอง ข้อความ “blast away as fast as desired” ไม่ได้หมายความว่าข้อมูลจะส่งถึงทั้งหมด เพราะเมื่อเครือข่ายคับคั่ง Packet ยังอาจถูกทิ้งได้ แต่ UDP ยังคงทำงานโดยไม่รอการสร้าง Connection หรือการตอบรับจากปลายทาง


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ด้านซ้ายแสดงคุณลักษณะหลักของ UDP ได้แก่ no frills, best effort และ connectionless ด้านขวาอยู่ในกรอบสีแดงหัวข้อ “Why is there a UDP?” ซึ่งรวบรวมข้อได้เปรียบด้านเวลา ความเรียบง่าย Header ขนาดเล็ก และการไม่มี Congestion Control คำสำคัญบางส่วนใช้ตัวเอียงหรือสีแดงเพื่อให้เห็นเหตุผลและข้อจำกัดควบคู่กัน

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - UDP ไม่รับประกัน Delivery หรือ In-Order Delivery UDP ไม่ทำ Handshake และจัดการแต่ละ Segment แยกจากกัน ไม่มี Connection State และมี Header ขนาดเล็ก UDP ไม่มี Congestion Control ในตัว ความเร็วในการส่งไม่ได้เท่ากับการรับประกันว่าข้อมูลจะถึงปลายทาง

---

## 📄 Slide 28: UDP: Uses and Added Functionality

*📄 Slide 28*

สไลด์นี้ยกตัวอย่าง Application Protocol หรือประเภทงานที่ใช้ UDP ได้แก่ Streaming Multimedia , DNS , SNMP และ HTTP/3 งานเหล่านี้เลือก UDP เพราะต้องการกลไกพื้นฐานที่มี Overhead ต่ำ หรือมีความต้องการเฉพาะที่ไม่เหมือน Reliable Byte Stream ของ TCP Streaming Multimedia บางชนิดมีลักษณะ Loss Tolerant คือยอมให้ข้อมูลบางส่วนสูญหายได้ และ Rate Sensitive คือให้ความสำคัญกับจังหวะหรืออัตราการส่ง ส่วน DNS และ SNMP เป็นตัวอย่าง Protocol ที่สามารถส่งข้อความผ่าน UDP ได้ ขณะที่ HTTP/3 เป็นตัวอย่างของระบบที่ใช้ UDP เป็นชั้นล่าง แต่สร้างความสามารถเพิ่มเติมเหนือ UDP หาก Application ต้องการ Reliable Transfer บน UDP จะต้องเพิ่มกลไกความเชื่อถือได้ที่ Application Layer และหากต้องควบคุมผลกระทบต่อเครือข่ายก็ต้องเพิ่ม Congestion Control ในระดับดังกล่าวด้วย ดังนั้นการเลือก UDP ไม่ได้แปลว่า Application ห้ามมี Reliability แต่หมายความว่า UDP ไม่ได้จัดเตรียมกลไกนั้นให้โดยตรง


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์เป็นรายการข้อความสองระดับ กลุ่มแรกระบุงานที่ใช้ UDP ส่วนกลุ่มที่สองเริ่มด้วยเงื่อนไข “if reliable transfer needed over UDP” แล้วเยื้องรายการกลไกที่ต้องเพิ่ม ได้แก่ Reliability และ Congestion Control ที่ Application Layer ไม่มีไดอะแกรม Packet Flow ในหน้านี้

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ตัวอย่างการใช้ UDP: Streaming Multimedia, DNS, SNMP และ HTTP/3 Loss Tolerant หมายถึงยอมรับการสูญหายบางส่วนได้ Rate Sensitive หมายถึงให้ความสำคัญกับอัตราหรือจังหวะการส่ง Reliability และ Congestion Control สามารถสร้างเพิ่มเหนือ UDP ได้

---

## 📄 Slide 29: UDP: User Datagram Protocol [RFC 768]

*📄 Slide 29*

สไลด์นี้แสดงหน้าแรกของ RFC 768 ซึ่งเป็นเอกสารมาตรฐานที่กำหนด User Datagram Protocol เอกสารระบุผู้เขียน J. Postel และวันที่ 28 August 1980 การดู RFC ช่วยให้นักศึกษาเห็นนิยามและรูปแบบ Protocol จากแหล่งมาตรฐานโดยตรง ไม่ใช่เพียงคำสรุปในตำรา ในส่วน Introduction เอกสารอธิบายว่า UDP จัดให้มีการสื่อสารแบบ Datagram บนเครือข่าย Packet-Switched โดยใช้ IP เป็น Underlying Protocol และให้ Application ส่ง Message ถึงกันด้วยกลไกของ Protocol ขั้นต่ำ UDP มีลักษณะ Transaction-Oriented แต่ไม่ได้รับประกัน Delivery หรือ Duplicate Protection หากต้องการ Ordered Reliable Stream ควรใช้ TCP ส่วน Format ด้านล่างแสดง UDP Header แบบ 32-bit ต่อหนึ่งแถว ประกอบด้วย Field ขนาด 16 bits จำนวนสี่ช่อง ได้แก่ Source Port , Destination Port , Length และ Checksum จากนั้นจึงเป็น Data Octets หรือ Payload ของ Application เอกสารนี้สั้นประมาณ 2.5 หน้า จึงเหมาะสำหรับเริ่มฝึกอ่าน RFC


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพเป็นสำเนาหน้า RFC จริง ด้านบนมีคำว่า INTERNET STANDARD หมายเลข RFC ชื่อผู้เขียนและวันที่ ตรงกลางเป็นข้อความ Introduction ส่วนล่างเป็นไดอะแกรม Header ที่มีตำแหน่งบิต 0–31 แบ่งซ้าย–ขวาอย่างละ 16 bits ภาพนี้เชื่อมคำอธิบายเชิงแนวคิดของ UDP กับรูปแบบข้อมูลที่มาตรฐานกำหนด

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - RFC 768 เป็นเอกสารมาตรฐานของ UDP UDP ใช้ IP เป็น Protocol ชั้นล่างและมีกลไกขั้นต่ำ UDP ไม่รับประกัน Delivery และ Duplicate Protection UDP Header มี Source Port, Destination Port, Length และ Checksum การอ่าน RFC ช่วยตรวจสอบนิยามจากแหล่งมาตรฐานโดยตรง

---

## 📄 Slide 30: UDP: Transport Layer Actions

*📄 Slide 30*

สไลด์นี้เริ่มต้นตัวอย่างการทำงานของ UDP โดยใช้ SNMP Client และ SNMP Server เป็นสอง Application ที่สื่อสารกัน Client อยู่ทางซ้ายและ Server อยู่ทางขวา ทั้งสองฝั่งมี Protocol Stack ตั้งแต่ Application, Transport (UDP), Network (IP), Link และ Physical สี่เหลี่ยมสีเหลืองบริเวณรอยต่อระหว่าง Application กับ Transport แทน Socket ซึ่งเป็น Interface ที่ Application ใช้ส่งและรับข้อมูลกับ UDP เมื่อ SNMP Client ต้องการส่ง Message ข้อมูลจะผ่าน Socket ลงสู่ UDP จากนั้นผ่าน IP, Link และ Physical เพื่อเดินทางข้ามเครือข่าย เมื่อถึงฝั่ง Server กระบวนการจะย้อนขึ้นตาม Layer จนส่ง Message ผ่าน Socket ให้ SNMP Server หน้านี้เป็นภาพรวมขององค์ประกอบและจุดปลายทาง ยังไม่แสดงรายละเอียดของ Header หรือ Actions ทีละขั้น สไลด์ถัดไปจะแยกอธิบาย UDP Sender Actions และ UDP Receiver Actions เช่น การรับ Application Message การกำหนด Header Field การสร้าง UDP Segment การตรวจ Checksum และการ Demultiplex ผ่าน Socket


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ด้านซ้ายมีอุปกรณ์เครือข่ายและ Stack ของ SNMP Client ด้านขวามีเครื่อง Server และ Stack ของ SNMP Server กลุ่มเมฆสีฟ้าตรงกลางแทนเครือข่ายที่เชื่อมสองโฮสต์ เส้นจากชั้น Physical ของทั้งสองฝั่งเข้าสู่เมฆแสดงการเชื่อมต่อจริง ส่วนกรอบสีน้ำเงินรอบ Stack เน้นว่า UDP ทำงานเฉพาะที่ End System ทั้งสอง ไม่ได้ทำงานใน Router ภายในเครือข่าย

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ตัวอย่างประกอบด้วย SNMP Client และ SNMP Server ทั้งสองฝั่งใช้ UDP ที่ Transport Layer และ IP ที่ Network Layer Socket อยู่ที่ Interface ระหว่าง Application กับ Transport ข้อมูลลงตาม Layer ที่ Sender และขึ้นตาม Layer ที่ Receiver รายละเอียด Actions ฝั่งส่งและรับจะอธิบายในสไลด์ถัดไป

---

## 📄 Slide 31: UDP: Transport Layer Actions — Sender

*📄 Slide 31*

สไลด์นี้ขยายรายละเอียดการทำงานของ UDP Sender จากภาพรวมในสไลด์ก่อนหน้า ในตัวอย่างนี้ฝั่งที่กำลังส่งคือ SNMP Server ทางขวา ส่วน SNMP Client ทางซ้ายถูกทำให้จางลงเพื่อให้เห็นว่าขณะนี้เรากำลังพิจารณาการทำงานที่ฝั่งส่งเพียงฝั่งเดียว เมื่อ Application สร้าง SNMP Message ข้อมูลจะถูกส่งผ่าน Socket ลงมายัง UDP จากนั้น UDP กำหนดค่าฟิลด์ต่าง ๆ ใน Header เช่น Source Port, Destination Port, Length และ Checksum แล้วนำ Header ของ UDP หรือ UDP h มาวางไว้ด้านหน้าข้อความ ขั้นตอนนี้ทำให้ Application Message กลายเป็น UDP Segment หลังสร้าง Segment แล้ว UDP ส่งต่อ Segment ลงไปยัง IP ที่ Network Layer เพื่อให้ IP รับผิดชอบการนำข้อมูลออกสู่เครือข่าย UDP ไม่ได้สร้าง Connection หรือทำ Handshake ก่อนส่ง จึงสามารถทำขั้นตอนเหล่านี้ได้โดยตรงเมื่อได้รับข้อความจาก Application


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Protocol Stack ทางขวามี Application อยู่ด้านบน ตามด้วย Transport (UDP), Network (IP), Link และ Physical เส้นแบ่งแต่ละชั้นแสดงขอบเขตหน้าที่ของแต่ละ Layer กล่อง SNMP msg ปรากฏที่ Application Layer ก่อน จากนั้นภาพถัดลงมาแสดง UDP h + SNMP msg ที่ Transport Layer เพื่อสื่อถึงการเพิ่ม Header หรือ Encapsulation สี่เหลี่ยมสีเหลืองเล็กที่รอยต่อ Application–Transport แทน Socket ซึ่งเป็น Interface ที่ Application ใช้ส่งข้อมูลให้ UDP ส่วนเมฆสีฟ้าด้านล่างแทนเครือข่ายที่ข้อมูลจะเดินทางผ่านหลังถูกส่งต่อให้ IP

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - UDP Sender รับ Application-Layer Message ผ่าน Socket UDP กำหนดค่า Header Field และเพิ่ม UDP Header หน้าข้อมูล ผลลัพธ์คือ UDP Segment ซึ่งประกอบด้วย Header และ Payload UDP ส่ง Segment ต่อให้ IP โดยไม่ต้องตั้ง Connection ก่อน

---

## 📄 Slide 32: UDP: Transport Layer Actions — Receiver

*📄 Slide 32*

สไลด์นี้แสดงขั้นตอนตรงข้าม คือการทำงานของ UDP Receiver ในตัวอย่างนี้ฝั่งรับคือ SNMP Client ทางซ้าย ขณะที่ SNMP Server ทางขวาถูกทำให้จางลง เพื่อเน้นการประมวลผลเมื่อ Segment เดินทางมาถึงเครื่องรับ เริ่มจาก IP ส่ง UDP Segment ขึ้นมาให้ UDP ภายใน Segment ยังประกอบด้วย UDP Header และ SNMP Message จากนั้น UDP ตรวจค่าที่อยู่ในฟิลด์ Checksum เพื่อค้นหาความผิดพลาดของบิตที่อาจเกิดขึ้นระหว่างการส่ง เมื่อประมวลผล Header แล้ว UDP แยกหรือ Extract Application Message ออกจาก Segment และใช้ค่า Destination Port เพื่อทำ Demultiplexing เลือก Socket ที่ถูกต้อง ก่อนส่ง SNMP Message ผ่าน Socket ขึ้นไปยัง Process ของ SNMP Client


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ที่ Network Layer ของฝั่งซ้ายเห็นกล่อง UDP h + SNMP msg แสดง Segment ที่ IP ส่งขึ้นมา ส่วนที่ Transport Layer เหลือเฉพาะ SNMP msg หลัง UDP อ่านและนำ Header ออก วงกลมสีแดงบริเวณ Transport Layer เน้นตำแหน่งที่ UDP ตรวจ Header และส่ง Payload ไปยัง Socket ส่วนลูกศรขึ้นสู่ Application แสดงการส่งข้อมูลให้ Process ปลายทาง ภาพนี้เป็นกระบวนการ Decapsulation : ข้อมูลเดินทางขึ้นตาม Protocol Stack จาก IP → UDP → Socket → Application

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - UDP Receiver รับ Segment จาก IP Checksum ใช้ตรวจหาความผิดพลาดของข้อมูล ไม่ได้ซ่อมข้อมูลให้เอง UDP นำ Header ออกและแยก Application Message Destination Port ใช้ Demultiplex ข้อมูลไปยัง Socket และ Process ที่ถูกต้อง

---

## 📄 Slide 33: UDP Segment Header

*📄 Slide 33*

UDP Segment ประกอบด้วยสองส่วนหลัก คือ Header และ Application Data หรือ Payload แผนภาพกำหนดความกว้างหนึ่งแถวเป็น 32 บิต และแบ่ง Header ออกเป็นสี่ฟิลด์ โดยแต่ละฟิลด์มีขนาด 16 บิต ดังนั้น UDP Header มีขนาดคงที่รวม 8 ไบต์ Source Port ระบุพอร์ตของ Process ฝั่งส่ง ส่วน Destination Port ระบุพอร์ตของ Process ฝั่งรับ โดยเฉพาะ Destination Port เป็นข้อมูลสำคัญที่ Receiver ใช้ทำ Demultiplexing เพื่อเลือก Socket ปลายทาง Length ระบุความยาวของ UDP Segment เป็นหน่วยไบต์ โดยนับรวมทั้ง Header และ Payload ส่วน Checksum ใช้ตรวจหาความผิดพลาดของบิตในข้อมูลที่ส่ง หลัง Header คือพื้นที่ Application Data ซึ่งมีขนาดเปลี่ยนแปลงได้ตามข้อความที่ Application ส่งมา


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กรอบด้านบนสองแถวคือ UDP Header: แถวแรกมี Source Port และ Destination Port ส่วนแถวที่สองมี Length และ Checksum ตัวเลข เหนือกรอบหมายถึงความกว้างของแต่ละแถว 32 บิต การแบ่งเป็นสองช่องเท่า ๆ กันจึงทำให้แต่ละ Field กว้าง 16 บิต วงรีขนาดใหญ่ด้านล่างคือ Payload และลูกศร “data to/from application layer” ชี้ว่าข้อมูลส่วนนี้มาจาก Application ที่ฝั่งส่งและจะถูกส่งคืนให้ Application ที่ฝั่งรับ

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - UDP Header มี 4 ฟิลด์: Source Port, Destination Port, Length และ Checksum แต่ละฟิลด์มีขนาด 16 บิต และ Header รวมมีขนาด 8 ไบต์ Length นับความยาวทั้ง UDP Header และ Payload Payload คือข้อมูลจาก Application Layer

---

## 📄 Slide 34: UDP Checksum: แนวคิดพื้นฐาน

*📄 Slide 34*

เป้าหมายของ UDP Checksum คือการตรวจหาความผิดพลาด เช่น บิตบางตำแหน่งถูกเปลี่ยนระหว่างการส่ง สไลด์ใช้ตัวเลขฐานสิบอย่างง่ายเพื่ออธิบายแนวคิดก่อนเข้าสู่การคำนวณจริงแบบเลขฐานสอง ฝั่งส่งมีตัวเลข 5 และ 6 ซึ่งรวมกันได้ 11 จึงส่งข้อมูลทั้งสองค่าพร้อมค่าตรวจสอบ 11 ไปยังปลายทาง ระหว่างการส่ง ค่าตัวแรกเปลี่ยนจาก 5 เป็น 4 แต่ค่าตรวจสอบที่ติดมากับข้อมูลยังเป็น 11 ฝั่งรับคำนวณจากข้อมูลที่ได้รับใหม่เป็น 4 + 6 = 10 แล้วเปรียบเทียบกับค่าที่ Sender ส่งมา คือ 11 เนื่องจากสองค่า ไม่เท่ากัน Receiver จึงทราบว่าข้อมูลหรือ Checksum เกิดความผิดพลาดระหว่างทาง ตัวอย่างนี้เป็นเพียงภาพแนวคิด ส่วน Internet Checksum จริงจะคำนวณด้วยคำข้อมูลขนาด 16 บิต

| โปรโตคอล RDT | สภาพแวดล้อมของช่องสัญญาณ | กลไกหลักที่เพิ่มเข้ามา |
| :---: | :--- | :--- |
| **rdt 1.0** | สมบูรณ์แบบ 100% (ไม่มีบิตผิดพลาด, ไม่สูญหาย) | ส่งและรับข้อมูลธรรมดา ไม่ต้องมีกลไกตรวจสอบ |
| **rdt 2.0** | มีบิตผิดพลาด (Bit Errors) เกิดขึ้นได้ | ใช้ Checksum + ตอบกลับด้วย ACK (ถูกต้อง) / NAK (ผิดพลาด) |
| **rdt 2.1** | สัญญาณ ACK/NAK อาจเสียหายได้ | เพิ่มหมายเลขลำดับ (Sequence Number: 0 และ 1) |
| **rdt 2.2** | ไร้ NAK (NAK-Free Protocol) | ใช้เฉพาะ ACK พร้อมระบุหมายเลข เช่น ACK 0 / ACK 1 |
| **rdt 3.0** | มีทั้งบิตผิดพลาดและ **Packet สูญหาย (Packet Loss)** | เพิ่มตัวนับเวลาถอยหลัง (Countdown Timer) เพื่อส่งซ้ำเมื่อ Timeout |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> แถว Transmitted แสดงข้อมูลเดิม 5 และ 6 พร้อมผลรวม 11 ส่วนลูกศรสีแดงชี้ลงเพื่อแสดงการเดินทางผ่านเครือข่าย แถว Received แสดงว่าค่า 5 เปลี่ยนเป็น 4 เครื่องหมายวงกลมสีแดงและสัญลักษณ์ไม่เท่ากันเน้นว่า Receiver-Computed Checksum ไม่ตรงกับ Sender-Computed Checksum ที่รับมา ภาพต้องการสื่อหลักการ “คำนวณใหม่แล้วเปรียบเทียบ” ไม่ใช่สูตร Internet Checksum ที่ใช้จริงทั้งหมด

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Checksum มีหน้าที่ตรวจหา Error ไม่ได้ป้องกันไม่ให้ Error เกิด Receiver คำนวณ Checksum จากข้อมูลที่ได้รับอีกครั้ง ถ้าค่าที่คำนวณไม่ตรงกับ Checksum ที่รับมา แสดงว่าตรวจพบ Error ตัวอย่างฐานสิบนี้ใช้เพื่อสร้างความเข้าใจก่อนคำนวณแบบ 16 บิต

---

## 📄 Slide 35: Internet Checksum: ขั้นตอนของ Sender และ Receiver

*📄 Slide 35*

Internet Checksum ใช้หลักการนำข้อมูลมามองเป็นชุดของจำนวนเต็มขนาด 16 บิต แล้วบวกด้วย One’s Complement Addition สำหรับ UDP การคำนวณครอบคลุมเนื้อหา UDP Segment รวมถึง UDP Header, Payload และข้อมูล IP Address ที่นำมาประกอบการตรวจสอบ ฝั่ง Sender แบ่งข้อมูลเป็นกลุ่มละ 16 บิต นำทุกกลุ่มมาบวกกัน หากมี Carry เกินบิตที่ 16 จะนำ Carry วนกลับมาบวกด้านขวาสุด จากนั้นสร้างค่า Checksum และใส่ไว้ใน UDP Checksum Field ก่อนส่ง Segment ฝั่ง Receiver คำนวณ Checksum จาก Segment ที่ได้รับแล้วเปรียบเทียบกับค่า Checksum ใน Header หากไม่เท่ากันถือว่าตรวจพบ Error หากเท่ากันหมายถึง ไม่ตรวจพบ Error แต่ไม่ได้ยืนยันว่าข้อมูลถูกต้อง 100% เพราะรูปแบบความผิดพลาดบางชนิดอาจให้ผล Checksum เดิม


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์แบ่งเป็นสองคอลัมน์: ซ้ายคือ Sender และขวาคือ Receiver เพื่อแสดงว่าทั้งสองฝั่งต้องใช้วิธีคำนวณที่สอดคล้องกัน ข้อความสีแดงเน้น Goal คือ “detect errors” และคำว่า not equal กับ equal คือเงื่อนไขตัดสินผลของ Receiver ประโยค “But maybe errors nonetheless?” เตือนว่า Checksum เป็นกลไกตรวจข้อผิดพลาดที่มีข้อจำกัด ไม่ใช่หลักฐานยืนยันความถูกต้องแบบสมบูรณ์

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ข้อมูลถูกแบ่งเป็นคำขนาด 16 บิตก่อนคำนวณ One’s Complement Addition ใช้ End-Around Carry เมื่อผลบวกเกิน 16 บิต Sender ใส่ Checksum ใน Header และ Receiver คำนวณเพื่อตรวจสอบอีกครั้ง Checksum เท่ากันหมายถึงไม่ตรวจพบ Error ไม่ได้หมายความว่าไม่มี Error แน่นอน

---

## 📄 Slide 36: Internet Checksum: ตัวอย่างการคำนวณ

*📄 Slide 36*

สไลด์นี้แสดงการบวกเลขฐานสองขนาด 16 บิตสองจำนวน คือ 1110011001100110 และ 1101010101010101 เมื่อนำมาบวกกันจะได้ผล 17 บิต คือ 1 1011101110111011 โดยเลข 1 ซ้ายสุดเป็น Carry ที่เกินขอบเขต 16 บิต Internet Checksum ไม่ทิ้ง Carry นี้ แต่ใช้ Wraparound หรือ End-Around Carry โดยนำเลข 1 วนกลับมาบวกกับ 16 บิตด้านล่าง จึงได้ Sum เป็น 1011101110111100 ขั้นสุดท้ายกลับค่าทุกบิตของ Sum ตามหลัก One’s Complement คือ 1 เปลี่ยนเป็น 0 และ 0 เปลี่ยนเป็น 1 จึงได้ Checksum เป็น 0100010001000011 ค่านี้จะถูกใส่ใน Checksum Field เพื่อส่งไปพร้อมข้อมูล


> [!DEFINITION] Process Addressing
> ในการส่งข้อมูลไปยัง Process ที่ถูกต้อง ต้องระบุ:
> 1. **IP Address:** ระบุ Host ปลายทาง (32-bit สำหรับ IPv4)
> 2. **Port Number:** ระบุ Process บน Host นั้น (16-bit, 0-65535)
> - ตัวอย่าง: Web Server = IP + Port 80, Mail Server = IP + Port 25

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นและวงกลมสีแดงบริเวณคำว่า wraparound ชี้ให้เห็น Carry ด้านซ้ายที่ถูกนำกลับมาบวกทางขวา บรรทัด sum คือผลหลังจัดการ Carry แล้ว ส่วนบรรทัด checksum คือผลจากการกลับบิตของ Sum หมายเหตุด้านล่างย้ำกฎสำคัญว่า Carry Out จาก Most Significant Bit ต้องนำกลับมาบวกกับผลลัพธ์ ไม่ใช่ตัดทิ้ง

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - บวกข้อมูลครั้งละ 16 บิต ผลที่เกิน 16 บิตต้องทำ End-Around Carry Checksum ได้จากการกลับบิตของ Sum ในตัวอย่าง Checksum คือ 0100010001000011

---

## 📄 Slide 37: Internet Checksum: Weak Protection

*📄 Slide 37*

สไลด์นี้ใช้ตัวอย่างเดิมเพื่อแสดงข้อจำกัดของ Internet Checksum แม้ตัวเลขที่ส่งจะเกิด Bit Flips แต่หากการเปลี่ยนแปลงของบิตสองตำแหน่งหักล้างกันทางคณิตศาสตร์ ผลรวมอาจยังคงเดิม และ Checksum ที่คำนวณได้จึงไม่เปลี่ยน วงกลมสีแดงแสดงบิตที่เปลี่ยนในจำนวนสองชุด โดยการเปลี่ยนหนึ่งตำแหน่งเพิ่มค่า ขณะที่อีกตำแหน่งลดค่าในปริมาณที่ชดเชยกัน ดังนั้นหลังบวกแบบ One’s Complement แล้ว Sum และ Checksum ยังคงเหมือนข้อมูลเดิม Receiver จึงอาจไม่สามารถตรวจพบ Error รูปแบบนี้ได้ คำว่า Weak Protection ไม่ได้หมายความว่า Checksum ไม่มีประโยชน์ แต่หมายความว่าเป็นการตรวจจับข้อผิดพลาดแบบเบาและมีโอกาสพลาดได้ จึงไม่ควรใช้แทนกลไกด้านความมั่นคงปลอดภัยหรือการตรวจสอบความถูกต้องที่เข้มแข็งกว่า


> [!DEFINITION] Process Addressing
> ในการส่งข้อมูลไปยัง Process ที่ถูกต้อง ต้องระบุ:
> 1. **IP Address:** ระบุ Host ปลายทาง (32-bit สำหรับ IPv4)
> 2. **Port Number:** ระบุ Process บน Host นั้น (16-bit, 0-65535)
> - ตัวอย่าง: Web Server = IP + Port 80, Mail Server = IP + Port 25

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ด้านขวาของเลขฐานสองมีวงกลมสีแดงล้อมตำแหน่งที่เปลี่ยน พร้อมป้าย และ เพื่อแสดงการสลับค่าบิตในสองจำนวน วงเล็บด้านขวาครอบ Sum และ Checksum พร้อมข้อความว่าแม้ตัวเลขเปลี่ยน แต่ Checksum ไม่เปลี่ยน ซึ่งเป็นประเด็นหลักของภาพ ภาพนี้เชื่อมกับคำเตือนในสไลด์ก่อนว่า “Checksum เท่ากัน” ยังอาจมี Error อยู่ได้

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Internet Checksum ตรวจจับ Error ได้หลายกรณี แต่ไม่ใช่ทุกกรณี Bit Flips ที่หักล้างกันอาจทำให้ Sum และ Checksum คงเดิม Checksum จึงให้ Error Detection ไม่ใช่การรับประกันความถูกต้อง 100% Checksum ที่ได้ค่าเดิมจึงยังไม่ยืนยันว่าข้อมูลไม่มี Error

---

## 📄 Slide 38: Summary: UDP

*📄 Slide 38*

UDP เป็นโพรโทคอลแบบ No Frills หรือมีเฉพาะกลไกพื้นฐานที่จำเป็น Segment อาจสูญหายและอาจถูกส่งถึง Application ไม่ตรงลำดับ จึงเรียกว่าให้บริการแบบ Best Effort ซึ่งสไลด์สรุปอย่างไม่เป็นทางการว่า “ส่งแล้วหวังว่าจะถึง” ข้อดีสำคัญคือ UDP ไม่ต้องทำ Setup หรือ Handshake จึงไม่เสียเวลาเพิ่มหนึ่ง RTT ก่อนเริ่มส่งข้อมูล ไม่มีสถานะ Connection ที่ต้องดูแล และยังสามารถส่งต่อได้แม้บริการเครือข่ายมีปัญหาหรือเกิด Congestion โดยตัว UDP เองจะไม่ลดอัตราการส่งด้วย Congestion Control UDP มี Checksum ช่วยตรวจหาความผิดพลาด แต่ไม่ได้ทำให้การส่งเชื่อถือได้โดยอัตโนมัติ หาก Application ต้องการ Reliability, การเรียงลำดับ หรือ Congestion Control สามารถสร้างกลไกเหล่านั้นเพิ่มที่ Application Layer ได้ ตัวอย่างที่สไลด์กล่าวถึงคือ HTTP/3 ซึ่งสร้างความสามารถเพิ่มเติมบน UDP


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รายการด้านบนของสไลด์เน้นข้อจำกัด: Lost, Out of Order และ Best Effort ส่วนรายการด้านล่างเปลี่ยนมาเน้นข้อดีของการไม่มี Connection Setup คำว่า “no RTT incurred” หมายถึงไม่มี RTT ที่เกิดจากการทำ Handshake ก่อนส่งข้อมูล ไม่ได้หมายความว่าการส่งผ่านเครือข่ายไม่มี Delay บรรทัดสุดท้ายชี้แนวคิดสำคัญว่า UDP เป็นฐานที่ Application สามารถต่อยอดฟังก์ชันตามความต้องการเฉพาะได้

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - UDP ไม่รับประกัน Delivery หรือ Ordering ไม่มี Handshake จึงเริ่มส่งได้ทันทีและมี Overhead ต่ำ Checksum ช่วยตรวจ Error แต่ไม่สร้าง Reliability ครบถ้วน Application สามารถเพิ่มฟังก์ชันบน UDP ได้ เช่น HTTP/3

---

## 📄 Slide 39: Chapter 3 Roadmap: เข้าสู่ Reliable Data Transfer

*📄 Slide 39*

Principles of Reliable Data Transfer Principles of Reliable Data Transfer Roadmap หน้านี้แสดงว่าหัวข้อ Connectionless Transport: UDP ได้จบลงแล้ว และบทเรียนกำลังเข้าสู่ Principles of Reliable Data Transfer ซึ่งเป็นการศึกษาหลักการทั่วไปว่าทำอย่างไรให้ข้อมูลส่งผ่านช่องทางที่อาจไม่สมบูรณ์ แต่ผู้ใช้งานด้านบนยังได้รับบริการที่ดูเชื่อถือได้ หัวข้อนี้จะเป็นพื้นฐานก่อนศึกษา TCP เพราะ TCP ต้องนำหลักการ เช่น Error Detection, Acknowledgement, Sequence Number, Retransmission และ Timer มาประกอบกันเพื่อให้บริการ Reliable Data Transfer ภาพโครงสร้างคล้ายสะพานส่งน้ำหรือ Aqueduct สื่อถึง “Channel” ที่ทำหน้าที่ลำเลียงสิ่งหนึ่งจากต้นทางไปยังปลายทาง เปรียบได้กับช่องทางสื่อสารที่ต้องนำข้อมูลไปถึงอีกฝั่งอย่างต่อเนื่องและเชื่อถือได้


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รายการ Roadmap ใช้ตัวอักษรเข้มที่ Principles of reliable data transfer ส่วนหัวข้อก่อนหน้าและถัดไปเป็นสีจาง จึงบอกตำแหน่งปัจจุบันของบทเรียน ภาพทางขวาไม่ได้แสดง Protocol Stack โดยตรง แต่ทำหน้าที่เป็นภาพเปรียบเทียบของช่องทางลำเลียง เพื่อเตรียมเข้าสู่แนวคิด Reliable Channel ในสไลด์ถัดไป

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - หัวข้อถัดจาก UDP คือหลักการ Reliable Data Transfer หลักการนี้เป็นพื้นฐานสำคัญของ TCP เราจะเริ่มจากภาพบริการที่ต้องการ แล้วจึงศึกษาวิธีสร้างบริการนั้นบนช่องทางที่ไม่น่าเชื่อถือ

---

## 📄 Slide 40: Principles of Reliable Data Transfer: Reliable Service Abstraction

*📄 Slide 40*

สไลด์นี้เริ่มจากมุมมองของ Application โดยมี Sending Process ทางซ้ายส่ง Data ลงผ่านขอบเขตระหว่าง Application Layer กับ Transport Layer และ Receiving Process ทางขวาได้รับ Data ขึ้นจาก Transport Layer ท่อสีน้ำเงินที่เขียนว่า reliable แทน Reliable Service Abstraction กล่าวคือ จากมุมมองของ Process ทั้งสอง ดูเสมือนว่ามีช่องทางที่เชื่อถือได้เชื่อมถึงกันโดยตรง Application จึงมุ่งใช้บริการส่งข้อมูลได้โดยไม่ต้องรู้รายละเอียดภายในว่าระบบจัดการ Error หรือการสูญหายอย่างไร ลูกศรในภาพแสดงการส่งข้อมูลเพียงทิศทางเดียวจาก Sender ไป Receiver ตาม Speaker Note ของสไลด์ จุดประสงค์ของภาพยังไม่ใช่การแสดงกลไกควบคุมทั้งหมด แต่เป็นการกำหนด “บริการที่ต้องการ” ก่อน จากนั้นสไลด์ถัดไปจะแสดงว่า Transport Protocol ต้องสร้างบริการนี้บน Network Channel ที่อาจไม่น่าเชื่อถือ


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นสีแดงแนวนอนคือขอบเขตระหว่าง Application และ Transport ส่วน Process และกล่อง Data อยู่เหนือเส้น ขณะที่ท่อ Reliable อยู่ใต้เส้นใน Transport Layer ลูกศรสีน้ำเงินจาก Sending Process ลงสู่ท่อและขึ้นไปยัง Receiving Process แสดงเส้นทางเชิงตรรกะของข้อมูล ไม่ได้แสดง Router หรือ Link จริงภายในเครือข่าย คำว่า abstraction ที่เป็นสีแดงเน้นว่า “Reliable Channel” ในภาพคือมุมมองบริการที่นำเสนอแก่ Application ไม่ใช่คำอธิบายกลไกภายในทั้งหมด

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Reliable Service Abstraction คือภาพบริการที่ Application มองเห็น Sending Process ส่ง Data ลงสู่ Transport และ Receiving Process รับ Data ขึ้นมา ภาพแสดงการส่งข้อมูลทางเดียวจาก Sender ไป Receiver ขั้นต่อไปคือศึกษาว่าจะสร้างบริการนี้บนช่องทางที่ไม่น่าเชื่อถือได้อย่างไร

---

## 📄 Slide 41: Principles of Reliable Data Transfer: จาก Service Abstraction สู่ Service Implementation

*📄 Slide 41*

สไลด์นี้เชื่อมต่อจากภาพ Reliable Service Abstraction ในสไลด์ก่อนหน้าไปสู่ Reliable Service Implementation หรือกลไกจริงที่ทำให้บริการดูเชื่อถือได้จากมุมมองของ Application แม้เครือข่ายชั้นล่างจะเป็น Unreliable Channel . ในภาพด้านขวา Sending Process ส่ง Data ลงมายัง sender-side of reliable data transfer protocol ส่วนฝั่งปลายทางมี receiver-side of reliable data transfer protocol รับ Packet จากเครือข่าย ตรวจสอบและจัดการก่อนส่ง Data ขึ้นไปยัง Receiving Process กลไกทั้งสองฝั่งอยู่ที่ Transport Layer ของ End System ไม่ได้อยู่ภายใน Router ระหว่างทาง. แม้เป้าหมายของตัวอย่างคือส่งข้อมูลทางเดียวจาก Sender ไป Receiver แต่ Speaker Notes เน้นว่า การสร้างความเชื่อถือได้เหนือช่องทางที่ไม่น่าเชื่อถือต้องมีการสื่อสารสองทิศทางระหว่างกลไกฝั่งส่งและฝั่งรับ เช่น ฝั่งรับอาจต้องส่งข้อมูลควบคุมกลับไปให้ฝั่งส่งทราบสถานะการรับข้อมูล.


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพจางทางซ้ายคือบริการที่ Application มองเห็น: เสมือนมี Reliable Channel เชื่อม Process ทั้งสองโดยตรง ลูกศรสีแดงชี้ไปยังภาพด้านขวาเพื่อบอกว่า ต่อไปจะเปิดดูรายละเอียดว่าบริการนั้นถูกสร้างขึ้นอย่างไร. วงรีสีแดงสองวงคือส่วนของ Reliable Data Transfer Protocol ที่ทำงานแยกกันคนละปลายทาง ส่วนท่อสีน้ำเงินด้านล่างคือ Unreliable Channel ของ Network Layer. เส้นแนวนอนสีแดงแบ่งขอบเขต Application, Transport และ Network; Data ลงจาก Application เข้าสู่ Transport แล้วจึงถูกส่งเป็น Packet ผ่านช่องทางชั้นล่าง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Service Abstraction คือสิ่งที่ Application มองเห็น ส่วน Service Implementation คือกลไกจริงภายใน Transport Layer Reliable Data Transfer ต้องมีส่วนทำงานทั้งฝั่ง Sender และ Receiver ข้อมูลหลักอาจส่งทางเดียว แต่ข้อมูลควบคุมสามารถไหลกลับอีกทิศทางหนึ่ง Transport Protocol สร้างบริการที่เชื่อถือได้เหนือช่องทางที่ไม่น่าเชื่อถือ

---

## 📄 Slide 42: Principles of Reliable Data Transfer: ความซับซ้อนขึ้นกับลักษณะของช่องทาง

*📄 Slide 42*

สไลด์นี้เน้นว่า ความซับซ้อนของ Reliable Data Transfer Protocol ไม่ได้มีค่าคงที่ แต่ขึ้นอยู่กับปัญหาหรือ Impairments ที่ช่องทางชั้นล่างอาจทำให้เกิดขึ้น. ข้อความกลางภาพยกตัวอย่างลักษณะของ Unreliable Channel ได้แก่ ข้อมูลอาจ สูญหาย (lose) , เสียหายหรือบิตเปลี่ยน (corrupt) หรือ มาถึงผิดลำดับ (reorder) หากช่องทางไม่มีปัญหาเหล่านี้ กลไกที่ Sender และ Receiver ต้องทำจะง่ายกว่า แต่เมื่อช่องทางมีความผิดปกติมากขึ้น Protocol ก็ต้องมีขั้นตอนมากขึ้นเพื่อรักษาคุณสมบัติการส่งข้อมูลที่เชื่อถือได้. แนวทางของบทเรียนจึงเป็นการพัฒนา rdt แบบเพิ่มความสามารถทีละขั้น เริ่มจากกรณีง่ายที่สุด แล้วเพิ่มกลไกเมื่อสมมติฐานเกี่ยวกับช่องทางเปลี่ยนไป.


> [!DEFINITION] หลักการ Reliable Data Transfer
> - **Checksum:** ตรวจจับ Bit Error ในข้อมูล
> - **ACK/NAK:** แจ้งผู้ส่งว่ารับสำเร็จหรือไม่
> - **Sequence Number:** ตรวจจับ Duplicate Packet
> - **Timer + Retransmit:** จับเวลาและส่งซ้ำเมื่อ Timeout
> - **Pipelining:** ส่งหลาย Packet พร้อมกันเพื่อเพิ่มประสิทธิภาพ

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพยังคงแสดง Sender-side และ Receiver-side Reliable Data Transfer Protocol อยู่เหนือ Unreliable Channel เหมือนสไลด์ก่อนหน้า. เส้นสีแดงจากข้อความกลางชี้ไปยังทั้งสองฝั่ง เพื่อสื่อว่าลักษณะของช่องทางมีผลต่อการออกแบบและภาระงานของทั้ง Sender และ Receiver. คำว่า lose, corrupt และ reorder ในวงเล็บเป็นตัวอย่างคำถามที่ต้องพิจารณาก่อนออกแบบ Protocol.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ต้องทราบก่อนว่าช่องทางอาจทำข้อมูลสูญหาย เสียหาย หรือผิดลำดับหรือไม่ ช่องทางยิ่งมีข้อบกพร่องมาก Protocol ยิ่งต้องมีกลไกมากขึ้น Sender และ Receiver ต้องร่วมกันสร้าง Reliable Service บทเรียนจะเพิ่มความสามารถของ rdt ตามสมมติฐานของช่องทางทีละขั้น

---

## 📄 Slide 43: Principles of Reliable Data Transfer: Sender และ Receiver มองไม่เห็นสถานะของกันและกัน

*📄 Slide 43*

สไลด์นี้เสนอหลักสำคัญของการออกแบบ Distributed Protocol: Sender และ Receiver ไม่สามารถมองเห็นสิ่งที่เกิดขึ้นอีกฝั่งได้โดยตรง เช่น Sender ไม่สามารถรู้เองว่า Message ที่ส่งไปถึง Receiver แล้วหรือยัง. แต่ละฝั่งจะรู้สถานะของอีกฝั่งได้ก็ต่อเมื่อมีการ สื่อสารผ่าน Message เท่านั้น ดังนั้น หาก Receiver รับข้อมูลถูกต้อง Receiver ต้องส่งข้อมูลบางอย่างกลับมาให้ Sender ทราบ และ Sender ต้องตีความ Message ที่ได้รับตามกฎของ Protocol. Speaker Notes เปรียบเหมือนมีม่านกั้นระหว่างสองฝั่ง ผู้สังเกตภายนอกอาจเห็นว่าข้อมูลสูญหาย แต่ Sender เองจะรู้ได้จากสิ่งที่สังเกตได้ในระบบของตน เช่น ได้รับหรือไม่ได้รับ Message ตอบกลับ ไม่ใช่จากการมองทะลุไปยัง Receiver.


> [!DEFINITION] หลักการ Reliable Data Transfer
> - **Checksum:** ตรวจจับ Bit Error ในข้อมูล
> - **ACK/NAK:** แจ้งผู้ส่งว่ารับสำเร็จหรือไม่
> - **Sequence Number:** ตรวจจับ Duplicate Packet
> - **Timer + Retransmit:** จับเวลาและส่งซ้ำเมื่อ Timeout
> - **Pipelining:** ส่งหลาย Packet พร้อมกันเพื่อเพิ่มประสิทธิภาพ

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ม่านสีขาวปิดฝั่ง Receiver ในภาพ เพื่อสื่อว่า Sender ไม่สามารถเห็น State หรือเหตุการณ์ภายใน Receiver ได้. ฝั่ง Sender ยังเห็นเพียง Process, Sender-side Protocol และช่องทางที่เชื่อมออกไป ส่วนสิ่งที่อยู่อีกหลังม่านต้องเรียนรู้ผ่าน Message. ข้อความด้านซ้ายย้ำตัวอย่าง State ที่อยากรู้ว่า “Message ถูกได้รับแล้วหรือไม่” และตอบว่า ต้องมีการสื่อสารผ่าน Message.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Sender และ Receiver มี Local State ของตนเองและไม่เห็น State ของอีกฝั่งโดยตรง ข้อมูลเกี่ยวกับอีกฝั่งต้องเรียนรู้จาก Message ที่แลกเปลี่ยนกัน Protocol คือกฎที่กำหนดว่าจะส่ง รับ และตีความ Message อย่างไร หลักนี้เป็นเหตุผลที่ Reliable Data Transfer ต้องมีข้อมูลควบคุมระหว่างสองฝั่ง

---

## 📄 Slide 44: Reliable Data Transfer Protocol (rdt): Interfaces

*📄 Slide 44*

สไลด์นี้กำหนด Interface หรือจุดเรียกใช้ระหว่าง Application, Reliable Data Transfer Protocol และ Unreliable Channel เพื่อให้เข้าใจว่าเหตุการณ์ใดเรียกฟังก์ชันใดในแต่ละฝั่ง. เมื่อ Application ฝั่งส่งมีข้อมูลใหม่ จะเรียก rdt_send(data) จากด้านบนและส่ง Data ให้ Sender-side rdt จากนั้น rdt สร้าง Packet ซึ่งประกอบด้วย Header และ Data แล้วเรียก udt_send(packet) เพื่อส่ง Packet ลงไปยัง Unreliable Channel. เมื่อ Packet เดินทางมาถึงฝั่งรับ ช่องทางชั้นล่างเรียก rdt_rcv(packet) เพื่อแจ้ง Receiver-side rdt ว่ามี Packet เข้ามา เมื่อ Receiver-side rdt จัดการ Packet เรียบร้อยแล้ว จะเรียก deliver_data(data) เพื่อส่ง Data ขึ้นไปยัง Receiving Process. คำว่า Bi-directional communication over unreliable channel ใต้ภาพหมายถึง ช่องทางระหว่าง rdt ทั้งสองฝั่งรองรับ Message ได้ทั้งสองทิศทาง แม้ตัวอย่างหลักจะพิจารณาการส่ง Application Data จากซ้ายไปขวา เพราะ Protocol อาจต้องส่ง Control Information กลับจาก Receiver ไป Sender.


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กล่อง Data ด้านบนแทนข้อมูลจาก Application ส่วนกล่อง Header + Data ด้านล่างแทน Packet ที่ Protocol ส่งผ่านช่องทาง. ลูกศร rdt_send() และ deliver_data() อยู่ที่ Interface ระหว่าง Application กับ rdt; ลูกศร udt_send() และ rdt_rcv() อยู่ที่ Interface ระหว่าง rdt กับช่องทางชั้นล่าง. คำว่า “called from above” หมายถึงถูกเรียกจาก Layer ที่สูงกว่า ส่วน “called when packet arrives” หมายถึงเกิดเป็น Event เมื่อ Packet มาถึงจากด้านล่าง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - rdt_send(data): Application ส่ง Data ให้ Sender-side rdt udt_send(packet): rdt ส่ง Packet ลง Unreliable Channel rdt_rcv(packet): ถูกเรียกเมื่อ Packet มาถึง Receiver-side rdt deliver_data(data): Receiver-side rdt ส่ง Data ที่พร้อมใช้งานขึ้นสู่ Application Data คือเนื้อหาจาก Application ส่วน Packet คือหน่วยที่มี Header ประกอบเพื่อใช้ส่งผ่านช่องทาง

---

## 📄 Slide 45: Reliable Data Transfer: Getting Started และการใช้ Finite State Machine

*📄 Slide 45*

บทเรียนจะพัฒนา Reliable Data Transfer Protocol หรือ rdt แบบเพิ่มความสามารถทีละขั้น โดยสร้างทั้ง Sender Side และ Receiver Side และในช่วงนี้จะพิจารณา Unidirectional Data Transfer คือ Application Data ไหลจาก Sender ไป Receiver ทางเดียว แต่ Control Information ยังสามารถไหลได้ทั้งสองทิศทาง. เพื่อระบุพฤติกรรมของ Protocol อย่างชัดเจน สไลด์ใช้ Finite State Machine (FSM) แทนคำอธิบายด้วยข้อความเพียงอย่างเดียว FSM ช่วยแสดงว่า Protocol อยู่ใน State ใด รอ Event อะไร เมื่อ Event เกิดจะทำ Action ใด และเปลี่ยนไป State ใด. ใน State หนึ่ง เมื่อได้รับ Event ที่กำหนด ทั้ง Current State และ Event จะกำหนด Next State ได้อย่างแน่นอน จึงทำให้สามารถตรวจสอบขั้นตอนของ Protocol ได้เป็นระบบและลดความกำกวม.


```
[ TCP Connection Close (4-Way) ]
Client                          Server
  │── FIN ────────────────────────>│   Client ขอปิด
  │<── ACK ────────────────────────│   Server รับทราบ
  │<── FIN ────────────────────────│   Server ขอปิดด้วย
  │── ACK ────────────────────────>│   Client รับทราบ
  │  (TIMED WAIT: 2*MSL)          │   รอให้แน่ใจว่า ACK ถึง
  │── [Connection Closed] ────────>│
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> วงกลม “state 1” และ “state 2” แทนสถานะของ Protocol ส่วนลูกศรแทน State Transition. ป้ายกำกับบนลูกศรแบ่งด้วยเส้นแนวนอน: ข้อความเหนือเส้นคือ Event ที่ทำให้เกิด Transition และข้อความใต้เส้นคือ Action ที่ต้องทำเมื่อ Event นั้นเกิด. ลูกศรโค้งกลับเข้าหา State เดิมหมายถึงเกิด Event แล้ว Protocol ทำ Action แต่ยังคงอยู่ใน State เดิม.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - พัฒนา rdt ทีละรุ่นจากกรณีง่ายไปยาก Data Transfer ในตัวอย่างเป็นทางเดียว แต่ Control Information เป็นสองทิศทาง FSM ประกอบด้วย State, Event, Action และ Transition รูปแบบป้ายบนลูกศรอ่านเป็น Event เหนือเส้น และ Action ใต้เส้น

---

## 📄 Slide 46: rdt1.0: Reliable Transfer over a Reliable Channel

*📄 Slide 46*

rdt1.0 เริ่มจากสมมติฐานง่ายที่สุด คือช่องทางชั้นล่าง เชื่อถือได้อย่างสมบูรณ์ : ไม่มี Bit Error และไม่มี Packet Loss จึงไม่ต้องมี ACK, NAK, Checksum, Timer หรือการส่งซ้ำ. Sender FSM มี State เดียวคือ Wait for call from above เมื่อ Application เรียก rdt_send(data) Sender จะสร้าง Packet ด้วย packet = make_pkt(data) แล้วเรียก udt_send(packet) จากนั้นกลับมารอ Data ชุดถัดไปใน State เดิม. Receiver FSM มี State เดียวคือ Wait for call from below เมื่อเกิด rdt_rcv(packet) Receiver จะใช้ extract(packet, data) แยก Data ออกจาก Packet แล้วเรียก deliver_data(data) ส่งขึ้น Application ก่อนกลับไปรอ Packet ถัดไป. แม้จะมี FSM แยกสำหรับ Sender และ Receiver แต่ภายใต้สมมติฐานว่าช่องทางสมบูรณ์ การทำงานจึงตรงไปตรงมา ดังที่ภาพปุ่ม “easy” ใช้สื่อว่ารุ่นนี้เป็นกรณีพื้นฐานที่สุด.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> FSM ทางซ้ายคือ Sender และทางขวาคือ Receiver แต่ละฝั่งมีวงกลม State เพียงหนึ่งวงและลูกศรโค้งกลับ State เดิม. บน Transition ของ Sender Event คือ rdt_send(data) และ Action คือสร้าง Packet แล้วส่งลงช่องทาง. บน Transition ของ Receiver Event คือ rdt_rcv(packet) และ Action คือแยก Data แล้วส่งขึ้น Application.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - rdt1.0 สมมติว่าไม่มี Bit Error และไม่มี Packet Loss Sender รับ Data สร้าง Packet และส่งทันที Receiver รับ Packet แยก Data และส่งขึ้น Application ทันที ไม่ต้องใช้ Feedback หรือการตรวจและกู้คืน Error เพราะช่องทางสมบูรณ์

---

## 📄 Slide 47: rdt2.0: Channel with Bit Errors — ตั้งโจทย์การกู้คืนความผิดพลาด

*📄 Slide 47*

rdt2.0 เปลี่ยนสมมติฐานให้สมจริงขึ้น: ช่องทางอาจทำให้บิตบางตำแหน่งใน Packet พลิกค่า จึงเกิด Bit Error ได้ แม้ Packet จะยังเดินทางมาถึง Receiver. Protocol สามารถใช้ Checksum เช่น Internet Checksum เพื่อตรวจว่าข้อมูลที่ได้รับอาจเสียหาย แต่ Checksum ทำหน้าที่เพียงตรวจพบ Error ไม่ได้บอกเองว่าจะกู้คืนอย่างไร. คำถามหลักของสไลด์จึงเป็น “จะ Recover from Errors ได้อย่างไร” และชวนเปรียบเทียบกับการสนทนาของมนุษย์ เมื่อได้ยินข้อความไม่ชัดเจน ผู้ฟังต้องมีวิธีส่งสัญญาณหรือขอให้ผู้พูดดำเนินการบางอย่าง ซึ่งสไลด์ถัดไปจะแปลงแนวคิดนี้เป็นกลไกของ Protocol.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์นี้ไม่มีไดอะแกรม FSM แต่ใช้ Bullet สรุปสมมติฐานใหม่และคำถามการออกแบบ. คำถามสีแดงด้านล่าง “How do humans recover from errors during conversation?” ใช้เชื่อมแนวคิดในชีวิตประจำวันไปสู่ Feedback ระหว่าง Receiver และ Sender.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - rdt2.0 พิจารณาช่องทางที่อาจทำให้บิตใน Packet เปลี่ยน Checksum ใช้ตรวจ Bit Error การตรวจพบ Error กับการกู้คืน Error เป็นคนละหน้าที่ ต้องเพิ่มกลไกสื่อสารผลการรับจาก Receiver กลับไปยัง Sender

---

## 📄 Slide 48: rdt2.0: ACK, NAK, Retransmission และ Stop-and-Wait

*📄 Slide 48*

rdt2.0 เพิ่ม Feedback จาก Receiver กลับไปยัง Sender เพื่อกู้คืนจาก Bit Error โดยใช้ Acknowledgement (ACK) และ Negative Acknowledgement (NAK) . เมื่อ Receiver ตรวจว่า Packet ถูกต้อง จะส่ง ACK เพื่อแจ้งว่าได้รับ Packet เรียบร้อย แต่ถ้าตรวจพบ Error จะส่ง NAK เพื่อแจ้งว่า Packet มีปัญหา เมื่อ Sender ได้รับ NAK จะ Retransmit หรือส่ง Packet เดิมซ้ำ. รูปแบบนี้เป็น Stop-and-Wait Protocol : Sender ส่ง Packet ได้ครั้งละหนึ่ง Packet แล้วหยุดรอ Response จาก Receiver ก่อนจึงดำเนินการต่อ วิธีนี้ทำให้ Sender รู้ว่าควรส่ง Packet ใหม่หรือส่ง Packet เดิมซ้ำ แต่ยังจำกัดจำนวน Packet ที่กำลังอยู่ระหว่างทางให้มีเพียงหนึ่ง Packet. ในขั้นนี้ rdt2.0 มุ่งจัดการ Bit Error ของ Data Packet ก่อน ส่วนปัญหาที่ ACK หรือ NAK เองอาจเสียหายจะถูกนำมาพิจารณาในสไลด์ถัดจากชุดนี้.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Bullet ด้านขวาอธิบายความหมายของ ACK, NAK และ Action ของ Sender เมื่อรับ NAK. กรอบด้านล่างเน้นคำว่า “stop and wait” และอธิบายลำดับว่า ส่งหนึ่ง Packet แล้วรอคำตอบจาก Receiver.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ACK หมายถึง Receiver แจ้งว่า Packet ถูกต้อง NAK หมายถึง Receiver แจ้งว่า Packet มี Error ได้รับ NAK แล้ว Sender ส่ง Packet เดิมซ้ำ Stop-and-Wait ให้มี Packet ที่รอผลตอบรับทีละหนึ่ง Packet

---

## 📄 Slide 49: rdt2.0: FSM Specifications ของ Sender และ Receiver

*📄 Slide 49*

สไลด์นี้แสดง FSM ของ rdt2.0 ครบทั้ง Sender และ Receiver โดยใช้รูปแบบ Event เหนือเส้น / Action ใต้เส้น . ตัวแปร rcvpkt หมายถึง Packet ที่เพิ่งได้รับ ส่วน sndpkt หมายถึง Packet ที่ Sender เก็บไว้เพื่อส่งหรือส่งซ้ำ. ฝั่ง Sender เริ่มที่ Wait for call from above . เมื่อเกิด rdt_send(data) จะสร้าง Packet พร้อม Checksum แล้วส่งด้วย udt_send(sndpkt) จากนั้นเปลี่ยนไป State Wait for ACK or NAK . ถ้า Sender รับ rcvpkt และตรวจว่าเป็น NAK เงื่อนไข rdt_rcv(rcvpkt) && isNAK(rcvpkt) จะทำให้ส่ง sndpkt เดิมซ้ำและยังคงรอ ACK หรือ NAK ต่อไป แต่ถ้าตรวจว่าเป็น ACK จะไม่ต้องทำ Action เพิ่ม สัญลักษณ์ Λ หมายถึง “ไม่ทำอะไร” แล้วกลับไปรอ Data ใหม่จาก Application. ฝั่ง Receiver มี State เดียวคือ Wait for call from below . ถ้า Packet เสียหายตามเงื่อนไข corrupt(rcvpkt) จะส่ง NAK และรอ Packet ต่อไป หาก Packet ไม่เสียหาย จะ Extract Data, Deliver Data ขึ้น Application และส่ง ACK กลับ. หมายเหตุจากข้อความบนสไลด์: บรรทัดสร้าง Packet เขียนตัวแปรว่า snkpkt แต่บรรทัดส่งใช้ sndpkt ; ในการอ่าน FSM ให้เข้าใจว่าเป็น Packet ที่ Sender สร้างและเก็บไว้สำหรับการส่งซ้ำ.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> FSM ทางซ้ายมีสอง State เพราะ Sender ต้องจำว่ากำลังรอ Data ใหม่หรือกำลังรอ Response ของ Packet เดิม. FSM ทางขวามีหนึ่ง State เพราะ Receiver ทุกครั้งที่รับ Packet จะตรวจ Checksum แล้วตอบ ACK หรือ NAK ก่อนกลับไปรอ Packet ถัดไป. เครื่องหมาย && หมายถึงเงื่อนไขทั้งสองต้องเป็นจริงพร้อมกัน เช่น มี Packet มาถึงและ Packet นั้นเป็น NAK.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Sender มี State “รอ Data” และ “รอ ACK/NAK” NAK ทำให้ Sender ส่ง sndpkt เดิมซ้ำ ACK ทำให้ Senderกลับไปรอ Data ชุดใหม่ Receiver ส่ง NAK เมื่อ Packet corrupt และส่ง ACK เมื่อ Packet not corrupt Λ ใน FSM หมายถึงไม่มี Action เพิ่มเติม

---

## 📄 Slide 50: rdt2.0: เหตุใดต้องใช้ Protocol เพื่อสื่อสาร State

*📄 Slide 50*

สไลด์นี้ใช้ FSM เดิมของ rdt2.0 แต่เน้นฟังก์ชัน isNAK(rcvpkt) และ isACK(rcvpkt) เพื่อชี้ว่า Sender ตัดสินใจได้จาก Message ที่ได้รับเท่านั้น ไม่สามารถรู้ State ภายใน Receiver โดยตรง. เมื่อ Sender อยู่ใน State Wait for ACK or NAK สิ่งที่ Sender ต้องการรู้คือ Receiver ได้รับ Packet ถูกต้องหรือไม่ แต่คำตอบนี้จะเปลี่ยน State ของ Senderได้ก็ต่อเมื่อ Receiver ส่ง ACK หรือ NAK ผ่านช่องทางกลับมาและ Sender ตรวจชนิดของ Response ได้. ม่านทางขวากลับมาอีกครั้งเพื่อย้ำแนวคิดว่า Receiver ถูกซ่อนจากมุมมองของ Sender ข้อความในสไลด์สรุปว่า State ของ Receiver จะไม่เป็นที่รู้จักแก่ Sender หากไม่มีการสื่อสารจาก Receiver ไป Sender และนี่คือเหตุผลที่ต้องมี Protocol. FSM จึงไม่ได้เป็นเพียงภาพขั้นตอน แต่แสดง Local Knowledge ของแต่ละฝั่ง: Sender รู้เฉพาะ State ของตนเองและ Event ที่ได้รับ ส่วน Receiver ก็ทำงานตาม Packet ที่ตนได้รับเช่นกัน.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ส่วน FSM ด้านซ้ายแสดงเฉพาะ Sender และไฮไลต์สีเหลืองที่ isNAK() กับ isACK() ซึ่งเป็นการจำแนก Feedback. ม่านด้านขวาสื่อว่า Sender ไม่เห็น Receiver และไม่รู้ผลการรับโดยตรง. ข้อความ Note ใต้ FSM เชื่อมสองส่วนเข้าด้วยกัน: Sender จะรู้สถานะการรับได้จาก Message ที่ Receiver ส่งมาเท่านั้น.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ACK และ NAK เป็น Message ที่สื่อ State การรับจาก Receiver ไป Sender Sender เปลี่ยน State ตาม Event ที่ตนได้รับ ไม่ได้อ่าน State ของ Receiver โดยตรง Protocol กำหนดความหมายและการตอบสนองต่อ ACK/NAK ระบบแบบกระจายต้องอาศัยการแลกเปลี่ยน Message เพื่อประสาน State ระหว่างปลายทาง

---

## 📄 Slide 51: rdt2.0: การทำงานเมื่อไม่มีข้อผิดพลาด

*📄 Slide 51*

สไลด์นี้แสดงเส้นทางการทำงานของ rdt2.0 ในกรณีปกติที่ Data Packet และ ACK เดินทางถึงปลายทางโดยไม่เสียหาย เส้นสีแดงลากผ่าน FSM เพื่อให้เห็นลำดับเหตุการณ์ตั้งแต่ Application ส่งข้อมูล จน Sender ได้รับ ACK และพร้อมรับข้อมูลก้อนถัดไป. เมื่ออยู่ในสถานะ Wait for call from above และเกิดเหตุการณ์ rdt_send(data) Sender จะสร้าง Packet ด้วย make_pkt(data, checksum) เก็บไว้ใน sndpkt แล้วเรียก udt_send(sndpkt) เพื่อส่งผ่านช่องทางชั้นล่าง หลังจากนั้น Sender เปลี่ยนไปอยู่สถานะ Wait for ACK or NAK . ฝั่ง Receiver เริ่มที่ Wait for call from below เมื่อ rdt_rcv(rcvpkt) ถูกเรียกและ Packet ไม่เสียหาย หรือ notcorrupt(rcvpkt) Receiver จะใช้ extract() แยก Data, เรียก deliver_data(data) ส่งขึ้นสู่ Application และส่ง ACK กลับด้วย udt_send(ACK) . เมื่อ Sender ได้รับ Response ที่ไม่เสียหายและเป็น ACK เงื่อนไข rdt_rcv(rcvpkt) && isACK(rcvpkt) เป็นจริง จึงกลับไป Wait for call from above เครื่องหมาย Λ ใต้เส้นหมายถึงไม่มี Action เพิ่มเติมใน Transition นั้น.

> [!DEFINITION] Stop-and-Wait Utilization Formula
> $$U_{\text{sender}} = \frac{L / R}{\text{RTT} + (L / R)}$$
> **ตัวอย่าง:** ลิงก์ $1\text{ Gbps}$ ($R = 10^9\text{ bps}$), $\text{RTT} = 30\text{ ms}$, แพ็กเก็ต $L = 8,000\text{ บิต}$ ($1\text{ KB}$):
> - $d_{\text{trans}} = \frac{8,000}{10^9} = 0.008\text{ ms}$
> - $U_{\text{sender}} = \frac{0.008\text{ ms}}{30.008\text{ ms}} = 0.000267 \quad (\mathbf{0.027\%})$ (ประสิทธิภาพต่ำมาก)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> FSM ฝั่งซ้ายคือ Sender และ FSM ฝั่งขวาคือ Receiver วงกลมแต่ละวงแทน State ส่วนลูกศรแทนการเปลี่ยน State. ข้อความเหนือเส้นแนวนอนคือ Event หรือ Condition ส่วนข้อความใต้เส้นคือ Action ที่ต้องทำเมื่อเงื่อนไขนั้นเกิดขึ้น. เส้นสีแดงแสดงเส้นทางปกติ: ส่ง Packet → รับถูกต้อง → ส่ง ACK → Sender รับ ACK โดยไม่มีการวนส่งซ้ำ.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - rdt2.0 ใช้ Checksum ตรวจ Packet และใช้ ACK/NAK เป็นข้อมูลตอบกลับ. Receiver ส่ง Data ขึ้น Application เฉพาะเมื่อ Packet ไม่เสียหาย. Sender ส่งครั้งละหนึ่ง Packet และรอ Response ก่อนส่งก้อนต่อไป. กรณีปกติไม่เกิด Retransmission.

---

## 📄 Slide 52: rdt2.0: กรณี Data Packet เสียหาย

*📄 Slide 52*

สไลด์นี้ใช้ FSM เดิม แต่เส้นสีแดงแสดงกรณีที่ Packet จาก Sender เกิด Bit Error ระหว่างทาง Receiver ตรวจพบความเสียหายจาก Checksum และไม่ส่ง Data ที่เสียหายขึ้นสู่ Application. หลัง Sender สร้างและส่ง sndpkt แล้ว Sender จะรอ ACK หรือ NAK เมื่อ Receiver ได้รับ Packet และเงื่อนไข corrupt(rcvpkt) เป็นจริง Receiver ส่ง NAK กลับ แล้วคงอยู่ในสถานะ Wait for call from below เพื่อรอ Packet ใหม่. เมื่อ Sender ได้รับ NAK เงื่อนไข isNAK(rcvpkt) ทำให้ Sender เรียก udt_send(sndpkt) อีกครั้ง การส่ง Packet เดิมซ้ำนี้เรียกว่า Retransmission โดย Sender ต้องเก็บ Packet ไว้จนกว่าจะได้รับ ACK. ครั้งที่ส่งซ้ำ Packet มาถึงโดยไม่เสียหาย Receiver จึง Extract และ Deliver Data เพียงครั้งเดียว แล้วส่ง ACK กลับ เมื่อ Sender ได้รับ ACK จึงกลับไปพร้อมรับ Data ก้อนใหม่.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นสีแดงจาก Sender ไปยังทางเลือก corrupt(rcvpkt) ที่ Receiver แสดงว่า Packet ครั้งแรกเสียหาย. เส้นย้อนจากสถานะ Wait for ACK or NAK กลับเข้าตัวเองคือการส่ง sndpkt เดิมซ้ำหลังได้รับ NAK. เส้นทางรอบที่สองจึงไปยังแขนง notcorrupt(rcvpkt) แล้วจบด้วย ACK.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Checksum มีหน้าที่ตรวจพบความเสียหาย ไม่ได้ซ่อม Data. NAK บอก Sender ว่า Packet ที่ได้รับมี Error. Sender เก็บ Packet ปัจจุบันไว้เพื่อใช้ Retransmission. Receiver ไม่ Deliver Packet ที่เสียหาย จึงไม่ส่งข้อมูลผิดขึ้น Application.

---

## 📄 Slide 53: rdt2.0 มีข้อบกพร่องร้ายแรง: เมื่อ ACK หรือ NAK เสียหาย

*📄 Slide 53*

rdt2.0 รองรับกรณี Data Packet เสียหายได้ แต่ยังมีปัญหาสำคัญเมื่อ ACK หรือ NAK ที่ Receiver ส่งกลับมาเสียหาย Sender จะอ่าน Response ไม่ได้และไม่รู้ว่า Receiver รับ Data ถูกต้องแล้ว หรือพบ Error. Sender ไม่สามารถตัดสินใจจาก Response ที่เสียหายได้อย่างแน่นอน หาก Sender ไม่ส่งซ้ำ Data อาจสูญหาย แต่หากส่งซ้ำทันที ทั้งที่ Receiver เคยรับและ Deliver Data ไปแล้ว Receiver อาจส่งข้อมูลเดิมขึ้น Application ซ้ำ เกิดเป็น Duplicate Delivery . แนวทางของ rdt2.1 คือ หาก ACK/NAK เสียหายให้ Sender ส่ง Packet ปัจจุบันซ้ำ แต่เพิ่ม Sequence Number ใน Packet เพื่อให้ Receiver แยกได้ว่า Packet ที่มาถึงเป็นข้อมูลใหม่หรือเป็น Duplicate จากการ Retransmission. กล่องด้านล่างย้ำว่า Protocol ยังเป็นแบบ Stop-and-Wait : Sender ส่งหนึ่ง Packet แล้วหยุดรอ Response จาก Receiver ก่อน จึงมี Packet ที่รอการยืนยันอยู่เพียงหนึ่งก้อนในแต่ละขณะ.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คอลัมน์ซ้ายระบุปัญหา: ACK/NAK เสียหาย ทำให้ Sender ไม่รู้เหตุการณ์ที่ Receiver. คอลัมน์ขวาระบุกลไกแก้ Duplicate: Retransmit, เพิ่ม Sequence Number และให้ Receiver ทิ้ง Packet ซ้ำ. กรอบสีแดงรอบ Stop-and-Wait เชื่อมแนวคิดนี้กับการใช้ Sequence Number เพียงไม่กี่ค่าในสไลด์ถัดไป.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ACK/NAK เองก็เดินทางผ่านช่องทางที่อาจทำให้ Bit เปลี่ยน. การส่งซ้ำโดยไม่มี Sequence Number อาจทำให้ Application ได้ Data ซ้ำ. Sequence Number ใช้ระบุ Packet และช่วยตรวจ Duplicate. Receiver ต้อง Discard Duplicate โดยไม่ Deliver ขึ้น Application อีกครั้ง.

---

## 📄 Slide 54: rdt2.1 Sender: การรับมือ ACK/NAK ที่เสียหาย

*📄 Slide 54*

FSM ของ Sender ใน rdt2.1 มีสี่ State เพราะต้องจำทั้งว่า Packet ถัดไปควรใช้ Sequence Number ใด และกำลังรอ Response ของ Packet หมายเลขใด ได้แก่ Wait for call 0 , Wait for ACK or NAK 0 , Wait for call 1 และ Wait for ACK or NAK 1 . เมื่อรอ Data สำหรับหมายเลข 0 แล้วเกิด rdt_send(data) Sender สร้าง make_pkt(0, data, checksum) ส่ง Packet และเปลี่ยนไปรอ ACK/NAK 0 หาก Response เสียหาย หรือเป็น NAK เงื่อนไข corrupt(rcvpkt) || isNAK(rcvpkt) จะทำให้ส่ง sndpkt เดิมซ้ำและยังอยู่ State เดิม. หากได้รับ ACK ที่ไม่เสียหาย Sender ถือว่า Packet 0 สำเร็จ จึงเปลี่ยนไป Wait for call 1 from above Data ก้อนถัดไปจะถูกใส่ Sequence Number 1 กระบวนการฝั่งล่างของรูปทำงานแบบเดียวกันสำหรับ Packet 1. เมื่อ ACK ของ Packet 1 ถูกต้อง Sender จะวนกลับไปใช้ Sequence Number 0 อีกครั้ง ค่า 0 และ 1 จึงสลับกันไปเรื่อย ๆ เครื่องหมาย || หมายถึง OR, && หมายถึง AND และ Λ หมายถึงไม่มี Action เพิ่มเติม.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรวนที่ State “Wait for ACK or NAK 0/1” คือ Retransmission เมื่อได้รับ NAK หรือ Response เสียหาย. ลูกศรขนาดใหญ่ที่เชื่อมครึ่งบนและครึ่งล่างแสดงการสลับ Sequence Number 0 → 1 → 0. เส้นประเข้าสู่ “Wait for call 0” เป็น Initial State ของ Sender.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Sender ต้องเก็บ sndpkt ปัจจุบันจนกว่าจะได้ ACK ที่ใช้ได้. ACK/NAK เสียหายถูกปฏิบัติเหมือนการส่งไม่สำเร็จ จึง Retransmit. State ของ Sender ทำหน้าที่จำว่า Packet ปัจจุบันเป็นหมายเลข 0 หรือ 1. Sender ไม่ส่ง Data ก้อนใหม่ขณะยังรอ ACK ของก้อนเดิม.

---

## 📄 Slide 55: rdt2.1 Receiver: ตรวจ Packet ซ้ำด้วย Sequence Number

*📄 Slide 55*

Receiver มีสอง State คือ Wait for 0 from below และ Wait for 1 from below State บอกว่า Receiver กำลังคาดหวัง Packet ใหม่ที่มี Sequence Number 0 หรือ 1. ตัวอย่างเมื่อ Receiver รอหมายเลข 0: หาก Packet ไม่เสียหายและมี has_seq0(rcvpkt) Receiver จะ Extract Data, Deliver ขึ้น Application, สร้าง ACK ส่งกลับ และเปลี่ยนไป State ที่รอหมายเลข 1 เพราะ Packet ใหม่ก้อนถัดไปควรเป็น 1. หาก Packet เสียหาย Receiver สร้าง NAK ส่งกลับและยังรอหมายเลขเดิม หาก Packet ไม่เสียหายแต่มี Sequence Number 1 ขณะที่กำลังรอ 0 แสดงว่าเป็น Packet เก่าที่ถูกส่งซ้ำ Receiver จึงส่ง ACK ซ้ำ แต่ ไม่ Extract และไม่ Deliver Data แล้วคงรอหมายเลข 0 ต่อไป. ฝั่ง State ที่รอหมายเลข 1 ทำงานสมมาตรกัน: รับ seq1 ที่ถูกต้องแล้ว Deliver และย้ายไปรอ 0 ส่วน seq0 ที่มาถึงในขณะรอ 1 ถือเป็น Duplicate.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรระหว่างวงกลมสอง State คือกรณีรับ Packet หมายเลขที่คาดหวังได้ถูกต้อง จึง Deliver และสลับค่าที่รอ. ลูกศรวนด้านบนของแต่ละ State คือ Packet เสียหาย จึงส่ง NAK และรอค่าเดิม. ลูกศรวนด้านล่างคือ Packet ไม่เสียหายแต่ Sequence Number ไม่ตรงกับที่คาดหวัง จึง ACK ซ้ำโดยไม่ Deliver.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Receiver ใช้ทั้ง Checksum และ Sequence Number ในการตัดสินใจ. Packet ที่มี Sequence Number ตรงกับค่าที่คาดหวังจึงถือเป็น Data ใหม่. Duplicate Packet ต้องได้รับ Response แต่ต้องไม่ถูก Deliver ซ้ำ. State ของ Receiver เปลี่ยนเฉพาะเมื่อรับ Packet ใหม่ที่ถูกต้อง.

---

## 📄 Slide 56: rdt2.1 Discussion: เหตุใด Sequence Number 0 และ 1 จึงเพียงพอ

*📄 Slide 56*

สไลด์นี้สรุปภาระงานที่เพิ่มขึ้นใน rdt2.1 ทั้งฝั่ง Sender และ Receiver เพื่อแก้ปัญหา ACK/NAK เสียหายและ Duplicate Packet. ฝั่ง Sender ต้องเพิ่ม Sequence Number ลงใน Packet ตรวจว่า ACK/NAK เสียหายหรือไม่ และมีจำนวน State มากขึ้นเป็นสองชุดเพื่อจำว่ากำลังส่งหรือรอผลของหมายเลข 0 หรือ 1. เหตุที่ใช้เพียง 0 และ 1 ได้ เพราะ rdt2.1 เป็น Stop-and-Wait จึงมี Packet ที่ยังไม่ได้รับการยืนยันเพียงก้อนเดียว Receiver ต้องแยกแค่ “Packet ใหม่ที่คาดหวัง” ออกจาก “Packet ก่อนหน้าที่อาจถูกส่งซ้ำ” การสลับ 0 และ 1 จึงเพียงพอสำหรับความต้องการนี้. ฝั่ง Receiver ต้องตรวจ Duplicate และใช้ State จำ Sequence Number ที่คาดหวัง อย่างไรก็ตาม Receiver ไม่สามารถรู้ได้ว่า ACK/NAK ล่าสุดเดินทางถึง Sender โดยสมบูรณ์หรือไม่ จึงต้องเตรียมรับ Packet เดิมซ้ำเสมอ.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์แบ่งเป็นสองคอลัมน์เพื่อเปรียบเทียบความรับผิดชอบของ Sender และ Receiver. ข้อความ “twice as many states” เชื่อมกับ FSM สี่ State ของ Sender ในสไลด์ 54. ข้อความท้ายฝั่ง Receiver ย้ำข้อจำกัดของการมองเห็น State อีกฝั่ง: Receiver ไม่รู้ผลการส่ง ACK/NAK ของตน.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - 0 และ 1 ไม่ใช่จำนวน Packet ทั้งหมด แต่เป็นค่าที่สลับเพื่อแยก Packet ใหม่กับ Packet ก่อนหน้า. Stop-and-Wait ทำให้ Sequence Number สองค่าพอใช้งาน. ทั้ง Sender และ Receiver ต้องมี State เพื่อจดจำบริบทของ Protocol. Receiver ต้องรองรับการมาถึงซ้ำ เพราะ ACK/NAK อาจเสียหายระหว่างทาง.

---

## 📄 Slide 57: rdt2.2: Protocol แบบไม่ใช้ NAK

*📄 Slide 57*

rdt2.2 ให้ความสามารถเทียบเท่า rdt2.1 แต่ใช้ ACK เท่านั้น จึงเรียกว่า NAK-free Protocol Receiver ไม่ต้องสร้าง NAK เมื่อ Packet มีปัญหา. แทนที่จะส่ง NAK Receiver จะส่ง ACK ของ Packet ล่าสุดที่รับถูกต้อง กลับมา และต้องระบุ Sequence Number ของ Packet ที่กำลัง ACK อย่างชัดเจน ตัวอย่างเช่น ถ้า Receiver กำลังรอ Packet 0 แต่รับไม่ได้อย่างถูกต้อง Receiver อาจส่ง ACK1 เพื่อยืนยันซ้ำว่า Packet ล่าสุดที่ถูกต้องคือหมายเลข 1. เมื่อ Sender กำลังรอ ACK0 แต่ได้รับ ACK1 ซ้ำ Sender จะตีความได้ว่า Packet 0 ยังไม่สำเร็จ และส่ง Packet 0 ซ้ำ ดังนั้น Duplicate ACK จึงทำให้เกิด Action แบบเดียวกับ NAK ใน rdt2.1. ข้อความท้ายสไลด์ชี้ล่วงหน้าว่า TCP ใช้แนวทาง ACK-based หรือไม่ใช้ NAK โดยรายละเอียดของ TCP จะอธิบายในส่วนถัดไปของบท.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Bullet แรกบอกว่าเป้าหมายการทำงานเหมือน rdt2.1 แต่ตัด NAK ออก. Bullet กลางอธิบายว่าค่า Sequence Number ต้องอยู่ใน ACK เพื่อบอกว่า ACK กำลังยืนยัน Packet ใด. ข้อความตัวเอียง “retransmit current pkt” เน้นผลของ Duplicate ACK ที่ Sender.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - rdt2.2 ใช้ ACK เพียงชนิดเดียวเป็น Feedback. ACK ต้องระบุ Sequence Number ของ Packet ที่ยืนยัน. ACK ของหมายเลขก่อนหน้าเป็นสัญญาณให้ Sender Retransmit Packet ปัจจุบัน. การไม่ใช้ NAK ไม่ได้หมายความว่าไม่มี Retransmission.

---

## 📄 Slide 58: rdt2.2: ชิ้นส่วน FSM ของ Sender และ Receiver

*📄 Slide 58*

สไลด์นี้แสดงเฉพาะ FSM Fragment หรือบางส่วนของ FSM สำหรับ Sequence Number 0 เพื่อชี้ให้เห็นความแตกต่างสำคัญของ rdt2.2 ส่วนการทำงานสำหรับหมายเลข 1 มีรูปแบบสมมาตรและไม่ได้แสดงครบในภาพ. ฝั่ง Sender เมื่ออยู่ Wait for call 0 from above จะสร้าง Packet หมายเลข 0 ส่งออก แล้วเข้าสู่ Wait for ACK 0 หาก Response เสียหาย หรือได้รับ ACK1 ซึ่งเป็น ACK ของ Packet ก่อนหน้า Sender จะเรียก udt_send(sndpkt) ส่ง Packet 0 เดิมซ้ำ. หาก Sender ได้รับ ACK0 ที่ไม่เสียหาย แสดงว่า Packet 0 สำเร็จ จึงไปยัง State สำหรับรอ Data หมายเลข 1 ซึ่งอยู่นอก Fragment ที่แสดง. ฝั่ง Receiver ใน State Wait for 0 from below หากรับ Packet 0 ถูกต้อง จะ Extract, Deliver, ส่ง ACK0 และย้ายไป State รอหมายเลข 1 แต่หาก Packet เสียหายหรือมี seq1 ขณะกำลังรอ 0 Receiver จะส่ง ACK1 ซ้ำ ซึ่งหมายถึง Packet ล่าสุดที่รับถูกต้องคือหมายเลข 1 และยังไม่ Deliver Data ใด ๆ.

| คุณสมบัติ | 📦 Go-Back-N (GBN) | 🎯 Selective Repeat (SR) |
| :--- | :--- | :--- |
| **การตอบ ACK** | **Cumulative ACK** (ตอบรับลำดับสูงสุดที่ถูกต้องต่อเนื่อง) | **Individual ACK** (ตอบรับแยกเฉพาะแต่ละแพ็กเก็ต) |
| **ตัวนับเวลา (Timers)** | มี **1 Timer** สำหรับแพ็กเก็ตเก่าสุดที่ยังไม่ได้รับ ACK | มี **1 Timer ต่อ 1 แพ็กเก็ต** ในหน้าต่างส่ง |
| **เมื่อเกิด Timeout** | **ส่งซ้ำทั้งหมด** ใน Window ตั้งแต่ตัวที่หายไป | **ส่งซ้ำเฉพาะตัวที่ Timeout** เท่านั้น |
| **บัฟเฟอร์ฝั่งรับ** | ไม่บัฟเฟอร์ (ทิ้งตัวที่สลับลำดับทิ้งทันที) | มีบัฟเฟอร์เก็บตัวที่มาก่อน แล้วเรียงส่งขึ้น App |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นทแยงแบ่งครึ่งบนเป็น Sender FSM Fragment และครึ่งล่างเป็น Receiver FSM Fragment. ข้อความสีแดงเน้นเงื่อนไขและ Action ที่แทน NAK ได้แก่ Sender รับ ACK ผิดหมายเลขแล้วส่งซ้ำ และ Receiver ส่ง ACK ของ Packet ล่าสุดที่ถูกต้อง. วงกลมและลูกศรบางส่วนถูกตัดออกโดยตั้งใจ เพราะสไลด์ต้องการแสดงเฉพาะกลไกของ seq0.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Sender รอ ACK ที่มี Sequence Number ตรงกับ Packet ปัจจุบัน. Corrupt ACK หรือ ACK ผิดหมายเลขทำให้ Retransmit. Receiver ใช้ ACK ของ Packet ล่าสุดที่ถูกต้องแทน NAK. Receiver Deliver เฉพาะ Packet ใหม่ที่ถูกต้องและตรงกับหมายเลขที่คาดหวัง.

---

## 📄 Slide 59: rdt3.0: ช่องทางมีทั้ง Bit Error และ Packet Loss

*📄 Slide 59*

rdt2.x สมมติว่า Packet อาจเสียหาย แต่ไม่สูญหาย สไลด์นี้เพิ่มสมมติฐานใหม่สำหรับ rdt3.0 : ช่องทางชั้นล่างสามารถทำให้ทั้ง Data Packet และ ACK สูญหาย (Loss) ได้. Checksum, Sequence Number, ACK และ Retransmission ยังเป็นกลไกที่จำเป็น แต่ยังไม่เพียงพอ เพราะหาก Packet หรือ ACK หาย Sender จะไม่ได้รับ Response ใดเลย จึงไม่มีทั้ง ACK และ Response ที่เสียหายให้ใช้เป็นเหตุการณ์ตัดสินใจ. คำถามด้านล่างเปรียบเทียบกับการสนทนาของมนุษย์: เมื่อคำพูดจากผู้ส่งหายไป ผู้พูดจะรู้ได้อย่างไรว่าอีกฝ่ายไม่ได้ยิน หากอีกฝ่ายไม่ตอบกลับ สถานการณ์นี้นำไปสู่ความจำเป็นของการกำหนดเวลารอ. ปัญหาสำคัญคือ “ความเงียบ” มีได้หลายสาเหตุ เช่น Data Packet หาย หรือ ACK หาย แต่จากมุมมอง Sender ผลที่เห็นเหมือนกันคือไม่มี ACK มาถึง.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คำว่า New channel assumption สีแดงชี้ว่านี่คือการเปลี่ยนเงื่อนไขของช่องทางจาก rdt2.x. วงเล็บ “data, ACKs” ย้ำว่า Loss เกิดได้ทั้งขาไปและขากลับ. คำถามขนาดใหญ่ด้านล่างใช้สถานการณ์สนทนาเพื่อเตรียมแนวคิด Timeout ในสไลด์ถัดไป.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - rdt3.0 รองรับทั้ง Packet Corruption และ Packet Loss. Loss อาจเกิดกับ Data Packet หรือ ACK. เมื่อไม่มี Response Sender ไม่สามารถแยกสาเหตุได้โดยตรง. ต้องเพิ่มกลไกใหม่เพื่อให้ Sender ตัดสินใจหลังรอเป็นเวลาหนึ่ง.

---

## 📄 Slide 60: rdt3.0: Timeout, Timer และ Retransmission

*📄 Slide 60*

แนวทางของ rdt3.0 คือให้ Sender รอ ACK เป็นระยะเวลาที่ถือว่า สมเหตุสมผล (reasonable amount of time) หากไม่มี ACK ภายในเวลานั้นจะเกิดเหตุการณ์ Timeout และ Sender ส่ง Packet ปัจจุบันซ้ำ. Sender ใช้ Countdown Timer เริ่มนับหลังส่ง Packet หาก ACK มาถึงก่อนหมดเวลา Timer จะถูกหยุด แต่หากเวลาหมด Timer จะ Interrupt การรอและกระตุ้น Retransmission. Packet หรือ ACK อาจไม่ได้สูญหายจริง แต่อาจเพียงล่าช้า หาก Sender Timeout เร็วเกินไป Packet ที่ส่งซ้ำจึงอาจกลายเป็น Duplicate อย่างไรก็ตาม Sequence Number ที่เพิ่มไว้ตั้งแต่ rdt2.1 ช่วยให้ Receiver ตรวจและไม่ Deliver Duplicate ซ้ำ. Receiver ต้องระบุ Sequence Number ของ Packet ที่ ACK เพื่อให้ Sender ตรวจได้ว่า ACK ที่มาถึงเป็นของ Packet ปัจจุบันหรือ Packet ก่อนหน้า การรวม Checksum, Sequence Number, ACK, Retransmission และ Timer ทำให้ Protocol รับมือทั้ง Error และ Loss ได้.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รายการด้านซ้ายเรียงขั้นตอน: รอ ACK → ไม่ได้รับภายในเวลา → Retransmit. รายการย่อยอธิบายกรณี Packet/ACK เพียงล่าช้า และบทบาทของ Sequence Number ในการจัดการ Duplicate. รูปนาฬิกาปลุกและคำว่า timeout แทน Countdown Timer ที่สร้าง Event ให้ FSM เมื่อเวลาหมด.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Timeout คือเหตุการณ์ที่เกิดเมื่อรอ ACK เกินเวลาที่กำหนด. Timeout ทำให้ Sender Retransmit แม้ไม่ทราบว่า Data หรือ ACK หาย. Delayed Packet/ACK อาจทำให้เกิด Duplicate แต่ Sequence Number ช่วยตรวจได้. rdt3.0 เพิ่ม Timer เข้าไปจากกลไกของ rdt2.2.

---

## 📄 Slide 61: rdt3.0 Sender: เส้นทางหลักของ FSM และการใช้ Timer

*📄 Slide 61*

สไลด์นี้แสดง Finite State Machine (FSM) ของ Sender ใน rdt3.0 โดยเน้นเส้นทางหลักเมื่อการส่งสำเร็จ FSM มีสี่ State ซึ่งสลับกันระหว่าง Packet หมายเลข 0 และ 1 ได้แก่ Wait for call 0 from above , Wait for ACK0 , Wait for call 1 from above และ Wait for ACK1 . เริ่มต้นที่ Wait for call 0 from above เมื่อ Application เรียก rdt_send(data) Sender จะสร้าง sndpkt = make_pkt(0, data, checksum) ส่งด้วย udt_send(sndpkt) และเรียก start_timer ทันที จากนั้นจึงเปลี่ยนไปอยู่ State Wait for ACK0 . ถ้าได้รับ Packet ตอบกลับที่ไม่เสียหายและเป็น ACK0 เงื่อนไข rdt_rcv(rcvpkt) && notcorrupt(rcvpkt) && isACK(rcvpkt,0) จะเป็นจริง Sender จึงเรียก stop_timer และย้ายไป Wait for call 1 from above เพื่อรอ Data ก้อนถัดไป. กระบวนการด้านล่างทำงานแบบเดียวกันสำหรับ Sequence Number 1 เมื่อรับ ACK1 ถูกต้อง Sender จะหยุด Timer และวนกลับไปใช้ Sequence Number 0 อีกครั้ง วงรีสีแดงในภาพแบ่ง FSM ออกเป็นชุดที่ทำงานกับ Packet 0 และ Packet 1.


```
[ TCP Connection Close (4-Way) ]
Client                          Server
  │── FIN ────────────────────────>│   Client ขอปิด
  │<── ACK ────────────────────────│   Server รับทราบ
  │<── FIN ────────────────────────│   Server ขอปิดด้วย
  │── ACK ────────────────────────>│   Client รับทราบ
  │  (TIMED WAIT: 2*MSL)          │   รอให้แน่ใจว่า ACK ถึง
  │── [Connection Closed] ────────>│
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> วงกลมสี่วงคือ State ส่วนลูกศรแสดง Transition จากเหตุการณ์หนึ่งไปสู่อีก State หนึ่ง. เส้นประที่ชี้เข้าสู่ Wait for call 0 from above คือ Initial State. ข้อความสีเหลือง start_timer และ stop_timer เน้นว่าทุกครั้งที่ส่ง Packet ต้องเริ่ม Timer และเมื่อได้รับ ACK ที่ถูกต้องต้องหยุด Timer. สไลด์นี้แสดงเฉพาะเส้นทางหลักของการส่งสำเร็จ ส่วนกรณี Timeout, ACK เสียหาย หรือ ACK ผิดหมายเลขจะแสดงครบในสไลด์ถัดไป.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - rdt3.0 ใช้ Sequence Number 0 และ 1 สลับกันแบบ Stop-and-Wait. Timer เริ่มทันทีหลังส่ง Packet และหยุดเมื่อได้รับ ACK ที่ตรงหมายเลข. ACK0 ทำให้ Sender ไปเตรียมส่ง Packet 1 และ ACK1 ทำให้กลับไป Packet 0. Sender ต้องเก็บ sndpkt ไว้จนกว่าจะได้รับ ACK ที่ถูกต้อง.

---

## 📄 Slide 62: rdt3.0 Sender: FSM ฉบับสมบูรณ์

*📄 Slide 62*

สไลด์นี้เติม Transition ที่ขาดจากสไลด์ก่อน ทำให้เห็นการตอบสนองของ Sender ครบทั้งกรณีปกติ กรณีได้รับ ACK ที่ใช้ไม่ได้ และกรณี Timeout . โครงสร้างยังคงเป็น FSM สี่ State และสลับ Sequence Number 0 กับ 1. ขณะอยู่ใน Wait for ACK0 หากได้รับ Response ที่เสียหาย หรือได้รับ ACK1 ซึ่งเป็น ACK ของ Packet ก่อนหน้า เงื่อนไข corrupt(rcvpkt) || isACK(rcvpkt,1) จะทำให้ Sender อยู่ State เดิมและยังไม่ทำ Action เครื่องหมาย Λ หมายถึงไม่มี Action เพิ่มเติม Sender รอ ACK ที่ถูกต้องหรือรอให้ Timer หมดเวลา. เมื่อเกิด timeout Sender เรียก udt_send(sndpkt) เพื่อส่ง Packet เดิมซ้ำ และเรียก start_timer ใหม่ จากนั้นยังอยู่ใน State รอ ACK หมายเลขเดิม ส่วนกรณีรอ ACK1 ทำงานในลักษณะสมมาตรกัน. ถ้าได้รับ ACK ที่ไม่เสียหายและตรงกับ Sequence Number ปัจจุบัน Sender จะเรียก stop_timer แล้วเปลี่ยนไป State รอ Data หมายเลขถัดไป สำหรับ State ที่รอ Data จากด้านบน หากมี Response เก่ามาถึง จะถูก Ignore ตามลูกศรวนที่มี Action เป็น Λ .


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรวนที่ Wait for ACK0/ACK1 แบ่งเป็นสองกรณี: ACK เสียหายหรือผิดหมายเลขให้รอต่อ และ Timeout ให้ Retransmit พร้อมเริ่ม Timer ใหม่. ลูกศรวนที่ Wait for call 0/1 from above หมายถึง ACK ที่มาช้าหรือ Response เก่าถูก Ignore เพราะ Sender ยังไม่ได้ส่ง Packet ใหม่ใน State นั้น. สีชมพูเน้น Event timeout ส่วนสีเหลืองเน้น Action ที่เกี่ยวกับ Timer. เครื่องหมาย && คือ AND, || คือ OR และ Λ คือไม่มี Action.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ACK เสียหายหรือ ACK ผิดหมายเลขยังไม่ทำให้ส่งซ้ำทันที; Sender รอจน Timeout. Timeout ทำให้ Retransmit sndpkt เดิมและ Restart Timer. ACK ที่ถูกต้องต้องทั้งไม่เสียหายและตรงกับ Sequence Number ที่กำลังรอ. ACK เก่าที่มาถึงหลัง Sender เปลี่ยน State อาจถูก Ignore ได้อย่างปลอดภัย.

---

## 📄 Slide 63: rdt3.0 in Action: กรณีไม่มี Loss และ Data Packet สูญหาย

*📄 Slide 63*

สไลด์นี้เปลี่ยนจาก FSM มาเป็น Sequence Diagram เพื่อแสดงเหตุการณ์ตามเวลา แกนแนวตั้งของ Sender และ Receiver อ่านจากบนลงล่าง ลูกศรสีน้ำเงินคือ Data Packet ที่ส่งจาก Sender ไป Receiver ส่วนลูกศรสีเขียวคือ ACK ที่ส่งกลับ. กรณี (a) no loss Sender ส่ง pkt0 Receiver รับและส่ง ack0 กลับ จากนั้น Sender ส่ง pkt1 ได้รับ ack1 แล้ววนกลับไปส่ง pkt0 รอบใหม่ ทุก Packet ได้รับ ACK ก่อน Timer หมด จึงไม่มี Retransmission. กรณี (b) packet loss การส่ง pkt0 และ ack0 สำเร็จ แต่ pkt1 สูญหายที่เครื่องหมายกากบาทสีแดง Receiver จึงไม่เห็น Packet และไม่สามารถส่ง ack1 กลับมาได้. เมื่อ Sender รอเกินเวลาที่กำหนดจะเกิด Timeout แล้วส่ง pkt1 เดิมซ้ำ ครั้งที่สอง Packet ไปถึง Receiver จึงถูก Deliver และ Receiver ส่ง ack1 กลับ หลังจากนั้น Sender จึงดำเนินต่อด้วย pkt0 .


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ด้านซ้ายเป็นกรณีปกติ ลูกศร Data และ ACK สลับกันโดยไม่มีช่องว่างจากการ Timeout. ด้านขวา เครื่องหมาย X loss อยู่บนเส้นของ pkt1 แสดงว่า Data Packet หายก่อนถึง Receiver. รูปนาฬิกาและวงเล็บสีดำแสดงช่วงที่ Sender รอ ACK จน Timer หมด. คำว่า resend pkt1 แสดง Retransmission ของ Packet หมายเลขเดิม ไม่ใช่การสร้าง Data ก้อนใหม่.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - เมื่อ Data Packet หาย Receiver จะไม่ส่ง ACK เพราะไม่เคยได้รับ Packet. Sender ตรวจ Loss ทางอ้อมจากการไม่มี ACK จนเกิด Timeout. Retransmission ใช้ Sequence Number เดิมของ Packet ที่สูญหาย. เมื่อ ACK ถูกต้องมาถึง Sender จึงสลับไปส่ง Sequence Number ถัดไป.

---

## 📄 Slide 64: rdt3.0 in Action: ACK สูญหายและ Timeout เร็วเกินไป

*📄 Slide 64*

กรณี (c) ACK loss Receiver รับ pkt1 ถูกต้อง Deliver Data และส่ง ack1 แต่ ACK สูญหายระหว่างทาง Sender จึงเห็นเพียงว่าไม่มี ACK มาถึง เมื่อ Timer หมดจึงส่ง pkt1 ซ้ำ. Receiver พบว่า pkt1 ที่มาถึงรอบสองมี Sequence Number ซ้ำกับ Packet ที่รับและ Deliver ไปแล้ว จึง ตรวจว่าเป็น Duplicate ไม่ Deliver Data ซ้ำ แต่ส่ง ack1 กลับอีกครั้ง เมื่อ Sender ได้รับ ACK นี้จึงไปส่ง pkt0 ต่อ. กรณี (d) premature timeout / delayed ACK ไม่มี Packet หรือ ACK หาย แต่ ACK เดินทางช้ากว่าค่า Timeout ที่ Sender ตั้งไว้ Sender จึง Timeout และส่ง pkt1 ซ้ำทั้งที่ Receiver เคยรับ Packet เดิมแล้ว. ACK เดิมที่ล่าช้าอาจมาถึง Senderหลัง Timeout ทำให้ Senderเดินหน้าส่ง pkt0 ขณะที่ Duplicate pkt1 ยังเดินทางอยู่ Receiverตรวจ Duplicate และส่ง ack1 ซ้ำ ACK1 ที่มาถึงภายหลังขณะที่ Senderกำลังรอ ACK0 จะถูก Ignore เพราะไม่ตรงกับ Packet ปัจจุบัน.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพซ้ายมีเครื่องหมาย X บนเส้น ack1 จึงเป็น ACK Loss ไม่ใช่ Data Loss. ข้อความ (detect duplicate) แสดงว่า Receiver ใช้ Sequence Number ป้องกัน Duplicate Delivery. ภาพขวาไม่มีเครื่องหมาย Loss แต่มี Timeout เกิดก่อน ACK เดิมมาถึง จึงเป็นกรณี Delay. เส้น ACK หลายเส้นในภาพขวาแสดงว่า ACK เดิมและ ACK จาก Duplicate Packet อาจอยู่ในเครือข่ายพร้อมกัน.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Sender แยกไม่ออกโดยตรงว่า Data หาย, ACK หาย หรือเพียงล่าช้า จึงใช้วิธี Timeout แล้ว Retransmit. Sequence Number ทำให้ Retransmission ไม่ก่อให้เกิดการ Deliver Data ซ้ำ. ค่า Timeout ที่สั้นเกินไปทำให้เกิด Unnecessary Retransmission. ACK ที่มาช้าและไม่ตรงกับ Sequence Number ปัจจุบันต้องถูก Ignore.

---

## 📄 Slide 65: Performance of rdt3.0: Transmission Delay และ Sender Utilization

*📄 Slide 65*

สไลด์นี้เริ่มวิเคราะห์ประสิทธิภาพของ rdt3.0 แบบ Stop-and-Wait โดยใช้ค่า Sender Utilization หรือ U sender ซึ่งหมายถึงสัดส่วนเวลาที่ Sender ใช้ส่ง Bits เข้าสู่ Link จริง เมื่อเทียบกับเวลาทั้งหมดของหนึ่งรอบการส่ง. ตัวอย่างกำหนด Link Rate R = 1 Gbps = 10 9 bits/s , One-Way Propagation Delay 15 ms และ Packet Size L = 8000 bits หรือประมาณ 1,000 Bytes. เวลาในการผลัก Bits ทั้ง Packet ลง Link เรียกว่า Transmission Delay คำนวณจาก D trans = L/R ดังนั้น 8000 / 10 9 = 0.000008 s = 8 microseconds . ค่า 8 microseconds เป็นเวลาส่ง Packet เข้าช่องทาง ไม่ใช่เวลาที่ Packet เดินทางถึง Receiver ส่วน Propagation Delay 15 ms คือเวลาที่สัญญาณเคลื่อนที่จากต้นทางไปปลายทาง ซึ่งยาวกว่า Transmission Delay มากในตัวอย่างนี้.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Bullet แรกให้คำนิยาม U sender ว่าเป็น Fraction of Time Sender Busy Sending. สมการใช้ L แทนจำนวน Bits ใน Packet และ R แทนอัตราส่งของ Link. หน่วยในสมการเปลี่ยนจาก Bits หารด้วย Bits/Second จึงได้ผลลัพธ์เป็น Seconds. ตัวเลข 8 microseconds จะถูกนำไปเปรียบเทียบกับ RTT ประมาณ 30 ms ในสไลด์ถัดไป.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Transmission Delay = Packet Size ÷ Link Rate. Propagation Delay กับ Transmission Delay เป็นคนละชนิดของ Delay. Link เร็วมากทำให้เวลาส่ง Packet สั้น แต่ Stop-and-Wait ยังต้องรอ ACK. Utilization ใช้วัดว่าทรัพยากร Link ถูกใช้ส่งข้อมูลจริงมากน้อยเพียงใด.

---

## 📄 Slide 66: rdt3.0 Stop-and-Wait: หนึ่งรอบการส่งใช้เวลานานเท่าใด

*📄 Slide 66*

ไดอะแกรมนี้แสดง Timeline ระหว่าง Sender และ Receiver โดยเวลาไหลจากบนลงล่าง เส้นตั้งซ้ายคือ Sender และเส้นตั้งขวาคือ Receiver แถบสีน้ำเงินเอียงคือ Packet ซึ่งประกอบด้วย Bits จำนวนมาก ไม่ได้เดินทางเป็นจุดเดียว. ที่เวลา t = 0 Sender เริ่มส่ง Bit แรก ส่วน Bit สุดท้ายออกจาก Sender หลังเวลา L/R จากนั้น Bits ยังต้องใช้ Propagation Delay ในการเดินทางไป Receiver จึงเห็นแถบ Packet มีทั้งความหนาในแนวเวลาและความเอียงตามระยะทาง. Receiver สามารถส่ง ACK หลังได้รับ Bit สุดท้ายของ Packet แล้ว ACK เดินทางกลับมายัง Sender เมื่อ ACK มาถึง Sender จึงส่ง Packet ถัดไปได้ ตามสไลด์เวลาของหนึ่งรอบประมาณ RTT + L/R . RTT (Round-Trip Time) แทนเวลาการเดินทางไปและกลับของสัญญาณ ในการคำนวณแบบย่อของสไลด์ถือว่า ACK มีขนาดเล็กมากจนละเลย ACK Transmission Delay ประเด็นสำคัญคือ Sender ว่างรอเกือบตลอดช่วง RTT.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ขอบบนของแถบสีน้ำเงินแทน Bit แรก ส่วนขอบล่างแทน Bit สุดท้ายของ Packet. เส้นบางที่ย้อนจาก Receiver ไป Sender คือ ACK. ลูกศรแดง RTT แสดงช่วงเวลาการเดินทางไป–กลับ ส่วน L/R คือช่วงที่ Sender กำลังส่ง Packet จริง. แถบ Packet ถัดไปเริ่มหลัง ACK มาถึง จึงเห็นช่องว่างยาวระหว่างการส่งสอง Packet.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Stop-and-Wait อนุญาตให้มี Packet ที่ยังไม่ ACK เพียงหนึ่ง Packet. หนึ่งรอบใช้เวลาประมาณ RTT + L/R . Sender Busy เพียงช่วง L/R แล้ว Idle เพื่อรอ ACK. เมื่อ RTT สูงเมื่อเทียบกับ L/R ประสิทธิภาพจะต่ำมาก.

---

## 📄 Slide 67: Sender Utilization ของ Stop-and-Wait

*📄 Slide 67*

จาก Timeline ก่อนหน้า Sender ใช้เวลาส่งจริงเพียง L/R ภายในรอบที่ยาว RTT + L/R จึงได้สมการ U sender = (L/R) / (RTT + L/R) . ในตัวอย่าง L/R = 0.008 ms และ One-Way Propagation Delay 15 ms ทำให้ RTT ≈ 30 ms ดังนั้น U sender = 0.008 / 30.008 ≈ 0.00027 . ค่า 0.00027 เป็น Fraction หากแปลงเป็น Percent เท่ากับประมาณ 0.027% หมายความว่า Sender ใช้เวลาส่งข้อมูลจริงเพียง 0.027% และว่างรอประมาณ 99.973% แม้ Link จะรองรับถึง 1 Gbps. Speaker Notes ยกผลลัพธ์เชิง Throughput ว่า Packet ประมาณ 1 KB ส่งได้ราวหนึ่งก้อนต่อ 30 ms หรือประมาณ 33 KB/s สิ่งที่จำกัดการใช้งาน Link จึงไม่ใช่ความเร็วของ Physical Link แต่เป็นพฤติกรรม Stop-and-Wait ของ Protocol.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> แท่งแดงสั้นด้านบนแทนเวลา L/R ที่ Sender Busy ส่วนแท่งแดงยาวแทนเวลารวมของรอบ. แถบ Packet สีน้ำเงินกินเวลาเพียงเล็กน้อยที่ Sender แต่ต้องรอการเดินทางและ ACK เป็นเวลานาน. ข้อความ “rdt 3.0 protocol performance stinks!” เน้นว่าความถูกต้องของ Protocol ยังไม่เพียงพอ หากใช้ทรัพยากรได้ไม่คุ้ม. สมการแสดงตัวเลขเป็น Milliseconds ทั้งเศษและส่วน จึงหารกันได้โดยตรง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Utilization ของตัวอย่าง ≈ 0.00027 หรือ 0.027%. Bandwidth สูงไม่ได้แปลว่าจะได้ Throughput สูง หาก Protocol บังคับให้รอ. RTT ที่ใหญ่กว่า Transmission Delay มากทำให้ Stop-and-Wait เสียประสิทธิภาพ. ต้องเพิ่มจำนวน Packet ที่ส่งได้ก่อนรับ ACK เพื่อใช้ Link ให้คุ้มขึ้น.

---

## 📄 Slide 68: Pipelined Protocols: ส่งหลาย Packet โดยไม่ต้องรอทีละก้อน

*📄 Slide 68*

Pipelining คือการอนุญาตให้ Sender ส่ง Packet หลายก้อนต่อเนื่องกันก่อนที่จะได้รับ ACK ของแต่ละก้อน Packet ที่ส่งออกไปแล้วแต่ยังไม่ได้รับ ACK เรียกว่า In-Flight Packets . แนวคิดนี้ต่างจาก Stop-and-Wait ซึ่งมี In-Flight ได้ครั้งละหนึ่ง Packet เมื่อมีหลาย Packet อยู่ในเครือข่ายพร้อมกัน Sender สามารถใช้ช่วงเวลาที่เดิมต้องว่างรอ ACK เพื่อส่ง Data ก้อนอื่น จึงเพิ่ม Utilization. เมื่อมี Packet หลายก้อน Protocol ต้องเพิ่มช่วงของ Sequence Number เพราะค่าเพียง 0 และ 1 ไม่เพียงพอสำหรับแยก Packet ที่อยู่ระหว่างทางหลายก้อน และต้องมี Buffering ที่ Sender และ/หรือ Receiver เพื่อเก็บ Packet หรือ Data ที่ยังจัดการไม่เสร็จ. ภาพแผนที่แสดง Sender และ Receiver ที่อยู่ไกลกัน ลูกศรสีน้ำเงินคือ Data Packet ขาไปและลูกศรสีเขียวคือ ACK ขากลับ ภาพเริ่มจากลักษณะ Stop-and-Wait หนึ่ง Packet เพื่อเปรียบเทียบกับ Pipelining ซึ่งจะให้ Data Packet หลายก้อนเติมอยู่บนเส้นทางพร้อมกัน.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คำว่า multiple, in-flight, yet-to-be-acknowledged packets คือแก่นของ Pipelining. ระยะทางในแผนที่สื่อถึง RTT ที่ยาวและเหตุผลที่ไม่ควรปล่อย Link ว่างระหว่างรอ. ลูกศร Data และ ACK วิ่งคนละทิศทาง แสดงว่าการส่งและข้อมูลควบคุมสามารถอยู่ในเครือข่ายพร้อมกัน. Bullet สองข้อด้านล่างระบุผลต่อการออกแบบ Protocol: Sequence Number Space และ Buffer.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Pipelining เพิ่มจำนวน In-Flight Packets มากกว่าหนึ่ง. ต้องใช้ Sequence Number ได้หลายค่าเพื่อแยก Packet แต่ละก้อน. Sender/Receiver อาจต้องเก็บ Packet ใน Buffer. สองแนวทางหลักของ Pipelined Reliable Protocol คือ Go-Back-N และ Selective Repeat.

---

## 📄 Slide 69: Pipelining เพิ่ม Sender Utilization

*📄 Slide 69*

ไดอะแกรมแสดงตัวอย่าง 3-Packet Pipelining Sender ส่ง Packet สามก้อนต่อกันโดยไม่รอ ACK ของก้อนแรก แถบสีน้ำเงินสามแถบจึงอยู่ระหว่าง Sender และ Receiverพร้อมกัน. Sender Busy ต่อเนื่องเป็นเวลา 3L/R แทนที่จะ Busy เพียง L/R Receiver ส่ง ACK เมื่อ Bit สุดท้ายของแต่ละ Packet มาถึง เส้น ACK สามเส้นจึงย้อนกลับมาในเวลาต่างกัน. สำหรับตัวอย่างเดิม Utilization คำนวณเป็น U sender = (3L/R) / (RTT + L/R) = 0.0024 / 30.008 ≈ 0.00081 ซึ่งเป็นสามเท่าของค่า 0.00027 ใน Stop-and-Wait. แม้ค่า 0.00081 หรือประมาณ 0.081% ยังต่ำ เพราะส่งเพียงสาม Packet แต่ภาพนี้แสดงหลักการว่า เมื่อเพิ่มจำนวน Packet ใน Pipeline Sender จะใช้ช่วง RTT ได้มากขึ้น หากมี Packet มากพอ Pipeline สามารถช่วยเติม Link ไม่ให้ว่าง.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> แถบสีน้ำเงินสามแถบเริ่มต่อกันที่ Sender แสดงการส่ง Back-to-Back. ข้อความด้าน Receiver ระบุเวลาที่ Bit แรกและ Bit สุดท้ายของ Packet ที่ 1, 2 และ 3 มาถึง. เส้น ACK ย้อนกลับหลายเส้นแสดง ACK ของแต่ละ Packet ที่อยู่ระหว่างทางพร้อมกัน. ข้อความสีแดงสรุปว่า 3-Packet Pipelining เพิ่ม Utilization เป็นสามเท่าในตัวอย่างนี้.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Pipelining ไม่ลด RTT แต่ใช้เวลารอ RTT ให้เกิดประโยชน์มากขึ้น. ส่ง N Packet ต่อเนื่องทำให้เวลาที่ Sender Busy เพิ่มเป็นประมาณ N·L/R. ตัวอย่างสาม Packet เพิ่ม Utilization จาก 0.00027 เป็น 0.00081. กลไก ACK, Window และ Retransmission ของ Pipeline จะถูกกำหนดใน Go-Back-N และ Selective Repeat.

---

## 📄 Slide 70: Go-Back-N Sender: Sliding Window, Cumulative ACK และ Timeout

*📄 Slide 70*

Go-Back-N (GBN) เป็น Pipelined Protocol ที่ Sender ใช้ Sliding Window ขนาดสูงสุด N เพื่อกำหนดช่วง Sequence Number ที่สามารถส่งออกไปได้โดยยังไม่ต้องได้รับ ACK ครบทุก Packet. ในภาพ send_base ชี้ไปยัง Packet ที่เก่าที่สุดซึ่งส่งแล้วแต่ยังไม่ได้ ACK ส่วน nextseqnum ชี้ Sequence Number ที่จะใช้กับ Packet ใหม่ก้อนถัดไป ช่วงตั้งแต่ send_base ครอบคลุมจำนวน N ตำแหน่งคือ Sender Window. คำอธิบายสีในภาพคือ สีเขียว = ACK แล้ว, สีเหลือง = ส่งแล้วแต่ยังไม่ ACK, สีฟ้า = อยู่ใน Window และยังส่งได้, สีขาว = อยู่นอก Window จึงยังใช้ไม่ได้ Speaker Notes อธิบายตัวอย่าง Window Size 14 โดยมี 8 Packet ส่งแล้วแต่ยังไม่ ACK และเหลือ 6 Sequence Number ที่พร้อมใช้แต่ยังไม่มี Data จากด้านบนให้ส่ง. GBN ใช้ Cumulative ACK : ACK(n) ยืนยันว่า Receiver ได้รับ Packet ทุกก้อนจนถึงและรวม Sequence Number n เมื่อ Sender ได้รับ ACK(n) จะเลื่อน send_base ไปเริ่มที่ n+1 ทำให้ Window เลื่อนไปข้างหน้า. Sender ใช้ Timer สำหรับ Oldest In-Flight Packet เพียงตัวหลัก เมื่อเกิด timeout(n) จะส่ง Packet n และ Packet ที่มี Sequence Number สูงกว่าทั้งหมดซึ่งถูกส่งแล้วใน Window ซ้ำ นี่คือที่มาของชื่อ Go-Back-N. Speaker Notes ระบุว่า TCP ก็ใช้แนวคิด Cumulative ACK.


> [!DEFINITION] Pipelining: ส่งหลาย Packet พร้อมกันโดยไม่ต้องรอ ACK ทีละตัว
> - **Window Size (N):** จำนวน Packet สูงสุดที่ส่งได้โดยยังไม่ได้ ACK
> - **Utilization:** $U_{sender} = \frac{N \cdot L/R}{RTT + L/R}$
> - เมื่อ N = 1 → Stop-and-Wait (ช้ามาก)
> - เมื่อ N > 1 → Pipeline (เร็วขึ้น N เท่า)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กรอบสีเทาครอบแถบสีเหลืองและสีฟ้า แสดง Window ขนาด N. send_base เป็นขอบซ้ายของ Window ขณะที่ nextseqnum แบ่ง Packet ที่ส่งแล้วกับตำแหน่งที่ยังส่งได้. ช่องสีขาวด้านขวาไม่สามารถใช้ได้จนกว่า ACK จะทำให้ Window เลื่อนไป. ข้อความด้านล่างสรุปสามกลไกของ Sender ได้แก่ Cumulative ACK, Timer ของ Packet เก่าสุด และ Retransmit หลาย Packet เมื่อ Timeout.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Window จำกัดจำนวน Packet ที่อยู่ In-Flight สูงสุดเป็น N. ACK(n) เป็น Cumulative ACK สำหรับ Packet ทุกหมายเลขถึง n. เมื่อ ACK มาถึง Window เลื่อนไปเริ่มที่ n+1. Timeout ของ Packet เก่าสุดทำให้ส่ง Packet นั้นและ Packet ที่ตามมาซ้ำทั้งหมด.

---

## 📄 Slide 71: Go-Back-N Receiver: การรับแบบ ACK-only และ rcv_base

*📄 Slide 71*

สไลด์นี้อธิบายการทำงานของ Receiver ใน Go-Back-N (GBN) ซึ่งใช้แนวทาง ACK-only กล่าวคือ Receiver จะส่ง ACK เพื่อยืนยัน Packet ที่ได้รับถูกต้องและต่อเนื่องตามลำดับ โดยค่า ACK จะอ้างถึง Sequence Number สูงสุดที่ได้รับแบบ In-Order แล้ว ไม่ได้ยืนยัน Packet ที่มาถึงข้ามลำดับเป็นรายก้อน. ตัวแปร rcv_base คือ Sequence Number ของ Packet ก้อนถัดไปที่ Receiver กำลังรอ หากได้รับ Packet หมายเลขตรงกับ rcv_base Receiver จึงรับและส่งขึ้นชั้นบน จากนั้นเลื่อน rcv_base ไปยังหมายเลขถัดไป ด้วยเหตุนี้ Receiver ของ GBN จึงต้องจดจำ State หลักเพียงค่าเดียว คือ rcv_base . เมื่อ Packet มาถึงแบบ Out-of-Order สไลด์ระบุว่าสามารถเลือกทิ้งโดยไม่ Buffer หรือเก็บไว้ใน Buffer ได้ตามการออกแบบ Implementation อย่างไรก็ตาม Receiver ยังส่ง ACK ซ้ำสำหรับ Packet แบบ In-Order ล่าสุด จึงอาจเกิด Duplicate ACK หลายฉบับที่มีหมายเลขเดียวกัน.


| คุณสมบัติ | Go-Back-N (GBN) | Selective Repeat (SR) |
| :--- | :--- | :--- |
| **Window Size** | Sender มี Window, Receiver ไม่มี | ทั้ง Sender และ Receiver มี Window |
| **ACK Type** | Cumulative ACK | Individual ACK |
| **เมื่อเกิด Loss** | ส่งซ้ำทุก Packet ตั้งแต่ที่หาย | ส่งซ้ำเฉพาะ Packet ที่หาย |
| **Buffer ฝั่ง Receiver** | ไม่ต้อง Buffer (ทิ้ง Out-of-order) | ต้อง Buffer Packet ที่มาก่อน |
| **ประสิทธิภาพ** | เปลือง Bandwidth ถ้า Loss เยอะ | ประหยัด Bandwidth แต่ซับซ้อนกว่า |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> แถบหมายเลขด้านล่างคือมุมมองของ Receiver ต่อ Sequence Number Space และลูกศร rcv_base ชี้ตำแหน่ง Packet ถัดไปที่ต้องการ. สีเขียวหมายถึง Packet ที่ได้รับและ ACK แล้วแบบต่อเนื่อง ส่วนสีชมพูหมายถึง Packet ที่มาถึงข้ามลำดับ และสีขาวหมายถึงยังไม่ได้รับ. แม้ภาพแสดง Packet สีชมพูว่าเคยมาถึง แต่ ACK ที่ Receiver ส่งกลับยังคงยืนยันเฉพาะเลขก่อน rcv_base ซึ่งเป็นขอบเขตของข้อมูลที่ครบลำดับแล้ว.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - GBN Receiver ใช้ Cumulative ACK และยืนยันหมายเลขสูงสุดที่ได้รับครบตามลำดับ. rcv_base คือ Sequence Number ถัดไปที่ Receiver รอรับ. Packet ที่มาผิดลำดับไม่ทำให้ ACK เลื่อนไปข้างหน้า และอาจทำให้เกิด Duplicate ACK. Receiver ไม่จำเป็นต้องติดตาม State ของ Packet ทุกก้อนเหมือน Selective Repeat.

---

## 📄 Slide 72: Go-Back-N in Action: เมื่อ pkt2 สูญหาย

*📄 Slide 72*

ไดอะแกรมนี้แสดง Go-Back-N ที่มี Sender Window ขนาด N = 4 เวลาอ่านจากบนลงล่าง เส้นตั้งกลางคือ Sender เส้นตั้งขวาคือ Receiver ลูกศรสีน้ำเงินคือ Data Packet และลูกศรสีเขียวคือ ACK ที่ส่งย้อนกลับ. เริ่มต้น Sender ส่ง pkt0 , pkt1 , pkt2 และ pkt3 ได้ต่อเนื่องเพราะทั้งสี่หมายเลขอยู่ใน Window แต่ pkt2 สูญหายตรงเครื่องหมาย X loss . Receiver รับ pkt0 และ pkt1 ตามลำดับ จึงส่ง ack0 และ ack1 กลับ. เมื่อ ack0 และ ack1 มาถึง Sender ขอบซ้ายของ Window เลื่อนไป ทำให้ Sender มีตำแหน่งว่างและส่ง pkt4 กับ pkt5 เพิ่มได้ แต่ Receiver ยังรอ pkt2 ดังนั้น pkt3 , pkt4 และ pkt5 ซึ่งมาถึงข้ามลำดับจะถูกทิ้งในตัวอย่างนี้ และ Receiver ส่ง ack1 ซ้ำเพื่อบอกว่าข้อมูลที่ครบต่อเนื่องล่าสุดยังจบที่ Packet 1. Sender ได้รับ Duplicate ACK1 แต่ Window ไม่สามารถเลื่อนผ่าน pkt2 ได้ เมื่อ Timer ของ Packet เก่าสุดหมดเวลา จึงเกิด pkt2 timeout และ Sender ส่งซ้ำตั้งแต่ pkt2 ไปจนถึง Packet ที่ส่งแล้วทั้งหมดใน Window คือ pkt2 , pkt3 , pkt4 และ pkt5 . ครั้งนี้ Receiver รับตามลำดับ ส่งขึ้นชั้นบน และตอบ ACK2 ถึง ACK5.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> แถบสีน้ำเงินด้านซ้ายแสดงตำแหน่ง Sender Window ในแต่ละช่วง เมื่อ ACK0 และ ACK1 มาถึง Window เลื่อนไปจาก 0–3 เป็น 2–5. วงนาฬิกาและข้อความสีแดงแสดง Timeout ของ Packet 2 ซึ่งเป็น Packet เก่าสุดที่ยังไม่ ACK. วงกลมสีแดงฝั่ง Receiver เน้น Packet 3, 4 และ 5 ที่ถูกทิ้งเพราะ Packet 2 ยังขาดหาย. ชื่อ Go-Back-N สื่อถึงการย้อนกลับไปส่ง Packet ที่ Timeout และ Packet หลังจากนั้นซ้ำทั้งหมด ไม่ได้ส่งซ้ำเฉพาะก้อนที่หาย.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - การสูญหายของ Packet หนึ่งก้อนทำให้ Packet ที่ตามมาถูกทิ้งได้ แม้ Packet เหล่านั้นเดินทางถึงแล้ว. ACK ของ GBN เป็น Cumulative ACK; ACK1 หมายถึงรับครบถึง Packet 1. Timeout ของ Packet เก่าสุดทำให้ Retransmit หลาย Packet ตั้งแต่จุดที่ขาด. GBN ใช้งานง่าย แต่การส่งซ้ำหลายก้อนอาจสิ้นเปลืองเมื่อเครือข่ายมี Loss.

---

## 📄 Slide 73: Selective Repeat: แนวคิดและความแตกต่างจาก Go-Back-N

*📄 Slide 73*

Selective Repeat (SR) เป็น Pipelined Reliable Data Transfer Protocol ที่อนุญาตให้มี Packet หลายก้อนอยู่ระหว่างทางพร้อมกันเหมือน GBN แต่ต่างกันที่ Receiver จะส่ง ACK แยกเป็นราย Packet และสามารถ Buffer Packet ที่มาถึงผิดลำดับไว้ก่อน. เมื่อ Packet ที่ขาดหายมาถึง Receiver จึงนำ Packet นั้นรวมกับ Packet ที่เก็บใน Buffer แล้วส่งขึ้น Upper Layer ตามลำดับได้ วิธีนี้ลดการทิ้ง Packet ที่เดินทางมาถึงสำเร็จ และลดจำนวน Packet ที่ต้องส่งซ้ำ. ฝั่ง Sender ต้องติดตาม Packet ที่ยังไม่ ACK เป็นรายก้อน โดยแนวคิดในสไลด์กำหนด Timer สำหรับแต่ละ Unacknowledged Packet เมื่อ timeout(n) จะส่งซ้ำเฉพาะ Packet หมายเลข n ไม่ส่ง Packet หลังจากนั้นซ้ำทั้งหมด. Sender ยังคงใช้ Sliding Window ขนาด N เพื่อจำกัดจำนวน Sequence Number ที่อนุญาตให้ส่งแบบ In-Flight. Speaker Notes เปรียบเทียบว่า GBN ใช้ Cumulative ACK ขณะที่ Individual ACK เป็นกลไกสำคัญของ Selective Repeat.

```
[ โครงสร้าง TCP Segment Header: ขนาด 20 - 60 ไบต์ ]
 0                   15 16                  31
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|   Source Port (16 bits)   | Destination Port (16 bits)|
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|               Sequence Number (32 bits)       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Acknowledgment Number (32 bits)    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| HLen | Reserved |U|A|P|R|S|F|  Receive Window (16 bits)|
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|    Internet Checksum (16) |  Urgent Pointer (16 bits) |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options (ถ้ามี)             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|            Application Data Payload            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คำว่า pipelining เน้นว่าส่งหลาย Packet ก่อนรอ ACK ได้. ข้อความสีแดง receiver individually ACKs เน้นว่าการยืนยันเป็นรายหมายเลข ไม่ใช่ยืนยันรวมถึงหมายเลขหนึ่งเหมือน GBN. Bullet เรื่อง Buffering อธิบายเหตุผลที่ Receiver สามารถเก็บ Out-of-Order Packet เพื่อรอเติมช่องว่าง. Bullet ฝั่ง Sender เน้นสอง State ที่ซับซ้อนขึ้น คือ Timer ราย Packet และสถานะ ACK ราย Packet.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - SR ส่ง ACK แยกให้ Packet ทุกก้อนที่ได้รับถูกต้อง. Receiver Buffer Packet ผิดลำดับไว้เพื่อส่งขึ้นชั้นบนภายหลัง. Timeout ทำให้ส่งซ้ำเฉพาะ Packet ที่ยังไม่ ACK. ประสิทธิภาพดีกว่า GBN เมื่อเกิด Loss แต่ต้องเก็บ State และ Buffer มากกว่า.

---

## 📄 Slide 74: Selective Repeat Windows: มุมมอง Sequence Number ของ Sender

*📄 Slide 74*

ภาพนี้แสดง Sender Window ของ Selective Repeat โดยขอบซ้ายกำหนดด้วย send_base ซึ่งชี้ Packet หมายเลขต่ำสุดที่ยังไม่ ACK ส่วน nextseqnum ชี้ Sequence Number แรกที่ยังไม่เคยส่ง. Window มีขนาด N เริ่มจาก send_base ภายใน Window อาจมีทั้ง Packet ที่ส่งแล้วและ ACK แล้ว, ส่งแล้วแต่ยังไม่ ACK และตำแหน่งที่ยังไม่ได้ส่ง แต่พร้อมใช้งาน ความแตกต่างนี้เกิดขึ้นเพราะ ACK ของ SR มาถึงแยกกันได้ ไม่จำเป็นต้องเรียงตาม Sequence Number. แม้ Packet ทางขวาบางก้อนได้รับ ACK แล้ว แต่ถ้า Packet ที่ send_base ยังไม่ ACK ขอบซ้ายของ Window จะยังเลื่อนไม่ได้ เมื่อ Packet ฐานได้รับ ACK จึงสามารถข้าม Packet ที่ ACK แล้วต่อเนื่องและเลื่อนไปยัง Packet ที่ยังไม่ ACK ก้อนถัดไป.


| คุณสมบัติ | Go-Back-N (GBN) | Selective Repeat (SR) |
| :--- | :--- | :--- |
| **Window Size** | Sender มี Window, Receiver ไม่มี | ทั้ง Sender และ Receiver มี Window |
| **ACK Type** | Cumulative ACK | Individual ACK |
| **เมื่อเกิด Loss** | ส่งซ้ำทุก Packet ตั้งแต่ที่หาย | ส่งซ้ำเฉพาะ Packet ที่หาย |
| **Buffer ฝั่ง Receiver** | ไม่ต้อง Buffer (ทิ้ง Out-of-order) | ต้อง Buffer Packet ที่มาก่อน |
| **ประสิทธิภาพ** | เปลือง Bandwidth ถ้า Loss เยอะ | ประหยัด Bandwidth แต่ซับซ้อนกว่า |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สีเขียว = ส่งแล้วและ ACK แล้ว; สีเหลือง = ส่งแล้วแต่ยังไม่ ACK; สีฟ้า = อยู่ใน Window และยังไม่ได้ส่ง; สีขาว = อยู่นอก Window จึงยังใช้ไม่ได้. send_base อยู่ที่ช่องสีเหลืองซ้ายสุด แสดง Packet เก่าสุดที่ยังรอ ACK. nextseqnum อยู่ระหว่างช่องที่ส่งแล้วกับช่องสีฟ้า จึงเป็นหมายเลขที่จะใช้เมื่อมี Data ใหม่จากด้านบน. ภาพที่แสดงในสไลด์เป็นมุมมองของ Sender ตามป้าย “(a) sender view of sequence numbers”.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - SR Window สามารถมี Packet ที่ ACK แล้วและยังไม่ ACK ปะปนกัน. send_base จะเลื่อนได้เมื่อ Packet ฐานได้รับ ACK. nextseqnum ระบุตำแหน่ง Packet ใหม่ที่จะส่ง. สีขาวด้านขวาจะใช้ได้ก็ต่อเมื่อ Window เลื่อนไปครอบคลุม.

---

## 📄 Slide 75: Selective Repeat Sender and Receiver: กฎการทำงาน

*📄 Slide 75*

สไลด์แบ่งกฎของ Selective Repeat เป็นสองฝั่ง ฝั่งซ้ายคือ Sender และฝั่งขวาคือ Receiver . ช่วงหมายเลขในวงเล็บเหลี่ยมเป็น Inclusive Range กล่าวคือรวมทั้งค่าต้นและค่าปลาย. Sender: เมื่อมี Data จากด้านบน หาก Sequence Number ถัดไปยังอยู่ใน Sender Window จึงสร้างและส่ง Packet ได้ หากเกิด timeout(n) Sender ส่งซ้ำเฉพาะ Packet n และเริ่ม Timer ของ Packet นั้นใหม่. เมื่อได้รับ ACK(n) และ n อยู่ในช่วง [sendbase, sendbase+N-1] Sender ทำเครื่องหมาย Packet นั้นว่าได้รับ ACK แล้ว หาก n เป็น Packet ที่ยังไม่ ACK หมายเลขต่ำสุด Sender จะเลื่อน Window Base ไปยัง Packet ที่ยังไม่ ACK ก้อนถัดไป. Receiver: หาก Packet n อยู่ใน Receive Window ปัจจุบัน [rcvbase, rcvbase+N-1] จะส่ง ACK(n). หากมา Out-of-Order ให้ Buffer; หากมา In-Order ให้ Deliver และ Deliver Packet ใน Buffer ที่ต่อเนื่องกัน จากนั้นเลื่อน Receive Window ไปยัง Packet แรกที่ยังไม่ได้รับ. หาก Packet อยู่ในช่วงก่อนหน้า [rcvbase-N, rcvbase-1] แสดงว่าเป็น Packet เก่าที่ Receiver เคยรับแล้ว แต่ ACK อาจสูญหาย จึงส่ง ACK(n) ซ้ำโดยไม่ Deliver Data ซ้ำ ส่วนหมายเลขที่อยู่นอกสองช่วงนี้ให้ Ignore.


> [!DEFINITION] TCP Flow Control (ควบคุมอัตราส่งไม่ให้ล้น Buffer ผู้รับ)
> $$rwnd = \text{RcvBuffer} - [\text{LastByteRcvd} - \text{LastByteRead}]$$
> - **RcvBuffer**: ขนาด Buffer ทั้งหมดของผู้รับ
> - **rwnd (Receive Window)**: พื้นที่ว่างที่เหลือ → ส่งผ่าน TCP Header กลับมาหาผู้ส่ง
> - ผู้ส่งจำกัด: $\text{LastByteSent} - \text{LastByteAcked} \leq rwnd$

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กรอบซ้ายเรียง Event ของ Sender เป็น Data From Above, Timeout และ ACK Arrival. กรอบขวาแบ่ง Packet ที่มาถึงเป็นสามกลุ่ม: อยู่ใน Window ปัจจุบัน, อยู่ใน Window ก่อนหน้า และอยู่นอกช่วงที่เกี่ยวข้อง. Speaker Notes เน้นว่าเมื่อ Packet ที่เติมช่องว่างมาถึง Receiver จะ Deliver Packet นั้นและ Packet ใน Buffer ที่ต่อเนื่องทั้งหมดได้ในครั้งเดียว.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Sender ใช้ Timer และ ACK State แยกเป็นราย Packet. Receiver ACK Packet ที่รับถูกต้องแม้จะมาผิดลำดับ. In-Order Arrival อาจทำให้ Deliver Packet ที่ Buffer ไว้หลายก้อนพร้อมกัน. Duplicate Packet จาก Window ก่อนหน้าต้อง ACK ซ้ำ แต่ห้าม Deliver ซ้ำ.

---

## 📄 Slide 76: Selective Repeat in Action: Buffer และ Retransmit เฉพาะ pkt2

*📄 Slide 76*

ตัวอย่างนี้ใช้เหตุการณ์เดียวกับ GBN คือ Sender Window ขนาด N = 4 และ pkt2 สูญหาย แต่แสดงผลที่ต่างกันเมื่อใช้ Selective Repeat. Sender เริ่มส่ง pkt0 ถึง pkt3 ; Receiver รับ 0 และ 1 จึงส่ง ACK0 และ ACK1. เมื่อ pkt3 มาถึงก่อน pkt2 Receiver ไม่ทิ้ง แต่ Buffer pkt3 และส่ง ACK3. เมื่อ ACK0 และ ACK1 ทำให้ Sender Window มีพื้นที่ Sender ส่ง pkt4 และ pkt5 ; Receiver Buffer ทั้งสองก้อนและส่ง ACK4 กับ ACK5 แยกกัน. Sender บันทึกว่า ACK3, ACK4 และ ACK5 มาถึงแล้ว แต่ send_base ยังอยู่ที่ Packet 2 เพราะ ACK2 ยังขาด เมื่อ Timer ของ pkt2 หมดเวลา Sender จึงส่งซ้ำ เฉพาะ pkt2 ไม่ส่ง 3, 4 และ 5 ซ้ำ. Receiver รับ pkt2 ซึ่งเติมช่องว่างได้แล้ว จึง Deliver pkt2 พร้อม Packet ที่ Buffer ไว้ต่อเนื่องคือ pkt3 , pkt4 และ pkt5 จากนั้นส่ง ACK2 กลับ. คำถามท้ายภาพ “what happens when ack2 arrives?” คำตอบคือ Sender ทำเครื่องหมาย pkt2 ว่า ACK แล้ว และเมื่อพบว่า pkt3–pkt5 ก็ ACK ไว้ก่อนหน้าแล้ว จึงเลื่อน send_base ข้ามทั้งหมดไปยังหมายเลข 6 ทำให้ Window เปิดพื้นที่สำหรับ Packet ชุดถัดไป.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรสีน้ำเงินคือ Data; สีเขียวคือ ACK; เครื่องหมาย X คือ Loss ของ pkt2; นาฬิกาคือ Timeout. ข้อความสีแดงฝั่ง Receiver แสดงการ Buffer pkt3, pkt4 และ pkt5 แทนการ Discard. ข้อความ “send pkt2 (but not 3,4,5)” คือความแตกต่างสำคัญจาก GBN. แถบ Window ด้านซ้ายแสดงว่า ACK ราย Packet ถูกบันทึกได้ แม้ Window Base ยังติดอยู่ที่ Packet 2.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - SR เก็บ Out-of-Order Packet และ ACK เป็นรายก้อน. Loss ของ pkt2 ทำให้ส่งซ้ำเฉพาะ pkt2. เมื่อ pkt2 มาถึง Receiver สามารถ Deliver 2–5 ต่อเนื่องได้ทันที. เมื่อ ACK2 มาถึง Sender Window จะกระโดดข้าม Packet 3–5 ที่ ACK แล้วไปเริ่มที่ 6.

---

## 📄 Slide 77: Selective Repeat Dilemma: Sequence Number ซ้ำหลัง Wraparound

*📄 Slide 77*

สไลด์นำเสนอปัญหาสำคัญของ Selective Repeat เมื่อ Sequence Number Space เล็กเกินไปเมื่อเทียบกับ Window Size . ตัวอย่างมีหมายเลขเพียง 0, 1, 2, 3 แล้ววนกลับไป 0 อีกครั้ง และใช้ Window Size เท่ากับ 3. กรณี (a) no problem Packet หมายเลข 0 ที่มาถึงภายหลังเป็น Packet ใหม่จริง หลัง Sender และ Receiver เลื่อน Window ผ่านรอบแรกแล้ว Receiver จึงควรยอมรับหมายเลข 0 รอบใหม่นี้. กรณี (b) oops! Receiver เคยรับ Packet 0, 1 และ 2 แล้ว แต่ ACK ที่ส่งกลับสูญหาย Sender จึง Timeout และ Retransmit pkt0 เก่าจากรอบเดิม ขณะนั้น Receive Window ได้เลื่อนจนหมายเลข 0 กลับมาอยู่ในช่วงที่ยอมรับได้ จึงอาจเข้าใจผิดว่า Duplicate Packet เก่าคือ Packet 0 ใหม่. ทั้งสองกรณี Packet ที่ Receiver เห็นมี Sequence Number 0 เหมือนกัน แต่ความหมายต่างกัน: ด้านบนเป็นข้อมูลใหม่ ส่วนด้านล่างเป็น Retransmission ของข้อมูลเก่า หาก Receiver แยกไม่ออกจะ Deliver Data ซ้ำและทำลายความถูกต้องของ Reliable Transfer.


> [!DEFINITION] TCP Flow Control (ควบคุมอัตราส่งไม่ให้ล้น Buffer ผู้รับ)
> $$rwnd = \text{RcvBuffer} - [\text{LastByteRcvd} - \text{LastByteRead}]$$
> - **RcvBuffer**: ขนาด Buffer ทั้งหมดของผู้รับ
> - **rwnd (Receive Window)**: พื้นที่ว่างที่เหลือ → ส่งผ่าน TCP Header กลับมาหาผู้ส่ง
> - ผู้ส่งจำกัด: $\text{LastByteSent} - \text{LastByteAcked} \leq rwnd$

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> แถบสีน้ำเงินคือ Sender Window และแถบสีเขียวคือ Receiver Window ซึ่งเลื่อนผ่าน Sequence Number 0–3 แบบวนรอบ. กรณีบน ACK เดินทางกลับและ Window ของ Sender เลื่อนไปตามปกติ จึงมี pkt0 รอบใหม่ที่ถูกต้อง. กรณีล่างเครื่องหมาย X บนลูกศรสีเขียวแสดง ACK สูญหายหลายฉบับ ทำให้ Sender Retransmit pkt0 เก่าเมื่อ Timeout. ข้อความสีแดง “will accept packet with seq number 0” แสดงว่า Receiver จะยอมรับเลข 0 ในทั้งสองสถานการณ์ แม้หนึ่งกรณีไม่ควรยอมรับ.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Sequence Number ถูกนำกลับมาใช้เมื่อเกิด Wraparound. Window ที่กว้างเกินไปอาจทำให้ Packet เก่าและ Packet ใหม่มีหมายเลขเดียวกันและอยู่ใน Window พร้อมตีความได้เหมือนกัน. Receiver ไม่สามารถตัดสินจาก Sequence Number เพียงค่าเดียวว่า pkt0 เป็นของรอบเก่าหรือรอบใหม่. การกำหนดขนาด Sequence Number Space และ Window ต้องป้องกันการทับซ้อนเช่นนี้.

---

## 📄 Slide 78: Selective Repeat Dilemma: ความสัมพันธ์ระหว่าง Window กับ Sequence Number Space

*📄 Slide 78*

ภาพม่านสื่อว่า Receiver มองไม่เห็น State ภายในของ Sender และทราบได้เฉพาะ Packet ที่เดินทางมาถึง ดังนั้น Receiver เห็น Packet หมายเลข 0 ในกรณีปกติและกรณี Retransmission เก่าในลักษณะเดียวกัน พฤติกรรมของ Receiver จึงเหมือนกันทั้งสองกรณี ทั้งที่ผลที่ถูกต้องควรต่างกัน. สไลด์จึงตั้งคำถามว่า Sequence Number Space และ Window Size ต้องมีความสัมพันธ์อย่างไรเพื่อป้องกันปัญหาในกรณี (b). สิ่งที่ต้องหลีกเลี่ยงคือ Receive Window ใหม่ไปซ้อนทับกับหมายเลขของ Packet เก่าที่ยังอาจถูก Retransmit หรือค้างอยู่ในเครือข่าย. ข้อสรุปมาตรฐานของ Selective Repeat: จำนวนค่า Sequence Number ที่เป็นไปได้ต้องมีอย่างน้อย 2N เมื่อ N คือ Window Size หรือเขียนได้ว่า Window Size ≤ Sequence Number Space / 2 . ข้อนี้เป็นการขยายคำตอบของคำถามในสไลด์เพื่อใช้ทบทวน; ตัวสไลด์หน้านี้แสดงคำถามและปัญหาแต่ไม่ได้เขียนสมการคำตอบไว้. ในตัวอย่าง Sequence Number Space มี 4 ค่า แต่ Window Size เท่ากับ 3 จึงไม่เป็นไปตามเงื่อนไข เพราะ 4 น้อยกว่า 2×3. หากใช้หมายเลข 0–3 Window Size ที่ปลอดภัยสำหรับ Selective Repeat ต้องไม่เกิน 2.


> [!DEFINITION] TCP Flow Control (ควบคุมอัตราส่งไม่ให้ล้น Buffer ผู้รับ)
> $$rwnd = \text{RcvBuffer} - [\text{LastByteRcvd} - \text{LastByteRead}]$$
> - **RcvBuffer**: ขนาด Buffer ทั้งหมดของผู้รับ
> - **rwnd (Receive Window)**: พื้นที่ว่างที่เหลือ → ส่งผ่าน TCP Header กลับมาหาผู้ส่ง
> - ผู้ส่งจำกัด: $\text{LastByteSent} - \text{LastByteAcked} \leq rwnd$

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ม่านกั้น Sender กับ Receiver แสดงข้อจำกัดของ Distributed System: แต่ละฝั่งรู้ State ของอีกฝั่งได้ผ่าน Message เท่านั้น. ด้านขวาทั้งสองภาพ Receiver Window อยู่ในตำแหน่งที่ยอมรับ Sequence Number 0 เหมือนกัน. ข้อความ “receiver behavior identical in both cases” คือสาเหตุที่ต้องออกแบบ Sequence Number Space ให้กว้างพอ ไม่ใช่แก้ด้วยตรรกะ Receiver เฉพาะหน้า.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Receiver แยก Packet เก่ากับ Packet ใหม่ไม่ได้ หากหมายเลขและตำแหน่ง Window เหมือนกัน. สำหรับ SR ต้องมี Sequence Number Space อย่างน้อย 2 เท่าของ Window Size. ถ้ามี Sequence Number 4 ค่า Window Size ต้องไม่เกิน 2. เงื่อนไขนี้ป้องกัน Sender Window เก่าและ Receiver Window ใหม่ซ้อนทับกันอย่างกำกวม.

---

## 📄 Slide 79: Chapter 3 Roadmap: เข้าสู่ Connection-Oriented Transport — TCP

*📄 Slide 79*

Connection-Oriented Transport: TCP Connection-Oriented Transport: TCP สไลด์ Roadmap ใช้เปลี่ยนจากหลักการ Reliable Data Transfer ไปสู่หัวข้อ Connection-Oriented Transport: TCP . หัวข้อก่อนหน้า ได้แก่ Transport-Layer Services, Multiplexing/Demultiplexing, UDP และ Principles of Reliable Data Transfer แสดงเป็นสีจางเพื่อบอกว่าได้ศึกษาแล้ว. ส่วน TCP ถูกเน้นและแบ่งเป็นสี่หัวข้อย่อย ได้แก่ Segment Structure , Reliable Data Transfer , Flow Control และ Connection Management . ลำดับนี้เริ่มจากรูปแบบข้อมูลของ TCP แล้วจึงศึกษากลไกความเชื่อถือได้ การไม่ส่งข้อมูลเกินความสามารถของ Receiver และขั้นตอนสร้าง/ปิด Connection. หัวข้อ Principles of Congestion Control และ TCP Congestion Control ที่อยู่ด้านล่างยังเป็นเนื้อหาถัดจากส่วน TCP. ภาพสะพานหรือโครงสร้างเชื่อมต่อด้านขวาเป็นภาพประกอบการเปลี่ยนเข้าสู่หัวข้อ Connection-Oriented Transport; ประเด็นวิชาการหลักของหน้านี้อยู่ที่ Roadmap และหัวข้อย่อยที่ถูกเน้น.


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ข้อความสีน้ำเงินเข้ม “Connection-oriented transport: TCP” ระบุหัวข้อปัจจุบัน. Bullet ย่อยสี่ข้อเป็นแผนการเรียนภายในส่วน TCP. รายการสีเทาด้านบนและด้านล่างช่วยแสดงตำแหน่งของหัวข้อนี้ในโครงสร้าง Chapter 3 ทั้งบท.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ส่วนถัดไปจะศึกษาการทำงานของ TCP โดยตรง. หัวข้อหลักคือ Segment Structure, Reliable Transfer, Flow Control และ Connection Management. Flow Control ป้องกัน Sender ส่งเร็วเกินความสามารถของ Receiver. Congestion Control เป็นหัวข้อถัดไปและมุ่งปัญหาความสามารถของ Network ไม่ใช่เฉพาะ Receiver.

---

## 📄 Slide 80: TCP Overview: คุณสมบัติหลักของ TCP

*📄 Slide 80*

TCP เป็น Transport Protocol แบบ Point-to-Point หนึ่ง Connection เชื่อม Sender หนึ่งฝั่งกับ Receiver หนึ่งฝั่ง และให้บริการ Reliable, In-Order Byte Stream คือส่งลำดับของ Bytes ให้ถูกต้องครบถ้วนตามลำดับ. คำว่า No Message Boundaries หมายความว่า TCP มองข้อมูลเป็นกระแส Bytes ต่อเนื่อง ไม่รักษาขอบเขตข้อความที่ Application ส่งเข้ามา Application อาจเขียนข้อมูลหนึ่งครั้ง แต่ TCP แบ่งเป็นหลาย Segment หรือรวมข้อมูลจากหลายครั้งไว้ใน Segment ตามความเหมาะสม. TCP รองรับ Full-Duplex Data จึงส่งข้อมูลได้สองทิศทางภายใน Connection เดียว แต่ละทิศทางมี Byte Stream และการยืนยันของตนเอง. MSS (Maximum Segment Size) คือปริมาณ Application Data สูงสุดโดยทั่วไปที่ใส่ใน TCP Segment หนึ่งก้อน; Speaker Notes ระบุค่าที่พบบ่อยคือ 1460 Bytes. TCP ใช้ Cumulative ACK เพื่อยืนยัน Bytes ที่ได้รับต่อเนื่อง และใช้ Pipelining เพื่อให้มีข้อมูลหลาย Segment อยู่ระหว่างทางพร้อมกัน ขนาด Window ไม่ได้คงที่ แต่ถูกกำหนดร่วมกันโดย Flow Control และ Congestion Control. TCP เป็น Connection-Oriented จึงต้องทำ Handshaking หรือแลกเปลี่ยน Control Messages ก่อน Data Exchange เพื่อกำหนด State เริ่มต้นของ Sender และ Receiver. กลไก Flow Control ทำให้ Sender ไม่ส่งข้อมูลมากจนล้น Buffer ของ Receiver. ชื่อหัวข้อระบุ RFC ที่เกี่ยวข้อง ได้แก่ RFC 793, 1122, 2018, 5681 และ 7323 ซึ่งสะท้อนว่า TCP ถูกกำหนดและขยายรายละเอียดผ่านเอกสารมาตรฐานหลายฉบับ.


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คอลัมน์ซ้ายสรุปลักษณะบริการ: Point-to-Point, Reliable In-Order Byte Stream, Full Duplex และ MSS. คอลัมน์ขวาสรุปกลไกควบคุม: Cumulative ACK, Pipelining, Connection Setup และ Flow Control. คำว่า “TCP congestion and flow control set window size” แสดงว่า Sender ส่งได้มากเพียงใดขึ้นกับทั้งความพร้อมของ Receiver และสภาพความคับคั่งของ Network.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - TCP ให้ Reliable, In-Order Byte Stream ไม่ใช่บริการแบบ Message-Oriented. หนึ่ง TCP Connection เป็น Point-to-Point และส่งข้อมูลได้สองทิศทาง. TCP ใช้ Handshake ก่อนแลกเปลี่ยน Data และใช้ Cumulative ACK/Pipelining ระหว่างส่ง. Flow Control ป้องกัน Receiver Overflow; Congestion Control ป้องกันการกดดัน Network มากเกินไป. MSS ที่พบบ่อยคือประมาณ 1460 Bytes แต่ค่าจริงขึ้นกับเส้นทางและการกำหนดระบบ.

---

## 📄 Slide 81: TCP Segment Structure: โครงสร้างส่วนหัวและข้อมูลของ TCP

*📄 Slide 81*

สไลด์นี้แสดงรูปแบบของ TCP Segment โดยแต่ละแถวของส่วนหัวกว้าง 32 bits . ส่วนบนคือ TCP Header ซึ่งเก็บข้อมูลควบคุมการสื่อสาร ส่วนล่างคือ Application Data ที่แอปพลิเคชันส่งเข้าสู่ TCP Socket และมีความยาวเปลี่ยนแปลงได้. แถวแรกประกอบด้วย Source Port และ Destination Port เพื่อระบุ Process หรือ Socket ต้นทางและปลายทาง. ถัดมาคือ Sequence Number ซึ่งระบุหมายเลขของไบต์แรกในข้อมูลของ Segment นี้ โดย TCP นับตำแหน่งเป็นไบต์ใน Byte Stream ไม่ได้นับเป็นหมายเลข Segment. Acknowledgment Number ระบุ Sequence Number ของไบต์ถัดไปที่ผู้รับต้องการได้รับจากอีกฝั่ง. ค่านี้มีความหมายเมื่อ Flag A หรือ ACK ถูกตั้งไว้. ดังนั้น ACK ไม่ได้บอกหมายเลข Segment ที่เพิ่งได้รับ แต่บอกว่า “รับข้อมูลครบถึงก่อนเลขนี้แล้ว และกำลังรอไบต์หมายเลขนี้”. ฟิลด์ Header Length บอกความยาวของ TCP Header เพราะส่วน Options อาจทำให้ Header ยาวไม่เท่ากัน. Checksum ใช้ตรวจหาความผิดพลาดของ Header และ Data. ส่วน Receive Window บอกจำนวนไบต์ที่ Receiver ยังยินดีรับ ใช้สำหรับ Flow Control เพื่อไม่ให้ Sender ส่งข้อมูลเร็วจน Receiver รองรับไม่ไหว. กลุ่ม Flag ประกอบด้วยตัวอักษรหลายตัว. สไลด์เน้นว่า C และ E ใช้เกี่ยวกับ Congestion Notification , A ระบุว่า Segment นี้มี ACK ที่ใช้งานได้ และ RST , SYN , FIN ใช้ในการจัดการ TCP Connection. ฟิลด์ Urgent Data Pointer และ Options เป็นส่วนเพิ่มเติมตามรูปแบบของ TCP Header.


```
[ TCP 3-Way Handshake ]
Client                          Server
  │── SYN (seq=x) ────────────────>│   Step 1: Client ส่ง SYN
  │                                │
  │<── SYN-ACK (seq=y, ack=x+1) ──│   Step 2: Server ตอบ SYN-ACK
  │                                │
  │── ACK (seq=x+1, ack=y+1) ────>│   Step 3: Client ส่ง ACK → เชื่อมต่อสำเร็จ!
  │                                │
  │══════════ Data Transfer ══════>│
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กรอบสีน้ำเงินด้านบนและด้านขวาเน้นขอบเขตของ TCP Segment และความกว้าง 32 bits ต่อแถว. ลูกศรด้านขวาชี้ว่า Sequence Number นับไบต์ใน Byte Stream และ Receive Window คือจำนวนไบต์ที่ Receiver ยอมรับได้. ลูกศรด้านซ้ายเชื่อมคำอธิบายกับ Acknowledgment Number, Header Length, Checksum, Flags และ Options. พื้นที่ Application Data มีขนาดใหญ่และระบุว่า Variable Length เพราะแต่ละ Segment อาจบรรทุกข้อมูลไม่เท่ากัน.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - TCP Header มีข้อมูลมากกว่า UDP Header เพราะ TCP ต้องรองรับ Reliability, Flow Control และ Connection Management. Sequence Number และ Acknowledgment Number ของ TCP อ้างอิง “หมายเลขไบต์” ไม่ใช่หมายเลข Segment. Receive Window ใช้ควบคุม Sender ตามความสามารถของ Receiver.

---

## 📄 Slide 82: TCP Sequence Numbers and ACKs: การนับไบต์และ Cumulative ACK

*📄 Slide 82*

Sequence Number ของ TCP คือหมายเลขใน Byte Stream ของไบต์แรกที่อยู่ใน Segment. หาก Segment เริ่มบรรทุกข้อมูลจากไบต์หมายเลข 500 ค่า Sequence Number จะเป็น 500 ไม่ว่า Segment นั้นจะเป็น Segment ลำดับที่เท่าใดก็ตาม. Acknowledgment Number คือหมายเลขของไบต์ถัดไปที่ Receiver คาดว่าจะได้รับจากอีกฝั่ง. TCP ใช้ Cumulative ACK หมายความว่า ACK ค่าเดียวสามารถยืนยันข้อมูลทุกไบต์ที่ได้รับครบต่อเนื่องก่อนหน้านั้นได้. แถบ Sender Sequence Number Space แบ่งหมายเลขออกเป็นสี่ช่วง: ส่งและได้รับ ACK แล้ว, ส่งแล้วแต่ยังไม่ได้ ACK ซึ่งเรียกว่า In-Flight , อยู่ใน Window และสามารถส่งได้แต่ยังไม่ส่ง และอยู่นอก Window จึงยังใช้ไม่ได้. ความกว้างของช่วงที่ส่งได้ถูกกำหนดด้วย Window Size N . ภาพ Segment ด้านบนแทน Segment ที่ Sender ส่งออก จึงมี Sequence Number ของข้อมูลฝั่ง Sender. ภาพด้านล่างแทน Segment ที่ Receiver ส่งกลับ โดยตั้ง Flag A และใส่ Acknowledgment Number เพื่อบอกไบต์ถัดไปที่ต้องการ. สำหรับ Segment ที่มาถึงผิดลำดับหรือ Out-of-Order สไลด์ระบุว่า TCP Specification ไม่กำหนดวิธีจัดการเพียงแบบเดียว จึงขึ้นอยู่กับการออกแบบของ Implementation ว่าจะเก็บไว้ใน Buffer หรือจัดการอย่างไร.


> [!DEFINITION] Pipelining: ส่งหลาย Packet พร้อมกันโดยไม่ต้องรอ ACK ทีละตัว
> - **Window Size (N):** จำนวน Packet สูงสุดที่ส่งได้โดยยังไม่ได้ ACK
> - **Utilization:** $U_{sender} = \frac{N \cdot L/R}{RTT + L/R}$
> - เมื่อ N = 1 → Stop-and-Wait (ช้ามาก)
> - เมื่อ N > 1 → Pipeline (เร็วขึ้น N เท่า)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สีเขียวเข้มคือข้อมูลที่ส่งและ ACK แล้ว; สีเขียวอ่อนคือข้อมูลที่ส่งแต่ยังรอ ACK. ช่วงสีขาวภายใน Window คือหมายเลขที่ส่งได้ทันที ส่วนช่วงสีเทาด้านขวายังอยู่นอก Window. คำว่า Window Size N ครอบช่วงตั้งแต่ไบต์แรกที่ยังไม่ ACK ไปจนถึงขอบขวาของ Window. Segment ที่ส่งกลับมี Acknowledgment Number และ Flag A เพื่อสื่อสารสถานะการรับข้อมูลกลับไปยังอีกฝั่ง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ACK = x หมายถึงรับข้อมูลครบต่อเนื่องถึงไบต์ x-1 และกำลังรอไบต์ x. Cumulative ACK ยืนยันข้อมูลหลายไบต์หรือหลาย Segment ได้พร้อมกัน. Window เลื่อนไปข้างหน้าเมื่อข้อมูลเก่าได้รับ ACK.

---

## 📄 Slide 83: TCP Sequence Numbers and ACKs: ตัวอย่าง Telnet แบบ Full Duplex

*📄 Slide 83*

ไดอะแกรมแสดงสถานการณ์ Telnet อย่างง่ายระหว่าง Host A และ Host B . เวลาอ่านจากบนลงล่าง และลูกศรชี้ทิศทางที่ TCP Segment เดินทาง. ตัวอย่างนี้แสดงว่า Segment เดียวสามารถมีทั้ง Data, Sequence Number และ Acknowledgment Number พร้อมกันได้ เพราะ TCP เป็นแบบ Full Duplex . เมื่อผู้ใช้ที่ Host A พิมพ์ตัวอักษร C ซึ่งมีขนาด 1 ไบต์ A ส่ง Seq=42, ACK=79, data='C' . ค่า Seq=42 หมายถึงตัวอักษร C เป็นไบต์หมายเลข 42 ใน Byte Stream ของ A. ACK=79 หมายถึง A กำลังรอไบต์หมายเลข 79 จาก B. Host B รับตัวอักษร C แล้วส่งกลับ Seq=79, ACK=43, data='C' . ค่า ACK=43 ยืนยันว่า B รับไบต์หมายเลข 42 แล้ว และรอไบต์ถัดไปคือ 43. ใน Segment เดียวกัน B ยัง Echo ตัวอักษร C กลับ โดยใช้ Sequence Number 79 ของ Byte Stream ฝั่ง B. เมื่อ Host A รับตัวอักษร C ที่ B Echo กลับ จึงส่ง Seq=43, ACK=80 . ACK=80 เกิดจากข้อมูลของ B เริ่มที่ Seq=79 และมีความยาว 1 ไบต์ ดังนั้นไบต์ถัดไปที่ A ต้องการคือ 80. Segment สุดท้ายไม่มี Data จึงทำหน้าที่เป็น ACK เป็นหลัก.


> [!DEFINITION] TCP Sequence & Acknowledgment Numbers
> - **Sequence Number:** หมายเลขไบต์แรกของข้อมูลใน Segment นี้
> - **ACK Number:** หมายเลขไบต์ถัดไปที่คาดว่าจะได้รับ (Cumulative ACK)
> - ตัวอย่าง: ถ้า Host A ส่งข้อมูลเริ่มที่ byte 42, ขนาด 10 bytes → seq=42
> - Host B ตอบ ACK=52 (หมายถึง "ได้รับถึง byte 51 แล้ว รอ byte 52")

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> วงกลมสีแดงเน้นค่าที่สัมพันธ์กัน: Seq 42 ทำให้เกิด ACK 43 และ Seq 79 ทำให้เกิด ACK 80. ลูกศรแรกและลูกศรที่สองมี Data C ส่วนลูกศรสุดท้ายเป็นการตอบ ACK หลังรับ Echo. Sequence Number ของสองทิศทางเป็นคนละชุดกัน: A ใช้ 42, 43 ขณะที่ B ใช้ 79, 80. ค่า ACK ใน Segment เดียวกันยืนยันข้อมูลจาก “อีกทิศทาง” ไม่ได้ยืนยัน Data ที่อยู่ใน Segment เดียวกัน.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ข้อมูล 1 ไบต์ทำให้ค่า ACK เพิ่มขึ้น 1. Seq และ ACK สามารถอยู่พร้อมกันใน TCP Segment ได้. แต่ละทิศทางของ TCP Connection มี Sequence Number Space ของตนเอง.

---

## 📄 Slide 84: TCP Round-Trip Time and Timeout: การตั้งค่า Timeout ให้เหมาะสม

*📄 Slide 84*

TCP ต้องกำหนด Timeout เพื่อทราบว่าเมื่อใดควรส่ง Segment ซ้ำ. โดยทั่วไป Timeout ต้องยาวกว่า Round-Trip Time: RTT ซึ่งคือเวลาตั้งแต่ส่ง Segment ไปจนได้รับ ACK กลับ แต่ปัญหาคือ RTT เปลี่ยนแปลงตามสภาพเครือข่าย. หากตั้ง Timeout สั้นเกินไป จะเกิด Premature Timeout : Sender เข้าใจผิดว่า Segment สูญหายทั้งที่ Segment หรือ ACK เพียงมาช้า ส่งผลให้เกิด Retransmission ที่ไม่จำเป็น. หากตั้งยาวเกินไป TCP จะตอบสนองต่อ Segment Loss ช้าและเสียเวลารอก่อนส่งซ้ำ. SampleRTT คือเวลาที่วัดจากการส่ง Segment หนึ่งก้อนจนได้รับ ACK ของ Segment นั้น. การวัดจะไม่นำ Segment ที่ Retransmit มาคำนวณ เพราะเมื่อ ACK มาถึงอาจแยกไม่ได้ว่าเป็น ACK ของการส่งครั้งแรกหรือครั้งที่ส่งซ้ำ. SampleRTT แต่ละครั้งอาจขึ้นลงมาก จึงไม่ควรใช้ค่าล่าสุดเพียงค่าเดียวเป็น Timeout. TCP สร้างค่า RTT ที่เรียบกว่าโดยเฉลี่ยข้อมูลจากการวัดหลายครั้ง เรียกว่า EstimatedRTT .

> [!DEFINITION] สูตรคำนวณการประมาณค่า RTT ใน TCP
> 1. $$\text{EstimatedRTT} = (1 - \alpha) \cdot \text{EstimatedRTT} + \alpha \cdot \text{SampleRTT} \quad (\alpha = 0.125)$$
> 2. $$\text{DevRTT} = (1 - \beta) \cdot \text{DevRTT} + \beta \cdot |\text{SampleRTT} - \text{EstimatedRTT}| \quad (\beta = 0.25)$$
> 3. $$\text{TimeoutInterval} = \text{EstimatedRTT} + 4 \cdot \text{DevRTT}$$

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คอลัมน์ซ้ายตอบคำถามว่าจะตั้ง Timeout อย่างไร และแสดงผลเสียของค่าที่สั้นหรือยาวเกินไป. คอลัมน์ขวาอธิบายการวัด SampleRTT และเหตุผลที่ต้องทำ EstimatedRTT ให้ Smoother. คำว่า Ignore Retransmissions เป็นข้อกำหนดสำคัญเพื่อหลีกเลี่ยงความกำกวมของ ACK.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Timeout ต้องมากกว่า RTT โดยประมาณ แต่ต้องไม่มากจนตอบสนองต่อ Loss ช้า. SampleRTT คือค่าที่วัดได้หนึ่งครั้ง ส่วน EstimatedRTT คือค่าประมาณที่ทำให้เรียบแล้ว. ไม่ใช้ RTT ของ Segment ที่ถูกส่งซ้ำในการคำนวณ.

---

## 📄 Slide 85: EstimatedRTT: การทำค่า RTT ให้เรียบด้วย EWMA

*📄 Slide 85*

TCP คำนวณ EstimatedRTT ใหม่เมื่อมี SampleRTT ใหม่ โดยใช้สมการ EstimatedRTT = (1-α) × EstimatedRTT + α × SampleRTT . วิธีนี้เรียกว่า Exponentially Weighted Moving Average: EWMA . ค่า α กำหนดน้ำหนักของ SampleRTT ล่าสุด. ค่าตัวอย่างในสไลด์คือ α = 0.125 จึงให้น้ำหนักแก่ค่าที่วัดใหม่ 12.5% และคงอิทธิพลของ EstimatedRTT เดิมไว้ 87.5%. ผลคือค่าประมาณไม่เปลี่ยนแรงตาม Sample เดียว. คำว่า “อิทธิพลของ Sample ในอดีตลดลงแบบ Exponential” หมายถึง ยิ่ง Sample เก่ามาก น้ำหนักที่เหลืออยู่ใน EstimatedRTT จะยิ่งลดลงอย่างรวดเร็ว แต่ไม่ได้ถูกลบทิ้งทันที. กราฟด้านล่างแสดง RTT ระหว่างโฮสต์ที่ UMass และโฮสต์ในฝรั่งเศส. จุดหรือเส้นของ SampleRTT แกว่งขึ้นลงมาก ขณะที่เส้น EstimatedRTT เรียบกว่าและติดตามแนวโน้มโดยรวม. แกนตั้งคือ RTT หน่วย Milliseconds และแกนนอนคือเวลาเป็น Seconds.


> [!INFO] 📜 ยุคประวัติศาสตร์ที่กล่าวถึงในสไลด์นี้
> สไลด์นี้เป็นส่วนหนึ่งของลำดับเหตุการณ์ประวัติศาสตร์อินเทอร์เน็ต แสดงพัฒนาการสำคัญที่นำไปสู่เทคโนโลยีเครือข่ายในปัจจุบัน

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สูตรด้านบนผสมค่าประมาณเดิมกับค่าที่เพิ่งวัดได้ ไม่ใช่ค่าเฉลี่ยเลขคณิตธรรมดาของทุก Sample. เส้น SampleRTT ในกราฟมี Spike และความผันผวน ส่วน EstimatedRTT เปลี่ยนช้ากว่า. EstimatedRTT ยังปรับตามสภาพเครือข่าย แต่ลดผลกระทบจากค่าผิดปกติระยะสั้น.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - EWMA ให้ความสำคัญกับข้อมูลใหม่มากกว่าข้อมูลเก่า แต่ยังเก็บประวัติไว้. α มากทำให้ EstimatedRTT ตอบสนองเร็วขึ้น; α น้อยทำให้เส้นเรียบขึ้น. ค่าทั่วไปในสไลด์คือ α = 0.125.

---

## 📄 Slide 86: TimeoutInterval and DevRTT: เพิ่ม Safety Margin ตามความผันผวน

*📄 Slide 86*

การใช้ EstimatedRTT เพียงค่าเดียวอาจยังไม่ปลอดภัย เพราะ RTT มีความผันผวน. TCP จึงกำหนด TimeoutInterval เป็น EstimatedRTT บวก Safety Margin ตามสมการ TimeoutInterval = EstimatedRTT + 4 × DevRTT . DevRTT วัดว่าค่า SampleRTT เบี่ยงเบนจาก EstimatedRTT มากเพียงใด. สไลด์ใช้สมการ EWMA: DevRTT = (1-β) × DevRTT + β × |SampleRTT-EstimatedRTT| โดยค่าทั่วไปคือ β = 0.25 . เครื่องหมายค่าสัมบูรณ์ทำให้วัดขนาดของความต่างโดยไม่สนใจว่า Sample สูงหรือต่ำกว่าค่าประมาณ. เมื่อ RTT มีการแกว่งมาก ค่า DevRTT จะสูง ทำให้ Safety Margin และ TimeoutInterval ใหญ่ขึ้น. เมื่อเครือข่ายมี RTT คงที่ DevRTT จะเล็กลง ทำให้ TCP ใช้ Timeout ที่กระชับขึ้นและตรวจพบ Loss ได้เร็วขึ้น. ในภาพ เส้นใต้ EstimatedRTT แทนค่าพื้นฐาน และช่วงที่เพิ่มอีก 4 × DevRTT คือ Safety Margin. วิธีนี้ทำให้ Timeout ปรับตามทั้ง “ค่าเฉลี่ย” และ “ระดับความผันผวน” ของ RTT.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สมการแรกแบ่ง TimeoutInterval เป็น Estimated RTT กับ Safety Margin อย่างชัดเจน. สมการ DevRTT ใช้ EWMA เช่นเดียวกับ EstimatedRTT แต่ติดตามความคลาดเคลื่อนแทนค่าระยะเวลาโดยตรง. ตัวคูณ 4 ขยาย Margin เพื่อให้มีพื้นที่รองรับความแปรปรวนของ RTT.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - EstimatedRTT บอกค่ากลาง ส่วน DevRTT บอกระดับการแกว่ง. RTT ผันผวนมากต้องใช้ Timeout ที่มี Margin มากขึ้น. TimeoutInterval = EstimatedRTT + 4DevRTT.

---

## 📄 Slide 87: TCP Sender (Simplified): การตอบสนองต่อ Data, Timeout และ ACK

*📄 Slide 87*

สไลด์สรุปการทำงานของ TCP Sender ผ่านเหตุการณ์หลักสามประเภท ไม่ได้แสดง FSM เต็ม แต่ใช้คำอธิบายเพื่อให้เห็นภาพรวมของ Algorithm. เมื่อเกิด Data Received from Application Sender จะสร้าง TCP Segment และกำหนด Sequence Number ให้เป็นหมายเลข Byte Stream ของไบต์แรกใน Segment. หาก Timer ยังไม่ทำงาน Sender จะเริ่ม Timer โดยให้คิดว่า Timer นี้ติดตาม Segment เก่าสุดที่ยังไม่ได้ ACK และใช้ช่วงเวลา TimeoutInterval . เมื่อเกิด Timeout Sender จะ Retransmit Segment ที่เป็นสาเหตุให้ Timer หมดเวลา แล้ว Restart Timer. แนวคิดนี้ช่วยกู้คืนข้อมูลเมื่อ Segment หรือ ACK สูญหาย. เมื่อเกิด ACK Received และ ACK นั้นยืนยันข้อมูลที่ก่อนหน้านี้ยังไม่ถูก ACK, Sender จะอัปเดตขอบเขตของข้อมูลที่ทราบว่าได้รับแล้ว. หากยังมี Segment อื่นที่รอ ACK ก็เริ่มหรือปรับ Timer ให้ติดตาม Segment เก่าสุดที่ยังค้างอยู่.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คอลัมน์ซ้ายคือเหตุการณ์จาก Application; คอลัมน์ขวาบนคือ Timeout; คอลัมน์ขวาล่างคือ ACK Received. ข้อความ “timer for oldest unACKed segment” เชื่อมหลักการ Timer กับ SendBase ของข้อมูลที่ยังค้าง. ACK ที่ไม่ยืนยันข้อมูลใหม่จะไม่ทำให้ขอบเขต ACKed Data เลื่อนไป.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Sequence Number ของ Segment คือหมายเลขไบต์แรกของ Data. Timer มองเป็น Timer ของ Segment เก่าสุดที่ยังไม่ ACK. Timeout ทำให้ส่ง Segment ซ้ำ; ACK ใหม่ทำให้เลื่อนสถานะข้อมูลที่รับแล้ว.

---

## 📄 Slide 88: TCP Receiver ACK Generation: กฎการตอบ ACK ตาม RFC 5681

*📄 Slide 88*

ตารางแบ่งเป็นสองคอลัมน์: ด้านซ้ายคือ Event at Receiver และด้านขวาคือ TCP Receiver Action . แต่ละแถวอธิบายว่าผู้รับควรตอบ ACK อย่างไรตามลักษณะของ Segment ที่มาถึง. กรณีที่ 1: Segment มาถึงตามลำดับด้วย Expected Sequence Number และข้อมูลก่อนหน้านี้ ACK แล้วทั้งหมด. Receiver สามารถใช้ Delayed ACK โดยรอ Segment ถัดไปได้ไม่เกิน 500 ms. หากไม่มี Segment ถัดไปจึงส่ง ACK. กรณีที่ 2: Segment ตามลำดับอีกก้อนมาถึงในขณะที่ ACK ของก้อนก่อนยัง Pending. Receiver ต้องส่ง Single Cumulative ACK ทันที เพื่อ ACK Segment ที่ครบลำดับทั้งสองก้อนพร้อมกัน. วิธีนี้ลดจำนวน ACK Traffic. กรณีที่ 3: Segment มาถึงผิดลำดับและมี Sequence Number สูงกว่าที่คาด ทำให้ตรวจพบ Gap . Receiver ส่ง Duplicate ACK ทันที โดย ACK ไบต์สุดท้ายที่รับครบตามลำดับ หรือกล่าวอีกแบบคือระบุ Sequence Number ของไบต์ถัดไปที่ยังรอ. กรณีที่ 4: Segment ที่มาถึงเติม Gap บางส่วนหรือทั้งหมด. Receiver ส่ง ACK ทันที หาก Segment เริ่มที่ขอบล่างของ Gap เพื่อแจ้งว่าข้อมูลต่อเนื่องขยายไปถึงตำแหน่งใดแล้ว.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นแนวนอนแบ่งตารางเป็นสี่สถานการณ์ และเส้นตั้งกลางแบ่ง Event กับ Action. Delayed ACK ใช้เฉพาะกรณีที่ข้อมูลมาตามลำดับและยังไม่มี ACK Pending อีกก้อน. Duplicate ACK ไม่ได้ยืนยันข้อมูลใหม่ แต่ย้ำหมายเลขไบต์ที่ Receiver ยังรอเพื่อบอกว่ามี Gap. Cumulative ACK อาจยืนยันหลาย Segment ใน ACK เดียว.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - In-order Segment แรกอาจถูก Delayed ACK ได้สูงสุดตามค่าที่สไลด์ระบุคือ 500 ms. In-order Segment ที่สองขณะมี ACK Pending ทำให้ส่ง Cumulative ACK ทันที. Out-of-order Segment ทำให้ส่ง Duplicate ACK เพื่อระบุไบต์ที่ขาด.

---

## 📄 Slide 89: TCP Retransmission Scenarios: Lost ACK และ Premature Timeout

*📄 Slide 89*

สไลด์แสดงสองสถานการณ์ โดยเส้นตั้งแต่ละคู่แทน Host A และ Host B และเวลาไหลจากบนลงล่าง. ลูกศรจาก A ไป B คือ Data Segment ส่วนลูกศรย้อนกลับคือ ACK. Lost ACK Scenario ทางซ้าย: A ส่ง Seq=92, 8 bytes of data . เนื่องจากข้อมูลเริ่มที่ไบต์ 92 และยาว 8 ไบต์ B จึงตอบ ACK=100 . ACK นี้สูญหายตรงเครื่องหมาย X ทำให้ A ไม่ได้รับการยืนยันก่อน Timer หมดเวลา. A จึงส่ง Segment เดิม Seq=92 ซ้ำ และ B ส่ง ACK=100 กลับอีกครั้ง. Premature Timeout ทางขวา: A ส่ง Segment แรก Seq=92, 8 bytes และ Segment ที่สอง Seq=100, 20 bytes . B รับแล้วส่ง ACK=100 และ ACK=120. ค่า SendBase ของ A เลื่อนจาก 92 ไป 100 และจาก 100 ไป 120 เมื่อ ACK มาถึง. อย่างไรก็ตาม Timer ของ Segment แรกหมดเวลาก่อนเวลาอันควร ทำให้ A ส่ง Seq=92, 8 bytes ซ้ำ แม้ B จะมีข้อมูลถึงไบต์ 119 แล้ว. B ตรวจว่าเป็นข้อมูลซ้ำ จึงไม่ส่ง ACK=100 ย้อนกลับ แต่ส่ง Cumulative ACK=120 เพื่อยืนยันว่ารับข้อมูลครบต่อเนื่องถึงไบต์ 119 แล้ว.


```
[ TCP Segment Header Format (20 bytes minimum) ]
+------+------+-----+-----+------+-----+------+--------+
| Source Port (16)  | Destination Port (16)             |
+-------------------+-----------------------------------+
| Sequence Number (32 bits)                             |
+-------------------------------------------------------+
| Acknowledgment Number (32 bits)                       |
+------+------+-----+-----+------+-----+------+--------+
|HdrLen| Unused|U|A|P|R|S|F| Receive Window (16 bits)  |
+------+-------+-+-+-+-+-+-+---------------------------+
| Checksum (16) | Urgent Data Pointer (16)              |
+---------------+---------------------------------------+
| Options (variable)          | Padding                 |
+-----------------------------+-------------------------+
| Application Data (Payload)                            |
+-------------------------------------------------------+
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรที่ตัดด้วย X สีแดงด้านซ้ายคือ ACK=100 ที่สูญหาย ไม่ใช่ Data Segment. ลูกศร Data ที่มี Sequence Number เดิมในแต่ละกรณีคือ Retransmission. ป้าย SendBase ทางขวาแสดงไบต์แรกที่ยังไม่ ACK ของ Sender และเลื่อนไปตาม Cumulative ACK. ข้อความสีแดง “send cumulative ACK for 120” เน้นว่า Receiver ตอบสถานะล่าสุด ไม่ย้อนกลับไป ACK เฉพาะ Segment ซ้ำ.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ACK สูญหายอาจทำให้ Sender ส่งข้อมูลที่ Receiver มีอยู่แล้วซ้ำ. Receiver ใช้ Sequence Number ตรวจ Duplicate และไม่ส่ง Data ซ้ำขึ้น Application. Cumulative ACK ช่วยบอกสถานะล่าสุดแม้ได้รับ Segment เก่าซ้ำ.

---

## 📄 Slide 90: TCP Retransmission Scenario: Cumulative ACK ชดเชย ACK ที่สูญหาย

*📄 Slide 90*

สถานการณ์นี้แสดงประโยชน์ของ Cumulative ACK . Host A ส่ง Segment แรก Seq=92, 8 bytes of data และตามด้วย Segment ที่สอง Seq=100, 20 bytes of data . Host B รับ Segment แรกจึงสร้าง ACK=100 แต่ ACK นี้สูญหายตรงเครื่องหมาย X. B ยังได้รับ Segment ที่สองครบต่อเนื่องจากข้อมูลเดิม จึงส่ง ACK=120 . ACK=120 หมายถึง B รับทุกไบต์ก่อน 120 แล้ว ซึ่งครอบคลุมทั้ง Segment ที่เริ่มที่ 92 และ Segment ที่เริ่มที่ 100. เมื่อ A ได้รับ ACK=120 จึงทราบว่า Segment สองก้อนแรกมาถึงแล้ว แม้ไม่เคยได้รับ ACK=100. A ไม่ต้อง Retransmit Segment แรก และสามารถส่ง Segment ถัดไป Seq=120, 15 bytes of data ได้. ตัวอย่างนี้แสดงว่า TCP ACK ไม่จำเป็นต้องมาครบทุกค่า. ACK ที่มีค่ามากกว่าและครอบคลุมข้อมูลอย่างต่อเนื่องสามารถแทน ACK ก่อนหน้าที่สูญหายได้.


> [!DEFINITION] TCP RTT Estimation & Timeout
> $$EstimatedRTT = (1-\alpha) \cdot EstimatedRTT + \alpha \cdot SampleRTT$$
> $$DevRTT = (1-\beta) \cdot DevRTT + \beta \cdot |SampleRTT - EstimatedRTT|$$
> $$TimeoutInterval = EstimatedRTT + 4 \cdot DevRTT$$
> - $\alpha = 0.125$, $\beta = 0.25$ (ค่ามาตรฐาน RFC 6298)
> - SampleRTT: เวลาจริงที่วัดได้ (ผันผวน), EstimatedRTT: ค่าเฉลี่ยแบบ EWMA

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ACK=100 ถูกตัดด้วย X แต่ ACK=120 เดินทางถึง A. ลูกศร Seq=120 เกิดหลัง A ได้รับ ACK=120 และเลื่อน SendBase มาที่ 120. ข้อความด้านล่าง “cumulative ACK covers for earlier lost ACK” สรุปแนวคิดหลักของภาพ. ไม่มี Timeout หรือ Retransmission ในภาพ เพราะ ACK=120 มาถึงก่อน Timer หมดเวลา.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ACK=120 ยืนยันไบต์ทั้งหมดตั้งแต่ก่อนหน้าไปจนถึง 119. Cumulative ACK ลดผลกระทบของ ACK บางก้อนที่สูญหาย. Sender ส่งข้อมูลใหม่ต่อได้เมื่อ ACK ที่สูงกว่ายืนยันข้อมูลครบต่อเนื่อง.

---

## 📄 Slide 91: TCP Fast Retransmit: ส่งซ้ำเร็วเมื่อได้รับ Duplicate ACK สามครั้ง

*📄 Slide 91*

กลไก TCP Fast Retransmit ช่วยให้ Sender ส่ง Segment ที่คาดว่าสูญหายซ้ำได้เร็วขึ้น โดยไม่ต้องรอให้ Timer หมดเวลา. เงื่อนไขในสไลด์คือ Sender ได้รับ ACK เพิ่มอีกสามก้อนที่ยืนยันข้อมูลค่าเดิม หรือที่เรียกว่า Three Duplicate ACKs . อ่านไดอะแกรมจากบนลงล่าง. Host A ส่ง Segment แรก Seq=92 ซึ่งมีข้อมูล 8 ไบต์ไปยัง Host B. เมื่อ B รับครบ จึงตอบ ACK=100 เพื่อบอกว่ารับไบต์ 92–99 แล้วและกำลังรอไบต์ 100. จากนั้น A ส่ง Segment ที่เริ่มด้วย Seq=100 และมีข้อมูล 20 ไบต์ แต่ Segment นี้สูญหายตรงเครื่องหมาย X . หลังจากนั้น Segment ที่มี Sequence Number สูงกว่าเดินทางถึง B หลายก้อน. เนื่องจาก B ยังขาดข้อมูลที่เริ่มที่ Seq=100 จึงไม่สามารถเลื่อน Cumulative ACK ไปข้างหน้าได้ และตอบ ACK=100 ซ้ำทุกครั้ง. ACK เหล่านี้เรียกว่า Duplicate ACKs เพราะยังยืนยันหมายเลขเดิม. เมื่อ A ได้รับ ACK=100 ครั้งแรกและตามด้วย Duplicate ACK=100 อีกสามครั้ง A อนุมานได้ว่า Segment บางก้อนหลัง Seq=100 ไปถึง Receiver แล้ว แต่ Segment ที่มี Sequence Number ต่ำสุดซึ่งยังไม่ได้ ACK น่าจะสูญหาย. A จึง Retransmit Segment Seq=100 ทันทีโดยไม่รอ Timeout. Fast Retransmit เป็นการอนุมานจากหลักฐานของ Receiver: การมี Duplicate ACK สามครั้งแสดงว่ามี Segment ที่มาถึงหลังช่องว่างอย่างน้อยสามก้อน จึงมีโอกาสสูงว่าก้อนที่อยู่ตรงช่องว่างสูญหาย ไม่ใช่เพียงล่าช้าเล็กน้อย.


```
[ TCP Segment Header Format (20 bytes minimum) ]
+------+------+-----+-----+------+-----+------+--------+
| Source Port (16)  | Destination Port (16)             |
+-------------------+-----------------------------------+
| Sequence Number (32 bits)                             |
+-------------------------------------------------------+
| Acknowledgment Number (32 bits)                       |
+------+------+-----+-----+------+-----+------+--------+
|HdrLen| Unused|U|A|P|R|S|F| Receive Window (16 bits)  |
+------+-------+-+-+-+-+-+-+---------------------------+
| Checksum (16) | Urgent Data Pointer (16)              |
+---------------+---------------------------------------+
| Options (variable)          | Padding                 |
+-----------------------------+-------------------------+
| Application Data (Payload)                            |
+-------------------------------------------------------+
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นตั้งแทนเวลาของ Host A และ Host B โดยเวลาไหลจากบนลงล่าง. เครื่องหมาย X อยู่บน Segment Seq=100 จึงหมายถึง Data Segment สูญหาย ไม่ใช่ ACK สูญหาย. ลูกศร ACK=100 หลายเส้นย้อนกลับมาที่ A แสดง Cumulative ACK ที่ไม่สามารถเลื่อนไปเกินช่องว่างได้. ลูกศรล่างสุด Seq=100, 20 bytes คือ Fast Retransmission ซึ่งเกิดก่อนเส้น Timeout ที่แสดงไว้ด้านซ้าย.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ACK เดิมหนึ่งครั้งตามด้วย Duplicate ACK เดิมอีกสามครั้ง เป็นสัญญาณให้ทำ Fast Retransmit. Sender ส่งซ้ำ Segment ที่มี Sequence Number ต่ำสุดซึ่งยังไม่ได้รับ ACK. Fast Retransmit ลดเวลารอเมื่อเทียบกับการรอ Timeout.

---

## 📄 Slide 92: Chapter 3 Roadmap: เข้าสู่ Flow Control และ Connection Management

*📄 Slide 92*

สไลด์ Roadmap แสดงตำแหน่งของเนื้อหาปัจจุบันในบท Transport Layer. หัวข้อก่อนหน้านี้ ได้แก่ Transport-Layer Services, Multiplexing/Demultiplexing, UDP และ Principles of Reliable Data Transfer ถูกทำให้จางลงเพื่อแสดงว่าได้ศึกษาแล้ว. หัวข้อหลักที่กำลังศึกษาอยู่คือ Connection-Oriented Transport: TCP . ภายใต้ TCP สไลด์ทำให้ Flow Control และ Connection Management เด่นขึ้น ขณะที่ Segment Structure และ Reliable Data Transfer เป็นเนื้อหาที่ผ่านมาแล้ว. Flow Control ศึกษาวิธีที่ Receiver จำกัดอัตราหรือปริมาณข้อมูลจาก Sender เพื่อไม่ให้ Receive Buffer ล้น. Connection Management ศึกษาวิธีสร้างและจัดการ State ของ TCP Connection ก่อนเริ่มแลกเปลี่ยนข้อมูล. หลังจบ TCP ส่วนนี้ บทเรียนจะต่อด้วย Principles of Congestion Control และ TCP Congestion Control. Flow Control กับ Congestion Control มีเป้าหมายต่างกัน: Flow Control ปกป้อง Receiver ส่วน Congestion Control ลดภาระของเครือข่าย.


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รายการสีเข้มคือหัวข้อปัจจุบัน ส่วนรายการสีเทาคือหัวข้อก่อนหน้าหรือหัวข้อที่จะเรียนต่อ. ภาพสะพานด้านขวาเป็นภาพประกอบ Roadmap ไม่ได้แทนกลไกเครือข่ายโดยตรง. หัวข้อย่อย Flow Control และ Connection Management อยู่ใต้ TCP จึงเป็นความสามารถของ TCP ไม่ใช่ UDP.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ชุดสไลด์ถัดไปเปลี่ยนจาก Reliability ไปสู่ Flow Control และ Connection Management. Flow Control ป้องกัน Receive Buffer ล้น. Connection Management ใช้สร้าง State และตกลงค่าที่จำเป็นก่อนส่งข้อมูล.

---

## 📄 Slide 93: TCP Flow Control: เหตุใด Receiver จึงต้องมีการควบคุมการไหล

*📄 Slide 93*

คำถามหลักของสไลด์คือ: จะเกิดอะไรขึ้นเมื่อ Network Layer ส่งข้อมูลขึ้นมาถึง Receiver เร็วกว่าที่ Application Layer อ่านข้อมูลออกจาก Socket Buffer? หากสถานการณ์นี้ดำเนินต่อไป ข้อมูลจะสะสมใน Buffer และอาจทำให้พื้นที่รับข้อมูลเต็ม. ไดอะแกรมด้านขวาแสดง Receiver Protocol Stack . ข้อมูลจาก Sender เข้าทางด้านล่าง ผ่าน IP Code ขึ้นสู่ TCP Code. TCP ถอด Payload ออกจาก Segment แล้ววางข้อมูลไว้ใน TCP Socket Receiver Buffer . จากนั้น Application Process อ่านข้อมูลออกจาก Buffer ผ่าน Socket API. ลูกศรใหญ่สีแดงด้านขวาแสดงการไหลของข้อมูลจาก Network ขึ้นสู่ Application. ลูกศรและป้ายด้านซ้ายของ Stack แยกสองกิจกรรมสำคัญ: Network Layer เติมข้อมูลเข้า Buffer ขณะที่ Application นำข้อมูลออกจาก Buffer. ถ้าอัตราที่เติมข้อมูลเข้า Buffer สูงกว่าอัตราที่ Application อ่านออกเป็นเวลานาน ปริมาณข้อมูลสะสมจะเพิ่มขึ้น. TCP จึงต้องมีกลไก Flow Control เพื่อให้ Receiver แจ้ง Sender ว่ายังรับข้อมูลเพิ่มได้มากเพียงใด.


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> แถบสีน้ำเงิน TCP Socket Receiver Buffer อยู่ระหว่าง Application Process กับ TCP Code. ลูกศรจากด้านล่างคือข้อมูลที่เข้าจาก Sender ผ่าน Network Layer. ลูกศรสั้นด้านบนคือ Application อ่านข้อมูลออกจาก Socket Buffer. จุดประสงค์ของภาพคือเปรียบเทียบอัตราเข้า Buffer กับอัตราออกจาก Buffer ไม่ใช่แสดง Packet Routing.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - TCP รับข้อมูลจาก Network แล้วพักไว้ใน Receive Buffer ก่อน Application อ่าน. ปัญหาเกิดเมื่อ Data Arrival Rate มากกว่า Application Read Rate. Flow Control ทำให้ Sender ปรับการส่งตามพื้นที่ว่างของ Receiver.

---

## 📄 Slide 94: TCP Flow Control: ภาพเปรียบเทียบ “รับข้อมูลมากเกินกว่าจะประมวลผล”

*📄 Slide 94*

สไลด์นี้คงคำถามและ Protocol Stack จากสไลด์ก่อนหน้า แต่เพิ่มภาพเปรียบเทียบเพื่อช่วยให้เข้าใจสถานการณ์ที่ข้อมูลเข้ามาเร็วหรือมากเกินกว่าผู้รับจะจัดการได้. ภาพคนพยายามดื่มน้ำจากสายยางและภาพสัตว์ที่ถูกน้ำพุ่งใส่ สื่อถึงแนวคิดว่า “ผู้รับไม่สามารถรับทุกสิ่งที่ถูกส่งมาอย่างรวดเร็วได้”. ในบริบท TCP ผู้รับคือ Application และ Receive Buffer ส่วนกระแสน้ำเปรียบกับข้อมูลที่ Sender ส่งเข้ามา. อย่างไรก็ตาม Buffer สามารถช่วยพักข้อมูลได้เพียงชั่วคราวและมีขนาดจำกัด. หาก Sender ยังคงส่งเร็วโดยไม่สนใจความสามารถของ Receiver, Buffer จะเต็มและข้อมูลใหม่อาจไม่มีพื้นที่จัดเก็บ. ภาพด้านขวายังคงแสดงเส้นทางจริงของข้อมูล: IP ส่ง Segment Payload ขึ้นให้ TCP, TCP เก็บไว้ใน Socket Receiver Buffer และ Application อ่านออก. ภาพตัวอย่างด้านซ้ายเป็นเพียงอุปมา ส่วนกลไกจริงจะใช้ค่า Receive Window ใน TCP Header.


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพสายยางเป็น Visual Analogy ไม่ใช่ส่วนหนึ่งของ TCP Protocol. Protocol Stack ด้านขวาเป็นภาพทางเทคนิคที่แสดง Buffer อยู่ระหว่าง TCP กับ Application. เมื่อน้ำหรือข้อมูลเข้าเร็วกว่าความสามารถในการรับ จะเกิดการสะสมและเสี่ยงล้น.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Receiver มีขีดจำกัดทั้งด้าน Buffer และอัตราที่ Application อ่านข้อมูล. Buffer ช่วยรองรับความเร็วที่ไม่เท่ากันได้ชั่วคราว แต่ไม่ใช่พื้นที่ไม่จำกัด. TCP ต้องให้ Receiver สื่อสารขีดความสามารถกลับไปยัง Sender.

---

## 📄 Slide 95: Receive Window: ฟิลด์ที่บอกจำนวนไบต์ที่ Receiver ยังรับได้

*📄 Slide 95*

สไลด์นี้เชื่อมปัญหา Buffer กับฟิลด์ใน TCP Header ที่เรียกว่า Receive Window หรือมักเขียนย่อว่า rwnd . ฟิลด์นี้ระบุจำนวนไบต์ที่ Receiver ยินดีรับเพิ่มในขณะนั้น. ภาพ TCP Segment Format ด้านซ้ายเน้นตำแหน่งฟิลด์ Receive Window ใน Header. ค่าในฟิลด์ไม่ได้บอกขนาด Segment และไม่ได้บอก Bandwidth ของเครือข่าย แต่บอก พื้นที่รับข้อมูลที่ Receiver ประกาศให้ Sender ทราบ . ภาพ Protocol Stack ด้านขวายังคงแสดงว่า Network ส่งข้อมูลเข้า Receiver Buffer และ Application อ่านข้อมูลออก. เมื่อ Application อ่านออกมากขึ้น พื้นที่ว่างเพิ่ม ค่า rwnd สามารถเพิ่มได้. เมื่อข้อมูลสะสมมากขึ้น พื้นที่ว่างลด ค่า rwnd จึงลดลง. Sender ต้องตรวจค่า rwnd ที่ได้รับจาก TCP Segment ของ Receiver แล้วจำกัดข้อมูลที่ยังไม่ได้รับ ACK หรือ In-Flight Data ไม่ให้เกินค่าที่ Receiver ประกาศ.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรจากคำว่า Receive Window ชี้ไปยังฟิลด์เฉพาะใน TCP Header. คำอธิบาย “# bytes receiver willing to accept” คือความหมายของค่าฟิลด์นี้. ภาพ Stack แสดงเหตุผลที่ rwnd เปลี่ยนได้ตามการเติมและการนำข้อมูลออกจาก Buffer.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - rwnd คือจำนวนไบต์ที่ Receiver ประกาศว่ายังรับเพิ่มได้. rwnd เปลี่ยนตามพื้นที่ว่างใน Receive Buffer. Sender ใช้ rwnd จำกัดปริมาณข้อมูล In-Flight.

---

## 📄 Slide 96: Flow Control: Receiver ควบคุม Sender เพื่อไม่ให้ Buffer ล้น

*📄 Slide 96*

Flow Control คือกลไกที่ Receiver ใช้ควบคุม Sender เพื่อไม่ให้ Sender ส่งข้อมูลมากเกินไปหรือเร็วเกินไปจน Receive Buffer ล้น. ดังนั้นฝ่ายที่กำหนดขีดจำกัดคือ Receiver แม้ฝ่ายที่ส่ง Data คือ Sender. Receiver ไม่ได้สั่งความเร็วเป็นจำนวนบิตต่อวินาทีโดยตรง แต่ประกาศจำนวนไบต์ที่ยังรับได้ผ่าน Receive Window. Sender จึงควบคุมปริมาณข้อมูลที่ยังค้างอยู่ในเครือข่ายและยังไม่ได้ ACK ให้สอดคล้องกับพื้นที่ว่างนั้น. เมื่อ Application อ่านข้อมูลออกช้า Buffer จะว่างน้อยลงและ Receiver ประกาศ Window ที่เล็กลง ทำให้ Sender ต้องลดข้อมูลที่ส่งค้างไว้. เมื่อ Application อ่านได้เร็วและ Buffer ว่างมากขึ้น Receiver สามารถประกาศ Window ที่ใหญ่ขึ้น. Flow Control ต่างจาก Error Control: Flow Control ป้องกันการล้นของ Buffer ส่วน Error Control ตรวจ Loss/Corruption และทำ Retransmission. นอกจากนี้ยังต่างจาก Congestion Control ซึ่งมุ่งป้องกัน Router และเครือข่ายจากภาระมากเกินไป.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กรอบสีแดงด้านซ้ายสรุปหลักการว่า Receiver Controls Sender. ภาพ Stack ด้านขวาแสดง Receive Buffer ซึ่งเป็นทรัพยากรที่ Flow Control ต้องปกป้อง. ลูกศรข้อมูลยังไหลจาก Sender ขึ้นสู่ Application แต่ปริมาณข้อมูลถูกจำกัดจาก Feedback ของ Receiver.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Flow Control มีเป้าหมายหลักคือไม่ให้ Receive Buffer Overflow. Receiver แจ้งขีดจำกัด ส่วน Sender ต้องปฏิบัติตาม. Flow Control ไม่ใช่ Congestion Control และไม่ใช่ Retransmission Mechanism.

---

## 📄 Slide 97: TCP Flow Control: ความสัมพันธ์ระหว่าง RcvBuffer, Buffered Data และ rwnd

*📄 Slide 97*

TCP Receiver ประกาศพื้นที่ว่างของ Buffer ผ่านฟิลด์ rwnd ใน TCP Header. สไลด์ใช้คำว่า Receiver “Advertises” หมายถึงส่งค่าพื้นที่ว่างนี้กลับไปให้ Sender ทราบใน Segment ที่ Receiver ส่ง. RcvBuffer คือขนาดรวมของ Receive Buffer. สไลด์ยกค่าปริยายทั่วไป 4096 ไบต์และระบุว่าสามารถกำหนดผ่าน Socket Options ได้ แต่หลายระบบปฏิบัติการสามารถปรับขนาด Buffer อัตโนมัติ. ค่าจริงจึงขึ้นกับระบบและการตั้งค่า. ภาพด้านขวาแบ่ง Buffer เป็นสองส่วน: Buffered Data คือข้อมูลที่รับมาแล้วแต่ Application ยังอ่านไม่หมด และ Free Buffer Space คือพื้นที่ว่าง. วงเล็บ rwnd ครอบเฉพาะพื้นที่ว่าง ส่วนวงเล็บ RcvBuffer ครอบทั้ง Buffer. TCP Segment Payloads เข้ามาทางด้านล่างและเพิ่ม Buffered Data. Application อ่านข้อมูลออกทางด้านบนและทำให้พื้นที่ว่างเพิ่มขึ้น. ด้วยเหตุนี้ค่า rwnd จึงเปลี่ยนตามเวลา. Sender ต้องจำกัดข้อมูลที่ยังไม่ได้ ACK หรือ In-Flight ให้ไม่เกิน rwnd ล่าสุดที่ได้รับ. หากทำตามข้อจำกัดนี้ Receive Buffer จะไม่ Overflow จากข้อมูลที่ Sender ส่ง.


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> RcvBuffer = Buffered Data + Free Buffer Space ในภาพเชิงแนวคิด. rwnd แทน Free Buffer Space ไม่ใช่ขนาด Buffer ทั้งหมด. ลูกศรล่างคือ Payload เข้า Buffer ส่วนลูกศรบนคือข้อมูลถูกส่งให้ Application. เมื่อ Buffered Data เพิ่ม rwnd ลด; เมื่อ Application อ่านข้อมูล rwnd เพิ่ม.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - RcvBuffer คือความจุรวม ส่วน rwnd คือพื้นที่ว่างที่ประกาศในขณะนั้น. Sender จำกัด In-Flight Data ตาม rwnd. ค่า rwnd เป็นค่า Dynamic ซึ่งเปลี่ยนตามการใช้งาน Buffer.

---

## 📄 Slide 98: rwnd ใน TCP Segment Header: การส่งข้อมูล Flow-Control Feedback กลับไปยัง Sender

*📄 Slide 98*

สไลด์นี้แสดงข้อความหลักเหมือนสไลด์ก่อนหน้า แต่เปลี่ยนภาพด้านขวาเป็นรูปแบบ TCP Segment เพื่อเน้นว่า Receiver ส่งค่าพื้นที่ว่างกลับไปยัง Senderผ่าน Receive Window Field ใน TCP Header. เมื่อ Receiver สร้าง TCP Segment เช่น ACK Segment จะใส่ค่า rwnd ปัจจุบันใน Header. Sender จึงได้รับทั้งข้อมูลการยืนยันด้วย Acknowledgment Number และข้อมูล Flow Control ด้วย Receive Window ใน Segment เดียวกันได้. Sender จำกัดจำนวนไบต์ที่ส่งแล้วแต่ยังไม่ได้ ACK ให้ไม่เกิน rwnd ที่ Receiver ประกาศ. แนวคิดนี้พิจารณาปริมาณข้อมูล ไม่ได้กำหนดว่าต้องส่งทีละกี่ Segment เพราะแต่ละ Segment อาจมี Payload ขนาดต่างกัน. ค่า rwnd ทำให้ Feedback ของ Receiver เดินทางอยู่ใน Protocol โดยไม่ต้องสร้าง Message ชนิดใหม่เฉพาะสำหรับ Flow Control. เมื่อ Buffer ว่างเปลี่ยน Receiver จะโฆษณาค่าใหม่ใน TCP Segment ถัดไป.


```
[ Encapsulation Process (การห่อหุ้มข้อมูลลงทีละชั้น) ]
Application : [ Message (M) ]
Transport   : [ Ht | Message (M) ]           ← Segment
Network     : [ Hn | Ht | Message (M) ]      ← Datagram
Link        : [ Hl | Hn | Ht | Message (M) ] ← Frame
Physical    : [ 01101001... ]                 ← Bits
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรด้านขวาบนชี้ไปที่ Receive Window Field ใน TCP Segment Format. คำว่า “# bytes receiver willing to accept” ยืนยันว่าหน่วยเชิงแนวคิดคือจำนวนไบต์. รายการด้านซ้ายอธิบายที่มาของค่า RcvBuffer และข้อจำกัดที่ Sender ต้องรักษา.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - rwnd ถูกส่งเป็นฟิลด์หนึ่งใน TCP Header. ACK และค่า Receive Window สามารถอยู่ใน Segment เดียวกัน. การจำกัดใช้จำนวนไบต์ In-Flight ไม่ใช่เพียงจำนวน Segment.

---

## 📄 Slide 99: TCP Connection Management: สร้าง Shared State ก่อนแลกเปลี่ยนข้อมูล

*📄 Slide 99*

TCP เป็น Connection-Oriented Protocol. ก่อนแลกเปลี่ยน Application Data, Sender และ Receiver ต้องทำ Handshake เพื่อยืนยันว่าทั้งสองฝ่ายต้องการสร้าง Connection และตกลงค่าพารามิเตอร์ที่จำเป็น. สิ่งแรกที่ต้องตกลงคือการยอมรับ Connection: แต่ละฝ่ายต้องทราบว่าอีกฝ่ายพร้อมสื่อสาร. สิ่งที่สองคือ Connection Parameters เช่น Initial Sequence Numbers ของข้อมูลแต่ละทิศทาง และข้อมูลเกี่ยวกับ Receive Buffer หรือ Receive Window. ไดอะแกรมแสดง Client ทางซ้ายและ Server ทางขวา. หลัง Handshake ทั้งสองฝั่งมี Connection State: ESTAB หรือ Established และเก็บ Connection Variables ที่สอดคล้องกัน เช่น Sequence Number สำหรับ Client-to-Server, Server-to-Client และขนาด Receive Buffer ของแต่ละฝ่าย. โค้ดด้าน Client แสดงแนวคิดการสร้าง Socket ไปยัง Hostname และ Port Number. ด้าน Server ใช้ welcomeSocket.accept() เพื่อยอมรับคำขอและสร้าง connectionSocket สำหรับ Connection นั้น. โค้ดในสไลด์เป็นการสื่อแนวคิดของ Socket API ไม่ใช่ข้อกำหนดไวยากรณ์เดียวสำหรับทุกภาษา. Handshake ไม่ได้สร้างสายทางกายภาพระหว่างเครื่อง แต่สร้าง Logical Connection และ State ที่ Endpoint ทั้งสองฝั่ง. Router ระหว่างทางไม่จำเป็นต้องเก็บ TCP Connection State แบบเดียวกับ End Systems.


```
[ TCP Socket Programming Flow ]
       Server                          Client
  ┌─────────────┐                ┌──────────────┐
  │ socket()    │                │ socket()     │
  │ bind()      │                │              │
  │ listen()    │                │              │
  │ accept()    │<── TCP SYN ───│ connect()    │
  │  (block)    │── SYN-ACK ──> │              │
  │             │<── ACK ───────│              │
  │ read()      │<── Data ──────│ write()      │
  │ write()     │── Data ──────>│ read()       │
  │ close()     │               │ close()      │
  └─────────────┘               └──────────────┘
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กล่องสองฝั่งแสดง Connection State และ Variables ที่ต้องถูกตั้งค่าที่ Client และ Server. คำว่า ESTAB หมายถึง State Established หลังการสร้าง Connection สำเร็จ. ลูกศรสีเหลืองจาก Application ลงมายัง State สื่อว่าการเรียก Socket API ทำให้ TCP เริ่ม Connection Management. เครื่อง Client และ Server เชื่อมกันผ่าน Network แต่ TCP State อยู่ที่ Endpoints.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Handshake ทำให้ทั้งสองฝ่ายยืนยันความพร้อมและสร้าง Shared State. TCP มี Sequence Number แยกสำหรับสองทิศทาง. Established Connection เป็น Logical State ที่ End Systems ไม่ใช่วงจรทางกายภาพ.

---

## 📄 Slide 100: Two-Way Handshake: แนวคิดเบื้องต้นและเหตุผลที่อาจไม่เพียงพอ

*📄 Slide 100*

ด้านซ้ายบนใช้บทสนทนาของคนเป็นตัวอย่าง Two-Way Handshake : ฝ่ายหนึ่งพูด “Let’s talk” และอีกฝ่ายตอบ “OK”. เมื่อทั้งสองรับข้อความตามลำดับ ทั้งคู่จึงเข้าสู่ State ESTAB . ด้านซ้ายล่างแปลงแนวคิดเป็น Network Protocol. Client เลือกค่าเริ่มต้น x เช่น Initial Sequence Number แล้วส่ง req_conn(x) ไปยัง Server. Server ตอบ acc_conn(x) เพื่อยอมรับคำขอ จากนั้นทั้งสองฝั่งถือว่า Connection Established. คำถามสำคัญคือ Two-Way Handshake จะทำงานถูกต้องเสมอในเครือข่ายจริงหรือไม่. สไลด์ระบุปัจจัยที่ทำให้ปัญหาซับซ้อน ได้แก่ Variable Delays , การส่ง Message ซ้ำเมื่อเกิด Loss, Message Reordering และข้อเท็จจริงที่แต่ละฝ่ายไม่สามารถมองเห็น State ของอีกฝ่ายได้โดยตรง. ตัวอย่างเช่น Request เก่าที่ล่าช้าอาจมาถึงหลังจาก Connection เดิมสิ้นสุด หรือ Request อาจถูก Retransmit แล้วสำเนาหลายก้อนเดินทางมาถึงในเวลาต่างกัน. หากมีเพียงสอง Message ฝ่ายหนึ่งอาจเข้าใจว่า Connection ใหม่ถูกสร้าง ทั้งที่อีกฝ่ายไม่ได้อยู่ใน State เดียวกัน. สไลด์นี้ยังไม่ได้แสดงคำตอบสุดท้าย แต่ตั้งปัญหาเพื่อเตรียมเข้าสู่เหตุผลที่ TCP ใช้ Three-Way Handshake . Message เพิ่มอีกหนึ่งขั้นช่วยให้ทั้งสองฝ่ายยืนยันข้อมูลเริ่มต้นและรับรู้สถานะของกันและกันได้ชัดเจนขึ้น.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ไดอะแกรมบนเป็น Human Analogy: Request หนึ่งครั้งและ Response หนึ่งครั้ง. ไดอะแกรมล่างเป็น Protocol Version โดย req_conn(x) นำค่า x ไปให้ Server และ acc_conn(x) ตอบกลับ. คำว่า ESTAB อยู่สองฝั่งเพื่อสื่อว่าแต่ละ Endpoint มี State ของตนเอง. รายการด้านขวาอธิบายลักษณะของเครือข่ายที่อาจทำให้ Two-Way Handshake คลุมเครือ.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Two-Way Handshake มี Request และ Acceptance เพียงสอง Message. Delay, Retransmission และ Reordering อาจทำให้ Message เก่าหรือซ้ำสร้างความเข้าใจไม่ตรงกัน. ข้อจำกัดนี้นำไปสู่การใช้ TCP Three-Way Handshake ในสไลด์ถัดไป.

---

## 📄 Slide 101: Two-Way Handshake: กรณีปกติที่การเชื่อมต่อทำงานได้

*📄 Slide 101*

สไลด์นี้เริ่มจากกรณีที่ Two-Way Handshake ทำงานได้ตามที่คาดไว้ เพื่อใช้เป็นจุดเปรียบเทียบกับกรณีผิดปกติในสไลด์ถัดไป. เส้นตั้งด้านซ้ายแทน Client และเส้นตั้งด้านขวาแทน Server โดยเวลาไหลจากบนลงล่าง. Client เลือกค่าเริ่มต้น x แล้วส่งข้อความ req_conn(x) ไปยัง Server. เมื่อ Server รับคำขอ Server เข้าสู่สถานะ ESTAB และส่ง acc_conn(x) กลับมาเพื่อยอมรับ Connection และยืนยันค่าที่เกี่ยวข้องกับ x . เมื่อ Client รับข้อความตอบกลับ Client จึงเข้าสู่สถานะ ESTAB เช่นกัน. หลังจากสร้าง Connection แล้ว Client ส่ง data(x+1) . การเริ่มข้อมูลที่ x+1 แสดงแนวคิดว่าเลข x ถูกใช้กับข้อความเริ่มต้น Connection แล้ว ข้อมูลถัดไปจึงใช้หมายเลขต่อจากนั้น. Server รับและส่งข้อมูลขึ้นไปให้ Application จากนั้นตอบ ACK(x+1) กลับไป. ข้อความ connection x completes ในภาพหมายถึงการแลกเปลี่ยนที่เกี่ยวข้องกับ Connection หมายเลขเริ่มต้น x จบลงโดยทั้งสองฝ่ายมี State สอดคล้องกัน. ในกรณีนี้ไม่มีข้อความเก่า ข้อความซ้ำ หรือความล่าช้าผิดปกติมารบกวน จึงระบุว่า “No problem!”. อย่างไรก็ตาม ความสำเร็จของกรณีนี้ไม่ได้พิสูจน์ว่า Two-Way Handshake ปลอดภัยในทุกสถานการณ์ เพราะเครือข่ายจริงอาจทำให้ข้อความล่าช้า สูญหาย หรือถูกส่งซ้ำได้.


```
[ TCP 3-Way Handshake ]
Client                          Server
  │── SYN (seq=x) ────────────────>│   Step 1: Client ส่ง SYN
  │                                │
  │<── SYN-ACK (seq=y, ack=x+1) ──│   Step 2: Server ตอบ SYN-ACK
  │                                │
  │── ACK (seq=x+1, ack=y+1) ────>│   Step 3: Client ส่ง ACK → เชื่อมต่อสำเร็จ!
  │                                │
  │══════════ Data Transfer ══════>│
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นตั้งสองเส้นคือ Timeline ของ Client และ Server; อ่านเหตุการณ์จากบนลงล่าง. ลูกศร req_conn(x) คือคำขอสร้าง Connection ส่วน acc_conn(x) คือการยอมรับคำขอ. จุดสีแดงและคำว่า ESTAB แสดงเวลาที่แต่ละ Endpoint เชื่อว่าการเชื่อมต่อถูกสร้างแล้ว. ลูกศร data(x+1) และ ACK(x+1) แสดงการแลกเปลี่ยนข้อมูลหลัง Connection ถูกสร้าง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Two-Way Handshake ใช้ Request หนึ่งข้อความและ Acceptance หนึ่งข้อความ. แต่ละ Endpoint มี Connection State ของตนเองและต้องเข้าสู่ ESTAB ให้สอดคล้องกัน. กรณีปกติทำงานได้ แต่ยังไม่รองรับปัญหาจากข้อความเก่าหรือข้อความซ้ำอย่างปลอดภัย.

---

## 📄 Slide 102: Two-Way Handshake: Half-Open Connection จากคำขอเก่าที่ล่าช้า

*📄 Slide 102*

สไลด์นี้แสดงปัญหา Half-Open Connection ซึ่งเกิดเมื่อ Server เชื่อว่า Connection ยังเปิดอยู่ แต่ Client ไม่มี Connection นั้นแล้ว. สาเหตุในภาพคือสำเนาของ req_conn(x) ที่ถูก Retransmit เดินทางล่าช้าและมาถึงหลัง Connection เดิมสิ้นสุด. ช่วงแรก Client เลือก x และส่ง req_conn(x) . Server รับคำขอ เข้าสู่ ESTAB และตอบ acc_conn(x) . เนื่องจาก Client ยังไม่ได้รับคำตอบทันเวลา Client จึง Retransmit req_conn(x) . ต่อมา Client ได้รับคำตอบและเข้าสู่ ESTAB ทำให้ Connection เดิมสามารถดำเนินต่อได้. เส้นประสีแดงแสดงเวลาที่ Connection เดิมสิ้นสุด: Client ยุติ Connection และ Server ลบ State หรือ forgets x . แต่สำเนา req_conn(x) ที่เคยส่งซ้ำยังค้างอยู่ในเครือข่ายและเดินทางมาถึง Server หลังจากนั้น. เมื่อ Server รับคำขอเก่านี้ Server ไม่สามารถมองเห็นได้ว่า Client ได้ยุติไปแล้ว. หากใช้ Two-Way Handshake อย่างง่าย Server อาจตีความว่าเป็นคำขอสร้าง Connection ใหม่และเข้าสู่ ESTAB ทันที ทั้งที่ไม่มี Client รอรับการตอบกลับ จึงเกิด Connection ที่เปิดอยู่เพียงฝั่งเดียว. สาระสำคัญคือ ข้อความเก่าที่ถูก Delay หรือ Duplicate อาจถูกเข้าใจว่าเป็นข้อความใหม่ . การมีเพียง Request และ Response ยังไม่ทำให้ Server ได้รับหลักฐานสุดท้ายว่า Client ปัจจุบันยังมีชีวิตและยอมรับ Connection นี้จริง.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรโค้งยาวคือสำเนา req_conn(x) ที่ถูก Retransmit แล้วล่าช้าอยู่ในเครือข่าย. เส้นประแดงคือขอบเขตหลัง Connection เดิมจบลงและทั้งสองฝ่ายลบ State เดิม. จุด ESTAB ด้านล่างมีเฉพาะ Server จึงเป็น Half-Open Connection. ข้อความ “no client” ย้ำว่าไม่มี Client Endpoint ที่ถือ State ตรงกับ Server.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Half-Open Connection คือมี Connection State อยู่เพียงฝั่งเดียว. Delayed Duplicate Request อาจหลอก Server ให้เปิด Connection ที่ Client ไม่ได้ต้องการ. Two-Way Handshake ไม่ได้ให้ Server ยืนยันครั้งสุดท้ายว่า Client ได้รับ Acceptance แล้ว.

---

## 📄 Slide 103: Two-Way Handshake: ข้อมูลซ้ำจาก Connection เก่าถูกยอมรับ

*📄 Slide 103*

สไลด์นี้ขยายปัญหาจากสไลด์ก่อนหน้า โดยแสดงว่าไม่เพียง Connection เก่าจะถูกเปิดขึ้นมาใหม่เท่านั้น แต่ Data Message เก่าที่ล่าช้า อาจถูก Server ยอมรับเป็นข้อมูลของ Connection ใหม่ด้วย. เหตุการณ์สีจางด้านบนคือ Connection เดิม: Client ส่ง req_conn(x) , Server ตอบรับ และ Client ส่ง data(x+1) . ต่อมา Client Retransmit ทั้งคำขอหรือข้อมูลบางก้อน ขณะที่สำเนาบางก้อนล่าช้าอยู่ในเครือข่าย. หลัง Connection เดิมสิ้นสุด Client ยุติ State และ Server ลืมค่า x . เมื่อสำเนาเก่าของ req_conn(x) มาถึง Server ภายหลัง Server เปิด Connection ใหม่และเข้าสู่ ESTAB แม้ Client ไม่ได้สร้าง Connection ใหม่. จากนั้นสำเนาเก่าของ data(x+1) เดินทางมาถึง. เนื่องจาก Sequence Number ดูสอดคล้องกับ Connection ที่เพิ่งเปิด Server จึงส่งข้อมูลขึ้นให้ Application และ accept data(x+1) . ผลคือ Application ได้รับข้อมูลซ้ำ ทั้งที่ข้อมูลนั้นเคยเป็นของ Connection เก่า. ปัญหานี้อันตรายกว่าการเก็บ State เกินจำเป็น เพราะอาจทำให้คำสั่งหรือ Transaction เดิมถูกประมวลผลอีกครั้ง. Receiver ไม่สามารถทราบจากข้อความสองขั้นตอนเพียงอย่างเดียวว่าคำขอและข้อมูลที่มาถึงเป็นของการสนทนาปัจจุบันหรือเป็นสำเนาเก่าที่หลงเหลืออยู่. จึงต้องมีขั้นตอนยืนยันเพิ่มเติมและใช้หมายเลขเริ่มต้นที่ทั้งสองฝ่ายตกลงกันอย่างชัดเจน.


```
[ TCP 3-Way Handshake ]
Client                          Server
  │── SYN (seq=x) ────────────────>│   Step 1: Client ส่ง SYN
  │                                │
  │<── SYN-ACK (seq=y, ack=x+1) ──│   Step 2: Server ตอบ SYN-ACK
  │                                │
  │── ACK (seq=x+1, ack=y+1) ────>│   Step 3: Client ส่ง ACK → เชื่อมต่อสำเร็จ!
  │                                │
  │══════════ Data Transfer ══════>│
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ส่วนสีจางคือเหตุการณ์ของ Connection เดิม ส่วนสีน้ำเงินเข้มด้านล่างคือข้อความเก่าที่มาถึงในภายหลัง. Server เข้าสู่ ESTAB จาก req_conn(x) เก่าหลังลบ State เดิมแล้ว. ลูกศร data(x+1) ด้านล่างคือ Duplicate Data แต่ Server ตีความว่าเป็นข้อมูลใหม่. เครื่องหมายกากบาทและข้อความ “dup data accepted!” แสดงผลผิดพลาดที่ Application ได้ข้อมูลซ้ำ.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ข้อความเก่าทั้ง Connection Request และ Data อาจล่าช้าข้ามอายุของ Connection. การเปิด Connection จาก Request เก่าอาจทำให้ Duplicate Data ถูกยอมรับ. ปัญหานี้เป็นเหตุผลสำคัญที่ต้องใช้ Three-Way Handshake แทน Two-Way Handshake อย่างง่าย.

---

## 📄 Slide 104: TCP Three-Way Handshake: SYN, SYN-ACK และ ACK

*📄 Slide 104*

TCP แก้ปัญหาการสร้าง Connection ด้วย Three-Way Handshake ซึ่งประกอบด้วย TCP Segment สามข้อความ: SYN จาก Client, SYN-ACK จาก Server และ ACK จาก Client. ขั้นตอนที่สามทำให้ Server ได้หลักฐานว่า Client ได้รับคำตอบของ Server และยังคงต้องการ Connection นี้. เริ่มต้น Client และ Server สร้าง TCP Socket. ในภาพ Server อยู่ในสถานะ LISTEN และรอที่ accept() . เมื่อ Application ฝั่ง Client เรียก connect() , Client เลือก Initial Sequence Number x แล้วส่ง Segment ที่มี SYNbit=1, Seq=x . หลังส่ง Client เข้าสู่สถานะ SYN-SENT . Server รับ SYN แล้วเลือก Initial Sequence Number ของตนเองคือ y . Server ตอบด้วย SYN-ACK ที่มี SYNbit=1, Seq=y และ ACKbit=1, ACKnum=x+1 . ค่า x+1 ยืนยัน SYN ของ Client และ Server เข้าสู่สถานะ SYN-RCVD ไม่ใช่ ESTAB ทันที. เมื่อ Client รับ SYN-ACK Client ทราบว่า Server มีชีวิต รับ SYN ของ Client แล้ว และเสนอ Sequence Number y . Client จึงเข้าสู่ ESTAB และส่ง ACK ที่มี ACKbit=1, ACKnum=y+1 กลับไป. สไลด์ระบุว่า Segment ACK ขั้นที่สามนี้อาจบรรจุ Client-to-Server Data ได้ด้วย. เมื่อ Server รับ ACK ขั้นที่สาม Server จึงยืนยันได้ว่า Client ได้รับ SYN-ACK และยังมีชีวิตอยู่ จากนั้น Server เข้าสู่ ESTAB และการรอใน accept() สามารถสิ้นสุดด้วย Connection Socket สำหรับ Client รายนี้. ทั้งสองฝ่ายเลือก Initial Sequence Number ของตนเองแยกกัน เพราะ TCP เป็น Full-Duplex: ทิศ Client-to-Server และ Server-to-Client มี Sequence Number Space ของตนเอง.


```
[ TCP Socket Programming Flow ]
       Server                          Client
  ┌─────────────┐                ┌──────────────┐
  │ socket()    │                │ socket()     │
  │ bind()      │                │              │
  │ listen()    │                │              │
  │ accept()    │<── TCP SYN ───│ connect()    │
  │  (block)    │── SYN-ACK ──> │              │
  │             │<── ACK ───────│              │
  │ read()      │<── Data ──────│ write()      │
  │ write()     │── Data ──────>│ read()       │
  │ close()     │               │ close()      │
  └─────────────┘               └──────────────┘
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Timeline ซ้ายคือ Client State ส่วน Timeline ขวาคือ Server State; เวลาไหลจากบนลงล่าง. ลูกศรแรก SYN: Seq=x ; ลูกศรที่สอง SYN-ACK: Seq=y, ACK=x+1 ; ลูกศรที่สาม ACK: ACK=y+1 . Server ค้างที่ SYN-RCVD จนได้รับ ACK ขั้นที่สาม จึงลดโอกาสเปิด Half-Open Connection จาก Request เก่า. โค้ด Socket API ด้านบนเชื่อมการทำงานของ Application กับ State Transition ของ TCP.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Three-Way Handshake = SYN → SYN-ACK → ACK. Client และ Server เลือก Initial Sequence Number แยกกัน คือ x และ y. Server เข้า ESTAB หลังได้รับ ACK ขั้นที่สาม ไม่ใช่ทันทีเมื่อได้รับ SYN. SYN ถูกยืนยันด้วย ACK Number ที่เพิ่มขึ้นหนึ่ง: x+1 และ y+1.

---

## 📄 Slide 105: Human Three-Way Handshake: ตัวอย่างจากการปีนผา

*📄 Slide 105*

ภาพนี้ใช้อุปมาจากการปีนผาเพื่ออธิบายเหตุผลของ Three-Way Handshake. ผู้ปีนและผู้ควบคุมเชือกนิรภัย หรือ Belayer ต้องแลกเปลี่ยนข้อความสามครั้งก่อนเริ่มปีน เพื่อให้ทั้งสองฝ่ายมีความเข้าใจตรงกัน. ขั้นที่ 1 ผู้ปีนถาม “On belay?” หมายถึงผู้ควบคุมเชือกพร้อมดูแลเชือกนิรภัยหรือไม่. ขั้นนี้คล้าย Client ส่ง SYN เพื่อขอเริ่ม Connection. ขั้นที่ 2 Belayer ตอบ “Belay on.” เพื่อยืนยันว่าพร้อมและกำลังควบคุมเชือก. ขั้นนี้คล้าย Server ส่ง SYN-ACK: ยอมรับคำขอและส่งสถานะของตนกลับมา. ขั้นที่ 3 ผู้ปีนตอบ “Climbing.” เพื่อยืนยันว่าได้รับคำตอบแล้วและกำลังเริ่มปีน. ขั้นนี้คล้าย Client ส่ง ACK ขั้นสุดท้าย ซึ่งทำให้ Belayer ทราบว่าผู้ปีนได้ยินคำตอบและทั้งสองฝ่ายพร้อมจริง. หากมีเพียง “On belay?” และ “Belay on.” แต่ข้อความตอบกลับไม่ถึงผู้ปีน Belayer อาจคิดว่าพร้อมเริ่มแล้ว ขณะที่ผู้ปีนยังไม่แน่ใจ. ข้อความที่สามจึงปิดวงจรการรับรู้และลดความเข้าใจไม่ตรงกัน.


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> หมายเลข 1–3 ในภาพแสดงลำดับข้อความ ไม่ใช่ลำดับของอุปกรณ์เครือข่าย. ผู้ปีนทำหน้าที่เหมือน Client และ Belayer ทำหน้าที่เหมือน Server. ข้อความที่สามเป็นการยืนยันว่าฝ่ายเริ่มต้นได้รับคำตอบของอีกฝ่ายแล้ว.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Three-Way Handshake ทำให้ทั้งสองฝ่ายยืนยันความพร้อมแบบครบวงจร. ขั้นที่สามไม่ใช่คำขอใหม่ แต่เป็นการยืนยันการตอบกลับของขั้นที่สอง. อุปมาช่วยจำลำดับ: On belay? → Belay on. → Climbing.

---

## 📄 Slide 106: Closing a TCP Connection: FIN และ ACK

*📄 Slide 106*

เมื่อการสื่อสารเสร็จสิ้น Client และ Server สามารถปิดฝั่งของตนใน TCP Connection ได้อย่างเป็นระเบียบ หรือ Graceful Close . เนื่องจาก TCP เป็น Full-Duplex การส่งข้อมูลสองทิศทางจึงสามารถถูกปิดแยกจากกันได้. Endpoint ที่ต้องการหยุดส่งข้อมูลจะส่ง TCP Segment ที่ตั้งค่า FIN bit = 1 . FIN แจ้งว่า Endpoint นั้นไม่มีข้อมูลใหม่ในทิศทางของตนที่จะส่งต่อแล้ว แต่ยังสามารถรับ Segment จากอีกฝั่งได้จนกว่าอีกทิศทางจะถูกปิดด้วย. เมื่ออีกฝ่ายได้รับ FIN จะตอบด้วย ACK เพื่อยืนยันการรับ. หากฝ่ายรับ FIN พร้อมจะปิดทิศทางของตนด้วย ACK สำหรับ FIN ที่ได้รับสามารถรวมอยู่ใน Segment เดียวกับ FIN ของตนได้ ตามข้อความ “ACK can be combined with own FIN” ในสไลด์. TCP ยังรองรับกรณี Simultaneous FIN ซึ่งทั้ง Client และ Server ส่ง FIN ใกล้เคียงกัน. แต่ละฝ่ายยังคงตอบ ACK ต่อ FIN ของอีกฝ่าย ทำให้การปิด Connection ดำเนินได้แม้เริ่มปิดพร้อมกัน. Speaker Notes ระบุว่าฝ่ายที่ปิดอาจรอช่วงหนึ่งเพื่อรองรับ FIN ที่ถูก Retransmit ก่อนหมดเวลา. จุดประสงค์คือให้การปิด Connection ทนต่อการสูญหายหรือความล่าช้าของ Control Segment.


```
[ TCP Connection Close (4-Way) ]
Client                          Server
  │── FIN ────────────────────────>│   Client ขอปิด
  │<── ACK ────────────────────────│   Server รับทราบ
  │<── FIN ────────────────────────│   Server ขอปิดด้วย
  │── ACK ────────────────────────>│   Client รับทราบ
  │  (TIMED WAIT: 2*MSL)          │   รอให้แน่ใจว่า ACK ถึง
  │── [Connection Closed] ────────>│
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์นี้เป็นรายการหลักการ ไม่มี Sequence Diagram ของการปิด Connection. FIN เป็น Flag ใน TCP Header ส่วน ACK ใช้ยืนยันว่าได้รับ FIN แล้ว. คำว่า “each close their side” สื่อว่าการปิดสองทิศทางเป็นอิสระจากกัน.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ปิดทิศทางการส่งด้วย TCP Segment ที่มี FIN=1. ผู้รับ FIN ต้องตอบ ACK; ACK อาจรวมกับ FIN ของตนเองได้. TCP จัดการกรณีทั้งสองฝ่ายส่ง FIN พร้อมกันได้.

---

## 📄 Slide 107: Chapter 3 Roadmap: เข้าสู่ Principles of Congestion Control

*📄 Slide 107*

Congestion Control Congestion Control Roadmap แสดงว่าหัวข้อ Connection-Oriented Transport: TCP ที่ผ่านมาได้ครอบคลุม Segment Structure, Reliable Data Transfer, Flow Control และ Connection Management แล้ว. หัวข้อที่กำลังเข้าสู่คือ Principles of Congestion Control . เนื้อหาช่วงนี้จะอธิบายปัญหาที่เกิดเมื่อ Traffic รวมจากหลาย Sender มีมากเกินกว่าทรัพยากรใน Network Core จะรองรับ เช่น Link Capacity และ Router Buffer. ก่อนศึกษากลไกเฉพาะของ TCP ต้องเข้าใจสาเหตุ อาการ และต้นทุนของ Congestion ก่อน. หลังจากหลักการทั่วไปแล้ว บทเรียนจะต่อด้วย TCP Congestion Control ซึ่งแสดงว่า TCP ปรับอัตราการส่งอย่างไรเมื่ออนุมานว่าเครือข่ายกำลังคับคั่ง. หัวข้อท้ายบทคือ Evolution of Transport-Layer Functionality. ภาพสะพานด้านขวาเป็นภาพประกอบ Roadmap ไม่ได้เป็นไดอะแกรมของ Congestion. จุดสำคัญในการอ่านสไลด์คือรายการสีเข้มซึ่งระบุหัวข้อปัจจุบัน.


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รายการสีเทาคือหัวข้อที่ผ่านไปแล้วหรือยังไม่ใช่หัวข้อปัจจุบัน. Principles of Congestion Control ถูกเน้นสีเข้มเพื่อบอกตำแหน่งในบท. TCP Congestion Control เป็นหัวข้อถัดไปที่นำหลักการทั่วไปไปใช้กับ TCP.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - เริ่มจากหลักการ Congestion ทั่วไปก่อนศึกษาวิธีควบคุมของ TCP. Congestion เกิดใน Network Core จาก Traffic รวมของหลายแหล่ง. หัวข้อถัดไปจะวิเคราะห์สาเหตุ ต้นทุน และวิธีตอบสนองต่อ Congestion.

---

## 📄 Slide 108: Principles of Congestion Control: ความหมาย อาการ และความต่างจาก Flow Control

*📄 Slide 108*

Congestion หรือความคับคั่งของเครือข่าย หมายถึงสถานการณ์ที่มีหลาย Source ส่งข้อมูลรวมกันมากและเร็วเกินกว่าที่ Network จะรองรับได้. ปัญหาไม่ได้เกิดจาก Sender เดียวหรือ Receiver เดียวเท่านั้น แต่เกิดจาก Traffic หลาย Flow แย่งใช้ Router, Buffer และ Link ร่วมกัน. อาการสำคัญมีสองอย่าง. อย่างแรกคือ Long Delay : Packet ต้องรอใน Queue ของ Router นานขึ้นเมื่ออัตราเข้ามาใกล้หรือเกินอัตราที่ Link ส่งออกได้. อย่างที่สองคือ Packet Loss : เมื่อ Router Buffer เต็ม Packet ใหม่จะถูกทิ้งจาก Buffer Overflow. ภาพถนนหลายสายที่รถหนาแน่นเป็นอุปมาของ Congestion Control: มี Sender จำนวนมากส่งเร็วเกินไปเข้าสู่ทรัพยากรร่วม. ภาพด้านล่างเปรียบเทียบกับ Flow Control ซึ่งเป็นกรณี Sender หนึ่งรายส่งเร็วเกินกว่าที่ Receiver หนึ่งรายจะรับได้. Congestion Control จึงปกป้องเครือข่ายและการใช้งานร่วมกันของหลาย Flow ส่วน Flow Control ปกป้อง Receive Buffer ของ Endpoint. ทั้งสองกลไกอาจจำกัด Sender แต่ใช้สัญญาณและแก้คนละปัญหา. สไลด์เรียก Congestion Control ว่าเป็น “a top-10 problem” เพื่อเน้นว่าเป็นปัญหาพื้นฐานและสำคัญของระบบเครือข่าย เพราะหากควบคุมไม่ดี Throughput อาจลดลง ขณะที่ Delay และ Loss เพิ่มขึ้น.

```
[ TCP 3-Way Handshake Connection Establishment ]
Client Host                                            Server Host
    │ ─── 1. SYN Packet: Seq=x, SYN=1 ─────────────────────> │ (Server รับทราบคำขอ)
    │                                                         │
    │ <── 2. SYN-ACK Packet: Seq=y, ACK=x+1, SYN=1, ACK=1 ── │ (Server ยินยอมเชื่อมต่อ)
    │                                                         │
    │ ─── 3. ACK Packet: Seq=x+1, ACK=y+1, ACK=1 ──────────> │ (Client ยืนยัน พร้อมแนบ Data ได้)
(สถานะทั้งสองฝั่งเข้าสู่ ESTABLISHED เชื่อมต่อสมบูรณ์)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ภาพทางแยกที่รถหนาแน่นแทนหลาย Sender แย่งทรัพยากร Network ร่วมกัน. ภาพเปรียบเทียบด้านล่างใช้ “หลายตัวส่งเร็ว” สำหรับ Congestion และ “ตัวเดียวส่งเร็วเกินผู้รับ” สำหรับ Flow Control. ข้อความ Long Delays และ Packet Loss เป็น Manifestations หรือสิ่งที่สังเกตได้เมื่อเกิด Congestion.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Congestion = หลาย Sources ส่ง Traffic รวมมากเกิน Network Capacity. อาการหลักคือ Queueing Delay สูงและ Packet Loss จาก Router Buffer Overflow. Congestion Control ปกป้อง Network; Flow Control ปกป้อง Receiver.

---

## 📄 Slide 109: Causes and Costs of Congestion — Scenario 1: Infinite Buffers

*📄 Slide 109*

Scenario 1 เป็นแบบจำลองที่ง่ายที่สุด: มี Host A และ Host B ส่งข้อมูลผ่าน Router เดียว, Input Link และ Output Link มี Capacity R , มีสอง Flow ใช้ Output Link ร่วมกัน และ Router มี Infinite Buffers . เนื่องจาก Buffer ไม่มีวันเต็ม จึงไม่มี Packet Loss และไม่ต้อง Retransmit. สัญลักษณ์ λ in คืออัตราข้อมูลต้นฉบับที่แต่ละ Host ส่งเข้าสู่เครือข่าย ส่วน λ out คือ Throughput ที่ปลายทางได้รับ. เนื่องจากสอง Flow แบ่ง Output Link Capacity R อย่างเท่าเทียม Throughput สูงสุดต่อ Connection จึงเป็น R/2 . กราฟซ้ายล่างแสดงว่าเมื่อ λ in ยังต่ำกว่า R/2 , λ out เพิ่มตามอัตราเข้าเกือบเป็นเส้นตรง. แต่เมื่ออัตราเข้าเข้าใกล้หรือเกินส่วนแบ่ง Capacity, Throughput ต่อ Connection ไม่สามารถสูงกว่า R/2 และกราฟจึงแบนที่ค่านี้. กราฟขวาล่างแสดง Queueing Delay. เมื่อ λ in เข้าใกล้ R/2 , Packet เข้ามาเกือบเร็วเท่ากับที่ Router ส่งออก ทำให้ Queue ระบายไม่ทัน. แม้ Buffer จะไม่ล้น แต่ Queue สามารถยาวขึ้นเรื่อย ๆ และ Delay เพิ่มขึ้นอย่างมาก. ต้นทุนของ Congestion ใน Scenario นี้จึงไม่ใช่ Packet Loss แต่เป็น Large Queueing Delay . แบบจำลอง Infinite Buffer ช่วยแยกให้เห็นว่าเพียงอัตราเข้าเข้าใกล้ Capacity ก็ทำให้คุณภาพบริการแย่ลงได้ แม้ไม่มี Packet ถูกทิ้ง.


```
[ Packet Switching: Store-and-Forward ]
Source ──(Packet 1)──> [ Router Queue: | P3 | P2 | P1 | ] ──(Output Link)──> Next Hop
                       (รอคิวใน Buffer ก่อนส่งออก)
                       *** ถ้า Buffer เต็ม → Packet Loss! ***
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นสีแดงคือ Flow ของ Host A และเส้นสีน้ำเงินคือ Flow ของ Host B ซึ่งรวมกันที่ Router. วงรี “infinite shared output link buffers” คือ Queue ร่วมก่อน Output Link Capacity R. กราฟ Throughput อิ่มตัวที่ R/2 ต่อ Connection เพราะสอง Flow แบ่ง Link R. กราฟ Delay พุ่งสูงเมื่อ λin เข้าใกล้ R/2 แม้ไม่มี Packet Loss.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - สอง Flow แชร์ Link R จึงมี Throughput สูงสุดต่อ Flow เท่ากับ R/2. Infinite Buffer ป้องกัน Loss แต่ไม่ป้องกัน Queueing Delay ที่สูงมาก. เมื่อ Offered Load เข้าใกล้ Capacity, Throughput ไม่เพิ่มต่อแต่ Delay เพิ่มอย่างรวดเร็ว.

---

## 📄 Slide 110: Causes and Costs of Congestion — Scenario 2: Finite Buffers and Retransmissions

*📄 Slide 110*

Scenario 2 เปลี่ยนสมมติฐานสำคัญจาก Infinite Buffer เป็น Finite Buffers . เมื่อ Queue ของ Router เต็ม Packet ที่มาถึงใหม่อาจถูกทิ้ง. Sender จึงอาจส่ง Packet ที่สูญหายหรือ Packet ที่ Timer หมดเวลาซ้ำ ทำให้ Traffic ที่เข้าสู่ Network มากกว่าข้อมูลใหม่จาก Application. ในภาพ λ in หมายถึงอัตรา Original Data จาก Application. สำหรับข้อมูลที่ระบบต้องการส่งสำเร็จ Application-Layer Input และ Application-Layer Output มีอัตราเท่ากันในระยะยาว: λ in = λ out . ส่วน λ′ in คืออัตราข้อมูลที่ Transport Layer ป้อนเข้าสู่เครือข่ายจริง ซึ่งรวมทั้ง Original Data และ Retransmitted Data. ดังนั้น λ′ in ≥ λ in . ความต่างระหว่างสองค่านี้คือภาระจากการส่งซ้ำ. ไดอะแกรมใช้ Flow สีแดงสำหรับ Host A และสีน้ำเงินสำหรับ Host B. Packet ทั้งสอง Flow เข้า Queue ที่มีขนาดจำกัดก่อนผ่าน Output Link Capacity R . เมื่อ Buffer เต็ม Packet สูญหาย และ Retransmission จะกลับมาใช้ Buffer และ Link Capacity อีกครั้ง. ต้นทุนสำคัญคือบางส่วนของ Network Capacity ถูกใช้ส่งข้อมูลซ้ำ แทนที่จะใช้ส่งข้อมูลใหม่. หาก Timeout เกิดเร็วเกินไป Sender อาจ Retransmit Packet ที่ไม่ได้สูญหายแต่เพียงล่าช้า ทำให้ Offered Load เพิ่มขึ้นอีก. สไลด์นี้วางพื้นฐานเพื่อวิเคราะห์ผลของ Retransmission ต่อ Throughput ในสไลด์ถัดไป.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กล่องสีม่วง “finite shared output link buffers” แสดง Queue ที่มีขนาดจำกัดและอาจ Overflow. λin คือข้อมูลใหม่จาก Application; λ′in คือข้อมูลที่ Transport ส่งจริงรวม Retransmission. λout ที่ปลายทางคือ Useful Throughput ของข้อมูลที่ได้รับ. ลูกศร Retransmitted Data แสดงว่าข้อมูลเดิมอาจเดินทางผ่านทรัพยากรเครือข่ายมากกว่าหนึ่งครั้ง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Finite Buffer ทำให้เกิด Packet Loss จาก Buffer Overflow. Retransmission ทำให้ Transport-Layer Offered Load λ′in สูงกว่า Original Load λin. การส่งซ้ำใช้ Capacity แต่ไม่ได้เพิ่มปริมาณข้อมูลใหม่ จึงเป็น Cost ของ Congestion.

---

## 📄 Slide 111: Scenario 2: Perfect Knowledge — ส่งเมื่อ Router Buffer มีที่ว่าง

*📄 Slide 111*

สไลด์นี้เริ่มจากกรณีสมมติที่ดีที่สุดของ Scenario 2 คือ Sender มี Perfect Knowledge หรือรู้สถานะ Buffer ของ Router อย่างสมบูรณ์ และจะส่ง Packet เฉพาะเมื่อ Router ยังมีพื้นที่ว่าง. ดังนั้น Packet ที่ส่งออกไปจะไม่ถูกทิ้งเพราะ Buffer เต็ม. ในไดอะแกรม Host A ใช้เส้นสีแดงและ Host B ใช้เส้นสีน้ำเงิน. ทั้งสอง Flow ผ่าน Router และใช้ Output Link ร่วมกัน โดย Link แต่ละด้านมีอัตราส่ง R . กล่องสีแดงภายใน Router คือ Finite Shared Output-Link Buffer หรือ Queue ที่มีขนาดจำกัดและใช้ร่วมกัน. ข้อความสีเขียว free buffer space! หมายถึงขณะนั้น Queue ยังมีช่องว่าง Sender จึงอนุญาตให้ส่ง Packet เข้าไป. เนื่องจากไม่มี Packet Loss จึงไม่จำเป็นต้อง Retransmit ทำให้ λ′ in = λ in : อัตราที่ Transport Layer ส่งเข้าสู่เครือข่ายเท่ากับอัตราข้อมูลต้นฉบับจาก Application. λ in คือ Original Data Rate, λ′ in คือ Original Data รวม Retransmitted Data และ λ out คือ Throughput ที่ปลายทางได้รับ. ในกรณีนี้ไม่มี Retransmission จึงไม่มี Traffic ส่วนเกินจากการส่งซ้ำ. กราฟด้านขวาแสดงว่า λ out เพิ่มเป็นเส้นตรงตาม λ in จนถึงค่าสูงสุด R/2 ต่อ Connection เพราะสอง Flow แบ่ง Output Link Capacity R ร่วมกัน. กรณีนี้เป็น Idealization เพื่อใช้เปรียบเทียบกับเครือข่ายจริง ซึ่ง Sender ไม่สามารถรู้พื้นที่ Buffer ได้สมบูรณ์แบบ.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นสีแดงแทน Flow ของ Host A และเส้นสีน้ำเงินแทน Flow ของ Host B. กล่อง Queue สีแดงใน Router คือ Finite Shared Output-Link Buffer. จุดสีเขียวใน Buffer ของ Host A แทน Packet ที่กำลังถูกส่งเมื่อทราบว่ามีพื้นที่ว่าง. กราฟเส้นตรงจากจุดกำเนิดถึง (R/2, R/2) แสดงว่า Input ทุกส่วนกลายเป็น Useful Throughput.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Perfect Knowledge: Sender ส่งเฉพาะเมื่อ Router Buffer มีที่ว่าง. ไม่มี Loss และไม่มี Retransmission จึงมี λ′in = λin. เมื่อสอง Flow แบ่ง Link R, Throughput สูงสุดต่อ Flow คือ R/2.

---

## 📄 Slide 112: Scenario 2: Some Perfect Knowledge — Packet ถูกทิ้งเมื่อ Buffer เต็ม

*📄 Slide 112*

สไลด์นี้ลดความสมบูรณ์ของสมมติฐานลงเป็น Some Perfect Knowledge . Sender ไม่ได้รู้ล่วงหน้าว่า Router Buffer มีที่ว่างหรือไม่ จึงอาจส่ง Packet เข้าไปในขณะที่ Buffer เต็มและ Packet ถูก Dropped . ข้อความ no buffer space! เหนือ Router แสดงว่า Queue เต็ม. Packet สีเขียวจาก Host A มาถึง Router แต่ไม่มีช่องให้จัดเก็บ จึงถูกทิ้งและไม่เดินทางต่อไปยัง Receiver. นี่คือ Packet Loss ที่เกิดจาก Buffer Overflow . อย่างไรก็ตาม แบบจำลองนี้ยังสมมติว่า Sender รู้ได้อย่างสมบูรณ์ว่า Packet ใดถูก Drop. Sender จึง Retransmit เฉพาะ Packet ที่ทราบแน่นอนว่าสูญหาย และไม่ส่งสำเนาโดยไม่จำเป็น. เมื่อมี Retransmission จะเกิดความแตกต่างระหว่าง λ in ซึ่งเป็น Original Data กับ λ′ in ซึ่งรวม Original Data และ Retransmitted Data. ดังนั้น λ′ in อาจมากกว่า λ in . แม้การส่งซ้ำในแบบจำลองนี้จะ “จำเป็น” เพราะส่งเฉพาะ Packet ที่สูญหาย แต่ Packet ที่ถูก Drop ไปแล้วได้ใช้ทรัพยากรบางส่วนก่อนถึงจุดที่ถูกทิ้ง และ Packet ที่ส่งซ้ำต้องใช้ Link Capacity เพิ่มอีกครั้ง.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Queue สีแดงที่เต็มแสดง Finite Buffer ซึ่งไม่สามารถรับ Packet ใหม่ได้. Packet สีเขียวที่เข้าถึง Buffer แต่ไปต่อไม่ได้คือ Packet ที่ถูก Drop. เส้นทางสีแดงและสีน้ำเงินยังใช้ Output Link และ Buffer ร่วมกัน. คำว่า “copy” ใกล้ Host A สื่อถึงสำเนาของข้อมูลที่อาจต้องส่งซ้ำหลังทราบว่า Packet สูญหาย.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Finite Buffer ทำให้ Packet ถูก Drop เมื่อ Queue เต็ม. Sender Retransmit เฉพาะ Packet ที่รู้แน่นอนว่าสูญหาย. Retransmission ทำให้ λ′in มากกว่า λin และใช้ Capacity เพิ่ม.

---

## 📄 Slide 113: Scenario 2: Required Retransmissions ทำให้ Effective Throughput ลดลง

*📄 Slide 113*

สไลด์นี้ใช้แบบจำลอง Some Perfect Knowledge เดิม แต่เพิ่มกราฟเพื่อแสดงต้นทุนของ Required Retransmissions . เมื่อ Packet ถูก Drop Sender ส่งซ้ำเฉพาะ Packet ที่สูญหาย ดังนั้นไม่มี Duplicate ที่ไม่จำเป็น แต่ Capacity บางส่วนยังต้องใช้กับ Packet ที่ส่งซ้ำ. แกนนอนของกราฟคือ λ′ in ซึ่งเป็นอัตรา Traffic ทั้งหมดที่ Sender ป้อนเข้าสู่ Network รวม Retransmission ส่วนแกนตั้งคือ λ out หรือ Useful Throughput ที่ Receiver ได้รับ. เส้นประทแยงคือกรณีอุดมคติที่ทุก Packet ที่ส่งเข้าสู่เครือข่ายกลายเป็นข้อมูลใหม่ที่ปลายทางได้รับ. เส้นจริงอยู่ต่ำกว่าเส้นประเมื่อเริ่มมี Loss เพราะ Traffic บางส่วนเป็น Retransmission ไม่ใช่ Original Data ใหม่. เมื่อส่งที่อัตรารวมใกล้ R/2 , Packet บางส่วนจำเป็นต้องเป็น Retransmission. จุดสีดำจึงมี Useful Throughput ต่ำกว่าจุดสีเทาในอุดมคติ. วงเล็บที่เขียนว่า “wasted” capacity due to retransmissions คือส่วนของ Link Capacity ที่ใช้ส่งข้อมูลเดิมซ้ำแทนข้อมูลใหม่. คำว่า “wasted” ในที่นี้ไม่ได้หมายความว่า Retransmission ไม่มีประโยชน์ เพราะยังจำเป็นต่อ Reliability แต่หมายความว่าในมุมของ Throughput ข้อมูลใหม่ Capacity ส่วนนั้นไม่เพิ่มจำนวนข้อมูลใหม่ที่ Receiver ได้รับ.

```
[ TCP 4-Step Connection Teardown ]
Client Host                                            Server Host
    │ ─── 1. FIN Packet: Seq=x, FIN=1 ─────────────────────> │
    │ <── 2. ACK Packet: ACK=x+1 ─────────────────────────── │ (ปิดทิศทาง Client -> Server)
    │                                                         │
    │ <── 3. FIN Packet: Seq=y, FIN=1 ───────────────────── │
    │ ─── 4. ACK Packet: ACK=y+1 ──────────────────────────> │ (ปิดทิศทาง Server -> Client)
(Client รอสถานะ TIME_WAIT เป็นเวลา 2 * MSL ก่อนปิดสนิท)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นประ y=x คือกรณีที่ Traffic ทุกส่วนเป็นข้อมูลใหม่และไม่มี Loss. เส้นสีแดง/ดำที่ต่ำกว่าเส้นประคือ Effective Throughput เมื่อมี Retransmission. ช่องว่างระหว่างจุดสีเทากับจุดสีดำคือ Capacity ที่ใช้กับ Retransmitted Packets. วงกลมสีน้ำเงินเน้นช่วงโหลดต่ำและช่วงใกล้ R/2 เพื่อเปรียบเทียบผลของ Retransmission.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - แม้ส่งซ้ำเฉพาะ Packet ที่สูญหาย Retransmission ก็ยังใช้ Link Capacity. λ′in วัด Traffic ทั้งหมด แต่ λout วัด Useful Throughput. เมื่อ Loss เพิ่ม Effective Throughput จะต่ำกว่ากรณีอุดมคติ.

---

## 📄 Slide 114: Scenario 2 แบบสมจริง: Premature Timeout ทำให้เกิด Unneeded Duplicates

*📄 Slide 114*

เครือข่ายจริงไม่สามารถให้ Sender รู้ได้ทันทีและแน่นอนว่า Packet สูญหายหรือเพียงล่าช้า. Sender จึงใช้ Timer และอาจเกิด Premature Timeout คือ Timer หมดก่อน Packet หรือ ACK จะมาถึง ทั้งที่ Packet เดิมไม่ได้สูญหาย. เมื่อ Timeout เกิด Sender จะ Retransmit Packet เดิม. หากสำเนาเดิมและสำเนาที่ส่งซ้ำเดินทางถึง Receiver ทั้งคู่ จะเกิด Unneeded Duplicate : Network ใช้ทรัพยากรส่ง Packet สองชุด แม้ Receiver ต้องการข้อมูลเพียงชุดเดียว. รูปนาฬิกาและคำว่า timeout ใกล้ Host A แสดงเหตุการณ์ที่ Sender ตัดสินใจส่งซ้ำ. กล่อง Buffer ของ Host A มี Packet สีเขียวสองก้อน สื่อว่ามี Original Packet และ Duplicate Packet รอส่งเข้าสู่เครือข่าย. กราฟแสดงว่าเส้น Useful Throughput อยู่ต่ำลงไปอีกเมื่อเทียบกับกรณี Required Retransmissions. นอกจาก Capacity ที่ใช้กับการส่งซ้ำที่จำเป็นแล้ว ยังมี Capacity ที่เสียไปกับ Duplicate ที่ไม่จำเป็นและทั้งสองสำเนาถูกส่งถึงปลายทาง. ช่องว่างที่ระบุ “wasted” capacity due to un-needed retransmissions จึงกว้างขึ้น. เมื่อ Offered Load เข้าใกล้ R/2 , Traffic รวมอาจประกอบด้วยข้อมูลใหม่ การส่งซ้ำที่จำเป็น และการส่งซ้ำที่ไม่จำเป็น ทำให้ Useful Throughput ต่ำกว่าความสามารถทางกายภาพของ Link อย่างชัดเจน.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> นาฬิกาและคำว่า timeout แสดง Premature Timeout ที่กระตุ้น Retransmission. Packet สีเขียวสองก้อนใน Sender Buffer คือ Original และ Duplicate Copy. เส้นประคือ Throughput อุดมคติ; เส้นจริงที่ต่ำกว่าคือ Throughput หลังมี Duplicate. วงเล็บด้านกราฟแยก Capacity ที่เสียไปกับ Unneeded Retransmissions.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Timeout ไม่ได้แปลว่า Packet สูญหายเสมอไป; Packet อาจเพียงล่าช้า. Premature Timeout อาจทำให้สองสำเนาถูกส่งถึง Receiver ทั้งคู่. Unneeded Duplicates ลด Effective Throughput มากกว่าการส่งซ้ำที่จำเป็น.

---

## 📄 Slide 115: Scenario 2: สรุปต้นทุนของ Retransmission และ Duplicate

*📄 Slide 115*

สไลด์นี้สรุป “Costs” ของ Congestion ใน Scenario 2. เมื่อ Buffer เต็ม Packet ถูก Drop และต้อง Retransmit. เพื่อให้ Receiver ได้ Useful Throughput เท่าเดิม Network จึงต้องทำงานมากขึ้น เพราะต้องขนส่งทั้ง Original Packet และ Packet ที่ส่งซ้ำ. ต้นทุนข้อแรกคือ More Work for Given Receiver Throughput : หาก Receiver ต้องได้รับข้อมูลใหม่จำนวนเท่าเดิม Sender และ Router ต้องส่ง/ประมวลผล Packet มากขึ้น. ปริมาณงานใน Network จึงสูงกว่า Useful Data ที่ปลายทางได้รับ. ต้นทุนข้อที่สองคือ Unneeded Retransmissions . เมื่อ Timeout เร็วเกินไป Link อาจขนส่งหลายสำเนาของ Packet เดียวกัน และบางครั้งทุกสำเนาก็ถึง Receiver. Capacity ที่ใช้กับสำเนาเกินจำเป็นไม่เพิ่มข้อมูลใหม่. กราฟย้ำว่าจุด Throughput จริงอยู่ต่ำกว่าค่าอุดมคติ. ช่องว่างจาก Required Retransmissions และ Unneeded Duplicates ทำให้ Maximum Achievable Throughput ลดลง แม้ Link ทางกายภาพยังมี Capacity เท่าเดิม. ดังนั้น Reliability Mechanism และ Timeout ต้องออกแบบอย่างระมัดระวัง. Retransmission ช่วยแก้ Loss แต่เมื่อ Network กำลัง Congested การส่งซ้ำจำนวนมากอาจเพิ่ม Load และทำให้ปัญหารุนแรงขึ้น.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กราฟด้านขวาเปรียบเทียบ Ideal Throughput กับ Throughput จริงเมื่อมี Retransmission. จุดสีดำคือ Useful Throughput ที่ทำได้จริง; จุดสีเทาคือค่าที่อาจทำได้หากไม่มีงานซ้ำ. ข้อความสรุปด้านล่างเชื่อมสาเหตุ Loss/Timeout กับผลคือ Throughput สูงสุดลดลง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Congestion ทำให้ต้องทำงานมากขึ้นเพื่อให้ได้ Receiver Throughput เท่าเดิม. หลายสำเนาของ Packet เดียวใช้ Link Capacity โดยไม่เพิ่มข้อมูลใหม่. Retransmission และ Duplicate ลด Maximum Achievable Throughput.

---

## 📄 Slide 116: Scenario 3: Four Senders, Multi-Hop Paths และ Congestion Collapse ของ Flow อื่น

*📄 Slide 116*

Scenario 3 ขยายเครือข่ายให้ซับซ้อนขึ้น: มี Sender สี่ราย ได้แก่ Host A, B, C และ D; Packet เดินทางผ่านหลาย Router หรือ Multi-Hop Paths ; Router ทุกจุดมี Finite Output-Link Buffer; และ Sender ใช้ Timeout/Retransmit. เส้นแต่ละสีแทน Flow คนละคู่. เส้นสีแดงจาก Host A ไป Host C และเส้นสีน้ำเงินจาก Host D ไป Host B ใช้บาง Link และ Queue ร่วมกัน. เส้นสีชมพูและสีเขียวเป็น Flow ในทิศทางหรือคู่ Host อื่น ทำให้เกิดการแย่งทรัพยากรหลายจุดพร้อมกัน. คำถามในสไลด์คือ เมื่อ λ in และ λ′ in เพิ่มขึ้นจะเกิดอะไรขึ้น. คำตอบเน้น Flow สีแดง: เมื่อ λ′ in ของสีแดงเพิ่มมากขึ้น Traffic สีแดงครอง Queue ด้านบนจน Packet สีน้ำเงินที่มาถึง Queue นั้นถูก Drop ทั้งหมด. ผลคือ Throughput ของ Flow สีน้ำเงินลดลงจนเข้าใกล้ศูนย์ แม้ Packet สีน้ำเงินได้เดินทางผ่าน Router และ Link ก่อนหน้ามาแล้ว. Congestion ที่ Bottleneck หนึ่งจุดจึงสามารถทำลาย Throughput ของ Flow อื่นที่ใช้เส้นทางร่วมกัน. ภาพนี้แสดงว่า Congestion ไม่ได้กระทบเฉพาะ Sender ที่ส่งมากเกินไป. Flow ที่แข่งขันกันอาจได้รับผลกระทบไม่เท่าเทียม และ Retransmission ของ Flow หนึ่งอาจเพิ่ม Load จนอีก Flow แทบไม่สามารถส่งผ่าน Bottleneck ได้.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สี่สีแทนสี่ Flow ที่เดินทางผ่าน Multi-Hop Network. วงรีสีแดงเน้น Shared Output-Link Buffers ซึ่งเป็นจุด Bottleneck. เส้นสีแดงที่หนาแน่นขึ้นแทน λ′in ซึ่งรวม Retransmission. Packet สีน้ำเงินใช้เส้นทางต้นน้ำมาแล้ว แต่ถูก Drop ที่ Upper Queue ทำให้ Blue Throughput เข้าใกล้ศูนย์.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ใน Multi-Hop Network หลาย Flow อาจแย่ง Buffer และ Link หลายจุด. Traffic/Retransmission ของ Flow หนึ่งอาจทำให้ Flow อื่นถูก Drop ทั้งหมด. Congestion สามารถทำให้ Throughput ของบาง Flow ลดลงจนเกือบศูนย์.

---

## 📄 Slide 117: Scenario 3: ทรัพยากรต้นน้ำสูญเปล่าเมื่อ Packet ถูก Drop ปลายน้ำ

*📄 Slide 117*

สไลด์นี้เน้นต้นทุนอีกประเภทหนึ่งของ Congestion ใน Multi-Hop Network: เมื่อ Packet ถูก Drop ที่ Router ปลายน้ำ ทรัพยากรทั้งหมดที่ใช้ส่ง Packet ผ่าน Router และ Link ต้นน้ำก่อนหน้านั้นกลายเป็นงานที่ไม่สร้าง Throughput. กราฟด้านซ้ายมีแกนนอน λ′ in และแกนตั้ง λ out . ในช่วงแรก Throughput เพิ่มตาม Offered Load แต่เมื่อ Load สูงมาก Congestion รุนแรงขึ้น Loss และ Retransmission เพิ่ม และ Useful Throughput อาจลดลงแทนที่จะเพิ่ม. ไดอะแกรมด้านขวาใช้เส้นทางหลายสีเช่นเดียวกับ Scenario 3. Packet บางก้อนเดินทางผ่านหลาย Hop และใช้ Transmission Capacity รวมทั้งพื้นที่ Buffer หลายจุด ก่อนจะถูก Drop ที่ Bottleneck ด้านหลัง. ข้อความ upstream transmission capacity and buffering ... was wasted หมายถึง Link Bandwidth และ Buffer Space ก่อนจุด Drop ถูกใช้ไปแล้ว แต่ Receiver ไม่ได้รับ Packet นั้น. หากต้อง Retransmit เส้นทางต้นน้ำอาจต้องทำงานซ้ำอีกครั้ง. ต้นทุนนี้ทำให้ Multi-Hop Congestion รุนแรงกว่าเพียงการ Drop ที่ Router เดียว เพราะ Packet ที่สูญหายในช่วงท้ายมีต้นทุนสะสมจากทุก Hop ที่ผ่านมาก่อนหน้า.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กราฟโค้งขึ้นแล้วลดลงแสดงว่า Offered Load ที่มากขึ้นอาจทำให้ Throughput ลดลง. เส้นทางหลายสีแสดง Packet ใช้ทรัพยากรหลาย Router ก่อนถึง Bottleneck. บริเวณวงรีใน Network คือจุดที่ Packet ถูก Drop หลังใช้ทรัพยากรต้นน้ำมาแล้ว.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Packet ที่ Drop ปลายน้ำทำให้ Bandwidth/Buffer ที่ใช้บน Hop ต้นน้ำสูญเปล่า. เพิ่ม Offered Load มากเกินไปอาจทำให้ Useful Throughput ลดลง. Multi-Hop Loss มีต้นทุนสะสมมากกว่าการสูญหายใกล้ Sender.

---

## 📄 Slide 118: Congestion Insights: ข้อสรุปจาก Scenario 1–3

*📄 Slide 118*

สไลด์นี้รวบรวมข้อสรุปสำคัญจาก Scenario ต่าง ๆ. ข้อแรกคือ Throughput ไม่สามารถเกิน Capacity ของ Bottleneck Link ได้. การเพิ่มอัตราส่งเหนือ Capacity ไม่ทำให้ปลายทางได้รับข้อมูลใหม่เร็วขึ้นอย่างไม่มีขีดจำกัด. ข้อที่สองคือ Delay เพิ่มขึ้นเมื่อ Load เข้าใกล้ Capacity . กราฟเล็กด้านขวาบนแสดง Queueing Delay ที่พุ่งสูงเมื่ออัตราเข้าเข้าใกล้ขีดความสามารถของ Link แม้ Throughput จะเริ่มอิ่มตัว. ข้อที่สามคือ Loss และ Retransmission ลด Effective Throughput . กราฟเส้นจริงต่ำกว่าเส้นอุดมคติ เพราะ Traffic บางส่วนเป็น Packet ที่สูญหายหรือ Packet ที่ส่งซ้ำ ไม่ใช่ข้อมูลใหม่ที่ Receiver ได้รับ. ข้อที่สี่คือ Unneeded Duplicates ลด Effective Throughput เพิ่มเติม . Premature Timeout อาจสร้างสำเนาที่ไม่จำเป็น ทำให้ Link ขนส่งข้อมูลซ้ำหลายชุด. ข้อสุดท้ายคือ Upstream Resources ถูกใช้โดยเปล่าประโยชน์เมื่อ Packet สูญหายปลายน้ำ . กราฟล่างสุดแสดงว่าเมื่อ Congestion รุนแรง Offered Load เพิ่มขึ้น แต่อาจทำให้ Throughput ลดลง เพราะทรัพยากรถูกใช้กับ Packet ที่ไม่ถึงปลายทาง. ภาพกราฟขนาดเล็กด้านขวาไม่ได้เป็นกราฟใหม่ แต่เป็นการย่อกราฟจาก Scenario ก่อนหน้า เพื่อเชื่อมแต่ละ Insight กับหลักฐานเชิงภาพที่ได้ศึกษา.


```
[ Packet Switching: Store-and-Forward ]
Source ──(Packet 1)──> [ Router Queue: | P3 | P2 | P1 | ] ──(Output Link)──> Next Hop
                       (รอคิวใน Buffer ก่อนส่งออก)
                       *** ถ้า Buffer เต็ม → Packet Loss! ***
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กราฟเส้นตรงอิ่มตัวสื่อว่า Throughput ถูกจำกัดด้วย Link Capacity. กราฟ Delay พุ่งขึ้นเมื่อ Load เข้าใกล้ Capacity. กราฟเส้นจริงต่ำกว่าเส้นประแสดง Loss/Retransmission และ Duplicate ลด Throughput. กราฟโค้งลงที่ Load สูงแสดงผลของทรัพยากรต้นน้ำที่สูญเปล่าและ Congestion รุนแรง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Throughput มีเพดาน แต่ Delay และ Loss สามารถเพิ่มขึ้นมาก. Retransmission ทั้งที่จำเป็นและไม่จำเป็นลด Effective Throughput. Packet ที่ Drop ปลายน้ำทำให้ทรัพยากรที่ใช้มาก่อนหน้านั้นสูญเปล่า.

---

## 📄 Slide 119: End-to-End Congestion Control: อนุมาน Congestion จาก Loss และ Delay

*📄 Slide 119*

End-to-End Congestion Control เป็นแนวทางที่ Network Core ไม่ส่งข้อความบอก Congestion โดยตรงให้ Endpoint. Router ทำหน้าที่ส่งต่อหรือทิ้ง Packet ตามปกติ แต่ไม่ให้ Explicit Feedback ว่า Queue กำลังเต็มเพียงใด. Sender ต้อง Infer หรืออนุมานภาวะ Congestion จากสิ่งที่สังเกตได้แบบ End-to-End เช่น Packet Loss, Duplicate ACK, Timeout หรือ Delay/RTT ที่เพิ่มขึ้น. สัญญาณเหล่านี้บอกทางอ้อมว่า Packet อาจติด Queue หรือถูก Drop ใน Network. ไดอะแกรมแสดง Data เดินทางจาก Host ซ้ายไป Host ขวาผ่าน Router หลายตัว และ ACK เดินทางกลับ. Router ตรงกลางมี Queue สีแดงซึ่งเป็นจุด Congested แต่ไม่มีลูกศร Feedback พิเศษจาก Router ไปยัง Host. Sender เห็นเพียงผลลัพธ์ปลายทาง เช่น ACK มาช้า ACK ซ้ำ หรือไม่มาถึง จึงปรับอัตราการส่งจากการสังเกตเหล่านี้. สไลด์ระบุว่าแนวทางนี้เป็นแนวทางที่ TCP ใช้เป็นหลัก. ข้อดีคือไม่ต้องให้ Router ทุกตัวรองรับ Protocol Feedback เพิ่มเติม. ข้อจำกัดคือ Sender ต้องตีความสัญญาณทางอ้อม ซึ่งอาจแยกได้ยากว่า Loss เกิดจาก Congestion หรือเหตุอื่น.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศร Data เดินทางไปข้างหน้าและ ACK เดินทางย้อนกลับระหว่าง End Hosts. Queue สีแดงใน Router คือจุด Congestion ที่ Endpoint ไม่ได้รับ Feedback โดยตรง. ไม่มีเส้นสีแดงจาก Router ไปยัง Host ต่างจาก Network-Assisted Control ในสไลด์ถัดไป.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - End-to-End Control ไม่มี Explicit Feedback จาก Network. Sender อนุมาน Congestion จาก Loss, ACK และ Delay ที่สังเกตได้. TCP ใช้แนวทาง End-to-End Congestion Control เป็นหลัก.

---

## 📄 Slide 120: Network-Assisted Congestion Control: Router ส่ง Explicit Feedback

*📄 Slide 120*

Network-Assisted Congestion Control ให้ Router ที่กำลัง Congested ส่งข้อมูลโดยตรงไปยัง Sending หรือ Receiving Host ของ Flow ที่ผ่าน Router นั้น. จึงต่างจาก End-to-End Approach ซึ่ง Endpoint ต้องอนุมานจาก Loss หรือ Delay เอง. ไดอะแกรมยังแสดง Data และ ACK ระหว่าง Host เช่นเดิม แต่เพิ่มเส้นสีแดงที่เขียนว่า explicit congestion info จาก Router ที่มี Queue หนาแน่นไปยัง Endpoint. เส้นนี้แทน Feedback ที่ Network สร้างขึ้นโดยตรง. Feedback อาจระบุเพียงว่ามี Congestion, อาจบอกระดับความรุนแรงของ Congestion หรืออาจกำหนด Explicit Sending Rate ที่ Host ควรใช้. เมื่อได้รับข้อมูลนี้ Sender สามารถลดอัตราการส่งก่อนเกิด Loss จำนวนมาก. สไลด์ยกตัวอย่าง TCP ECN , ATM และ DECbit . จุดร่วมคือ Network มีบทบาทส่งสัญญาณเกี่ยวกับ Congestion แทนที่จะปล่อยให้ Endpoint ใช้การอนุมานเพียงอย่างเดียว. แนวทางนี้ให้ Feedback ชัดเจนและอาจตอบสนองได้รวดเร็ว แต่ต้องอาศัยการสนับสนุนจาก Router และ Protocol ที่เกี่ยวข้องตลอดเส้นทาง. หากอุปกรณ์ไม่รองรับ กลไก Explicit Feedback อาจใช้ไม่ได้ครบถ้วน.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้น Data และ ACK แสดงการสื่อสารปกติระหว่าง End Hosts. เส้นสีแดง explicit congestion info คือ Feedback ที่ Router สร้างให้ Endpoint. Router ที่มี Queue สีแดงเป็นแหล่งข้อมูลว่า Network กำลัง Congested. Feedback อาจส่งถึง Sender โดยตรงหรือผ่าน Receiver ตามกลไกของ Protocol.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Network-Assisted Control ใช้ Explicit Feedback จาก Router. Router อาจแจ้งระดับ Congestion หรืออัตราส่งที่ควรใช้. ตัวอย่างในสไลด์คือ TCP ECN, ATM และ DECbit.

---

## 📄 Slide 121: Chapter 3 Roadmap — เข้าสู่หัวข้อ TCP Congestion Control

*📄 Slide 121*

สไลด์นี้เป็น Roadmap สำหรับบอกตำแหน่งของเนื้อหาปัจจุบันในบท Transport Layer. หัวข้อก่อนหน้านี้ได้ศึกษาบริการของ Transport Layer, Multiplexing/Demultiplexing, UDP, Reliable Data Transfer, TCP และหลักการพื้นฐานของ Congestion Control แล้ว. รายการ TCP congestion control ถูกเน้นด้วยสีเข้มและสัญลักษณ์สี่เหลี่ยมสีน้ำเงิน แสดงว่าช่วงถัดไปจะศึกษา “วิธีที่ TCP นำหลักการ Congestion Control ไปใช้จริง” โดยปรับปริมาณข้อมูลที่ Sender อนุญาตให้ค้างอยู่ในเครือข่าย. ประเด็นสำคัญที่จะพบในช่วงนี้คือ Congestion Window ( cwnd ) , AIMD, Slow Start, Congestion Avoidance, Fast Recovery และ TCP CUBIC. กลไกเหล่านี้ทำให้ TCP เพิ่มอัตราการส่งเมื่อเครือข่ายยังรองรับได้ และลดอัตราการส่งเมื่อพบสัญญาณของ Congestion. หัวข้อสุดท้ายที่ยังเป็นสีเทาคือ Evolution of Transport-Layer Functionality ซึ่งจะศึกษาหลังจากจบ TCP Congestion Control. ดังนั้นสไลด์นี้ไม่ได้เพิ่มกลไกใหม่ แต่ช่วยให้นักศึกษาเห็นลำดับและความเชื่อมโยงของทั้งบท. ภาพสะพานหรือทางส่งน้ำทางขวาเป็นภาพประกอบสำหรับแบ่งช่วงเนื้อหา ไม่ใช่ Network Diagram และไม่มีสัญลักษณ์ใดในภาพที่ต้องตีความเป็น Host, Router หรือ Link.


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รายการหัวข้อทางซ้ายเรียงตามลำดับการสอนของบท. TCP congestion control เป็นหัวข้อที่ถูกเน้น แสดงหัวข้อปัจจุบัน. หัวข้อก่อนหน้าถูกทำให้จางเพื่อแสดงว่าได้ศึกษาแล้ว ส่วนหัวข้อถัดไปยังรอศึกษา. ภาพทางขวาเป็นภาพประกอบการเปลี่ยนหมวด ไม่ใช่ไดอะแกรมทางเทคนิค.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ช่วงนี้ศึกษาการปรับ Sending Rate ของ TCP ตามสภาพ Congestion. ตัวแปรหลักคือ Congestion Window หรือ cwnd. ลำดับหลักคือ AIMD → Slow Start/Congestion Avoidance → CUBIC → Bottleneck Link.

---

## 📄 Slide 122: TCP Congestion Control: AIMD

*📄 Slide 122*

AIMD ย่อจาก Additive Increase, Multiplicative Decrease เป็นแนวคิดหลักที่ TCP แบบดั้งเดิมใช้ปรับอัตราการส่ง. Sender ค่อย ๆ เพิ่มอัตราการส่งเพื่อทดสอบว่า Network ยังมี Bandwidth เหลือหรือไม่ และลดอัตราการส่งเมื่อพบ Loss ซึ่งถือเป็นสัญญาณของ Congestion. Additive Increase หมายถึงเพิ่ม Congestion Window อย่างค่อยเป็นค่อยไป โดยแนวคิดในสไลด์คือเพิ่มประมาณ 1 MSS ต่อ 1 RTT จนตรวจพบ Loss. MSS หรือ Maximum Segment Size คือขนาดข้อมูลสูงสุดใน TCP Segment หนึ่งก้อน โดยไม่รวม TCP/IP Header. Multiplicative Decrease หมายถึงเมื่อเกิด Loss Event ให้ลดอัตราการส่งลงเป็นสัดส่วน ในกรณีพื้นฐานคือ “ลดครึ่งหนึ่ง”. การลดแบบคูณทำให้ Sender ถอนตัวจากภาวะ Congestion ได้รวดเร็วกว่าการลดลงทีละน้อย. กราฟมีแกนนอนเป็นเวลา และแกนตั้งเป็น TCP Sender Sending Rate. เส้นสีดำที่ค่อย ๆ สูงขึ้นคือ Additive Increase ส่วนเส้นที่ตกลงอย่างรวดเร็วคือ Multiplicative Decrease. รูปทรงที่เกิดซ้ำเรียกว่า Sawtooth Behavior เพราะมีลักษณะคล้ายฟันเลื่อย. คำว่า probing for bandwidth หมายถึง TCP ไม่มีข้อมูลแน่นอนว่า Bandwidth ที่ใช้ได้มีเท่าใด จึงเพิ่มการส่งทีละน้อยเพื่อ “หยั่ง” ความจุของเส้นทาง. เมื่อเพิ่มมากเกินไปจนเกิด Loss ก็ถอยลง แล้วเริ่ม Probe ใหม่.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ลูกศรสีเขียวชี้ช่วงเส้นที่ค่อย ๆ สูงขึ้น: Additive Increase. ลูกศรสีแดงชี้จุดที่เส้นตกลง: Multiplicative Decrease หลัง Loss Event. ยอดแต่ละรอบไม่จำเป็นต้องเท่ากัน เพราะสภาพ Network อาจเปลี่ยนตามเวลา. รูปฟันเลื่อยแสดงวงจร “เพิ่มเพื่อ Probe → พบ Loss → ลด → เพิ่มใหม่”.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - AIMD = เพิ่มแบบบวกและลดแบบคูณ. Additive Increase ประมาณ 1 MSS ต่อ RTT. Loss ทำให้ลด Sending Rate ลงอย่างมาก จึงเกิดกราฟ Sawtooth.

---

## 📄 Slide 123: TCP AIMD: การลดเมื่อพบ Loss และเหตุผลที่ใช้ AIMD

*📄 Slide 123*

สไลด์นี้ขยายรายละเอียดของ Multiplicative Decrease . TCP ไม่ได้ตอบสนองต่อ Loss ทุกชนิดเหมือนกัน เพราะวิธีตรวจพบ Loss สะท้อนระดับความรุนแรงของปัญหาใน Network ต่างกัน. เมื่อพบ Loss จาก Triple Duplicate ACK , TCP Reno ตีความว่ายังมี Segment อื่นเดินทางถึง Receiver ได้ แสดงว่า Network ยังทำงานอยู่แต่มี Segment หนึ่งสูญหาย จึงลด Sending Rate หรือ cwnd ลงประมาณครึ่งหนึ่ง แทนที่จะเริ่มใหม่จากศูนย์. เมื่อพบ Loss จาก Timeout , TCP Tahoe มองว่าสถานการณ์รุนแรงกว่า เพราะ Sender ไม่ได้รับ ACK ที่คาดหวังภายในเวลาที่กำหนด. จึงลด cwnd เหลือ 1 MSS และกลับไปเพิ่มอัตราการส่งอย่างระมัดระวัง. ส่วน “Why AIMD?” อธิบายว่า AIMD เป็น Distributed, Asynchronous Algorithm . ไม่มีศูนย์กลางสั่งให้ทุก Connection ปรับอัตราพร้อมกัน แต่ Sender แต่ละรายตัดสินใจจาก ACK, Loss และ Timer ของตนเอง และสามารถทำงานแม้เหตุการณ์ของแต่ละ Connection ไม่เกิดพร้อมกัน. สไลด์ระบุว่า AIMD มีคุณสมบัติที่ช่วยปรับอัตราของ Congested Flows ในภาพรวมของ Network และมี Stability Properties ที่เหมาะสม กล่าวคือระบบมีแนวโน้มปรับตัวเข้าสู่ภาวะที่ใช้งาน Capacity ได้โดยไม่เพิ่มหรือลดอย่างไร้การควบคุม.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์นี้เป็นข้อความสรุป ไม่มี Network Diagram หรือกราฟใหม่. หัวข้อสีแดงเน้น Multiplicative Decrease ซึ่งเป็นส่วน “ลด” ของ AIMD. สองกรณี Loss ต้องแยกกัน: Triple Duplicate ACK กับ Timeout. คำว่า TCP Reno และ TCP Tahoe เป็นชื่อแนวทาง TCP ที่ตอบสนองต่อ Loss ต่างกัน.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Triple Duplicate ACK: TCP Reno ลด cwnd ลงครึ่งหนึ่ง. Timeout: TCP Tahoe ลด cwnd เหลือ 1 MSS. AIMD เป็น Distributed และ Asynchronous ไม่ต้องมีผู้ควบคุมกลาง.

---

## 📄 Slide 124: TCP Congestion Control Details: cwnd และข้อมูล In-Flight

*📄 Slide 124*

สไลด์นี้อธิบายว่า TCP ใช้ Congestion Window ( cwnd ) จำกัดปริมาณข้อมูลที่ส่งออกไปแล้วแต่ยังไม่ได้รับ ACK. ข้อมูลกลุ่มนี้เรียกว่า In-Flight Data เพราะกำลังเดินทางหรือรอการยืนยันอยู่ใน Network. แถบ Sender Sequence Number Space แบ่งเป็นหลายสี. สีเขียวคือไบต์ที่ได้รับ ACK แล้ว; สีเหลืองคือไบต์ที่ส่งแล้วแต่ยังไม่ได้ ACK; สีน้ำเงินเข้มคือไบต์ที่อยู่ภายใน Window และพร้อมส่ง แต่ยังไม่ได้ใช้; สีเทาคือไบต์ที่อยู่นอกขอบเขต cwnd จึงยังส่งไม่ได้. ตำแหน่ง LastByteAcked คือไบต์ล่าสุดที่ Receiver ยืนยันแล้ว ส่วน LastByteSent คือไบต์ล่าสุดที่ Sender ส่งออกไป. ดังนั้นจำนวนข้อมูลที่ยังค้างโดยประมาณคือ LastByteSent − LastByteAcked . TCP บังคับให้ค่าดังกล่าวไม่เกิน cwnd . เงื่อนไขในสไลด์คือ LastByteSent − LastByteAcked ≤ cwnd . หาก ACK ใหม่มาถึง LastByteAcked จะเลื่อนไปข้างหน้า ทำให้มีพื้นที่ภายใน Window สำหรับส่งข้อมูลเพิ่ม. หาก ACK ยังไม่มา Sender อาจต้องรอ แม้ Application ยังมีข้อมูลรอส่ง. พฤติกรรมโดยประมาณคือส่งข้อมูลได้ถึง cwnd ไบต์ แล้วรอ ACK ประมาณหนึ่ง RTT ก่อนส่งเพิ่ม จึงประมาณ Sending Rate ได้ว่า TCP rate ≈ cwnd / RTT ไบต์ต่อวินาที. cwnd มากหรือ RTT น้อยจะทำให้อัตราโดยประมาณสูงขึ้น. cwnd ไม่ใช่ค่าคงที่ แต่ถูกปรับจากสัญญาณ Congestion ที่สังเกตได้. จึงเป็นกลไกฝั่ง Sender ที่เชื่อมระหว่าง ACK/Loss กับปริมาณ In-Flight Data.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สีเขียว: ACKed แล้ว; สีเหลือง: Sent but not yet ACKed; สีน้ำเงิน: Available but not used; สีเทา: นอก Window. ลูกศรแดง cwnd ครอบคลุมพื้นที่ตั้งแต่หลัง LastByteAcked ไปจนถึงขอบ Window. LastByteSent อยู่ปลายช่วงสีเหลือง แยกข้อมูลที่ส่งแล้วออกจากข้อมูลที่ยังไม่ส่ง. กล่องสมการด้านขวาเชื่อม cwnd และ RTT เข้ากับ TCP Sending Rate.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - In-Flight Data ต้องไม่เกิน cwnd. เงื่อนไขคือ LastByteSent − LastByteAcked ≤ cwnd. อัตรา TCP โดยประมาณเท่ากับ cwnd/RTT.

---

## 📄 Slide 125: TCP Slow Start: เพิ่ม cwnd แบบ Exponential

*📄 Slide 125*

Slow Start ใช้เมื่อ TCP Connection เริ่มต้น หรือเมื่อ TCP ต้องกลับมาเริ่มอย่างระมัดระวังหลัง Timeout. แม้ชื่อจะมีคำว่า “Slow” แต่ cwnd เพิ่มแบบ Exponential จึงเติบโตเร็วมากหลังผ่านไปไม่กี่ RTT. สไลด์กำหนดค่าเริ่มต้น cwnd = 1 MSS . ใน RTT แรก Host A ส่งได้หนึ่ง Segment. เมื่อ Host B รับ Segment และส่ง ACK กลับ Sender จะเพิ่ม cwnd ทำให้ RTT ถัดไปส่งได้สอง Segment. เมื่อ ACK ของสอง Segment กลับมา Sender เพิ่ม cwnd สำหรับ ACK แต่ละรายการ จึงส่งได้สี่ Segmentในรอบถัดไป. รูปแบบจำนวน Segment ต่อ RTT จึงเป็นประมาณ 1, 2, 4, 8, … ตราบใดที่ยังอยู่ใน Slow Start และไม่พบ Loss. คำว่า double cwnd every RTT เป็นผลจากการเพิ่ม cwnd สำหรับ ACK ทุกฉบับ. หากทุก Segment ได้รับ ACK อย่างต่อเนื่อง จำนวน ACK ในแต่ละรอบเพิ่มตามจำนวน Segment ส่งผลให้ Window โดยรวมเพิ่มประมาณสองเท่าต่อ RTT. ไดอะแกรมมีเส้นเวลาแนวตั้งของ Host A และ Host B. ลูกศรจาก A ไป B คือ Data Segment และลูกศรย้อนกลับคือ ACK. ระยะช่วงที่วงเล็บว่า RTT คือเวลาจากการส่งจน ACK กลับมาถึง Sender. Slow Start จึงเริ่มด้วยอัตราต่ำเพื่อไม่กระแทก Network ทันที แต่ Ramp Up แบบ Exponential จนถึงเกณฑ์เปลี่ยนไป Congestion Avoidance หรือจนพบ Loss.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รอบแรกส่ง one segment, รอบถัดไป two segments, แล้ว four segments. ลูกศรไปทางขวาคือ Data; ลูกศรย้อนกลับคือ ACK. เส้นแนวตั้งคือ Timeline ของ Host A และ Host B โดยเวลาไหลลงด้านล่าง. วงเล็บ RTT แสดงหนึ่งรอบการส่ง Data และรอ ACK.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Slow Start เริ่มที่ cwnd = 1 MSS ตามสไลด์. cwnd เพิ่มประมาณสองเท่าทุก RTT. ชื่อ Slow Start หมายถึงเริ่มจาก Window เล็ก ไม่ได้หมายถึงเติบโตช้า.

---

## 📄 Slide 126: จาก Slow Start ไป Congestion Avoidance ด้วย ssthresh

*📄 Slide 126*

TCP ไม่ควรเพิ่ม cwnd แบบ Exponential ตลอดไป เพราะจะเข้าใกล้ Capacity เร็วและเสี่ยงทำให้ Queue ล้น. จึงต้องมีจุดเปลี่ยนจาก Slow Start ซึ่งเพิ่มเร็ว ไปเป็น Congestion Avoidance ซึ่งเพิ่มแบบ Linear และระมัดระวังกว่า. ตัวแปรที่ใช้เป็นเกณฑ์คือ Slow-Start Threshold ( ssthresh ) . เมื่อ cwnd ขึ้นถึงบริเวณ Threshold TCP จะหยุดการเพิ่มแบบสองเท่าต่อ RTT และเปลี่ยนเป็นการเพิ่มทีละน้อย. เมื่อเกิด Loss Event สไลด์กำหนดให้ตั้ง ssthresh เท่ากับครึ่งหนึ่งของ cwnd ก่อนเกิด Loss. แนวคิดคือค่าก่อน Loss เป็นค่าที่สูงเกินไป ส่วนครึ่งหนึ่งเป็นจุดเริ่มต้นที่ปลอดภัยกว่าเมื่อ Connection กลับมาเพิ่มอัตราอีกครั้ง. กราฟตัวอย่างมีแกนนอนเป็น Transmission Round และแกนตั้งเป็น Congestion Window ในหน่วย Segment. ช่วงแรก Window เพิ่ม 1 → 2 → 4 → 8 แบบ Exponential. เส้นประที่ระดับ 8 คือ ssthresh . หลังจากนั้นเพิ่ม 9 → 10 → 11 → 12 แบบ Linear. เครื่องหมาย X ที่ปลายกราฟสื่อว่าเกิด Loss เมื่อ cwnd ประมาณ 12. หากใช้กฎในสไลด์ Loss นี้จะทำให้ ssthresh ใหม่เป็นประมาณครึ่งหนึ่งของ Window ก่อน Loss. กราฟนี้เน้นหลักการเปลี่ยนโหมด ไม่ได้แสดงขั้นตอนหลัง X ต่อ. ข้อความ “when cwnd gets to 1/2 of its value before timeout” หมายถึง Threshold ถูกเรียนรู้จาก Window ก่อน Loss/Timeout ครั้งก่อน ไม่ใช่การรู้ Capacity ที่แท้จริงของ Network ล่วงหน้า.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ช่วงกราฟโค้งชัน 1,2,4,8 คือ Slow Start. เส้นประ ssthresh ที่ 8 เป็นจุดเปลี่ยนจาก Exponential เป็น Linear. ช่วง 8,9,10,11,12 คือ Congestion Avoidance. X สีแดงแสดง Loss Event ที่ปลายรอบการส่ง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ssthresh เป็นเกณฑ์เปลี่ยนจาก Slow Start ไป Congestion Avoidance. เมื่อ Loss เกิด ตั้ง ssthresh = cwnd/2 ก่อน Loss ตามสไลด์. ต่ำกว่า Threshold เพิ่มเร็ว; หลัง Threshold เพิ่มแบบ Linear.

---

## 📄 Slide 127: Summary: TCP Congestion Control State Diagram

*📄 Slide 127*

สไลด์นี้รวมกลไก TCP Congestion Control เป็น State Diagram สาม State ได้แก่ Slow Start , Congestion Avoidance และ Fast Recovery . วงกลมสีเขียวคือ State ส่วนลูกศรคือเหตุการณ์และ Action ที่ทำให้ TCP อยู่ State เดิมหรือย้ายไป State ใหม่. TCP เริ่มที่ Slow Start โดยสไลด์กำหนด cwnd = 1 MSS , ssthresh = 64 KB และ dupACKcount = 0 . เมื่อได้รับ New ACK ใน Slow Start ให้เพิ่ม cwnd = cwnd + MSS และส่ง Segment ใหม่ได้ตาม Window. เมื่อ cwnd > ssthresh ตามเงื่อนไขที่เขียนในภาพ จะย้ายไป Congestion Avoidance. ใน Congestion Avoidance เมื่อได้รับ New ACK ใช้สูตร cwnd = cwnd + MSS × (MSS/cwnd) . การเพิ่มเล็กน้อยต่อ ACK นี้รวมกันแล้วได้ประมาณ 1 MSS ต่อ RTT จึงเป็น Additive Increase แบบ Linear. ถ้าได้รับ Duplicate ACK ให้เพิ่ม dupACKcount . เมื่อครบสาม Duplicate ACK ให้ถือว่า Segment หนึ่งน่าจะสูญหาย ตั้ง ssthresh = cwnd/2 , ตั้ง cwnd = ssthresh + 3 , Retransmit Missing Segment และเข้าสู่ Fast Recovery. ใน Fast Recovery Duplicate ACK เพิ่มเติมทำให้ cwnd = cwnd + MSS และอาจส่ง Segment ใหม่ตามที่ Window อนุญาต. เมื่อได้รับ New ACK ซึ่งยืนยันข้อมูลที่ส่งซ้ำแล้ว ให้ตั้ง cwnd = ssthresh , ล้าง dupACKcount และกลับไป Congestion Avoidance. หากเกิด Timeout จาก State ใดก็ตาม สไลด์ให้ตั้ง ssthresh = cwnd/2 , ลด cwnd เหลือ 1 MSS, ล้าง Duplicate ACK Count, Retransmit Missing Segment และกลับไป Slow Start. Timeout จึงเป็นสัญญาณที่ทำให้ TCP ลดการส่งแรงกว่าสาม Duplicate ACK. สัญลักษณ์นาฬิกาแทน Timeout และรูปดาว “New ACK!” เน้น ACK ใหม่ที่ทำให้ Window เดินหน้าต่อ. ตัวอักษร Λ บนลูกศรหมายถึง Transition ที่ไม่มีเหตุการณ์ภายนอกเพิ่มเติมหรือทำทันทีเมื่อเงื่อนไข State เป็นจริง.


> [!DEFINITION] TCP Congestion Control Phases
> 1. **Slow Start:** $cwnd$ เริ่มจาก 1 MSS, เพิ่มเป็นสองเท่าทุก RTT (exponential)
> 2. **Congestion Avoidance:** เมื่อ $cwnd \geq ssthresh$ → เพิ่มทีละ 1 MSS ต่อ RTT (linear, AIMD)
> 3. **Fast Recovery (TCP Reno):** เมื่อได้ 3 Duplicate ACKs → $ssthresh = cwnd/2$, $cwnd = ssthresh + 3$
> 4. **Timeout:** เมื่อ Timeout → $ssthresh = cwnd/2$, $cwnd = 1$ MSS (กลับ Slow Start)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สามวงกลมคือ Slow Start, Congestion Avoidance และ Fast Recovery. ลูกศรวนกลับเข้า State เดิมแสดงเหตุการณ์ที่ไม่ต้องเปลี่ยน State เช่น New ACK หรือ Duplicate ACK บางจำนวน. ลูกศรลงสู่ Fast Recovery เกิดเมื่อ dupACKcount == 3. ลูกศร Timeout จากทุก State กลับไป Slow Start พร้อมลด cwnd เหลือ 1 MSS. ลูกศร New ACK จาก Fast Recovery กลับ Congestion Avoidance โดยตั้ง cwnd = ssthresh.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - สาม State หลัก: Slow Start, Congestion Avoidance, Fast Recovery. Three Duplicate ACKs → Fast Recovery; Timeout → Slow Start. New ACK ใน Fast Recovery ทำให้กลับ Congestion Avoidance.

---

## 📄 Slide 128: TCP CUBIC: Probe Bandwidth เร็วขึ้นแต่ระวังใกล้ Wmax

*📄 Slide 128*

TCP CUBIC ถูกเสนอเพื่อ Probe Bandwidth ให้มีประสิทธิภาพกว่าการเพิ่มแบบเส้นตรงของ Classic AIMD โดยเฉพาะเส้นทางที่มี Bandwidth สูงหรือ RTT สูง ซึ่งการเพิ่มเพียงประมาณ 1 MSS ต่อ RTT อาจใช้เวลานานกว่าจะกลับไปใช้งาน Capacity ได้เต็มที่. W max คือขนาด Window หรือ Sending Rate ที่ตรวจพบ Congestion Loss ครั้งล่าสุด. หลัง Loss Window ถูกลดลงเป็นประมาณ W max /2 . CUBIC ใช้ข้อมูลว่า Bottleneck Link อาจยังมีสภาพใกล้เคียงกับก่อนเกิด Loss จึงพยายามกลับไปใกล้ W max เร็วกว่าการเพิ่มแบบ Linear. อย่างไรก็ตาม เมื่อเข้าใกล้ W max CUBIC จะเพิ่มอย่างช้าลงเพื่อไม่พุ่งข้ามจุดที่เคยทำให้ Loss ทันที. จึงเกิดแนวคิด “เร็วเมื่อยังห่างจากจุดเดิม แต่ระมัดระวังเมื่อใกล้จุดเดิม”. กราฟเส้นสีแดงคือ Classic TCP ซึ่งเพิ่ม Window เป็นเส้นตรงจาก W max /2 ไป W max . เส้นประสีน้ำเงินคือ CUBIC ซึ่งโค้งขึ้นเร็วในช่วงต้นแล้วแบนลงเมื่อเข้าใกล้ W max . ในตัวอย่าง พื้นที่ใต้เส้น CUBIC มากกว่า จึงให้ Throughput สูงกว่า. เมื่อเกิด Loss อีกครั้ง ทั้งสองแนวทางลด Window แล้วเริ่ม Probe ใหม่. กราฟจึงยังมีรูปแบบขึ้นและตกซ้ำ แต่เส้นทางการเพิ่มของ CUBIC ไม่ใช่เส้นตรงแบบ AIMD.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> แกนตั้งแสดง Window/Sending Rate โดยทำเครื่องหมาย Wmax และ Wmax/2. เส้นแดงทึบคือ Classic TCP เพิ่มแบบ Linear. เส้นประน้ำเงินคือ CUBIC เพิ่มเร็วเมื่อไกล Wmax และช้าลงเมื่อใกล้ Wmax. เส้นตกแนวตั้งที่ยอดแต่ละรอบแทนการลด Window หลัง Loss.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Wmax คือ Window ที่พบ Congestion Loss ครั้งก่อน. CUBIC กลับเข้าหา Wmax เร็วกว่าช่วงต้น แต่ระวังเมื่อใกล้ Wmax. เป้าหมายคือใช้ Bandwidth ได้มากกว่าการ Probe แบบ Linear ในบางเส้นทาง.

---

## 📄 Slide 129: TCP CUBIC: จุด K และการเพิ่มแบบฟังก์ชันกำลังสาม

*📄 Slide 129*

สไลด์นี้อธิบายกลไกของ CUBIC ให้ชัดขึ้นด้วยจุด K . K คือจุดเวลาโดยประมาณที่ CUBIC คาดว่า Window จะกลับไปถึง W max ซึ่งเป็น Window ก่อนเกิด Loss ครั้งล่าสุด. ค่า K สามารถปรับหรือ Tune ได้ตามการทำงานของ Algorithm. CUBIC เพิ่ม Window เป็นฟังก์ชันของ กำลังสามของระยะห่างระหว่างเวลาปัจจุบันกับ K . เมื่อเวลายังห่างจาก K มาก ค่าการเพิ่มมีขนาดใหญ่ จึง Ramp Up เร็ว. เมื่อเข้าใกล้ K ระยะห่างมีค่าน้อย การเพิ่มจึงเล็กและระมัดระวัง. หลังผ่าน K และ Window สูงกว่า W max หากยังไม่พบ Loss CUBIC จะเริ่มเพิ่มเร็วขึ้นอีก เพื่อ Probe ว่า Network มี Capacity ใหม่มากกว่าครั้งก่อนหรือไม่. ลักษณะนี้ทำให้เส้นโค้งแบนใกล้ K และชันขึ้นเมื่อไกลจาก K ทั้งสองด้าน. กราฟล่างซ้ายเปรียบเทียบ TCP Reno สีแดงกับ TCP CUBIC สีน้ำเงิน. หลัง Loss แต่ละรอบ Reno เพิ่มเป็นเส้นตรง ส่วน CUBIC ใช้เส้นโค้งที่กลับไปใกล้ W max ได้เร็ว แต่ชะลอรอบจุดเดิมก่อน Probe ต่อ. จุด t 0 … t 4 เป็นช่วงเวลาหลัง Loss แต่ละรอบ ใช้แสดงว่า CUBIC คำนวณ Window จากเวลา ไม่ได้เพิ่มเพียงค่าคงที่ต่อ RTT แบบ Classic AIMD. ตามข้อความในสไลด์ TCP CUBIC เป็น Default ใน Linux และเป็น TCP ที่ใช้แพร่หลายใน Popular Web Servers จนถึงประมาณปี 2024. ข้อความนี้เป็นบริบทตามสไลด์ต้นฉบับ.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> K คือเวลาที่เส้น CUBIC คาดว่าจะถึง Wmax. ช่วงไกล K เพิ่มมาก; ช่วงใกล้ K เพิ่มน้อย. เส้นแดง TCP Reno เป็นฟันเลื่อยเชิงเส้น; เส้นน้ำเงิน CUBIC เป็นเส้นโค้ง. t0–t4 แสดงรอบเวลาระหว่าง Loss Events ต่อเนื่อง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - CUBIC ใช้ระยะเวลาเทียบกับ K ในการกำหนด Window. ใกล้ K เพิ่มอย่างระมัดระวัง; ไกล K เพิ่มเร็วกว่า. หลังผ่าน Wmax แล้ว CUBIC Probe Capacity ที่สูงขึ้นต่อได้.

---

## 📄 Slide 130: TCP และ Congested Bottleneck Link

*📄 Slide 130*

สไลด์นี้เชื่อม Algorithm ฝั่ง TCP Sender เข้ากับเหตุการณ์จริงใน Network Core. ทั้ง Classic TCP และ TCP CUBIC เพิ่ม Sending Rate จน Packet Loss เกิดที่ Output ของ Router ใด Router หนึ่ง ซึ่งจุดที่จำกัด Throughput ของเส้นทางเรียกว่า Bottleneck Link . ไดอะแกรมแสดง Protocol Stack ของ Source และ Destination: Application, TCP, Network, Link และ Physical. Data ออกจาก TCP ที่ Source ผ่าน Router หลายตัวใน Network Core แล้วขึ้น TCP และ Application ที่ Destination. เส้นทางสีแดงและจุดที่วงไว้ด้านล่างคือ Bottleneck Link. Link นี้เป็นส่วนที่มี Available Capacity ต่ำที่สุดเมื่อเทียบกับ Traffic ที่ต้องผ่าน จึงมี Packet Queue สะสมที่ Output Buffer ของ Router ก่อนหน้า. ข้อความสีแดง packet queue almost never empty, sometimes overflows packet (loss) หมายถึง TCP Congestion Control มัก Probe จน Queue ที่ Bottleneck มี Packet รออยู่เกือบตลอด. เมื่ออัตราเข้าชั่วขณะสูงกว่าที่ Link ส่งออกได้ Buffer อาจเต็มและเกิด Packet Loss. ข้อความ bottleneck link (almost always busy) สื่อว่าการเพิ่มอัตราของ TCP มีเป้าหมายให้ Link ที่เป็นคอขวดถูกใช้งานสูง เพื่อให้ Throughput ดี. แต่การรักษา Link ให้ Busy มากเกินไปย่อมแลกกับ Queueing Delay และความเสี่ยง Buffer Overflow. ดังนั้น Loss ไม่ได้เกิด “ที่ TCP Layer” โดยตรง แต่เกิดจาก Queue/Buffer ใน Router ภายในเส้นทาง. TCP ที่ End Host สังเกตผลผ่าน Duplicate ACK หรือ Timeout แล้วปรับ cwnd เพื่อตอบสนองต่อ Bottleneck ที่มองไม่เห็นโดยตรง.


```
[ Packet Switching: Store-and-Forward ]
Source ──(Packet 1)──> [ Router Queue: | P3 | P2 | P1 | ] ──(Output Link)──> Next Hop
                       (รอคิวใน Buffer ก่อนส่งออก)
                       *** ถ้า Buffer เต็ม → Packet Loss! ***
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Source และ Destination แสดง Layer Stack เหมือนกัน โดย TCP อยู่ระหว่าง Application กับ Network. Router หลายตัวตรงกลางคือ Network Core และเส้นสีน้ำเงินคือเส้นทาง Packet. วงสีแดงเน้น Output Queue ที่สะสม Packet ก่อน Bottleneck Link. ลูกศร/ข้อความแดงชี้ว่าคิวเกือบไม่ว่างและบางครั้ง Overflow ทำให้ Loss. ข้อความใต้ Link เน้นว่า Bottleneck Link ถูกใช้งานเกือบตลอดเวลา.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Bottleneck Link คือจุดจำกัด Throughput ของเส้นทาง. Packet Loss มักเกิดเมื่อ Output Queue ก่อน Bottleneck Overflow. TCP ปรับ cwnd จากสัญญาณ Loss/ACK แม้ไม่เห็น Router Queue โดยตรง.

---

## 📄 Slide 131: TCP and the Congested Bottleneck Link

*📄 Slide 131*

สไลด์นี้เชื่อมการปรับอัตราส่งของ TCP เข้ากับจุดที่เกิด Congestion จริงในเครือข่าย. ทั้ง Classic TCP และ TCP CUBIC จะค่อย ๆ เพิ่ม Sending Rate จนเกิด Packet Loss ที่ Output ของ Router บางตัว. Link ที่จำกัดอัตราการส่งของเส้นทางนี้เรียกว่า Bottleneck Link . ไดอะแกรมแสดง Source และ Destination ซึ่งมี Protocol Stack ได้แก่ Application, TCP, Network, Link และ Physical. ระหว่างสองปลายทางมี Router หลายตัว และ Link สีแดงที่มีอัตรา R คือ Bottleneck Link. กล่องสีแดงที่สะสมก่อน Link แทน Packet Queue ที่ Output Buffer ของ Router. เมื่อ Bottleneck Link ส่งข้อมูลเต็มอัตรา R อยู่แล้ว การเพิ่ม TCP Sending Rate ต่อไปจะไม่ทำให้ End-to-End Throughput สูงขึ้น เพราะ Link คอขวดไม่สามารถส่งออกได้เร็วกว่านี้. ข้อมูลที่ส่งเพิ่มจึงไปสะสมใน Queue แทน. ผลที่เห็นได้คือ Measured RTT เพิ่มขึ้น เนื่องจาก Packet ต้องรอใน Queue นานขึ้น. ลูกศร RTT ที่พาดจาก Source ไป Destination และกลับมา แสดงว่า Queueing Delay ที่ Bottleneck เป็นส่วนหนึ่งของเวลารอ ACK. เป้าหมายที่สไลด์สรุปว่า “keep the end-to-end pipe just full, but not fuller” หมายถึงควรมีข้อมูล In-Flight มากพอให้ Bottleneck Link ทำงานต่อเนื่อง แต่ไม่มากจนเกิด Queue ยาว Delay สูง หรือ Buffer Overflow.


```
[ Packet Switching: Store-and-Forward ]
Source ──(Packet 1)──> [ Router Queue: | P3 | P2 | P1 | ] ──(Output Link)──> Next Hop
                       (รอคิวใน Buffer ก่อนส่งออก)
                       *** ถ้า Buffer เต็ม → Packet Loss! ***
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Source และ Destination มี TCP อยู่เหนือ Network Layer; Router ตรงกลางเป็น Network Core. Link สีแดงที่ระบุ R คือ Bottleneck Link และก้อนสีแดงหน้าลิงก์คือ Packet Queue. การเพิ่มอัตราส่งเมื่อ Link เต็มแล้วเพิ่ม RTT จาก Queueing Delay แต่ไม่เพิ่ม Throughput. ข้อความ Goal ใต้ภาพสรุปหลัก “เต็มพอดี แต่ไม่ล้น”.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Bottleneck Link เป็นจุดที่จำกัด End-to-End Throughput. เมื่อ Bottleneck เต็ม การส่งเพิ่มสร้าง Queue และเพิ่ม RTT. เป้าหมายคือใช้ Link ให้เต็มโดยไม่สร้าง Buffering เกินจำเป็น.

---

## 📄 Slide 132: หลาย TCP Flows ใช้ Bottleneck Link ร่วมกัน

*📄 Slide 132*

ในเครือข่ายจริง Bottleneck Link มักไม่ได้ถูกใช้โดย TCP Connection เพียงรายเดียว. ภาพแสดง Source หลายเครื่องทางซ้ายส่งข้อมูลผ่าน Network Core ไปยัง Destination หลายเครื่องทางขวา โดย Traffic ของทุก Flow ต้องผ่านส่วนกลางเดียวกัน. แต่ละ Flow ดำเนิน TCP Congestion Control ของตนเอง . กล่าวคือแต่ละ Sender ปรับ cwnd จาก ACK, Loss และ RTT ที่ตนสังเกตได้ โดยไม่มีตัวควบคุมกลางคอยแบ่ง Bandwidth ให้ทุก Connection โดยตรง. แม้แต่ละ Flow ตัดสินใจแยกกัน แต่ Sending Rate รวมของทุก Flow สามารถทำให้ Bottleneck Link เกิด Congestion ร่วมกันได้. กอง Packet สีแดงในส่วนกลางจึงแทน Queue ที่เกิดจาก Traffic ของหลาย Connection มารวมกัน. หาก Bottleneck Link มี Capacity เท่ากับ R และมี Flow จำนวน N Flow สไลด์เสนอเป้าหมายเชิงอุดมคติว่าแต่ละ Flow ควรได้รับ Throughput เฉลี่ยประมาณ R/N . แนวคิดนี้จะนำไปสู่หัวข้อ TCP Fairness ในสไลด์ท้าย ๆ ของชุดนี้. คำว่า “ควรได้รับ R/N ” เป็น Fairness Goal ไม่ได้หมายความว่า Throughput ทุก Flow ต้องเท่ากันทุกขณะ เพราะแต่ละ Connection ยังปรับ Window และรับ ACK ตามจังหวะของตนเอง.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คอมพิวเตอร์หมายเลข 1, 2, …, N แทนหลาย TCP Flows. เส้นประจากแต่ละ Host มารวมที่ Network Core แสดงเส้นทางที่ใช้ Bottleneck ร่วมกัน. กอง Packet สีแดงตรงกลางแสดง Queue ที่เกิดจาก Traffic รวม. Capacity R ถูกแบ่งในอุดมคติเป็นประมาณ R/N ต่อ Flow.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Congestion เกิดจากผลรวมของหลาย Flows แม้แต่ละ Flow ควบคุมตนเอง. Fair Share ในอุดมคติของ N Flows คือ R/N. TCP Congestion Control เป็นแบบ Distributed ไม่มีผู้แบ่ง Bandwidth กลาง.

---

## 📄 Slide 133: Keeping the Pipe Just Full Enough: Bandwidth–Delay Product

*📄 Slide 133*

แนวคิดของสไลด์นี้คือรักษา “ท่อ” End-to-End ให้มีข้อมูลพอดี เพื่อให้ Bottleneck Link มี Packet ส่งตลอดเวลา แต่หลีกเลี่ยง Queueing Delay และ Buffering ที่สูงเกินไป. ภาพท่อยาวแทนเส้นทางจาก Sender ไป Receiver. ก้อนข้อมูลภายในท่อคือข้อมูลที่ส่งออกไปแล้วแต่ยังไม่ได้รับ ACK หรือ In-Flight Data . สัญลักษณ์ n inflight จึงหมายถึงปริมาณข้อมูลทั้งหมดที่กำลังค้างอยู่ในเส้นทาง. สไลด์วัด Throughput โดยประมาณจาก จำนวนไบต์ที่ส่งและอยู่ In-Flight ในช่วง RTT ÷ RTT . กล่าวง่าย ๆ คือดูว่าภายในหนึ่งรอบเวลา RTT สามารถส่งข้อมูลผ่านไปได้กี่ไบต์. ปริมาณ In-Flight ที่เหมาะสมสำหรับหนึ่ง Connection ถูกเขียนเป็น ส่วนแบ่ง Bottleneck Bandwidth ของ Connection × min_RTT . ผลคูณระหว่างอัตราส่งกับเวลาเรียกว่า Bandwidth–Delay Product (BDP) . min_RTT ใช้แทน RTT ต่ำสุดที่สังเกตได้ในช่วงที่ Queue มีน้อย จึงช่วยประมาณเวลาพื้นฐานของเส้นทาง. เมื่อนำมาคูณกับส่วนแบ่ง Bottleneck Bandwidth จะได้จำนวนข้อมูลที่ควรมีอยู่ในท่อเพื่อให้ Link ทำงานเต็ม โดยยังไม่จำเป็นต้องสร้าง Queue เพิ่ม. ดังนั้น BDP ไม่ใช่อัตราส่ง แต่เป็น ปริมาณข้อมูล ที่ควรอยู่ระหว่างทาง. หาก In-Flight น้อยกว่านี้ Link อาจว่างเป็นช่วง ๆ; หากมากเกินไป ข้อมูลส่วนเกินจะเริ่มสะสมใน Buffer.


```
[ Packet Switching: Store-and-Forward ]
Source ──(Packet 1)──> [ Router Queue: | P3 | P2 | P1 | ] ──(Output Link)──> Next Hop
                       (รอคิวใน Buffer ก่อนส่งออก)
                       *** ถ้า Buffer เต็ม → Packet Loss! ***
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ท่อแนวนอนแทน End-to-End Path; ก้อนสีแดงภายในท่อแทน In-Flight Data. วงเล็บ RTTmeasured แสดงช่วงเวลาที่ใช้คำนวณ Throughput. สูตรด้านขวาเชื่อมจำนวนไบต์ In-Flight กับ RTT เพื่อประมาณ Measured Throughput. สูตรด้านล่างนิยาม Ideal In-Flight Data เป็น Bottleneck Bandwidth Share × min_RTT หรือ BDP.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - BDP = Bandwidth × Delay และมีหน่วยเป็นปริมาณข้อมูล. Ideal In-Flight Data ≈ Connection Share of Bottleneck Bandwidth × min_RTT. ข้อมูลน้อยเกินไปทำให้ Link ไม่เต็ม; มากเกินไปทำให้เกิด Queue.

---

## 📄 Slide 134: ความสัมพันธ์ระหว่าง In-Flight Data กับ RTT

*📄 Slide 134*

กราฟนี้มีแกนนอนเป็น n inflight หรือปริมาณ In-Flight Data และแกนตั้งเป็น RTT. จุดสำคัญคือเส้นประแนวตั้งที่ Bandwidth–Delay Product ซึ่งเป็นปริมาณข้อมูลที่ทำให้ท่อถูกเติมเต็มพอดี. บริเวณซ้ายของ BDP เส้น RTT เป็นแนวนอน. ในช่วงนี้ Arrival Rate ของ Packet เข้าสู่ Queue ยังต่ำกว่าอัตราที่ Bottleneck Link ส่งออกได้ ดังนั้นการเพิ่ม In-Flight Data จะช่วยให้ Link ถูกใช้งานมากขึ้น แต่ยังไม่สร้าง Queueing Delay เพิ่มอย่างมีนัยสำคัญ. ที่จุด BDP Arrival Rate ของ Packet เท่ากับ Link Transmission Rate. นี่คือ “หัวเข่า” ของกราฟ ซึ่งท่อเต็มพอดีและ Bottleneck Link ทำงานต่อเนื่อง โดยยังไม่มีข้อมูลส่วนเกินสะสมมากใน Buffer. เมื่อขยับไปทางขวาของ BDP Arrival Rate สูงกว่าอัตราที่ Link ส่งออกได้. Packet ส่วนเกินจึงรอใน Queue ทำให้ RTT เพิ่มขึ้นตามปริมาณ In-Flight Data. เส้นกราฟจึงเริ่มเอียงสูงขึ้น. เส้นประขวาสุดระบุ BDP + Queueing Data ใน Bottleneck Buffer ที่เต็ม . เมื่อ Buffer เข้าใกล้เต็ม ระบบเข้าสู่บริเวณ Bottleneck Link Congestion และ Packet ใหม่มีโอกาสถูก Drop. แก่นของภาพคือ RTT ไม่ได้เพิ่มเพราะข้อมูลเดินทางไกลขึ้น แต่เพิ่มเพราะมีข้อมูลส่วนเกินรอใน Router Queue หลังจาก Pipe ถูกเติมเต็มแล้ว.


```
[ Packet Switching: Store-and-Forward ]
Source ──(Packet 1)──> [ Router Queue: | P3 | P2 | P1 | ] ──(Output Link)──> Next Hop
                       (รอคิวใน Buffer ก่อนส่งออก)
                       *** ถ้า Buffer เต็ม → Packet Loss! ***
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ช่วงเส้นราบ: In-Flight เพิ่มแต่ RTT ยังไม่เพิ่ม เพราะ Link ยังรับ Traffic ได้. เส้นประแรกที่ BDP: Arrival Rate เท่ากับ Transmission Rate. ช่วงเส้นเอียง: In-Flight ส่วนเกินกลายเป็น Queueing Delay. เส้นประขวาสุด: Buffer เต็มและเข้าสู่ Bottleneck Congestion.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ต่ำกว่า BDP การเพิ่ม In-Flight ช่วยเติม Pipe. เกิน BDP การเพิ่ม In-Flight ส่วนใหญ่เพิ่ม Queue และ RTT. RTT ที่สูงขึ้นหลังจุด BDP เป็นสัญญาณของ Queueing.

---

## 📄 Slide 135: จุดทำงานของ Loss-Based TCP เทียบกับ BBR

*📄 Slide 135*

สไลด์นี้วางกราฟสองตัวเหนือแกนนอนเดียวกันคือ n inflight . กราฟบนแสดง RTT และกราฟล่างแสดง Throughput เพื่อเปรียบเทียบว่าเมื่อเพิ่ม In-Flight Data จะเกิดอะไรขึ้นกับทั้ง Delay และอัตราส่ง. ช่วงซ้ายของ BDP Throughput เพิ่มขึ้นตาม In-Flight Data เพราะ Pipe ยังไม่เต็ม. ขณะเดียวกัน RTT ยังอยู่ใกล้ค่าต่ำสุด. เมื่อถึง BDP Arrival Rate เท่ากับ Bottleneck Transmission Rate และ Throughput แตะระดับสูงสุดที่ Link รองรับ. หลังผ่าน BDP Throughput ไม่เพิ่มต่ออย่างมีสาระ เพราะ Bottleneck Link อิ่มตัวแล้ว แต่ RTT สูงขึ้นจาก Queueing Delay. ดังนั้นการส่งข้อมูลเพิ่มในบริเวณนี้แลก Delay ที่มากขึ้นโดยไม่ได้ Throughput เพิ่ม. ข้อความ BBR TCP seeks to operate here ชี้บริเวณใกล้หัวเข่าที่ BDP: Pipe เต็มพอดี แต่ Queue ยังต่ำ. BBR จึงพยายามควบคุม In-Flight Data ให้ใกล้ค่าที่ใช้ Capacity ได้เต็มโดยไม่เติม Buffer เกินจำเป็น. ข้อความ loss-based TCP seeks to operate here ชี้บริเวณด้านขวาใกล้ Buffer เต็ม. TCP ที่ใช้ Loss เป็นสัญญาณจะเพิ่ม Window ต่อไปจนเกิด Drop จึงมักสร้าง Queue ก่อนที่จะรู้ว่าอัตราส่งสูงเกินไป. ภาพไม่ได้บอกว่า BBR ไม่มี Queue เลย แต่สื่อเป้าหมายว่า BBR ใช้ข้อมูล Bottleneck Bandwidth และ RTT เพื่อหาจุด “just full, but no fuller” แทนการรอ Loss เป็นหลัก.

| กลไก AIMD | การทำงาน | วัตถุประสงค์เชิงวิศวกรรม |
| :--- | :--- | :--- |
| 📈 **Additive Increase (AI)** | เพิ่มขนาด $cwnd$ ขึ้น $+1\text{ MSS}$ ทุกๆ $1\text{ RTT}$ | ค่อยๆ สำรวจหาแบนด์วิดท์ที่ว่างอย่างระมัดระวัง |
| 📉 **Multiplicative Decrease (MD)** | ลดขนาด $cwnd$ ลงครึ่งหนึ่ง ($\frac{cwnd}{2}$) เมื่อเกิด Packet Loss | ผ่อนคลายความหนาแน่นในเครือข่ายทันที เกิดกราฟฟันปลา (Sawtooth) |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> กราฟบน: RTT คงที่ก่อน BDP แล้วสูงขึ้นจาก Queueing. กราฟล่าง: Throughput เพิ่มก่อน BDP แล้วเข้าสู่ Plateau หลัง Link อิ่มตัว. จุด BBR อยู่ใกล้หัวเข่าที่ Pipe เต็มพอดี. จุด Loss-Based TCP อยู่ขวากว่า ใกล้บริเวณ Buffer เต็มและ Loss.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - หลัง BDP การเพิ่ม In-Flight ไม่เพิ่ม Throughput แต่เพิ่ม RTT. BBR มุ่งทำงานใกล้จุด BDP. Loss-Based TCP มักเพิ่มจน Queue เต็มและเกิด Loss.

---

## 📄 Slide 136: BBR: Bottleneck Bandwidth and RTT

*📄 Slide 136*

BBR ย่อจาก Bottleneck Bandwidth and RTT . ตามสไลด์ BBR ควบคุม n inflight โดยอาศัยอัตราที่เครือข่ายส่งข้อมูลได้จริงและค่า RTT ต่ำสุดที่วัดได้ เพื่อรักษา Pipe ให้เต็มพอดี. ในช่วงเวลาที่ยาวกว่า BBR จะลด In-Flight Data เป็นระยะเพื่อให้ Pipe และ Queue ระบายออก แล้ววัด min_RTT ใหม่. หากไม่ลด Queue บ้าง RTT ที่วัดได้อาจรวม Queueing Delay จนไม่เห็นค่าพื้นฐานที่ต่ำกว่า. ในช่วงเวลาที่สั้นกว่า สไลด์อธิบายพฤติกรรมสามช่วง. Acceleration คือเพิ่ม Sending Rate และ In-Flight Data จน Throughput ถึง Plateau ซึ่งหมายถึงใช้ Available Per-Flow Link Capacity เต็มแล้ว. Cruising คือส่งในอัตราใกล้กับอัตราที่ Network กำลังส่งข้อมูลออกได้ โดยอาศัย ACK ที่กลับมาเป็นหลักฐานว่า Data ถูกส่งถึงปลายทางด้วยอัตราเท่าใด. Deceleration คือจงใจลด In-Flight Data เพื่อลดแรงกดดันต่อ Queue และค้นหาค่า min_RTT ที่ต่ำลง. หลังจากนั้น Algorithm จึงสามารถปรับรอบการส่งใหม่ตามสภาพ Network. สามคำนี้อธิบายการเร่ง ใช้อัตราคงที่ และผ่อนอัตราเพื่อประมาณสภาพ Bottleneck ไม่ได้หมายถึง TCP Connection หยุดส่งข้อมูลทั้งหมดในช่วง Deceleration.


```
[ Packet Switching: Store-and-Forward ]
Source ──(Packet 1)──> [ Router Queue: | P3 | P2 | P1 | ] ──(Output Link)──> Next Hop
                       (รอคิวใน Buffer ก่อนส่งออก)
                       *** ถ้า Buffer เต็ม → Packet Loss! ***
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์เป็นรายการกลไก ไม่มี Network Diagram เพิ่มเติม. Longer interval: ลด In-Flight เพื่อ Drain Pipe และวัด min_RTT ใหม่. Shorter interval: Acceleration → Cruising → Deceleration. ACK ใช้สะท้อนอัตราที่ Network กำลัง Deliver Data ได้จริง.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - BBR ประมาณ Bottleneck Bandwidth และ min_RTT. Acceleration หา Capacity; Cruising รักษาอัตรา; Deceleration ลด Queue. BBR ปรับ n_inflight แทนการรอ Packet Loss เพียงอย่างเดียว.

---

## 📄 Slide 137: Explicit Congestion Notification (ECN)

*📄 Slide 137*

เป็นตัวอย่างของ Network-Assisted Congestion Control . แทนที่จะรอให้ Router Buffer Overflow และเกิด Packet Loss, Router สามารถทำเครื่องหมายใน IP Header เพื่อแจ้งว่าเส้นทางเริ่มมี Congestion. สไลด์ระบุว่าใช้สองบิตใน IP Header บริเวณ ToS Field. Policy ว่า Router จะ Mark เมื่อใดขึ้นอยู่กับ Network Operator. ในภาพ IP Datagram เริ่มด้วยค่า ECN=10 และเมื่อผ่าน Congested Router ถูกเปลี่ยนเป็น ECN=11 . Congestion Indication เดินทางไปกับ IP Datagram จนถึง Destination. เมื่อ Destination ได้รับสัญญาณนี้ จะตั้ง ECE Bit = 1 ใน TCP ACK Segment ที่ส่งย้อนกลับไปยัง Source เพื่อแจ้ง Sender ว่า Network พบ Congestion. ลูกศรด้านล่างจึงเป็น Data/IP Datagram เดินจาก Source ไป Destination ส่วนลูกศรด้านบนเป็น TCP ACK เดินกลับ. กล่อง ECE=1 บน ACK แสดงการส่งต่อข้อมูล Congestion จาก Receiver กลับถึง Sender. ECN จึงเกี่ยวข้องทั้ง IP และ TCP: IP ใช้ ECN Bits สำหรับการ Mark ภายใน Network ส่วน TCP ใช้ C/E Bits ใน TCP Header เพื่อสื่อสารสถานะกับ End Hosts. จุดสำคัญคือ Congestion สามารถถูกรายงานโดยไม่จำเป็นต้อง Drop Packet นั้นก่อน.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Source ส่ง IP Datagram ที่มี ECN=10 ผ่าน Router. Congested Router Mark ค่าเป็น ECN=11 ตาม Policy ของเครือข่าย. Destination รับ Congestion Indication และตั้ง ECE=1 ใน TCP ACK. ACK เดินกลับด้านบนไปแจ้ง Source; จึงมีทั้ง IP-Layer และ TCP-Layer Signaling.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - ECN แจ้ง Congestion ด้วยการ Mark แทนการรอ Loss. Router Mark IP Header; Destination ส่ง ECE ใน TCP ACK. ECN เป็น Network-Assisted Congestion Control.

---

## 📄 Slide 138: TCP Fairness: เป้าหมายการแบ่ง Bottleneck Capacity

*📄 Slide 138*

Fairness ในสไลด์นี้หมายถึงการแบ่ง Capacity ของ Bottleneck Link ระหว่าง TCP Sessions ที่แข่งขันกัน. หากมี TCP Sessions จำนวน K Session ใช้ Bottleneck Link ที่มี Bandwidth R ร่วมกัน เป้าหมายคือแต่ละ Session มี Average Rate ประมาณ R/K . ไดอะแกรมแสดง TCP Connection 1 และ TCP Connection 2 เข้าสู่ Bottleneck Router เดียวกัน. ส่วน Link หลัง Router มี Capacity R จึงเป็นทรัพยากรที่ทั้งสอง Connection ต้องแบ่งกัน. กรณีสอง Connection ภายใต้เป้าหมายนี้ แต่ละ Connection ควรได้รับ Average Throughput ใกล้ R/2 . คำว่า Average สำคัญ เพราะ AIMD ทำให้ Window และ Throughput เพิ่ม–ลดเป็นรอบ จึงไม่จำเป็นต้องเท่ากันทุกขณะ. Fairness Goal ไม่ได้หมายความว่า Router สร้างช่อง Bandwidth คงที่แยกให้แต่ละ Flow. การแบ่งเกิดจาก Sender แต่ละรายปรับอัตราด้วย TCP Congestion Control แล้วมีแนวโน้มเข้าหาส่วนแบ่งที่ใกล้กันภายใต้เงื่อนไขที่เหมาะสม. สไลด์ถัดไปจะใช้กราฟสองแกนเพื่ออธิบายว่าทำไม Additive Increase และ Multiplicative Decrease จึงสามารถพา Throughput ของสอง TCP Connections เข้าใกล้ Equal Share.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นสีเขียวและสีน้ำเงินแทน TCP Connection 1 และ 2. ทั้งสอง Flow รวมกันที่ Bottleneck Router. Link หลัง Router มี Capacity R ซึ่งต้องแบ่งระหว่าง K Sessions. สำหรับ K=2 เป้าหมายเฉลี่ยคือประมาณ R/2 ต่อ Connection.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Fairness Goal: K Sessions แบ่ง Capacity R เป็น R/K โดยเฉลี่ย. Fairness พิจารณาที่ Bottleneck Link ที่ใช้ร่วมกัน. อัตราอาจแกว่ง แต่ Average Share ควรเข้าใกล้กัน.

---

## 📄 Slide 139: TCP ยุติธรรมหรือไม่? การมองผ่านกราฟ AIMD

*📄 Slide 139*

กราฟใช้แกนนอนเป็น Throughput ของ Connection 1 และแกนตั้งเป็น Throughput ของ Connection 2. จุดใด ๆ บนกราฟจึงแทนอัตราของทั้งสอง Connection ในเวลาเดียวกัน. ตัวอักษร R ที่ปลายแกนคือ Capacity ของ Bottleneck Link. เส้นทึบสีน้ำเงินที่ลาดลงแทนขอบเขต Throughput 1 + Throughput 2 = R . จุดเหนือเส้นนี้ต้องการ Capacity รวมเกิน Bottleneck จึงนำไปสู่ Congestion. เส้นประที่ลาดขึ้นคือ Equal Bandwidth Share ซึ่ง Connection ทั้งสองมี Throughput เท่ากัน. ในช่วง Congestion Avoidance ทั้งสอง TCP Connections ใช้ Additive Increase และเพิ่ม Throughput ในปริมาณใกล้เคียงกัน. จุดจึงเคลื่อนไปทางขวาบนตามเส้นที่มี Slope ประมาณ 1. เมื่อแตะขอบ Capacity และเกิด Loss, Multiplicative Decrease ลด Window ของแต่ละ Connection เป็นสัดส่วน เช่น ลดครึ่งหนึ่ง. จุดจึงถอยเข้าหาจุดกำเนิดตามแนวสัดส่วนเดิม. จากนั้น Additive Increase เริ่มพาไปทางขวาบนอีกครั้ง. การเพิ่มแบบเท่ากันและลดแบบสัดส่วนทำให้เส้นทางสีแดงค่อย ๆ เข้าใกล้จุดตัดระหว่างเส้น Capacity กับเส้น Equal Share ซึ่งคือบริเวณที่ทั้งสอง Connection ได้ประมาณ R/2 . คำตอบในสไลด์คือ TCP มีแนวโน้ม Fair ภายใต้ Idealized Assumptions : Connection มี RTT เท่ากัน, จำนวน Sessions คงที่ และทุก Session อยู่เฉพาะใน Congestion Avoidance. หากเงื่อนไขต่างออกไป ผลการแบ่งอาจไม่ตรงกับภาพอุดมคตินี้. หมายเหตุ: Bullet แรกในสไลด์ใช้คำว่า “throughout” แต่จากแกนและบริบทหมายถึง throughput .


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นทึบลาดลงคือขีดจำกัด Capacity รวมเท่ากับ R. เส้นประลาดขึ้นคือ Equal Share ที่ Throughput 1 = Throughput 2. ลูกศรขึ้นขวาแทน Additive Increase; ลูกศรถอยเข้าหาจุดกำเนิดแทน Multiplicative Decrease. เส้นทาง AIMD ค่อย ๆ เข้าใกล้จุด R/2, R/2 ภายใต้สมมติฐานของสไลด์.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Additive Increase ขยับทั้งสองอัตราขึ้นใกล้กัน. Multiplicative Decrease ลดอัตราตามสัดส่วน. TCP Fairness ในภาพขึ้นกับ Same RTT, Fixed Sessions และ Congestion Avoidance.

---

## 📄 Slide 140: Fairness ของ Network Applications: UDP และ Parallel TCP Connections

*📄 Slide 140*

สไลด์นี้ชี้ว่า Fairness ของ TCP Connection ไม่ได้หมายความว่า Application ทุกชนิดจะใช้ทรัพยากรอย่างเท่าเทียมกันเสมอ เพราะ Application สามารถเลือก Transport Protocol และจำนวน Connection ที่ต่างกันได้. ด้านซ้ายอธิบาย Fairness and UDP . Multimedia Applications บางชนิดไม่ใช้ TCP เพราะไม่ต้องการให้อัตราส่งถูกลดโดย Congestion Control. Application อาจเลือก UDP แล้วส่ง Audio/Video ด้วยอัตราคงที่ พร้อมยอมรับ Packet Loss บางส่วน. ข้อความว่าไม่มี “Internet Police” หมายถึงไม่มีตัวควบคุมส่วนกลางที่บังคับให้ทุก Application ใช้ TCP Congestion Control แบบเดียวกัน. ดังนั้น Application ที่ใช้ UDP โดยไม่ลด Rate อาจแข่งขันกับ TCP Flows ในรูปแบบที่ไม่เป็นไปตาม Fairness ของ AIMD. ด้านขวาอธิบาย Parallel TCP Connections . Application หนึ่งสามารถเปิด TCP Connections หลายชุดระหว่างสอง Hosts. เนื่องจาก Fairness มักเกิดในระดับ Connection, Application ที่เปิดหลาย Connection อาจได้รับส่วนแบ่งรวมมากกว่า Application ที่เปิด Connection เดียว. ตัวอย่างในสไลด์กำหนด Link Capacity R และมี Connection เดิม 9 ชุด. หาก Application ใหม่เปิด TCP เพียง 1 Connection จะมีทั้งหมด 10 Connections และ Connection ใหม่นั้นได้รับประมาณ R/10 . หาก Application ใหม่เปิด 11 TCP Connections จะมี Connection รวม 20 ชุด และ Application ใหม่นับรวม 11 ส่วน จึงได้รับส่วนแบ่งรวมใกล้ 11R/20 ซึ่งสไลด์สรุปโดยประมาณเป็น R/2 . ตัวอย่างนี้แสดงว่า Fairness ต่อ Connection ไม่เท่ากับ Fairness ต่อ Application.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์แบ่งสองคอลัมน์: UDP ทางซ้าย และ Parallel TCP Connections ทางขวา. UDP Multimedia อาจรักษา Constant Rate และยอมรับ Loss แทนการถูก TCP Throttle. ตัวอย่าง 9 Existing + 1 New TCP ให้ส่วนแบ่ง R/10 แก่ Connection ใหม่. การเปิด 11 Parallel TCPs ทำให้ Application ได้ส่วนแบ่งรวมประมาณครึ่งหนึ่งของ R.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Fairness ของ TCP มักพิจารณาต่อ Connection ไม่ใช่ต่อ Application. UDP Application อาจไม่ปฏิบัติตามการลดอัตราแบบ TCP. หลาย Parallel TCP Connections สามารถเพิ่มส่วนแบ่งรวมของ Application.

---

## 📄 Slide 141: Transport Layer: Roadmap — Evolution of Transport-Layer Functionality

*📄 Slide 141*

Evolution of Transport-Layer Functionality และ QUIC Evolution of Transport-Layer Functionality and QUIC สไลด์ Roadmap นี้แสดงว่าบทเรียนเดินทางมาถึงหัวข้อสุดท้าย คือ Evolution of Transport-Layer Functionality หรือพัฒนาการของความสามารถใน Transport Layer. หัวข้อก่อนหน้าถูกทำให้เป็นสีจาง เพื่อบอกว่าได้ศึกษา Transport-Layer Services, Multiplexing/Demultiplexing, UDP, Reliable Data Transfer, TCP และ Congestion Control มาแล้ว. ภาพสะพานส่งความหมายเชิงเปรียบเทียบว่า Transport Layer เป็นกลไกที่ “เชื่อม” Application Process ที่อยู่คนละปลายทางให้สื่อสารกันได้. แม้พื้นฐานสำคัญยังคงเป็น Reliability, Flow Control และ Congestion Control แต่รูปแบบการนำความสามารถเหล่านี้ไปใช้สามารถเปลี่ยนแปลงตามลักษณะ Network และความต้องการของ Application. เนื้อหาถัดไปจะอธิบายว่าเหตุใด TCP รูปแบบเดียวจึงไม่เหมาะกับทุกสถานการณ์ และเหตุใดจึงเกิด TCP หลาย Variant รวมถึงแนวทางนำความสามารถคล้าย Transport Layer ไปสร้างที่ Application Layer เหนือ UDP. ตัวอย่างสำคัญของแนวทางหลังคือ QUIC ซึ่งเป็นพื้นฐานของ HTTP/3 และรวมกลไกการสร้าง Connection, Reliability, Security และ Congestion Control ไว้เหนือ UDP.


> [!INFO] 📋 สรุปหัวข้อหลักของสไลด์นี้
> สไลด์นี้เป็นแผนที่เนื้อหา (Roadmap) ใช้สีและตัวอักษรเพื่อแสดงตำแหน่งปัจจุบันของบทเรียน หัวข้อที่เน้นสีเข้มคือเนื้อหาที่กำลังจะเรียน ส่วนหัวข้อที่สีจางคือเนื้อหาที่ผ่านไปแล้วหรือจะเรียนในภายหลัง

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> รายการหัวข้อด้านซ้ายแสดงลำดับเนื้อหาทั้งบท; หัวข้อสุดท้ายถูกเน้นสีน้ำเงิน. หัวข้อสีเทาคือเนื้อหาที่เรียนมาแล้ว ไม่ได้หมายความว่าไม่สำคัญ. ภาพสะพานใช้สื่อแนวคิดการเชื่อมต่อระหว่างปลายทางและการพัฒนากลไกการขนส่งข้อมูล. สไลด์นี้เป็น Roadmap จึงทำหน้าที่เชื่อมจาก TCP Congestion Control ไปสู่ QUIC.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Transport-Layer Functionality สามารถพัฒนาให้เหมาะกับ Network Scenario ที่ต่างกัน. แนวทางใหม่อาจปรับ TCP หรือสร้างฟังก์ชันเหนือ UDP. QUIC และ HTTP/3 เป็นตัวอย่างหลักของหัวข้อนี้.

---

## 📄 Slide 142: Evolving Transport-Layer Functionality

*📄 Slide 142*

TCP และ UDP เป็น Transport Protocol หลักของ Internet มาเป็นเวลาประมาณ 40 ปี แต่ Network แต่ละประเภทมีข้อจำกัดไม่เหมือนกัน จึงมีการพัฒนา TCP หลาย Flavor หรือหลาย Variant เพื่อให้เหมาะกับสถานการณ์เฉพาะ. ตารางกลางสไลด์จับคู่ Scenario กับ Challenge . สำหรับ Long, Fat Pipes ซึ่งมี Bandwidth สูงและเส้นทางยาว จะมี Packet จำนวนมากอยู่ระหว่างทาง หรือมี Data In-Flight มาก. หากเกิด Loss การลด Window อย่างรุนแรงอาจทำให้ Pipeline ที่ควรส่งข้อมูลต่อเนื่องชะลอตัว. ใน Wireless Networks Packet Loss อาจเกิดจาก Noise, Signal Fading หรือ Mobility ไม่ใช่จาก Congestion เสมอไป แต่ TCP แบบดั้งเดิมอาจตีความ Loss เป็น Congestion แล้วลด Sending Rate ทั้งที่ปัญหาไม่ได้เกิดจาก Router Queue. Long-Delay Links มี RTT สูงมาก ทำให้การรอ ACK และการฟื้นตัวจาก Loss ใช้เวลานาน. Data Center Networks มีเป้าหมายด้าน Latency ที่เข้มงวด แม้ระยะทางทางกายภาพสั้น. ส่วน Background Traffic Flows ควรทำงานแบบ Low Priority เพื่อไม่รบกวนงานหลัก. อีกทิศทางหนึ่งคือย้าย Transport-Layer Functions บางส่วนขึ้นไปสร้างที่ Application Layer โดยใช้ UDP เป็นฐาน. ในสไลด์ยก HTTP/3: QUIC เป็นตัวอย่าง ซึ่ง Application สามารถพัฒนากลไกได้ยืดหยุ่นกว่าการแก้ TCP ใน Operating System.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คอลัมน์ซ้ายของตารางคือสภาพแวดล้อม; คอลัมน์ขวาคือปัญหาที่ Transport Protocol ต้องรับมือ. Long, Fat Pipe เน้น Data In-Flight จำนวนมาก; Wireless เน้น Loss ที่ไม่จำเป็นต้องมาจาก Congestion. Data Center เน้น Low Latency; Background Flow เน้น Low Priority. Bullet ด้านล่างเสนอทางเลือกใหม่: สร้างฟังก์ชัน Transport เหนือ UDP เช่น QUIC.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - TCP แบบเดียวไม่เหมาะกับทุก Network Scenario. Packet Loss ไม่ได้หมายถึง Congestion เสมอ โดยเฉพาะ Wireless. QUIC ย้ายความสามารถหลายอย่างไปพัฒนาเหนือ UDP ที่ Application Layer.

---

## 📄 Slide 143: QUIC: Quick UDP Internet Connections

*📄 Slide 143*

QUIC ย่อจาก Quick UDP Internet Connections . ตามสไลด์ QUIC เป็น Protocol ที่ทำงานในระดับ Application เหนือ UDP มีเป้าหมายเพิ่มประสิทธิภาพของ HTTP และถูกนำไปใช้ใน Google Servers และ Applications หลายชนิด เช่น Chrome และ Mobile YouTube App. ไดอะแกรมซ้ายแสดงโครงสร้าง HTTP/2 over TCP . จากล่างขึ้นบนคือ IP → TCP → TLS → HTTP/2. TCP รับผิดชอบ Reliable Data Transfer และ Congestion Control ส่วน TLS ดูแล Security ก่อนส่งข้อมูลให้ HTTP/2. ไดอะแกรมขวาแสดง HTTP/3 over UDP . จากล่างขึ้นบนคือ IP → UDP → QUIC → HTTP/2 (slimmed) โดยวงเล็บด้านข้างรวม QUIC กับ HTTP Layer เป็น HTTP/3 ตามโครงสร้างในสไลด์. UDP ให้บริการพื้นฐานแบบ Connectionless และมี Header ขนาดเล็ก. QUIC จึงสร้างความสามารถที่จำเป็นเพิ่มเติมเอง เช่น Reliability, Loss Recovery, Congestion Control, Authentication และ Encryption. การอยู่ใน Application Space ทำให้พัฒนาและ Deploy เวอร์ชันใหม่ได้โดยไม่ต้องรอการปรับ TCP Stack ของทุก Operating System. คำว่า “HTTP/2 (slimmed)” ในภาพหมายถึงส่วนของ HTTP ที่ลดหรือย้ายหน้าที่บางอย่างลงไปให้ QUIC จัดการ ไม่ได้หมายความว่า HTTP/3 คือ UDP เพียงอย่างเดียว; QUIC คือองค์ประกอบหลักที่ทำให้ Stack ใหม่นี้ทำงานได้.

| สภาวะเหตุการณ์ | 🦖 TCP Tahoe (แบบดั้งเดิม) | 🚀 TCP Reno (แบบสมัยใหม่) |
| :--- | :--- | :--- |
| **เกิด Timeout** | ตั้ง $ssthresh = \frac{cwnd}{2}$, รีเซ็ต $cwnd = 1\text{ MSS}$ | ตั้ง $ssthresh = \frac{cwnd}{2}$, รีเซ็ต $cwnd = 1\text{ MSS}$ |
| **ได้รับ 3 Duplicate ACKs** | ตั้ง $ssthresh = \frac{cwnd}{2}$, รีเซ็ต $cwnd = 1\text{ MSS}$ | ตั้ง $ssthresh = \frac{cwnd}{2}$, ตั้ง $cwnd = ssthresh$ เข้าสู่ **Fast Recovery** |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ซ้าย: HTTP/2 → TLS → TCP → IP. ขวา: HTTP Layer ที่ลดรูป → QUIC → UDP → IP และถูกรวมเรียกว่า HTTP/3. เส้นประแบ่ง Application, Transport และ Network ตามตำแหน่งเชิงแนวคิดในสไลด์. QUIC อยู่เหนือ UDP แต่รับหน้าที่หลายอย่างที่ TCP/TLS เคยทำใน Stack เดิม.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - QUIC เป็น Application-Layer Protocol ที่ทำงานเหนือ UDP. HTTP/2 แบบเดิมใช้ TCP + TLS; HTTP/3 ใช้ QUIC + UDP. QUIC รวม Reliability, Congestion Control และ Security ไว้ใน Protocol ที่พัฒนาได้รวดเร็ว.

---

## 📄 Slide 144: QUIC: Transport Functions Built over UDP

*📄 Slide 144*

แม้ QUIC ทำงานเหนือ UDP แต่ได้นำแนวคิดหลักที่ศึกษาในบทนี้กลับมาใช้ ได้แก่ Connection Establishment, Error Control และ Congestion Control . กล่าวคือ UDP เป็นฐานการส่ง Datagram ส่วน QUIC เพิ่ม State และ Algorithm ที่จำเป็นสำหรับการสื่อสารแบบเชื่อถือได้. ข้อความจาก QUIC Specification ในสไลด์ระบุว่า Algorithm ด้าน Loss Detection และ Congestion Control มีแนวทางที่ขนานกับ TCP ที่เป็นที่รู้จัก. ดังนั้น QUIC ไม่ได้ละทิ้งหลักการของ TCP แต่ย้ายการ Implement และปรับรูปแบบให้เหมาะกับ Application และ HTTP/3. สำหรับ Connection Establishment QUIC สามารถสร้าง State สำหรับ Reliability, Congestion Control, Authentication และ Encryption ภายใน 1 RTT หรือบางกรณี 0 RTT. การรวมขั้นตอนเหล่านี้ช่วยลดเวลารอก่อนเริ่มส่ง Application Data เมื่อเทียบกับการทำ TCP Handshake และ TLS Handshake แยกกัน. QUIC Connection หนึ่งรองรับ Application-Level Streams หลาย Stream แบบ Multiplexing. แต่ละ Stream มี Reliable Data Transfer และ Security แยกกัน จึงสามารถติดตามลำดับและกู้คืนข้อมูลของตนเอง. ขณะเดียวกัน Streams ทั้งหมดใน Connection เดียวใช้ Common Congestion Control . หาก Network เกิด Congestion การปรับ Sending Rate จึงพิจารณาทรัพยากรร่วมของ Connection ไม่ใช่ให้แต่ละ Stream แข่งขันกันเสมือนเป็น Connection แยกทั้งหมด.


| ประเภทภัยคุกคาม | กลไกการทำงาน | ผลกระทบต่อเครือข่าย |
| :--- | :--- | :--- |
| 🦠 **Malware** | แพร่กระจายผ่านไฟล์/เว็บไซต์ ติดตั้งตัวเองในระบบ | ขโมยข้อมูล ทำลายไฟล์ ใช้เครื่องเป็น Botnet |
| 🌊 **DoS/DDoS** | ส่งทราฟฟิกปริมาณมหาศาลไปยังเป้าหมาย | เซิร์ฟเวอร์ล่ม ให้บริการไม่ได้ |
| 👃 **Packet Sniffing** | ดักจับแพ็กเก็ตที่วิ่งผ่าน Shared Medium | อ่านข้อมูลที่ไม่เข้ารหัสได้ (Passwords, Cookies) |
| 🎭 **IP Spoofing** | ปลอมแปลง Source IP Address ในแพ็กเก็ต | แอบอ้างตัวตนเป็นโฮสต์อื่นเพื่อหลบเลี่ยงระบบกรอง |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> สไลด์เป็น Bullet ที่จัดกลุ่มความสามารถของ QUIC เป็น Error/Congestion Control, Connection Establishment และ Streams. ข้อความ 1 RTT/0 RTT เน้นการลด Setup Delay ก่อนส่งข้อมูล. หลาย Streams อยู่ใน QUIC Connection เดียว. Reliability/Security แยกต่อ Stream แต่ Congestion Control ใช้ร่วมกัน.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - QUIC สร้าง Connection-Oriented Functions เหนือ UDP. Setup สามารถรวม Reliability, Authentication และ Encryption ภายใน 1 RTT หรือ 0 RTT. Streams แยก Reliability แต่ใช้ Congestion Control ร่วมกัน.

---

## 📄 Slide 145: QUIC Streams: Parallelism and No Head-of-Line Blocking

*📄 Slide 145*

สไลด์เปรียบเทียบการส่ง HTTP Requests หลายรายการเมื่อใช้ Transport Stream ร่วมกันกับการแยกเป็นหลาย QUIC Streams. ประเด็นสำคัญคือ Head-of-Line (HOL) Blocking ซึ่งเกิดเมื่อข้อมูลต้นแถวหายหรือยังมาไม่ครบ ทำให้ข้อมูลลำดับถัดไปถูกส่งขึ้น Application ไม่ได้. ด้านซ้ายที่ระบุ (a) HTTP 1.1 แสดง HTTP GET หลายรายการวางอยู่เหนือ TLS Encryption และ TCP. TCP มองข้อมูลทั้งหมดเป็น Reliable Ordered Byte Stream เดียว. หาก Segment ที่อยู่ก่อนหน้าสูญหาย TCP ต้องกู้คืน Segment นั้นก่อน แม้ข้อมูลที่มาถึงภายหลังจะเป็นของ HTTP Request อื่นก็ตาม. เครื่องหมาย Error และลูกศรในภาพสื่อว่า Loss ใน TCP Stream เดียวสามารถหยุดการส่งมอบข้อมูลที่ตามหลังทั้งหมดชั่วคราว. TCP ยังคงรักษาความถูกต้องและลำดับ แต่ผลข้างเคียงคือเกิด Transport-Layer HOL Blocking. ด้านขวาที่สไลด์ระบุ HTTP/2 with QUIC: no HOL blocking แยก HTTP GET แต่ละชุดเข้าสู่ QUIC RDT และ QUIC Encryption ของ Stream ตนเอง. หากเกิด Error ใน Stream หนึ่ง เฉพาะ Stream นั้นต้องรอ Retransmission ส่วน Stream อื่นยังส่งข้อมูลขึ้น Application ได้. ด้านล่างของหลาย Stream ยังมี UDP และ QUIC Congestion Control ร่วมกัน. จึงเกิด Parallelism โดยไม่สร้าง TCP Connection แยกต่อ Request และยังควบคุมอัตรารวมของ Connection เพื่อไม่ให้ส่งข้อมูลเกินความสามารถของ Network. คำว่า “no HOL blocking” ในบริบทนี้หมายถึงไม่เกิด HOL Blocking ระหว่าง QUIC Streams . ภายใน Stream เดียวที่ต้องรักษาลำดับ หากข้อมูลบางส่วนหาย ข้อมูลที่ตามหลังใน Stream นั้นยังอาจต้องรอ.


> [!DEFINITION] Nodal Delay Formula (สูตรความหน่วงรวมของโหนด)
> $$d_{\text{nodal}} = d_{\text{proc}} + d_{\text{queue}} + d_{\text{trans}} + d_{\text{prop}}$$
> - $d_{\text{proc}}$ = Processing Delay (ตรวจสอบ Header)
> - $d_{\text{queue}}$ = Queuing Delay (รอคิวใน Buffer)
> - $d_{\text{trans}}$ = $L/R$ (Transmission Delay)
> - $d_{\text{prop}}$ = $d/s$ (Propagation Delay)

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ซ้าย: HTTP GET หลายรายการรวมผ่าน TLS และ TCP RDT/Congestion Control ชุดเดียว. Error ใน TCP Byte Stream ทำให้ข้อมูลถัดไปทั้งหมดรอ แม้เป็นคนละ HTTP Request. ขวา: แต่ละ Request อยู่ใน QUIC Stream ที่มี RDT/Encryption แยกกัน. Error กระทบเฉพาะ Stream นั้น ขณะที่ Stream อื่นเดินหน้าต่อ; ทุก Stream ใช้ Congestion Control ร่วมกัน.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - TCP Ordered Byte Stream อาจทำให้เกิด HOL Blocking ระหว่างข้อมูลหลาย Request. QUIC แยก Reliability ต่อ Stream จึงลด HOL Blocking ระหว่าง Streams. QUIC Streams ทำงานขนานกัน แต่ยังใช้ Congestion Control ร่วมกัน.

---

## 📄 Slide 146: Chapter 3: Summary

*📄 Slide 146*

สไลด์นี้สรุปสองระดับของบทเรียน. ระดับแรกคือ Principles behind Transport-Layer Services ได้แก่ Multiplexing/Demultiplexing, Reliable Data Transfer, Flow Control และ Congestion Control. หลักการเหล่านี้ตอบคำถามว่าข้อมูลจะไปถึง Process ที่ถูกต้อง เชื่อถือได้ และไม่ส่งเร็วเกิน Receiver หรือ Network ได้อย่างไร. ระดับที่สองคือการนำหลักการไป Instantiate และ Implement ใน Internet ผ่าน UDP และ TCP. UDP ให้บริการแบบ Connectionless และมีความเรียบง่าย ส่วน TCP รวม Reliability, Ordered Byte Stream, Flow Control, Connection Management และ Congestion Control. QUIC ในสไลด์ก่อนหน้าแสดงว่าหลักการเดิมสามารถถูกนำไปจัดวางใหม่เหนือ UDP เพื่อรองรับ HTTP/3 ได้. ดังนั้นสิ่งที่ควรเข้าใจไม่ใช่เพียงจำชื่อ Protocol แต่ต้องเห็นความสัมพันธ์ระหว่าง Requirement กับ Mechanism. คอลัมน์ Up next บอกว่าบทถัดไปจะออกจาก Network Edge ซึ่งเน้น Application และ Transport Layers แล้วเข้าไปศึกษา Network Core . เนื้อหา Network Layer จะถูกแบ่งเป็น Data Plane และ Control Plane. Data Plane เน้นการส่งต่อ Packet ภายใน Router ตาม Forwarding Table ส่วน Control Plane เน้นการคำนวณและกระจายข้อมูลเส้นทางที่ใช้สร้าง Forwarding State.


| Layer | ชื่อ | PDU | ตัวอย่างโปรโตคอล |
| :---: | :--- | :---: | :--- |
| 5 | Application | Message | HTTP, SMTP, DNS, FTP |
| 4 | Transport | Segment | TCP, UDP |
| 3 | Network | Datagram | IP, ICMP, OSPF |
| 2 | Data Link | Frame | Ethernet, Wi-Fi |
| 1 | Physical | Bits | UTP, Fiber, Radio |

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> คอลัมน์ซ้ายสรุป Principles และ Protocol Implementations ของ Transport Layer. คอลัมน์ขวาแสดงการเปลี่ยนจาก Network Edge ไป Network Core. UDP และ TCP เป็นตัวอย่างหลักของการนำ Transport Principles ไปใช้จริง. บทถัดไปแบ่ง Network Layer เป็น Data Plane และ Control Plane.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - สี่หลักการสำคัญ: Multiplexing, Reliability, Flow Control และ Congestion Control. UDP และ TCP เป็นการ Implement หลักการด้วยชุดบริการต่างกัน. หัวข้อถัดไปคือ Network-Layer Data Plane และ Control Plane.

---

## 📄 Slide 147: Additional Chapter 3 Slides

*📄 Slide 147*

Additional Chapter Slides Additional Chapter Slides สไลด์นี้เป็นหน้าแบ่งส่วนสำหรับ . เนื้อหาหลังจากนี้ไม่ได้เริ่มแนวคิดหลักใหม่ แต่ขยายรายละเอียดเชิงกลไกของ Protocol ที่ได้ศึกษาไปแล้ว. หัวข้อเพิ่มเติมประกอบด้วย FSM แบบขยายของ Go-Back-N, ขั้นตอนของ TCP Sender, FSM ของ TCP Three-Way Handshake, TCP Connection Closing States และการวิเคราะห์ TCP Throughput ในสไลด์ต่อ ๆ ไป. นักศึกษาควรใช้ส่วนนี้เพื่อเชื่อมแนวคิดระดับสูงกับ Event, State, Condition และ Action ที่ Protocol Implementation ต้องดำเนินการจริง. การอ่าน FSM ควรเริ่มจาก State ปัจจุบัน ตามด้วยเหตุการณ์ที่เขียนบนเส้น และ Action ที่อยู่ใต้เส้น. เนื่องจากสไลด์นี้มีเพียงชื่อส่วน จึงไม่มี Diagram เชิงกลไก แต่ทำหน้าที่บอกว่าความละเอียดของเนื้อหาจะเพิ่มขึ้นจากคำอธิบายแนวคิดไปสู่ Pseudocode และ State Machine.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ข้อความกลางหน้าเป็น Section Divider ไม่ใช่หัวข้อที่มีขั้นตอนการทำงาน. พื้นหลังว่างช่วยแยกบทสรุปหลักออกจาก Supplementary Material. สไลด์ถัดไปเริ่มด้วย Extended FSM ของ Go-Back-N Sender.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - สไลด์ 148 เป็นต้นไปเป็นเนื้อหาเพิ่มเติมเชิงกลไก. ใช้ทบทวน Event–State–Action ของ Protocol. แนวคิดหลักของบทจบที่สไลด์ Summary ก่อนหน้านี้.

---

## 📄 Slide 148: Go-Back-N: Sender Extended FSM

*📄 Slide 148*

FSM นี้แสดง Go-Back-N Sender ในรูปแบบละเอียด โดยมี State หลักเพียง Wait แต่ใช้ตัวแปร base และ nextseqnum เพื่อบอกตำแหน่ง Sliding Window. ค่าเริ่มต้นในภาพคือ base = 1 และ nextseqnum = 1 . base คือ Sequence Number ของ Packet เก่าสุดที่ส่งแล้วแต่ยังไม่ได้รับ ACK ส่วน nextseqnum คือ Sequence Number ที่จะใช้กับ Packet ใหม่. Window ส่งได้ตั้งแต่ base ถึง base + N − 1 . เมื่อเกิด rdt_send(data) จากชั้นบน Sender ตรวจว่า nextseqnum < base + N หรือไม่. หากยังมีพื้นที่ใน Window จะสร้าง Packet ด้วย make_pkt(nextseqnum, data, chksum) , เก็บไว้ใน sndpkt[nextseqnum] , ส่งด้วย udt_send() และเพิ่ม nextseqnum . ถ้า Packet ที่กำลังส่งเป็น Packet แรกของ Window หรือ base == nextseqnum ก่อนเพิ่มค่า แสดงว่าก่อนหน้านี้ไม่มี Outstanding Packet จึงต้อง start_timer . แต่ถ้า Window เต็ม เงื่อนไขไม่ผ่านและ FSM ทำ refuse_data(data) เพื่อไม่รับข้อมูลเพิ่มในขณะนั้น. เมื่อรับ Packet ที่ไม่เสียหายจากด้านล่าง เหตุการณ์ rdt_rcv(rcvpkt) && notcorrupt(rcvpkt) จะใช้ ACK Number เลื่อนฐานเป็น base = getacknum(rcvpkt) + 1 . นี่คือการใช้ Cumulative ACK : ACK หมายเลขหนึ่งยืนยัน Packet จนถึงหมายเลขนั้น. หากฐานใหม่เท่ากับ nextseqnum หมายความว่าไม่มี Outstanding Packet เหลือ จึง stop_timer . หากยังมี Packet ที่ไม่ได้ ACK จะเริ่ม Timer ใหม่สำหรับ Packet เก่าสุดที่ฐานใหม่. ACK ที่เสียหายเข้าสู่ Self-Loop ที่มีสัญลักษณ์ Λ หมายถึงไม่ทำ Action. เมื่อเกิด Timeout Sender เริ่ม Timer ใหม่และส่ง Packet ที่ยังไม่ ACK ทุกตัวตั้งแต่ sndpkt[base] ถึง sndpkt[nextseqnum−1] ซ้ำ. พฤติกรรมส่งย้อนหลังทั้งช่วงนี้คือที่มาของชื่อ Go-Back-N.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> วงกลม Wait คือ State เดียว; ลูกศรกลับเข้าตัวเองคือ Event ต่าง ๆ ที่ไม่เปลี่ยน State แต่เปลี่ยนตัวแปร/ส่ง Packet. ทางด้านบนคือ Event จาก Application และการตรวจพื้นที่ใน Window. ทางขวาคือ Timeout แล้ว Retransmit Outstanding Packets ทั้งหมด. ด้านล่างคือ ACK ที่ถูกต้องเลื่อน base; ACK เสียหายถูก Ignore ด้วย Action Λ.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Window ว่างเมื่อ base == nextseqnum; Window เต็มเมื่อ nextseqnum == base + N. GBN ใช้ Timer สำหรับ Packet เก่าสุดที่ยังไม่ ACK. Timeout ทำให้ส่งซ้ำทุก Packet ตั้งแต่ base ถึง nextseqnum−1.

---

## 📄 Slide 149: Go-Back-N: Receiver Extended FSM

*📄 Slide 149*

Go-Back-N Receiver ในสไลด์มี State หลักเพียง Wait และจำตัวแปร expectedseqnum ซึ่งเป็น Sequence Number ของ Packet ถัดไปที่ต้องการรับตามลำดับ. ค่าเริ่มต้นในภาพคือ expectedseqnum = 1 . เมื่อเกิด rdt_rcv(rcvpkt) และ Packet notcorrupt พร้อมมี Sequence Number ตรงกับ expectedseqnum , Receiver จะ extract() ข้อมูล, เรียก deliver_data(data) ส่งขึ้น Application, สร้าง ACK, ส่ง ACK และเพิ่ม expectedseqnum . คำว่า ACK-only หมายถึง Receiver ส่ง ACK สำหรับ Packet ที่รับถูกต้องและมี Sequence Number ต่อเนื่องสูงสุด. ACK มีลักษณะเป็น Cumulative ACK จึงอาจถูกส่งซ้ำเมื่อได้รับ Packet ที่ไม่ตรงตามลำดับ. เส้น any other event ครอบคลุมกรณี Packet เสียหาย, Packet ซ้ำ หรือ Packet ที่มาถึงแบบ Out-of-Order. Action คือส่ง sndpkt เดิมอีกครั้ง ซึ่งเท่ากับ Re-ACK Packet ที่รับต่อเนื่องล่าสุด. Receiver รูปแบบนี้ ไม่ Buffer Out-of-Order Packet . หาก Packet หมายเลขสูงกว่าที่คาดหวังมาถึง จะทิ้ง Packet นั้นและรอ Packet ที่ขาด. เมื่อ Sender Timeout จึงต้องย้อนกลับไปส่ง Packet ที่ยังไม่ ACK ต่อเนื่องอีกครั้ง. ข้อดีคือ Receiver ใช้ State และ Memory น้อย จำเพียง expectedseqnum และ ACK ล่าสุด. ข้อแลกเปลี่ยนคือ Packet ที่มาถึงแล้วแต่ผิดลำดับถูกทิ้งและอาจต้องส่งซ้ำภายหลัง. ในส่วน Initialization ของภาพมีการสร้าง sndpkt สำหรับ ACK เริ่มต้น. แก่นที่ต้องอ่านจาก FSM คือ sndpkt ทำหน้าที่เก็บ ACK ล่าสุดเพื่อให้ส่งซ้ำได้ในทุกเหตุการณ์ที่ไม่ใช่ Packet ที่กำลังคาดหวัง.


> [!DEFINITION] TCP Flow Control (ควบคุมอัตราส่งไม่ให้ล้น Buffer ผู้รับ)
> $$rwnd = \text{RcvBuffer} - [\text{LastByteRcvd} - \text{LastByteRead}]$$
> - **RcvBuffer**: ขนาด Buffer ทั้งหมดของผู้รับ
> - **rwnd (Receive Window)**: พื้นที่ว่างที่เหลือ → ส่งผ่าน TCP Header กลับมาหาผู้ส่ง
> - ผู้ส่งจำกัด: $\text{LastByteSent} - \text{LastByteAcked} \leq rwnd$

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> วงกลม Wait เป็น State เดียว และ expectedseqnum ระบุ Packet ที่ต้องการ. เส้นด้านขวา: Packet ถูกต้องและตรงลำดับ → Deliver, ACK, expectedseqnum++. เส้นด้านซ้าย: Any other event → ส่ง ACK ล่าสุดซ้ำ. ข้อความด้านล่างย้ำว่าไม่มี Receiver Buffering สำหรับ Out-of-Order Packet.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - GBN Receiver รับและส่งขึ้น Application เฉพาะ Packet ที่ตรง expectedseqnum. Out-of-Order Packet ถูกทิ้งและทำให้เกิด Duplicate ACK. Receiver จำเพียง expectedseqnum และ ACK ล่าสุด.

---

## 📄 Slide 150: TCP Sender (Simplified)

*📄 Slide 150*

FSM นี้สรุปการทำงานหลักของ TCP Sender ใน State wait for event . ตัวแปรเริ่มต้นคือ NextSeqNum = InitialSeqNum และ SendBase = InitialSeqNum . TCP นับ Sequence Number ตามไบต์ ไม่ใช่ตามจำนวน Segment. NextSeqNum คือหมายเลขของไบต์แรกที่จะใช้กับข้อมูลชุดถัดไป ส่วน SendBase คือหมายเลขไบต์เก่าสุดที่ยังไม่ได้รับ Cumulative ACK. ดังนั้น SendBase − 1 คือไบต์สุดท้ายที่ได้รับการยืนยันแล้ว. เมื่อ Data Received from Application Above , Sender สร้าง Segment ที่มี Sequence Number เท่ากับ NextSeqNum , ส่ง Segment ลง IP, แล้วปรับ NextSeqNum = NextSeqNum + length(data) . หาก Timer ยังไม่ทำงาน จะเริ่ม Timer. Timer ของ TCP ใน FSM แบบย่อนี้ผูกกับ Segment ที่ยังไม่ ACK และมี Sequence Number ต่ำสุด. Sender ไม่ได้เริ่ม Timer แยกทุก Segment ในภาพนี้. Segment ใหม่สามารถส่งต่อเนื่องได้ภายใต้ข้อจำกัด Window แม้ Timer เดียวกำลังนับอยู่. เมื่อเกิด Timeout , Sender ส่งซ้ำ Segment ที่ยังไม่ ACK และมี Sequence Number ต่ำสุด แล้วเริ่ม Timer ใหม่. การส่งซ้ำ Packet เก่าสุดช่วยรักษาลำดับและรอ Cumulative ACK ที่สามารถยืนยันข้อมูลต่อเนื่องได้. เมื่อได้รับ ACK ที่มีค่า y , Sender ตรวจว่า y > SendBase หรือไม่. หากใช่ แสดงว่า ACK ยืนยันข้อมูลใหม่ จึงปรับ SendBase = y . ถ้ายังมี Segment ที่ไม่ได้ ACK จะเริ่ม Timer ใหม่; ถ้าไม่มีจะหยุด Timer. หาก y ≤ SendBase ACK นั้นไม่ได้เลื่อนฐาน อาจเป็น Duplicate หรือ Old ACK และ FSM แบบย่อนี้ไม่แสดง Action เพิ่มเติม. กลไก Fast Retransmit จาก Duplicate ACK เป็นรายละเอียดที่ศึกษาแยกต่างหาก. สัญลักษณ์ Λ บนลูกศรเริ่มต้นหมายถึงการ Initialize State/Variables โดยไม่มีการส่งข้อมูลออกทันที. ทุก Event ทำให้ระบบวนกลับสู่ State “wait for event” เพื่อรอ Data, ACK หรือ Timeout ถัดไป.


```
[ rdt 2.x: ACK/NAK Protocol ]
Sender ──(packet)──> Receiver
  │                    │── ถ้าไม่มี Error → ส่ง ACK กลับ
  │<──── ACK ─────────│   (Sender ส่ง packet ถัดไป)
  │                    │
  │── ถ้ามี Error → ส่ง NAK กลับ
  │<──── NAK ─────────│   (Sender ส่ง packet เดิมซ้ำ!)
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> วงกลมกลางคือ wait for event; ลูกศรสามชุดแทน Data from Application, ACK และ Timeout. ทางขวาบน: สร้าง Segment, ส่งลง IP, เพิ่ม NextSeqNum และเริ่ม Timer หากจำเป็น. ทางซ้ายล่าง: ACK ใหม่เลื่อน SendBase และจัดการ Timer ตาม Outstanding Data. ทางขวาล่าง: Timeout → Retransmit Segment เก่าสุดที่ยังไม่ ACK และ Restart Timer.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - NextSeqNum เดินหน้าเท่ากับจำนวนไบต์ที่ส่ง; SendBase เดินหน้าตาม Cumulative ACK. TCP ใช้ Timer กับ Segment เก่าสุดที่ยังไม่ ACK ใน FSM แบบย่อ. Timeout ส่ง Segment เก่าสุดซ้ำ; ACK ใหม่เลื่อน SendBase.

---

## 📄 Slide 151: TCP Three-Way Handshake FSM

*📄 Slide 151*

สไลด์นี้แสดง Finite State Machine (FSM) ของการสร้าง TCP Connection โดยวางเส้นทางของ Server ไว้ด้านซ้ายและ Client ไว้ด้านขวา. วงกลมแต่ละวงคือ State ส่วนข้อความบนลูกศรคือเหตุการณ์หรือ TCP Segment ที่ทำให้ Endpoint เปลี่ยน State. ฝั่ง Server เริ่มที่ CLOSED . เมื่อ Server เตรียมรับ Connection ผ่าน Listening Socket และรอคำสั่ง welcomeSocket.accept() จะเข้าสู่ State LISTEN . Listening Socket มีหน้าที่รอ Client หลายราย ส่วนเมื่อมี Client เชื่อมต่อสำเร็จ ระบบจะสร้าง Connection Socket แยกสำหรับสื่อสารกับ Client รายนั้น. ฝั่ง Client เริ่มที่ CLOSED . การสร้าง Socket ด้วยคำสั่งลักษณะ new Socket("hostname", "port number") ทำให้ Client เลือก Initial Sequence Number x , ส่ง Segment SYN(seq=x) และเข้าสู่ State SYN SENT . SYN ใช้แจ้งความต้องการสร้าง Connection และใช้พื้นที่ Sequence Number หนึ่งตำแหน่ง. เมื่อ Server ใน State LISTEN ได้รับ SYN(x) จะสร้าง State สำหรับ Connection ใหม่ เลือก Initial Sequence Number ของตนเองเป็น y และตอบกลับด้วย SYNACK(seq=y, ACKnum=x+1) . ค่า ACKnum=x+1 หมายถึง Server ได้รับ SYN ที่ใช้ Sequence Number x แล้ว และคาดหวังหมายเลขถัดไปเป็น x+1 . จากนั้น Server เข้าสู่ SYN RCVD . เมื่อ Client ได้รับ SYN-ACK จะทราบทั้งว่า Server ยังทำงานอยู่และยอมรับ Connection. Client ส่ง ACK(ACKnum=y+1) เพื่อยืนยัน SYN ของ Server แล้วเข้าสู่ ESTAB หรือ Established. เมื่อ Server ได้รับ ACK นี้ Server ก็เข้าสู่ ESTAB เช่นกัน และทั้งสองฝั่งจึงพร้อมแลกเปลี่ยนข้อมูลแบบ Full Duplex. เหตุผลที่ต้องมีข้อความลำดับที่สามคือ Server ต้องได้รับหลักฐานว่า Client ได้รับ SYN-ACK แล้ว. ดังนั้น Three-Way Handshake จึงทำให้ทั้งสองฝั่งยืนยันความพร้อมของอีกฝ่ายและตกลง Initial Sequence Number ของทั้งสองทิศทางได้ครบถ้วน.


```
[ TCP Socket Programming Flow ]
       Server                          Client
  ┌─────────────┐                ┌──────────────┐
  │ socket()    │                │ socket()     │
  │ bind()      │                │              │
  │ listen()    │                │              │
  │ accept()    │<── TCP SYN ───│ connect()    │
  │  (block)    │── SYN-ACK ──> │              │
  │             │<── ACK ───────│              │
  │ read()      │<── Data ──────│ write()      │
  │ write()     │── Data ──────>│ read()       │
  │ close()     │               │ close()      │
  └─────────────┘               └──────────────┘
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> เส้นทางฝั่ง Server: CLOSED → LISTEN → SYN RCVD → ESTAB. เส้นทางฝั่ง Client: CLOSED → SYN SENT → ESTAB. ข้อความที่ 1: Client → Server, SYN(seq=x) . ข้อความที่ 2: Server → Client, SYNACK(seq=y, ACKnum=x+1) . ข้อความที่ 3: Client → Server, ACK(ACKnum=y+1) . วงกลม ESTAB ของทั้งสองฝั่งหมายถึง Connection พร้อมรับและส่ง Application Data.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Three-Way Handshake คือ SYN → SYN-ACK → ACK. Client และ Server มี Initial Sequence Number ของตนเอง คือ x และ y . ACK Number บอกหมายเลขลำดับถัดไปที่ผู้รับคาดหวัง. Listening Socket ใช้รอ Connection; Connection Socket ใช้สื่อสารกับ Client ที่เชื่อมต่อแล้ว.

---

## 📄 Slide 152: Closing a TCP Connection

*📄 Slide 152*

สไลด์นี้แสดงการปิด TCP Connection แบบปกติ โดย Client เป็นฝ่ายเริ่มปิดก่อน หรือเรียกว่า Active Close . เนื่องจาก TCP เป็น Full-Duplex Connection การหยุดส่งข้อมูลของทิศทางหนึ่งไม่ได้บังคับให้อีกทิศทางหยุดพร้อมกัน จึงต้องปิดแต่ละทิศทางแยกกันด้วย FIN และ ACK. เริ่มต้นทั้ง Client และ Server อยู่ใน State ESTAB . เมื่อ Application ฝั่ง Client เรียก clientSocket.close() , Client ส่ง FINbit=1, seq=x และเปลี่ยนเป็น FIN_WAIT_1 . หลังส่ง FIN แล้ว Client ไม่สามารถส่ง Application Data เพิ่มในทิศทาง Client → Server แต่ยังสามารถรับข้อมูลที่ Server ส่งกลับมาได้. เมื่อ Server ได้รับ FIN จะตอบด้วย ACKbit=1, ACKnum=x+1 และเข้าสู่ CLOSE_WAIT . ACK นี้ยืนยัน FIN ของ Client. Server ใน CLOSE_WAIT ยังส่งข้อมูลที่ค้างอยู่ได้ เพราะทิศทาง Server → Client ยังไม่ถูกปิด. เมื่อ Client ได้รับ ACK ของ FIN จะเข้าสู่ FIN_WAIT_2 และรอให้ Server ปิดทิศทางของตนเอง. ระหว่างนี้ Client ไม่ส่งข้อมูลใหม่ แต่ยังรับข้อมูลจาก Server ได้. เมื่อ Application ฝั่ง Server พร้อมปิด จะส่ง FINbit=1, seq=y และเข้าสู่ LAST_ACK . หลังจากส่ง FIN แล้ว Server ไม่สามารถส่ง Application Data เพิ่มได้ และรอ ACK สุดท้ายจาก Client. Client รับ FIN ของ Server แล้วตอบ ACKbit=1, ACKnum=y+1 และเข้าสู่ TIME_WAIT . Server ได้รับ ACK นี้แล้วเข้าสู่ CLOSED . ส่วน Client ต้องรอเป็นเวลา 2 × Maximum Segment Lifetime (2×MSL) ก่อนเข้าสู่ CLOSED เพื่อให้สามารถส่ง ACK ซ้ำได้หาก FIN สุดท้ายถูกส่งมาใหม่ และเพื่อให้ Segment เก่าจาก Connection เดิมหมดอายุจาก Network. ภาพจึงมี Segment สี่ช่วงหลัก: FIN ของ Client, ACK จาก Server, FIN ของ Server และ ACK สุดท้ายจาก Client. บาง Implementation อาจรวม ACK กับ FIN ได้เมื่อเวลาการปิดของสองฝั่งอยู่ใกล้กัน แต่ไดอะแกรมนี้แสดงลำดับแยกเพื่อให้เห็น State ชัดเจน.


```
[ TCP Connection Close (4-Way) ]
Client                          Server
  │── FIN ────────────────────────>│   Client ขอปิด
  │<── ACK ────────────────────────│   Server รับทราบ
  │<── FIN ────────────────────────│   Server ขอปิดด้วย
  │── ACK ────────────────────────>│   Client รับทราบ
  │  (TIMED WAIT: 2*MSL)          │   รอให้แน่ใจว่า ACK ถึง
  │── [Connection Closed] ────────>│
```

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> Client States: ESTAB → FIN_WAIT_1 → FIN_WAIT_2 → TIME_WAIT → CLOSED. Server States: ESTAB → CLOSE_WAIT → LAST_ACK → CLOSED. ลูกศร FIN แปลว่าฝั่งนั้นไม่มี Application Data ใหม่จะส่งแล้ว. ACK ของ FIN ใช้ค่า x+1 หรือ y+1 เพราะ FIN ใช้ Sequence Number หนึ่งตำแหน่ง. ข้อความ “can still send data” อยู่ฝั่ง Server ใน CLOSE_WAIT; ข้อความ “can no longer send but can receive data” อยู่ฝั่ง Client หลัง Active Close. TIME_WAIT ทำให้ Client รอ 2×MSL ก่อนลบ State ของ Connection.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - TCP ปิดสองทิศทางแยกกัน จึงมักเห็น FIN–ACK–FIN–ACK. CLOSE_WAIT หมายถึงได้รับ FIN แล้ว แต่ Application ฝั่งนั้นยังปิดไม่เสร็จ. FIN_WAIT_2 หมายถึง FIN ของตนได้รับ ACK แล้ว และกำลังรอ FIN จากอีกฝั่ง. TIME_WAIT ช่วยรองรับ FIN ที่อาจถูกส่งซ้ำและป้องกัน Segment เก่าปะปนกับ Connection ใหม่.

---

## 📄 Slide 153: TCP Throughput

*📄 Slide 153*

สไลด์นี้ประมาณค่า Average TCP Throughput จาก Window Size และ RTT ภายใต้สมมติฐานว่าไม่พิจารณา Slow Start และ Sender มีข้อมูลพร้อมส่งอยู่เสมอ. การวิเคราะห์จึงมุ่งที่ช่วง Congestion Avoidance ซึ่ง Congestion Window เพิ่มขึ้นแล้วลดลงเมื่อเกิด Loss. ให้ W เป็น Window Size หน่วยไบต์ ณ จุดที่เกิด Packet Loss. จากกราฟ Sawtooth เมื่อเกิด Loss, TCP ลด Window จากประมาณ W เหลือ W/2 ตามแนวคิด Multiplicative Decrease จากนั้นค่อย ๆ เพิ่ม Window แบบ Additive Increase จนกลับไปถึง W และเกิด Loss รอบถัดไป. ในหนึ่งรอบ Window จึงเปลี่ยนจาก W/2 ถึง W . เมื่อประมาณกราฟเป็นเส้นตรง ค่าเฉลี่ยของ In-Flight Data คือค่าเฉลี่ยระหว่างปลายทั้งสอง: (W/2 + W)/2 = 3W/4 . นี่คือที่มาของข้อความว่า Average Window Size เท่ากับ ¾W . หากโดยเฉลี่ยมีข้อมูล 3W/4 ไบต์อยู่ระหว่างทางในแต่ละ RTT, Throughput เฉลี่ยจึงประมาณได้จาก “ข้อมูลต่อหนึ่งรอบ ÷ เวลาต่อหนึ่งรอบ” เป็น Average TCP Throughput = (3/4) × W / RTT หน่วยไบต์ต่อวินาที. ตัวแปรต้องใช้หน่วยให้สอดคล้องกัน: W เป็นไบต์และ RTT เป็นวินาที จะได้ผลลัพธ์เป็น Bytes/second. หากต้องการ Bits/second ต้องคูณผลลัพธ์ด้วย 8. สมการนี้เป็นแบบจำลองโดยประมาณ ไม่ได้รวมผลของ Slow Start, Timeout, Fast Recovery, Receiver Window หรือการเปลี่ยนแปลง RTT แต่ช่วยแสดงหลักสำคัญว่า Throughput เพิ่มตาม Window Size และลดลงเมื่อ RTT สูงขึ้น.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> แกนตั้งคือ Window Size; ระดับบนคือ W และระดับล่างหลัง Loss คือ W/2 . เส้นเอียงขึ้นแสดง Additive Increase ใน Congestion Avoidance. เส้นตกลงอย่างรวดเร็วแสดง Multiplicative Decrease เมื่อเกิด Loss. รูปฟันเลื่อยซ้ำหลายรอบจึงเรียกว่า AIMD Sawtooth. สมการด้านบนกราฟใช้ Average Window 3W/4 หารด้วย RTT.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - เมื่อ Window แกว่งระหว่าง W/2 และ W , ค่าเฉลี่ยประมาณ 3W/4 . Average Throughput ≈ 3W/(4RTT) Bytes/second. Window ใหญ่ขึ้นช่วยเพิ่ม Throughput; RTT สูงขึ้นทำให้ Throughput ลดลง. สมการนี้เป็น Approximation ภายใต้สมมติฐานที่กำหนดในสไลด์.

---

## 📄 Slide 154: TCP over “Long, Fat Pipes”

*📄 Slide 154*

คำว่า Long, Fat Pipe ใช้อธิบายเส้นทางที่มีทั้ง Bandwidth สูงมาก (“fat”) และ RTT ยาว (“long”). เส้นทางลักษณะนี้ต้องมีข้อมูลจำนวนมากอยู่ระหว่างทางพร้อมกันเพื่อใช้ Capacity ได้เต็ม ซึ่งสัมพันธ์กับ Bandwidth–Delay Product . ตัวอย่างในสไลด์กำหนด Segment ขนาด 1,500 ไบต์, RTT 100 ms และต้องการ Throughput 10 Gbps. ในเวลา 0.1 วินาที เส้นทางสามารถรองรับข้อมูลระหว่างทางได้ประมาณ 10 Gbps × 0.1 s = 1 Gbit . เมื่อนำไปหารด้วยขนาด Segment 1,500 ไบต์ หรือ 12,000 บิต จะต้องมีประมาณ 83,333 Segments In-Flight เพื่อรักษาอัตรานี้. สไลด์ให้สมการประมาณ Throughput ที่สัมพันธ์กับ Segment Loss Probability L : TCP Throughput = 1.22 × MSS / (RTT × √L) . เมื่อ MSS และ RTT คงที่ Throughput จะแปรผกผันกับรากที่สองของ Loss Rate. แม้ Loss เพิ่มขึ้นเพียงเล็กน้อย Throughput ที่ทำได้จึงลดลงอย่างมีนัยสำคัญ. เมื่อนำเป้าหมาย 10 Gbps ไปแทนในสมการ สไลด์ระบุว่าต้องมี Loss Rate ประมาณ L = 2 × 10⁻¹⁰ ซึ่งต่ำมาก. ในเชิงการตีความ ค่านี้เทียบเท่ากับการยอมให้สูญหายเฉลี่ยประมาณหนึ่ง Segment ต่อหลายพันล้าน Segment จึงเห็นได้ว่าการรักษา Throughput สูงมากด้วย TCP แบบ Loss-Based เป็นเรื่องยาก. เหตุผลคือ Loss ทำให้ TCP ลด Congestion Window. บนเส้นทางที่ต้องมีมากกว่าแปดหมื่น Segment In-Flight การลด Window แล้วค่อยเพิ่มกลับใช้เวลาหลาย RTT และทำให้ Capacity จำนวนมากว่างลงระหว่างการฟื้นตัว. Bullet สุดท้ายจึงชี้ว่าจำเป็นต้องมี Versions of TCP for Long, High-Speed Scenarios . เป้าหมายคือปรับการเพิ่ม/ลด Window และการตอบสนองต่อ Loss ให้เหมาะกับเส้นทางที่มี Bandwidth–Delay Product สูง โดยยังต้องควบคุม Congestion และแบ่งทรัพยากรกับ Flow อื่นอย่างเหมาะสม.


> [!DEFINITION] Throughput (อัตราการส่งข้อมูลจริง)
> $$\text{Throughput}_{\text{end-to-end}} = \min(R_s, R_c, R/10)$$
> - $R_s$ = อัตราส่งจาก Server, $R_c$ = อัตราส่งไปยัง Client
> - $R/10$ = Shared Link ที่แบ่งให้ผู้ใช้ 10 คน
> - **Bottleneck Link** = ลิงก์ที่มีอัตราต่ำสุดในเส้นทาง → กำหนด Throughput ทั้งหมด

> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์
> ตัวอย่างด้านบนเชื่อม MSS 1,500 bytes, RTT 100 ms และ Throughput 10 Gbps. ค่า W = 83,333 หมายถึงจำนวน Segment ที่ต้องอยู่ In-Flight ไม่ใช่จำนวน Segment ต่อวินาที. สมการมี MSS อยู่ด้านบน และ RTT กับ √L อยู่ด้านล่าง. เมื่อลด Loss Probability, Throughput ที่สมการคาดการณ์จะเพิ่มขึ้น. ข้อความสีแดงเน้นว่า Loss Rate ที่ต้องการมีค่าน้อยมาก จึงเป็นข้อจำกัดสำคัญของ Long, High-Speed Networks.

> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)
> - Long, Fat Pipe มี Bandwidth สูงและ RTT ยาว จึงมี Bandwidth–Delay Product สูง. 10 Gbps ที่ RTT 100 ms และ MSS 1,500 bytes ต้องมีประมาณ 83,333 Segments In-Flight. Throughput แบบ Loss-Based TCP ลดลงตาม 1/√L . High-Speed TCP ต้องทนต่อ Loss ต่ำมากและฟื้น Window ได้เหมาะสมกับเส้นทางขนาดใหญ่. เรียบเรียงจาก Chapter_3_v9.0(1).pptx — Computer Networking: A Top-Down Approach, 9th edition, Kurose and Ross.

---
