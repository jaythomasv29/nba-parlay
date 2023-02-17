import { Button, Card, CardActions, CardContent, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../components/context/authContext';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import "./Teams.scss"

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  useEffect(() => {
    const getNbaTeams = async () => {
      try {
        const response = await axios.get("api/teams")
        setTeams(response.data)

      } catch (err) {
        console.log(err)
      }
    }
    getNbaTeams()
  }, [])

  const isNotInFavorites = (team) => {
    // const foundTeam = currentUser?.favoriteTeams.find(t => {
    //   return t._id === team._id
    // })
    // return foundTeam === undefined
    const foundTeam = currentUser.favoriteTeams.filter(t => (t.id === team.id))
    return !foundTeam.length;
  }

  const handleAddTeam = async (team) => {
    try {
      const response = await axios.post(`api/users/addTeam/${currentUser._id}`, team)

      setCurrentUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleRemoveTeam = async (team) => {
    try {
      const response = await axios.delete(`api/users/removeTeam/${currentUser._id}`, { data: { teamId: team.id } })
      setCurrentUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <div className='title-container'>

        <h2 className="team-title">Teams</h2>
      </div>
      <div className="teams_container">
        {teams.map((team) => (

          <Card className="card" key={team.id}>
            {
              currentUser && isNotInFavorites(team) ?
                <Tooltip title="Add to favorites">
                  <AddCircleOutlineIcon onClick={() => handleAddTeam(team)} className='team-btn' />
                </Tooltip>
                :
                <Tooltip title="Click to remove">
                  {/* <AddCircleOutlineIcon onClick={() => handleAddTeam(team)} className='team-btn' /> */}
                  <CheckIcon onClick={() => handleRemoveTeam(team)} style={{ color: "green" }} className='team-btn' />
                </Tooltip>

            }
            <Link to={`/teams/${team.id}`} className="link" state={team}>
              <img src={team.logo} alt={`${team.team}_logo`} />
              <div className="card-info__container">
                <Typography variant="body" component="div">{team.name}</Typography>
                <Typography color="text.secondary">
                  {team.code}, {team.conference}
                </Typography>

              </div>
            </Link>
            <Button size="small">Explore Team</Button>
          </Card>

        ))}
      </div>
    </div>
  )
}

export default Teams