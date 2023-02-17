import { Box, Paper } from "@mui/material";
import Chart from "chart.js/auto"
import React from 'react'

const GamesPlayed = ({stats}) => {
  const generateGamesPerSeasonChart = async () => {
    const gamesPerSeason = stats?.map(statLine => {
      const season = statLine?.season
      const games = statLine?.stats.games
      return { season, games }
    });




    new Chart(
      document.getElementById('gamesPlayed'),
      {
        type: 'bar',
        data: {
          labels: gamesPerSeason?.map(row => row.season).reverse(),
          datasets: [
            {
              label: 'Total games by year',
              data: gamesPerSeason?.map(row => row.games).reverse()
            }
          ]
        }
      }
    );
  }

  generateGamesPerSeasonChart()
  return (
    <div style={{width: "100%", height: "100%"}}>
      <canvas id="gamesPlayed"></canvas>
    </div>
  )
}

export default GamesPlayed