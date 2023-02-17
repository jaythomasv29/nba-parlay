const axios = require("axios");
const Stat = require("../models/Stat");
const Team = require("../models/Team");
const { instance } = require("../axiosConfig");

const getAllNbaTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    console.log(err);
  }
};

const getTeamStats = async (req, res) => {
  const year = new Date().getFullYear() - 1;
  const RANGE = 5;
  const teamId = req.params.id;
  const savedTeamStats = await Stat.findOne({ teamId: teamId }).exec();
  if (savedTeamStats) {
    return res.json(savedTeamStats);
  } else {
    const URLs = [];
    // gets the urls to prepare api calls
    for (let i = year; i > year - RANGE; i--) {
      const URL = `https://api-nba-v1.p.rapidapi.com/teams/statistics?season=${i}&id=${teamId}`;
      URLs.push(URL);
    }
    try {
      const fiveYearStatsOfTeam = await Promise.all(
        URLs.map(async (url) => {
          try {
            const response = await axios.get(url, {
              headers: {
                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                "x-rapidapi-key": process.env.NBA_API_KEY,
              },
            });
            return response.data;
          } catch (err) {
            console.log(err);
          }
        })
      );
      // save to db
      const teamStats = fiveYearStatsOfTeam.map((statYear) => {
        const { parameters, response } = statYear;
        const season = parameters.season;
        const stats = response[0];
        return { season, stats };
      });
      const savedStats = await Stat.create({
        teamId: fiveYearStatsOfTeam[0].parameters.id,
        teamStats,
      });
      return res.json(savedStats);
    } catch (err) {
      console.log(err);
    }
  }
};

const getCurrentPlayersOfTeam = async (req, res) => {
  const teamId = req.params.id;
  const currentYear = new Date().getFullYear();
  try {
    const response = await instance.get(
      `/players?team=${teamId}&season=${currentYear - 1}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// check If the team is inside stats collection, if it is, get it from database, else request it from the api

module.exports = {
  getAllNbaTeams,
  getTeamStats,
  getCurrentPlayersOfTeam,
};
