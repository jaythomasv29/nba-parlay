const User = require("../models/User");
const bcrypt = require("bcrypt");
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
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error saving user" });
  }
};

const loginUser = async (req, res) => {
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

module.exports = {
  registerUser,
  loginUser,
};
