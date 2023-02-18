import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const GameContext = createContext();

// get date range and store it in an array
const dateRange = () => {
  const currentYear = new Date().getFullYear()
  
  // const startDate = new Date(`${currentYear - 1}-10-18`)
  const startDate = new Date()
  const endDate = new Date(`${Number(currentYear)}-04-09`)
  const days = []
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d))
  }
  return days;
}
export const GameContextProvider = ({ children }) => {
  // game state that will store all games within the browser
  const [games, setGames] = useState(JSON.parse(localStorage.getItem("nbaGames")).nbaGames ||null);
  const [gameDates, setGameDates] = useState([])

  useEffect(() => {
    setGameDates(dateRange())
    const getAllGamesOfSeason = async () => {
      const now = new Date();
      const EXPIRY_TIME = 10000;
      const currentLocalStorageGames = JSON.parse(localStorage.getItem("nbaGames"))
      try {
        // if the expiry time has passed -> then retrieve data and reset localStorage data to newly retrieved data
        if(now.getTime() > new Date(currentLocalStorageGames.expiry).getTime() ) {
          const response = await axios.get("/games/season/all")
          localStorage.setItem("nbaGames", JSON.stringify({nbaGames: response.data.response, expiry: now.getTime() + EXPIRY_TIME}))
          setGames(response.data.response)
        } else {
        }
      } catch (err) {
        console.log("Error getting season games " + err)
      }
    }
    getAllGamesOfSeason();
  }, [])

  const getGamesByDate = (date) => {
    return games?.filter(game => {
      if (new Date(game.date.start).toDateString() === date.toDateString()) {
        return game
      } else {
        return;
      }
    }) 
  }

  const value = {
    // games,
    gameDates,
    getGamesByDate,
  }
  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  )
}