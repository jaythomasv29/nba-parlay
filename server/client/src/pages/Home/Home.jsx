import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import teams from "../../teams.js";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="App">
     <Outlet />
      </div>
    </>
  )
}

export default Home