const fs = require('fs');

const apiUrl = 'https://script.google.com/macros/s/AKfycbzWprZ1TtH2Z4xgNdNkHfdQMoC_CCrM5mvI84L9dVZa8VA_PFYzQ83z6xz9B7r9A91-/exec';



// รับค่า sheetUrl และ sheetName จาก argument
const sheetUrl = process.argv[2];
const sheetName = process.argv[3];

if (!sheetUrl || !sheetName) {
    console.error('กรุณาระบุ sheetUrl และ sheetName เป็น argument เช่น:');
    console.error('node Upload/UploadSheet.js "sheetUrl" "sheetName"');
    process.exit(1);
}
// อ่านไฟล์ report.json
const reportRaw = fs.readFileSync(`./reports/${sheetName}.json`, 'utf-8');
const report = JSON.parse(reportRaw);

// ดึงเฉพาะ tests ใน suites ตัวแรกของ results ตัวแรก
const tests = report.results[0].suites[0].tests;

// สร้างอาเรย์ updates ตามรูปแบบที่ต้องการ
const updates = tests.map(test => {
    // title ตัวอย่าง "TC-001 - Login Pass" ให้แยกเอาแค่ "TC-001"
    const tc_id = test.title.split(' ')[0];
    // แปลง state เป็น Pass/Fail
    const result = test.state === 'passed' ? 'Pass' : 'Fail';
    return { tc_id, result };
});

const payload = {
    sheetUrl: sheetUrl,
    sheetName: sheetName,
    updates: updates,
};

fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
})
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error('เกิดข้อผิดพลาด:', err);
    });
