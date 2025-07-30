const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const asyncHandler = require("../utils/asyncHandler.js");
const registerUser = asyncHandler(async (req, res, next) => {
  // get the details from the body
  const { name, email, password} =
    req.body;

  // check the user enter all the credentails
  if (!(name && email && password))
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });

  // check if the user is already register or not
  const existingUser = await User.findOne({email});
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email or username already exists.",
    });
  }

  const newUser = await User.create({
    email,
    name,
    password,
  });
  if (newUser) {
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data, user not created");
  }
});
// login user controller
const loginUser = asyncHandler(async (req, res, next) => {
  // get the email or username and the password from req.body
  const { email, password } = req.body;
  // check all the credentials
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please provide email/username and password." });
  // Find the user in the db using email or username
  const user = await User.findOne({email});
  if (user && (await user.comparePassword(password))) {
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
  loginUser,
};
