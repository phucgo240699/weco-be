const _ = require("lodash");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const messages = require("../../messages");
const { StatusCode } = require("../../constants");

const refreshToken = async (req, res) => {
  try {
    const refreshTokenParam = _.get(req.body, 'refreshToken');

    if (_.isNil(refreshTokenParam)) {
      return res.status(StatusCode.notAcceptable).json({
        errors: [messages.authentication.missingRefreshToken]
      })
    }

    // Verify refresh token
    const decoded = await jwt.verify(refreshTokenParam, process.env.REFRESH_TOKEN_KEY);
    
    const user = await mongoose.model("users").findOne({ _id: decoded.userId });
    
    if (_.isNil(user)) {
      return res.status(StatusCode.expiredRefreshToken).json({ errors: [messages.authentication.expiredRefreshToken] });
    }

    // Generate token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "1d" }
    );
    
    const data = {
      accessToken,
      refreshToken,
      id: user._id
    }
    return res.status(StatusCode.success).json({ data });
  } catch (error) {
    return res.status(StatusCode.expiredRefreshToken).json({
      errors: [error.message]
    });
  }

}

module.exports = { refreshToken }