import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.scss"; // Updated styles

const AllLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Tourist"); // Default user type
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const endpoint = `/api/login/login`; // Common API endpoint for all user types

      const response = await axios.post(
        endpoint,
        {
          username: username,
          password: password,
          userType: userType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const userId = response.data.id;

        // Redirect based on user type
        switch (userType) {
          case "Tourist":
            navigate(`/MainTouristPage/${userId}`);
            break;
          case "Seller":
            navigate(`/SellerHome/${userId}`);
            break;
          case "Admin":
            navigate(`/AdminSales/${userId}`);
            break;
          case "Governor":
            navigate(`/GovernorHomePage/${userId}`);
            break;
          case "TourGuide":
            navigate(`/TourguideHome/${userId}`);
            break;
          case "Advertiser":
            navigate(`/AdvertiserPage/${userId}`);
            break;
          default:
            setErrorMessage("Invalid user type selected.");
        }
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || "An error occurred during login."
      );
    }
  };

  const handleBackClick = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="all-login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="userType" className="login-label">
            User Type:
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="login-select"
          >
            <option value="Tourist">Tourist</option>
            <option value="Seller">Seller</option>
            <option value="Admin">Admin</option>
            <option value="Governor">Governor</option>
            <option value="TourGuide">Tour Guide</option>
            <option value="Advertiser">Advertiser</option>
          </select>

          <label htmlFor="username" className="login-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />

          <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          <div className="button-group">
            <button type="submit" className="login-button">
              Login
            </button>
            <button
              type="button"
              className="back-button"
              onClick={handleBackClick}
            >
              Back
            </button>
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AllLogin;
