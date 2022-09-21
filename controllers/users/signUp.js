const bcrypt = require('bcryptjs')
const { startSession } = require('mongoose')
const Users = require("../../models/users")
const { handleSignUpBody } = require("./handleBody")
const { StatusCode } = require("../../constants/index");
const { commitTransactions, abortTransactions } = require('../../middlewares/transactions');
const messages = require('../../messages');

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
    const newDoc = await Users.create( [body], { session: session } )
    
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

    // Success
    await commitTransactions(sessions)
    return res.status(StatusCode.success).json({
      data: newDoc
    });
  } catch (error) {
    await abortTransactions(sessions)
    return res.status(StatusCode.internalServerError).json({
      errors: [error.message]
    });
  }
}

module.exports = { signUp }