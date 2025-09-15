const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const crypto = require("crypto");
const asyncHandler = require("../utils/asyncHandler.js");
const sendEmail = require("../utils/sendEmail.js")
const registerUser = asyncHandler(async (req, res, next) => {
  // get the details from the body
  const { name, email, password } = req.body;

  // check the user enter all the credentails
  if (!(name && email && password))
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });

  // check if the user is already register or not
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email or username already exists.",
    });
  }
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  const newUser = await User.create({
    email,
    name,
    password,
    otp,
    otpExpires,
  });
  if (!newUser) {
    res.status(400);
    throw new Error("Invalid user data, user not created");
  }
  await sendEmail(email,otp)
  res.status(201).json({
    message: "Registration successfull. Please check your email for the verification code.",
    email: newUser.email,
    otp: newUser.otp,
    otpExpires: newUser.otpExpires
  });
});
const verifyOTP = asyncHandler(async (req,res,next)=>{
  const {email, otp} = req.body;
  if(!(email && otp)){
    res.status(400)
    throw new Error("Please provide both email and OTP")
  }
  const user = await User.findOne({email});
  if(!user){
    res.status(404)
    throw new Error("User not found. Please check your email address")
  }
  const isOtpValid = user.otp === otp;
  const hasOtpExpired = user.otpExpires < new Date()
  if(!isOtpValid || hasOtpExpired){
    res.status(401)
    throw new Error("Invalid or expired OTP. Please try again")
  }
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    res.status(201).json({
      message: "User verified successfully. You are now logged in.",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
})
const loginUser = asyncHandler(async (req, res, next) => {
  // get the email or username and the password from req.body
  const { email, password } = req.body;
  // check all the credentials
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please provide email/username and password." });
  // Find the user in the db using email or username
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
      if (!user.isVerified) {
        res.status(401);
        throw new Error("Your account is not verified. Please check your email for the OTP.");
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
    res.status(200).json({
      message: "User login successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        language_preference: user.language_preference,
        gender: user.gender,
        dob: user.dob,
        favoriteQuotes: user.favoriteQuotes,
        isVerified: user.isVerified
      },
    });
  } else {
    res.status(401);
    throw new Error(
      "Invalid credentials: Please check your email/username and password"
    );
  }
});
module.exports = {
  registerUser,
  verifyOTP,
  loginUser,
};
