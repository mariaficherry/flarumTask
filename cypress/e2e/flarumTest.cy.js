import * as testData from '../fixtures/testData.json'
const { username, password, onlineStatus, randomTextInput, hereIamTextInput, stubbedTextInput } = testData
import * as stubbedBioText from '../fixtures/stubbedBioRequest.json'

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

    cy.interceptBioTextEdit()

    cy.clickBioField()

    cy.typeInTextArea(randomTextInput + Math.random() + '{enter}')

    cy.stubBioTextResponse(stubbedBioText.data)

    cy.clickBioField()

    cy.typeInTextArea(hereIamTextInput + '{enter}')

    cy.checkUserBioTextIsVisible(stubbedTextInput)
  })
})