const Posts = require("../../models/posts")
const { StatusCode } = require("../../constants/index");

const getAll = async (req, res) => {
    try {
        const posts = await Posts.find()
        res.status(StatusCode.success).json({
            data: posts
        })
    } catch (error) {
        res.status(StatusCode.internalServerError).json({
            error: error.message
        })
    }
}

module.exports = { getAll }