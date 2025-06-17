describe('template spec', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('TC-001 - Login Pass', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://testoneid.inet.co.th/');
    cy.get('[href="https://testoneid.inet.co.th/portal_index"] > .text-right').click();
    cy.get('#username').clear();
    cy.get('#username').type('mama1000');
    cy.get('#password').type('mama1000');
    cy.get('#signIn').click();
    // ✅ ตรวจว่ามีคำว่า mama1000 อยู่ใน div นี้
    cy.get('.col-md-offset-2.col-md-10').should('contain', 'mama1000')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('TC-002 - Login Fail', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://testoneid.inet.co.th/');
    cy.get('[href="https://testoneid.inet.co.th/portal_index"] > .text-right').click();
    cy.get('#username').clear('m');
    cy.get('#username').type('mama1000');
    cy.get('#password').clear();
    cy.get('#password').type('mama1001');
    cy.get('#signIn').click();
    // ✅ ตรวจว่ามีคำว่า ชื่อผู้ใช้งานและรหัสผ่านไม่ตรงกับในระบบ อยู่ใน id นี้
    cy.get('#errorAlert').should('contain', 'ชื่อผู้ใช้งานและรหัสผ่านไม่ตรงกับในระบบ')
    /* ==== End Cypress Studio ==== */
  });
})