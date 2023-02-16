import { AppBar, Avatar, Box, Button, Card, CardContent, Paper, Toolbar, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import GamesPlayed from '../../components/Charts/GamesPlayed';
import PointsPerSeason from '../../components/Charts/PointsPerSeason';
import NbaTeamTable from '../../components/NbaTeamTable/NbaTeamTable';
import Tile from '../../components/Tile/Tile';

import "./Team.scss"
const Team = () => {
  const style = {
    background: 'white;'
  }
  const location = useLocation();
  const team = (location.state);
  const [fiveYearTeamStats, setFiveYearTeamStats] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {

    const get5YearTeamStats = async () => {
      const response = await axios.get(`/teams/${team.id}/stats`);
      const data = response.data;

      setFiveYearTeamStats(data)
    }
    get5YearTeamStats();
  }, [])

  useEffect(() => {
    const getCurrentPlayersOnTeam = async () => {
      const response = await axios.get(`/teams/${team.id}/players`)
      const players = response.data.response;
      setPlayers(players);
    }
    getCurrentPlayersOnTeam()
  }, [])




  return (
    <Paper sx={{m: 1, p: 1}}elevation={3}>

    

      <div className='team-banner'>
        <Box sx={{ flexGrow: 1 }}>

          <AppBar sx={{ bgcolor: "grey" }} position="static">
            <Toolbar>
              <Avatar alt={team.name} src={team.logo} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
                {team.name}
              </Typography>

            </Toolbar>
            <div>
            </div>

          </AppBar>
        </Box>
      </div>
      <NbaTeamTable stats={fiveYearTeamStats} />
      <div className='wrapper'>
        <Tile title="Total Games" content={<GamesPlayed stats={fiveYearTeamStats.teamStats} />} />
        <Tile title="Total Points" content={<PointsPerSeason stats={fiveYearTeamStats.teamStats} />} />
      </div>
      <div className="players-container">
        {
          players?.map(player => (

            <Card className="card" key={player.id}>
              <Avatar
                sx={{ bgcolor: 'skyBlue' }}
                alt={`${player.firstname} ${player.lastname}`}
                src="/broken-image.jpg"
              />
                <CardContent className='card-content'>
                  <Typography variant="h6">
                    {`${player.firstname} ${player.lastname}`}
                  </Typography>
                  <Typography variant="body">
                    College: {player.college}
                  </Typography>
                  <Typography variant="body">
                    Experience: {player.nba.pro}
                  </Typography>
                  {
                    player.height.feets &&
                  <Typography variant="body">
                    Height: {`${player.height.feets}' ${player.height.inches}"`}
                  </Typography>
                  }
                </CardContent>
            </Card>
          ))
        }
      </div>
      </Paper>
  )
}

export default Team