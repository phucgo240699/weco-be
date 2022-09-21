const messages = {
  authentication: {
    missingRefreshToken: 'messages.authentication.missingRefreshToken',
    expiredAccessToken: 'messages.authentication.expiredAccessToken',
    expiredRefreshToken: 'messages.authentication.expiredRefreshToken',
    signIn: {
      incorrectInfo: 'messages.authentication.signIn.incorrectInfo',
      hasNotVerifiedEmail: 'messages.authentication.signIn.hasNotVerifiedEmail'
    },
    signUp: {
      missingEmail: 'messages.authentication.signUp.missingEmail',
      missingPassword: 'messages.authentication.signUp.missingPassword',
      missingName: 'messages.authentication.signUp.missingName',
      existedEmail: 'messages.authentication.signUp.existedEmail'
    }
  }
}

module.exports = messages