const router = require('express').Router();
const { registerUser, loginUser, getUser } = require('../Controllers/authController')
const auth = require('../Midware/authentication')


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/user', auth, getUser)

module.exports = router;