
Quiz:  Chapter 3: Transport Layer - TCP และ Congestion Control
s6806021612037@email.kmutnb.ac.th สลับบัญชี
 
ระบบจะบันทึกอีเมลของคุณเมื่อส่งแบบฟอร์มนี้
* ระบุว่าเป็นคําถามที่จําเป็น
ส่วนที่ 1: TCP
ข้อ 1–10
1. ลำดับการสร้าง TCP Connection แบบ Three-Way Handshake ที่ถูกต้องคือข้อใด
*
ก. SYN → SYN-ACK → ACK
ข. ACK → SYN → FIN
ค. FIN → ACK → SYN
ง. SYN-ACK → ACK → FIN
2. หาก TCP Sender ไม่ได้รับ ACK จนหมดเวลา Retransmission Timer โดยทั่วไปจะทำอย่างไร
*
ก. ส่งข้อมูลที่คาดว่าสูญหายซ้ำ
ข. เปลี่ยนไปใช้ UDP
ค. ปิดโปรแกรมทันที
ง. เปลี่ยน Destination Port
3. ข้อใดอธิบาย Flow Control ได้ถูกต้องที่สุด
*
ก. ป้องกัน Sender ส่งข้อมูลเร็วกว่าที่ Receiver รับไหว
ข. เลือกเส้นทางที่สั้นที่สุดในเครือข่าย
ค. ตรวจสอบ IP Address ของ Sender
ง. เพิ่ม Bandwidth ของเครือข่าย
4. TCP มองข้อมูลจาก Application ในลักษณะใด
*
ก. Byte Stream ต่อเนื่อง
ข. Ethernet Frame เท่านั้น
ค. IP Address ต่อเนื่อง
ง. ข้อความที่ต้องมีขนาดเท่ากันทุกครั้ง
5. คำว่า Full Duplex ของ TCP หมายถึงข้อใด
*
ก. ทั้งสองฝั่งสามารถส่งข้อมูลหากันได้
ข. ส่งข้อมูลได้เฉพาะ Client ไป Server
ค. ส่งข้อมูลได้ครั้งละ 1 ไบต์
ง. ต้องใช้ TCP สอง Connection เสมอ
6. MSS (Maximum Segment Size) เกี่ยวข้องกับข้อใด
*
ก. ปริมาณ Application Data สูงสุดที่ใส่ใน TCP Segment โดยทั่วไป
ข. จำนวน Router สูงสุดที่ TCP ใช้ได้
ค. จำนวน Port สูงสุดของ Server
ง. จำนวน ACK สูงสุดต่อ Connection
7. เหตุใด TCP Header จึงอาจมีความยาวไม่เท่ากันในแต่ละ Segment
*
ก. เพราะอาจมี TCP Options เพิ่มเติม
ข. เพราะ Source Port มีขนาดไม่แน่นอน
ค. เพราะ Destination Port ถูกลบได้
ง. เพราะ TCP ไม่มี Header ที่แน่นอน
8. Cumulative ACK ของ TCP มีความหมายใกล้เคียงกับข้อใดมากที่สุด
*
ก. ยืนยันว่ารับข้อมูลต่อเนื่องครบถึงก่อนหมายเลขที่ ACK ระบุ
ข. ยืนยันเฉพาะ Segment ล่าสุดเท่านั้น
ค. ใช้ยืนยัน IP Address ของ Router
ง. ใช้สำหรับปิด Connection เท่านั้น
9. EstimatedRTT ใช้เพื่ออะไร
*
ก. ประมาณค่า RTT โดยทำให้ค่าที่วัดได้เรียบขึ้น
ข. กำหนดหมายเลข Port
ค. เพิ่มขนาด TCP Header
ง. เลือก Routing Protocol
10. ก่อนแลกเปลี่ยนข้อมูล TCP ต้องทำ Connection Management เพื่ออะไร
*
ก. สร้างสถานะการเชื่อมต่อระหว่างสองฝั่ง
ข. เปลี่ยน IP Address ของ Server
ค. เพิ่มความเร็วของ Physical Link
ง. ลบ TCP Header
หน้า 2 จาก 3
ห้ามส่งรหัสผ่านใน Google ฟอร์ม
แบบฟอร์มนี้ถูกสร้างขึ้นภายใน kmutnb.ac.th - ติดต่อเจ้าของแบบฟอร์ม
แบบฟอร์มนี้ดูน่าสงสัยใช่ไหม รายงาน


