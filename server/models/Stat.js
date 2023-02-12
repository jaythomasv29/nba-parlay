const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  teamStats: [{
    
  }],
  
});

module.exports = mongoose.model("Stat", statSchema);
