const MeditationSession = require("../models/MeditationSession.js");
const asyncHandler = require('../utils/asyncHandler.js');
/*****************************
@desc create the meditation session for the logged-in user
@route POST /api/meditation
@access private/proctected
*****************************/
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
/*****************************
@desc get the user meditation sessions for the logged-in user
@route GET /api/meditation
@access private/proctected
*****************************/
const getMeditationSessions = asyncHandler(async(req,res,next)=>{
    const userId = req.user._id;

    const sessions = await MeditationSession.find({userId}).populate('backgroundSound');
    res.status(200).json({
        success:true,
        count: sessions.length,
        message:
            sessions.length > 0 
            ? "User meditation sessions retrieved successfully."
            : "No meditation sessions found for this user.",
            sessions:sessions
    })
})

module.exports = {createMeditationSession,
    getMeditationSessions
}