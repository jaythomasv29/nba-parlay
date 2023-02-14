import { Tooltip, Typography } from '@mui/material'
import React from 'react'
import "./Game.scss"
const Game = ({ game }) => {
  return (
    <div className="game-card">
      <Typography variant="h5">{game.scores.home.points}</Typography>
      <label className="home-team">
        <input type="radio" name={game.id} />
        <Tooltip title={`Pick ${game.teams.home.code} as winning team`}>
          <img className="team-img" src={game.teams.home.logo} />
        </Tooltip>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }} variant="body">{game.teams.home.code}</Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "light", m: 1}} variant="body">{game.teams.home.name}</Typography>
      </label>
      <div className='versus-container'>
      <Typography sx={{ textAlign: "center" }} variant="body">@</Typography>
      <Typography sx={{ textAlign: "center", color: "grey" }} variant="body">{game.status.long === "Finished" ? 'FINAL' : "In Progress"}</Typography>
      
      </div>
      <label className="visitors-team">
        <input type="radio" name={game.id} />
        <Tooltip title={`Pick ${game.teams.visitors.code} as winning team`}>
          <img className="team-img" src={game.teams.visitors.logo} />
        </Tooltip>
        <Typography sx={{ textAlign: "center", fontWeight: "bold" }} variant="body">{game.teams.visitors.code}</Typography>
        <Typography sx={{ textAlign: "center", fontWeight: "light", m: 1}} variant="body">{game.teams.visitors.name}</Typography>
      </label>
      <Typography variant="h5">{game.scores.visitors.points}</Typography>
    </div>
  )
}

export default Game