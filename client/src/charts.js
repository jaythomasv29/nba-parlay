import { Chart } from "chart.js/auto";

export const generateGamesPerSeasonChart = async (stats) => {
  const gamesPerSeason = stats?.map(statLine => {
    const season = statLine?.season
    const games = statLine?.stats.games
    return {season, games}
  });

  

  
    new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'bar',
        data: {
          labels: gamesPerSeason?.map(row => row.season),
          datasets: [
            {
              label: 'Total games by year',
              data: gamesPerSeason?.map(row => row.games)
            }
          ]
        }
      }
    );
  }