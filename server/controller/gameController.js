const { instance } = require("../axiosConfig");
const moment = require('moment'); // require

const getGamesOfCurrentSeason = async () => {
  const currentSeason = new Date().getFullYear() - 1;
  console.log(currentSeason);
  const response = await instance.get(`/games?season=${currentSeason}`);
  return response.data;
};

const getDailyNBAGames = async (req, res) => {
  const today = new Date();
  const seasonGames = await getGamesOfCurrentSeason();
  console.log(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`);
  const todayGames = seasonGames.response.filter((game) => {
    const gameDate = new Date(game.date.start)
    if (
      new Date(game.date.start) >
        new Date(
          `${today.getFullYear()}, ${today.getMonth() + 1}, ${today.getDate()}`
        ) &&
      new Date(game.date.start) <
        new Date(
          `${today.getFullYear()}, ${today.getMonth() + 1}, ${today.getDate()} 23:59:00`
        )
      
    ){
      return game;
    }
  });
  res.json(todayGames);
};

module.exports = {
  getDailyNBAGames,
};
