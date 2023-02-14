const express = require("express")
const router = express.Router();

const { addTeamToUser, removeTeamFromUserFavorites } = require("../controller/userController")
// baseURL = api/user/addTeam:id
router.post("/addTeam/:userId", addTeamToUser)
router.delete("/removeTeam/:userId", removeTeamFromUserFavorites)

module.exports = router;