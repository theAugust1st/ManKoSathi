const mongoose = require("mongoose");

const MeditationSessionSchema = new mongoose.Schema(
  {
    sessionDate: {
      type: Date,
      required: true,
    },
    durationMinutes: {
      type: Number,
      require: true,
    },
    sessionType: {
      type: String,
      enum: ['guided', 'unguided'],
      require: true,
    },
    meditationTechniques: {
      type: String,
      enum: [
        //research going on around the typoes of techniques.
      ],
      required: false
    },
    notes: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const MeditationSession = mongoose.model(
  "MeditationSession",
  MeditationSessionSchema
);
module.exports = MeditationSession;
