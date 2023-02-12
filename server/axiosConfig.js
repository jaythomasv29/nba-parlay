const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api-nba-v1.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": process.env.NBA_API_KEY,
    "Authorization": process.env.NBA_API_KEY,
  },
});

const getTeamsFromLeague = async () => {
  try {
    const response = await instance.get("/teams?league=Standard");
    return response.data.response;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  instance,
  getTeamsFromLeague,
};
