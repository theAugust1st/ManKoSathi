const asyncHandler = require("../utils/asyncHandler.js");
const User = require("../models/User.js");
/*****************************
@desc update a user's profile
@route Delete /api/user/profile/favorites/:userId
@access private/protected
*****************************/
const updateProfile = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {name,language_preference, dob,gender } = req.body;
    const updateUser = await User.findByIdAndUpdate(userId,
        {
            $set:{
                name,
                language_preference,
                dob,
                gender
            }
        },
        {
        new: true,
        runValidators: true,
        select: '-password'}
    );
    if(!updateUser){
        res.status(404)
        throw new Error("User not found with that ID.");
    }
    res.status(200).json({
        success:true,
        message:"Profile updated successfully",
        user: updateUser
    })
})

module.exports = {
    updateProfile
}