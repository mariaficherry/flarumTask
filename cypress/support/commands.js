import Selectors from "../support/selectors.js";

Cypress.Commands.add('checkLogoIsVisible', () => {
    cy.get(Selectors.flarumLogo).should('be.visible')
})

Cypress.Commands.add('clickLoginButton', () => {
    cy.get(Selectors.loginButton).click()
})

Cypress.Commands.add('clickUsernameButton', (username) => {
    cy.get(Selectors.getUsernameButtonSelector(username)).click()
})

Cypress.Commands.add('clickProfileButton', () => {
    cy.get(Selectors.profileButton).click()
})

Cypress.Commands.add('checkUserProfileMenuContainsUsername', (username) => {
    cy.get(Selectors.usernameCard).should('contain', username)
})

Cypress.Commands.add('checkUserStatus', (status) => {
    cy.get(Selectors.userStatus).should('contain', status)
})

Cypress.Commands.add('clickBioField', () => {
    cy.get(Selectors.userBioField).click()
})

Cypress.Commands.add('checkUserBioTextIsVisible', (text) => {
    cy.get(Selectors.getUserBioFieldWithText(text)).should('be.visible')
})

Cypress.Commands.add('checkMenuOptionsExist', () => {
    Selectors.menuOptions.forEach((option) => {
        cy.get(option).each(($element) => {
            cy.wrap($element).should('be.visible');
        });
    });
})

Cypress.Commands.add('loginViaUi', (username, password) => {
    cy.get(Selectors.usernameTextbox).type(username)
        .should('have.value', username)
    cy.get(Selectors.passwordTextbox).type(password)
    cy.get('form').submit()
})

Cypress.Commands.add('typeInTextArea', (text) => {
    cy.get('textarea')
        .clear()
        .type(text)
})