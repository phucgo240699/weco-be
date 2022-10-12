const { isNil } = require("lodash");
const {Posts} = require("../../models/posts")
const { StatusCode } = require("../../constants/index");
const messages = require("../../messages");

const getPost = async (req, res) => {
  try {
    if (isNil(req.params.id)) {
      return res.status(StatusCode.notAcceptable).json({
        errors: [messages.posts.notFoundDetail]
      })
    }
    const post = await Posts.findById(req.params.id)
    res.status(StatusCode.success).json({
        data: post
    })
  } catch (error) {
    res.status(StatusCode.internalServerError).json({
        error: error.message
    })
  }
}

module.exports = { getPost }