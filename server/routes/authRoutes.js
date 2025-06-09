const express = require('express')
const {registerUser,loginUser} = require('../controllers/authControllers')
const router = express.Router()

router.route('/register').post(registerUser).get((req,res)=>{
    console.log("i'm response")
})
router.route('/login').post(loginUser)
module.exports = router