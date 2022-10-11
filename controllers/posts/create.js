const { isEmpty, get } = require('lodash')
const messages = require('../../messages')
const {Posts} = require("../../models/posts")
const Users = require("../../models/users")
const { startSession } = require('mongoose')
const { StatusCode } = require('../../constants')
const { handleCreateBody } = require('./handleBody')
const { abortTransactions, commitTransactions } = require('../../middlewares/transactions')

const createPost = async (req, res) => {
  try {
    let sessions = []
    const { body, errors: bodyErrors } = handleCreateBody(req.body)
    const authorId = get(body, 'author._id')
    if (!isEmpty(bodyErrors)) {
      return res.status(StatusCode.notAcceptable).json({
        errors: bodyErrors
      })
    }
    if (!authorId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(StatusCode.notAcceptable).json({
        errors: [messages.posts.authorNotExist]
      })
    }

    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);

    const [newPost, author] = await Promise.all([
      Posts.create([body], { session: session }),
      Users.findById(authorId)
    ])
    
    if (!author) {
      await abortTransactions(sessions)
      return res.status(StatusCode.notAcceptable).json({
        errors: [messages.posts.authorNotExist]
      })
    }

    await commitTransactions(sessions)
    res.status(StatusCode.success).json({
      data: newPost
    })
  } catch (error) {
    res.status(StatusCode.internalServerError).json({
      errors: [error.message]
    })
  }
}

module.exports = { createPost }