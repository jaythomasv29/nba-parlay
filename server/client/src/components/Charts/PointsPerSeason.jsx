import { Paper } from "@mui/material";
import Chart from "chart.js/auto"
import React from 'react'

const PointsPerSeason = ({ stats }) => {
  const generatePointsPerSeasonChart = async () => {
    const gamesPerSeason = stats?.map(statLine => {
      const season = statLine?.season
      const points = statLine?.stats.points
      return { season, points }
    });




    new Chart(
      document.getElementById('pointsPerSeason'),
      {
        type: 'line',
        data: {
          labels: gamesPerSeason?.map(row => row.season).reverse(),
          datasets: [
            {
              label: 'Total points by year',
              data: gamesPerSeason?.map(row => row.points).reverse()
            }
          ]
        }
      }
    );
  }

  generatePointsPerSeasonChart()
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas id="pointsPerSeason"></canvas>
    </div>
  )
}

export default PointsPerSeason