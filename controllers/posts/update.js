const { isEmpty, pick } = require('lodash')
const {Posts} = require("../../models/posts")
const { startSession } = require('mongoose')
const { StatusCode } = require('../../constants')
const { handleUpdateBody } = require('./handleBody')
const { abortTransactions, commitTransactions } = require('../../middlewares/transactions')
const messages = require('../../messages')

const updatePost = async (req, res) => {
  try {
    let sessions = []
    const { body } = handleUpdateBody(req.body)

    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);

    const [oldPost, newPost] = await Promise.all([
      Posts.findOne({
        _id: req.params.id,
        isDeleted: false
      }),
      Posts.findOneAndUpdate({
        _id: req.params.id,
        isDeleted: false
      }, body, { session, new: true })
    ])

    if (!oldPost.author._id.equals(req.user._id)) {
      await abortTransactions(sessions)
      return res.status(StatusCode.notAcceptable).json({
        errors: [messages.posts.isNotAuthor]
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

module.exports = { updatePost }