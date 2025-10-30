const express = require('express')
const {registerUser,loginUser,verifyOTP, sendOtp} = require('../controllers/authControllers')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/verifyOTP').post(verifyOTP)
router.route('/sendOtp').post(sendOtp)
router.route('/login').post(loginUser)
module.exports = router