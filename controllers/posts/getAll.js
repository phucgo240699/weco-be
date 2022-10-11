const {Posts} = require("../../models/posts")
const { StatusCode } = require("../../constants/index");

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find()
        .select('title thumbnail author')
        res.status(StatusCode.success).json({
            data: posts
        })
    } catch (error) {
        res.status(StatusCode.internalServerError).json({
            error: error.message
        })
    }
}

module.exports = { getAllPosts }