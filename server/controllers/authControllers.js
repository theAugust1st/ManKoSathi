const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const asyncHandler = require("../utils/asyncHandler.js");
const registerUser = asyncHandler(async (req, res, next) => {
  // get the details from the body
  const { username, name, email, password, language_preference, gender } =
    req.body;

  // check the user enter all the credentails
  if (!(username && name && email && password && language_preference && gender))
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });

  // check if the user is already register or not
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email or username already exists.",
    });
  }

  const newUser = await User.create({
    username,
    email,
    name,
    password,
    language_preference,
    gender,
  });
  if (newUser) {
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        language_preference: newUser.language_preference,
        gender: newUser.gender,
        dob: newUser.dob,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data, user not created");
  }
});
// login user controller
const loginUser = asyncHandler(async (req, res,next) => {
  // get the email or username and the password from req.body
  const { loginIdentifers, password } = req.body;
  // check all the credentials
  if(!loginIdentifers || !password) return res.status(400).json({message:"Please provide email/username and password."})
  // Find the user in the db using email or username
  const user =await User.findOne({ $or: [{ email:loginIdentifers }, { username:loginIdentifers }] });
  if (user && (await user.comparePassword(password))){
    const token = jwt.sign(
      {id:user._id,
        email : user.email
      },process.env.JWT_SECRET, {
        expiresIn: "2h"
      }
    )
    res.status(200).json({
      message: "User login successfully",
      token,
      user:{
          _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        language_preference: user.language_preference,
        gender: user.gender,
        dob: user.dob,
        favoriteQuotes : user.favoriteQuotes
      }
    })
  }
  else{
    res.status(401);
    throw new Error("Invalid credentials: Please check your email/username and password")
  }
});
module.exports = {
  registerUser,
  loginUser,
};
