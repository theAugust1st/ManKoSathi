const express = require('express')
const {registerUser,loginUser,verifyOTP} = require('../controllers/authControllers')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/verifyOTP').post(verifyOTP)
router.route('/login').post(loginUser)
module.exports = router