const express = require('express')
const router = express.Router();
const {protect} = require('../middlewares/authMiddleware')

    router.route('/profile').get(protect,(req,res)=>{
        console.log(req.user)
        res.send("im check the authWork or not",req.body || "undefined")
    })

module.exports = router    