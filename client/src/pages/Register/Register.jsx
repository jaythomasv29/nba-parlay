import { Button, Grid, TextField, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));
const DEFAULT_REGISTRATION_FORM = {
  email: "",
  password: ""
}
const Register = () => {
  
  const classes = useStyles()
  const [registerFormFields, setRegisterFormFields] = useState(DEFAULT_REGISTRATION_FORM)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRegisterFormFields({
      ...registerFormFields,
      [name]: value
    })
  }

  const handleRegisterUser = async (e) => {
    e.preventDefault() 
    try {
      const response = await axios.post("/auth/register", registerFormFields)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
    
  }
  console.log(registerFormFields)

  return (
    <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Typography sx={{ textAlign: "center", m: 2 }} variant='h4'>Welcome to NBA Parlay</Typography>
      <Typography sx={{ textAlign: "center", m: 2 }} variant='h6'>Register</Typography>
      <form onSubmit={handleRegisterUser}className={classes.root}>
        <TextField onChange={handleInputChange} label="Email" variant="filled" name="email" type="email" required />
        <TextField onChange={handleInputChange} label="Password" variant="filled" name="password" type="password" required />
        <Link className="link" to="/login"><Typography sx={{ color: "#1976D2" }}>Already have an account?</Typography></Link>
        <Button type="submit" variant="contained">Register</Button>
      </form>
    </Grid>
  )
}

export default Register