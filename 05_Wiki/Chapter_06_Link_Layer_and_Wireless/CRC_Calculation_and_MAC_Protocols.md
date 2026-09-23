# Lecture Notes: Link Layer, Error Detection (CRC), and Multiple Access Protocols

- **วันที่บรรยาย:** วันจันทร์ที่ 21 กันยายน 2569
- **ผู้สอน:** ดร.วรลักษณ์ (Dr. Woralak)
- **ไฟล์เสียงอ้างอิง:** [Transcripts/20260921_135415.txt](file:///C:/Project/computer-network-&-Internet/Transcripts/20260921_135415.txt)
- **หมวดหมู่วิชา:** บทที่ 6: Link Layer and LANs (Kurose & Ross 8th Ed.)

---

## 1. การทำงานของ Data Link Layer และการ์ดแลน (NIC)

Data Link Layer รับผิดชอบการส่งเฟรมข้อมูลระหว่างโหนดสองโหนดที่เชื่อมต่อกันทางกายภาพผ่านสายสัญญาณ (Point-to-Point หรือ Broadcast Channel)
- การทำงานเกิดขึ้นใน **Network Adapter / Network Interface Card (NIC)** ซึ่งผสมผสานระหว่างฮาร์ดแวร์, คอนโทรลเลอร์, และไดรเวอร์บนระบบปฏิบัติการ
- **Encapsulation:** เติม Header, Trailer, และบิตตรวจสอบข้อผิดพลาด (EDC)
- **Decapsulation:** ฝั่งรับตรวจสอบ EDC หากไม่พบ Error จะปอก Header ออกแล้วส่ง Datagram ให้ Network Layer

---

## 2. คู่มือและเฉลยการคำนวณ Cyclic Redundancy Check (CRC Assignment)

### 2.1 กฎเกณฑ์การคำนวณ CRC
1. แปลง Generator Polynomial $G(x)$ ให้เป็นบิตตัวหารความยาว $L$ บิต
2. เติมบิต `0` ต่อท้ายข้อมูล $D$ จำนวน $L - 1$ ตัว ($D \cdot 2^{L-1}$)
3. ตั้งหารยาวโดยใช้การดำเนินการ **XOR ($\oplus$)** ไม่มีการยืมบิต
4. เศษที่เหลือความยาว $L - 1$ บิต คือค่า **CRC Code ($R$)**
5. เฟรมที่ส่งออกไปคือ: ข้อมูลเดิม $D$ ต่อท้ายด้วยเศษ $R$

---

### 2.2 เฉลยโจทย์การบ้านที่อาจารย์สั่งในห้องเรียน (กำหนดส่ง 22 ก.ย. 2569)

> **โจทย์:**
> - Data block: $D = 1 0 0 1 0 0$
> - Generator Polynomial: $G(x) = x^3 + 1$
> - จงคำนวณหาค่า CRC และเฟรมที่ส่งจริง

#### ขั้นตอนการทำ:
1. **แปลงตัวหาร $G$:**
   $$G(x) = 1 \cdot x^3 + 0 \cdot x^2 + 0 \cdot x^1 + 1 \cdot x^0 \implies G = \mathbf{1 0 0 1}$$
   ความยาว $L = 4$ บิต
2. **เติมศูนย์ต่อท้าย $D$ จำนวน $L - 1 = 3$ บิต:**
   $$D' = 1 0 0 1 0 0 \mathbf{0 0 0}$$
3. **ตั้งหารยาวด้วย XOR:**
```text
           1 0 0 0 0 0   <-- ผลหาร (ไม่นำมาใช้งาน)
        ------------------
1 0 0 1 ) 1 0 0 1 0 0 0 0 0
          1 0 0 1
          -------
          0 0 0 0 0        (ชัก 0 -> บิตแรกเป็น 0 ให้ XOR ด้วย 0000)
            0 0 0 0
            -------
            0 0 0 0 0      (ชัก 0)
              0 0 0 0
              -------
              0 0 0 0 0    (ชัก 0)
                0 0 0 0
                -------
                0 0 0 0 0  (ชัก 0)
                  0 0 0 0
                  -------
                  0 0 0 0  <-- เศษที่เหลือ R (Remainder)
```
4. **ผลลัพธ์:**
   - ค่า $\text{CRC} = \mathbf{0 0 0}$
   - เฟรมข้อมูลที่ส่งออกไปจริง: $\mathbf{1 0 0 1 0 0 0 0 0}$

---

## 3. สรุปโปรโตคอล Multiple Access Control (MAC Protocols)

### 3.1 Channel Partitioning (การแบ่งช่องสัญญาณ)
- **TDMA (Time Division):** แบ่งเวลาเป็นรอบ แต่ละรอบแบ่งเป็น Time Slots เท่าๆ กันตามจำนวนโหนด ไม่มี Collision แต่ถ้าโหนดไม่มีข้อมูลจะสูญเสียเวลาสล็อตไปโดยเปล่าประโยชน์
- **FDMA (Frequency Division):** แบ่งย่านความถี่ออกจากกัน

### 3.2 Random Access (การเข้าถึงแบบสุ่ม)
- **Slotted ALOHA:** โหนดส่งได้เฉพาะต้นสล็อต ประสิทธิภาพสูงสุดเพียง **37% ($1/e$)**
- **CSMA (Carrier Sense Multiple Access):** "Listen before transmit" (ฟังก่อนส่ง ถ้าช่องสัญญาณว่างจึงส่ง)
- **CSMA/CD (Collision Detection):** ฟังก่อนส่ง และตรวจสอบระหว่างส่ง หากสัญญาณชนกันจะส่ง Jam Signal และหยุดทันที จากนั้นสุ่มเวลารอใหม่ด้วย **Binary Exponential Backoff** (มาตรฐานของ Ethernet สายแลน)
- **CSMA/CA (Collision Avoidance):** ใช้บน Wi-Fi ไร้สายเนื่องจากการตรวจจับการชนทางคลื่นวิทยุทำได้ยาก จึงใช้การหลีกเลี่ยงล่วงหน้า (RTS/CTS, ACK)

### 3.3 Taking-Turns (การผลัดกันส่ง)
- **Polling:** ตัวแม่ข่าย Master สอบถามสิทธิ์ทีละโหนด
- **Token Passing:** ส่งต่อเหรียญ Token ในวงแหวน (Token Ring)
