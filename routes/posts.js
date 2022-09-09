const router = require('express').Router();
const { getAll } = require('../controllers/posts/getAll')

router.get('/getAll', getAll)

module.exports = router