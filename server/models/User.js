const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    dob: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    language_preference: {
      type: String,
      enum: ["English", "Nepali"],
      required: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others","Prefer Not To Say"],
      required: false,
    },
    favoriteQuotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quote",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error)
  }
});
userSchema.method({
  comparePassword: async function (password) {
    return await bcrypt.compare(password,this.password)
  }
})
const User = mongoose.model("User", userSchema);
module.exports = User;
