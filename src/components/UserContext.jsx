import React, { createContext, useContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Custom hook to consume the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider component to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
