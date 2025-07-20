const mongoose = require("mongoose");
const MeditationSessionSchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    sessionDate: {
      type: Date,
      default:Date.now
    },
    durationSeconds: {
      type: Number,
      default:300
    },
    sessionType: {
      type: String,
      enum: ['unguided'],
      required: true,
    },
    meditationTechniques: {
      type: String,
      enum: ['mindfulness','breathing','body-scan','loving-kindness','mantra','walking','others','none'],
      required: true
    },
    mood:{
      preSession:{
        type:String,
        enum:['stressed','anxious','calm','neutral','happy','sad']
      },
      postSession:{
        type:String,
        enum:['stressed','anxious','calm','neutral','happy','sad']
      }
    },
    goals:{
      type:String,
      enum:['reduce-stress','improve-focus','better-sleep','manage-anxiety','self-awareness','other']
    },
    backgroundSound:{
      type : mongoose.Schema.Types.ObjectId,
      ref:'BackgroundSound'
    },
    notes: {
      type: String,
      trim:true
    },
  },
  { timestamps: true }
);

const MeditationSession = mongoose.model(
  "MeditationSession",
  MeditationSessionSchema
);
module.exports = MeditationSession;
