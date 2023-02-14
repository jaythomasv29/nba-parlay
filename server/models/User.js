const mongoose = require("mongoose");
const Team = require("./Team");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // `email` must be unique

  },
  password: {
    type: String,
    required: true
  },
  favoriteTeams: [{
    id: Number,
    name: String,
    code: String,
    city: String,
    conference: String,
    logo: String
  }],
})

module.exports = mongoose.model("User", userSchema);