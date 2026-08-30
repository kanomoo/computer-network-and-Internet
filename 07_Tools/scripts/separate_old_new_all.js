const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('Created directory:', dir);
  }
}

function safeMove(src, dest) {
  if (fs.existsSync(src)) {
    ensureDir(path.dirname(dest));
    try {
      fs.renameSync(src, dest);
      console.log(`[MOVED] ${src} -> ${dest}`);
    } catch(e) {
      fs.copyFileSync(src, dest);
      fs.unlinkSync(src);
      console.log(`[COPIED&DEL] ${src} -> ${dest}`);
    }
  }
}

console.log('=== STARTING COMPLETE REPOSITORY OLD/NEW SEPARATION ===');

// 1. Chapter 1
ensureDir('02_Slides/Chapter_01_Introduction/Current_Year_Course');
ensureDir('02_Slides/Chapter_01_Introduction/Archive_Old_Curriculum');
safeMove('02_Slides/Chapter_01_Introduction/Chapter_1_Fundamental-Network_models_1-89.html', '02_Slides/Chapter_01_Introduction/Current_Year_Course/Chapter_1_Fundamental-Network_models_1-89.html');
safeMove('02_Slides/Chapter_01_Introduction/ch1.html', '02_Slides/Chapter_01_Introduction/Current_Year_Course/ch1.html');
safeMove('02_Slides/Chapter_01_Introduction/Chapter_1_Introduction.pdf', '02_Slides/Chapter_01_Introduction/Archive_Old_Curriculum/Chapter_1_Introduction_Old.pdf');
safeMove('02_Slides/Chapter_01_Introduction/Chapter_1_Introduction_TH.pdf', '02_Slides/Chapter_01_Introduction/Archive_Old_Curriculum/Chapter_1_Introduction_TH_Old.pdf');

// 2. Chapter 2
ensureDir('02_Slides/Chapter_02_Application_Layer/Current_Year_Course');
ensureDir('02_Slides/Chapter_02_Application_Layer/Archive_Old_Curriculum');
safeMove('02_Slides/Chapter_02_Application_Layer/Chapter_2_Application_Layer_1-119.html', '02_Slides/Chapter_02_Application_Layer/Current_Year_Course/Chapter_2_Application_Layer_1-119.html');
safeMove('02_Slides/Chapter_02_Application_Layer/ch2.html', '02_Slides/Chapter_02_Application_Layer/Current_Year_Course/ch2.html');
safeMove('02_Slides/Chapter_02_Application_Layer/brosing-msg.html', '02_Slides/Chapter_02_Application_Layer/Current_Year_Course/brosing-msg.html');
safeMove('02_Slides/Chapter_02_Application_Layer/email.html', '02_Slides/Chapter_02_Application_Layer/Current_Year_Course/email.html');
safeMove('02_Slides/Chapter_02_Application_Layer/http-req-frame73.png', '02_Slides/Chapter_02_Application_Layer/Current_Year_Course/http-req-frame73.png');
safeMove('02_Slides/Chapter_02_Application_Layer/Chapter_2_Application_Layer.pdf', '02_Slides/Chapter_02_Application_Layer/Archive_Old_Curriculum/Chapter_2_Application_Layer_Old.pdf');

// 3. Chapter 3
ensureDir('02_Slides/Chapter_03_Transport_Layer/Current_Year_Course_v9.0');
ensureDir('02_Slides/Chapter_03_Transport_Layer/Archive_Old_Curriculum');
safeMove('02_Slides/Chapter_03_Transport_Layer/Chapter_3_ Transport_Layer_1-154.html', '02_Slides/Chapter_03_Transport_Layer/Current_Year_Course_v9.0/Chapter_3_ Transport_Layer_1-154.html');
safeMove('02_Slides/Chapter_03_Transport_Layer/Chapter_3_v9.0_notes_slides_01-154.html', '02_Slides/Chapter_03_Transport_Layer/Current_Year_Course_v9.0/Chapter_3_v9.0_notes_slides_01-154.html');
safeMove('02_Slides/Chapter_03_Transport_Layer/Chapter_3_v9.0_st.pdf', '02_Slides/Chapter_03_Transport_Layer/Current_Year_Course_v9.0/Chapter_3_v9.0_st.pdf');
safeMove('02_Slides/Chapter_03_Transport_Layer/Chapter_3_v9.0_st_notes.html', '02_Slides/Chapter_03_Transport_Layer/Current_Year_Course_v9.0/Chapter_3_v9.0_st_notes.html');
safeMove('02_Slides/Chapter_03_Transport_Layer/2026_DATACOM_Layer4_Transport_layer.pdf', '02_Slides/Chapter_03_Transport_Layer/Current_Year_Course_v9.0/2026_DATACOM_Layer4_Transport_layer.pdf');
safeMove('02_Slides/Chapter_03_Transport_Layer/ch3.html', '02_Slides/Chapter_03_Transport_Layer/Current_Year_Course_v9.0/ch3.html');
safeMove('02_Slides/Chapter_03_Transport_Layer/tcpipmodel.html', '02_Slides/Chapter_03_Transport_Layer/Current_Year_Course_v9.0/tcpipmodel.html');
safeMove('02_Slides/Chapter_03_Transport_Layer/Chapter_3_Transport_Layer.pdf', '02_Slides/Chapter_03_Transport_Layer/Archive_Old_Curriculum/Chapter_3_Transport_Layer_Old.pdf');

