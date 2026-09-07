const fs = require('fs');
const path = require('path');

const targetOutputDir = path.resolve('c:/Project/computer-network-&-Internet/03_Homework/Current_Year_Assignments');
const mirrorOutputDir = path.resolve('c:/Project/computer-network-&-Internet/02_Slides/Chapter_04_Network_Data_Plane/Current_Year_Course_v9.0');

if (!fs.existsSync(targetOutputDir)) fs.mkdirSync(targetOutputDir, { recursive: true });
if (!fs.existsSync(mirrorOutputDir)) fs.mkdirSync(mirrorOutputDir, { recursive: true });

console.log('>>> Generating Subnet Solution Documents...');

// Helper to convert IP string to 32-bit binary array of '0' and '1'
function ipToBits(ipStr) {
  return ipStr.split('.').map(octet => {
    let b = parseInt(octet, 10).toString(2);
    return b.padStart(8, '0');
  }).join('');
}

// Helper to convert prefix to 32-bit mask binary array
function prefixToBits(prefix) {
  return '1'.repeat(prefix) + '0'.repeat(32 - prefix);
}

// Render 32 bit cells HTML with colors for Network, Subnet, Host
function renderBitGridRow(label, bitsStr, netBits, subnetBits, dottedDecimal) {
  let html = `<div class="bit-row-container">
    <div class="bit-row-label">
      <span class="label-title">${label}</span>
      <span class="label-dec">${dottedDecimal || ''}</span>
    </div>
    <div class="octets-wrapper">`;

  for (let oct = 0; oct < 4; oct++) {
    html += `<div class="octet-box">`;
    for (let bit = 0; bit < 8; bit++) {
      const idx = oct * 8 + bit;
      const bitChar = bitsStr[idx] || '0';
      let typeClass = 'host-bit';
      if (idx < netBits) {
        typeClass = 'net-bit';
      } else if (idx < netBits + subnetBits) {
        typeClass = 'subnet-bit';
      }
      html += `<span class="bit-cell ${typeClass}">${bitChar}</span>`;
    }
    html += `</div>`;
    if (oct < 3) {
      html += `<span class="octet-dot">•</span>`;
    }
  }

  html += `</div></div>`;
  return html;
}

