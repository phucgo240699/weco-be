const router = require('express').Router()
const { signUp } = require("../controllers/users/signUp");
const { signIn } = require("../controllers/users/signIn");
const { activeAccount } = require("../controllers/users/activeAccount");
const { refreshToken } = require("../controllers/users/refreshToken");

router.post('/signUp', signUp);
router.post('/signIn', signIn);
router.post('/refreshToken', refreshToken)
router.post('/activeAccount', activeAccount)

module.exports = router