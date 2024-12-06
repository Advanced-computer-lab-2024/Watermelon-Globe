import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./tourist.scss"; // Add your styles for TouristLogin here

const TouristLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/Tourist/loginTourist", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const touristId = response.data.id;
        navigate(`/MainTouristPage/${touristId}`); // Corrected URL format
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "An error occurred during login."
      );
    }
  };

  return (
    <div className="governor-login-page"> {/* Updated class name */}
      <div className="login-box">
        <h2 className="login-title">Tourist Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="username" className="login-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default TouristLogin;