// Function to generate the worksheet HTML for an individual problem (styled like the image)
function renderWorksheetCard(data) {
  return `
  <div class="worksheet-card ${data.pageBreak ? 'page-break' : ''}">
    <div class="card-header-bar">
      <div class="header-left">
        <span class="quiz-badge">${data.quizTitle}</span>
        <span class="problem-title">${data.problemTitle}</span>
      </div>
      <div class="header-right">
        <span class="score-box">คะแนนเต็ม: ______ / ______</span>
      </div>
    </div>

    <!-- Upper Spec Form (Mirroring the photo template) -->
    <div class="spec-form-grid">
      <div class="spec-item">
        <span class="spec-label">IP Address:</span>
        <span class="spec-val highlight-blue">${data.ip}</span>
        <span class="spec-slash">/</span>
        <span class="spec-val highlight-purple">${data.prefix}</span>
      </div>
      <div class="spec-row-bits">
        <div class="spec-bit-col">
          <span class="spec-label">Network Bits:</span>
          <span class="spec-val-box">${data.netBits}</span>
        </div>
        <div class="spec-bit-col">
          <span class="spec-label">Subnet Bits:</span>
          <span class="spec-val-box">${data.subnetBits}</span>
        </div>
        <div class="spec-bit-col">
          <span class="spec-label">Host Bits:</span>
          <span class="spec-val-box">${data.hostBits}</span>
        </div>
      </div>
      <div class="spec-row-stats">
        <div class="spec-stat-col">
          <span class="spec-label">Number of Subnets:</span>
          <span class="spec-val-box highlight-orange">${data.numSubnets}</span>
        </div>
        <div class="spec-stat-col">
          <span class="spec-label">Hosts per Subnet (Usable):</span>
          <span class="spec-val-box highlight-green">${data.hostsPerSubnet}</span>
        </div>
      </div>
    </div>

    <!-- 32-Bit Binary Breakdown Box -->
    <div class="binary-breakdown-section">
      <div class="section-badge-bar">
        <span>ตารางจำแนกบิต 32-Bit Binary Representation (แสดง Network, Subnet, Host Bits)</span>
        <div class="legend-badges">
          <span class="legend-item"><span class="legend-dot net-dot"></span> Network Bits (${data.netBits})</span>
          <span class="legend-item"><span class="legend-dot subnet-dot"></span> Subnet Bits (${data.subnetBits})</span>
          <span class="legend-item"><span class="legend-dot host-dot"></span> Host Bits (${data.hostBits})</span>
        </div>
      </div>
      <div class="grid-table-rows">
        ${renderBitGridRow('IP Address', data.ipBits, data.netBits, data.subnetBits, data.ip)}
        ${renderBitGridRow('Subnet Mask', data.maskBits, data.netBits, data.subnetBits, data.mask)}
        ${renderBitGridRow('Network Address', data.netBitsStr, data.netBits, data.subnetBits, data.netId)}
        ${renderBitGridRow('First Address', data.firstBitsStr, data.netBits, data.subnetBits, data.firstIp)}
        ${renderBitGridRow('Last Address', data.lastBitsStr, data.netBits, data.subnetBits, data.lastIp)}
        ${renderBitGridRow('Broadcast Address', data.bcastBitsStr, data.netBits, data.subnetBits, data.bcastIp)}
      </div>
    </div>

    <!-- Subnet Range Table (Bottom table matching photo) -->
    <div class="table-section">
      <div class="table-title">ตารางแจกแจง Subnet Address Table (ตามแบบฟอร์มการสอน)</div>
      <table class="styled-subnet-table">
        <thead>
          <tr>
            <th width="12%">Subnet</th>
            <th width="18%">Network Address</th>
            <th width="18%">First Host Address</th>
            <th width="18%">Last Host Address</th>
            <th width="18%">Broadcast Address</th>
            <th width="6%">/</th>
            <th width="10%">Numbers of Host</th>
          </tr>
        </thead>
        <tbody>
          ${data.tableRows.map((r, i) => `
            <tr class="${i % 2 === 1 ? 'alt-row' : ''}">
              <td class="font-bold">${r.subnet}</td>
              <td class="font-mono text-net">${r.net}</td>
              <td class="font-mono text-first">${r.first}</td>
              <td class="font-mono text-last">${r.last}</td>
              <td class="font-mono text-bcast">${r.bcast}</td>
              <td class="font-bold">/${data.prefix}</td>
              <td class="font-bold text-host">${r.hosts || data.hostsPerSubnet}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    ${data.analysisNote ? `
      <div class="analysis-box">
        <div class="analysis-title">💡 วิเคราะห์กระบวนการคิดและเทคนิค Magic Number:</div>
        <div class="analysis-content">${data.analysisNote}</div>
      </div>
    ` : ''}
  </div>
  `;
}

// Build all worksheet data models
const worksheetsData = [
  // --- QUIZ 1 ITEM 1 ---
  {
    quizTitle: 'Quiz 1 — ข้อ 1',
    problemTitle: 'IP: 192.168.15.72 | Subnet Mask: 255.255.255.128',
    ip: '192.168.15.72',
    prefix: 25,
    mask: '255.255.255.128',
    netBits: 24,
    subnetBits: 1,
    hostBits: 7,
    numSubnets: '2 Subnets',
    hostsPerSubnet: '126 เครื่อง (Total 128)',
    netId: '192.168.15.0',
    firstIp: '192.168.15.1',
    lastIp: '192.168.15.126',
    bcastIp: '192.168.15.127',
    ipBits: ipToBits('192.168.15.72'),
    maskBits: prefixToBits(25),
    netBitsStr: ipToBits('192.168.15.0'),
    firstBitsStr: ipToBits('192.168.15.1'),
    lastBitsStr: ipToBits('192.168.15.126'),
    bcastBitsStr: ipToBits('192.168.15.127'),
    tableRows: [
      { subnet: 'Subnet 0 (ตรงกับโจทย์)', net: '192.168.15.0', first: '192.168.15.1', last: '192.168.15.126', bcast: '192.168.15.127' },
      { subnet: 'Subnet 1', net: '192.168.15.128', first: '192.168.15.129', last: '192.168.15.254', bcast: '192.168.15.255' }
    ],
    analysisNote: 'Interesting Octet คือ Octet 4 (128) -> Magic Number = 256 - 128 = 128. โฮสต์ .72 อยู่ในช่วง 0 ถึง 127 จึงตอบ Network ID = 192.168.15.0 และ Broadcast = 192.168.15.127'
  },
  // --- QUIZ 1 ITEM 2 ---
  {
    quizTitle: 'Quiz 1 — ข้อ 2',
    problemTitle: 'IP: 172.16.20.35 | Subnet Mask: 255.255.255.224',
    ip: '172.16.20.35',
    prefix: 27,
    mask: '255.255.255.224',
    netBits: 24,
    subnetBits: 3,
    hostBits: 5,
    numSubnets: '8 Subnets',
    hostsPerSubnet: '30 เครื่อง (Total 32)',
    netId: '172.16.20.32',
    firstIp: '172.16.20.33',
    lastIp: '172.16.20.62',
    bcastIp: '172.16.20.63',
    ipBits: ipToBits('172.16.20.35'),
    maskBits: prefixToBits(27),
    netBitsStr: ipToBits('172.16.20.32'),
    firstBitsStr: ipToBits('172.16.20.33'),
    lastBitsStr: ipToBits('172.16.20.62'),
    bcastBitsStr: ipToBits('172.16.20.63'),
    tableRows: [
      { subnet: 'Subnet 0', net: '172.16.20.0', first: '172.16.20.1', last: '172.16.20.30', bcast: '172.16.20.31' },
      { subnet: 'Subnet 1 (ตรงกับโจทย์)', net: '172.16.20.32', first: '172.16.20.33', last: '172.16.20.62', bcast: '172.16.20.63' },
      { subnet: 'Subnet 2', net: '172.16.20.64', first: '172.16.20.65', last: '172.16.20.94', bcast: '172.16.20.95' },
      { subnet: 'Subnet 3', net: '172.16.20.96', first: '172.16.20.97', last: '172.16.20.126', bcast: '172.16.20.127' }
    ],
    analysisNote: 'Interesting Octet คือ Octet 4 (224) -> Magic Number = 256 - 224 = 32. เลข 35 อยู่ระหว่าง 32 ถึง 63 จึงอยู่ใน Subnet 1 (172.16.20.32/27)'
  },
  // --- QUIZ 1 ITEM 3 ---
  {
    quizTitle: 'Quiz 1 — ข้อ 3',
    problemTitle: 'IP: 10.0.50.200 | Subnet Mask: 255.255.254.0',
    ip: '10.0.50.200',
    prefix: 23,
    mask: '255.255.254.0',
    netBits: 16,
    subnetBits: 7,
    hostBits: 9,
    numSubnets: '128 Subnets (ใน Class B block)',
    hostsPerSubnet: '510 เครื่อง (Total 512)',
    netId: '10.0.50.0',
    firstIp: '10.0.50.1',
    lastIp: '10.0.51.254',
    bcastIp: '10.0.51.255',
    ipBits: ipToBits('10.0.50.200'),
    maskBits: prefixToBits(23),
    netBitsStr: ipToBits('10.0.50.0'),
    firstBitsStr: ipToBits('10.0.50.1'),
    lastBitsStr: ipToBits('10.0.51.254'),
    bcastBitsStr: ipToBits('10.0.51.255'),
    tableRows: [
      { subnet: 'Subnet ...', net: '10.0.48.0', first: '10.0.48.1', last: '10.0.49.254', bcast: '10.0.49.255' },
      { subnet: 'Subnet 25 (ตรงกับโจทย์)', net: '10.0.50.0', first: '10.0.50.1', last: '10.0.51.254', bcast: '10.0.51.255' },
      { subnet: 'Subnet 26', net: '10.0.52.0', first: '10.0.52.1', last: '10.0.53.254', bcast: '10.0.53.255' }
    ],
    analysisNote: 'Interesting Octet คือ Octet 3 (254) -> Magic Number = 256 - 254 = 2. เพิ่มทีละ 2 ใน Octet 3: 48, 50, 52... ช่วงของ .50 คือ 10.0.50.0 ถึง 10.0.51.255'
  },
  // --- QUIZ 1 ITEM 4 ---
  {
    quizTitle: 'Quiz 1 — ข้อ 4',
    problemTitle: '10.0.0.0/16 (Default Class B Mask on Class A Network)',
    ip: '10.0.0.0',
    prefix: 16,
    mask: '255.255.0.0',
    netBits: 8,
    subnetBits: 8,
    hostBits: 16,
    numSubnets: '256 Subnets',
    hostsPerSubnet: '65,534 เครื่อง (Total 65,536)',
    netId: '10.0.0.0',
    firstIp: '10.0.0.1',
    lastIp: '10.0.255.254',
    bcastIp: '10.0.255.255',
    ipBits: ipToBits('10.0.0.0'),
    maskBits: prefixToBits(16),
    netBitsStr: ipToBits('10.0.0.0'),
    firstBitsStr: ipToBits('10.0.0.1'),
    lastBitsStr: ipToBits('10.0.255.254'),
    bcastBitsStr: ipToBits('10.0.255.255'),
    tableRows: [
      { subnet: 'Subnet 1 (ตรงกับโจทย์)', net: '10.0.0.0', first: '10.0.0.1', last: '10.0.255.254', bcast: '10.0.255.255' },
      { subnet: 'Subnet 2', net: '10.1.0.0', first: '10.1.0.1', last: '10.1.255.254', bcast: '10.1.255.255' }
    ],
    analysisNote: 'Prefix /16 มี Host bits 16 บิต (Octet 3 และ 4) จึงครอบคลุมตั้งแต่ 10.0.0.0 ถึง 10.0.255.255'
  },
  // --- QUIZ 1 ITEM 5 ---
  {
    quizTitle: 'Quiz 1 — ข้อ 5',
    problemTitle: '172.16.0.0/20',
    ip: '172.16.0.0',
    prefix: 20,
    mask: '255.255.240.0',
    netBits: 16,
    subnetBits: 4,
    hostBits: 12,
    numSubnets: '16 Subnets',
    hostsPerSubnet: '4,094 เครื่อง (Total 4,096)',
    netId: '172.16.0.0',
    firstIp: '172.16.0.1',
    lastIp: '172.16.15.254',
    bcastIp: '172.16.15.255',
    ipBits: ipToBits('172.16.0.0'),
    maskBits: prefixToBits(20),
    netBitsStr: ipToBits('172.16.0.0'),
    firstBitsStr: ipToBits('172.16.0.1'),
    lastBitsStr: ipToBits('172.16.15.254'),
    bcastBitsStr: ipToBits('172.16.15.255'),
    tableRows: [
      { subnet: 'Subnet 1 (ตรงกับโจทย์)', net: '172.16.0.0', first: '172.16.0.1', last: '172.16.15.254', bcast: '172.16.15.255' },
      { subnet: 'Subnet 2', net: '172.16.16.0', first: '172.16.16.1', last: '172.16.31.254', bcast: '172.16.31.255' }
    ],
    analysisNote: 'Interesting Octet คือ Octet 3 (240) -> Magic Number = 256 - 240 = 16. ซับเน็ตแรกเริ่ม 172.16.0.0 สิ้นสุดที่ 172.16.15.255'
  },
  // --- QUIZ 1 ITEM 6 ---
  {
    quizTitle: 'Quiz 1 — ข้อ 6',
    problemTitle: '192.168.5.10/23',
    ip: '192.168.5.10',
    prefix: 23,
    mask: '255.255.254.0',
    netBits: 24, // Considered as Supernetting/CIDR from /24 or classless
    subnetBits: 0,
    hostBits: 9,
    numSubnets: '1 Subnet (CIDR Block)',
    hostsPerSubnet: '510 เครื่อง (Total 512)',
    netId: '192.168.4.0',
    firstIp: '192.168.4.1',
    lastIp: '192.168.5.254',
    bcastIp: '192.168.5.255',
    ipBits: ipToBits('192.168.5.10'),
    maskBits: prefixToBits(23),
    netBitsStr: ipToBits('192.168.4.0'),
    firstBitsStr: ipToBits('192.168.4.1'),
    lastBitsStr: ipToBits('192.168.5.254'),
    bcastBitsStr: ipToBits('192.168.5.255'),
    tableRows: [
      { subnet: 'Subnet Block (ตรงกับโจทย์)', net: '192.168.4.0', first: '192.168.4.1', last: '192.168.5.254', bcast: '192.168.5.255' }
    ],
    analysisNote: 'Interesting Octet คือ Octet 3 (254) -> Magic Number = 2. ก้าวเดิน Octet 3 คือ 0, 2, 4, 6... ค่า 5 ตกในช่วง [4..5] จึงได้ Network ID 192.168.4.0'
  },

  // --- QUIZ 2 QUESTION 1 ---
  {
    quizTitle: 'Quiz 2 — ข้อ 1',
    problemTitle: 'เครือข่าย 10.0.0.0/8 แบ่งให้กับ 8 แผนก',
    ip: '10.0.0.0',
    prefix: 11,
    mask: '255.224.0.0',
    netBits: 8,
    subnetBits: 3,
    hostBits: 21,
    numSubnets: '8 Subnets (2³ = 8 แผนก)',
    hostsPerSubnet: '2,097,150 เครื่อง/Subnet',
    netId: '10.0.0.0',
    firstIp: '10.0.0.1',
    lastIp: '10.31.255.254',
    bcastIp: '10.31.255.255',
    ipBits: ipToBits('10.0.0.0'),
    maskBits: prefixToBits(11),
    netBitsStr: ipToBits('10.0.0.0'),
    firstBitsStr: ipToBits('10.0.0.1'),
    lastBitsStr: ipToBits('10.31.255.254'),
    bcastBitsStr: ipToBits('10.31.255.255'),
    tableRows: [
      { subnet: 'แผนก 1', net: '10.0.0.0', first: '10.0.0.1', last: '10.31.255.254', bcast: '10.31.255.255' },
      { subnet: 'แผนก 2', net: '10.32.0.0', first: '10.32.0.1', last: '10.63.255.254', bcast: '10.63.255.255' },
      { subnet: 'แผนก 3', net: '10.64.0.0', first: '10.64.0.1', last: '10.95.255.254', bcast: '10.95.255.255' },
      { subnet: 'แผนก 4', net: '10.96.0.0', first: '10.96.0.1', last: '10.127.255.254', bcast: '10.127.255.255' },
      { subnet: 'แผนก 5', net: '10.128.0.0', first: '10.128.0.1', last: '10.159.255.254', bcast: '10.159.255.255' },
      { subnet: 'แผนก 6', net: '10.160.0.0', first: '10.160.0.1', last: '10.191.255.254', bcast: '10.191.255.255' },
      { subnet: 'แผนก 7', net: '10.192.0.0', first: '10.192.0.1', last: '10.223.255.254', bcast: '10.223.255.255' },
      { subnet: 'แผนก 8', net: '10.224.0.0', first: '10.224.0.1', last: '10.255.255.254', bcast: '10.255.255.255' }
    ],
    analysisNote: 'ต้องการ 8 แผนก -> 2ˢ ≥ 8 ได้ s = 3 บิต -> Prefix = 8 + 3 = /11. Mask ใน Octet 2 คือ 128+64+32 = 224 (255.224.0.0). Magic Number = 256 - 224 = 32 ใน Octet 2.'
  },

  // --- QUIZ 2 QUESTION 2 ---
  {
    quizTitle: 'Quiz 2 — ข้อ 2',
    problemTitle: 'เครือข่าย 10.0.0.0/8 แบ่ง 1,000 เครื่องต่อ Subnet (แสดง 4 Subnets แรก)',
    ip: '10.0.0.0',
    prefix: 22,
    mask: '255.255.252.0',
    netBits: 8,
    subnetBits: 14,
    hostBits: 10,
    numSubnets: '16,384 Subnets (แสดง 4 วงแรก)',
    hostsPerSubnet: '1,022 เครื่อง/Subnet (ตอบโจทย์ 1,000 เครื่อง)',
    netId: '10.0.0.0',
    firstIp: '10.0.0.1',
    lastIp: '10.0.3.254',
    bcastIp: '10.0.3.255',
    ipBits: ipToBits('10.0.0.0'),
    maskBits: prefixToBits(22),
    netBitsStr: ipToBits('10.0.0.0'),
    firstBitsStr: ipToBits('10.0.0.1'),
    lastBitsStr: ipToBits('10.0.3.254'),
    bcastBitsStr: ipToBits('10.0.3.255'),
    tableRows: [
      { subnet: 'Subnet 1', net: '10.0.0.0', first: '10.0.0.1', last: '10.0.3.254', bcast: '10.0.3.255' },
      { subnet: 'Subnet 2', net: '10.0.4.0', first: '10.0.4.1', last: '10.0.7.254', bcast: '10.0.7.255' },
      { subnet: 'Subnet 3', net: '10.0.8.0', first: '10.0.8.1', last: '10.0.11.254', bcast: '10.0.11.255' },
      { subnet: 'Subnet 4', net: '10.0.12.0', first: '10.0.12.1', last: '10.0.15.254', bcast: '10.0.15.255' }
    ],
    analysisNote: 'ต้องการ 1,000 เครื่อง -> 2ʰ - 2 ≥ 1000 ได้ h = 10 บิต (2¹⁰ - 2 = 1,022). Prefix = 32 - 10 = /22. Subnet Mask = 255.255.252.0. Magic Number = 256 - 252 = 4 ใน Octet 3.'
  }
];

// Complete HTML Template
const htmlTemplate = `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ใบงานเฉลย Subnetting & FLSM Chapter 04 (มาตรฐานทางการ)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --primary: #1E3A8A;
  --primary-light: #3B82F6;
  --primary-bg: #EFF6FF;
  --net-color: #1E40AF;
  --net-bg: #DBEAFE;
  --net-border: #93C5FD;
  --subnet-color: #92400E;
  --subnet-bg: #FEF3C7;
  --subnet-border: #FCD34D;
  --host-color: #166534;
  --host-bg: #DCFCE7;
  --host-border: #86EFAC;
  --text-main: #0F172A;
  --text-muted: #64748B;
  --border-card: #CBD5E1;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F1F5F9;
  color: var(--text-main);
  line-height: 1.5;
  padding: 24px;
}

