import re
import html
import os

with open('02_Slides/Chapter_06_Link_Layer/Current_Year_Course_v9.0/Chapter_6_The_Link_Layer_1-111.html', 'r', encoding='utf-8') as f:
    raw_html = f.read()

pattern = r'<article[^>]*id=\"slide-(\d+)\"[^>]*>(.*?)</article>'
slides = re.findall(pattern, raw_html, re.DOTALL)
print(f"Total slides found: {len(slides)}")

def clean_inline_html(text):
    if not text:
        return ""
    text = html.unescape(text)
    # replace formatting
    text = re.sub(r'<strong>(.*?)</strong>', r'**\1**', text, flags=re.DOTALL)
    text = re.sub(r'<b>(.*?)</b>', r'**\1**', text, flags=re.DOTALL)
    text = re.sub(r'<em>(.*?)</em>', r'*\1*', text, flags=re.DOTALL)
    text = re.sub(r'<i>(.*?)</i>', r'*\1*', text, flags=re.DOTALL)
    text = re.sub(r'<code>(.*?)</code>', r'`\1`', text, flags=re.DOTALL)
    text = re.sub(r'<h4>(.*?)</h4>', r'\n#### \1\n', text, flags=re.DOTALL)
    text = re.sub(r'<h3>(.*?)</h3>', r'\n### \1\n', text, flags=re.DOTALL)
    
    # list items
    text = re.sub(r'<li>(.*?)</li>', r'\n- \1\n', text, flags=re.DOTALL)
    text = re.sub(r'</?[uo]l>', '\n', text)
    
    # paragraphs
    text = re.sub(r'<p>(.*?)</p>', r'\1\n\n', text, flags=re.DOTALL)
    
    # strip remaining tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # clean multiple whitespace
    lines = [line.strip() for line in text.split('\n')]
    text = '\n'.join(lines)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def format_callout(callout_type, title, content):
    if not content:
        return ""
    cleaned = clean_inline_html(content)
    # remove any leading duplicate title if present
    cleaned = re.sub(r'^####\s+.*?\n', '', cleaned).strip()
    lines = cleaned.split('\n')
    callout_lines = [f"> [!{callout_type}] **{title}**"]
    for l in lines:
        if l.strip():
            callout_lines.append(f"> {l}")
        else:
            callout_lines.append(">")
    return '\n'.join(callout_lines) + '\n\n'

topic_titles = {
    1: "01. Chapter Overview & Learning Roadmap (สไลด์ 1–3)",
    4: "02. Link Layer Fundamentals, Services & Host Implementation (สไลด์ 4–10)",
    11: "03. Error Detection and Correction (สไลด์ 11–16)",
    17: "04. Multiple Access Protocols (สไลด์ 17–39)",
    40: "05. LANs: MAC Addressing & ARP (สไลด์ 40–53)",
    54: "06. Ethernet (สไลด์ 54–60)",
    61: "07. Ethernet Switches & Self-Learning (สไลด์ 61–73)",
    74: "08. Virtual LANs (VLANs), VXLAN & EVPN Context (สไลด์ 74–82)",
    83: "09. Link Virtualization: MPLS (สไลด์ 83–89)",
    90: "10. Data Center Networking (สไลด์ 90–98)",
    99: "11. Synthesis: A Day in the Life of a Web Request (สไลด์ 99–107)",
    108: "12. Chapter 6 Summary & Additional Slides (สไลด์ 108–111)"
}