Quiz:  Chapter 3: Transport Layer - TCP และ Congestion Control
s6806021612037@email.kmutnb.ac.th สลับบัญชี
 
กำลังบันทึก…
ระบบจะบันทึกอีเมลของคุณเมื่อส่งแบบฟอร์มนี้
* ระบุว่าเป็นคําถามที่จําเป็น
ส่วนที่ 2: Congestion Control
ข้อ 11–20
11. Congestion เกิดขึ้นเมื่อใด
*
ก. ปริมาณข้อมูลที่เข้าสู่เครือข่ายมากกว่าที่ทรัพยากรจะรองรับได้
ข. Receiver มี Buffer ว่างมาก
ค. ไม่มีข้อมูลถูกส่งในเครือข่าย
ง. Application ปิดการทำงาน
12. AIMD ย่อมาจากข้อใด
*
ก. Additive Increase, Multiplicative Decrease
ข. Additive Increase, Maximum Delay
ค. Automatic Internet Message Delivery
ง. Adaptive Increase, Minimum Data
13. เมื่อ Router Buffer เต็ม อาจเกิดผลใด
*
ก. Packet ถูก Drop
ข. Bandwidth เพิ่มขึ้นเอง
ค. RTT กลายเป็นศูนย์
ง. TCP เปลี่ยนเป็น UDP
14. เหตุใดการส่งข้อมูลซ้ำโดยไม่จำเป็นจึงเป็นผลเสียเมื่อเครือข่าย Congested
*
ก. ใช้ Bandwidth ไปกับข้อมูลซ้ำ
ข. ทำให้ Source Port หาย
ค. ทำให้ IP Address เปลี่ยน
ง. ทำให้ TCP Header ไม่มี Checksum
15. Network-Assisted Congestion Control หมายถึงข้อใด
*
ก. Router หรืออุปกรณ์เครือข่ายช่วยส่งข้อมูลเกี่ยวกับ Congestion
ข. Application เปลี่ยนสาย LAN อัตโนมัติ
ค. Receiver เพิ่ม RAM ให้ Sender
ง. DNS Server ลดขนาด TCP Segment
16. ตัวแปร cwnd ใน TCP ใช้เกี่ยวข้องกับอะไร
*
ก. ควบคุมปริมาณข้อมูลที่ Sender ส่งเข้าเครือข่าย
ข. ระบุหมายเลข Port ของ Application
ค. เก็บ IP Address ของ Router
ง. ระบุชนิดของ Ethernet Frame
17. ในช่วง Slow Start ค่า cwnd มีแนวโน้มเปลี่ยนอย่างไร
*
ก. เพิ่มขึ้นอย่างรวดเร็ว
ข. ลดลงเป็นศูนย์ทันที
ค. คงที่ตลอดเวลา
ง. เปลี่ยนเป็นค่า Destination Port
18. ssthresh ใช้ช่วยกำหนดการเปลี่ยนจาก Slow Start ไปสู่ช่วงใด
*
ก. Congestion Avoidance
ข. Connection Setup
ค. Flow Control
ง. Demultiplexing
19. ECN ช่วยแจ้ง Congestion โดยวิธีใด
*
ก. Mark ข้อมูลใน Packet เพื่อส่งสัญญาณ Congestion โดยไม่จำเป็นต้องรอให้ Packet ถูก Drop
ข. เปลี่ยน TCP เป็น UDP
ค. ลบ ACK Number
ง. เพิ่ม Source Port
20. แนวคิด TCP Fairness ต้องการให้หลาย TCP Connections ที่ใช้ Bottleneck Link ร่วมกันเป็นอย่างไร
*
ก. แบ่ง Capacity กันอย่างเหมาะสมหรือใกล้เคียงกัน
ข. Connection แรกใช้ Bandwidth ทั้งหมด
ค. ทุก Connection หยุดส่งพร้อมกัน
ง. ใช้ Destination Port เดียวกัน
หน้า 3 จาก 3
ห้ามส่งรหัสผ่านใน Google ฟอร์ม
แบบฟอร์มนี้ถูกสร้างขึ้นภายใน kmutnb.ac.th - ติดต่อเจ้าของแบบฟอร์ม
แบบฟอร์มนี้ดูน่าสงสัยใช่ไหม รายงาน

Google ฟอร์ม