.screen-navbar {
  max-width: 1080px;
  margin: 0 auto 24px auto;
  background: #FFFFFF;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 6px solid var(--primary);
}

.nav-title h2 { font-size: 1.25rem; color: var(--primary); font-weight: 700; }
.nav-title p { font-size: 0.875rem; color: var(--text-muted); }

.nav-buttons {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--primary);
  color: #FFFFFF;
  box-shadow: 0 2px 6px rgba(30,58,138,0.3);
}
.btn-primary:hover { background: #1E40AF; transform: translateY(-1px); }

.btn-secondary {
  background: #F8FAFC;
  color: #334155;
  border: 1px solid #CBD5E1;
}
.btn-secondary:hover { background: #E2E8F0; }

.main-container {
  max-width: 1080px;
  margin: 0 auto;
}

/* Worksheet Sheet Container (mimicking real paper worksheet) */
.worksheet-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 30px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.04);
  border: 1.5px solid #E2E8F0;
}

.card-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #E2E8F0;
  padding-bottom: 14px;
  margin-bottom: 18px;
}

.quiz-badge {
  background: var(--primary);
  color: #FFFFFF;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: 8px;
}

.problem-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1E293B;
}

.score-box {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748B;
  background: #F8FAFC;
  padding: 4px 12px;
  border-radius: 6px;
  border: 1px dashed #94A3B8;
}

/* Spec Form Grid (Matching top fields of photo) */
.spec-form-grid {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 14px 18px;
  margin-bottom: 20px;
}

