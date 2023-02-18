const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWTSECRETKEY;
// @desc Create a new user
// @route POST /users
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Ensure valid data
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // Check for duplicate email in database, if it exists
  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: "Error creating new user. Email already exists" });

  const hashedPwd = await bcrypt.hash(password, 10);
  const newUser = { email, password: hashedPwd };
  try {
    const user = await User.create(newUser);
    const token = jwt.sign({ id: user._id }, jwtSecretKey);
    const { password, ...userDetails } = user;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json(userDetails._doc);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error saving user" });
  }
};

/**
 * Login user by retrieving user data from JSON body, first validates incoming data to find user in the database, and sends appropriate HTTP response along with jsonwebtoken via cookies
 * @param {*} req
 * @param {*} res
 * @returns HTTP response + JSON data
 */
const loginUser = async (req, res) => {
  console.log("backend login");
  const foundUser = await User.findOne({ email: req.body.email }).lean().exec();
  if (!foundUser) return res.status(404).json({ message: "User not found" });
  const isValidPassword = bcrypt.compareSync(
    req.body.password,
    foundUser.password
  );
  if (!isValidPassword)
    return res
      .status(400)
      .json({ message: "Invalid credentials. Wrong username or password" });
  console.log(jwtSecretKey);
  const token = jwt.sign({ id: foundUser._id }, jwtSecretKey);
  const { password, ...userDetails } = foundUser;
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(userDetails);
};

/**
 * Logout user by clearing cookie that contains jsonwebtoken within browser and clearing global state of stored user data within context
 * @param {*} req
 * @param {*} res
 */
const logoutUser = async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
