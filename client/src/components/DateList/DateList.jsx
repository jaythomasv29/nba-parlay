import { useContext, useState } from 'react';
import List from '@mui/material/List';
import { GameContext } from '../context/gameContext';
import { Link } from 'react-router-dom';

import "./DateBox.scss"

const DateList = () => {
  const { gameDates, getGamesByDate } = useContext(GameContext)
  const [activeIdx, setActiveIdx] = useState(0)
  return (
    <List
      sx={{

        width: '100%',
        maxWidth: 900,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        display: "flex",
        gap: 1,

      }}
      subheader={<li />}
    >
      {gameDates?.map((date, idx) => {
        const games = getGamesByDate(date)
        return <Link to={`/${date.toJSON()}`} onClick={() => setActiveIdx(idx)}className={`nav-link date-box ${activeIdx === idx ? `today` : ``} ${games?.length ? "games-available" : "games-unavailable"}`} key={date}>
          {date.toDateString().split(" ").slice(0, 3).join(" ")}
        </Link>



      })}
    </List>
  )
}

export default DateList