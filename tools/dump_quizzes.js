const fs = require('fs');

function dumpQuizzes() {
  ['tools/ch1_full_dump.json', 'tools/ch2_full_dump.json', 'tools/ch3_full_dump.json'].forEach((f, idx) => {
    const data = JSON.parse(fs.readFileSync(f, 'utf8'));
    console.log(`\n================== QUIZZES IN ${f} ==================`);
    const script = data.scripts.join('\n');
    
    // Check for quizData or questions or cards
    const qMatches = script.match(/const\s+quizData\s*=\s*(\[[\s\S]*?\]);/g) || [];
    console.log('quizData matches count:', qMatches.length);
    qMatches.forEach(qm => {
      console.log('Snippet:', qm.slice(0, 500));
    });
    
    // Also look for quick checks or questions in HTML
    data.sections.forEach((sec, sidx) => {
      if (/quiz|question|check/i.test(sec.html)) {
        const text = sec.html.replace(/<style[\s\S]*?<\/style>/gi, '')
                             .replace(/<script[\s\S]*?<\/script>/gi, '')
                             .replace(/<[^>]+>/g, ' ')
                             .replace(/\s+/g, ' ')
                             .trim();
        console.log(`[Sec ${sidx+1} Quiz/Check]`, text.slice(0, 300));
      }
    });
  });
}
dumpQuizzes();
