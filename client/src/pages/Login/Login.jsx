import { Button, Grid, TextField, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from '../../components/context/authContext';

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
const DEFAULT_LOGIN_FORM = {
  email: "",
  password: "",
}
const Login = () => {
  const classes = useStyles()
  const [loginFormFields, setLoginFormFields] = useState(DEFAULT_LOGIN_FORM)
  const [errors, setErrors] = useState("")
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLoginFormFields({
      ...loginFormFields,
      [name]: value
    })
  }

  const handleLoginUser = async (e) => {
    e.preventDefault()

    try {
      const response = await login(loginFormFields)
      // If user is created successfully in database
      if (response.status === 200) {
        // set user in context
        navigate("/")

      }
    } catch (err) {
      console.log(err.response.data)
      setErrors(err.response.data.message)
    }

  }

  return (
    <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <Typography sx={{ textAlign: "center", m: 2 }} variant='h4'>Welcome to NBA Parlay</Typography>
      <Typography sx={{ textAlign: "center", m: 2 }} variant='h6'>Login</Typography>
      {
        errors &&
        <Typography variant="body" sx={{ textAlign: "center", color: "red" }} value={errors}>{errors}</Typography>
      }
      <form onSubmit={handleLoginUser} className={classes.root}>

        <TextField onChange={handleInputChange} value={loginFormFields.email} label="Email" variant="filled" name="email" type="email" required autoComplete='off'/>

        <TextField onChange={handleInputChange} value={loginFormFields.password} label="Password" variant="filled" name="password" type="password" required />

        <Link className="link" to="/register"><Typography sx={{ color: "#1976D2" }}>Dont have an account?</Typography></Link>
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </Grid>
  )
}

export default Login