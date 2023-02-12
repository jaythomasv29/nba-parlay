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

 
  const value = {
    currentUser,
    login,
  }
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}