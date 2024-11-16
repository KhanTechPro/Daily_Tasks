import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./components/UserContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sign from "./components/Sign";
import DailyChallenge from "./components/DailyChellenge";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <UserProvider>
      <NavbarWrapper />
      <Routes>
        <Route index path="/hero" element={<Hero />} />
        {/* Redirect default route */}
        <Route path="/" element={<Navigate to="/sign" />} />
        <Route path="/sign" element={<PublicRoute element={<Sign />} />} />
        <Route
          path="/toDoList"
          element={<PrivateRoute element={<ToDoList />} />}
        />
      </Routes>
    </UserProvider>
  );
}

const NavbarWrapper = () => {
  const { user } = useUser();
  return (
    <Navbar
      username={user ? user.username : "Guest"}
      email={user ? user.email : "guest@example.com"}
    />
  );
};

// PrivateRoute: Protects private pages
const PrivateRoute = ({ element }) => {
  const { user } = useUser();
  return user ? element : <Navigate to="/sign" />;
};

// PublicRoute: Prevents logged-in users from accessing public pages
const PublicRoute = ({ element }) => {
  const { user } = useUser();
  return user ? <Navigate to="/toDoList" /> : element;
};

export default App;
