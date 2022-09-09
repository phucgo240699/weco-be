const Posts = require("../../models/posts")

const getAll = async (req, res) => {
    try {
        const posts = await Posts.find()
        res.status(200).json({
            data: posts
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { getAll }