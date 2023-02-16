const mongoose = require("mongoose");

const parlaySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    parlay: {},
    teams: {},
    scores: {},
    status: {},
    date: {},
    partialWins: {
      type: Number,
    },
    isCompleteParlayWinner: {
      type: Boolean,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

module.exports = mongoose.model("Parlay", parlaySchema);
