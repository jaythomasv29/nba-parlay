import { Button, Grid, TextField, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
const DEFAULT_REGISTRATION_FORM = {
  email: "",
  password: "",
  confirmPassword: "",
}
const Register = () => {
  const classes = useStyles()
  const [registerFormFields, setRegisterFormFields] = useState(DEFAULT_REGISTRATION_FORM)
  const [errors, setErrors] = useState("")
  const navigate = useNavigate();
  const { register } = useContext(AuthContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRegisterFormFields({
      ...registerFormFields,
      [name]: value
    })
  }

  const handleRegisterUser = async (e) => {
    e.preventDefault()
    if (registerFormFields.password !== registerFormFields.confirmPassword) {
      setErrors("Password must match")
      return;
    }
    try {
      const response = await register(registerFormFields)
      // If user is created successfully in database
      if (response.status === 201) {
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
      <Typography sx={{ textAlign: "center", m: 2 }} variant='h6'>Register</Typography>
      {
        errors &&
        <Typography variant="body" sx={{ textAlign: "center", color: "red" }} value={errors}>{errors}</Typography>
      }
      <form onSubmit={handleRegisterUser} className={classes.root}>

        <TextField onChange={handleInputChange} value={registerFormFields.email} label="Email" variant="filled" name="email" type="email" required autoComplete='off'/>
        <TextField onChange={handleInputChange} value={registerFormFields.password} label="Password" variant="filled" name="password" type="password" required />
        <TextField onChange={handleInputChange} value={registerFormFields.confirmPassword} label="Confirm password" variant="filled" name="confirmPassword" type="password" required />
        <Link className="link" to="/login"><Typography sx={{ color: "#1976D2" }}>Already have an account?</Typography></Link>
        <Button type="submit" variant="contained">Register</Button>
      </form>
    </Grid>
  )
}

export default Register