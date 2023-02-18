const { instance } = require("../axiosConfig");
const Parlay = require("../models/Parlays");

const getGamesOfCurrentSeasonJSON = async (req, res) => {
  try {
    const games = await getGamesOfCurrentSeason();
    res.json(games);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving all nba games of season" });
  }
};

const getGamesOfCurrentSeason = async () => {
  const currentSeason = new Date().getFullYear() - 1;
  try {
    const response = await instance.get(`/games?season=${currentSeason}`);
    return response.data;
  } catch (err) {
    return { message: "Error retrieving all nba games of season" };
  }
};

const getDailyNBAGames = async (req, res) => {
  console.log(req.params.date)
  const today = new Date(req.params.date) || new Date();
  console.log(today)
  const seasonGames = await getGamesOfCurrentSeason();
  console.log(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`);
  const todayGames = seasonGames.response.filter((game) => {
    const gameDate = new Date(game.date.start);
    if (
      new Date(game.date.start) >
        new Date(
          `${today.getFullYear()}, ${today.getMonth() + 1}, ${today.getDate()}`
        ) &&
      new Date(game.date.start) <
        new Date(
          `${today.getFullYear()}, ${
            today.getMonth() + 1
          }, ${today.getDate()} 23:59:00`
        )
    ) {
      return game;
    }
  });
  res.json(todayGames);
  // update database of previous parlays here using season games because it is fresh data
  // query all parlays, update all and add a winner for each match by doing some comparison checker
};

const updateAllParlays = async () => {
  const parlays = await Parlay.find().lean().exec();
  const seasonGames = await getGamesOfCurrentSeason();
  for (let i = 0; i < parlays.length; i++) {
    const parlay = parlays[i];
    let partialWins = 0;
    const gameDate = new Date(parlays[i].createdAt);
    const specificGamesOnParlayDate = seasonGames.response.filter(
      (game) =>
        new Date(game.date.start).toDateString() === gameDate.toDateString()
    );
    parlay.isParlay;
    Object.keys(parlay.parlay).forEach((gameKey) => {
      const foundGameResult = specificGamesOnParlayDate.find(
        (g) => g.id == gameKey
      );
      if (
        foundGameResult?.scores.home.points &&
        foundGameResult?.scores.visitors.points
      ) {
        parlay.parlay[gameKey].scores = foundGameResult?.scores;
        parlay.parlay[gameKey].gameWinner = checkWinner(foundGameResult);

        if (
          parlay.parlay[gameKey].gameWinner ==
          Number(parlay.parlay[gameKey].userPick)
        ) {
          partialWins++;
        }
      }
    });
    parlay.partialWins = partialWins;
    parlay.isCompleteParlayWinner = Object.keys(parlay.parlay).every((key) => {
      return (
        parlay.parlay[key].gameWinner == Number(parlay.parlay[key].userPick)
      );
    });
    console.log(parlay);
    await Parlay.findByIdAndUpdate(parlay._id, parlay);
  }
};

/**
 * Update parlays periodically in background
 */
setInterval(() => {
  updateAllParlays();
}, 300000);

const checkWinner = (game) => {
  return game?.scores.home.points > game?.scores.visitors.points
    ? game?.teams.home.id
    : game?.teams.visitors.id;
};
const submitUserParlay = async (req, res) => {
  const { userId, ...parlayPicks } = req.body;
  try {
    const savedParlay = await Parlay.create({
      userId: userId,
      parlay: parlayPicks,
    });
    res.json(savedParlay);
  } catch (err) {
    console.log("Error saving parlay in database " + err);
    res.status(500).json("Error saving parlay in database");
  }
};

const getAllUserParlays = async (req, res) => {
  const userId = req.params.userId;
  try {
    const parlays = await Parlay.find({ userId: userId });
    res.json(parlays);
  } catch (err) {
    console.log("Error retrieving parlays " + err);
    res.status(500).json("Error retrieving parlays");
  }
};

const getUserParlayById = async (req, res) => {
  const userId = req.params.userId;
  const parlayId = req.params.parlayId;
  try {
    const parlay = await Parlay.findById({ _id: parlayId });
    res.json(parlay);
  } catch (err) {
    console.log("Error retrieving parlay by id " + err);
    res.status(500).json({ message: "Error retrieving parlay by id ", err });
  }
};

module.exports = {
  getGamesOfCurrentSeasonJSON,
  getDailyNBAGames,
  submitUserParlay,
  getUserParlayById,
  getAllUserParlays,
};
