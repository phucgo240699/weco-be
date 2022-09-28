const { isNil } = require("lodash")
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");
const { StatusCode } = require("../../constants");
const messages = require("../../messages");

const activeAccount = async (req, res) => {
  try {
    const { email } = req.body
    const user = await mongoose.model("users").findOne({ email, isDeleted: false })

    if (isNil(user)) {
      return res.status(StatusCode.notAcceptable).json({
        errors: [messages.authentication.signIn.activeAccountFail]
      })
    }
    
    // Send verification email link
    const emailVerificationCode = jwt.sign(
      {
        email,
      },
      process.env.EMAIL_ENCODE_KEY,
      {
        expiresIn: '7d'
      }
    )
    const transport = nodemailer.createTransport({
      service: "Gmail",
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Please confirm your account",
      html: `<h2>Email Confirmation</h1>
          <p>Hello ${user.name}</p>
          <p>Thank you for subscribing the account. Please confirm your email by <a href=${process.env.BASE_URL}/users/emailConfirmation/${emailVerificationCode}> clicking here</a></p>
          </div>`,
    })
    res.status(StatusCode)
  } catch (error) {
    return res.status(StatusCode.internalServerError).json({
      errors: [error.message]
    });
  }
}

module.exports = { activeAccount }