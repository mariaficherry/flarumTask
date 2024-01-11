Cypress.Commands.add('clickLink', (selector) => {
    cy.get(selector).click()
})

Cypress.Commands.add('loginViaUi', (username, password) => {
    cy.get('.Form > :nth-child(1) > .FormControl').type(username)
        .get('.Form > :nth-child(1) > .FormControl')
        .invoke('val')
        .should('eq', username)
    cy.get(':nth-child(2) > .FormControl').type(password)
    cy.get('form').submit()
})

Cypress.Commands.add('typeInTextArea', (text) => {
    cy.get('textarea')
        .clear()
        .type(text)
})

Cypress.Commands.add('loadTestDataFromJson', () => {
    cy.fixture('testData.json').then((data) => {
      Cypress.env('menuOptions', data.menuOptions);
      Cypress.env('username', data.username);
      Cypress.env('password', data.password);
    })
  })