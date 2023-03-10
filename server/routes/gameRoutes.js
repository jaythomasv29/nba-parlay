const router = require("express").Router()
const { getGamesOfCurrentSeasonJSON, getDailyNBAGames, submitUserParlay, getAllUserParlays, getUserParlayById } = require("../controller/gameController")

/**
 * :date = YYYY-MM-DD
 * Get current games of the day with status
 * :scheduled = "Scheduled", :inplay = 'In Play', :finished: = 'Finished
 */
router.get("/season/all", getGamesOfCurrentSeasonJSON)
router.get("/:date", getDailyNBAGames)
router.get("/parlays/:userId", getAllUserParlays)
router.get("/parlays/:userId/:parlayId", getUserParlayById)
router.post("/parlays/:userId", submitUserParlay)

module.exports = router;