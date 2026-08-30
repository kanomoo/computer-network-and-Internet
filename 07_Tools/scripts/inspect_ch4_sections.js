const fs = require('fs');

const path = require('path');
const slides = require(path.join(__dirname, 'ch4_extracted_slides.json'));

console.log(`Loaded ${slides.length} slides.`);

// Print summary of key sections
const sections = [
  { name: '1. Overview & Service Model (Slides 1-13)', start: 1, end: 13 },
  { name: '2. Inside a Router (Slides 14-40)', start: 14, end: 40 },
  { name: '3. IP Protocol, Addressing, Subnets & DHCP (Slides 41-63)', start: 41, end: 63 },
  { name: '4. NAT: Network Address Translation (Slides 64-68)', start: 64, end: 68 },
  { name: '5. IPv6 Architecture & Transition (Slides 69-76)', start: 69, end: 76 },
  { name: '6. Generalized Forwarding & OpenFlow / SDN (Slides 77-87)', start: 77, end: 87 },
  { name: '7. Middleboxes (Slides 88-90)', start: 88, end: 90 },
  { name: '8. Internet Architecture & Design Principles (Slides 91-98)', start: 91, end: 98 },
  { name: '9. Additional Deep Dives: Fragmentation & DHCP Trace (Slides 99-102)', start: 99, end: 102 }
];

sections.forEach(sec => {
  console.log(`\n=== ${sec.name} ===`);
  for (let i = sec.start; i <= sec.end; i++) {
    const s = slides.find(x => x.num === i);
    if (s) {
      console.log(`  Slide ${String(i).padStart(3, '0')}: ${s.title} (${s.cleanFull.length} chars)`);
    }
  }
});
