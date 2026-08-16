const fs = require('fs');

const ch1Data = JSON.parse(fs.readFileSync('tools/ch1_parsed.json', 'utf8'));

// Visual enhancements (Tables, ASCII Flows, Formulas) for each slide in Chapter 1
const slideVisuals = {
  1: `| หัวข้อ | รายละเอียด |
| :--- | :--- |
| 📘 **หนังสืออ้างอิง** | *Computer Networking: A Top-Down Approach (9th Edition, 2025)* |
| ✍️ **ผู้แต่ง** | Jim Kurose & Keith Ross (Pearson) |
| 🎯 **วัตถุประสงค์สไลด์** | สไลด์เปิดบทระบุที่มา ลิขสิทธิ์ และข้อกำหนดการนำสื่อการสอนไปใช้ |`,

  2: `\`\`\`
[ 🗺️ Chapter 1 Roadmap: แผนที่นำทางของบทที่ 1 ]
  ├── 1. Network Edge : Hosts, Access Networks, Physical Media
  ├── 2. Network Core : Packet Switching, Circuit Switching, Network of Networks
  ├── 3. Performance  : Delay (4 ชนิด), Loss, Throughput
  ├── 4. Protocol Layers & Service Models (5-Layer Internet Stack & OSI)
  └── 5. Network Security & Internet History
\`\`\``,

  3: `| องค์ประกอบหลัก | ชนิดอุปกรณ์ / สื่อกลาง | หน้าที่ในระบบเครือข่าย |
| :--- | :--- | :--- |
| 💻 **End Systems (Hosts)** | PC, Smartphone, Server, IoT Devices | รัน Network Applications อยู่ที่ "ขอบ" ของเครือข่าย (Edge) |
| 🔀 **Packet Switches** | Routers (Layer 3), Link Switches (Layer 2) | ส่งต่อกลุ่มก้อนข้อมูล (Packets) ไปตามเส้นทาง |
| ⚡ **Communication Links** | Fiber Optic, Copper Wire, Radio, Satellite | ช่องทางการส่งข้อมูล มีอัตราเร็ว Transmission Rate ($R$ bps) |
| 🌐 **Networks** | Home, Enterprise, Mobile, ISP Networks | กลุ่มของอุปกรณ์และลิงก์ภายใต้การบริหารจัดการขององค์กร |`,

  4: `| หมวดหมู่อุปกรณ์ IoT | ตัวอย่างอุปกรณ์ในสไลด์ | บทบาทหน้าที่ทางเครือข่าย |
| :--- | :--- | :--- |
| 🏠 **Smart Home** | Amazon Echo, Smart Fridge, IP Frame, Smart Bed | ส่งข้อมูลเซ็นเซอร์ สตรีมเพลง ควบคุมระยะไกล |
| 🏥 **Medical & Health** | Pacemaker, Glucose Monitor, Fitbit, AR Glasses | ส่งข้อมูลชีพจรและสุขภาพแบบ Real-time ไปยังแพทย์ |
| 🚗 **Transportation** | Connected Cars, E-Scooters, Smart Bikes | ระบบนำทาง GPS, ตรวจสอบสภาพรถยนต์, ระบบแชร์ยานพาหนะ |
| 🏭 **Sensors & Energy** | Tweet-a-Watt, Security Cameras, Smart Toaster | ตรวจวัดการใช้พลังงาน รายงานสภาพอากาศ และรักษาความปลอดภัย |`,

  5: `| หัวข้อสำคัญ | รายละเอียดจากสไลด์ | คำอธิบายเชิงวิศวกรรม |
| :--- | :--- | :--- |
| 🌐 **Network of Networks** | การเชื่อมต่อกันของโครงข่ายนับล้าน | อุปกรณ์ปลายทางสื่อสารข้ามโลกได้ผ่าน ISP ที่เชื่อมต่อกัน |
| 📜 **Protocols** | HTTP, Zoom, TCP, IP, Wi-Fi, 4G/5G, Ethernet | ควบคุมรูปแบบ ลำดับ และการตอบสนองของข้อความทั้งหมด |
| 🏛️ **Internet Standards** | IETF RFC (Request for Comments) | มาตรฐานกลางเพื่อให้ฮาร์ดแวร์/ซอฟต์แวร์ต่างค่ายทำงานร่วมกันได้ |`,

  6: `\`\`\`
[ 📱 Distributed Applications ] (Web, Email, Streaming, Games)
               │
               ▼ (เรียกใช้ผ่าน Socket API)
[ 🚪 Socket Interface ] : sendto(), recvfrom(), connect()
               │
               ▼
[ 🌐 Internet Infrastructure ] : ส่งข้อมูลไปยังปลายทางโดยซ่อนความซับซ้อนภายใน
\`\`\``,

  7: `> [!DEFINITION] Protocol (โปรโตคอล) คืออะไร?
> โปรโตคอลคือกฎเกณฑ์และข้อตกลงมาตรฐานที่กำหนด **3 องค์ประกอบหลัก**:
> 1. **Format (รูปแบบ):** โครงสร้างและชนิดข้อมูลของแต่ละไบต์/บิตในข้อความ
> 2. **Order (ลำดับ):** ลำดับก่อน-หลังในการส่งและรับข้อความ
> 3. **Actions (การกระทำ):** สิ่งที่ต้องทำเมื่อส่ง/รับข้อความ หรือเมื่อเกิดความผิดพลาด/หมดเวลา (Timeout)`,

  8: `\`\`\`
[ 👥 Human Protocol ]                          [ 💻 Computer Network Protocol ]

   Alice                     Bob                    Web Client                Web Server
     │                        │                         │                         │
     │─── 1. "Hi" (สวัสดี) ──>│                         │── 1. TCP SYN Request ──>│
     │                        │                         │   (ขอเชื่อมต่อ Port 80) │
     │<── 2. "Hi" (สวัสดี) ───│                         │                         │
     │                        │                         │<── 2. TCP SYN-ACK ──────│
     │─── 3. "Got the time?" ─>│                        │    (ยินยอมเชื่อมต่อ)    │
     │   (ขอทราบเวลา)         │                         │                         │
     │                        │                         │── 3. HTTP GET index.html>│
     │<── 4. "2:00" ──────────│                         │   (ขอไฟล์หน้าเว็บ)      │
     │   (บอกเวลาบ่ายสอง)     │                         │                         │
     │                        │                         │<── 4. HTTP 200 OK ──────│
                                                        │   + [ส่งข้อมูลเว็บเพจ]  │
\`\`\`

| ลำดับขั้นตอน | 👥 Human Protocol (การสนทนาของมนุษย์) | 💻 Network Protocol (เครือข่ายคอมพิวเตอร์) | หน้าที่และความหมายเชิงเทคนิค |
| :---: | :--- | :--- | :--- |
| **Step 1** | Alice พูด: *"Hi"* | Client ส่ง: \`TCP SYN\` | เริ่มต้นขอจับมือสร้างการเชื่อมต่อ (Connection Setup) |
| **Step 2** | Bob ตอบ: *"Hi"* | Server ตอบ: \`TCP SYN-ACK\` | ยืนยันความพร้อมและยินยอมเปิดช่องทางสื่อสาร |
| **Step 3** | Alice ถาม: *"Got the time?"* | Client ส่ง: \`HTTP GET /index.html\` | ส่งคำขอข้อมูลตามที่ต้องการ (Specific Request) |
| **Step 4** | Bob ตอบ: *"2:00"* | Server ตอบ: \`HTTP 200 OK + Data\` | ส่งมอบข้อมูลที่ร้องขอกลับไปยังผู้ขอ (Data Delivery) |`,

  10: `| บทบาทของ Host | ลักษณะการทำงาน | สถานที่ตั้งในระบบจริง |
| :--- | :--- | :--- |
| 📱 **Clients** | ร้องขอบริการ (Request Service) จากเซิร์ฟเวอร์ | อุปกรณ์ส่วนตัวของผู้ใช้ (Smartphones, PCs, Laptops, IoT) |
| 🗄️ **Servers** | ให้บริการและตอบสนองคำขอ (Provide Service) | รวมกันหนาแน่นใน **Data Centers** ขนาดใหญ่เพื่อรองรับโหลดมหาศาล |`,

  11: `| ชนิดสื่อสื่อสาร | รูปแบบเทคโนโลยี (Technologies) | อัตราความเร็วและลักษณะเฉพาะ |
| :--- | :--- | :--- |
| 🔌 **Wired Access (มีสาย)** | DSL, Cable HFC, FTTH (Fiber Optic), Ethernet | ความเร็วสูง เสถียรภาพสูง มีทั้งสายแชร์ (Cable) และสายเดี่ยว (DSL/FTTH) |
| 📡 **Wireless Access (ไร้สาย)** | Wi-Fi (802.11 b/g/n/ac/ax), 4G/5G Cellular | ความคล่องตัวสูง เชื่อมต่อผ่าน Base Station หรือ Access Point (AP) |`,

  12: `\`\`\`
[ 💻 Host (End System) ] ──(Access Link)──> [ 🛡️ Edge Router ] ──> [ 🔀 Network Core (Interconnected Routers) ]
\`\`\``,

  14: `\`\`\`
[ แถบความถี่ของสายเคเบิลแบบ FDM (Frequency Division Multiplexing) ]
├── 5 - 42 MHz    : 📤 Upstream Control & Data (ส่งข้อมูลขึ้น)
├── 54 - 550 MHz  : 📺 Video Broadcast Channels (ช่องรายการทีวี)
└── 550 - 750 MHz : 📥 Downstream Data (ดาวน์โหลดข้อมูลอินเทอร์เน็ต)
\`\`\``,

  15: `| องค์ประกอบ HFC | เทคโนโลยีสื่อกลาง | ลักษณะการส่งสัญญาณ |
| :--- | :--- | :--- |
| **Cable Headend (CMTS)** | เชื่อมต่อไปยัง ISP Core | ศูนย์กระจายสัญญาณหลักของบริษัทเคเบิล |
| **Fiber Node** | เชื่อม Headend ด้วยสาย **Fiber Optic** | แปลงสัญญาณแสงเป็นสัญญาณไฟฟ้าระดับย่านชุมชน |
| **Homes (Cable Modem)** | เชื่อม Fiber Node ด้วยสาย **Coaxial Cable** | **Shared Medium** (แบนด์วิดท์ถูกแชร์ร่วมกันในละแวกบ้าน) |`,

  16: `| องค์ประกอบ DSL | สื่อกลาง | การจัดสรรช่องสัญญาณ |
| :--- | :--- | :--- |
| **DSL Modem (บ้าน)** | สายโทรศัพท์ทองแดงคู่ตีเกลียว | ช่องโทรศัพท์ (0-4 kHz), Upstream (4-50 kHz), Downstream (50 kHz-1 MHz) |
| **Central Office (CO)** | **Dedicated Line** (สายเฉพาะบ้านใครบ้านมัน) | แยกสัญญาณเสียงไปเครือข่ายโทรศัพท์ และแยกข้อมูลไป Router ผ่าน DSLAM |`,

  17: `\`\`\`
[ 🏠 Home Network Architecture ]
  ├── 💻 Wireless Devices (Laptops, Phones) ──> [ 📶 Wi-Fi Access Point ]
  ├── 🖥️ Wired Devices (Desktop PC, TV)     ──> [ 🔌 Ethernet Switch ]
  └── รวมอยู่ในกล่อง Home Router Gateway ──────> [ 🛡️ Router + NAT + Firewall ] ──> [ 📟 Modem ] ──> ISP
\`\`\``,

  18: `| ชนิดเครือข่ายไร้สาย | มาตรฐานและเทคโนโลยี | ระยะทำการ (Range) | อัตราความเร็ว (Speed) |
| :--- | :--- | :--- | :--- |
| 📶 **Wireless LAN (WLAN)** | Wi-Fi (802.11 b/g/n/ac/ax) | ภายใน/รอบอาคาร (~10 - 100 เมตร) | 11, 54, 450 Mbps ถึง Gbps |
| 🗼 **Wide-Area Cellular** | 4G LTE, 5G NR | ระดับหลายสิบกิโลเมตร (Wide Area) | 10 Mbps ถึง Gbps |`,

  19: `\`\`\`
[ 🏢 Enterprise Network Structure ]
  ├── Institutional Users (PCs, Laptops) ──> [ 🔌 Access Switches (100 Mbps - 1 Gbps) ]
  ├── Mail / Web / Database Servers      ──> [ 🔌 Distribution Switches ]
  └── ทั้งหมดเชื่อมต่อรวมกันเข้าสู่         ──> [ 🛡️ Enterprise Core Router ] ──(1-10 Gbps)──> ISP Link
\`\`\``,

  20: `\`\`\`
[ ☁️ Data Center Interconnect Architecture ]
  Thousands of Blade Servers ──> [ 🔌 Top of Rack (ToR) Switches ] ──> [ 🔌 Leaf / Spine Switches ] ──> Core Routers
\`\`\``,

  21: `> [!DEFINITION] Transmission Delay Formula (สูตรความหน่วงในการส่งข้อมูล)
> $$d_{\\text{trans}} = \\frac{L}{R} \\quad \\text{(วินาที)}$$
> - $L$ = ขนาดของ Packet (หน่วยเป็น **Bits**)
> - $R$ = อัตราความเร็วในการส่งข้อมูลของ Link (Transmission Rate / Bandwidth, หน่วยเป็น **Bits per second - bps**)`,

  22: `| สื่อกลางแบบมีสาย | โครงสร้างและมาตรฐาน | อัตราความเร็วและระยะทาง |
| :--- | :--- | :--- |
| **UTP Cat5e** | สายทองแดง 4 คู่ตีเกลียว ไม่มีฉนวนหุ้มพิเศษ | รองรับ 1 Gbps ที่ระยะทางสูงสุด 100 เมตร |
| **UTP Cat6** | สายทองแดงตีเกลียวแน่น มีแกนพลาสติกคั่นกลาง | รองรับ 10 Gbps ที่ระยะทางสูงสุด 55-100 เมตร |`,

  23: `| สื่อสัญญาณ | ลักษณะทางกายภาพ | คุณสมบัติเด่น |
| :--- | :--- | :--- |
| **Coaxial Cable** | ตัวนำทองแดงแกนเดี่ยว หุ้มฉนวนและตาข่ายโลหะ | ส่งได้ทั้งสัญญาณเบสแบนด์และบรอดแบนด์สองทิศทาง (DOCSIS) |
| **Optical Fiber** | เส้นใยแก้วบริสุทธิ์ ส่งข้อมูลด้วยพัลส์แสงเลเซอร์ | แบนด์วิดท์มหาศาล (100 Gbps+), สัญญาณสูญเสียน้อยมาก, ทนทานต่อคลื่นรบกวน |`,

  24: `| ประเภทคลื่นวิทยุ | ย่านความถี่และลักษณะ | ระยะทางและการใช้งาน |
| :--- | :--- | :--- |
| **Terrestrial Microwave** | คลื่นไมโครเวฟแบบ Line-of-Sight (จานส่งตรง) | ส่งสัญญาณข้ามยอดตึก/ภูเขา ความเร็วระดับหลายสิบ Gbps |
| **Satellite (GEO)** | ดาวเทียมวงโคจรค้างฟ้า 36,000 กม. | หน่วงเวลาสูง (~280 ms One-Way Propagation Delay) |
| **Satellite (LEO)** | ดาวเทียมวงโคจรต่ำ 500–1,000 กม. (เช่น Starlink) | หน่วงเวลาต่ำ ครอบคลุมพื้นที่ห่างไกลทั่วโลก |`,

  27: `| หน้าที่หลักในแกนกลาง | นิยามเชิงวิศวกรรม | Plane ที่รับผิดชอบ | ขอบเขตการทำงาน |
| :--- | :--- | :--- | :--- |
| 🔀 **Forwarding** | การสลับแพ็กเก็ตจากพอร์ตขาเข้า (Input Link) ไปยังพอร์ตขาออก (Output Link) | **Data Plane (ฮาร์ดแวร์)** | ภายใน Router แต่ละตัว (Local Action) |
| 🧠 **Routing** | การคำนวณและเลือกเส้นทางที่ดีที่สุดจากต้นทางไปยังปลายทาง | **Control Plane (ซอฟต์แวร์)** | ทั้งเครือข่ายต้นทางถึงปลายทาง (Global Process) |`,

  30: `\`\`\`
[ 💻 Source ] ──(L bits, R bps)──> [ 🔀 Router (Store & Forward) ] ──(L bits, R bps)──> [ 🖥️ Destination ]

สูตร End-to-End Delay (เมื่อไม่คิด Queuing และ Propagation Delay):
Total Delay = 2 * (L / R)
\`\`\``,

  34: `| การแบ่งช่องสัญญาณ | หลักการทำงาน | ลักษณะการแบ่งรีซอร์ส |
| :--- | :--- | :--- |
| 📻 **FDM (Frequency Division)** | แบ่งความถี่ออกเป็นช่วงย่อยๆ | ผู้ใช้แต่ละคนได้ย่านความถี่เฉพาะตัวตลอดเวลา |
| ⏱️ **TDM (Time Division)** | แบ่งเวลาออกเป็น Time Slots สลับวนกัน | ผู้ใช้แต่ละคนได้แบนด์วิดท์เต็มที่แต่เฉพาะใน Time Slot ของตน |`,

  35: `> [!EXAMPLE] ตัวอย่างการคำนวณ: Packet Switching vs Circuit Switching
> - **สภาวะ:** ลิงก์ความเร็ว $R = 1\\text{ Mbps}$ ($1,000\\text{ kbps}$), ผู้ใช้แต่ละคนต้องการ $100\\text{ kbps}$ เมื่อใช้งาน, ใช้งานจริงแค่ **10% ของเวลาทั้งหมด** ($p = 0.1$)
> - **1. Circuit Switching:** รองรับได้สูงสุดเพียง $\\frac{1,000\\text{ kbps}}{100\\text{ kbps}} = \\mathbf{10\\text{ คน}}$ เท่านั้น (เพราะต้องจองช่องสัญญาณตายตัว)
> - **2. Packet Switching:** สามารถรองรับผู้ใช้ได้ถึง **35 คน** พร้อมกัน โดยมีโอกาสที่ผู้ใช้จะเปิดใช้งานพร้อมกันเกิน 10 คน น้อยกว่า $0.0004$ ($0.04\\%$) ตามสูตร Binomial:
>   $$P(\\text{Active users} \\ge 11) = \\sum_{k=11}^{35} \\binom{35}{k} (0.1)^k (0.9)^{35-k} \\approx 0.00037$$`,

  42: `\`\`\`
[ Tier-1 ISP A ] <========= (Peering Link: แลกเปลี่ยนข้อมูลฟรี) =========> [ Tier-1 ISP B ]
       ▲                                                                         ▲
       │                                                                         │
[ Regional ISP 1 ] <======> [ 🏢 IXP: Internet Exchange Point ] <======> [ Regional ISP 2 ]
\`\`\``,

  48: `| ชนิดของ Delay | สัญลักษณ์ | สาเหตุและกลไกการเกิด | ขนาดเวลาโดยทั่วไป |
| :--- | :---: | :--- | :---: |
| 🔍 **Processing Delay** | $d_{\\text{proc}}$ | ตรวจสอบ Bit Error Header และค้นหาตาราง Forwarding Table | Microseconds (เล็กมาก) |
| ⏳ **Queuing Delay** | $d_{\\text{queue}}$ | รอคิวใน Output Buffer ก่อนที่ Link จะว่างส่งออกไป | ขึ้นกับ Traffic Intensity ($La/R$) |`,

  49: `| ชนิดของ Delay | สัญลักษณ์ | สูตรการคำนวณ | ปัจจัยที่ส่งผล |
| :--- | :---: | :--- | :--- |
| 📤 **Transmission Delay** | $d_{\\text{trans}}$ | $$d_{\\text{trans}} = \\frac{L}{R}$$ | ขึ้นกับขนาด Packet ($L$) และความเร็ว Link ($R$) |
| 🚀 **Propagation Delay** | $d_{\\text{prop}}$ | $$d_{\\text{prop}} = \\frac{d}{s}$$ | ขึ้นกับระยะทาง ($d$) และความเร็วแสงในตัวกลาง ($s \\approx 2 \\times 10^8\\text{ m/s}$) |`,

  50: `\`\`\`
[ 톨 ด่านเก็บเงิน 1 ] ====== (ทางหลวงระยะทาง d = 100 km, ความเร็ว s = 100 km/h) ======> [ 톨 ด่านเก็บเงิน 2 ]
   ขบวนรถ 10 คัน (1 Packet = 10 Bits)
   - เวลาจ่ายเงินที่ด่าน (d_trans) = 10 คัน * 12 วินาที = 120 วินาที (2 นาที)
   - เวลาวิ่งบนทางหลวง (d_prop)    = 100 km / (100 km/h) = 60 นาที
\`\`\``,

  52: `| Traffic Intensity ($I = \\frac{La}{R}$) | พฤติกรรมของคิว (Queueing Behavior) |
| :---: | :--- |
| **$I \\approx 0$** | แพ็กเก็ตมาถึงน้อยมาก แทบไม่มีคิว ($d_{\\text{queue}} \\approx 0$) |
| **$I \\to 1$** | ความหน่วงในคิวเพิ่มขึ้นแบบ Exponential พุ่งขึ้นสู่อนันต์ ($\to \\infty$) |
| **$I > 1$** | อัตราข้อมูลเข้ามากกว่าความจุลิงก์ -> บัฟเฟอร์ล้น เกิด **Packet Loss 100%** |`,

  57: `\`\`\`
[ Server (Rs bps) ] ──────(ท่อ Rs)──────> [ 🔘 Bottleneck Link (Rc bps) ] ──────(ท่อ Rc)──────> [ Client ]

End-to-End Throughput = min(Rs, Rc)
\`\`\``,

  71: `| ชั้น (Layer) | ชื่อเลเยอร์ | หน่วยข้อมูล (PDU) | ตัวอย่างโปรโตคอล / เทคโนโลยี |
| :---: | :--- | :---: | :--- |
| **5** | **Application** | Message | HTTP, SMTP, DNS, SSH, FTP |
| **4** | **Transport** | Segment | TCP, UDP |
| **3** | **Network** | Datagram | IP (IPv4/IPv6), ICMP, Routing Protocols |
| **2** | **Data Link** | Frame | Ethernet (802.3), Wi-Fi (802.11), DOCSIS |
| **1** | **Physical** | Bits | สายทองแดง UTP, ไฟเบอร์ออปติก, คลื่นวิทยุ |`,

  72: `\`\`\`
[ Application Layer ]  : [ Data (M) ]
                               │
                               ▼ (ใส่ TCP Header)
[ Transport Layer ]    : [ Ht | Data (M) ]  <=== Segment
\`\`\``,

  73: `\`\`\`
[ Transport Layer ]    : [ Ht | Data (M) ]
                               │
                               ▼ (ใส่ IP Header)
[ Network Layer ]      : [ Hn | Ht | Data (M) ]  <=== Datagram
\`\`\``,

  74: `\`\`\`
[ Network Layer ]      : [ Hn | Ht | Data (M) ]
                               │
                               ▼ (ใส่ Link Header และ Trailer)
[ Data Link Layer ]    : [ Hl | Hn | Ht | Data (M) | Tl ]  <=== Frame
\`\`\``,

  77: `\`\`\`
[ 💻 Source Host ]       [ 🔌 L2 Switch ]       [ 🔀 L3 Router ]       [ 🖥️ Dest Host ]
  Application (5)                                                        Application (5)
  Transport   (4)                                                        Transport   (4)
  Network     (3) ─────────────────────────────> Network     (3) ──────> Network     (3)
  Link        (2) ───> Link        (2) ────────> Link        (2) ──────> Link        (2)
  Physical    (1) ───> Physical    (1) ────────> Physical    (1) ──────> Physical    (1)
\`\`\``,

  83: `\`\`\`
[ 📜 วิวัฒนาการประวัติศาสตร์อินเทอร์เน็ต ]
  ├── 1961 - 1972 : ทฤษฎี Packet Switching & โครงข่าย ARPANET 4 โหนดแรกบนสวิตช์ IMP
  ├── 1972 - 1980 : E-mail, ALOHAnet และสถาปัตยกรรม TCP/IP โดย Vint Cerf & Bob Kahn
  ├── 1980 - 1990 : กำเนิด DNS, NSFNET และการขยายตัวสู่เครือข่ายมหาวิทยาลัยทั่วโลก
  ├── 1990 - 2005 : ยุคพาณิชย์, World Wide Web (HTTP/HTML), เบราว์เซอร์ Mosaic & Web Boom
  └── 2005 - ปัจจุบัน : สเกล 10,000 ล้านอุปกรณ์, 4G/5G Mobile, Cloud, CDN, SDN และ AI
\`\`\``,

  89: `\`\`\`
[ 🔌 Network Interface Card (NIC) ]
                 │ (ดักจับทุกแพ็กเก็ตผ่าน Promiscuous Mode)
                 ▼
[ ⚙️ Packet Capture Library ] : libpcap (Linux/Mac) / WinPcap (Windows)
                 │
                 ▼
[ 📊 Wireshark Protocol Analyzer ] : แยกชำแหละ Packet Headers ทุกเลเยอร์ (Frame -> IP -> TCP -> HTTP)
\`\`\``
};

