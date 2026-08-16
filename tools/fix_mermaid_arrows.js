const fs = require('fs');
const path = require('path');

const fixes = [
  {
    file: 'Wiki/Interactive Lab Guide - Chapter 1 Network Fundamentals.md',
    search: 'P1["Device A"] <===="Dedicated Link (100% Capacity)"====> P2["Device B"]',
    replace: 'P1["Device A"] <===|"Dedicated Link (100% Capacity)"|===> P2["Device B"]'
  },
  {
    file: 'Wiki/Interactive Lab Guide - Chapter 3 Application Layer Protocols.md',
    search: 'CSOCK <===="TCP / UDP Logical Connection"====> SSOCK',
    replace: 'CSOCK <===|"TCP / UDP Logical Connection"|===> SSOCK'
  },
  {
    file: 'Wiki/Interactive Lab Guide - Chapter 3 Application Layer Protocols.md',
    search: 'CLIENT <===="1. Control Connection (TCP Port 21)<br/>[คำสั่ง: USER, PASS, CWD, LIST, RETR, QUIT / รหัสตอบกลับ: 220, 331, 230]"====> SERVER',
    replace: 'CLIENT <===|"1. Control Connection (TCP Port 21)<br/>[คำสั่ง: USER, PASS, CWD, LIST, RETR, QUIT]"|===> SERVER'
  },
  {
    file: 'Wiki/Interactive Lab Guide - Chapter 3 Application Layer Protocols.md',
    search: 'CLIENT <====="2. Data Connection (TCP Port 20 หรือ Dynamic Port)<br/>[ส่งผ่านไบต์ข้อมูลไฟล์ดิบ เปิดเมื่อส่งไฟล์ และปิดทันทีเมื่อเสร็จ]"=====> SERVER',
    replace: 'CLIENT <===|"2. Data Connection (TCP Port 20 หรือ Dynamic Port)<br/>[ส่งผ่านไบต์ข้อมูลไฟล์ดิบ]"|===> SERVER'
  },
  {
    file: 'Wiki/Lecture 4 - Transport Layer Protocols and Mechanics.md',
    search: 'P1[📱 Web Browser Process] <=========================> P2[🖥️ Web Server Process]',
    replace: 'P1["📱 Web Browser Process"] <===|"TCP 4-tuple Socket"|===> P2["🖥️ Web Server Process"]'
  },
  {
    file: 'Wiki/Lecture 5 - Network Layer, Routing, and IP Addressing.md',
    search: 'R1B <===="eBGP Session"====> R2A',
    replace: 'R1B <===|"eBGP Session"|===> R2A'
  },
  {
    file: 'Wiki/Lecture 5 - Network Layer, Routing, and IP Addressing.md',
    search: 'R2B <===="eBGP Session"====> R3A',
    replace: 'R2B <===|"eBGP Session"|===> R3A'
  },
  {
    file: 'Wiki/Lecture 5 - Network Layer, Routing, and IP Addressing.md',
    search: 'S_API <===="OpenFlow Protocol (TCP/TLS 6653)"====> SW1 & SW2 & SW3',
    replace: 'S_API <===|"OpenFlow Protocol (TCP/TLS 6653)"|===> SW1 & SW2 & SW3'
  },
  {
    file: 'Wiki/Lecture 6 - Link Layer, Local Area Networks, and Wireless.md',
    search: 'GNB <===="N3 Interface (GTP Tunnel)"====> UPF',
    replace: 'GNB <===|"N3 Interface (GTP Tunnel)"|===> UPF'
  }
];

fixes.forEach(fx => {
  if (fs.existsSync(fx.file)) {
    let content = fs.readFileSync(fx.file, 'utf8');
    if (content.includes(fx.search)) {
      content = content.replace(fx.search, fx.replace);
      fs.writeFileSync(fx.file, content, 'utf8');
      console.log(`Applied fix in ${fx.file}`);
    } else {
      console.warn(`Could not find search string in ${fx.file}`);
    }
  }
});
