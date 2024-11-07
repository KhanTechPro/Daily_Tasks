// VerifyOtp.js
import React, { useState } from "react";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/accounts/verify-otp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      if (response.ok) {
        setSuccess(true);
        // Proceed to the next step, such as redirecting to the dashboard
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      {error && <p className="error">{error}</p>}
      {success ? (
        <p>OTP verified successfully!</p>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
}

export default VerifyOtp;
