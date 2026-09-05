---
tags:
  - networking
  - chapter-05
  - reading-guide
  - control-plane
  - routing
  - dijkstra
created: 2026-09-05
updated: 2026-09-05
type: reading-guide
---

# 📖 Chapter 05: Network Layer — Control Plane (Study & Reading Guide)

> [!IMPORTANT]
> **เป้าหมายของบทนี้:** ทำความเข้าใจตรรกะการหาเส้นทาง (Routing Logic), ความแตกต่างระหว่าง Per-Router Control Plane vs SDN Centralized Control, อัลกอริทึม Link-State (Dijkstra's Algorithm) vs Distance-Vector (Bellman-Ford Algorithm, Count-to-Infinity Problem, Poisoned Reverse), โพรโทคอลเราติ้งภายใน AS (OSPF, RIP) และเราติ้งข้าม AS (BGP: eBGP/iBGP)

---

## 🚦 ลำดับการอ่านบทที่ 5 (Recommended Reading Flow)

1. **Step 1:** ศึกษาการทำงานของ Routing Algorithms ในภาพรวม
2. **Step 2:** ฝึกทำโจทย์ตาราง Trace ตารางเส้นทางด้วย **Dijkstra's Shortest Path Algorithm** ใน `Comprehensive_Exam_and_Calculations/Calculations and Trace Workbook.md` (Homework 4)
3. **Step 3:** ศึกษา BGP Path Vector และนโยบายการแลกเปลี่ยนเส้นทางระดับโลก
