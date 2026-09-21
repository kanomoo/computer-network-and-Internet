function solveAndFormat(dividend, divisor, label) {
    let divArr = divisor.split('');
    let L = divisor.length;
    let curr = dividend.split('');
    let N = dividend.length;
    let quotient = [];
    
    let trace = [];
    trace.push({
        type: 'header',
        dividend: dividend,
        divisor: divisor
    });

    let work = [...curr];
    
    for (let i = 0; i <= N - L; i++) {
        if (work[i] === '1') {
            quotient.push('1');
            let sub = new Array(N).fill(' ');
            for (let j = 0; j < L; j++) sub[i + j] = divisor[j];
            
            let before = [...work];
            for (let j = 0; j < L; j++) {
                work[i + j] = (work[i + j] !== divisor[j]) ? '1' : '0';
            }
            trace.push({
                step: i,
                q: '1',
                sub: sub.join(''),
                after: work.join(''),
                before: before.join('')
            });
        } else {
            quotient.push('0');
            let sub = new Array(N).fill(' ');
            for (let j = 0; j < L; j++) sub[i + j] = '0';
            trace.push({
                step: i,
                q: '0',
                sub: sub.join(''),
                after: work.join(''),
                before: work.join('')
            });
        }
    }
    let remainder = work.slice(-(L - 1)).join('');
    return { quotient: quotient.join(''), remainder, trace };
}

// Format as ASCII division like in PDF
function printAsciiDivision(dividend, divisor, title) {
    let res = solveAndFormat(dividend, divisor);
    let q = res.quotient;
    let L = divisor.length;
    let N = dividend.length;
    
    console.log(`\n========================================`);
    console.log(`${title}`);
    console.log(`Dividend: ${dividend} | Divisor: ${divisor}`);
    console.log(`Quotient: ${q} | Remainder: ${res.remainder}`);
    console.log(`========================================\n`);

    let divStr = divisor.split('').join(' ');
    let dStr = dividend.split('').join(' ');
    let qStr = q.split('').join(' ');
    
    // Spaced out version
    let padDiv = divStr.length + 3; // "div ) "
    console.log(' '.repeat(padDiv) + qStr + '   <-- Quotient (ผลหาร)');
    console.log(' '.repeat(padDiv) + '-'.repeat(dStr.length));
    console.log(divStr + ' ) ' + dStr);

    let currWork = dividend.split('');
    for (let i = 0; i <= N - L; i++) {
        let isOne = (currWork[i] === '1');
        let subStr = isOne ? divStr : '0 '.repeat(L).trim();
        
        let leadSpaces = padDiv + (i * 2);
        console.log(' '.repeat(leadSpaces) + subStr + (isOne ? '   (XOR with Divisor)' : '   (XOR with 0000)'));
        console.log(' '.repeat(leadSpaces) + '-'.repeat(L * 2 - 1));
        
        // update currWork
        for (let j = 0; j < L; j++) {
            if (isOne) {
                currWork[i + j] = (currWork[i + j] !== divisor[j]) ? '1' : '0';
            }
        }
        
        // Print the result with next bit brought down if not last step
        if (i < N - L) {
            let nextSlice = currWork.slice(i + 1, i + 1 + L).join(' ');
            let nextSpaces = padDiv + ((i + 1) * 2);
            console.log(' '.repeat(nextSpaces) + nextSlice + (i + L < N ? `   (ดึงบิต '${dividend[i+L]}' ลงมา)` : ''));
        } else {
            let remSpaces = padDiv + ((N - L + 1) * 2);
            let remStr = currWork.slice(-(L - 1)).join(' ');
            console.log(' '.repeat(remSpaces) + remStr + `   <-- Remainder (เศษเหลือ = ${res.remainder})`);
        }
    }
}

printAsciiDivision('11001001000', '1001', 'โจทย์ข้อ 1: ฝั่งผู้ส่ง (Sender)');
printAsciiDivision('11001001011', '1001', 'โจทย์ข้อ 1: ฝั่งผู้รับ (Receiver)');
printAsciiDivision('1110010101000', '1101', 'โจทย์ข้อ 2: ฝั่งผู้ส่ง (Sender)');
printAsciiDivision('1110010101110', '1101', 'โจทย์ข้อ 2: ฝั่งผู้รับ (Receiver)');
printAsciiDivision('101010101000000', '100011', 'โจทย์ข้อ 3: ฝั่งผู้ส่ง (Sender)');
printAsciiDivision('101010101011001', '100011', 'โจทย์ข้อ 3: ฝั่งผู้รับ (Receiver)');
