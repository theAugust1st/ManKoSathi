const mongoose = require('mongoose');

const backgroundSoundSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    category:{
        type:String,
        trim:true,
        required:true
    },
    audioUrl:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true})

const BackgroundSound = mongoose.model("BackgroundSound",backgroundSoundSchema);
module.exports = BackgroundSound