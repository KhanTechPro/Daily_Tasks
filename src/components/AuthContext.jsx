import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const [accessToken, setAccessToken] = useState(
  //   localStorage.getItem("jwtToken") || ""
  // );

  // // Save token to localStorage whenever it updates
  // useEffect(() => {
  //   if (accessToken) {
  //     localStorage.setItem("jwtToken", accessToken);
  //   } else {
  //     localStorage.removeItem("jwtToken");
  //   }
  // }, [accessToken]);

  // const logout = () => {
  //   setAccessToken("");
  //   localStorage.removeItem("jwtToken");
  // };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
