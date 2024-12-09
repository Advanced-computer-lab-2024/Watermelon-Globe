// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import Sidebar from "./sidebar/Sidebar";
// import Navbar from "./navbar/Navbar";

// const ChangePasswordGovernor = () => {
//   const { id } = useParams(); // Governor ID from the URL
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [newPasswordConfirmed, setNewPasswordConfirmed] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChangePassword = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`/api/Governor/changePasswordGovernor/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ oldPassword, newPassword, newPasswordConfirmed }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setErrorMessage(data.error || "Failed to change password.");
//         setSuccessMessage("");
//       } else {
//         setSuccessMessage("Password changed successfully!");
//         setErrorMessage("");
//         setOldPassword("");
//         setNewPassword("");
//         setNewPasswordConfirmed("");
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred: " + error.message);
//       setSuccessMessage("");
//     }
//   };

//   const containerStyle = {
//     display: "flex",
//     minHeight: "100vh",
//     width:"100%"
//   };

//   const mainContentStyle = {
//      flex: 1,
//     padding: "20px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     width:"100%"
//   };

//   const cardStyle = {
//     backgroundColor: "white",
//     borderRadius: "15px",
//     padding: "20px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     maxWidth: "500px",
//     width: "100%",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "15px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   };

//   const buttonStyle = {
//     backgroundColor: "#4CAF50",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     display: "block",
//     width: "100%",
//     marginTop: "10px",
//   };

//   return (
//     <div
//     style={{
//       backgroundColor: "#fff",
//       minHeight: "100vh", // Ensures it covers the full viewport
//       width: "102%", // Full width of the viewport
//       margin: 0, // Remove default margins
//       padding: 0, // Remove default padding
//       display: "flex", // Optional: for flexible alignment
//       flexDirection: "column",
//     }}
//   >
//     <div className="listAdminProduct">
//       <Sidebar />
//       <div className="listContainerAdminProduct">
//         <Navbar />
//         <div style={{ padding: "20px" }}>
//         <div style={containerStyle}>
//         <div style={mainContentStyle}>
//         <div style={cardStyle}>
//           <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//             Change Password
//           </h2>
//           <form onSubmit={handleChangePassword}>
//             <label>Old Password:</label>
//             <input
//               type="password"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//               style={inputStyle}
//               required
//             />

//             <label>New Password:</label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               style={inputStyle}
//               required
//             />

//             <label>Confirm New Password:</label>
//             <input
//               type="password"
//               value={newPasswordConfirmed}
//               onChange={(e) => setNewPasswordConfirmed(e.target.value)}
//               style={inputStyle}
//               required
//             />

//             <button type="submit" style={buttonStyle}>
//               Change Password
//             </button>
//           </form>

//           {successMessage && (
//             <p style={{ color: "green", marginTop: "15px" }}>
//               {successMessage}
//             </p>
//           )}
//           {errorMessage && (
//             <p style={{ color: "red", marginTop: "15px" }}>{errorMessage}</p>
//           )}
//         </div>
//       </div>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default ChangePasswordGovernor;

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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f3f4f6", // Subtle background color
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "40px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)", // Clean shadow
    width: "90%",
    maxWidth: "800px",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "30px",
    textAlign: "center",
    color: "#4CAF50",
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    marginTop: "20px",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  const messageStyle = {
    fontSize: "16px",
    marginTop: "20px",
    fontWeight: "500",
  };

  return (
    <div
    style={{
      backgroundColor: "#fff",
      minHeight: "100vh", // Ensures it covers the full viewport
      width: "102%", // Full width of the viewport
      margin: 0, // Remove default margins
      padding: 0, // Remove default padding
      display: "flex", // Optional: for flexible alignment
      flexDirection: "column",
    }}
  >
    <div className="listAdminProduct">
      <Sidebar />
      <div className="listContainerAdminProduct">
        <Navbar />
        <div style={{ padding: "20px" }}>
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Change Password</h2>
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

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Change Password
          </button>
        </form>

        {successMessage && (
          <p style={{ ...messageStyle, color: "green" }}>{successMessage}</p>
        )}
        {errorMessage && (
          <p style={{ ...messageStyle, color: "red" }}>{errorMessage}</p>
        )}
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ChangePasswordGovernor;


