import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserProvider, useUser } from "./components/UserContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sign from "./components/Sign";
import DailyChallenge from "./components/DailyChellenge";
import WeeklyChallenge from "./components/WeeklyChellenge";
import MonthlyChallenge from "./components/MonthlyChallenge";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

const AppContent = () => {
  const { user } = useUser();
  const location = useLocation();

  // Only show the Navbar if the user is logged in and not on the /sign route
  const showNavbar = user && location.pathname !== "/sign";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/hero" element={<Hero />} />
        <Route path="/sign" element={<PublicRoute element={<Sign />} />} />

        {/* Default route: Redirect based on user login status */}
        <Route
          path="/"
          element={<Navigate to={user ? "/navbar" : "/sign"} replace />}
        />
      </Routes>
    </>
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
  return user ? <Navigate to="/navbar" /> : element;
};

export default App;
