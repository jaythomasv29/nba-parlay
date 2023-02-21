import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../components/context/authContext"
import axios from "axios";
import { Box, List, ListSubheader, Typography } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import "./ParlayHistory.scss"

const ParlayHistory = () => {
  const location = useLocation()
  const { currentUser } = useContext(AuthContext);
  const [userParlays, setUserParlays] = useState([])
  useEffect(() => {
    const getUserParlays = async () => {
      const response = await axios.get(`games/parlays/${currentUser._id}`)
      setUserParlays(response.data)
    }
    getUserParlays();
  }, [currentUser._id])
  return (
    <div>
      <div className='parlay-title-container'>
        <Typography sx={{ textAlign: "center" }} variant="h5">My Parlay History</Typography>
        <Box>

          <Typography sx={{ padding: 2 }} variant="subtitle">Parlay Submissions:</Typography>
          <List
            sx={{
              width: '100%',
              maxWidth: 160,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              ml: 1,
              my: 1,
              '& li': { padding: 0 },
            }}
            subheader={<li />}
          >

            {userParlays && userParlays.map((parlay) => (
              <Link className=" nav-link" to={`/parlays/${parlay._id}`} key={parlay._id}>
                <ListSubheader sx={{ fontSize: "12px", border: "1px solid lightsmoke", m: 0.5, cursor: "pointer", "&:hover": { backgroundColor: "lightBlue" } }}>{`${new Date(parlay.createdAt).toDateString()}`}
                </ListSubheader>
              </Link>
            ))}
          </List>
        </Box>
      </div>
      <div className='parlay-body'>
          {
            location.pathname === "/parlays" &&
        <Box sx={{ p: 12, border: "1px solid #98c2ec24", boxShadow: 1}}>
          <Typography sx={{color: "#72afeb" }} variant="body1">Click on a parlay to check if you are a winner!</Typography>
          </Box>
          }
        <Outlet />
      </div>
    </div>
  )
}

export default ParlayHistory;