import React, { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// Custom hook for consuming the context
export const useUser = () => useContext(UserContext);

// Context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    accessToken: null,
    refreshToken: null,
    username: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
