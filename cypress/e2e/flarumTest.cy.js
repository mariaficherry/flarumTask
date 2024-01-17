describe('Flarum User info editing', () => {

  beforeEach(() => {
    cy.loadCredentialsFromJson()
    cy.visit('/')
  })

  it('user bio info can be changed', () => {
    const username = Cypress.env('username')
    const password = Cypress.env('password')
    const editBioEndpoint = Cypress.env('editBioEndpoint')
    const onlineStatus = Cypress.env('onlineStatus')
    const randomTextInput = Cypress.env('randomTextInput')
    const hereIamTextInput = Cypress.env('hereIamTextInput')
    const stubbedTextInput = Cypress.env('stubbedTextInput')

    cy.checkLogoExists();

    cy.clickLoginButton();

    cy.loginViaUi(username, password)

    cy.clickUsernameButton(username)

    cy.checkMenuOptionsExist()

    cy.clickProfileButton()

    cy.checkUserProfileMenuContainsUsername(username)

    cy.checkUserStatus(onlineStatus)

    cy.intercept('POST', editBioEndpoint).as('editBio')

    cy.clickBioField()

    cy.typeInTextArea(randomTextInput + Math.random() + '{enter}')

    cy.wait('@editBio').its('response.statusCode').should('eq', 200)

    cy.fixture('stubbedBioRequest.json').then((stubbedBio) => {
      cy.intercept('POST', editBioEndpoint, (req) => {
        req.body.data = stubbedBio.data
        req.continue()
      }).as('stubbedBio')
    })

    cy.clickBioField()

    cy.typeInTextArea(hereIamTextInput + '{enter}')

    cy.checkTextExists(stubbedTextInput)
  })
})