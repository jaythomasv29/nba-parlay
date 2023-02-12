import { Box, Paper } from '@mui/material'
import React from 'react'

import "./Tile.scss"
const Tile = ({ title, content }) => {
  // const generateGamesPerSeasonChart = async () => {
  //   const gamesPerSeason = stats?.map(statLine => {
  //     const season = statLine?.season
  //     const games = statLine?.stats.games
  //     return {season, games}
  //   });




  //     new Chart(
  //       document.getElementById('acquisitions'),
  //       {
  //         type: 'bar',
  //         data: {
  //           labels: gamesPerSeason?.map(row => row.season),
  //           datasets: [
  //             {
  //               label: 'Total games by year',
  //               data: gamesPerSeason?.map(row => row.games)
  //             }
  //           ]
  //         }
  //       }
  //     );
  //   }

  //   generateGamesPerSeasonChart()

  return (
    <div className="tile-container">
      <Paper elevation={1}>
        <Box sx={{w: "100%"}}>
        {content}
        </Box>
      </Paper>
    </div>
  )
}

export default Tile