# 🌐 Master Exam Review - Chapters 5 to 7 & 12 Quizzes (Final Exam Scope)

> **วิชา:** 060243102 Computer Network & Internet (IT ปี 2 เทอม 1 KMUTNB)  
> **ขอบเขต:** ข้อสอบปลายภาคเนื้อหาบทที่ 5 (Network Control Plane), บทที่ 6 (Link Layer) และบทที่ 7 (Wireless & Mobile Networks) พร้อมเจาะลึก 12 ควิซประจำเทอม

---

## 📌 บทที่ 5: Network Layer Control Plane (Routing Algorithms & Protocols)

### 1. การคำนวณ Dijkstra’s Algorithm (Link-State Routing)
* **คุณลักษณะ:** ทำงานแบบ Global Information (ทุกโหนดรู้ทอพอโลยีและค่าน้ำหนักทุกเส้นผ่าน OSPF Link-State Advertisements)
* **ตาราง Trace Table:**
  * กำหนดเซต $N'$ (โหนดที่รู้เส้นทางสั้นที่สุดแล้ว)
  * $D(v)$: ต้นทุนต่ำสุดจาก Source ไปยังโหนด $v$
  * $p(v)$: โหนดก่อนหน้า (Predecessor)
* **สูตรอัปเดต:**
  $$D(v) = \min(D(v), D(w) + c(w, v))$$
* **ความซับซ้อน (Complexity):**
  * แบบปกติ: $O(N^2)$
  * ใช้ Min-Heap / Priority Queue: $O((|E| + |V|) \log |V|)$

### 2. Distance-Vector Routing & Bellman-Ford Equation
* **คุณลักษณะ:** ทำงานแบบ Decentralized, Asynchronous, Iterative (คุยเฉพาะกับ Direct Neighbors)
* **สมการ Bellman-Ford:**
  $$d_x(y) = \min_v \{ c(x, v) + d_v(y) \}$$
* **ปัญหาและกับดักข้อสอบ:**
  * **Good news travels fast, Bad news travels slow (Count-to-Infinity Problem)**
  * **Poisoned Reverse:** ถ้าโหนด $Z$ วิ่งผ่าน $Y$ เพื่อไป $X$ โหนด $Z$ จะบอก $Y$ ว่าระยะทาง $D_z(X) = \infty$ เพื่อป้องกัน Routing Loop 2 โหนด

### 3. Intra-AS vs Inter-AS Routing
* **Intra-AS (IGP):** 
  * **OSPF (Open Shortest Path First):** ใช้ Link-State (Dijkstra), ปลอดภัยด้วย Authentication, รองรับ Hierarchical OSPF (Area 0 Backbone)
* **Inter-AS (EGP):**
  * **BGP (Border Gateway Protocol):** เป็น de facto ของอินเทอร์เน็ต ใช้ Path-Vector
  * คีย์แอตทริบิวต์: **AS-PATH** (ป้องกัน Loop) และ **NEXT-HOP**
  * การตัดสินใจเลือกเส้นทาง: Policy > Shortest AS-PATH > Closest NEXT-HOP (Hot-potato)

---

## 📌 บทที่ 6: Link Layer & LANs (MAC, Error Control & Switching)

### 1. การคำนวณ CRC (Cyclic Redundancy Check)
* ข้อสอบออกคำนวณหารพหุนาม (Modulo-2 Arithmetic / XOR):
  * กำหนดข้อมูล $D = 101110$ และตัวหาร Generator $G = 1001$ ($r = 3$ bits)
  * เติม 0 จำนวน $r$ บิตต่อท้าย $D$: $101110000$
  * นำ $101110000$ หารด้วย $G$ ด้วย XOR การลบ
  * นำเศษเหลือ (Remainder $R$) $r$ บิตไปต่อท้าย $D$ ส่งออกไปในเฟรม

### 2. Multiple Access Protocols (CSMA/CD)
* **Carrier Sense Multiple Access with Collision Detection (Ethernet):**
  * ตรวจสอบสายก่อนส่ง (Carrier Sense)
  * ส่งไปพร้อมฟังเสียงชน (Collision Detection)
  * เมื่อชน: หยุดส่ง ส่ง **Jam Signal (48 bits)** แล้วใช้ **Binary Exponential Backoff**:
    * ชนครั้งที่ $m$: สุ่ม $K \in \{0, 1, \dots, 2^{\min(m, 10)} - 1\}$
    * รอเวลา $K \times 512$ bit times

### 3. ARP & Link-Layer Switch
* **ARP (Address Resolution Protocol):**
  * แมป IP Address ➔ MAC Address (48 bits ในรูปแบบ Hexadecimal)
  * **ARP Request:** ส่งแบบ **Broadcast** (`FF:FF:FF:FF:FF:FF`)
  * **ARP Reply:** ตอบกลับแบบ **Unicast**
* **Self-Learning Switch (Plug-and-Play):**
  * สวิตช์เรียนรู้จาก **Source MAC Address** และหมายเลขพอร์ตขาเข้า
  * ถ้า Destination MAC ไม่อยู่ใน Table ➔ สวิตช์ทำ **Flood (Forward ออกทุกพอร์ต ยกเว้นพอร์ตขาเข้า)**
  * แยก Collision Domain แต่แชร์ Broadcast Domain (แก้ด้วย VLAN)

---

## 📌 บทที่ 7: Wireless & Mobile Networks (802.11 WiFi)

### 1. ความท้าทายของระบบไร้สาย
* สัญญาณลดทอนตามระยะทาง (Path Loss), การสะท้อนหลายทิศทาง (Multipath Propagation), สัญญาณรบกวน (Interference)
* **Hidden Terminal Problem:** สถานี A และ C ส่งข้อมูลให้ B แต่ A และ C มองไม่เห็นกันเอง ทำให้เกิดการชนที่ B
* **Exposed Terminal Problem:** การที่โหนดเข้าใจผิดว่าช่องสัญญาณไม่ว่าง จึงไม่ยอมส่ง ทั้งที่ปลายทางคนละจุด

### 2. CSMA/CA (Collision Avoidance) กับ RTS/CTS
* ใน WiFi ทำ Collision Detection ไม่ได้ (เพราะสัญญาณส่งกลบสัญญาณรับของตัวเอง) จึงต้องใช้ **Collision Avoidance**
* **กลไก Handshake RTS/CTS:**
  1. ผู้ส่งส่ง **RTS (Request to Send)** เล็กๆ ไปยัง Access Point (AP)
  2. AP กระจาย **CTS (Clear to Send)** เพื่อจองแชนแนล
  3. โหนดข้างเคียงที่ได้ยิน CTS จะตั้งค่า **NAV (Network Allocation Vector)** และหยุดส่งชั่วคราว
  4. ผู้ส่งส่งข้อมูลจริง และรอ **ACK**

---

## 📝 รวมประเด็น 12 Quizzes ในห้องเรียนที่ห้ามพลาด

1. **Subnetting & Host Formula:**
   * จำนวน Host ที่ใช้ได้ = $2^{(32 - \text{Prefix})} - 2$ (หัก Network ID และ Broadcast)
2. **TCP Flags & Handshake:**
   * 3-Way Handshake: SYN ➔ SYN-ACK ➔ ACK
   * Connection Teardown: FIN ➔ ACK ➔ FIN ➔ ACK
3. **Difference between Hub, Switch, and Router:**
   * Hub = Layer 1 (แชร์ Collision & Broadcast)
   * Switch = Layer 2 (แยก Collision, แชร์ Broadcast)
   * Router = Layer 3 (แยก Collision & Broadcast)
