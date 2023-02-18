import axios from "axios"
import { Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Game from '../../components/Game/Game'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DoneIcon from '@mui/icons-material/Done';

import "./Main.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { GameContext } from '../../components/context/gameContext';
import DateList from '../../components/DateList/DateList';
import { AuthContext } from "../../components/context/authContext";

const Main = () => {
  const { getGamesByDate } = useContext(GameContext)
  const { currentUser } = useContext(AuthContext)
  
  const location = useLocation();
  let DEFAULT_DAILY_PARLAY = {}
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [parlay, setParlay] = useState(DEFAULT_DAILY_PARLAY);
  const navigate = useNavigate()
  console.log(currentUser)
  const handleSubmitParlay = async (e) => {
    e.preventDefault();
    if (Object.values(parlay).some(value => value === "")) return;
    setIsSubmitted(true);
    const values = {userId: currentUser._id, ...parlay}
    // add the scores, and teams property into values
    try {
      await axios.post(`/games/parlays/${currentUser._id}`, values)
      navigate("/parlays")
    } catch (err) {
      console.log(err)
    }
  }
console.log(parlay)
  const [todaysGames, setTodaysGames] = useState([])
  const handleonRadioChange = (e) => {
    if (isSubmitted) return;
    const { name, value } = e.target;
    setParlay(prevState => ({
      ...prevState,
      [name]: { ...prevState[name], userPick: value }
    }))
  }

  useEffect(() => {
    const getTodayNbaGames = async () => {
      const date = location?.pathname === "/" ? new Date() : new Date(location.pathname.slice(1))
      const games = await getGamesByDate(date)
      
        for (const obj of games) {
          DEFAULT_DAILY_PARLAY[obj["id"]] = ""
        }
      
        
        games.forEach(game => {
          DEFAULT_DAILY_PARLAY[game.id] = { ...DEFAULT_DAILY_PARLAY[game.id], scores: game.scores, teams: game.teams, status: game.status, date: game.date }
        })
      setTodaysGames(games)

    }
    getTodayNbaGames();
    // eslint-disable-next-line 
  }, [location, getGamesByDate])
  return (
    <div className='wrapper'>
      <div className='directions-container'>
        <Typography sx={{ textAlign: "center" }} variant="h4">My NBA Parlay</Typography>
        <div>
          <Typography sx={{ textAlign: "center", color: "#1976D2", fontStyle: "italic" }} variant="subtitle2">Pick and submit your winning team picks, then check back when all games are completed for your prize!</Typography>

          <Typography sx={{ textAlign: "center", color: "#red", fontStyle: "italic" }} variant="subtitle2">All matches must be selected</Typography>
          {
            !currentUser &&
          <Typography sx={{ textAlign: "center", color: "red", fontStyle: "italic" }} variant="subtitle2">Please login to submit a parlay</Typography>
          }
          <div className="dates-container">
            <DateList />
          </div>
        </div>
      </div>
      <form>
        <div className="game-container">
          {todaysGames.length ?
            todaysGames?.map(game => (
              <Game handleonRadioChange={handleonRadioChange} isSubmitted={isSubmitted} parlay={parlay} setParlay={setParlay} game={game} key={game.id} />
            ))
            :
            <Typography variant="h6" sx={{p: 4, textAlign: "center", color: "grey"}}>Check back in when games are happening!</Typography>
          }
          {
          todaysGames.length!== 0 && currentUser &&
          <div className='button-container'>
            <Button onClick={handleSubmitParlay} disabled={Object.values(parlay).some(match => !match.userPick)} className="submit-btn" sx={{ m: 4 }} variant="contained" color="success">{isSubmitted ? <>Completed <DoneIcon /></> : <>Submit My Picks <NavigateNextIcon /> </>}</Button>
          </div>
          }
        </div>
      </form>
    </div>
  )
}

export default Main