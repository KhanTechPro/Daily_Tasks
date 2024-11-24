import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useUser } from "./UserContext"; // Context for global user state

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for submit
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access setUser from context

  // Reset error message when input changes
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    if (!email || !password) {
      setErrMsg("Please fill in both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/accounts/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User Data:", userData); // Debugging

        // Save tokens in localStorage
        localStorage.setItem("authToken", userData.access); // Access token
        localStorage.setItem("refreshToken", userData.refresh); // Refresh token (if available)

        // Set user context
        setUser({
          email: userData.email, // Adjust based on API response
          token: userData.access,
        });

        // Navigate to the next page
        navigate("/navbar");
      } else {
        const data = await response.json();
        setErrMsg(
          data?.detail || "Sign-in error. Please check your credentials."
        );
      }
    } catch (error) {
      setErrMsg("Network error! Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-[1024px] md:w-[550px] md:h-[320px] mx-auto relative md:top-[100px] p-10 m-6 border-2 rounded-md">
        <h2 className="md:text-3xl font-regular">Sign in</h2>
        <p className="py-2">Nice to meet you! Enter your email to log in.</p>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col relative top-4">
          <label htmlFor="email" className="mt-4">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="border-2 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="mt-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border-2 p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-center my-8">
            <button
              type="submit"
              className="bg-black text-white px-10 py-2 rounded-md font-Kanit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Sign;
