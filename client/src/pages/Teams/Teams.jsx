import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import "./Teams.scss"

const Teams = () => {

  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const getNbaTeams = async () => {
      try {
        const response = await axios.get("/teams")
        console.log(response)
        setTeams(response.data)

      } catch (err) {
        console.log(err)
      }
    }
    getNbaTeams()
  }, [])
  return (
    <div>
      <div className='title-container'>

        <h2 className="team-title">Teams</h2>
      </div>
      <div className="teams_container">
        {teams.map((team) => (

          <Card className="card" key={team.id}>
            <Link  to={`/teams/${team.id}`} className="link" state={team}>
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