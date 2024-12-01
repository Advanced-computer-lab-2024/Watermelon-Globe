import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

const ChangePasswordGovernor = () => {
  const { id } = useParams(); // Governor ID from the URL
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/Governor/changePasswordGovernor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword, newPasswordConfirmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to change password.");
        setSuccessMessage("");
      } else {
        setSuccessMessage("Password changed successfully!");
        setErrorMessage("");
        setOldPassword("");
        setNewPassword("");
        setNewPasswordConfirmed("");
      }
    } catch (error) {
      setErrorMessage("An error occurred: " + error.message);
      setSuccessMessage("");
    }
  };

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
  };

  const mainContentStyle = {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block",
    width: "100%",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <Sidebar id={id} />
      <div style={mainContentStyle}>
        <Navbar />
        <div style={cardStyle}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Change Password
          </h2>
          <form onSubmit={handleChangePassword}>
            <label>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={inputStyle}
              required
            />

            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={inputStyle}
              required
            />

            <label>Confirm New Password:</label>
            <input
              type="password"
              value={newPasswordConfirmed}
              onChange={(e) => setNewPasswordConfirmed(e.target.value)}
              style={inputStyle}
              required
            />

            <button type="submit" style={buttonStyle}>
              Change Password
            </button>
          </form>

          {successMessage && (
            <p style={{ color: "green", marginTop: "15px" }}>
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p style={{ color: "red", marginTop: "15px" }}>{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordGovernor;
