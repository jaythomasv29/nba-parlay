import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../components/context/authContext';
import axios from "axios";
import Game from '../../components/Game/Game';
import { Typography } from '@mui/material';
import Chip from '@mui/joy/Chip';
import { CssVarsProvider } from '@mui/joy/styles';

const Parlay = () => {
  const { currentUser } = useContext(AuthContext)
  const [parlayDetails, setParlayDetails] = useState({})
  const params = useParams()

  useEffect(() => {
    const getParlayById = async () => {
      const response = await axios.get(`/games/parlays/${currentUser._id}/${params.parlayId}`)
      console.log(response.data)
      setParlayDetails(response.data)
    }
    getParlayById()
  }, [params.parlayId, currentUser._id])

  console.log("shit")
  return (
    <div>
      <Chip color="neutral" sx={{ my: 1 }}>Ticket #: {parlayDetails._id}</Chip>
      {
        // parlayDetails.isCompleteParlayWinner && Object.values(parlayDetails.status) parlayDetails != null && 
        // <Typography>You are {parlayDetails.isCompleteParlayWinner ? `a winner!` : `not a winner`}</Typography>
        parlayDetails.parlay != null &&
          Object.values(parlayDetails?.parlay).some(game => game.scores.home.points === null && game.scores.visitors.points === null) ?
          <CssVarsProvider>
            <Chip sx={{ my: 1, ml: 1 }}>Parlay in progress</Chip>
          </CssVarsProvider>
          :
          parlayDetails.parlay != null &&
          <CssVarsProvider>

            <Chip color="success" sx={{ my: 1, ml: 1 }}>Parlay completed</Chip>
            <Chip sx={{ my: 1, ml: 1, backgroundColor: "grey" }}>Wins: {parlayDetails.partialWins} /  {Object.keys(parlayDetails.parlay).length} </Chip>
            <Chip sx={{ my: 1, ml: 1 }}>Total: {Object.keys(parlayDetails.parlay).length}</Chip>
          </CssVarsProvider>
      }
      {
        parlayDetails.parlay != null &&
        Object.keys(parlayDetails?.parlay).map(gameId => {
          return <Game key={gameId} game={parlayDetails?.parlay[gameId]} isSubmitted={true} userSelected={parlayDetails?.parlay[gameId].userPick} />
        })
      }
      {
        parlayDetails.parlay != null &&
        !Object.values(parlayDetails?.parlay).some(game => game.scores.home.points === null && game.scores.visitors.points === null) &&
        <>
          {
            parlayDetails?.isCompleteParlayWinner ?
              <Typography sx={{ textAlign: "center", m: 2 }}>Congrats You Won!</Typography>
              :
              <Typography sx={{ textAlign: "center", m: 2 }}>Better Luck Next Time...</Typography>
          }
        </>
      }
    </div>
  )
}

export default Parlay