const express = require('express');
const {feedBackgroundSound}  = require('../controllers/feedBackgroundSound');
const router = express.Router()

router.route('/sounds/feed').post(feedBackgroundSound)

module.exports = router