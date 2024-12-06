import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.scss"; // Add your styles for GovernorLogin here

const GovernorLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post("/api/Governor/loginGovernor", {
        Username: username,
        Password: password,
      });

      if (response.status === 200) {
        const governorId = response.data.id;
        navigate(`/GovernorHomePage/${governorId}`); // Redirect to Governor Dashboard
      }
    } catch (error) {
      // Handle errors and display appropriate message
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("Governor not found. Please check your username.");
        } else if (error.response.status === 401) {
          setErrorMessage("Invalid credentials. Please try again.");
        } else {
          setErrorMessage(
            error.response.data.error || "An error occurred during login."
          );
        }
      } else {
        setErrorMessage("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="governor-login-page">
      <div className="login-box">
        <h2 className="login-title">Governor Login</h2>
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

export default GovernorLogin;
