// Import necessary modules
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{6,24}$/;

function Register() {
  // Define refs and states
  const userRef = useRef(null);
  const errRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  // Set focus to username input on load
  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  // Validate username
  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  // Validate password and confirm password match
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // Clear error message when any input changes
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validName || !validPwd || !validMatch) {
      setErrMsg("Invalid entry. Please check all fields.");
      return;
    }
    try {
      const response = await fetch(
        "https://todoapi.pythonanywhere.com/api/accounts/signin/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: pwd }), // Use correct payload structure for login
        }
      );

      if (response.ok) {
        setSuccess(true);
        navigate("/signin"); // Redirect after registration
      } else {
        setErrMsg("Registration failed. Try again.");
      }
    } catch (error) {
      setErrMsg("Network error, please try again later.");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-[1024px] md:w-[550px] md:h-[500px] mx-auto relative md:top-[100px] p-10 m-6 border-2 rounded-md">
        <h2 className="md:text-3xl font-regular">Sign up</h2>
        <p className="py-2">
          Nice to meet you! Enter your details to register.
        </p>
        {errMsg && (
          <p ref={errRef} className="text-red-500">
            {errMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col relative top-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            className="border-2 p-1"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          {!validName && user && (
            <p className="text-red-500">
              4-24 characters. Must start with a letter.
            </p>
          )}

          <label htmlFor="email" className="mt-8">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="mt-8">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 p-1"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
          />
          {!validPwd && pwd && (
            <p className="text-red-500">
              6-24 chars. Must include uppercase, lowercase, and special
              character (!@#$%).
            </p>
          )}

          <label htmlFor="confirm_password" className="mt-8">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="border-2 p-1"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            required
          />
          {!validMatch && matchPwd && (
            <p className="text-red-500">Passwords must match.</p>
          )}

          <div className="flex items-center justify-center my-8">
            <button
              type="submit"
              className="bg-black text-white px-10 py-2 rounded-md font-Kanit"
              disabled={!validName || !validPwd || !validMatch}
            >
              Sign-up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
