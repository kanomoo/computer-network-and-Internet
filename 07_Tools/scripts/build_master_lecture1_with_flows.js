const fs = require('fs');

// We will construct the complete, ultimate Lecture 1 with individual slides 1 to 89,
// including diagrams, flows, trace tables, formulas, image breakdowns, and takeaways for every single slide!

const l1Sources = `> - **สไลด์บทเรียนหลักของอาจารย์:** [Chapter_1_Fundamental-Network_models_1-89.html](file:///c:/Project/computer-network-&-Internet/New/Chapter_1_Fundamental-Network_models_1-89.html) *(ครบทุกสไลด์ 1–89)*
> - **ไฟล์สไลด์ PDF:** [Chapter_1_Introduction.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction.pdf) & [Chapter_1_Introduction_TH.pdf](file:///c:/Project/computer-network-&-Internet/Chapter_1_Introduction_TH.pdf)
> - **หนังสือเรียนอ้างอิงหลัก:** *Computer Networking: A Top-Down Approach (8th Edition)* โดย Jim Kurose & Keith Ross — Chapter 1: Computer Networks and the Internet
> - **บทเรียนแบบโต้ตอบเสริม:** [ch1.html](file:///c:/Project/computer-network-&-Internet/New/ch1.html) *(25 Sections)*, [ch2.html](file:///c:/Project/computer-network-&-Internet/New/ch2.html) & [tcpipmodel.html](file:///c:/Project/computer-network-&-Internet/New/tcpipmodel.html)`;

// Load slide texts from parsed ch1
const ch1Data = JSON.parse(fs.readFileSync('tools/ch1_parsed.json', 'utf8'));