# Slide specific deep dive content injections
deep_dives = {
    4: r"""
```mermaid
flowchart LR
    subgraph HostA ["โฮสต์ต้นทาง (Sending Host A)"]
        AppA["Application"] --> TransA["Transport"]
        TransA --> NetA["Network (IP Datagram)"]
        NetA --> LinkA["Data Link (Frame 1)"]
    end

    subgraph PhysicalHops ["การส่งต่อข้อมูลแบบ Hop-by-Hop ผ่านสื่อสัญญาณต่างๆ"]
        LinkA ==>|"Hop 1: Ethernet Cable"| R1["Router R1"]
        R1 ==>|"Hop 2: Optical Fiber / MPLS"| R2["Router R2"]
        R2 ==>|"Hop 3: Wi-Fi 802.11"| HostB["โฮสต์ปลายทาง (Host B)"]
    end

    classDef host fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef router fill:#0f172a,stroke:#a855f7,stroke-width:2px,color:#fff;
    class HostA,HostB host;
    class R1,R2 router;
```
""",
    7: r"""
| บริการของ Link Layer | รายละเอียดและกลไกการทำงาน | สภาพแวดล้อมที่ใช้งาน |
| :--- | :--- | :--- |
| **1. Framing** | ห่อหุ้ม Network-layer datagram ด้วย Header (Src/Dst MAC, Type) และ Trailer (CRC/FCS) | ทุกโปรโตคอลใน L2 |
| **2. Link Access (MAC)** | กำหนดกติกาการเข้าใช้ตัวกลางเพื่อป้องกันการชนกันของสัญญาณบนช่องสัญญาณแบบใช้ร่วมกัน | Shared broadcast links (Wi-Fi, Coaxial, Ethernet Hub) |
| **3. Reliable Delivery** | กลไก ACK และ Retransmission ในระดับฮาร์ดแวร์เพื่อกู้คืนเฟรมที่สูญหายหรือเสียหาย | ช่องสัญญาณที่มี Bit Error Rate สูง (เช่น Wi-Fi, ดาวเทียม) *ไม่ใช้บนสาย Fiber/Twisted-Pair* |
| **4. Flow Control** | ควบคุมจังหวะการส่งไม่ให้โหนดส่งส่งข้อมูลเร็วเกินกว่าที่โหนดรับข้างเคียงจะประมวลผลทัน | จุดต่อจุดระหว่างโหนดที่อยู่ติดกัน |
| **5. Error Detection** | ใช้บิตตรวจสอบส่วนเกิน (Parity, Checksum, CRC) ตรวจสอบความผิดเพี้ยนของสัญญาณ หากพบข้อผิดพลาดจะดรอปเฟรมทิ้ง | เกือบทุกโปรโตคอล L2 (Ethernet ใช้ CRC-32) |
| **6. Error Correction** | ไม่เพียงตรวจพบ แต่สามารถระบุตำแหน่งและแก้ไขบิตที่ผิดได้ทันที (Forward Error Correction - FEC) | ช่องสัญญาณไร้สายและอวกาศ |
| **7. Duplex Modes** | Half-Duplex (ส่งได้สองฝั่งแต่ห้ามพร้อมกัน) vs Full-Duplex (ส่งและรับพร้อมกันได้อย่างอิสระ) | Coaxial/Wi-Fi (Half) vs Modern Switched Ethernet (Full) |
""",
    9: r"""
```mermaid
flowchart TD
    subgraph HostArch ["สถาปัตยกรรมโฮสต์คอมพิวเตอร์ (Host System)"]
        subgraph CPU_OS ["หน่วยประมวลผลและหน่วยความจำ (Software: CPU & RAM)"]
            APP["Application Layer"]
            TRANS["Transport Layer (TCP / UDP)"]
            NET["Network Layer (IP Datagrams)"]
            APP --> TRANS --> NET
        end

        subgraph SystemBus ["บัสของระบบ (System Bus: PCIe / Memory Bus)"]
            NET <===>|"โอนถ่าย IP Datagram ผ่าน DMA"| NIC
        end

        subgraph NIC ["Network Interface Card (NIC / Network Adapter) (Hardware / Firmware)"]
            subgraph Controller ["ชิปควบคุม (Link Layer Controller)"]
                LLC["Framing, Flow Control & MAC Protocol"]
                CRC_ENG["วงจรคำนวณและตรวจสอบ CRC-32"]
            end
            PHY["Physical Layer Transceiver (PHY Interface)"]
            Controller <===> PHY
        end

        PHY <===>|"ส่งสัญญาณไฟฟ้า / คลื่นแสง / สัญญาณวิทยุ"| PhysicalLink["สื่อสัญญาณกายภาพ (Physical Link)"]
    end

    classDef soft fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef hard fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef bus fill:#334155,stroke:#94a3b8,stroke-width:1px,color:#fff;
    class CPU_OS soft;
    class NIC hard;
    class SystemBus bus;
```
""",
    12: r"""
```mermaid
flowchart LR
    subgraph Sender ["โหนดผู้ส่ง (Sending Node)"]
        D["ข้อมูลต้นทาง (Data bits: D)"] --> CalcEDC["คำนวณบิตตรวจสอบส่วนเกิน (EDC)"]
        D & CalcEDC --> TxFrame["เฟรมที่ส่ง: D + EDC"]
    end

    TxFrame ==>|"ช่องสัญญาณสื่อสาร (สัญญาณรบกวน Noise อาจทำให้บิตผิดพลาด)"| RxFrame["เฟรมที่รับ: D' + EDC'"]

    subgraph Receiver ["โหนดผู้รับ (Receiving Node)"]
        RxFrame --> CheckEDC{"ตรวจสอบความถูกต้อง:<br/>D' และ EDC' สอดคล้องกันหรือไม่?"}
        CheckEDC -->|"สอดคล้อง (No Error Detected)"| PassUp["ถอด Header ส่งต่อ D' ให้ Network Layer"]
        CheckEDC -->|"ไม่สอดคล้อง (Error Detected)"| Discard["ปฏิเสธและทิ้งเฟรม (Drop Frame)"]
    end

    classDef ok fill:#065f46,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef err fill:#7f1d1d,stroke:#f87171,stroke-width:2px,color:#fff;
    class PassUp ok;
    class Discard err;
```
""",
    13: r"""
> [!EXAMPLE] **ตัวอย่างโครงสร้างและกลไกของ Two-Dimensional Parity Matrix (2D Parity):**
> สมมติมีข้อมูล $d = 16$ บิต จัดเรียงเป็นเมทริกซ์ขนาด $4 \times 4$ พร้อมบิตพาริตีคู่ (Even Parity) ประจำแถวและคอลัมน์:
> 
> ```text
>               คอลัมน์ 1   คอลัมน์ 2   คอลัมน์ 3   คอลัมน์ 4    [Row Parity]
> แถวที่ 1:        1           0           1           0       -->    0   (ผลรวมบิต 1 เป็น 2 บิต -> ใส่ 0)
> แถวที่ 2:        0           1          [0]*         1       -->    0   (ผลรวมบิต 1 เป็น 2 บิต -> ใส่ 0)
> แถวที่ 3:        1           1           0           0       -->    0   (ผลรวมบิต 1 เป็น 2 บิต -> ใส่ 0)
> แถวที่ 4:        0           0           1           1       -->    0   (ผลรวมบิต 1 เป็น 2 บิต -> ใส่ 0)
>               -------------------------------------------------
> [Col Parity]:    0           0           1           0       -->    0   [Parity of Parity]
> ```
> 
> **สถานการณ์บิตพลิก (Single Bit Error):**
> หากบิตในแถวที่ 2 คอลัมน์ที่ 3 เกิดสัญญาณรบกวนพลิกค่าจาก `0` กลายเป็น `1`:
> 1. ผู้รับคำนวณ Parity ของแถวที่ 2: พบว่ามีบิต `1` จำนวน 3 ตัว $\implies$ **Row Parity ผิดพลาด!**
> 2. ผู้รับคำนวณ Parity ของคอลัมน์ที่ 3: พบว่ามีบิต `1` จำนวน 4 ตัว $\implies$ **Column Parity ผิดพลาด!**
> 3. จุดตัดระหว่างแถวที่ 2 และคอลัมน์ที่ 3 บ่งชี้พิกัดที่เกิดข้อผิดพลาดได้อย่างแม่นยำ $\implies$ ผู้รับทำการพลิกบิตที่ตำแหน่งดังกล่าวกลับเป็น `0` ทำให้แก้ไขข้อผิดพลาดได้ทันทีโดยไม่ต้องส่งใหม่ (**Forward Error Correction: FEC**)!
""",
    15: r"""
> [!DEFINITION] **พีชคณิตมอดุโล-2 และพหุนามกำเนิด (CRC Modulo-2 Arithmetic):**
> - **การคำนวณ Modulo-2:** ใช้การบวกและการลบแบบไม่มีตัวทด (Carry) และไม่มีการยืม (Borrow) ซึ่งเทียบเท่ากับการทำลอจิก **Exclusive-OR (XOR)**:
>   $$0 \oplus 0 = 0,\quad 0 \oplus 1 = 1,\quad 1 \oplus 0 = 1,\quad 1 \oplus 1 = 0$$
> - **ความสัมพันธ์เชิงคณิตศาสตร์:**
>   $$D \cdot 2^r \oplus R = n \cdot G$$
>   เมื่อ $D$ คือบิตข้อมูลขนาด $d$ บิต, $G$ คือพหุนามกำเนิด (Generator Polynomial) ขนาด $r+1$ บิต, และ $R$ คือบิตตรวจสอบ CRC ขนาด $r$ บิต
>   ย้ายข้างสมการด้วยคุณสมบัติ XOR:
>   $$D \cdot 2^r = n \cdot G \oplus R \implies R = \text{เศษเหลือจากการหาร } (D \cdot 2^r) \text{ ด้วย } G$$
""",
    16: r"""
> [!EXAMPLE] **แสดงวิธีทำและคำนวณ CRC แบบ Step-by-Step (CRC Long Division Trace):**
> กำหนดให้:
> - ข้อมูลต้นทาง $D = 101110_2$ ($d = 6$ บิต)
> - พหุนามกำเนิด $G = 1001_2$ ($r = 3$ บิต, ดีกรีของพหุนามคือ $x^3 + 1$)
> - เลื่อนบิตข้อมูลไปทางซ้าย $r = 3$ ตำแหน่ง: $D \cdot 2^3 = 101110000_2$
> 
> **กระบวนการตั้งหารยาว Modulo-2 (XOR Division):**
> ```text
>                 1 0 1 0 1 1   <-- ผลหาร (Quotient n)
>           -------------------
> 1 0 0 1  )  1 0 1 1 1 0 0 0 0
>           ^ 1 0 0 1
>             -------
>             0 0 1 0 1
>             ^   1 0 0 1
>                 -------
>                 0 0 1 1 0
>                 ^   0 0 0 0
>                     -------
>                     0 1 1 0 0
>                     ^ 1 0 0 1
>                       -------
>                       0 1 0 1 0
>                       ^ 1 0 0 1
>                         -------
>                         0 0 1 1  <-- เศษเหลือ (Remainder R = 011)
> ```
> 
> - ผลลัพธ์: ได้เศษเหลือ $R = 011_2$ (ขนาด 3 บิตพอดี)
> - **เฟรมข้อมูลที่ถูกส่งออกจริง:** $D \cdot 2^3 \oplus R = 101110000 \oplus 011 = \mathbf{101110011_2}$
> 
> **การตรวจสอบที่ฝั่งผู้รับ (Receiver Verification):**
> ผู้รับนำเฟรม $101110011_2$ มาตั้งหารยาวด้วย $G = 1001_2$:
> ```text
> 101110011 / 1001 = เศษเหลือ 000_2  --> ยืนยันว่าข้อมูลถูกต้องสมบูรณ์ 100% ไม่มีบิตผิดพลาด!
> ```
""",
    21: r"""
```mermaid
graph TD
    MAC["Multiple Access Protocols (โปรโตคอลควบคุมการเข้าใช้ตัวกลาง)"]
    
    MAC --> CP["1. Channel Partitioning (การแบ่งสรรช่องสัญญาณ)"]
    CP --> TDMA["TDMA: Time Division (แบ่งช่องเวลา)"]
    CP --> FDMA["FDMA: Frequency Division (แบ่งย่านความถี่)"]
    CP --> CDMA["CDMA: Code Division (แบ่งรหัสเชิงตั้งฉาก)"]

    MAC --> RA["2. Random Access (การเข้าถึงแบบสุ่ม)"]
    RA --> ALOHA["ALOHA (Pure ALOHA & Slotted ALOHA)"]
    RA --> CSMA["CSMA (Listen Before Transmit)"]
    RA --> CSMACD["CSMA/CD (Ethernet: Collision Detection)"]
    RA --> CSMACA["CSMA/CA (Wi-Fi 802.11: Collision Avoidance)"]

    MAC --> TT["3. Taking-Turns (การผลัดกันส่ง)"]
    TT --> Poll["Polling: Master/Slave Coordination"]
    TT --> Token["Token Passing: Ring Topology Token"]

    classDef main fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef sub fill:#0f172a,stroke:#a855f7,stroke-width:2px,color:#fff;
    class MAC main;
    class CP,RA,TT sub;
```
""",
    27: r"""
> [!NOTE] **บทพิสูจน์ประสิทธิภาพสูงสุดของ Slotted ALOHA (Mathematical Derivation):**
> - กำหนดให้มีโหนดที่พร้อมส่งจำนวน $N$ โหนด แต่ละโหนดมีโอกาสส่งในสล็อตเท่ากับ $p$
> - โอกาสที่โหนดใดโหนดหนึ่งส่งสำเร็จในสล็อต = $p(1-p)^{N-1}$
> - โอกาสที่สล็อตนั้นจะมีโหนดส่งสำเร็จ (Aggregate Throughput) คือ:
>   $$S(p) = N \cdot p(1-p)^{N-1}$$
> - หาค่า $p^*$ ที่ทำให้ $S(p)$ มีค่าสูงสุดโดยการหาอนุพันธ์และกำหนดให้ $\frac{dS}{dp} = 0$:
>   $$\frac{d}{dp} \left[ N p (1-p)^{N-1} \right] = N(1-p)^{N-1} - N(N-1)p(1-p)^{N-2} = 0$$
>   $$(1-p) - (N-1)p = 0 \implies 1 - Np = 0 \implies p^* = \frac{1}{N}$$
> - แทนค่า $p^* = \frac{1}{N}$ กลับลงในสมการ แล้วหาลิมิตเมื่อจำนวนโหนด $N \to \infty$:
>   $$\lim_{N \to \infty} S\left(\frac{1}{N}\right) = \lim_{N \to \infty} N \cdot \frac{1}{N} \left(1 - \frac{1}{N}\right)^{N-1} = \lim_{N \to \infty} \left(1 - \frac{1}{N}\right)^N \cdot \left(1 - \frac{1}{N}\right)^{-1} = \frac{1}{e} \approx 0.368$$
> - **สรุป:** Slotted ALOHA มีประสิทธิภาพสูงสุดเท่ากับ **$36.8\%$** ของความจุช่องสัญญาณ (อีก $63.2\%$ สูญเปล่าไปกับการชนกันและสล็อตว่าง)
""",
    28: r"""
> [!WARNING] **หน้าต่างเวลาเปราะบางของ Pure ALOHA (Vulnerable Period):**
> ใน Pure ALOHA ที่ไม่มีการแบ่งสล็อตเวลา หากโหนดส่งเฟรมความยาว $t_{frame}$ ที่เวลา $t_0$:
> - เฟรมที่เริ่มส่งในช่วง $[t_0 - t_{frame}, t_0]$ จะชนกับช่วงหัวของเฟรมปัจจุบัน
> - เฟรมที่เริ่มส่งในช่วง $[t_0, t_0 + t_{frame}]$ จะชนกับช่วงท้ายของเฟรมปัจจุบัน
> - ดังนั้น **ช่วงเวลาเปราะบาง (Vulnerable Window)** จึงมีความยาวรวมเท่ากับ **$2 \times t_{frame}$**
> - ส่งผลให้ประสิทธิภาพสูงสุดของ Pure ALOHA เหลือเพียง $\frac{1}{2e} \approx \mathbf{18.4\%}$ (เพียงครึ่งหนึ่งของ Slotted ALOHA)!
""",
    30: r"""
```mermaid
sequenceDiagram
    autonumber
    participant NodeA as โหนด A (ตำแหน่ง x=0)
    participant Bus as สื่อสัญญาณ Coaxial Cable (ความยาว L)
    participant NodeD as โหนด D (ตำแหน่ง x=L)

    Note over NodeA: t = 0: ตรวจสอบสายพบว่าว่าง (Sense Idle)<br/>A เริ่มส่งสัญญาณเฟรมลงสู่สาย
    NodeA->>Bus: คลื่นสัญญาณเริ่มแพร่กระจายไปตามสายด้วยความเร็ว v (Propagation Delay = d_prop)
    Note over NodeD: t = t1 (ก่อนที่คลื่นของ A จะเดินทางมาถึง):<br/>D ตรวจสอบสาย พบว่าสายว่าง (Sense Idle)!
    NodeD->>Bus: D เริ่มส่งเฟรมของตัวเองลงสายเช่นกัน!
    Note over Bus: ณ เวลา t2: สัญญาณของ A และ D สวนทางกันและชนกัน (Collision!)<br/>ข้อมูลทั้งสองฝั่งบิดเบือนและเสียหายทั้งหมด
```
""",
    32: r"""
> [!ALGORITHM] **อัลกอริทึม Binary Exponential Backoff ของ Ethernet CSMA/CD:**
> หลังจากตรวจพบการชนกันครั้งที่ $m$ ($m \le 16$):
> 1. โหนดสุ่มเลือกจำนวนเต็ม $K$ จากเซต:
>    $$K \in \{0, 1, 2, \dots, 2^k - 1\} \quad \text{โดยที่ } k = \min(m, 10)$$
> 2. โหนดจะรอเป็นระยะเวลาเท่ากับ:
>    $$\text{Wait Time} = K \times 512 \text{ บิตไทม์ (Bit Times)}$$
>    (บนอีเทอร์เน็ต 10 Mbps: 512 บิตไทม์ $= 51.2\ \mu\text{s}$)
> 3. หากชนครบ 16 ครั้ง ($m=16$) โหนดจะยอมแพ้และรายงานข้อผิดพลาดไปยังเลเยอร์บน
""",
    33: r"""
> [!NOTE] **สูตรการคำนวณขนาดเฟรมขั้นต่ำของอีเทอร์เน็ต (Minimum Frame Size Derivation):**
> เพื่อให้โหนดส่งมั่นใจว่าจะตรวจพบการชนกันได้ก่อนที่ตัวเองจะส่งเฟรมเสร็จสิ้น:
> $$T_{trans} \ge 2 \cdot T_{prop}$$
> $$\frac{L_{min}}{R} \ge 2 \cdot \frac{D_{max}}{v}$$
> บนเครือข่าย 10BASE5 Ethernet:
> - $R = 10\text{ Mbps}$, ระยะทางสูงสุด $D_{max} \approx 2500\text{ m}$ (รวม Repeater 4 ตัว), ความเร็วสัญญาณ $v \approx 2 \times 10^8\text{ m/s}$
> - Round-Trip Time ($2 \cdot T_{prop}$) $\approx 51.2\ \mu\text{s}$
> - ขนาดเฟรมขั้นต่ำ:
>   $$L_{min} = 10\text{ Mbps} \times 51.2\ \mu\text{s} = 512\text{ บิต} = \mathbf{64\text{ ไบต์}}$$
> หากข้อมูลสั้นกว่า 64 ไบต์ ระบบต้องเติมบิตส่วนเกิน (**Padding**) ให้ครบ 64 ไบต์เสมอ!
""",
    39: r"""
| หมวดหมู่โปรโตคอล | โปรโตคอลตัวแทน | ข้อดีหลัก (Pros) | ข้อเสียและข้อจำกัด (Cons) | ประสิทธิภาพสูงสุด |
| :--- | :--- | :--- | :--- | :--- |
| **Channel Partitioning** | **TDMA / FDMA** | ขจัดปัญหาการชนกัน 100%, มีความยุติธรรมสูงที่ภาระงานหนาแน่น | เสียเวลา/แถบความถี่ในสล็อตว่างหากโหนดไม่มีข้อมูล, แถบความถี่จำกัดที่ $R/N$ | $\approx 100\%$ เมื่อทุกโหนดส่งเต็มที่, ต่ำมากเมื่อมีโหนดส่งน้อย |
| **Random Access** | **Slotted ALOHA** | โหนดเดี่ยวส่งได้เต็มสปีด $R$, กระจายศูนย์สูง | สล็อตชนกันและสล็อตว่าง, ต้องซิงโครไนซ์นาฬิกา | $1/e \approx 36.8\%$ |
| **Random Access** | **Pure ALOHA** | เรียบง่ายที่สุด, ไม่ต้องซิงค์เวลา | หน้าต่างเปราะบางกว้าง $2 t_{frame}$, ชนกันง่ายมาก | $1/(2e) \approx 18.4\%$ |
| **Random Access** | **CSMA / CSMA/CD** | ตรวจสอบสายก่อนส่ง และยกเลิกทันทีเมื่อชนกัน, ประสิทธิภาพสูงมากบนสายสั้น | เกิดการชนได้จาก Propagation Delay, ต้องมีขนาดเฟรมขั้นต่ำ | ใกล้เคียง $100\%$ เมื่อ $d_{prop} \to 0$ |
| **Taking-Turns** | **Polling** | ไม่มีสล็อตว่างเปล่า, ป้องกันการชนกันได้สมบูรณ์ | มี Polling Overhead, มีความหน่วง, เกิด Single Point of Failure ที่ Master | สูงที่ภาระงานหนาแน่น |
| **Taking-Turns** | **Token Passing** | กระจายศูนย์โดยสมบูรณ์, ประสิทธิภาพสูงที่โหลดหนาแน่น | มี Token Overhead, เสี่ยงต่อปัญหา Token สูญหายหรือโหนดพัง | สูงที่ภาระงานหนาแน่น |
""",
    41: r"""
```text
+------------------------------------+------------------------------------+
|  24 bits: Organizationally Unique   |      24 bits: Network Interface     |
|          Identifier (OUI)          |      Controller (NIC) Specific     |
|    (กำหนดโดย IEEE แก่ผู้ผลิตฮาร์ดแวร์)    |       (กำหนดโดยโรงงานผู้ผลิต)         |
+------------------------------------+------------------------------------+
<----------------------------- 48 bits (6 Bytes) ------------------------->
ตัวอย่าง: 1A-2F-BB-76-09-AD หรือ 1a:2f:bb:76:09:ad
```
""",
    45: r"""
```text
+-------------------------------------------------------------------------+
|                  โครงสร้างแพ็กเก็ต ARP Message (28 ไบต์)                   |
+------------------------------------+------------------------------------+
| Hardware Type (2 Bytes: Ethernet=1)| Protocol Type (2 Bytes: IPv4=0800) |
+------------------+-----------------+------------------------------------+
| HW Size (1 Byte) | Prot Size (1B)  | Opcode (2 Bytes: Request=1, Reply=2|
+------------------+-----------------+------------------------------------+
|               Sender MAC Address (6 Bytes)                              |
+------------------------------------+------------------------------------+
|               Sender IP Address (4 Bytes)                               |
+-------------------------------------------------------------------------+
|               Target MAC Address (6 Bytes: Request จะใส่ 00:00:00:...)  |
+------------------------------------+------------------------------------+
|               Target IP Address (4 Bytes: หมายเลข IP ที่ต้องการถามหา)      |
+-------------------------------------------------------------------------+
```
""",
    48: r"""
> [!EXAMPLE] **ตารางเปรียบเทียบแอดเดรสในการส่งข้อมูลข้ามเครือข่ายย่อย (Routing Across Subnets Trace):**
> สมมติโฮสต์ A (`111.111.111.111`, MAC: `7E-61-9C-87-99-6A`) ต้องการส่ง IP Datagram ไปยังโฮสต์ B (`222.222.222.222`, MAC: `49-BD-D2-C7-56-2A`) ผ่าน Router R ที่มี 2 อินเทอร์เฟซ:
> - อินเทอร์เฟซฝั่งซ้าย: IP `111.111.111.110`, MAC `E6-E9-00-17-9B-4B`
> - อินเทอร์เฟซฝั่งขวา: IP `222.222.222.220`, MAC `1A-23-F9-CD-06-9B`
> 
> | ขั้นตอนการส่งต่อข้อมูล | Source IP | Destination IP | Source MAC | Destination MAC | คำอธิบายกลไกการทำงาน |
> | :--- | :--- | :--- | :--- | :--- | :--- |
> | **ช่วงที่ 1: Host A $\to$ Router R** | `111.111.111.111` | `222.222.222.222` | `7E-61-9C-87-99-6A` (A) | `E6-E9-00-17-9B-4B` (R ฝั่งซ้าย) | A ใช้ ARP ค้นหา MAC ของ Gateway R แล้วห่อหุ้มเฟรมส่งถึง R |
> | **ภายใน Router R** | `111.111.111.111` | `222.222.222.222` | *(ปลดเฟรม L2 ออก)* | *(ตรวจสอบตาราง Routing Table)* | Router อ่าน Dst IP, ลดค่า TTL, คำนวณ Checksum ใหม่ |
> | **ช่วงที่ 2: Router R $\to$ Host B** | `111.111.111.111` | `222.222.222.222` | `1A-23-F9-CD-06-9B` (R ฝั่งขวา) | `49-BD-D2-C7-56-2A` (B) | R ใช้ ARP บน Subnet ขวาหา MAC ของ B แล้วห่อหุ้มเฟรมใหม่ส่งถึง B |
> 
> *สังเกต:* **IP Address ต้นทางและปลายทางจะไม่เปลี่ยนแปลงตลอดเส้นทาง** ส่วน **MAC Address จะเปลี่ยนใหม่ทุกครั้งในแต่ละ Hop ของลิงก์!**
""",
    57: r"""
```text
+----------+------+----------+----------+--------+------------------+---------+
| Preamble | SFD  | Dest MAC | Src MAC  | Type   | Data Payload     | CRC/FCS |
| 7 Bytes  | 1 B  | 6 Bytes  | 6 Bytes  | 2 B    | 46 - 1500 Bytes  | 4 Bytes |
+----------+------+----------+----------+--------+------------------+---------+
<--------------------------- Ethernet Frame (64 - 1518 Bytes) ------------->
- Preamble: 7 ไบต์ของรูปแบบบิต 10101010 เพื่อซิงค์สัญญาณนาฬิกา
- SFD (Start Frame Delimiter): 1 ไบต์ 10101011 บ่งบอกจุดเริ่มต้นของเนื้อหาเฟรม
- Type: 0x0800 (IPv4), 0x0806 (ARP), 0x86DD (IPv6)
- FCS: รหัสตรวจสอบ CRC-32 เพื่อยืนยันความถูกต้องของเฟรม
```
""",
    65: r"""
> [!DEFINITION] **โครงสร้างตาราง Forwarding Table ของ Ethernet Switch:**
> ตารางจับคู่ความสัมพันธ์ระหว่าง MAC Address และพอร์ตทางกายภาพ โดยแต่ละรายการจะมีเวลาหมดอายุ (Aging Timer) กำกับ:
> 
> | Destination MAC Address | Output Port Interface | Aging TTL (Time-to-Live) |
> | :---: | :---: | :---: |
> | `00-12-34-56-78-AA` | Port 1 | 60 วินาที (นับถอยหลัง) |
> | `00-12-34-56-78-BB` | Port 2 | 45 วินาที (นับถอยหลัง) |
> | `00-12-34-56-78-CC` | Port 3 | 120 วินาที (นับถอยหลัง) |
""",
    68: r"""
> [!EXAMPLE] **การจำลองตรรกะการเรียนรู้ด้วยตนเองและการส่งต่อของ Switch (Trace):**
> สมมติสวิตช์เปิดเครื่องใหม่ (ตารางว่างเปล่า):
> 1. **โฮสต์ A ส่งเฟรมไปยัง A' (เข้ามาที่ Port 1):**
>    - สวิตช์บันทึก: `MAC(A) -> Port 1` ลงในตาราง
>    - สวิตช์ค้นหา `MAC(A')` ในตาราง $\to$ ไม่พบ (Unknown Destination)
>    - สวิตช์ทำการ **Flood (กระจายเฟรมออกทุกพอร์ตยกเว้น Port 1)**
> 2. **โฮสต์ A' ส่งเฟรมตอบกลับ A (เข้ามาที่ Port 2):**
>    - สวิตช์บันทึก: `MAC(A') -> Port 2` ลงในตาราง
>    - สวิตช์ค้นหา `MAC(A)` ในตาราง $\to$ พบอยู่ที่ Port 1
>    - สวิตช์ทำการ **Forward เจาะจงไปยัง Port 1 เท่านั้น (Unicast Selective Forwarding)** โดยไม่มีการ Flood อีกต่อไป!
""",
    73: r"""
| คุณสมบัติและมิติการเปรียบเทียบ | Layer 2 Ethernet Switch | Layer 3 Network Router |
| :--- | :--- | :--- |
| **ระดับชั้นในสถาปัตยกรรม** | Data Link Layer (Layer 2) | Network Layer (Layer 3) |
| **การตรวจสอบข้อมูล Header** | ตรวจสอบเฉพาะ L2 Ethernet Header (MAC Address) | ตรวจสอบ L3 IP Header (IP Address) |
| **รูปแบบแอดเดรส** | MAC Address (48 บิต แบบราบ Flat, ติดตัวฮาร์ดแวร์) | IP Address (32 หรือ 128 บิต แบบลำดับชั้น Hierarchical) |
| **การสร้างและอัปเดตตาราง** | สร้างอัตโนมัติด้วยกลไก Self-Learning (Plug-and-Play) | แลกเปลี่ยนข้อมูลผ่าน Routing Protocols (OSPF, BGP, RIP) |
| **การรับมือกับโครงสร้างแบบวนลูป** | อาศัย Spanning Tree Protocol (STP) เพื่อบล็อกพอร์ต | มีค่า TTL ใน IP Header และ Routing Algorithm ป้องกันลูป |
| **ขอบเขต Broadcast Domain** | ส่งผ่าน Broadcast ข้ามทุกพอร์ตใน VLAN เดียวกัน | บล็อก Broadcast ไม่ให้ข้ามเครือข่ายย่อย (Subnet Isolation) |
| **ประสิทธิภาพและความเร็ว** | สูงมาก (ระดับเทราบิต/วินาที ด้วยชิป L2 ASIC) | สูงในระดับฮาร์ดแวร์ แต่มีความซับซ้อนของการค้นหา LPM |
""",
    80: r"""
```text
+-----------+----------+------------------------------------+--------+
| Dest MAC  | Src MAC  |       IEEE 802.1Q Tag (4 ไบต์)      | Type   |
| 6 Bytes   | 6 Bytes  |                                    | 2 B    |
+-----------+----------+------------------------------------+--------+
                       /                                    \
                      /                                      \
         +-------------------------+-----+-----+-------------+
         | TPID (0x8100: Tag Prot) | PCP | DEI | VLAN ID     |
         |        16 bits          | 3 b | 1 b |  12 bits    |
         +-------------------------+-----+-----+-------------+
         - TPID (Tag Protocol Identifier): ค่าคงที่ 0x8100 บ่งบอกว่าเป็นเฟรม 802.1Q
         - PCP (Priority Code Point): 3 บิตสำหรับกำหนดลำดับความสำคัญของคิว (QoS CoS 8 ระดับ)
         - DEI (Drop Eligible Indicator): 1 บิตระบุว่าเฟรมนี้ยอมให้ดรอปได้หรือไม่เมื่อสายสัญญาณติดขัด
         - VID (VLAN Identifier): 12 บิตระบุหมายเลข VLAN (รองรับได้สูงสุด 4,096 VLANs: 0-4095)
```
""",
    84: r"""
```text
+------------------------------------+-----------------------+---+--------+
|      Label Value (20 bits)         | Exp / QoS TC (3 bits) | S |  TTL   |
|   (ป้ายชื่อกำกับเส้นทางการส่งต่อ)       |  (Traffic Class/QoS)  |1 b| 8 bits |
+------------------------------------+-----------------------+---+--------+
<------------------------- MPLS Shim Header (32 bits / 4 Bytes) ---------->
- Label: หมายเลขป้ายกำกับเส้นทาง (ขนาด 20 บิต รองรับได้กว่า 1 ล้านป้าย)
- Exp: บิตทดลองใช้งาน นิยมใช้กำหนดชั้นคุณภาพบริการ (QoS / Class of Service)
- S (Bottom of Stack): บิตระบุจุดสิ้นสุดของป้าย (1 = ป้ายล่างสุดก่อนถึง IP Header, 0 = ยังมีป้ายซ้อนทับอยู่)
- TTL (Time to Live): คัดลอกค่ามาจาก IP TTL เพื่อป้องกันปัญหาวนลูปไม่รู้จบ
```
""",
    89: r"""
> [!EXAMPLE] **ตัวอย่างตารางการสลับป้ายชื่อ (MPLS Label Forwarding Table Trace):**
> 
> | In Interface | In Label | Out Interface | Out Label | ปฏิบัติการของเร้าเตอร์ (Action) |
> | :---: | :---: | :---: | :---: | :--- |
> | `Eth 0` | `20` | `Eth 1` | `65` | **Swap:** ปลดป้าย 20 ออก แปะป้าย 65 แล้วส่งออกทาง Eth 1 |
> | `Eth 0` | `40` | `Eth 2` | `17` | **Swap:** ปลดป้าย 40 ออก แปะป้าย 17 แล้วส่งออกทาง Eth 2 |
> | `Eth 1` | `None` (IP Datagram) | `Eth 0` | `20` | **Push:** (Ingress LSR) แปะป้าย 20 นำหน้า IP Datagram |
> | `Eth 2` | `100` | `LAN` | `None` | **Pop:** (Egress LSR) ลอกป้าย 100 ทิ้ง คืนรูปเป็น IP Datagram ส่งต่อให้ LAN |
""",
    93: r"""
```mermaid
flowchart TD
    subgraph SpineLayer ["Spine Switches (สวิตช์แกนกลางแบ็คโบนความเร็วสูง)"]
        direction LR
        S1["Spine Switch 1"]
        S2["Spine Switch 2"]
        S3["Spine Switch 3"]
        S4["Spine Switch 4"]
    end

    subgraph LeafLayer ["Leaf Switches / Top-of-Rack (TOR) (สวิตช์ประจำตู้แร็คเซิร์ฟเวอร์)"]
        direction LR
        L1["Leaf 1 (TOR)"]
        L2["Leaf 2 (TOR)"]
        L3["Leaf 3 (TOR)"]
        L4["Leaf 4 (TOR)"]
    end

    L1 <===> S1 & S2 & S3 & S4
    L2 <===> S1 & S2 & S3 & S4
    L3 <===> S1 & S2 & S3 & S4
    L4 <===> S1 & S2 & S3 & S4

    subgraph Racks ["Server Racks (กลุ่มเครื่องแม่ข่าย)"]
        L1 --- R1["Rack 1: Servers"]
        L2 --- R2["Rack 2: Servers"]
        L3 --- R3["Rack 3: Servers"]
        L4 --- R4["Rack 4: Servers"]
    end

    classDef spine fill:#0f172a,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef leaf fill:#1e293b,stroke:#38bdf8,stroke-width:2px,color:#fff;
    class S1,S2,S3,S4 spine;
    class L1,L2,L3,L4 leaf;
```
""",
    100: r"""
```mermaid
sequenceDiagram
    autonumber
    participant Laptop as แล็ปท็อปของนักศึกษา
    participant Switch as Access Switch (L2)
    participant Router as Gateway Router (DHCP/NAT)
    participant DNS as DNS Server (Domain Resolver)
    participant Web as Google Web Server (HTTP/HTTPS)

    rect rgb(20, 30, 45)
        Note over Laptop,Router: ขั้นที่ 1: เชื่อมต่อเครือข่ายและขอรับ IP Address ด้วย DHCP
        Laptop->>Switch: DHCP Discover (L2 Broadcast FF:FF:.. / IP 255.255.255.255)
        Switch->>Router: Flood DHCP Discover
        Router-->>Laptop: DHCP Offer (เสนอ IP 68.85.2.101, Gateway 68.85.2.1, DNS 68.87.71.226)
        Laptop->>Router: DHCP Request
        Router-->>Laptop: DHCP ACK (ติดตั้งค่า IP Configuration ลงสู่เครื่อง)
    end

    rect rgb(30, 20, 45)
        Note over Laptop,Router: ขั้นที่ 2: ค้นหา MAC Address ของ Default Gateway ด้วย ARP
        Laptop->>Router: ARP Request (Broadcast: Who has IP 68.85.2.1? Tell 68.85.2.101)
        Router-->>Laptop: ARP Reply (Unicast: 68.85.2.1 is at 00:22:6B:45:13:A1)
    end

    rect rgb(20, 40, 30)
        Note over Laptop,DNS: ขั้นที่ 3: แปลงชื่อโดเมน www.google.com ด้วย DNS
        Laptop->>Router: DNS Query (UDP Port 53 -> ถามหา IP ของ www.google.com)
        Router->>DNS: ส่งต่อ DNS Query ข้าม Internet Core
        DNS-->>Router: DNS Response (www.google.com IP is 64.233.169.104)
        Router-->>Laptop: ส่งมอบ DNS Response แก่แล็ปท็อป
    end

    rect rgb(45, 30, 20)
        Note over Laptop,Web: ขั้นที่ 4: เปิดการเชื่อมต่อ TCP Three-Way Handshake
        Laptop->>Router: TCP SYN (Port 80/443, Seq=0)
        Router->>Web: Forward TCP SYN
        Web-->>Router: TCP SYNACK (Seq=0, Ack=1)
        Router-->>Laptop: Forward TCP SYNACK
        Laptop->>Router: TCP ACK (Seq=1, Ack=1) + HTTP GET Request
        Router->>Web: Forward HTTP GET
    end

    rect rgb(20, 35, 45)
        Note over Laptop,Web: ขั้นที่ 5: แลกเปลี่ยนข้อมูลเว็บเพจ HTTP Response
        Web-->>Router: HTTP 200 OK (บรรจุไฟล์ HTML หน้าเว็บเพจ)
        Router-->>Laptop: Forward HTTP Response ให้เบราว์เซอร์เรนเดอร์ภาพหน้าเว็บเพจสำเร็จ!
    end
```
""",
    111: r"""
> [!NOTE] **การพิสูจน์ทางคณิตศาสตร์อย่างละเอียดของประสิทธิภาพ Pure ALOHA (Formal Proof):**
> 1. **นิยามตัวแปร:**
>    - กำหนดให้เวลาส่ง 1 เฟรมมีค่าเท่ากับ 1 หน่วยเวลา ($t_{frame} = 1$)
>    - โหนดเริ่มส่งเฟรมที่เวลา $t_0$
>    - เฟรมนี้จะส่งผ่านสำเร็จก็ต่อเมื่อ **ไม่มีโหนดอื่นใดส่งเฟรมในช่วงเวลา $[t_0 - 1, t_0 + 1]$** ซึ่งกินเวลาทั้งหมด **2 หน่วยเวลา (2 Frame Times)**
> 
> 2. **การคำนวณความน่าจะเป็น:**
>    - ในแต่ละหน่วยเวลา โหนดอื่นจะส่งเฟรมด้วยความน่าจะเป็น $p$ และไม่ส่งด้วยความน่าจะเป็น $1-p$
>    - โอกาสที่โหนดหนึ่งจะไม่มีการส่งตลอดช่วง 2 สล็อต = $(1-p)^2$
>    - โอกาสที่โหนดอื่นอีก $N-1$ โหนดจะไม่ส่งตลอดช่วง 2 สล็อตพร้อมกัน = $[(1-p)^2]^{N-1} = (1-p)^{2(N-1)}$
>    - ดังนั้น ความน่าจะเป็นที่โหนดที่กำหนดจะส่งสำเร็จคือ:
>      $$P(\text{success by given node}) = p(1-p)^{2(N-1)}$$
> 
> 3. **ปริมาณงานรวมของระบบ (Aggregate Throughput $S$):**
>    - เมื่อมี $N$ โหนด อัตราความสำเร็จรวมต่อหน่วยเวลาคือ:
>      $$S = N \cdot p (1-p)^{2(N-1)}$$
>    - กำหนดตัวแปรรวม $G = Np$ (อัตราการสร้างเฟรมเฉลี่ยของทั้งระบบต่อหน่วยเวลา) จะได้ $p = G/N$:
>      $$S = G \left(1 - \frac{G}{N}\right)^{2(N-1)}$$
>    - เมื่อจำนวนโหนดมีมากมหาศาล ($N \to \infty$):
>      $$\lim_{N \to \infty} S = G \cdot e^{-2G}$$
> 
> 4. **การหาค่าประสิทธิภาพสูงสุด ($S_{max}$):**
>    - ทำการหาอนุพันธ์ของ $S$ เทียบกับ $G$ แล้วกำหนดให้เท่ากับ 0:
>      $$\frac{dS}{dG} = \frac{d}{dG}\left[ G e^{-2G} \right] = e^{-2G} - 2G e^{-2G} = e^{-2G}(1 - 2G) = 0$$
>    - เนื่องจาก $e^{-2G} \ne 0$ จะได้:
>      $$1 - 2G = 0 \implies G^* = 0.5 \text{ เฟรมต่อหน่วยเวลา}$$
>    - แทนค่า $G^* = 0.5$ กลับลงในสมการ Throughput:
>      $$S_{max} = 0.5 \cdot e^{-2(0.5)} = \frac{0.5}{e} = \frac{1}{2e} \approx \mathbf{0.18394 \quad (18.4\%)}$$
> 
> 5. **บทสรุปเปรียบเทียบ:**
>    - **Slotted ALOHA:** มีช่วงเปราะบาง 1 frame time $\implies G^* = 1.0 \implies S_{max} = 1/e \approx \mathbf{36.8\%}$
>    - **Pure ALOHA:** มีช่วงเปราะบาง 2 frame times $\implies G^* = 0.5 \implies S_{max} = 1/(2e) \approx \mathbf{18.4\%}$
"""
}

