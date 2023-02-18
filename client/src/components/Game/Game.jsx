import { Tooltip, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import "./Game.scss"

const Game = ({ game, handleonRadioChange, isSubmitted, userSelected }) => {
  const location = useLocation();
  return location.pathname === "/" ?
    (

      <div className="game-card">
        {game?.scores?.home?.points &&
          <Typography variant="h5">{game.scores.home.points}</Typography>
        }
        <label className="home-team">
          {
            userSelected ?
              <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.home.id} checked={userSelected === Number(game?.teams?.home.id).toString()} required />
              :
              <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.home?.id} required />
          }
          <Tooltip style={isSubmitted ? { cursor: "not-allowed" } : { cursor: "pointer" }} title={isSubmitted ? `Parlay already submitted` : `Pick ${game?.teams?.home.code} as winning team`}>
            <img className="team-img" src={game?.teams?.home.logo} alt={game?.teams?.home?.name} />
          </Tooltip>
          <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "bold", fontStyle: 'italic' }} variant="subtitle">{game?.teams?.home.code}</Typography>
          <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "light", m: 1 }} variant="subtitle">{game?.teams?.home.name}</Typography>
        </label>
        <div className='versus-container'>
          <Typography sx={{ textAlign: "center", color: "grey" }} variant="body">@</Typography>
          {game.gameWinner && <div>

            {
              game.gameWinner && (Number(game.userPick) !== game.gameWinner) ?
                <Typography sx={{ color: "red" }} variant="body1">YOU LOSE</Typography>
                :
                <Typography sx={{ color: "green" }} variant="body1">YOU WIN</Typography>
            }
          </div>}
          <Typography sx={{ textAlign: "center", color: "grey" }} variant="body">{game?.status?.long === "Finished" ? 'FINAL' : `${new Date(game?.date?.start).toLocaleTimeString()}`}</Typography>

        </div>
        <label className="visitors-team">
          {
            userSelected ?
              <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.visitors.id} checked={userSelected === Number(game?.teams?.visitors.id).toString()} required />
              :
              <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.visitors.id} required />
          }
          <Tooltip style={isSubmitted ? { cursor: "not-allowed" } : { cursor: "pointer" }} title={isSubmitted ? `Parlay already submitted` : `Pick ${game?.teams?.visitors.code} as winning team`}>
            <img className="team-img" src={game?.teams?.visitors.logo} alt={game?.teams?.home?.name} />
          </Tooltip>
          <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "bold", fontStyle: 'italic' }} variant="subtitle">{game?.teams?.visitors.code}</Typography>
          <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "light", m: 1 }} variant="subtitle">{game?.teams?.visitors.name}</Typography>
        </label>
        <Typography variant="h5">{game?.scores?.visitors?.points}</Typography>
      </div>
    )
    :
    (
      game && game.gameWinner ?
        <div className="game-card" style={game.gameWinner && (Number(game.userPick) !== game.gameWinner) ? { backgroundColor: "rgba(255, 0, 0, 0.488)" } : { backgroundColor: "rgba(0, 255, 4, 0.401)" }}>
          {game?.scores?.home?.points &&
            <Typography variant="h5">{game.scores.home.points}</Typography>
          }
          <label className="home-team">
            {
              userSelected ?
                <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.home.id} checked={userSelected === Number(game?.teams?.home.id).toString()} required />
                :
                <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.home?.id} required />
            }
            <Tooltip style={isSubmitted ? { cursor: "not-allowed" } : { cursor: "pointer" }} title={isSubmitted ? `Parlay already submitted` : `Pick ${game?.teams?.home.code} as winning team`}>
              <img className="team-img" src={game?.teams?.home.logo} alt={game?.teams?.home?.name} />
            </Tooltip>
            <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "bold", fontStyle: 'italic' }} variant="subtitle">{game?.teams?.home.code}</Typography>
            <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "light", m: 1 }} variant="subtitle">{game?.teams?.home.name}</Typography>
          </label>
          <div className='versus-container'>
            <Typography sx={{ textAlign: "center", color: "grey" }} variant="body">@</Typography>
            {game.gameWinner && <div>

              {
                game.gameWinner && (Number(game.userPick) !== game.gameWinner) ?
                  <Typography sx={{ color: "red" }} variant="body1">YOU LOSE</Typography>
                  :
                  <Typography sx={{ color: "green" }} variant="body1">YOU WIN</Typography>
              }
            </div>}
            <Typography sx={{ textAlign: "center", color: "grey" }} variant="body">{game?.status?.long === "Finished" ? 'FINAL' : `${new Date(game?.date?.start).toLocaleTimeString()}`}</Typography>

          </div>
          <label className="visitors-team">
            {
              userSelected ?
                <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.visitors.id} checked={userSelected === Number(game?.teams?.visitors.id).toString()} required />
                :
                <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.visitors.id} required />
            }
            <Tooltip style={isSubmitted ? { cursor: "not-allowed" } : { cursor: "pointer" }} title={isSubmitted ? `Parlay already submitted` : `Pick ${game?.teams?.visitors.code} as winning team`}>
              <img className="team-img" src={game?.teams?.visitors.logo} alt={game?.teams?.visitors?.name} />
            </Tooltip>
            <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "bold", fontStyle: 'italic' }} variant="subtitle">{game?.teams?.visitors.code}</Typography>
            <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "light", m: 1 }} variant="subtitle">{game?.teams?.visitors.name}</Typography>
          </label>
          <Typography variant="h5">{game?.scores?.visitors?.points}</Typography>
        </div>
        :
        game &&
        <div className="game-card">
          {game?.scores?.home?.points &&
            <Typography variant="h5">{game.scores.home.points}</Typography>
          }
          <label className="home-team">
            {
              userSelected ?
                <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.home.id} checked={userSelected === Number(game?.teams?.home.id).toString()} required />
                :
                <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.home?.id} required />
            }
            <Tooltip style={isSubmitted ? { cursor: "not-allowed" } : { cursor: "pointer" }} title={isSubmitted ? `Parlay already submitted` : `Pick ${game?.teams?.home.code} as winning team`}>
              <img className="team-img" src={game?.teams?.home.logo} alt={game?.teams?.home?.name} />
            </Tooltip>
            <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "bold", fontStyle: 'italic' }} variant="subtitle">{game?.teams?.home.code}</Typography>
            <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "light", m: 1 }} variant="subtitle">{game?.teams?.home.name}</Typography>
          </label>
          <div className='versus-container'>
            <Typography sx={{ textAlign: "center", color: "grey" }} variant="body">@</Typography>
            {game.gameWinner && <div>

              {
                game.gameWinner && (Number(game.userPick) !== game.gameWinner) ?
                  <Typography sx={{ color: "red" }} variant="body1">YOU LOSE</Typography>
                  :
                  <Typography sx={{ color: "green" }} variant="body1">YOU WIN</Typography>
              }
            </div>}
            <Typography sx={{ textAlign: "center", color: "grey" }} variant="body">{game?.status?.long === "Finished" ? 'FINAL' : `${new Date(game?.date?.start).toLocaleTimeString()}`}</Typography>

          </div>
          <label className="visitors-team">
            {
              userSelected ?
                <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.visitors.id} checked={userSelected === Number(game?.teams?.visitors.id).toString()} required />
                :
                <input onChange={handleonRadioChange} disabled={isSubmitted} type="radio" name={game.id} value={game?.teams?.visitors.id} required />
            }
            <Tooltip style={isSubmitted ? { cursor: "not-allowed" } : { cursor: "pointer" }} title={isSubmitted ? `Parlay already submitted` : `Pick ${game?.teams?.visitors.code} as winning team`}>
              <img className="team-img" src={game?.teams?.visitors.logo} alt={game?.team?.visitors?.name} />
            </Tooltip>
            <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "bold", fontStyle: 'italic' }} variant="subtitle">{game?.teams?.visitors.code}</Typography>
            <Typography sx={{ fontSize: "14px", textAlign: "center", fontWeight: "light", m: 1 }} variant="subtitle">{game?.teams?.visitors.name}</Typography>
          </label>
          <Typography variant="h5">{game?.scores?.visitors?.points}</Typography>
        </div>
    )

}

export default Game