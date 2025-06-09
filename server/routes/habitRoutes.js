const express = require("express");
const {createHabit,getHabits,deleteAllHabits,getHabitById,updateHabit,deleteHabit,habitCompletion} = require("../controllers/habitControllers.js")
const {protect} = require("../middlewares/authMiddleware.js");
const router = express.Router()
router.use(protect)
router.route('/').post(createHabit).get(getHabits).delete(deleteAllHabits)
router.route('/:id').get(getHabitById).put(updateHabit).delete(deleteHabit)
router.route('/:id/complete').post(habitCompletion)

module.exports = router