//for seller

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const { userId } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAcceptChange = () => {
    setAccepted(!accepted);
  };

  const handleProceed = async () => {
    if (!accepted) {
      alert("Please accept the terms and conditions to proceed.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `/api/Seller/acceptTermsAndConditions/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accepted: true, timestamp: new Date() }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to accept terms");
      }

      const data = await response.json();
      //alert("Thank you for accepting the terms and conditions!");
      console.log("API response:", data);

      // Redirect to a new page (e.g., seller dashboard or homepage) after accepting terms
      navigate(`/SellerSignupConfirm/${userId}`); // Replace with your target path
      //navigate(`/SellerPage/${sellerId}`); // Replace with your target path
    } catch (error) {
      console.error("Error:", error);
      alert("There was a problem accepting the terms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/document.png"
            alt="terms-icon"
            style={styles.icon}
          />
          <h2 style={styles.title}>TERMS OF SERVICE</h2>
        </div>
        <div style={styles.content}>
          <p>
            This summary is provided only for convenience. Please review the
            Terms of Service below in their entirety for important information
            and legal conditions that apply to your use of the Platform.
          </p>
          <h3 style={styles.subheading}>YOUR POSTING OF USER CONTENT</h3>
          <p>
            "User Content" means content that Users have created and posted to
            the Platform for other Users to view and comment on. You represent
            and warrant that you own the User Content you post to the Platform.
          </p>
        </div>

        <div style={styles.actions}>
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={accepted}
              onChange={handleAcceptChange}
              style={styles.checkbox}
            />
            <label style={styles.label}>
              I have read and agree to the terms and conditions
            </label>
          </div>
          <div style={styles.buttonContainer}>
            <button
              style={accepted ? styles.acceptButton : styles.disabledButton}
              onClick={handleProceed}
              disabled={!accepted || loading}
            >
              {loading ? "Processing..." : "Accept"}
            </button>
            <button
              style={styles.declineButton}
              onClick={() =>
                alert(
                  "You can't access the system without accepting terms and conditions"
                )
              }
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    width: "450px",
    maxWidth: "90%",
    textAlign: "center",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
  },
  header: {
    marginBottom: "20px",
  },
  icon: {
    width: "40px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  content: {
    fontSize: "14px",
    color: "#666",
    textAlign: "left",
    overflowY: "auto",
    maxHeight: "200px",
    padding: "10px 0",
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    margin: "10px 0",
  },
  subheading: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#555",
    marginTop: "15px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "15px",
  },
  checkbox: {
    marginRight: "8px",
  },
  label: {
    fontSize: "12px",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "10px",
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    flex: 1,
    marginRight: "10px",
  },
  disabledButton: {
    backgroundColor: "#ddd",
    color: "#aaa",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    flex: 1,
    marginRight: "10px",
    cursor: "not-allowed",
  },
  declineButton: {
    backgroundColor: "#ddd",
    color: "#333",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    flex: 1,
  },
};

export default TermsAndConditions;
