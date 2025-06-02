const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
    habitName:{
        type:String,
        required:true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly'],
        default: 'daily',
        required:true
    },
    currentStreak:{
        type : Number,
        required: true,
        default :  0
    },
    longestStreak:{
        type : Number,
        default :  0,
        required : true
    },
    lastCompletedDate:{
        type: Date,
        default: null
    }, 
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    }
},{timestamps: true})

const Habit = mongoose.model("Habit",habitSchema);

module.exports = Habit 