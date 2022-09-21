const StatusCode = {
  success: 200,
  notAcceptable: 406,
  expiredAccessToken: 401,
  expiredRefreshToken: 403,
  internalServerError: 500
}

module.exports = { StatusCode }