# Building the Master Document
md_lines = []

# Frontmatter
md_lines.append("""---
tags:
  - networking
  - lecture
  - link-layer
  - lan
  - ethernet
  - mac-address
  - arp
  - switch
  - vlan
  - vxlan
  - mpls
  - datacenter
  - crc
  - aloha
  - csma-cd
  - v9-current
created: 2026-09-21
updated: 2026-09-21
curriculum: Current v9.0 (Slides 1–111 Complete Slide-by-Slide Master Guide) & Kurose-Ross 8th Ed
type: lecture-note
---

# Lecture 6: Link Layer and Local Area Networks (Current v9.0 Complete Master Guide)

> [!SUMMARY]
> **เอกสารสรุปคลังความรู้วิชา Computer Networks: Chapter 6 Link Layer and LANs (ฉบับสมบูรณ์แบบเรียงลำดับครบ 111 สไลด์ 100%)**
> รวบรวม เรียบเรียง และวิเคราะห์เนื้อหาอย่างละเอียดลึกซึ้งจากสไลด์อาจารย์ผู้สอน สไลด์เจาะลึก CRC ของภาควิชา และหนังสือเรียน *Computer Networking: A Top-Down Approach (Kurose & Ross 8th Edition)* ครอบคลุมเนื้อหาทั้ง 111 สไลด์แบบเรียงหน้าอย่างเป็นระบบ พร้อมภาพและไดอะแกรมประกอบ ตัวอย่างการคำนวณ ตาราง Trace Table และข้อสังเกตความถูกต้องในทุกสไลด์

---

## 📑 สารบัญสไลด์ตามลำดับหน้า (Master Table of Contents: Slides 1–111)
""")

