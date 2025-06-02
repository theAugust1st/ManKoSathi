const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const asyncHandler = require("../utils/asyncHandler.js")
const registerUser = asyncHandler(async (req, res,next) => {
    // get the details from the body
    const {
      username,
      name,
      email,
      password,
      language_preference,
      gender,
    } = req.body;

    // check the user enter all the credentails
    if (
      !(username && name && email && password && language_preference && gender)
    )
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
    }
    else{
      res.status(400);
      throw new Error("Invalid user data, user not created")
    }
})

module.exports = {
  registerUser,
};
