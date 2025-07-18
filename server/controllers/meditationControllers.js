const MeditationSession = require("../models/MeditationSession.js");
const asyncHandler = require('../utils/asyncHandler.js');

const createMeditationSession = asyncHandler(async(req,res,next)=>{
    const userId = req.user._id;
    const {
        sessionDate,
        durationSeconds,
        sessionType,
        meditationTechniques,
        mood,
        goals,
        backgroundSound,
        notes
    } = req.body;
    if(!meditationTechniques){
        res.status(400)
        throw new Error("Must select the Meditation Techniques.")
    }
    const newMeditationSession = await MeditationSession.create({
        userId,
        sessionDate,
        durationSeconds,
        sessionType:"unguided",
        meditationTechniques,
        mood,
        goals,
        backgroundSound,
        notes
    })
    if(newMeditationSession){
    return res.status(200).json({
        success:true,
        message:"The new meditation created successfully.",
        data:newMeditationSession
    })
    }
    else{
        res.status(400)
        throw new Error("Invalid session data, Session not created.")
    }
})

module.exports = {createMeditationSession}