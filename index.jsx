import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./UserContext";
import { AuthProvider } from "./AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