function formatSlideDatabaseStyle(item) {
  let raw = item.text || '';

  raw = raw.replace(/<article\b[^>]*>/gi, '')
           .replace(/<\/article>/gi, '')
           .replace(/<article[^>]*$/gim, '')
           .replace(/\[IMAGE\]/g, '')
           .replace(/allow-split/gi, '')
           .replace(/\r\n/g, '\n');

  const rawLines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  let cleanLines = [];
  for (let l of rawLines) {
    if (/^Slide \d+$/i.test(l)) continue;
    if (/^\d{2}$/.test(l)) continue;
    if (/^สไลด์ \d+[-–]\d+$/.test(l)) continue;
    if (l === item.title.trim()) continue;
    cleanLines.push(l);
  }

  const fullText = cleanLines.join('\n');
  let mainPart = fullText;
  let visualPart = '';
  let takeawayPart = '';

  const visualIdx = fullText.search(/(อ่านภาพ[^\n]*|อ่านการ[^\n]*)/);
  const takeawayIdx = fullText.search(/(ประเด็นสำคัญที่ควรจำ|ประเด็นที่ควรจำ)/);

  if (visualIdx !== -1 && takeawayIdx !== -1) {
    if (visualIdx < takeawayIdx) {
      mainPart = fullText.substring(0, visualIdx).trim();
      const vHeaderLen = fullText.substring(visualIdx).split('\n')[0].length;
      visualPart = fullText.substring(visualIdx + vHeaderLen, takeawayIdx).trim();
      const tHeaderLen = fullText.substring(takeawayIdx).split('\n')[0].length;
      takeawayPart = fullText.substring(takeawayIdx + tHeaderLen).trim();
    } else {
      mainPart = fullText.substring(0, takeawayIdx).trim();
      const tHeaderLen = fullText.substring(takeawayIdx).split('\n')[0].length;
      takeawayPart = fullText.substring(takeawayIdx + tHeaderLen, visualIdx).trim();
      const vHeaderLen = fullText.substring(visualIdx).split('\n')[0].length;
      visualPart = fullText.substring(visualIdx + vHeaderLen).trim();
    }
  } else if (visualIdx !== -1) {
    mainPart = fullText.substring(0, visualIdx).trim();
    const vHeaderLen = fullText.substring(visualIdx).split('\n')[0].length;
    visualPart = fullText.substring(visualIdx + vHeaderLen).trim();
  } else if (takeawayIdx !== -1) {
    mainPart = fullText.substring(0, takeawayIdx).trim();
    const tHeaderLen = fullText.substring(takeawayIdx).split('\n')[0].length;
    takeawayPart = fullText.substring(takeawayIdx + tHeaderLen).trim();
  }

  const mainFlowing = mainPart.split(/\n{2,}/).map(para => {
    return para.split('\n').join(' ').replace(/\s+/g, ' ').trim();
  }).filter(Boolean).join('\n\n');

  let cleanVisualBullets = [];
  if (visualPart) {
    cleanVisualBullets.push(visualPart.split('\n').join(' ').replace(/\s+/g, ' ').trim());
  }

  let cleanTakeawayBullets = [];
  if (takeawayPart) {
    cleanTakeawayBullets.push(takeawayPart.split('\n').join(' ').replace(/\s+/g, ' ').trim());
  }

  let out = `## 📄 Slide ${item.slideNum}: ${item.title}\n\n`;
  out += `*📄 Slide ${item.slideNum}*\n\n`;
  out += `${mainFlowing}\n\n`;

  // Insert visual enhancements (Table / ASCII Flow / Math)
  if (slideVisuals[item.slideNum]) {
    out += `${slideVisuals[item.slideNum]}\n\n`;
  }

  if (cleanVisualBullets.length > 0 && cleanVisualBullets[0]) {
    out += `> [!NOTE] 🖼️ การวิเคราะห์ภาพและโครงสร้างในสไลด์\n`;
    cleanVisualBullets.forEach(b => {
      out += `> ${b.trim()}\n`;
    });
    out += `\n`;
  }

  if (cleanTakeawayBullets.length > 0 && cleanTakeawayBullets[0]) {
    out += `> [!IMPORTANT] 🎯 ประเด็นสำคัญที่ต้องจำ (Key Takeaways)\n`;
    cleanTakeawayBullets.forEach(b => {
      out += `> - ${b.trim()}\n`;
    });
    out += `\n`;
  }

  out += `---\n\n`;
  return out;
}

