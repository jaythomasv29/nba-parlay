const router = require("express").Router()
const { getDailyNBAGames } = require("../controller/gameController")

/**
 * :date = YYYY-MM-DD
 * Get current games of the day with status
 * :scheduled = "Scheduled", :inplay = 'In Play', :finished: = 'Finished
 */
router.get("/today", getDailyNBAGames)

module.exports = router;