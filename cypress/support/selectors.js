class Selectors {
  static menuOptions = [
    ".item-profile",
    ".item-settings",
    ".item-nightmode",
    ".item-logOut",
  ]
  static flarumLogo = '.Header-logo'
  static loginButton = '.item-logIn'
  static getUsernameButtonSelector(username) {
    return `.username:contains('${username}')`;
  }
  static profileButton = '.item-profile'
  static usernameCard = '.username'
  static userBioField = '.UserBio-content'
  static getUserBioFieldWithText(text) {
    return `.UserBio-content:contains('${text}')`;
  }
  static userStatus = '.UserCard-lastSeen'
  static usernameTextbox = '[name="identification"]'
  static passwordTextbox = '[name="password"]'
}
export default Selectors;