import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.scss"; // Updated styles
import { Star, ChevronDown, Eye, EyeOff } from "lucide-react";

const AllLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Tourist"); // Default user type
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
            navigate(`/advertiser/${userId}`);
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

  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedType, setIsFocusedType] = useState(false);
  return (
    <div className="all-login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="userType"
              // className="login-label"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                color: "#555",
                marginBottom: "8px",
                transition: "color 0.3s ease",
              }}
            >
              User Type:
            </label>
            <div style={{ position: "relative" }}>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                //className="login-select"
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 16px",
                  backgroundColor: "white",
                  border: `2px solid #ccc`,

                  borderRadius: "8px",
                  fontSize: "16px",
                  appearance: "none",
                }}
              >
                <option value="Tourist">Tourist</option>
                <option value="Seller">Seller</option>
                <option value="Admin">Admin</option>
                <option value="Governor">Governor</option>
                <option value="TourGuide">Tour Guide</option>
                <option value="Advertiser">Advertiser</option>
              </select>
              <ChevronDown
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                  height: "20px",
                  color: "#9CA3AF",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
          {/* <label htmlFor="username" className="login-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          /> */}

          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: isFocused ? "#d32e65" : "#555", // Change label color on focus
              marginBottom: "8px",
              transition: "color 0.3s ease",
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              width: "100%",
              height: "48px",
              padding: "0 16px",
              backgroundColor: "white",
              border: `2px solid ${isFocused ? "#d32e65" : "#ccc"}`,
              borderRadius: "8px",
              fontSize: "16px",
              transition: "border-color 0.3s ease",
            }}
            placeholder="Enter username"
          />
          <div />

          {/* <label htmlFor="password" className="login-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          /> */}

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                color: isFocusedPassword ? "#d32e65" : "#555",
                marginBottom: "8px",
                transition: "color 0.3s ease",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 16px",
                  backgroundColor: "#f6d8e576",
                  border: `2px solid ${
                    isFocusedPassword ? "#d32e65" : "white"
                  }`,
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.3s ease",
                }}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#d32e65",
                }}
              >
                {showPassword ? (
                  <EyeOff style={{ width: "20px", height: "20px" }} />
                ) : (
                  <Eye style={{ width: "20px", height: "20px" }} />
                )}
              </button>
            </div>
          </div>

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

            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#4B5563",
              }}
            >
              Can't sign in?{" "}
              <a
                href="/tourist-signup"
                style={{
                  color: "#d32e65",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Forgot Password
              </a>
            </p>
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AllLogin;
