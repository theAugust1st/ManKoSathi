const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    quoteText :{
        type: String,
        required: true,
        trim: true
    },
    author:{
        type : String,
        trim: true,
        default: "Unknown"
    },
 category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: [
        'motivation',
        'wisdom',
        'mindfulness',
        'perseverance',
        'calm',
        'positivity',
        'reflection',
        'inspiration',
        'self-awareness'
    ]
}

},{timestamps: true})

const Quote = mongoose.model("Quote",quoteSchema)

module.exports = Quote;