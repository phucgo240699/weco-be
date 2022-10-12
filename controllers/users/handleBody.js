const messages = require("../../messages/index");
const { pick, get } = require("lodash")

const handleSignUpBody = (body) => {
  if (!(get(body, 'email'))) {
    return {
      error: messages.authentication.signUp.missingEmail
    }
  }
  if (!(get(body, 'password'))) {
    return {
      error: messages.authentication.signUp.missingPassword
    }
  }
  if (!(get(body, 'name'))) {
    return {
      error: messages.authentication.signUp.missingName
    }
  }
  return {
    error: null,
    body: {
      ...pick(body,
        "email",
        "password",
        "name")
    }
  }
}

const handleSignInBody = (body) => {
  if (!(get(body, 'email'))) {
    return {
      error: messages.authentication.signUp.missingEmail
    }
  }
  if (!(get(body, 'password'))) {
    return {
      error: messages.authentication.signUp.missingPassword
    }
  }
  return {
    error: null,
    body: {
      ...pick(body,
        "email",
        "password")
    }
  }
}

module.exports = { handleSignInBody, handleSignUpBody }