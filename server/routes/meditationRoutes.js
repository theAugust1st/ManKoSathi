const express = require("express");
const {createMeditationSession,getMeditationSessions,deleteMeditationSession,getSessionByID,deleteAllSessions,getBackgroundSounds} = require('../controllers/meditationControllers.js')
const {protect} = require("../middlewares/authMiddleware.js")
const router = express.Router()
router.route('/sounds').get(getBackgroundSounds)
router.use(protect)
router.route('/').post(createMeditationSession).get(getMeditationSessions).delete(deleteAllSessions)
router.route('/:id').get(getSessionByID).delete(deleteMeditationSession)

module.exports = router
