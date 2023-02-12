const { getAllNbaTeams, getTeamStats, getCurrentPlayersOfTeam } = require("../controller/teamController");

const express = require("express");
const Team = require("../models/Team");
const router = express.Router();


// baseURL: api/teams/

router.get("/", getAllNbaTeams)
router.get("/:id/stats", getTeamStats)
router.get("/:id/players", getCurrentPlayersOfTeam)


module.exports = router;