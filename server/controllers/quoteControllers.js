const asyncHandler = require('../utils/asyncHandler.js')
const Quote = require('../models/Quote.js')

// first for those controllers which can be seen with the non logged in users too.

/*****************************
@desc create the getQuotes for the non logged in users
@route GET /api/quotes
@access public
*****************************/
const getQuotes = asyncHandler(async (req,res)=>{
    const quotes = await Quote.find({});
    res.status(200).json({
        success: true,
        count: quotes.length,
        message: "Quotes retrieved successfully.",
        quotes: quotes
    })
})
/*****************************
@desc create the getRandomQuotes for the non logged in users
@route GET /api/quotes/random
@access public
*****************************/

const getRandomQuotes = asyncHandler(async (req,res)=>{
        const randomQuote = await Quote.aggregate([{$sample:{size: 1}}]);
    if(!randomQuote || randomQuote.length === 0){
        return res.status(404).json({
            success: false,
            message : "No Quote available in the database."
        })
    }
        res.status(200).json({
        success: true,
        message: "Random quote Retrieved Successfully",
        quote: randomQuote[0]
    })
})

module.exports ={
    getQuotes,
    getRandomQuotes
}