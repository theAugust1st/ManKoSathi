const User = require('../models/User.js');
const Quote = require('../models/Quote.js')
const mongoose = require('mongoose')
const asyncHandler = require('../utils/asyncHandler.js')


/*****************************
@desc    Add a quote to user's favorites
@route POST /api/user/profile/favorites
@access private/protected
*****************************/
const addFavoriteQuote = asyncHandler(async (req,res)=>{
    const {quoteId} = req.body;
    const userId = req.user._id;
    if(!quoteId){
        res.status(400)
        throw new Error('Quote Id is required');
    }
    const quoteExists = await Quote.findById(quoteId)
    if(!quoteExists){
        res.status(404)
        throw new Error("Quote not found.");
    }
    await User.findByIdAndUpdate(userId,{$addToSet:{'favoriteQuotes':quoteId}})
    res.status(200).json({
        success:true,
        message:"Quote added to favorites."
    })
})

/*****************************
@desc get user's favorite quotes
@route GET /api/user/profile/favorites
@access private/protected
*****************************/
const getFavoriteQuotes = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId).populate("favoriteQuotes")
    if(!user){
        res.status(404)
        throw new Error("User not found.")
    }
    res.status(200).json({
        success:true,
        message:"User's favorite quote reterived successfully",
        favoriteQuotes: user.favoriteQuotes
    })
})
/*****************************
@desc remove a quote from user's favorite
@route Delete /api/user/profile/favorites/:quoteId
@access private/protected
*****************************/
const removeFavoriteQuote= asyncHandler(async(req,res)=>{
    const {quoteId} = req.params
    const userId = req.user._id
        if (!mongoose.Types.ObjectId.isValid(quoteId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Quote ID."
        });
    }
    await User.findByIdAndUpdate(userId,{$pull:{'favoriteQuotes':quoteId}})
    res.status(200).json({
        success:true,
        message:"Removed from the favorite list."

    })
})

module.exports = {
    addFavoriteQuote,
    getFavoriteQuotes,
    removeFavoriteQuote
}