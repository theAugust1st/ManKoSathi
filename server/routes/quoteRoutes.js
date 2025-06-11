const express = require('express');
const {getQuotes,getRandomQuotes }= require('../controllers/quoteControllers')
const router = express.Router()
router.route('/').get(getQuotes)
router.route('/random').get(getRandomQuotes)

module.exports = router