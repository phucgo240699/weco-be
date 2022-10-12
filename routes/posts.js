const router = require('express').Router();
const { createPost } = require('../controllers/posts/create')
const { getAllPosts } = require('../controllers/posts/getAll')
const { getPost } = require('../controllers/posts/get')
const { updatePost } = require('../controllers/posts/update')
const { deletePost } = require('../controllers/posts/delete');
const { authenticateToken } = require('../middlewares/authenticationToken');
const { StatusCode } = require('../constants');
const messages = require('../messages');

router.post('/create', authenticateToken, createPost)
router.get('/getAll', getAllPosts)
router.get('/get/:id', getPost)
router.put('/update/:id', authenticateToken, updatePost)
router.delete('/delete/:id', authenticateToken, deletePost)

module.exports = router