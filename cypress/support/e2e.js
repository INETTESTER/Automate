// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// เพิ่มโค้ดนี้ลงไปเลยด้านล่างไฟล์
Cypress.on('uncaught:exception', (err, runnable) => {
  if (
    err.message.includes('scrollspy is not a function') ||
    err.message.includes('metisMenu is not a function')
  ) {
    return false; // บอก Cypress ว่าไม่ต้อง fail test นี้
  }
  // ถ้า error อื่น ให้ fail ตามปกติ
  return true;
})
