const MeditationSession = require("../models/MeditationSession.js");
const BackgroundSound = require('../models/backgroundSound.js')
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
/*****************************
@desc get the specific meditation session for the logged-in user
@route POST /api/meditation/:id
@access private/proctected
*****************************/
const getSessionByID = asyncHandler(async (req,res,next)=>{
    const userId = req.user._id;
    const sessionID = req.params.id;
    const session = await MeditationSession.findById(sessionID);
    if(!session){
        res.status(404)
        throw new Error("Meditation not found with that ID.");
    }
    if(!session.userId.equals(userId)){
        res.status(403)
        throw new Error("User not authorized to access this session.")
    }
    res.status(200).json({
        success:true,
        message:"Meditation sessiosn with the ID.",
        session:session
    })
})
/*****************************
@desc delete the user meditation sessions for the logged-in user
@route DELETE /api/meditation
@access private/proctected
*****************************/
const deleteAllSessions = asyncHandler(async(req,res,next)=>{
    const userId = req.user._id;
    const sessionsDeletion = await MeditationSession.deleteMany({userId})
    if(sessionsDeletion.deletedCount===0){
        return res.status(200).json({
            success:true,
            count:sessionsDeletion.deletedCount,
            message:"NO meditation session found to delete."
        })
    }
    res.status(200).json({
        success:true,
        count: sessionsDeletion.deletedCount,
        message : "All meditation sessions deleted successfully."
    })
})
/*****************************
@desc delete the specific user meditation sessions for the logged-in user
@route DELETE /api/meditation/:id
@access private/proctected
*****************************/
const deleteMeditationSession = asyncHandler(async(req,res,next)=>{
    const sessionsId = req.params.id;
    const userId = req.user._id
    const session = await MeditationSession.findOneAndDelete({_id:sessionsId,userId:userId})
    if(!session){
        res.status(404)
        throw new Error("Sessions not found or User not authorized to delete this session")
    }
    res.status(200).json({
        success:true,
        message:"Meditation sessions deleted successfully.",
        session: session
    })
})
/*****************************
@desc get the backgroundSounds for the logged-in users
@route GET /api/meditation/sounds
@access private/protected
*****************************/
const getBackgroundSounds = asyncHandler(async(req,res,next)=>{
    const backgroundSounds = await BackgroundSound.find({});
    res.status(200).json({
        success:true,
        count:backgroundSounds.length,
        message:"Sounds retrieved successfully.",
        sounds:backgroundSounds
    })
})

module.exports = {createMeditationSession,
    getMeditationSessions,
    deleteAllSessions,
    deleteMeditationSession,getSessionByID,
    getBackgroundSounds
}