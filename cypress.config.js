const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,               // ✅ เปิด Studio
    defaultCommandTimeout: 5000,            // ✅ คำสั่งเช่น cy.get รอสูงสุด 5 วินาที
    pageLoadTimeout: 10000,                 // ✅ โหลดหน้าเว็บรอสูงสุด 10 วินาที
    video: false,                           // ❌ ไม่บันทึกวิดีโอ เพื่อประหยัดเวลา/พื้นที่
    screenshotOnRunFailure: false,           // ❌ ไม่ถ่ายภาพ
    setupNodeEvents(on, config) {
      // รองรับ future config/extension เช่น reporter หรือ plugins
      // ยังไม่ใส่อะไรในนี้ก็ไม่เป็นไร
    },
  },
})
