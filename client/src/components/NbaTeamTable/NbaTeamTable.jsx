import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';



import "./NbaTeamTable.scss"

const NbaTeamTable = ({ stats }) => {



  return (
    <div className='table-scrollable'>


      <TableContainer component={Paper}>
        {
          stats.teamStats &&

          <Table size="small" aria-label="nba team stats table">
            <TableHead>
              <TableRow key={`${uuidv4()}`}>
                {
                  Object.keys(stats?.teamStats[0]?.stats).map((key, idx) => {
                    if (idx == 0) {
                      return (
                        <React.Fragment key={`${uuidv4()}z`}>
                          <TableCell className="font-xs" key={`${uuidv4()}a`}>{"season"}</TableCell>
                          <TableCell className="font-xs" key={`${uuidv4()}b`}>{key}</TableCell>
                        </React.Fragment>)
                    } else {
                      return <TableCell className="font-xs" key={`${uuidv4()}c`} align="right">{key}</TableCell>
                    }
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                stats?.teamStats.map(({ season, stats }) => {

                  return <TableRow key={`${uuidv4()}d`}>
                    {

                      Object.values(stats)?.map((statLine, idx) => {
                        if (idx == 0) {
                          return (<React.Fragment key={`${uuidv4()}e`}>
                            <TableCell key={`${uuidv4()}e`}>{season}</TableCell>
                            <TableCell key={`${uuidv4()}g`} align="right">{statLine}</TableCell>
                          </React.Fragment>)
                        } else {
                          return <TableCell key={`${uuidv4()}h`} align="right">{statLine}</TableCell>

                        }

                      })
                    }

                  </TableRow>
                })
              }
            </TableBody>

          </Table>
        }
      </TableContainer>
    </div>
  )
}

export default NbaTeamTable