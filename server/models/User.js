const mongoose = require("mongoose")

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
    type: String,
    default: "Team",
  }],
})

module.exports = mongoose.model("User", userSchema);