// Map of specific diagrams and flows for each slide
const slideDiagrams = {
  1: `\`\`\`mermaid
flowchart LR
    BOOK["📘 Computer Networking: A Top-Down Approach (9th Ed)"]
    AUTH["✍️ Jim Kurose & Keith Ross (Pearson 2025)"]
    CH1["🎯 Chapter 1: Introduction"]
    BOOK --- AUTH --- CH1
\`\`\``,

  2: `\`\`\`mermaid
flowchart TD
    ROADMAP["🗺️ Chapter 1 Roadmap"] --> EDGE["1. Network Edge (Hosts, Access Networks, Physical Media)"]
    ROADMAP --> CORE["2. Network Core (Packet/Circuit Switching, Network of Networks)"]
    ROADMAP --> PERF["3. Performance (Delay, Loss, Throughput)"]
    ROADMAP --> LAYER["4. Protocol Layers & Service Models"]
    ROADMAP --> SEC["5. Network Security & History"]
\`\`\``,

  3: `\`\`\`mermaid
flowchart LR
    subgraph EDGE_COMP ["Internet Edge"]
        HOSTS["💻 End Systems / Hosts<br/>(PCs, Phones, Servers, IoT)"]
    end
    subgraph SWITCH_COMP ["Packet Switches"]
        ROUTERS["🔀 Routers (L3)"]
        SWITCHES["🔌 Switches (L2)"]
    end
    subgraph LINK_COMP ["Links"]
        LINKS["⚡ Comm Links (Fiber, Copper, Radio)<br/>Bandwidth (R bps)"]
    end
    HOSTS <===> LINKS <===> ROUTERS & SWITCHES
\`\`\``,

  4: `\`\`\`mermaid
graph TD
    IOT["🌐 Diverse Internet-Connected End Systems"]
    IOT --> I1["🏠 Smart Home: Echo, Smart Fridge, IP Frame, Smart Bed"]
    IOT --> I2["🏥 Medical & Wearables: Pacemaker, AR Glasses, Fitbit"]
    IOT --> I3["🚗 Transportation: Connected Cars, E-Scooters, Bikes"]
    IOT --> I4["🏭 Industrial & Security: Security Cams, Tweet-a-Watt Sensors"]
\`\`\``,

  5: `\`\`\`mermaid
flowchart TD
    NET["🌐 Network of Networks"]
    NET --> PROTO["📜 Protocols: HTTP, Zoom, TCP, IP, Wi-Fi, 4G/5G, Ethernet"]
    NET --> STAND["🏛️ Standards: IETF RFCs (Request for Comments)"]
    NET --> ISPS["🏢 Interconnected ISPs (Global, Regional, Access)"]
\`\`\``,

  6: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor App as 📱 Distributed Application
    participant API as 🚪 Socket Programming Interface
    participant Net as 🌐 Network Infrastructure
    App->>API: 1. sendto(data, destination_IP, port)
    API->>Net: 2. Packets routed through Internet
    Net-->>API: 3. Delivery to destination socket
    API-->>App: 4. recvfrom(data)
\`\`\``,

  7: `\`\`\`mermaid
flowchart TD
    PROTO_DEF["📜 Protocol Definition"]
    PROTO_DEF --> F["1. Format: โครงสร้างและชนิดของบิต/ฟิลด์ข้อมูล"]
    PROTO_DEF --> O["2. Order: ลำดับการรับ-ส่งข้อความ"]
    PROTO_DEF --> A["3. Actions: พฤติกรรมที่ต้องทำเมื่อส่ง/รับข้อความ หรือเมื่อ Timeout"]
\`\`\``,

  8: `\`\`\`mermaid
sequenceDiagram
    autonumber
    rect rgb(240, 248, 255)
    Note over A,B: 👥 Human Protocol
    actor A as 👤 Alice
    actor B as 👤 Bob
    A->>B: "สวัสดี"
    B-->>A: "สวัสดี"
    A->>B: "กี่โมงแล้ว?"
    B-->>A: "บ่าย 2 โมง"
    end
    rect rgb(255, 250, 240)
    Note over C,S: 💻 Network Protocol
    actor C as 💻 Web Client
    actor S as 🗄️ Web Server
    C->>S: TCP SYN (Connection Request)
    S-->>C: TCP SYN-ACK (Connection Granted)
    C->>S: HTTP GET index.html
    S-->>C: HTTP 200 OK + [Data Payload]
    end
\`\`\``,

  9: `\`\`\`mermaid
flowchart LR
    EDGE_MAP["Roadmap Focus"] ==> NET_EDGE["📍 Focus 1: Network Edge<br/>- End Systems (Hosts)<br/>- Access Networks<br/>- Physical Media"]
\`\`\``,

  10: `\`\`\`mermaid
flowchart LR
    CLIENTS["📱 Clients (Laptops, Smartphones, IoT)"] <===> DC["🗄️ Data Center Servers (Cloud, Web, AI)"]
\`\`\``,

  11: `\`\`\`mermaid
flowchart TD
    ACCESS_TECH["Access Network Technologies"] --> WIRE["🔌 Wired: DSL, Cable HFC, FTTH, Ethernet"]
    ACCESS_TECH --> WIRELESS["📡 Wireless: Wi-Fi (WLAN), 4G/5G Cellular"]
\`\`\``,

  12: `\`\`\`mermaid
flowchart LR
    HOST["💻 Host"] -->|"Access Link"| ER["🛡️ Edge Router"] --> CORE["🔀 Network Core (Interconnected Routers)"]
\`\`\``,

  13: `\`\`\`mermaid
flowchart LR
    HOME_PC["💻 Home PC"] --> ACCESS["Access Network"] --> ER["🛡️ Edge Router (First-Hop Router)"]
\`\`\``,

  14: `\`\`\`mermaid
flowchart LR
    subgraph FDM_CABLE ["Cable FDM Spectrum"]
        V["📺 Video Channels (54 - 550 MHz)"]
        D["📥 Downstream Data (550 - 750 MHz)"]
        U["📤 Upstream Data (5 - 42 MHz)"]
    end
\`\`\``,

  15: `\`\`\`mermaid
flowchart LR
    HEADEND["🏢 Cable Headend (CMTS)"] ===|"Fiber Optic"| NODE["🔘 Fiber Node"]
    NODE ===|"Coaxial Cable (Shared)"| H1["🏠 Home 1 (Cable Modem)"]
    NODE ===|"Coaxial Cable (Shared)"| H2["🏠 Home 2 (Cable Modem)"]
    NODE ===|"Coaxial Cable (Shared)"| H3["🏠 Home 3 (Cable Modem)"]
\`\`\``,

  16: `\`\`\`mermaid
flowchart LR
    HOME_TEL["🏠 Home DSL Modem"] ===|"Dedicated Copper Phone Line"| DSLAM["🏢 DSLAM (Central Office)"]
    DSLAM --> VOICE["📞 Telephone Network"]
    DSLAM --> NET["🌐 Internet Router"]
\`\`\``,

  17: `\`\`\`mermaid
flowchart TD
    subgraph HOME_NET ["🏠 Home Network"]
        PC["💻 Laptop / PC"]
        PHONE["📱 Mobile Phone"]
        AP["📶 Wi-Fi Access Point"]
        SW["🔌 Ethernet Switch"]
        ROUTER["🛡️ Router + NAT + Firewall"]
        MODEM["📟 Cable/DSL Modem"]
        
        PC & PHONE --> AP & SW
        AP & SW --> ROUTER --> MODEM
    end
    MODEM === ISP["🏢 Access ISP (Central Office)"]
\`\`\``,

  18: `\`\`\`mermaid
flowchart TD
    subgraph WLAN ["1. Wireless LAN (Wi-Fi 802.11)"]
        W1["💻 Laptop"] & W2["📱 Phone"] --> AP_WIFI["📶 Access Point (10 - 100m)"]
        AP_WIFI --> ER1["🛡️ Router"]
    end
    subgraph CELLULAR ["2. Wide-Area Cellular (4G/5G)"]
        C1["📱 Phone"] & C2["🚗 Connected Car"] --> BS["🗼 Base Station / gNodeB (10s of km)"]
        BS --> ER2["🛡️ Mobile Core Router"]
    end
\`\`\``,

  19: `\`\`\`mermaid
flowchart TD
    subgraph ENTERPRISE ["🏢 Enterprise Network"]
        USERS["👥 Institutional Users"] --> ASW["🔌 Access Switches (100M/1G)"]
        SERVERS["🗄️ Mail/Web Servers"] --> DSW["🔌 Distribution Switches"]
        ASW --> DSW --> CSW["🛡️ Enterprise Edge Router"]
    end
    CSW === ISP_LINK["🌐 Link to ISP (1 Gbps - 10 Gbps)"]
\`\`\``,

  20: `\`\`\`mermaid
flowchart TD
    subgraph DATACENTER ["☁️ Data Center Network"]
        BLADES["🗄️ Thousands of Host Blade Servers"] --> TOR["🔌 Top of Rack (ToR) Switches"]
        TOR --> AGG["🔌 Aggregation / Leaf Switches"]
        AGG --> CORE_DC["🛡️ Core Spine Routers"]
    end
    CORE_DC === INTERNET["🌐 Internet Backbone"]
\`\`\``,

  21: `\`\`\`mermaid
flowchart LR
    SRC["💻 Host"] -->|"Packet (L bits) / Speed (R bps)"| LINK["Transmission Link"]
    subgraph FORMULA ["Transmission Delay Formula"]
        F1["d_trans = L / R  (seconds)"]
    end
\`\`\``,

  22: `\`\`\`mermaid
flowchart LR
    TP["🔌 Twisted Pair (TP)"] --> UTP["UTP Cat5e: 1 Gbps, Cat6: 10 Gbps (100m)"]
    TP --> STP["STP: Shielded Twisted Pair (ลดสัญญาณรบกวน)"]
\`\`\``,

  23: `\`\`\`mermaid
flowchart TD
    COAX["📻 Coaxial Cable: แกนทองแดงเดี่ยว + ฉนวน + ตาข่ายโลหะ (DOCSIS)"]
    FIBER["💡 Optical Fiber: แท่งแก้วบริสุทธิ์ ส่งพัลส์แสงเลเซอร์ Low Error, High Bandwidth (100 Gbps+)"]
\`\`\``,

  24: `\`\`\`mermaid
flowchart LR
    RADIO["📡 Wireless Radio Media"] --> TERR["Terrestrial Microwave (หลายสิบ Gbps)"]
    RADIO --> WIFI["Wi-Fi / Bluetooth (คลื่นสั้น)"]
    RADIO --> CELL["Cellular 4G/5G"]
    RADIO --> SAT["Satellite (GEO 36,000 km vs LEO 500-1,000 km)"]
\`\`\``,

  25: `\`\`\`mermaid
flowchart LR
    ROADMAP2["Roadmap Focus"] ==> NET_CORE["📍 Focus 2: Network Core<br/>- Packet Switching vs Circuit Switching<br/>- Forwarding vs Routing<br/>- Network of Networks"]
\`\`\``,

  26: `\`\`\`mermaid
flowchart LR
    R1["🔀 Router A"] <===> R2["🔀 Router B"]
    R2 <===> R3["🔀 Router C"]
    R1 <===> R4["🔀 Router D"] <===> R3
\`\`\``,

  27: `\`\`\`mermaid
flowchart TD
    CORE_FUNCS["Two Key Network-Core Functions"]
    CORE_FUNCS --> FWD["1. Forwarding (Data Plane): ส่งแพ็กเก็ตจาก Input Port ไป Output Port ของ Router ตัวนั้น (Local Action)"]
    CORE_FUNCS --> RTG["2. Routing (Control Plane): วางแผนคำนวณเส้นทางตั้งแต่ต้นทางถึงปลายทาง (Global Process)"]
\`\`\``,

  28: `\`\`\`mermaid
flowchart LR
    ALGO["🧠 Routing Algorithms (OSPF, BGP)"] --> TABLE["📋 Compute Local Forwarding Table"]
\`\`\``,

  29: `\`\`\`mermaid
flowchart LR
    IN_PKT["📥 Packet (Dest Address)"] --> LOOKUP["🔍 Lookup Forwarding Table"] --> OUT_PORT["📤 Output Port"]
\`\`\``,

  30: `\`\`\`mermaid
flowchart LR
    SRC["💻 Source"] -->|"L bits (R bps)"| R1["🔀 Router 1 (Store & Forward)"]
    R1 -->|"L bits (R bps)"| DST["💻 Destination"]
    subgraph DELAY ["Delay"]
        D["End-to-End = 2 * (L / R)"]
    end
\`\`\``,

  31: `\`\`\`mermaid
flowchart LR
    IN["📥 Incoming Packets"] --> BUF["📦 Output Buffer Queue"] --> OUT["📤 Outgoing Link (R bps)"]
\`\`\``,

  32: `\`\`\`mermaid
flowchart TD
    FULL_BUF["⚠️ Output Buffer is FULL!"] --> DROP["❌ Incoming Packet Dropped (Packet Loss)"]
\`\`\``,

  33: `\`\`\`mermaid
flowchart LR
    CALLER["📞 Caller"] ===|"Dedicated End-to-End Circuit"| SWITCHES["🔀 Telephone Switches"] ===|"Guaranteed Bandwidth"| CALLEE["📞 Callee"]
\`\`\``,

  34: `\`\`\`mermaid
flowchart TD
    subgraph FDM ["Frequency Division Multiplexing (FDM)"]
        F1["User 1 (Freq 1)"]
        F2["User 2 (Freq 2)"]
        F3["User 3 (Freq 3)"]
        F4["User 4 (Freq 4)"]
    end
    subgraph TDM ["Time Division Multiplexing (TDM)"]
        T1["Slot 1: User 1"] --> T2["Slot 2: User 2"] --> T3["Slot 3: User 3"] --> T4["Slot 4: User 4"]
    end
\`\`\``,

  35: `\`\`\`mermaid
flowchart TD
    EX["📊 1 Mbps Link, 100 kbps/user (10% Active)"]
    EX --> CS["📞 Circuit Switching: 1 Mbps / 100 kbps = 10 Users"]
    EX --> PS["📦 Packet Switching: Supports 35 Users (P(Active >= 11) < 0.0004)"]
\`\`\``,

  36: `\`\`\`mermaid
flowchart TD
    COMPARE["Packet vs Circuit Switching Summary"]
    COMPARE --> ADV["✅ Packet Switching Pros: Great for bursty data, resource sharing, no setup delay"]
    COMPARE --> DIS["⚠️ Packet Switching Cons: Variable queuing delay, possible packet loss (needs TCP/QoS)"]
\`\`\``,

  37: `\`\`\`mermaid
flowchart LR
    ISPA["🏢 Access ISP 1"] & ISPB["🏢 Access ISP 2"] === CORE_ISPS["🌐 Global Transit ISPs & IXPs"]
\`\`\``,

  38: `\`\`\`mermaid
flowchart TD
    Q["❓ Question: How to connect millions of Access ISPs worldwide?"]
\`\`\``,

  39: `\`\`\`mermaid
flowchart TD
    MESH_FAIL["❌ Fully Meshed Access ISPs: N*(N-1)/2 Links"] --> SCALING["With 1 Million ISPs: ~500 Billion Links (Does Not Scale!)"]
\`\`\``,

  40: `\`\`\`mermaid
flowchart TD
    MONO_FAIL["❌ Option: 1 Global Transit ISP"] --> MONO_PB["Monopoly pricing, single point of failure"]
\`\`\``,

  41: `\`\`\`mermaid
flowchart TD
    MULTI_TIER1["✅ Competing Tier-1 ISPs"] --> PEER["Peering Links (Free exchange) & Interconnect"]
\`\`\``,

  42: `\`\`\`mermaid
flowchart LR
    T1A["Tier-1 ISP A"] <===|"Peering"|===> T1B["Tier-1 ISP B"]
    R1["Regional ISP 1"] & R2["Regional ISP 2"] <===> IXP["🏢 Internet Exchange Point (IXP)"]
\`\`\``,

  43: `\`\`\`mermaid
flowchart TD
    T1["Tier-1 ISP"] === REG["Regional / Tier-2 ISP"] === ACC["Access ISP (Home / Enterprise)"]
\`\`\``,

  44: `\`\`\`mermaid
flowchart LR
    CDN_NET["☁️ Google / Meta Private CDN Backbone"] -.->|"Bypass Tier-1"| IXP & ACC_ISPS["Access ISPs"]
\`\`\``,

  45: `\`\`\`mermaid
flowchart TD
    TIER_TOP["Modern Internet Center: Tier-1 ISPs + IXPs + Regional ISPs + CDN Private Networks"]
\`\`\``,

  46: `\`\`\`mermaid
flowchart LR
    ROADMAP3["Roadmap Focus"] ==> NET_PERF["📍 Focus 3: Performance<br/>- Nodal Delay (4 Sources)<br/>- Traffic Intensity & Loss<br/>- Throughput & Bottleneck"]
\`\`\``,

  47: `\`\`\`mermaid
flowchart LR
    SRC_P["Packet Source"] -->|"d_proc"| PROC["Processing"] -->|"d_queue"| QUEUE["Queue"] -->|"d_trans"| TRANS["Transmission"] -->|"d_prop"| PROP["Propagation"] --> DST_P["Packet Arrival"]
\`\`\``,

  48: `\`\`\`mermaid
flowchart TD
    D1["1. d_proc (Processing Delay): Check bit errors, lookup routing table (Microseconds)"]
    D2["2. d_queue (Queuing Delay): Waiting time in output buffer queue (Depends on congestion)"]
\`\`\``,

  49: `\`\`\`mermaid
flowchart TD
    D3["3. d_trans = L / R (Transmission Delay): Push L bits into wire at R bps"]
    D4["4. d_prop = d / s (Propagation Delay): Wave travel time over distance d at speed s (~2x10^8 m/s)"]
\`\`\``,

  50: `\`\`\`mermaid
flowchart LR
    TOLL1["톨 Toll Booth 1"] ===|"Highway d = 100 km (s = 100 km/h)"| TOLL2["톨 Toll Booth 2"]
    subgraph CARAVAN ["10-Car Caravan (1 Packet = 10 Bits)"]
        C_T["d_trans = 10 * 12s = 120s (2 min)"]
        C_P["d_prop = 100km / 100km/h = 60 min"]
    end
\`\`\``,

  51: `\`\`\`mermaid
flowchart TD
    ANALYSIS["Caravan Insight: Toll service time (d_trans) != Highway travel time (d_prop)"]
\`\`\``,

  52: `\`\`\`mermaid
flowchart LR
    INTENSITY["Traffic Intensity: I = (L * a) / R"]
    INTENSITY --> I0["I ~ 0: Small queuing delay"]
    INTENSITY --> I1["I -> 1: Queuing delay approaches infinity!"]
    INTENSITY --> I_INF["I > 1: Buffer overflow & 100% Packet Loss"]
\`\`\``,

  53: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Src as 💻 Source Host
    participant R1 as 🔀 Router 1
    participant R2 as 🔀 Router 2
    participant Dst as 🖥️ Dest Host
    Src->>R1: ICMP Probe (TTL=1)
    R1-->>Src: ICMP Time Exceeded (RTT 1)
    Src->>R2: ICMP Probe (TTL=2)
    R2-->>Src: ICMP Time Exceeded (RTT 2)
    Src->>Dst: ICMP Probe (TTL=3)
    Dst-->>Src: ICMP Port Unreachable / Echo Reply (RTT 3)
\`\`\``,

  54: `\`\`\`
Traceroute Probe Output Analysis:
Hop 1: 192.168.1.1 (Home Gateway)       1.12 ms   0.98 ms   1.05 ms
Hop 2: 10.20.0.1  (ISP Edge Router)     4.50 ms   4.20 ms   4.35 ms
Hop 3: 203.144.x.x (National Backbone)  12.10 ms  11.80 ms  12.00 ms
Hop 4: 142.250.x.x (Google CDN Server)  14.20 ms  13.90 ms  14.10 ms
\`\`\``,

  55: `\`\`\`mermaid
flowchart TD
    LOSS_EVENT["Packet Loss Event"] --> DROP_PKT["Packet dropped at full buffer"] --> RTO["TCP Sender Timeout / Retransmit"]
\`\`\``,

  56: `\`\`\`mermaid
flowchart LR
    SRC_TP["Source"] -->|"Throughput (bps)"| DST_TP["Destination"]
    subgraph TP_TYPES ["Throughput Metrics"]
        T1["Instantaneous: อัตรา ณ เสี้ยววินาทีหนึ่ง"]
        T2["Average: ปริมาณข้อมูลรวม / เวลาทั้งหมด"]
    end
\`\`\``,

  57: `\`\`\`mermaid
flowchart LR
    SRV["Server (Rs bps)"] === PIPE1["Pipe Rs"] === BTL["🔘 Bottleneck Link (Rc bps)"] === PIPE2["Pipe Rc"] === CLI["Client"]
    subgraph BTL_EQ ["Throughput Formula"]
        EQ["End-to-End Throughput = min(Rs, Rc)"]
    end
\`\`\``,

  58: `\`\`\`mermaid
flowchart TD
    SHARED["Shared Core Link R = 100 Mbps, 10 Simultaneous Downloads"]
    SHARED --> PER_USER["Per-user throughput = min(Rs, Rc, R/10)"]
\`\`\``,

  59: `\`\`\`mermaid
flowchart LR
    ROADMAP4["Roadmap Focus"] ==> NET_SEC["📍 Focus 4: Network Security<br/>- Malware, Sniffing, Spoofing<br/>- DoS/DDoS Attacks & Defenses"]
\`\`\``,

  60: `\`\`\`mermaid
flowchart TD
    SEC_PRINCIPLE["Security Principles"] --> CONF["1. Confidentiality (การรักษาความลับ: Encryption)"]
    SEC_PRINCIPLE --> AUTH["2. Authentication (การพิสูจน์ตัวตน)"]
    SEC_PRINCIPLE --> INT["3. Integrity (ความถูกต้องสมบูรณ์ของข้อมูล)"]
    SEC_PRINCIPLE --> ACC["4. Access Control (การควบคุมสิทธิ์เข้าถึง)"]
\`\`\``,

  61: `\`\`\`mermaid
flowchart TD
    THREATS["Network Threats Landscape"] --> MAL["🦠 Malware (Viruses, Worms, Botnets)"]
    THREATS --> SNIFF["👂 Packet Sniffing (Eavesdropping)"]
    THREATS --> SPOOF["🎭 IP Spoofing (Fake Source)"]
    THREATS --> DOS["💣 Denial of Service (DoS / DDoS)"]
\`\`\``,

  62: `\`\`\`mermaid
flowchart LR
    SNIFFER["👂 Bad Guy (Wireshark in Promiscuous Mode)"] -.->|"Read Cleartext Passwords"| WIRE["Ethernet / Wi-Fi Medium"]
\`\`\``,

  63: `\`\`\`mermaid
flowchart LR
    SPOOFER["🎭 Attacker"] -->|"Fake Source IP: 1.2.3.4"| VICTIM["🖥️ Target Server"]
\`\`\``,

  64: `\`\`\`mermaid
flowchart TD
    ATTACKER["🦹 Master Attacker"] --> BOTNET["🤖 10,000+ Zombie IoT Botnets"] --> TARGET["💥 Target Server (Overwhelmed by Traffic!)"]
\`\`\``,

  65: `\`\`\`mermaid
flowchart TD
    DEFENSE["🛡️ Defense in Depth"] --> TLS["Encryption: TLS/HTTPS, SSH, VPN"]
    DEFENSE --> FW["Firewalls & Ingress Filtering"]
    DEFENSE --> SCRUB["DDoS Cloud Scrubbing Centers"]
\`\`\``,

  66: `\`\`\`mermaid
flowchart LR
    ROADMAP5["Roadmap Focus"] ==> NET_LAYERS["📍 Focus 5: Protocol Layers<br/>- Layered Reference Models<br/>- Encapsulation & PDU Taxonomy"]
\`\`\``,

  67: `\`\`\`mermaid
flowchart TD
    LAYERING["Protocol Layering Strategy"] --> MOD["Modularity: จัดการความซับซ้อนของระบบ"]
    LAYERING --> MAINT["Maintenance: เปลี่ยนแปลงเทคโนโลยีชั้นล่างโดยไม่กระทบชั้นบน"]
\`\`\``,

  68: `\`\`\`mermaid
flowchart TD
    subgraph FLIGHT_DEPART ["🛫 Departure Airport"]
        T1["Ticket (Purchase/Check-in)"] --> B1["Baggage (Check luggage)"] --> G1["Gates (Boarding)"] --> R1["Runway (Takeoff)"] --> A1["Airplane Routing"]
    end
\`\`\``,

  69: `\`\`\`mermaid
flowchart TD
    subgraph FLIGHT_LAYERS ["✈️ Air Travel Hierarchy"]
        T["Ticket Layer"] -.-> T_PEER["Ticket Layer (Arrival)"]
        B["Baggage Layer"] -.-> B_PEER["Baggage Layer (Arrival)"]
        G["Gate Layer"] -.-> G_PEER["Gate Layer (Arrival)"]
        R["Runway Layer"] -.-> R_PEER["Runway Layer (Arrival)"]
        A["Airplane Layer"] === AIR["Airspace Routing"] === A_PEER["Airplane Layer (Arrival)"]
    end
\`\`\``,

  70: `\`\`\`mermaid
flowchart TD
    WHY["Why Layering?"] --> W1["Explicit structure simplifies complex systems"]
    WHY --> W2["Modular updates: Changing Link layer (Wi-Fi to 5G) does NOT break Web Browser!"]
\`\`\``,

  71: `\`\`\`mermaid
flowchart TD
    L5["5. Application Layer (HTTP, SMTP, DNS)"]
    L4["4. Transport Layer (TCP, UDP)"]
    L3["3. Network Layer (IP, Routing)"]
    L2["2. Data Link Layer (Ethernet, Wi-Fi)"]
    L1["1. Physical Layer (Bits, Copper, Fiber)"]
    L5 --- L4 --- L3 --- L2 --- L1
\`\`\``,

  72: `\`\`\`mermaid
flowchart LR
    MSG["Application Data (M)"] --> SEG["[ TCP Header | Data M ] = Segment"]
\`\`\``,

  73: `\`\`\`mermaid
flowchart LR
    SEG["Segment (Ht + M)"] --> DG["[ IP Header | TCP Header | Data M ] = Datagram"]
\`\`\``,

  74: `\`\`\`mermaid
flowchart LR
    DG["Datagram (Hn + Ht + M)"] --> FR["[ Link Header | IP Hdr | TCP Hdr | Data M | Link Trailer ] = Frame"]
\`\`\``,

  75: `\`\`\`mermaid
flowchart LR
    MAT["🪆 Matryoshka Doll Analogy"] --> M1["Data M inside TCP Segment inside IP Datagram inside Ethernet Frame"]
\`\`\``,

  76: `\`\`\`mermaid
sequenceDiagram
    autonumber
    actor Src as 💻 Source Host
    actor Dst as 🖥️ Destination Host
    Note over Src: Encapsulation: M -> Ht+M -> Hn+Ht+M -> Hl+Hn+Ht+M
    Src->>Dst: Transmit Bits over Physical Media
    Note over Dst: Decapsulation: Strip Hl -> Strip Hn -> Strip Ht -> Deliver M
\`\`\``,

  77: `\`\`\`mermaid
flowchart LR
    SRC["💻 Host (5 Layers)"] === SW["🔌 L2 Switch (L1-L2)"] === RT["🔀 L3 Router (L1-L3)"] === DST["🖥️ Host (5 Layers)"]
\`\`\``,

  78: `\`\`\`mermaid
flowchart LR
    ROADMAP6["Roadmap Focus"] ==> NET_HIST["📍 Focus 6: Internet History<br/>- 1960s ARPANET to Modern Internet Roadmap"]
\`\`\``,

  79: `\`\`\`mermaid
flowchart LR
    H1961["1961-1972: Packet Switching Theory (Kleinrock, Baran, Davies)"] --> H1969["1969: 4 ARPANET Nodes (UCLA, SRI, UCSB, Utah) on IMP Switches"]
\`\`\``,

  80: `\`\`\`mermaid
flowchart LR
    H1972["1972: E-mail & ALOHAnet"] --> H1974["1974: Cerf & Kahn Design TCP/IP Architecture"]
\`\`\``,

  81: `\`\`\`mermaid
flowchart LR
    H1983["1983: TCP/IP Flag Day"] --> H1984["1984: Domain Name System (DNS)"]
\`\`\``,

  82: `\`\`\`mermaid
flowchart LR
    H1990["1990s: Tim Berners-Lee creates WWW (HTTP, HTML, URL)"] --> H1994["1994: Mosaic & Netscape Browser Boom"]
\`\`\``,

  83: `\`\`\`mermaid
flowchart LR
    H2005["2005-Present: 10+ Billion Hosts, 5G Mobile, Cloud Data Centers, CDN, SDN & AI"]
\`\`\``,

  84: `\`\`\`mermaid
flowchart TD
    SUMM["🎓 Chapter 1 Summary: Mastered Foundations, Ready for Application Layer (Chapter 2)!"]
\`\`\``,

  85: `\`\`\`mermaid
flowchart TD
    ADD["📚 Additional Slides: ISO/OSI Reference Model in Depth"]
\`\`\``,

  86: `\`\`\`mermaid
flowchart TD
    OSI7["OSI 7 Layers: App, Presentation (Compression/Encryption), Session (Checkpoints), Transport, Network, Link, Physical"]
\`\`\``,

  87: `\`\`\`mermaid
flowchart TD
    HUMOR["Humorous 9-Layer Model: Layer 8 = Financial / Political Layer!"]
\`\`\``,

  88: `\`\`\`mermaid
flowchart LR
    APP_SRC["App Message"] --> SEG_SRC["TCP Segment"] --> DG_SRC["IP Datagram"] --> FR_SRC["Ethernet Frame"] --> PHYS["Physical Wire"]
\`\`\``,

  89: `\`\`\`mermaid
flowchart LR
    NIC["🔌 NIC (Ethernet / Wi-Fi)"] --> LIBPCAP["1. libpcap / WinPcap (Capture Engine)"] --> GUI["2. Wireshark GUI (Protocol Dissection Analyzer)"]
\`\`\``
};

