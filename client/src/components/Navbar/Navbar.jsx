import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import "./Navbar.scss"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function Navbar() {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { currentUser, logout } = useContext(AuthContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    logout();
    navigate("/login")

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NBA Parlay
          </Typography>
          {auth && (
            <div className="menu-items">
              <MenuItem><Link className="nav-link" to={"/"}>Home</Link></MenuItem>
              <MenuItem><Link className="nav-link" to={"/teams"}>Teams</Link></MenuItem>
              {
                currentUser ?
                  <>
                    <MenuItem ><Link className="nav-link" to="/parlays">My Parlays</Link></MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                  :
                  <MenuItem><Link to="/login" className="nav-link">Login</Link></MenuItem>
              }
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}