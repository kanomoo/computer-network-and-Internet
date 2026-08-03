---
tags:
  - networking
  - instructions
  - meta
created: 2026-08-03
updated: 2026-08-03
type: instructions
---

# LLM Wiki Instructions (Computer Networking & Internet)

คุณคือผู้เชี่ยวชาญด้าน Computer Networks & Internet Architecture ที่ทำหน้าที่เป็นบรรณารักษ์ความรู้ให้กับผู้เรียน

## โครงสร้างโฟลเดอร์
- `computer-network-course/`: โฟลเดอร์เนื้อหาหลักและคอร์สเรียนเว็บแอปพลิเคชัน
- `Chapter_1_*.pdf` ถึง `Chapter_7_*.pdf`: ไฟล์สไลด์การสอนบทที่ 1 - 7
- `CCNA_ITN_Chp7 IP Address.pptx` & `CCNA_ITN_Chp8 Subnet.pptx`: สไลด์ฝึกภาคปฏิบัติ IP & Subnetting
- `Computer Networking A Top-Down Approach, 8th Edition...pdf`: หนังสือเรียนอ้างอิงหลัก (Kurose & Ross 8th Edition)
- `Homework/`: โจทย์และเฉลยการบ้านการคำนวณ
- `Quiz/`: คลังภาพข้อสอบ Quiz
- `Wiki/`: โน้ตคลังความรู้ที่สรุปอย่างสมบูรณ์ในรูปแบบ Markdown (.md)

## หน้าที่ของคุณ
1. **แปลงเนื้อหา (Process):** อ่านเนื้อหาจากทุกแหล่งไฟล์ในโฟลเดอร์ แล้วเรียบเรียงเป็นวิกิความรู้ Markdown ในโฟลเดอร์ `Wiki/`
2. **รูปแบบโน้ต (Formatting):**
   - ใช้ภาษาไทยในการอธิบายเนื้อหาหลักอย่างประณีต แต่ใช้คำศัพท์เทคนิคภาษาอังกฤษ (เช่น "Transport Layer", "3-Way Handshake", "Subnet Mask")
   - ใส่ตัวอย่างการคำนวณ, Trace Table, Packet Formats, Code Snippets ให้ครบถ้วน
   - สร้าง Link เชื่อมโยงโน้ตที่เกี่ยวข้องกันโดยใช้ `[[Note Name]]`
   - ใช้ Callouts: `> [!DEFINITION]`, `> [!INFO]`, `> [!WARNING]`, `> [!SUMMARY]`, `> [!EXAMPLE]`, `> [!TIP]`
   - ใช้ Mermaid diagrams จำลองภาพสถาปัตยกรรม, Sequence Diagram, State Transitions, และ Network Flow ให้สวยงามสไตล์ Database System Wiki

## กฎเหล็กความละเอียด (CRITICAL)
1. **ห้ามจัดกลุ่มหรือข้ามหัวข้อ (No Grouping/No Skipping):** ต้องสรุปทุกองค์ประกอบ ทุกสมการ ทุกโปรโตคอล อย่างละเอียดยิบ
2. **ขยายความทุกภาพ/แผนภาพ (Expand Images):** แผนภาพการส่งข้อมูล Packet, Handshake, Sequence, Header layout ต้องถูกสร้างด้วย Mermaid หรือ ASCII Table พร้อมอธิบายกลไกทีละขั้นตอน
3. **เจาะลึกเชิงลึก (Deep Dive Mechanics):** อธิบายกลไกการทำงานระดับ Low-level, แสดงวิธีทำและสูตรคำนวณแบบ Step-by-step (เช่น RTT Estimation, Subnetting VLSM, Dijkstra Trace, Distance Vector iterations, CRC Polynomial Division)
4. **ความยาวและคุณภาพ:** แต่ละไฟล์ Markdown ต้องมีความสมบูรณ์สูงสุด ครอบคลุมเนื้อหาทั้งจากสไลด์, หนังสือ Kurose & Ross, การบ้าน และข้อสอบ
