import * as testData from '../fixtures/testData.json'
const { username, password, editBioEndpoint, onlineStatus, randomTextInput, hereIamTextInput, stubbedTextInput } = testData

describe('Flarum User info editing', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('user bio info can be changed', () => {

    cy.checkLogoIsVisible()

    cy.clickLoginButton()

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

    cy.checkUserBioTextIsVisible(stubbedTextInput)
  })
})