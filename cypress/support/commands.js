import Selectors from "../utils/selectors.js";
const selectors = new Selectors();

Cypress.Commands.add('checkLogoExists', () => {
    cy.get(Selectors.flarumLogo).should('exist')
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

Cypress.Commands.add('checkTextExists', (text) => {
    cy.get(Selectors.getUserBioFieldWithText(text)).should('exist')
})

Cypress.Commands.add('checkMenuOptionsExist', () => {
    Selectors.menuOptions.forEach((option) => {
        cy.get(option).each(($element) => {
            cy.wrap($element).should('be.visible');
        });
    });
})

Cypress.Commands.add('loginViaUi', (username, password) => {
    cy.get('.Form > :nth-child(1) > .FormControl').type(username)
    cy.wait(1000)
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
        Cypress.env('username', data.username);
        Cypress.env('password', data.password);
        Cypress.env('editBioEndpoint', data.editBioEndpoint);
        Cypress.env('onlineStatus', data.onlineStatus);
        Cypress.env('randomTextInput', data.randomTextInput);
        Cypress.env('hereIamTextInput', data.hereIamTextInput);
        Cypress.env('stubbedTextInput', data.stubbedTextInput);
    })
})