.spec-item {
  font-size: 1.05rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.spec-label { font-weight: 600; color: #475569; }
.spec-val { font-family: 'JetBrains Mono', monospace; font-weight: 700; }
.highlight-blue { color: var(--net-color); font-size: 1.15rem; }
.highlight-purple { color: #6D28D9; font-size: 1.15rem; }
.spec-slash { font-weight: 700; color: #94A3B8; font-size: 1.15rem; }

.spec-row-bits, .spec-row-stats {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.spec-bit-col, .spec-stat-col {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
}

.spec-val-box {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  padding: 3px 10px;
  background: #FFFFFF;
  border: 1px solid #CBD5E1;
  border-radius: 5px;
}

.highlight-orange { color: #C2410C; border-color: #FDBA74; background: #FFF7ED; }
.highlight-green { color: #15803D; border-color: #86EFAC; background: #F0FDF4; }

/* 32-Bit Grid Section (Matching bit boxes in photo) */
.binary-breakdown-section {
  border: 1.5px solid #CBD5E1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.section-badge-bar {
  background: #F1F5F9;
  border-bottom: 1px solid #CBD5E1;
  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.legend-badges {
  display: flex;
  gap: 14px;
  font-size: 0.8rem;
}

.legend-item { display: flex; align-items: center; gap: 5px; }
.legend-dot { width: 10px; height: 10px; border-radius: 2px; }
.net-dot { background: var(--net-bg); border: 1px solid var(--net-border); }
.subnet-dot { background: var(--subnet-bg); border: 1px solid var(--subnet-border); }
.host-dot { background: var(--host-bg); border: 1px solid var(--host-border); }

.grid-table-rows {
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bit-row-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.bit-row-label {
  min-width: 170px;
  display: flex;
  flex-direction: column;
}

.label-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1E293B;
}

.label-dec {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: var(--primary);
  font-weight: 600;
}

.octets-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
}

.octet-box {
  display: flex;
  border: 1.5px solid #64748B;
  border-radius: 4px;
  overflow: hidden;
  background: #FFFFFF;
}

.octet-dot {
  font-weight: 900;
  color: #64748B;
  font-size: 1.2rem;
  user-select: none;
}

.bit-cell {
  width: 19px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  border-right: 1px solid #CBD5E1;
}

.bit-cell:last-child { border-right: none; }

.net-bit {
  background: var(--net-bg);
  color: var(--net-color);
}

.subnet-bit {
  background: var(--subnet-bg);
  color: var(--subnet-color);
}

.host-bit {
  background: #FFFFFF;
  color: #64748B;
}

/* Subnet Range Table */
.table-section {
  margin-top: 18px;
}

.table-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 8px;
}

table.styled-subnet-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  border: 1px solid #CBD5E1;
  border-radius: 6px;
  overflow: hidden;
}

table.styled-subnet-table th {
  background: var(--primary);
  color: #FFFFFF;
  font-weight: 700;
  text-align: center;
  padding: 8px 6px;
  border: 1px solid #1E3A8A;
}

table.styled-subnet-table td {
  padding: 7px 6px;
  border: 1px solid #E2E8F0;
  text-align: center;
}

.alt-row { background: #F8FAFC; }
.font-mono { font-family: 'JetBrains Mono', monospace; }
.font-bold { font-weight: 700; }
.text-net { color: var(--net-color); font-weight: 600; }
.text-first { color: #047857; }
.text-last { color: #B45309; }
.text-bcast { color: #B91C1C; font-weight: 600; }
.text-host { color: #1E3A8A; }

.analysis-box {
  margin-top: 16px;
  background: #EFF6FF;
  border-left: 4px solid var(--primary-light);
  padding: 10px 14px;
  border-radius: 0 6px 6px 0;
  font-size: 0.88rem;
}

.analysis-title {
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.analysis-content {
  color: #334155;
  line-height: 1.45;
}

/* Question 3 Deep Dive Comparison Block */
.q3-compare-block {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px 28px;
  margin-bottom: 30px;
  border: 2px solid #93C5FD;
  box-shadow: 0 4px 18px rgba(30,58,138,0.06);
}

.q3-header {
  border-bottom: 2px solid #DBEAFE;
  padding-bottom: 12px;
  margin-bottom: 18px;
}

.q3-header h3 {
  font-size: 1.3rem;
  color: var(--primary);
  font-weight: 700;
}

.class-card {
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  margin-bottom: 18px;
  overflow: hidden;
}

.class-card-header {
  padding: 10px 16px;
  background: #F8FAFC;
  border-bottom: 1px solid #CBD5E1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
}

.class-badge {
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.badge-a { background: #FEF2F2; color: #991B1B; border: 1px solid #FCA5A5; }
.badge-b { background: #FEFCE8; color: #854D0E; border: 1px solid #FDE047; }
.badge-c { background: #F0FDF4; color: #166534; border: 1px solid #86EFAC; }

.best-choice-box {
  background: #ECFDF5;
  border: 2px solid #10B981;
  border-radius: 8px;
  padding: 18px 22px;
  margin-top: 20px;
}

.best-choice-title {
  color: #065F46;
  font-size: 1.15rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.best-choice-list {
  padding-left: 24px;
  color: #047857;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Blank Template Section */
.blank-template-card {
  background: #FFFFFF;
  border: 2px dashed #94A3B8;
  border-radius: 12px;
  padding: 24px 28px;
  margin-top: 30px;
}

/* Print Styles for pristine A4 output */
@media print {
  body {
    background: #FFFFFF !important;
    padding: 0 !important;
  }
  .screen-navbar {
    display: none !important;
  }
  .worksheet-card, .q3-compare-block, .blank-template-card {
    box-shadow: none !important;
    border: 1.5px solid #000000 !important;
    padding: 16px !important;
    margin-bottom: 0 !important;
    page-break-after: always !important;
  }
  .bit-cell {
    width: 17px !important;
    height: 22px !important;
    font-size: 0.75rem !important;
  }
  .page-break {
    page-break-before: always !important;
  }
}
</style>
</head>
<body>

<div class="screen-navbar">
  <div class="nav-title">
    <h2>เอกสารเฉลยและใบงานคำนวณ Subnetting: Quiz 1 &amp; Quiz 2 (Chapter 04)</h2>
    <p>Computer Networks &amp; Internet Architecture | ตรงตามรูปแบบไฟล์ภาพใบงานอาจารย์ 100%</p>
  </div>
  <div class="nav-buttons">
    <button class="btn btn-primary" onclick="window.print()">🖨️ พิมพ์หรือบันทึกเป็น PDF (Print to PDF)</button>
    <a href="Subnetting_Solutions_Quiz1_Quiz2.xlsx" class="btn btn-secondary">📊 ดาวน์โหลด Excel (.xlsx)</a>
    <a href="Subnetting_Solutions_Quiz1_Quiz2.docx" class="btn btn-secondary">📄 ดาวน์โหลด Word (.docx)</a>
  </div>
</div>

<div class="main-container">

  <!-- ==================== QUIZ 1 SECTION ==================== -->
  <div style="text-align:center; margin: 20px 0 15px 0;">
    <h1 style="color: var(--primary); font-size: 1.8rem; font-weight: 800;">QUIZ 1: CIDR &amp; SUBNET ADDRESSING</h1>
    <p style="color: var(--text-muted); font-size: 1rem;">เขียน Network ID, First IP Addr., Last IP Addr., Broadcast IP Addr. ในรูปแบบตารางและจำแนกบิต</p>
  </div>

  ${worksheetsData.slice(0, 6).map(w => renderWorksheetCard(w)).join('')}

  <!-- ==================== QUIZ 2 SECTION ==================== -->
  <div style="text-align:center; margin: 40px 0 15px 0;" class="page-break">
    <h1 style="color: var(--primary); font-size: 1.8rem; font-weight: 800;">QUIZ 2: SUBNETTING CALCULATION</h1>
    <p style="color: var(--text-muted); font-size: 1rem;">คำนวณ Prefix, Subnet Mask, Hosts, Subnets และแจกแจงตาราง Subnet Address</p>
  </div>

  <!-- Quiz 2 Item 1 (8 Depts) -->
  ${renderWorksheetCard(worksheetsData[6])}

  <!-- Quiz 2 Item 2 (1000 Hosts) -->
  ${renderWorksheetCard(worksheetsData[7])}

  <!-- Quiz 2 Item 3 (Class A, B, C Comparison & Engineering Analysis) -->
  <div class="q3-compare-block page-break">
    <div class="q3-header">
      <span class="quiz-badge">Quiz 2 — ข้อ 3</span>
      <h3>การแบ่งเครือข่ายออกเป็น 4 Subnets ด้วย Class A, Class B, Class C พร้อมบทวิเคราะห์</h3>
      <p style="color:var(--text-muted); margin-top:4px;">กฎการยืมบิต: ต้องการ 4 Subnets $\\implies 2^s \\ge 4 \\implies s = 2$ บิตเสมอ!</p>
    </div>

    <!-- Class A -->
    <div class="class-card">
      <div class="class-card-header">
        <span>2.1) Class A: 10.0.0.0/8 &nbsp;➔&nbsp; Prefix ใหม่: <strong>/10</strong> &nbsp;|&nbsp; Subnet Mask: <strong>255.192.0.0</strong></span>
        <span class="class-badge badge-a">Hosts: 4,194,302 เครื่อง/Subnet</span>
      </div>
      <table class="styled-subnet-table">
        <thead>
          <tr>
            <th>Subnet</th><th>Network Address</th><th>First Host Address</th><th>Last Host Address</th><th>Broadcast Address</th><th>/</th><th>Numbers of Host</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="font-bold">Subnet 1</td><td class="font-mono text-net">10.0.0.0</td><td class="font-mono text-first">10.0.0.1</td><td class="font-mono text-last">10.63.255.254</td><td class="font-mono text-bcast">10.63.255.255</td><td class="font-bold">/10</td><td class="font-bold">4,194,302</td></tr>
          <tr class="alt-row"><td class="font-bold">Subnet 2</td><td class="font-mono text-net">10.64.0.0</td><td class="font-mono text-first">10.64.0.1</td><td class="font-mono text-last">10.127.255.254</td><td class="font-mono text-bcast">10.127.255.255</td><td class="font-bold">/10</td><td class="font-bold">4,194,302</td></tr>
          <tr><td class="font-bold">Subnet 3</td><td class="font-mono text-net">10.128.0.0</td><td class="font-mono text-first">10.128.0.1</td><td class="font-mono text-last">10.191.255.254</td><td class="font-mono text-bcast">10.191.255.255</td><td class="font-bold">/10</td><td class="font-bold">4,194,302</td></tr>
          <tr class="alt-row"><td class="font-bold">Subnet 4</td><td class="font-mono text-net">10.192.0.0</td><td class="font-mono text-first">10.192.0.1</td><td class="font-mono text-last">10.255.255.254</td><td class="font-mono text-bcast">10.255.255.255</td><td class="font-bold">/10</td><td class="font-bold">4,194,302</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Class B -->
    <div class="class-card">
      <div class="class-card-header">
        <span>2.2) Class B: 172.16.0.0/12 &nbsp;➔&nbsp; Prefix ใหม่: <strong>/14</strong> &nbsp;|&nbsp; Subnet Mask: <strong>255.252.0.0</strong></span>
        <span class="class-badge badge-b">Hosts: 262,142 เครื่อง/Subnet</span>
      </div>
      <table class="styled-subnet-table">
        <thead>
          <tr>
            <th>Subnet</th><th>Network Address</th><th>First Host Address</th><th>Last Host Address</th><th>Broadcast Address</th><th>/</th><th>Numbers of Host</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="font-bold">Subnet 1</td><td class="font-mono text-net">172.16.0.0</td><td class="font-mono text-first">172.16.0.1</td><td class="font-mono text-last">172.19.255.254</td><td class="font-mono text-bcast">172.19.255.255</td><td class="font-bold">/14</td><td class="font-bold">262,142</td></tr>
          <tr class="alt-row"><td class="font-bold">Subnet 2</td><td class="font-mono text-net">172.20.0.0</td><td class="font-mono text-first">172.20.0.1</td><td class="font-mono text-last">172.23.255.254</td><td class="font-mono text-bcast">172.23.255.255</td><td class="font-bold">/14</td><td class="font-bold">262,142</td></tr>
          <tr><td class="font-bold">Subnet 3</td><td class="font-mono text-net">172.24.0.0</td><td class="font-mono text-first">172.24.0.1</td><td class="font-mono text-last">172.27.255.254</td><td class="font-mono text-bcast">172.27.255.255</td><td class="font-bold">/14</td><td class="font-bold">262,142</td></tr>
          <tr class="alt-row"><td class="font-bold">Subnet 4</td><td class="font-mono text-net">172.28.0.0</td><td class="font-mono text-first">172.28.0.1</td><td class="font-mono text-last">172.31.255.254</td><td class="font-mono text-bcast">172.31.255.255</td><td class="font-bold">/14</td><td class="font-bold">262,142</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Class C -->
    <div class="class-card">
      <div class="class-card-header">
        <span>2.3) Class C: 192.168.0.0/16 &nbsp;➔&nbsp; Prefix ใหม่: <strong>/18</strong> &nbsp;|&nbsp; Subnet Mask: <strong>255.255.192.0</strong></span>
        <span class="class-badge badge-c">Hosts: 16,382 เครื่อง/Subnet ⭐ เหมาะสมที่สุด</span>
      </div>
      <table class="styled-subnet-table">
        <thead>
          <tr>
            <th>Subnet</th><th>Network Address</th><th>First Host Address</th><th>Last Host Address</th><th>Broadcast Address</th><th>/</th><th>Numbers of Host</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="font-bold">Subnet 1</td><td class="font-mono text-net">192.168.0.0</td><td class="font-mono text-first">192.168.0.1</td><td class="font-mono text-last">192.168.63.254</td><td class="font-mono text-bcast">192.168.63.255</td><td class="font-bold">/18</td><td class="font-bold">16,382</td></tr>
          <tr class="alt-row"><td class="font-bold">Subnet 2</td><td class="font-mono text-net">192.168.64.0</td><td class="font-mono text-first">192.168.64.1</td><td class="font-mono text-last">192.168.127.254</td><td class="font-mono text-bcast">192.168.127.255</td><td class="font-bold">/18</td><td class="font-bold">16,382</td></tr>
          <tr><td class="font-bold">Subnet 3</td><td class="font-mono text-net">192.168.128.0</td><td class="font-mono text-first">192.168.128.1</td><td class="font-mono text-last">192.168.191.254</td><td class="font-mono text-bcast">192.168.191.255</td><td class="font-bold">/18</td><td class="font-bold">16,382</td></tr>
          <tr class="alt-row"><td class="font-bold">Subnet 4</td><td class="font-mono text-net">192.168.192.0</td><td class="font-mono text-first">192.168.192.1</td><td class="font-mono text-last">192.168.255.254</td><td class="font-mono text-bcast">192.168.255.255</td><td class="font-bold">/18</td><td class="font-bold">16,382</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Engineering Justification -->
    <div class="best-choice-box">
      <div class="best-choice-title">
        <span>🏆 บทวิเคราะห์ความเหมาะสม: "ใช้แบ่งจากคลาสอะไรเหมาะสมที่สุด เพราะเหตุใด?"</span>
      </div>
      <div style="font-weight:700; color:#065F46; margin-bottom:8px;">
        คำตอบชัดเจน: การแบ่งจาก Class C (192.168.0.0/16) มีความเหมาะสมที่สุดสำหรับการใช้งานในองค์กรทั่วไป โดยมี 3 เหตุผลหลัก:
      </div>
      <ol class="best-choice-list">
        <li><strong>การป้องกันปัญหา Broadcast Storm และขนาดของ Broadcast Domain:</strong> เมื่ออุปกรณ์ส่งแพ็กเก็ต Broadcast (เช่น ARP Requests, DHCP Discovers) หากใช้ Class A ซึ่งมีโฮสต์ถึง 4.19 ล้านเครื่อง หรือ Class B ที่มี 2.6 แสนเครื่อง แพ็กเก็ตจะกระจายรบกวนทุกอุปกรณ์จนเกิดภาวะเครือข่ายล่ม แต่ Class C (/18 มี 16,382 เครื่อง หรือ /26 มี 62 เครื่อง) มีขนาด Broadcast Domain ที่สวิตช์และอุปกรณ์เครือข่ายสามารถรับมือได้อย่างมีเสถียรภาพสูงสุด</li>
        <li><strong>การประหยัดทรัพยากรและการลดความสูญเปล่าของหมายเลขไอพี (Address Conservation):</strong> องค์กรทั่วไปมีจำนวนคอมพิวเตอร์และอุปกรณ์ไม่เกินหลักพันเครื่อง การจัดสรรพื้นที่ระดับหลายล้านไอพีจะทำให้เกิด IP ว่างเปล่าที่ไม่ถูกใช้งานนับล้านหมายเลข ซึ่งขัดต่อหลักวิศวกรรมเครือข่ายที่มีประสิทธิภาพ</li>
        <li><strong>การบริหารจัดการและการรักษาความปลอดภัย (Security &amp; Network Management):</strong> ไอพีกลุ่ม 192.168.x.x เป็นช่วง Private IP ที่เป็นที่นิยมที่สุด ง่ายต่อการแบ่ง VLAN ย่อย, การเขียน Access Control List (ACL), นโยบายไฟร์วอลล์ (Firewall Rules) และตารางเราติ้ง (Routing Table)</li>
      </ol>
    </div>
  </div>

  <!-- Blank Template for Practice (Matching Teacher's sheet) -->
  <div class="blank-template-card page-break">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #94A3B8; padding-bottom:8px;">
      <h3 style="color:#334155; font-size:1.1rem; font-weight:700;">แบบฟอร์มใบงานจำลองสำหรับฝึกทำด้วยตนเอง (Blank Practice Sheet)</h3>
      <span style="font-size:0.85rem; color:#64748B;">ตรงตามไฟล์ภาพ 790846999_...n.jpg</span>
    </div>
    <div style="margin-bottom:14px; font-size:0.95rem;">
      IP Address _________________________ / _______ &nbsp;&nbsp;&nbsp;&nbsp; Network Bits _____ &nbsp;&nbsp; Subnet Bits _____ &nbsp;&nbsp; Host Bits _____<br>
      Number of Subnet ___________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Host per Subnet ___________________
    </div>
    
    <div style="display:flex; flex-direction:column; gap:10px;">
      ${['Subnet Mask', 'Network Address', 'First Address', 'Last Address', 'Broadcast Address'].map(t => `
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span style="min-width:160px; font-size:0.85rem; font-weight:600;">${t} ___________</span>
          <div class="octets-wrapper">
            ${[0,1,2,3].map(o => `
              <div class="octet-box">${'<span class="bit-cell">&nbsp;</span>'.repeat(8)}</div>
              ${o < 3 ? '<span class="octet-dot">•</span>' : ''}
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top:20px;">
      <table class="styled-subnet-table">
        <thead>
          <tr>
            <th>Subnet</th><th>Network Address</th><th>First Host Address</th><th>Last Host Address</th><th>Broadcast Address</th><th>/</th><th>Numbers of Host</th>
          </tr>
        </thead>
        <tbody>
          ${Array(8).fill(0).map((_, i) => `
            <tr>
              <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

</div>

</body>
</html>
`;

// Write HTML file to both destinations
const targetHtmlPath = path.join(targetOutputDir, 'Subnetting_Worksheet_Chapter04.html');
const mirrorHtmlPath = path.join(mirrorOutputDir, 'Subnetting_Worksheet_Chapter04.html');
fs.writeFileSync(targetHtmlPath, htmlTemplate, 'utf8');
fs.writeFileSync(mirrorHtmlPath, htmlTemplate, 'utf8');
console.log('>>> Created Printable Worksheet HTML at:', targetHtmlPath);

// ==============================================================================
// BUILD EXCEL SPREADSHEET (XML 2003 .xls & .xml)
// ==============================================================================
const excelXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
 <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
  <Title>เฉลยและใบงานคำนวณ Subnetting Chapter 04</Title>
  <Subject>Computer Networks and Internet Architecture</Subject>
  <Author>Academic Assistant</Author>
 </DocumentProperties>
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Borders/>
   <Font ss:FontName="TH Sarabun New" x:CharSet="222" ss:Size="14" ss:Color="#000000"/>
   <Interior/>
   <NumberFormat/>
   <Protection/>
  </Style>
  <Style ss:ID="HeaderTitle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="TH Sarabun New" x:CharSet="222" ss:Size="18" ss:Bold="1" ss:Color="#1E3A8A"/>
  </Style>
  <Style ss:ID="SubTitle">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Font ss:FontName="TH Sarabun New" x:CharSet="222" ss:Size="14" ss:Italic="1" ss:Color="#4B5563"/>
  </Style>
  <Style ss:ID="TableHeader">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#1E3A8A"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#1E3A8A"/>
   </Borders>
   <Font ss:FontName="TH Sarabun New" x:CharSet="222" ss:Size="14" ss:Bold="1" ss:Color="#FFFFFF"/>
   <Interior ss:Color="#1E3A8A" ss:Pattern="Solid"/>
  </Style>
  <Style ss:ID="TableCellCenter">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="TH Sarabun New" x:CharSet="222" ss:Size="14"/>
  </Style>
  <Style ss:ID="TableCellCenterBold">
   <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CBD5E1"/>
   </Borders>
   <Font ss:FontName="TH Sarabun New" x:CharSet="222" ss:Size="14" ss:Bold="1" ss:Color="#0F172A"/>
  </Style>
  <Style ss:ID="TableCellLeft">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E2E8F0"/>
   </Borders>
   <Font ss:FontName="TH Sarabun New" x:CharSet="222" ss:Size="14"/>
  </Style>
  <Style ss:ID="InfoBox">
   <Alignment ss:Horizontal="Left" ss:Vertical="Center" ss:WrapText="1"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#93C5FD"/>
    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="4" ss:Color="#2563EB"/>
    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#93C5FD"/>
    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#93C5FD"/>
   </Borders>
   <Font ss:FontName="TH Sarabun New" x:CharSet="222" ss:Size="13" ss:Color="#1E3A8A"/>
   <Interior ss:Color="#EFF6FF" ss:Pattern="Solid"/>
  </Style>
 </Styles>

 <!-- SHEET 1: MASTER SUMMARY -->
 <Worksheet ss:Name="Master_Summary">
  <Table ss:ExpandedColumnCount="8" ss:DefaultRowHeight="24">
   <Column ss:Width="50"/>
   <Column ss:Width="160"/>
   <Column ss:Width="140"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="110"/>
   <Column ss:Width="120"/>
   
   <Row ss:Height="32">
    <Cell ss:MergeAcross="7" ss:StyleID="HeaderTitle"><Data ss:Type="String">ตารางสรุปผลการคำนวณ Subnetting: Quiz 1 และ Quiz 2</Data></Cell>
   </Row>
   <Row ss:Height="22">
    <Cell ss:MergeAcross="7" ss:StyleID="SubTitle"><Data ss:Type="String">วิชา Computer Network and Internet — Chapter 04 Network Data Plane</Data></Cell>
   </Row>
   <Row ss:Height="15"/>

   <Row ss:Height="26">
    <Cell ss:MergeAcross="7" ss:StyleID="InfoBox"><Data ss:Type="String">หมวดที่ 1: เฉลยแบบฝึกหัด Quiz 1 — CIDR &amp; Subnet Addressing</Data></Cell>
   </Row>
   <Row ss:Height="28">
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">ข้อ</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">โจทย์ที่กำหนด</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Subnet Mask</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Prefix</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Network ID</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">First Usable IP</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Last Usable IP</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Broadcast IP</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="Number">1</Data></Cell>
    <Cell ss:StyleID="TableCellLeft"><Data ss:Type="String">192.168.15.72</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.255.255.128</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">/25</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">192.168.15.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">192.168.15.1</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">192.168.15.126</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">192.168.15.127</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="Number">2</Data></Cell>
    <Cell ss:StyleID="TableCellLeft"><Data ss:Type="String">172.16.20.35</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.255.255.224</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">/27</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">172.16.20.32</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">172.16.20.33</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">172.16.20.62</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">172.16.20.63</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="Number">3</Data></Cell>
    <Cell ss:StyleID="TableCellLeft"><Data ss:Type="String">10.0.50.200</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.255.254.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">/23</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">10.0.50.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">10.0.50.1</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">10.0.51.254</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">10.0.51.255</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="Number">4</Data></Cell>
    <Cell ss:StyleID="TableCellLeft"><Data ss:Type="String">10.0.0.0/16</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.255.0.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">/16</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">10.0.0.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">10.0.0.1</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">10.0.255.254</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">10.0.255.255</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="Number">5</Data></Cell>
    <Cell ss:StyleID="TableCellLeft"><Data ss:Type="String">172.16.0.0/20</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.255.240.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">/20</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">172.16.0.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">172.16.0.1</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">172.16.15.254</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">172.16.15.255</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="Number">6</Data></Cell>
    <Cell ss:StyleID="TableCellLeft"><Data ss:Type="String">192.168.5.10/23</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.255.254.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">/23</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">192.168.4.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">192.168.4.1</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">192.168.5.254</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">192.168.5.255</Data></Cell>
   </Row>

   <Row ss:Height="20"/>
   <Row ss:Height="26">
    <Cell ss:MergeAcross="7" ss:StyleID="InfoBox"><Data ss:Type="String">หมวดที่ 2: สรุปผล Quiz 2 — Subnetting Calculation</Data></Cell>
   </Row>
   <Row ss:Height="28">
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">ข้อที่</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableHeader"><Data ss:Type="String">โจทย์ที่กำหนด</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Prefix (/n)</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Subnet Mask</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">จำนวน Subnets</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableHeader"><Data ss:Type="String">จำนวน Hosts ใช้งานได้/Subnet</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">ข้อ 1</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellLeft"><Data ss:Type="String">10.0.0.0/8 แบ่ง 8 แผนก</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">/11</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.224.0.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">8 Subnets</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellCenterBold"><Data ss:Type="String">2,097,150 เครื่อง</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">ข้อ 2</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellLeft"><Data ss:Type="String">10.0.0.0/8 แบ่ง 1,000 เครื่อง/Subnet</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">/22</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.255.252.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">16,384 Subnets</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellCenterBold"><Data ss:Type="String">1,022 เครื่อง (แสดง 4 ซับเน็ตแรก)</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">ข้อ 3.1</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellLeft"><Data ss:Type="String">Class A: 10.0.0.0/8 แบ่ง 4 Subnets</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">/10</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.192.0.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">4 Subnets</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellCenterBold"><Data ss:Type="String">4,194,302 เครื่อง</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">ข้อ 3.2</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellLeft"><Data ss:Type="String">Class B: 172.16.0.0/12 แบ่ง 4 Subnets</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">/14</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.252.0.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">4 Subnets</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellCenterBold"><Data ss:Type="String">262,142 เครื่อง</Data></Cell>
   </Row>
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">ข้อ 3.3</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellLeft"><Data ss:Type="String">Class C: 192.168.0.0/16 แบ่ง 4 Subnets</Data></Cell>
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">/18</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">255.255.192.0</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">4 Subnets</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellCenterBold"><Data ss:Type="String">16,382 เครื่อง (เหมาะสมที่สุด)</Data></Cell>
   </Row>
  </Table>
 </Worksheet>

 <!-- SHEET 2: QUIZ 2 Q1 -->
 <Worksheet ss:Name="Quiz2_Q1_8Depts">
  <Table ss:ExpandedColumnCount="7" ss:DefaultRowHeight="24">
   <Column ss:Width="70"/>
   <Column ss:Width="140"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="60"/>
   <Column ss:Width="120"/>

   <Row ss:Height="30">
    <Cell ss:MergeAcross="6" ss:StyleID="HeaderTitle"><Data ss:Type="String">Quiz 2 ข้อ 1: บริษัทได้รับ 10.0.0.0/8 แบ่ง 8 แผนก</Data></Cell>
   </Row>
   <Row ss:Height="22">
    <Cell ss:MergeAcross="6" ss:StyleID="SubTitle"><Data ss:Type="String">Prefix: /11 | Subnet Mask: 255.224.0.0 | Hosts/Subnet: 2,097,150 | Magic Number: 32 (Octet 2)</Data></Cell>
   </Row>
   <Row ss:Height="15"/>

   <Row ss:Height="28">
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Subnet</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Network Address</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">First Host Address</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Last Host Address</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Broadcast Address</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">/</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Numbers of Host</Data></Cell>
   </Row>
   ${[
     ['แผนก 1', '10.0.0.0', '10.0.0.1', '10.31.255.254', '10.31.255.255'],
     ['แผนก 2', '10.32.0.0', '10.32.0.1', '10.63.255.254', '10.63.255.255'],
     ['แผนก 3', '10.64.0.0', '10.64.0.1', '10.95.255.254', '10.95.255.255'],
     ['แผนก 4', '10.96.0.0', '10.96.0.1', '10.127.255.254', '10.127.255.255'],
     ['แผนก 5', '10.128.0.0', '10.128.0.1', '10.159.255.254', '10.159.255.255'],
     ['แผนก 6', '10.160.0.0', '10.160.0.1', '10.191.255.254', '10.191.255.255'],
     ['แผนก 7', '10.192.0.0', '10.192.0.1', '10.223.255.254', '10.223.255.255'],
     ['แผนก 8', '10.224.0.0', '10.224.0.1', '10.255.255.254', '10.255.255.255']
   ].map(r => `
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">${r[0]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[1]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[2]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[3]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[4]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">/11</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">2,097,150</Data></Cell>
   </Row>`).join('')}
  </Table>
 </Worksheet>

 <!-- SHEET 3: QUIZ 2 Q2 -->
 <Worksheet ss:Name="Quiz2_Q2_1000Hosts">
  <Table ss:ExpandedColumnCount="7" ss:DefaultRowHeight="24">
   <Column ss:Width="70"/>
   <Column ss:Width="140"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="60"/>
   <Column ss:Width="120"/>

   <Row ss:Height="30">
    <Cell ss:MergeAcross="6" ss:StyleID="HeaderTitle"><Data ss:Type="String">Quiz 2 ข้อ 2: บริษัทได้รับ 10.0.0.0/8 แบ่ง 1,000 เครื่องต่อ Subnet</Data></Cell>
   </Row>
   <Row ss:Height="22">
    <Cell ss:MergeAcross="6" ss:StyleID="SubTitle"><Data ss:Type="String">Prefix: /22 | Subnet Mask: 255.255.252.0 | จำนวน 16,384 Subnets (แสดง 4 Subnets แรก)</Data></Cell>
   </Row>
   <Row ss:Height="15"/>

   <Row ss:Height="28">
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Subnet</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Network Address</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">First Host Address</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Last Host Address</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Broadcast Address</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">/</Data></Cell>
    <Cell ss:StyleID="TableHeader"><Data ss:Type="String">Numbers of Host</Data></Cell>
   </Row>
   ${[
     ['Subnet 1', '10.0.0.0', '10.0.0.1', '10.0.3.254', '10.0.3.255'],
     ['Subnet 2', '10.0.4.0', '10.0.4.1', '10.0.7.254', '10.0.7.255'],
     ['Subnet 3', '10.0.8.0', '10.0.8.1', '10.0.11.254', '10.0.11.255'],
     ['Subnet 4', '10.0.12.0', '10.0.12.1', '10.0.15.254', '10.0.15.255']
   ].map(r => `
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">${r[0]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[1]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[2]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[3]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[4]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">/22</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">1,022</Data></Cell>
   </Row>`).join('')}
  </Table>
 </Worksheet>

 <!-- SHEET 4: QUIZ 2 Q3 -->
 <Worksheet ss:Name="Quiz2_Q3_Compare">
  <Table ss:ExpandedColumnCount="8" ss:DefaultRowHeight="24">
   <Column ss:Width="60"/>
   <Column ss:Width="160"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="130"/>
   <Column ss:Width="60"/>
   <Column ss:Width="120"/>

   <Row ss:Height="30">
    <Cell ss:MergeAcross="7" ss:StyleID="HeaderTitle"><Data ss:Type="String">Quiz 2 ข้อ 3: การแบ่ง 4 Subnets ด้วย Class A, B, C และบทวิเคราะห์</Data></Cell>
   </Row>
   <Row ss:Height="15"/>

   <Row ss:Height="26">
    <Cell ss:MergeAcross="7" ss:StyleID="InfoBox"><Data ss:Type="String">Class A: 10.0.0.0/8 -> /10 (255.192.0.0) | Hosts/Subnet: 4,194,302 เครื่อง</Data></Cell>
   </Row>
   ${[
     ['1', '10.0.0.0', '10.0.0.1', '10.63.255.254', '10.63.255.255', '/10', '4,194,302'],
     ['2', '10.64.0.0', '10.64.0.1', '10.127.255.254', '10.127.255.255', '/10', '4,194,302'],
     ['3', '10.128.0.0', '10.128.0.1', '10.191.255.254', '10.191.255.255', '/10', '4,194,302'],
     ['4', '10.192.0.0', '10.192.0.1', '10.255.255.254', '10.255.255.255', '/10', '4,194,302']
   ].map(r => `
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">${r[0]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[1]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[2]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[3]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[4]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[5]}</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[6]}</Data></Cell>
   </Row>`).join('')}

   <Row ss:Height="15"/>
   <Row ss:Height="26">
    <Cell ss:MergeAcross="7" ss:StyleID="InfoBox"><Data ss:Type="String">Class B: 172.16.0.0/12 -> /14 (255.252.0.0) | Hosts/Subnet: 262,142 เครื่อง</Data></Cell>
   </Row>
   ${[
     ['1', '172.16.0.0', '172.16.0.1', '172.19.255.254', '172.19.255.255', '/14', '262,142'],
     ['2', '172.20.0.0', '172.20.0.1', '172.23.255.254', '172.23.255.255', '/14', '262,142'],
     ['3', '172.24.0.0', '172.24.0.1', '172.27.255.254', '172.27.255.255', '/14', '262,142'],
     ['4', '172.28.0.0', '172.28.0.1', '172.31.255.254', '172.31.255.255', '/14', '262,142']
   ].map(r => `
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">${r[0]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[1]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[2]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[3]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[4]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[5]}</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[6]}</Data></Cell>
   </Row>`).join('')}

   <Row ss:Height="15"/>
   <Row ss:Height="26">
    <Cell ss:MergeAcross="7" ss:StyleID="InfoBox"><Data ss:Type="String">Class C: 192.168.0.0/16 -> /18 (255.255.192.0) | Hosts/Subnet: 16,382 เครื่อง (เหมาะสมที่สุด)</Data></Cell>
   </Row>
   ${[
     ['1', '192.168.0.0', '192.168.0.1', '192.168.63.254', '192.168.63.255', '/18', '16,382'],
     ['2', '192.168.64.0', '192.168.64.1', '192.168.127.254', '192.168.127.255', '/18', '16,382'],
     ['3', '192.168.128.0', '192.168.128.1', '192.168.191.254', '192.168.191.255', '/18', '16,382'],
     ['4', '192.168.192.0', '192.168.192.1', '192.168.255.254', '192.168.255.255', '/18', '16,382']
   ].map(r => `
   <Row ss:Height="24">
    <Cell ss:StyleID="TableCellCenterBold"><Data ss:Type="String">${r[0]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[1]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[2]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[3]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[4]}</Data></Cell>
    <Cell ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[5]}</Data></Cell>
    <Cell ss:MergeAcross="1" ss:StyleID="TableCellCenter"><Data ss:Type="String">${r[6]}</Data></Cell>
   </Row>`).join('')}

   <Row ss:Height="20"/>
   <Row ss:Height="26">
    <Cell ss:MergeAcross="7" ss:StyleID="InfoBox"><Data ss:Type="String">บทวิเคราะห์: Class C เหมาะสมที่สุดเพราะ: 1) ป้องกัน Broadcast Storm 2) ไม่สูญเสีย IP ว่างเปล่านับล้าน 3) ง่ายต่อการจัด VLAN และ Security</Data></Cell>
   </Row>
  </Table>
 </Worksheet>
</Workbook>
`;

const targetExcelXmlPath = path.join(targetOutputDir, 'Subnetting_Solutions_Quiz1_Quiz2.xml');
const targetExcelXlsPath = path.join(targetOutputDir, 'Subnetting_Solutions_Quiz1_Quiz2.xls');
fs.writeFileSync(targetExcelXmlPath, excelXmlContent, 'utf8');
fs.writeFileSync(targetExcelXlsPath, excelXmlContent, 'utf8');
fs.writeFileSync(path.join(mirrorOutputDir, 'Subnetting_Solutions_Quiz1_Quiz2.xml'), excelXmlContent, 'utf8');
fs.writeFileSync(path.join(mirrorOutputDir, 'Subnetting_Solutions_Quiz1_Quiz2.xls'), excelXmlContent, 'utf8');
console.log('>>> Created Excel XML & XLS at:', targetExcelXlsPath);

// ==============================================================================
// BUILD WORD DOCUMENT (.doc)
// ==============================================================================
const wordHtmlDoc = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:w="urn:schemas-microsoft-com:office:word"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>รายงานเฉลยแบบฝึกหัด Subnetting Chapter 04</title>
<!--[if gte mso 9]>
<xml>
 <w:WordDocument>
  <w:View>Print</w:View>
  <w:Zoom>100</w:Zoom>
  <w:DoNotOptimizeForBrowser/>
 </w:WordDocument>
</xml>
<![endif]-->
<style>
@page { size: A4; margin: 20mm 20mm 20mm 20mm; }
body { font-family: 'TH Sarabun New', Tahoma, sans-serif; font-size: 16pt; line-height: 1.35; color: #111827; }
h1 { font-size: 22pt; color: #1E3A8A; text-align: center; margin-bottom: 4pt; font-weight: bold; }
h2 { font-size: 18pt; color: #1E40AF; border-bottom: 2pt solid #DBEAFE; padding-bottom: 4pt; margin-top: 18pt; margin-bottom: 8pt; }
h3 { font-size: 16pt; color: #1E3A8A; margin-top: 12pt; margin-bottom: 4pt; }
.header-card { border: 1.5pt solid #93C5FD; background-color: #EFF6FF; padding: 10pt 14pt; border-radius: 6pt; margin-bottom: 14pt; }
table.styled-table { width: 100%; border-collapse: collapse; margin-top: 8pt; margin-bottom: 14pt; font-size: 14pt; }
table.styled-table th { background-color: #1E3A8A; color: #FFFFFF; font-weight: bold; text-align: center; padding: 6pt 4pt; border: 1pt solid #1E3A8A; }
table.styled-table td { padding: 5pt 4pt; border: 1pt solid #CBD5E1; text-align: center; }
table.styled-table tr:nth-child(even) { background-color: #F8FAFC; }
.badge-blue { background-color: #DBEAFE; color: #1E40AF; padding: 2pt 6pt; font-weight: bold; }
.callout-analysis { border-left: 4pt solid #10B981; background-color: #F0FDF4; padding: 8pt 12pt; margin: 10pt 0; }
.page-break { page-break-before: always; }
</style>
</head>
<body>
<div class="header-card">
  <h1>รายงานเฉลยแบบฝึกหัด: Subnetting &amp; CIDR (Chapter 04)</h1>
  <p style="text-align:center; color:#4B5563; margin-bottom: 8pt;">วิชา Computer Networks and Internet Architecture</p>
</div>

<h2>Quiz 1: CIDR &amp; Subnet Addressing</h2>
<table class="styled-table">
  <thead>
    <tr>
      <th>ข้อ</th><th>โจทย์ที่กำหนด</th><th>Subnet Mask / Prefix</th><th>Network ID</th><th>First IP Addr.</th><th>Last IP Addr.</th><th>Broadcast IP</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1</td><td style="text-align:left;">192.168.15.72</td><td>255.255.255.128 (/25)</td><td><strong>192.168.15.0</strong></td><td>192.168.15.1</td><td>192.168.15.126</td><td>192.168.15.127</td></tr>
    <tr><td>2</td><td style="text-align:left;">172.16.20.35</td><td>255.255.255.224 (/27)</td><td><strong>172.16.20.32</strong></td><td>172.16.20.33</td><td>172.16.20.62</td><td>172.16.20.63</td></tr>
    <tr><td>3</td><td style="text-align:left;">10.0.50.200</td><td>255.255.254.0 (/23)</td><td><strong>10.0.50.0</strong></td><td>10.0.50.1</td><td>10.0.51.254</td><td>10.0.51.255</td></tr>
    <tr><td>4</td><td style="text-align:left;">10.0.0.0/16</td><td>255.255.0.0 (/16)</td><td><strong>10.0.0.0</strong></td><td>10.0.0.1</td><td>10.0.255.254</td><td>10.0.255.255</td></tr>
    <tr><td>5</td><td style="text-align:left;">172.16.0.0/20</td><td>255.255.240.0 (/20)</td><td><strong>172.16.0.0</strong></td><td>172.16.0.1</td><td>172.16.15.254</td><td>172.16.15.255</td></tr>
    <tr><td>6</td><td style="text-align:left;">192.168.5.10/23</td><td>255.255.254.0 (/23)</td><td><strong>192.168.4.0</strong></td><td>192.168.4.1</td><td>192.168.5.254</td><td>192.168.5.255</td></tr>
  </tbody>
</table>

<div class="page-break"></div>

<h2>Quiz 2: Subnetting Calculation</h2>
<h3>ข้อ 1: 10.0.0.0/8 แบ่ง 8 แผนก</h3>
<p><strong>Prefix:</strong> /11 | <strong>Subnet Mask:</strong> 255.224.0.0 | <strong>Hosts/Subnet:</strong> 2,097,150 เครื่อง</p>
<table class="styled-table">
  <thead><tr><th>Subnet</th><th>Network Address</th><th>First Host Address</th><th>Last Host Address</th><th>Broadcast Address</th><th>/</th><th>Numbers of Host</th></tr></thead>
  <tbody>
    <tr><td>แผนก 1</td><td>10.0.0.0</td><td>10.0.0.1</td><td>10.31.255.254</td><td>10.31.255.255</td><td>/11</td><td>2,097,150</td></tr>
    <tr><td>แผนก 2</td><td>10.32.0.0</td><td>10.32.0.1</td><td>10.63.255.254</td><td>10.63.255.255</td><td>/11</td><td>2,097,150</td></tr>
    <tr><td>แผนก 3</td><td>10.64.0.0</td><td>10.64.0.1</td><td>10.95.255.254</td><td>10.95.255.255</td><td>/11</td><td>2,097,150</td></tr>
    <tr><td>แผนก 4</td><td>10.96.0.0</td><td>10.96.0.1</td><td>10.127.255.254</td><td>10.127.255.255</td><td>/11</td><td>2,097,150</td></tr>
    <tr><td>แผนก 5</td><td>10.128.0.0</td><td>10.128.0.1</td><td>10.159.255.254</td><td>10.159.255.255</td><td>/11</td><td>2,097,150</td></tr>
    <tr><td>แผนก 6</td><td>10.160.0.0</td><td>10.160.0.1</td><td>10.191.255.254</td><td>10.191.255.255</td><td>/11</td><td>2,097,150</td></tr>
    <tr><td>แผนก 7</td><td>10.192.0.0</td><td>10.192.0.1</td><td>10.223.255.254</td><td>10.223.255.255</td><td>/11</td><td>2,097,150</td></tr>
    <tr><td>แผนก 8</td><td>10.224.0.0</td><td>10.224.0.1</td><td>10.255.255.254</td><td>10.255.255.255</td><td>/11</td><td>2,097,150</td></tr>
  </tbody>
</table>

<h3>ข้อ 2: 10.0.0.0/8 แบ่ง 1,000 เครื่องต่อ Subnet</h3>
<p><strong>Prefix:</strong> /22 | <strong>Subnet Mask:</strong> 255.255.252.0 | <strong>Hosts/Subnet:</strong> 1,022 เครื่อง | <strong>จำนวน Subnets:</strong> 16,384 Subnets</p>
<table class="styled-table">
  <thead><tr><th>Subnet</th><th>Network Address</th><th>First Host Address</th><th>Last Host Address</th><th>Broadcast Address</th><th>/</th><th>Numbers of Host</th></tr></thead>
  <tbody>
    <tr><td>Subnet 1</td><td>10.0.0.0</td><td>10.0.0.1</td><td>10.0.3.254</td><td>10.0.3.255</td><td>/22</td><td>1,022</td></tr>
    <tr><td>Subnet 2</td><td>10.0.4.0</td><td>10.0.4.1</td><td>10.0.7.254</td><td>10.0.7.255</td><td>/22</td><td>1,022</td></tr>
    <tr><td>Subnet 3</td><td>10.0.8.0</td><td>10.0.8.1</td><td>10.0.11.254</td><td>10.0.11.255</td><td>/22</td><td>1,022</td></tr>
    <tr><td>Subnet 4</td><td>10.0.12.0</td><td>10.0.12.1</td><td>10.0.15.254</td><td>10.0.15.255</td><td>/22</td><td>1,022</td></tr>
  </tbody>
</table>

<h3>ข้อ 3: การแบ่ง 4 Subnets และบทวิเคราะห์ความเหมาะสม</h3>
<p><strong>Class A (10.0.0.0/8):</strong> Prefix /10, Mask 255.192.0.0, Hosts: 4,194,302 เครื่อง/Subnet</p>
<p><strong>Class B (172.16.0.0/12):</strong> Prefix /14, Mask 255.252.0.0, Hosts: 262,142 เครื่อง/Subnet</p>
<p><strong>Class C (192.168.0.0/16):</strong> Prefix /18, Mask 255.255.192.0, Hosts: 16,382 เครื่อง/Subnet (เหมาะสมที่สุด ⭐)</p>

<div class="callout-analysis">
  <h4 style="color:#065F46; margin:0 0 6pt 0;">บทวิเคราะห์: ทำไม Class C จึงเหมาะสมที่สุด?</h4>
  <p>1. <strong>ป้องกัน Broadcast Storm:</strong> หากใช้ Class A หรือ B จะมีขนาดของ Broadcast Domain ที่ใหญ่เกินไป (นับแสนถึงนับล้านเครื่อง) ก่อให้เกิด Broadcast Storm ทำให้เครือข่ายหยุดชะงัก<br>
  2. <strong>ลดการสูญเสีย IP Address ว่างเปล่า:</strong> การใช้ Class C จัดสรรไอพีได้สมเหตุสมผล ไม่สูญเสียพื้นที่ไอพีโดยเปล่าประโยชน์นับล้านหมายเลข<br>
  3. <strong>การจัดการมาตรฐานสากล:</strong> เป็นช่วง Private IP ยอดนิยมที่อุปกรณ์สวิตช์และไฟร์วอลล์จัดการ VLAN และ Routing ได้อย่างคล่องตัวที่สุด</p>
</div>
</body>
</html>
`;

const targetWordPath = path.join(targetOutputDir, 'Subnetting_Solutions_Quiz1_Quiz2.doc');
fs.writeFileSync(targetWordPath, wordHtmlDoc, 'utf8');
fs.writeFileSync(path.join(mirrorOutputDir, 'Subnetting_Solutions_Quiz1_Quiz2.doc'), wordHtmlDoc, 'utf8');
console.log('>>> Created Word DOC at:', targetWordPath);

