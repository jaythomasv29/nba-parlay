import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const GameContext = createContext();

// Get date range and store it in an array of all the games within the NBA calendar starting from current day
const dateRange = () => {
  const currentYear = new Date().getFullYear();
  const startDate = new Date();
  const endDate = new Date(`${Number(currentYear)}-04-09`);
  const days = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
};
export const GameContextProvider = ({ children }) => {
  // game state that will store all games within the browser
  const [games, setGames] = useState(
    JSON.parse(localStorage.getItem("nbaGames"))?.nbaGames || []
  );
  const [gameDates, setGameDates] = useState([]);
  // On application mounting, the games of the season are retrieved from the backend via API GET call and are loaded behind the scenes. Local Storage, and expiry time is set to get fresh data once it becomes stale in order to reload scores
  useEffect(() => {
    setGameDates(dateRange());
    const getAllGamesOfSeason = async () => {
      const now = new Date();
      const EXPIRY_TIME = 10000;
      const currentLocalStorageGames = JSON.parse(
        localStorage.getItem("nbaGames")
      );
      try {
        // if the expiry time has passed -> then retrieve data and reset localStorage data to newly retrieved data
        if (
          currentLocalStorageGames === null ||
          now.getTime() > new Date(currentLocalStorageGames?.expiry).getTime()
        ) {
          const response = await axios.get("/games/season/all");
          localStorage.setItem(
            "nbaGames",
            JSON.stringify({
              nbaGames: response.data.response,
              expiry: now.getTime() + EXPIRY_TIME,
            })
          );
          setGames(response.data.response);
        } 
      } catch (err) {
        console.log("Error getting season games " + err);
      }
    };
    getAllGamesOfSeason();
  }, []);

  // Filter function to get specific games on a current date
  const getGamesByDate = (date) => {
    return games.filter((game) => new Date(game.date.start).toDateString() === date.toDateString() ? game : null);

  };

  const value = {
    // games,
    gameDates,
    getGamesByDate,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
