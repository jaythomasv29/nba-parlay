const mongoose = require("mongoose");
const User = require("../models/User");

const addTeamToUser = async (req, res) => {
  // find the user
  try {
    const foundUser = await User.findById(req.params.userId);
    const { city, code, conference, logo, name, id } = req.body;
    foundUser.favoriteTeams.push({ city, code, conference, logo, name, id });
    const updatedUser = await foundUser.save();
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
  }

};
const removeTeamFromUserFavorites = async (req, res) => {
  // find the user
  try {
    const foundUser = await User.findById(req.params.userId);
    const { teamId } = req.body;
    foundUser.favoriteTeams = foundUser.favoriteTeams.filter(team => team.id !== teamId);
    const updatedUser = await foundUser.save();
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addTeamToUser,
  removeTeamFromUserFavorites
};
