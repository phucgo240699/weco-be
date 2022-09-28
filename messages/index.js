const messages = {
  authentication: {
    missingRefreshToken: 'authentication.missingRefreshToken',
    expiredAccessToken: 'authentication.expiredAccessToken',
    expiredRefreshToken: 'authentication.expiredRefreshToken',
    signIn: {
      incorrectInfo: 'authentication.signIn.incorrectInfo',
      hasNotVerifiedEmail: 'authentication.signIn.hasNotVerifiedEmail'
    },
    signUp: {
      missingEmail: 'authentication.signUp.missingEmail',
      missingPassword: 'authentication.signUp.missingPassword',
      missingName: 'authentication.signUp.missingName',
      existedEmail: 'authentication.signUp.existedEmail'
    }
  }
}

module.exports = messages