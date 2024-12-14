// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const TourguideSignupConfirm = () => {
//     const [idProof, setIdProof] = useState(null);
//     const [certificates, setCertificates] = useState([]);
//     const {id} = useParams();
//     const navigate = useNavigate();

//     const handleFileChange = (e) => {
//         if (e.target.name === "idProof") {
//             setIdProof(e.target.files[0]);
//         } else if (e.target.name === "certificates") {
//             setCertificates(Array.from(e.target.files));
//         }
//     };

//     const handleUpload = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("idProof", idProof);
//         certificates.forEach((file, index) => {
//             formData.append("certificates", file);
//         });

//         const response = await fetch(`/api/upload/tourguide/${id}`, {
//             method: 'POST',
//             body: formData
//         });

//         if (response.ok) {
//             alert("Documents uploaded. Please wait for approval.");
//             navigate('/');
//         } else {
//             alert("Failed to upload documents.");
//         }
//     };

//     return (
//         <form onSubmit={handleUpload}>
//             <h3>Upload Required Documents</h3>
//             <label>ID Proof:
//                 <input type="file" name="idProof" onChange={handleFileChange} />
//             </label>
//             <label>Certificates (up to 5):
//                 <input type="file" name="certificates" multiple onChange={handleFileChange} />
//             </label>
//             <button type="submit">Upload Documents</button>
//         </form>
//     );
// }

// export default TourguideSignupConfirm;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import GuestNavbarRegister from "Components/GuestNavBar";
const AdvertiserSignupConfirm = () => {
  const [idProof, setIdProof] = useState(null);
  const [certificateInputs, setCertificateInputs] = useState([
    { id: 0, file: null },
  ]); // Tracks dynamic inputs
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (e, inputIndex) => {
    const { name, files } = e.target;

    if (name === "idProof") {
      setIdProof(files[0]);
    } else if (name.startsWith("certificate")) {
      // Update specific certificate input
      const newInputs = certificateInputs.map((input, index) =>
        index === inputIndex ? { ...input, file: files[0] } : input
      );
      setCertificateInputs(newInputs);
    }
  };

  const addCertificateInput = () => {
    // Only add new input if there are fewer than 5 certificates
    if (certificateInputs.length < 5) {
      setCertificateInputs([
        ...certificateInputs,
        { id: certificateInputs.length, file: null },
      ]);
    } else {
      setError("You can upload a maximum of 5 certificates.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!idProof || certificateInputs.every((input) => !input.file)) {
      setError("Both ID Proof and at least one Certificate are required!");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("idProof", idProof);

    certificateInputs.forEach((input, index) => {
      if (input.file) {
        formData.append(`certificates`, input.file);
      }
    });

    try {
      const response = await fetch(`/api/upload/tourguide/${id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(
          "Documents uploaded successfully. Please wait for admin review."
        );
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
      <GuestNavbarRegister />
      <h3 style={styles.title}>Document Upload for Tour Guide Registration</h3>
      <p style={styles.text}>
        To complete your tour guide registration, please upload the required
        documents. Once uploaded, your documents will be reviewed by our admin
        team. You will receive a notification once your account has been
        approved and you can access the system.
      </p>

      {error && (
        <Alert severity="error" style={styles.alert}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" style={styles.alert}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleUpload}>
        {/* ID Proof Input */}
        <label style={styles.label}>ID Proof:</label>
        <input
          type="file"
          name="idProof"
          onChange={handleFileChange}
          style={styles.input}
        />
        <br />

        {/* Dynamic Certificate Inputs */}
        <label style={styles.label}>Certificates (multiple allowed):</label>
        {certificateInputs.map((input, index) => (
          <div key={input.id} style={{ marginBottom: "10px" }}>
            <input
              type="file"
              name={`certificate-${index}`}
              onChange={(e) => handleFileChange(e, index)}
              style={styles.input}
            />
          </div>
        ))}

        <div>
          {/* Add New Certificate Input Button */}
          <Button
            onClick={addCertificateInput}
            style={{
              ...styles.button,
              backgroundColor: "#d32e65",
              marginBottom: "27px",
              padding: "8px 16px", // Smaller padding
              fontSize: "12px", // Smaller font size
            }}
            disabled={certificateInputs.length >= 5} // Disable if there are already 5 inputs
          >
            {certificateInputs.length >= 5
              ? "Maximum of 5 Certificates"
              : "Add Another Certificate"}
          </Button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          style={styles.button}
          startIcon={<CloudUploadIcon sx={{ color: "#fff" }} />}
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
    padding: "60px",
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
    marginBottom: "20px",
  },
};

export default AdvertiserSignupConfirm;
