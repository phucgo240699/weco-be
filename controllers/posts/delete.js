const { isEmpty, pick } = require('lodash')
const { startSession } = require('mongoose')
const {Posts} = require("../../models/posts")
const { StatusCode } = require('../../constants')
const { abortTransactions, commitTransactions } = require('../../middlewares/transactions')

const deletePost = async (req, res) => {
  try {
    let sessions = []
    
    // Transactions
    let session = await startSession();
    session.startTransaction();
    sessions.push(session);

    const deletedPost = await Posts.findOneAndUpdate({
      _id: req.params.id,
      isDeleted: false
    }, {
      idDeleted: true
    }, { session, new: true })

    console.log(deletedPost)
    console.log(req.user)

    if (!deletedPost.author_id.equals(req.user._id)) {
      await abortTransactions(sessions)
      return res.status(StatusCode.notAcceptable).json({
        errors: [messages.posts.isNotAuthor]
      })
    }

    await commitTransactions(sessions)
    res.status(StatusCode.success).json({
      data: deletedPost
    })
  } catch (error) {
    res.status(StatusCode.internalServerError).json({
      errors: [error.message]
    })
  }
}

module.exports = { deletePost }