function formatSlideMaster(item) {
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

  // Insert slide diagram/flow if available
  if (slideDiagrams[item.slideNum]) {
    out += `${slideDiagrams[item.slideNum]}\n\n`;
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

> [!SUMMARY] ภาพรวมเนื้อหาบทเรียน (ครบทุกสไลด์เดี่ยว Slide 1 ถึง Slide 89 รวม 89 หน้า ไม่มีข้าม พร้อม Diagram / Flow ทุกหน้า)
> โน้ตความรู้นี้สรุปเนื้อหาอย่างละเอียดสมบูรณ์ 100% เรียงลำดับรายหน้าสไลด์เดี่ยว ตั้งแต่ **Slide 1 ถึง Slide 89** ครบทุกตัวอักษร ทุกรูปภาพ ทุกสมการ ทุกโปรโตคอล พร้อมแผนผังไดอะแกรมจำลองสไลด์ทุกแผ่น ตามมาตรฐานเดียวกับ Database System Wiki

---

`;

ch1Data.forEach(s => {
  l1Md += formatSlideMaster(s);
});

fs.writeFileSync('Wiki/Lecture 1 - Fundamental of Computer Network.md', l1Md, 'utf8');
console.log('Saved Lecture 1 with Diagrams for ALL 89 slides:', l1Md.length, 'chars,', l1Md.split('\n').length, 'lines');