# Build TOC
current_topic = None
for num_str, body in slides:
    num = int(num_str)
    title_m = re.search(r'<h3[^>]*>(.*?)</h3>', body, re.DOTALL)
    title = html.unescape(title_m.group(1).strip()) if title_m else f"Slide {num}"
    
    if num in topic_titles:
        md_lines.append(f"\n### {topic_titles[num]}")
    
    md_lines.append(f"- [[#Slide {num}: {title}|สไลด์ที่ {num}: {title}]]")

md_lines.append("\n---\n")

# Process Body
for num_str, body in slides:
    num = int(num_str)
    title_m = re.search(r'<h3[^>]*>(.*?)</h3>', body, re.DOTALL)
    title = html.unescape(title_m.group(1).strip()) if title_m else f"Slide {num}"
    
    # Topic header
    if num in topic_titles:
        md_lines.append(f"\n# {topic_titles[num]}\n")
    
    # Slide header
    md_lines.append(f"## Slide {num}: {title}\n")
    md_lines.append(f"> [!NOTE] **สไลด์ที่ {num} จาก 111 สไลด์ (Slide {num} of 111)**\n>\n> **ชื่อหัวข้อสไลด์:** {title}\n")
    
    # Extract sections
    visual_m = re.search(r'<section class=\"visual-reading\">(.*?)</section>', body, re.DOTALL)
    accuracy_m = re.search(r'<section class=\"accuracy-note\">(.*?)</section>', body, re.DOTALL)
    extra_m = re.search(r'<div class=\"extra-note\">(.*?)</div\s*>', body, re.DOTALL)
    key_m = re.search(r'<section class=\"key-idea\">(.*?)</section>', body, re.DOTALL)
    
    # Extract reading body main text
    rb_m = re.search(r'<div class=\"reading-body\">(.*)', body, re.DOTALL)
    rb = rb_m.group(1) if rb_m else body
    main_text = re.sub(r'<section class=\"visual-reading\">.*?</section>', '', rb, flags=re.DOTALL)
    main_text = re.sub(r'<section class=\"accuracy-note\">.*?</section>', '', main_text, flags=re.DOTALL)
    main_text = re.sub(r'<section class=\"key-idea\">.*?</section>', '', main_text, flags=re.DOTALL)
    main_text = re.sub(r'<div class=\"extra-note\">.*?</div>', '', main_text, flags=re.DOTALL)
    main_text = re.sub(r'</div>\s*$', '', main_text, flags=re.DOTALL)
    
    cleaned_main = clean_inline_html(main_text)
    md_lines.append(cleaned_main + "\n")
    
    # Inject deep-dive if present
    if num in deep_dives:
        md_lines.append(deep_dives[num].strip() + "\n")
        
    # Inject Visual Reading
    if visual_m:
        md_lines.append(format_callout("TIP", "การอ่านภาพและไดอะแกรมประจำสไลด์ (Visual Reading & Diagram Analysis)", visual_m.group(1)))
        
    # Inject Accuracy Note
    if accuracy_m:
        md_lines.append(format_callout("WARNING", "ข้อสังเกตความถูกต้องและบริบททางเทคนิค (Accuracy & Context Note)", accuracy_m.group(1)))
        
    # Inject Extra Note
    if extra_m:
        md_lines.append(format_callout("NOTE", "ข้อสังเกตเพิ่มเติม (Extra Note)", extra_m.group(1)))
        
    # Inject Key Takeaways
    if key_m:
        md_lines.append(format_callout("SUMMARY", "ประเด็นสำคัญประจำสไลด์ที่ควรจำ (Key Takeaways)", key_m.group(1)))
        
    md_lines.append("---\n")

full_content = '\n'.join(md_lines)
output_path = '05_Wiki/Chapter_06_Link_Layer_and_Wireless/01_Lecture_06_Chapter_6_Link_Layer_and_LANs_v9.md'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(full_content)

print(f"Generated successfully: {output_path}")
print(f"File size: {os.path.getsize(output_path)} bytes")
print(f"Total lines: {len(full_content.splitlines())}")

