const asyncHandler = require("../utils/asyncHandler");
const Habit = require("../models/Habit");

/*****************************
@desc create the habits for the logged-in user
@route POST /api/habits
@access private/proctected
*****************************/

const createHabit = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { habitName, description, frequency } = req.body;
  if (!habitName || !frequency) {
    res.status(400).json({
      success: false,
      message: "Please provide habit name and frequency.",
    });
    return;
  }
  const allowedFrequencies = ["daily", "weekly", "monthly"];
  if (!allowedFrequencies.includes(frequency)) {
    res.status(400).json({
      success: false,
      message:
        "Invalid frequency, Allowed values are:'daily','weekly','monthly'",
    });
    return;
  }
  const newHabit = await Habit.create({
    habitName,
    description,
    frequency,
    userId,
  });
  if (newHabit) {
    res.status(201).json({
      success: true,
      message: "New habit created successfully.",
      habit: newHabit,
    });
    return;
  } else {
    res.status(400);
    throw new Error("Habit could not be created due to invalid data.");
  }
});

/*****************************
@desc get all habits from the logged-in user
@route GET/api/habits
@access private/protected
*****************************/
const getHabits = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const habits = await Habit.find({ userId });

  res.status(200).json({
    success: true,
    count: habits.length,
    message:
      habits.length > 0
        ? "User habits retrieved successfully."
        : "No habits found for this user.",
    habits: habits,
  });
});

/*****************************
@desc get habit by id from the logged-in user
@route  GET /api/habit/:id
@access private/protected
*****************************/

const getHabitById = asyncHandler(async (req, res) => {
  const habitId = req.params.id;

  const habit = await Habit.findById(habitId);

  if (!habit) {
    res.status(404);
    throw new Error("Habit not found with that ID.");
  }
  // check the habit.useId is same to req.user._id
  if (!habit.userId.equals(req.user._id)) {
    res.status(403);
    throw new Error("User not authorized to access this habit.");
  }
  res.status(200).json({
    success: true,
    message: "The habit with the ID.",
    habit: habit,
  });
});

/*****************************
@desc update the habit by id from the logged-in user.
@route PUT /api/habits/:id
@access private/protected
*****************************/

const updateHabit = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const habitId = req.params.id;

  const habit = await Habit.findById(habitId);
  if (!habit) {
    res.status(404);
    throw new Error("Habit not found with that ID.");
  }
  if (!habit.userId.equals(userId)) {
    res.status(403);
    throw new Error("User not authroized to access this habit.");
  }
  const { habitName, description, frequency } = req.body;
  if (frequency !== undefined) {
    const allowedFrequencies = ["daily", "weekly", "monthly"];
    if (!allowedFrequencies.includes(frequency)) {
      res.status(400);
      throw new Error(
        "Invalid Frequency, Allowed values are: 'daily', 'weekly', 'monthly'"
      );
    }
    habit.frequency = frequency;
  }
  if (habitName !== undefined) habit.habitName = habitName;
  if (description !== undefined) habit.description = description;

  const updatedHabit = await habit.save();
  res.status(200).json({
    success: true,
    message: "Habit update successfully",
    habit: updatedHabit,
  });
});

/****************************
@desc delete the habit by id from the logged-in user.
@route DELETE  /api/habits/:id
@access private/protected
*****************************/

  const deleteHabit = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const habitId = req.params.id;

    const habit = await Habit.findById(habitId);
    if(!habit){
      res.status(404)
      throw new Error("Habit not found with that ID.")
    }
    if(!habit.userId.equals(userId)){
      res.status(403)
      throw new Error("User not authorized to delete this habit")
    }
    await habit.deleteOne()
    res.status(200).json({
      success:true,
      message:"Habit deleted successfully"
    })
  })

/****************************
@desc delete the habit by id from the logged-in user.
@route DELETE  /api/habits
@access private/protected
*****************************/

const deleteAllHabits = asyncHandler(async(req,res)=>{
  const userId = req.user._id;
  const habitsDeletion = await Habit.deleteMany({userId:userId})
  if(habitsDeletion.deletedCount===0){
    return res.status(200).json({
      success: true,
      count : habitsDeletion.deletedCount,
      message:"No habit found to delete."
    })
  }
  res.status(200).json({
    success:true,
    count : habitsDeletion.deletedCount,
    message:"All habits deleted successfully."
  })
})
module.exports = {
  createHabit,
};
