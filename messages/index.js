const messages = {
  authentication: {
    missingRefreshToken: 'authentication.missingRefreshToken',
    expiredAccessToken: 'authentication.expiredAccessToken',
    expiredRefreshToken: 'authentication.expiredRefreshToken',
    verificationEmailLinkExpired: 'authentication.verificationEmailLinkExpired',
    signIn: {
      incorrectInfo: 'authentication.signIn.incorrectInfo',
      hasNotVerifiedEmail: 'authentication.signIn.hasNotVerifiedEmail',
      activeAccountFail: 'authentication.signIn.activeAccountFail'
    },
    signUp: {
      missingEmail: 'authentication.signUp.missingEmail',
      missingPassword: 'authentication.signUp.missingPassword',
      missingName: 'authentication.signUp.missingName',
      existedEmail: 'authentication.signUp.existedEmail',
      verifyEmailFail: 'authentication.signUp.verifyEmailFail'
    }
  }
}

module.exports = messages