// 4. Chapter 4
// Rename folders to standard naming
if (fs.existsSync('02_Slides/Chapter_04_Network_Data_Plane/Current_v9.0')) {
  safeMove('02_Slides/Chapter_04_Network_Data_Plane/Current_v9.0', '02_Slides/Chapter_04_Network_Data_Plane/Current_Year_Course_v9.0');
}
if (fs.existsSync('02_Slides/Chapter_04_Network_Data_Plane/Archive_Legacy')) {
  safeMove('02_Slides/Chapter_04_Network_Data_Plane/Archive_Legacy', '02_Slides/Chapter_04_Network_Data_Plane/Archive_Old_Curriculum');
}

// 5. Chapter 5, 6, 7 & CCNA
ensureDir('02_Slides/Chapter_05_Network_Control_Plane/Archive_Old_Curriculum');
safeMove('02_Slides/Chapter_05_Network_Control_Plane/Chapter_5_Network_Control_Plane.pdf', '02_Slides/Chapter_05_Network_Control_Plane/Archive_Old_Curriculum/Chapter_5_Network_Control_Plane_Old.pdf');

ensureDir('02_Slides/Chapter_06_Link_Layer/Archive_Old_Curriculum');
safeMove('02_Slides/Chapter_06_Link_Layer/Chapter_6_Link_Layer.pdf', '02_Slides/Chapter_06_Link_Layer/Archive_Old_Curriculum/Chapter_6_Link_Layer_Old.pdf');

ensureDir('02_Slides/Chapter_07_Wireless/Archive_Old_Curriculum');
safeMove('02_Slides/Chapter_07_Wireless/Chapter_7_Wireless.pdf', '02_Slides/Chapter_07_Wireless/Archive_Old_Curriculum/Chapter_7_Wireless_Old.pdf');

ensureDir('02_Slides/CCNA_Special_Topics/CCNA_Practice_Slides');
safeMove('02_Slides/CCNA_Special_Topics/CCNA_ITN_Chp7 IP Address.pptx', '02_Slides/CCNA_Special_Topics/CCNA_Practice_Slides/CCNA_ITN_Chp7 IP Address.pptx');
safeMove('02_Slides/CCNA_Special_Topics/CCNA_ITN_Chp8 Subnet.pptx', '02_Slides/CCNA_Special_Topics/CCNA_Practice_Slides/CCNA_ITN_Chp8 Subnet.pptx');

// 6. Homework separation
ensureDir('03_Homework/Current_Year_Assignments');
ensureDir('03_Homework/Archive_Old_Assignments');
safeMove('03_Homework/Assignments_New.pptx', '03_Homework/Current_Year_Assignments/Assignments_2026.pptx');
safeMove('03_Homework/Homework1.docx', '03_Homework/Current_Year_Assignments/Homework1.docx');
safeMove('03_Homework/Homework2.docx', '03_Homework/Current_Year_Assignments/Homework2.docx');
safeMove('03_Homework/Homework3.docx', '03_Homework/Current_Year_Assignments/Homework3.docx');
safeMove('03_Homework/Homework4.docx', '03_Homework/Current_Year_Assignments/Homework4.docx');
safeMove('03_Homework/Homework5.docx', '03_Homework/Current_Year_Assignments/Homework5.docx');
safeMove('03_Homework/Homework5Answer.pdf', '03_Homework/Current_Year_Assignments/Homework5Answer.pdf');
safeMove('03_Homework/work', '03_Homework/Current_Year_Assignments/work');
safeMove('03_Homework/Assignments.pptx', '03_Homework/Archive_Old_Assignments/Assignments_Old.pptx');

// 7. Quizzes separation
ensureDir('04_Quizzes_and_Exams/Current_Year_Quizzes');
safeMove('04_Quizzes_and_Exams/Quiz.md', '04_Quizzes_and_Exams/Current_Year_Quizzes/Quiz_Chapter3_2026.md');
safeMove('04_Quizzes_and_Exams/exam.md', '04_Quizzes_and_Exams/Current_Year_Quizzes/Exam_Review_2026.md');
safeMove('04_Quizzes_and_Exams/Screenshots', '04_Quizzes_and_Exams/Current_Year_Quizzes/Screenshots_2026');

// 8. 05_Wiki separation
ensureDir('05_Wiki/Archive_Old_Curriculum_Notes');
if (fs.existsSync('05_Wiki/Archive')) {
  fs.readdirSync('05_Wiki/Archive').forEach(f => {
    safeMove(path.join('05_Wiki/Archive', f), path.join('05_Wiki/Archive_Old_Curriculum_Notes', f));
  });
  try { fs.rmdirSync('05_Wiki/Archive'); } catch(e) {}
}

console.log('=== SEPARATION COMPLETED SUCCESSFULLY ===');
