const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const messages = require("../messages");
const { StatusCode } = require("../constants");

const authenticateToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]
    const decoded = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
    const user = await mongoose.model("users").findOne({ _id: decoded.userId, isDeleted: false });
    if (user) {
      if (!user.isEmailVerified) {
        return res.status(StatusCode.notAcceptable).json({
          errors: [messages.authentication.signIn.hasNotVerifiedEmail]
        })
      } 
      req.user = user;
    } else {
      return res.status(StatusCode.expiredAccessToken).json({ errors: [messages.authentication.expiredAccessToken] });
    }
    next();
  } catch (error) {
    res.status(StatusCode.expiredAccessToken).json({
      errors: [error.message]
    })
  }
};

module.exports = { authenticateToken };
