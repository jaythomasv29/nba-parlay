import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../components/context/authContext"
import axios from "axios";
import { Box, List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import "./ParlayHistory.scss"

const ParlayHistory = () => {
  const params = useParams();
  const location = useLocation()
  console.log(location)
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  const [userParlays, setUserParlays] = useState([])
  useEffect(() => {
    const getUserParlays = async () => {
      const response = await axios.get(`games/parlays/${currentUser._id}`)
      setUserParlays(response.data)
    }
    getUserParlays();
  }, [])
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
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >

            {userParlays && userParlays.map((parlay) => (
              <div key={parlay._id}>
                <ListSubheader sx={{ cursor: "pointer", "&:hover": { backgroundColor: "lightBlue" } }}><Link className="nav-link" to={`/parlays/${parlay._id}`}>{`${new Date(parlay.createdAt).toDateString()}`}</Link></ListSubheader>
              </div>
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