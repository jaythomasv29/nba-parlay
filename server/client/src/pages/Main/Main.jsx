import { Button, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Game from '../../components/Game/Game'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import "./Main.scss"

const Main = () => {
  let DEFAULT_DAILY_PARLAY = {}
  const { currentUser } = useContext(AuthContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [parlay, setParlay] = useState(DEFAULT_DAILY_PARLAY);
  const navigate = useNavigate()
  const handleSubmitParlay = async (e) => {
    e.preventDefault();
    if (Object.values(parlay).some(value => value === "")) return;
    setIsSubmitted(true);
    const values = {userId: currentUser._id, ...parlay}
    // add the scores, and teams property into values
  
  
    try {
      const response = await axios.post(`games/parlays/${currentUser._id}`, values)
      navigate("/parlays")
    } catch (err) {
      console.log(err)
    }
  }

  const [todaysGames, setTodaysGames] = useState([])
  useEffect(() => {
    const getTodayNbaGames = async () => {
      const response = await axios.get("games/today")
      const games = response.data
      setTodaysGames(games)

    }
    getTodayNbaGames();
  }, [])
  console.log(todaysGames);
  return (
    <div>
      <div className='directions-container'>
        {/* <Typography sx={{ textAlign: "center" }} variant="h4">Today's Parlays</Typography> */}
        <Typography sx={{ textAlign: "center" }} variant="h4">My NBA Parlay</Typography>
        <div>
        <Typography sx={{ textAlign: "center", color: "#1976D2" }} variant="body2">1) Submit your winning team picks for each match</Typography>
        <Typography sx={{ textAlign: "center", color: "#1976D2" }} variant="body2">2) Check back when all games are completed for your prize</Typography>
        </div>
      </div>

      <form action="">

        <div className="game-container">
          {
            todaysGames.map(game => (
              <Game game={game} />
            ))
          }
          <div className='button-container'>

        <Button className="submit-btn" sx={{m: 4}}variant="contained" color="success">Submit My Picks <NavigateNextIcon /></Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Main