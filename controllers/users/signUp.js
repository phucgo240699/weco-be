const bcrypt = require('bcryptjs')
const { startSession } = require('mongoose')
const Users = require("../../models/users")
const { handleSignUpBody } = require("./handleBody")
const { StatusCode } = require("../../constants/index");
const { commitTransactions, abortTransactions } = require('../../middlewares/transactions');
const messages = require('../../messages');
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

const signUp = async (req, res) => {
  let sessions = []
  try {
    // Handle data
    const { error, body} = handleSignUpBody(req.body) // for newDoc
    if (error) {
      return res.status(StatusCode.notAcceptable).json({
        errors: [error]
      })
    }

    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);

    // Hash password
    if (body.password != null) {
      body.password = await bcrypt.hashSync(body.password, 10);
    }

    // Access DB
    const newDoc = await Users.create([body], { session: session } )
    
    // Check duplicate
    const query = { 
      email: req.body.email,
      isDeleted: false
    }
    const oldDocs = await Users.find(query, null, {session})
    if (oldDocs.length > 1) {
      await abortTransactions(sessions)
      return res.status(StatusCode.notAcceptable).json({
        errors: [messages.authentication.signUp.existedEmail]
      })
    }
  
    // Send verification email link
    const emailVerificationCode = jwt.sign(
      {
        email: newDoc[0].email,
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
      to: body.email,
      subject: "Please confirm your account",
      html: `<h2>Email Confirmation</h1>
          <p>Hello ${newDoc[0].name}</p>
          <p>Thank you for subscribing the account. Please confirm your email by <a href=${process.env.BASE_URL}/users/emailConfirmation/${emailVerificationCode}> clicking here</a></p>
          </div>`,
    })

    // Success
    await commitTransactions(sessions)
    return res.status(StatusCode.success).json({
      data: {
        id: newDoc[0]._id,
        name: newDoc[0].name,
        email: newDoc[0].email,
        isEmailVerified: newDoc[0].isEmailVerified
      }
    });
  } catch (error) {
    await abortTransactions(sessions)
    return res.status(StatusCode.internalServerError).json({
      errors: [error.message]
    });
  }
}

module.exports = { signUp }