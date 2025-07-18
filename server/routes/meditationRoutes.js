const express = require("express");
const {createMeditationSession,getMeditationSessions} = require('../controllers/meditationControllers.js')
const {protect} = require("../middlewares/authMiddleware.js")
const router = express.Router()
router.use(protect)
router.route('/').post(createMeditationSession).get(getMeditationSessions)

module.exports = router