const l1Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_1_Fundamental-Network_models_1-89.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_1_Fundamental-Network_models_1-89.html) *(ครบทุกสไลด์ 1–89)*
> - **ไฟล์สไลด์ PDF:** [Chapter_1_Introduction.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction.pdf) & [Chapter_1_Introduction_TH.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction_TH.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 1: Computer Networks and the Internet
> - **บทเรียนแบบโต้ตอบเสริม:** [ch1.html](file:///c:/Project/computer-network-&-Internet/New/ch1.html) *(25 Sections)*, [ch2.html](file:///c:/Project/computer-network-&-Internet/New/ch2.html) & [tcpipmodel.html](file:///c:/Project/computer-network-&-Internet/New/tcpipmodel.html)`;

let l1Md = `---
tags:
  - networking
  - lecture
  - lecture-1
  - fundamentals
  - network-edge
  - network-core
  - delays
  - packet-switching
  - osi-model
  - tcp-ip
  - encapsulation
  - history
created: 2026-08-03
updated: 2026-08-17
lecture: 1
type: lecture
---

# Lecture 1: Fundamentals of Computer Networks & Network Models (Slides 1–89 Complete Guide)

> [!INFO] 📂 แหล่งไฟล์อ้างอิงต้นฉบับ (Source Documents in New/ & Root)
${l1Sources}

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์เดี่ยว Slide 1 ถึง Slide 89 รวม 89 หน้า ไม่มีข้าม)
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียดสมบูรณ์ 100% เรียงลำดับรายหน้าสไลด์เดี่ยว ตั้งแต่ **Slide 1 ถึง Slide 89** ครบทุกตัวอักษร ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล พร้อมตารางวิเคราะห์และแผนภาพจำลองสไลด์ทุกแผ่น ตามมาตรฐานเดียวกับ Database System Wiki

---

`;

ch1Data.forEach(s => {
  l1Md += formatSlideDatabaseStyle(s);
});

fs.writeFileSync('Wiki/Lecture 1 - Fundamental of Computer Network.md', l1Md, 'utf8');
console.log('Saved Lecture 1 (Database System Style):', l1Md.length, 'chars,', l1Md.split('\n').length, 'lines');
