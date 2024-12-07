import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./homeSeller.scss";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Email:", email); // Log email to debug
    console.log("Password:", password); // Log password to debug

    try {
      const response = await axios.post(
        "/api/Seller/loginSeller",
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const sellerId = response.data.id;
        navigate(`/SellerHome/${sellerId}`); // Redirect to Seller Product page with seller ID
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
    <div className="seller-login-page">
      <div className="seller-login-box">
      <h2 className="login-title">Seller Login</h2>
        <form className="seller-login-form" onSubmit={handleLogin}>
        <label htmlFor="email" className="login-label">
            Username:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
          />

          <button type="submit" className="seller-login-btn">
            Login
          </button>
        </form>

        {errorMessage && (
          <p className="error-message" style={{ color: "red", marginTop: "10px" }}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerLogin;
