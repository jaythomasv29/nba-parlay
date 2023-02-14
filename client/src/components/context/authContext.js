import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (formInputs) => {
    console.log("Logging In");
    const response = await axios.post("/auth/login", formInputs);
    setCurrentUser(response.data);
    return response;
  }

  const register = async (formInputs) => {
    console.log("Registering user")
    const response = await axios.post("/auth/register", formInputs)
    setCurrentUser(response.data)
    return response
  }

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser))
  }, [currentUser])

  
  const value = {
    currentUser,
    login,
    register,
    logout,
    setCurrentUser
  }
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}