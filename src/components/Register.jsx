import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Register() {
  const userRef = useRef(null);
  const errRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, username, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validMatch) {
      setErrMsg("Passwords do not match. Please check and try again.");
      return;
    }
    try {
      const response = await fetch("/accounts/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password: pwd }),
      });

      if (response.ok) {
        setSuccess(true);
        navigate("/signin");
      } else {
        setErrMsg("Registration error. Please try again.");
      }
    } catch (error) {
      setErrMsg("Network error! Please try again.");
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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
              disabled={!validMatch}
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
