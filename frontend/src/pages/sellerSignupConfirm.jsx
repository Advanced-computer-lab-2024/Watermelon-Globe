import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material"; // Import Alert for error and success messages
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
const SellerSignupConfirm = () => {
  const [idProof, setIdProof] = useState(null);
  const [taxationRegistryCard, setTaxationRegistryCard] = useState(null);
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.name === "idProof") {
      setIdProof(e.target.files[0]);
    } else if (e.target.name === "taxationRegistryCard") {
      setTaxationRegistryCard(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // Check if both files are uploaded
    if (!idProof || !taxationRegistryCard) {
      setError("Both ID Proof and Taxation Registry Card are required!");
      setSuccess(""); // Clear any success message
      return; // Prevent form submission if files are missing
    }

    // Reset error state if files are valid
    setError("");
    setSuccess(""); // Clear previous success message

    const formData = new FormData();
    formData.append("idProof", idProof);
    formData.append("taxationRegistryCard", taxationRegistryCard);

    try {
      const response = await fetch(`/api/upload/seller/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(
          "Documents uploaded successfully. Please wait for admin review and approval."
        );
        //navigate("/");
      } else {
        setError("Failed to upload documents. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        "There was an issue uploading your documents. Please try again."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Document Upload for Seller Registration</h3>
      <p style={styles.text}>
        To complete your seller registration, please upload the required
        documents. Once uploaded, your documents will be reviewed by our admin
        team. You will receive a notification once your account has been
        approved and you can access the system.
      </p>

      {/* Error Alert for missing files */}
      {error && (
        <Alert severity="error" style={styles.alert}>
          {error}
        </Alert>
      )}

      {/* Success Alert after successful upload */}
      {success && (
        <Alert severity="success" style={styles.alert}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleUpload}>
        <label style={styles.label}>ID Proof:</label>
        <input
          type="file"
          name="idProof"
          onChange={handleFileChange}
          style={styles.input}
        />
        <br />
        <label style={styles.label}>Taxation Registry Card:</label>
        <input
          type="file"
          name="taxationRegistryCard"
          onChange={handleFileChange}
          style={styles.input}
        />
        <br />
        <Button
          type="submit"
          style={styles.button}
          startIcon={<CloudUploadIcon sx={{ color: "#fff" }} />} // Adding the icon to the button
        >
          Upload Documents
        </Button>
      </form>

      <p style={styles.infoText}>
        After your documents are uploaded, please wait for the admin approval
        process. You will be notified when you have been granted access to the
        system. Thank you for your patience!
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "0 auto",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f9fafb",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#91c297",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    color: "#d32e65",
    fontWeight: "bold",
  },
  input: {
    padding: "8px",
    margin: "10px 0",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#91c297",
    color: "#fff",
    padding: "12px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  infoText: {
    fontSize: "14px",
    color: "#777",
    marginTop: "20px",
    textAlign: "center",
  },
  alert: {
    marginBottom: "20px", // Space between alert and form
  },
};

export default SellerSignupConfirm;
