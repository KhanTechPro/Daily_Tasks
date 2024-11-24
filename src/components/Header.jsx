import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import AuthContext for dynamic buttons

const Header = () => {
  const { accessToken, logout } = useContext(AuthContext); // Access token and logout function

  return (
    <header className="max-w-[1024px] mx-auto p-4 flex justify-between items-center border-b-2">
      {/* Logo / Title */}
      <Link to="/" aria-label="Home">
        <h1 className="text-2xl font-bold text-gray-800">🎯 Daily Tasks</h1>
      </Link>

      {/* Navigation Links */}
      <div>
        {accessToken ? (
          // Show Logout button if the user is signed in
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            aria-label="Sign out"
          >
            Sign-out
          </button>
        ) : (
          // Show Sign-in button if the user is not signed in
          <Link
            to="/sign"
            className="bg-black text-white px-4 py-2 rounded-md"
            aria-label="Sign in"
          >
            Sign-in
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
