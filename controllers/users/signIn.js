const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../../models/users");
const messages = require("../../messages/index");
const { StatusCode } = require("../../constants/index");
const { handleSignInBody } = require("./handleBody");

const signIn = async (req, res) => {
  try {
    const { error: bodyError, body } = handleSignInBody(req.body)
    if (bodyError) {
      return res.status(StatusCode.notAcceptable).json({ errors: [bodyError] })
    }

    // Check username is exist
    const user = await Users.findOne({ email: body.email , isDeleted: false }).select(
      "password _id isEmailVerified"
    );
    if (user == null) {
      return res.status(StatusCode.notAcceptable).json({ errors: [messages.authentication.signIn.incorrectInfo] });
    }
    
    // Compare password of user above
    const isLogin = await bcrypt.compareSync(body.password, user.password);
    if (!isLogin) {
      return res.status(StatusCode.notAcceptable).json({ errors: [messages.authentication.signIn.incorrectInfo] });
    }

    // Check if email was verified
    if (!user.isEmailVerified) {
      return res.status(StatusCode.notAcceptable).json({ errors: [messages.authentication.signIn.hasNotVerifiedEmail] })
    }
    
    // Generate token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "10000ms" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_KEY,
      { expiresIn: "1h" }
    );
    
    const data = {
      accessToken,
      refreshToken,
      id: user._id
    }
    return res.status(StatusCode.success).json({ data });
  } catch (error) {
    return res.status(StatusCode.internalServerError).json({
      errors: [error.message]
    });
  }
}

module.exports = { signIn }