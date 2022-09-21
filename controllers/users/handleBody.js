const messages = require("../../messages/index");
const { pick, isNil, get } = require("lodash")

const handleSignUpBody = (body) => {
  if (isNil(get(body, 'email'))) {
    return {
      error: messages.authentication.signUp.missingEmail
    }
  }
  if (isNil(get(body, 'password'))) {
    return {
      error: messages.authentication.signUp.missingPassword
    }
  }
  if (isNil(get(body, 'name'))) {
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
  if (isNil(get(body, 'email'))) {
    return {
      error: messages.authentication.signUp.missingEmail
    }
  }
  if (isNil(get(body, 'password'))) {
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