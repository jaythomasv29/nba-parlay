const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  conference: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Team", teamSchema);
