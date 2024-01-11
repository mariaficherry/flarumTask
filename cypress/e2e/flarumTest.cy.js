describe('template spec', () => {

  beforeEach(() => {
    cy.loadTestDataFromJson();
    cy.visit('/')
  })

  it('testCase1', () => {
    const menuOptions = Cypress.env('menuOptions');
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    cy.get('.Header-logo').should('exist')

    cy.clickLink('.item-logIn > .Button > .Button-label:contains("Log In")')

    cy.loginViaUi(username, password)

    cy.clickLink(`.Button-label > .username:contains('${username}')`)

    const dropdownMenu = '.item-session > .ButtonGroup > .Dropdown-menu'

    menuOptions.forEach((dropdownMenu) => {
      cy.get(dropdownMenu).each(($element) => {
        cy.wrap($element).should('exist');
      })
    })

    cy.clickLink('.Button-label:contains("Profile")')

    cy.get('.UserCard-identity > .username').should('contain', username)

    cy.intercept('POST', 'api/users/42763').as('editBio')

    cy.clickLink('.UserBio-content')

    cy.typeInTextArea('qwerty' + Math.random() + '{enter}')

    cy.wait('@editBio').its('response.statusCode').should('eq', 200)

    cy.fixture('stubbedBioRequest.json').then((stubbedBio) => {
      cy.intercept('POST', 'api/users/42763', {
        data: stubbedBio.data
      }).as('stubbedBio')
    });

    cy.clickLink('.UserBio-content')

    cy.typeInTextArea('here I am{enter}')

    cy.get('.UserBio-content:contains("stubbed bio")').should('exist')
  })
})