// //for seller

// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const TermsAndConditions = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate(); // Initialize navigate
//   const [accepted, setAccepted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleAcceptChange = () => {
//     setAccepted(!accepted);
//   };

//   const handleProceed = async () => {
//     if (!accepted) {
//       alert("Please accept the terms and conditions to proceed.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `/api/TourGuide/acceptTermsAndConditions/${userId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ accepted: true, timestamp: new Date() }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to accept terms");
//       }

//       const data = await response.json();
//       //alert("Thank you for accepting the terms and conditions!");
//       console.log("API response:", data);

//       // Redirect to a new page (e.g., seller dashboard or homepage) after accepting terms
//       navigate(`/TourguideSignupConfirm/${userId}`);
//       //navigate("/TourGuideHome/67291c4a2cab8a982f09e3fd"); // Replace with your target path
//       //navigate(`/SellerPage/${sellerId}`); // Replace with your target path
//     } catch (error) {
//       console.error("Error:", error);
//       alert("There was a problem accepting the terms. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modal}>
//         <div style={styles.header}>
//           <img
//             src="https://img.icons8.com/ios-filled/50/000000/document.png"
//             alt="terms-icon"
//             style={styles.icon}
//           />
//           <h2 style={styles.title}>TERMS OF SERVICE</h2>
//         </div>
//         <div style={styles.content}>
//           <p>
//             This summary is provided only for convenience. Please review the
//             Terms of Service below in their entirety for important information
//             and legal conditions that apply to your use of the Platform.
//           </p>
//           <h3 style={styles.subheading}>YOUR POSTING OF USER CONTENT</h3>
//           <p>
//             "User Content" means content that Users have created and posted to
//             the Platform for other Users to view and comment on. You represent
//             and warrant that you own the User Content you post to the Platform.
//           </p>
//         </div>

//         <div style={styles.actions}>
//           <div style={styles.checkboxContainer}>
//             <input
//               type="checkbox"
//               checked={accepted}
//               onChange={handleAcceptChange}
//               style={styles.checkbox}
//             />
//             <label style={styles.label}>
//               I have read and agree to the terms and conditions
//             </label>
//           </div>
//           <div style={styles.buttonContainer}>
//             <button
//               style={accepted ? styles.acceptButton : styles.disabledButton}
//               onClick={handleProceed}
//               disabled={!accepted || loading}
//             >
//               {loading ? "Processing..." : "Accept"}
//             </button>
//             <button
//               style={styles.declineButton}
//               onClick={() =>
//                 alert(
//                   "You can't access the system without accepting terms and conditions"
//                 )
//               }
//             >
//               Decline
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// const styles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modal: {
//     backgroundColor: "#ffffff",
//     padding: "30px",
//     borderRadius: "12px",
//     width: "450px",
//     maxWidth: "90%",
//     textAlign: "center",
//     boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
//     fontFamily: "'Arial', sans-serif",
//     color: "#333",
//   },
//   header: {
//     marginBottom: "20px",
//   },
//   icon: {
//     width: "40px",
//     marginBottom: "10px",
//   },
//   title: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     color: "#333",
//     textTransform: "uppercase",
//     letterSpacing: "1px",
//   },
//   content: {
//     fontSize: "14px",
//     color: "#666",
//     textAlign: "left",
//     overflowY: "auto",
//     maxHeight: "200px",
//     padding: "10px 0",
//     borderTop: "1px solid #ddd",
//     borderBottom: "1px solid #ddd",
//     margin: "10px 0",
//   },
//   subheading: {
//     fontSize: "15px",
//     fontWeight: "bold",
//     color: "#555",
//     marginTop: "15px",
//   },
//   actions: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: "20px",
//   },
//   checkboxContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     marginBottom: "15px",
//   },
//   checkbox: {
//     marginRight: "8px",
//   },
//   label: {
//     fontSize: "12px",
//     color: "#555",
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: "10px",
//   },
//   acceptButton: {
//     backgroundColor: "#4CAF50",
//     color: "#fff",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "14px",
//     flex: 1,
//     marginRight: "10px",
//   },
//   disabledButton: {
//     backgroundColor: "#ddd",
//     color: "#aaa",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "5px",
//     fontSize: "14px",
//     flex: 1,
//     marginRight: "10px",
//     cursor: "not-allowed",
//   },
//   declineButton: {
//     backgroundColor: "#ddd",
//     color: "#333",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontSize: "14px",
//     flex: 1,
//   },
// };

// export default TermsAndConditions;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFileSignature } from "react-icons/fa6";
import Alert from "@mui/material/Alert";
import DescriptionIcon from "@mui/icons-material/Description";

const TermsAndConditions = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
        `/api/TourGuide/acceptTermsAndConditions/${userId}`,
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
      console.log("API response:", data);

      navigate(`/TourguideSignupConfirm/${userId}`);
    } catch (error) {
      console.error("Error:", error);
      alert("There was a problem accepting the terms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = () => {
    setShowAlert(true);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <DescriptionIcon sx={styles.icon} />
          <h2 style={styles.title}>TERMS OF SERVICE</h2>
        </div>
        {/* <div style={styles.content}>
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
        </div> */}
        <div style={styles.content}>
          <p>
            Welcome to{" "}
            <span style={{ color: "#d32e65", fontWeight: "bold" }}>
              ✨ Watermelon Globe ✨
            </span>
            ! By using our platform, you agree to the following terms and
            conditions. Please read them carefully, as they contain important
            information about your rights and responsibilities when accessing or
            using our services.
          </p>

          <h3 style={styles.subheading}>1. ACCEPTANCE OF TERMS</h3>
          <p>
            By accessing or using the website and associated services
            (collectively, the “Platform”), you confirm that you accept these
            Terms of Service and agree to abide by them. If you do not agree
            with these terms, you must not use the Platform.
          </p>

          <h3 style={styles.subheading}>2. USE OF THE PLATFORM</h3>
          <p>
            You may use the Platform only for lawful purposes and in accordance
            with these Terms of Service. You agree not to:
          </p>
          <ul>
            <li>
              Violate any applicable local, state, national, or international
              laws or regulations.
            </li>
            <li>Use the Platform for fraudulent or misleading purposes.</li>
            <li>
              Post or transmit any harmful, threatening, or otherwise
              objectionable material.
            </li>
            <li>
              Interfere with or disrupt the integrity or security of the
              Platform.
            </li>
          </ul>

          <h3 style={styles.subheading}>3. USER CONTENT</h3>
          <p>
            "User Content" includes reviews, travel tips, photos, or other
            materials that Users post on the Platform. By posting User Content,
            you grant us a non-exclusive, worldwide, royalty-free, perpetual,
            and irrevocable license to use, reproduce, display, and distribute
            your content for purposes related to our services. You represent and
            warrant that:
          </p>
          <ul>
            <li>
              You own or have the necessary permissions to post your User
              Content.
            </li>
            <li>
              Your User Content does not violate any third-party rights,
              including copyright or privacy rights.
            </li>
          </ul>

          <h3 style={styles.subheading}>4. ACCOUNTS AND SECURITY</h3>
          <p>
            To access certain features of the Platform, you may be required to
            create an account. You are responsible for maintaining the
            confidentiality of your account credentials and for all activities
            that occur under your account. Notify us immediately if you suspect
            any unauthorized use of your account.
          </p>

          <h3 style={styles.subheading}>5. TRAVEL PLANNING AND LIABILITY</h3>
          <p>
            While we strive to provide accurate and up-to-date information about
            destinations, travel services, and itineraries, we do not guarantee
            the completeness or reliability of such information. You acknowledge
            that:
          </p>
          <ul>
            <li>
              All bookings and arrangements are made directly with third-party
              providers, and we are not responsible for their performance or
              services.
            </li>
            <li>
              We are not liable for any injuries, losses, or damages resulting
              from travel activities or reliance on information provided through
              the Platform.
            </li>
          </ul>

          <h3 style={styles.subheading}>6. INTELLECTUAL PROPERTY</h3>
          <p>
            The Platform and its content, including but not limited to text,
            graphics, logos, and software, are owned by us or our licensors and
            are protected by copyright, trademark, and other intellectual
            property laws. You may not copy, reproduce, or distribute any part
            of the Platform without our prior written consent.
          </p>

          <h3 style={styles.subheading}>7. TERMINATION</h3>
          <p>
            We reserve the right to suspend or terminate your access to the
            Platform at our sole discretion, without notice, if you violate
            these Terms of Service or engage in prohibited activities.
          </p>

          <h3 style={styles.subheading}>8. DISCLAIMER OF WARRANTIES</h3>
          <p>
            The Platform is provided "as is" and "as available" without
            warranties of any kind, either express or implied. We do not warrant
            that the Platform will be uninterrupted, error-free, or secure.
          </p>

          <h3 style={styles.subheading}>9. LIMITATION OF LIABILITY</h3>
          <p>
            To the fullest extent permitted by law, we shall not be liable for
            any indirect, incidental, or consequential damages arising from your
            use of the Platform.
          </p>

          <h3 style={styles.subheading}>10. GOVERNING LAW</h3>
          <p>
            These Terms of Service are governed by and construed in accordance
            with the laws of [Your Jurisdiction], without regard to its conflict
            of law principles.
          </p>

          <h3 style={styles.subheading}>11. CHANGES TO THESE TERMS</h3>
          <p>
            We may revise these Terms of Service from time to time. Any changes
            will be effective upon posting on the Platform. Your continued use
            of the Platform after such changes constitutes your acceptance of
            the revised terms.
          </p>

          <h3 style={styles.subheading}>12. CONTACT US</h3>
          <p>
            If you have any questions or concerns about these Terms of Service,
            please contact us at
            <a
              href="mailto:support@WatermelonGlobe.com"
              style={{
                color: "#d32e65", // Set your desired color
                textDecoration: "underline", // Add underline
                fontWeight: "bold", // Optional: Make the text bold
              }}
            >
              support@WatermelonGlobe.com
            </a>
            .
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
            <button style={styles.declineButton} onClick={handleDecline}>
              Decline
            </button>
          </div>
        </div>
        {showAlert && (
          <div style={styles.alertContainer}>
            <Alert severity="warning" onClose={() => {}} sx={{ color: "#888" }}>
              You cannot access the system without accepting terms and
              conditions
            </Alert>
          </div>
        )}
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
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#f9fafb", // Light gray background
    padding: "30px",
    borderRadius: "12px",
    width: "550px",
    maxWidth: "90%",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Poppins', sans-serif", // Google Font
    color: "#222", // Text color
  },
  header: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center", // Align icon and text horizontally
    justifyContent: "center", // Center them horizontally
  },
  icon: {
    fontSize: "30px", // Increase icon size
    marginRight: "10px", // Space between icon and text
    color: "#d32e65", // Optional: Adjust color of the icon
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#91c297",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  content: {
    fontSize: "14px",
    color: "#888",
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
    color: "#91c297",
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
    justifyContent: "flex-start", // Ensure content aligns to the left
    marginBottom: "15px",
    width: "100%", // Make sure it takes full width
    textAlign: "center", // Aligns text to the left
  },
  checkbox: {
    width: "20px", // Set width for a bigger checkbox
    height: "20px", // Set height for a bigger checkbox
    accentColor: "#d32e65", // Change the checkbox color
    cursor: "pointer", // Add pointer cursor for better UX
    marginRight: "10px",
  },
  label: {
    fontSize: "14px",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "10px",
  },
  acceptButton: {
    backgroundColor: "#91c297", // Blue button
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
    backgroundColor: "#ddd", // Disabled button color
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
    backgroundColor: "#d32e65", // Red button
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    flex: 1,
  },
  alertContainer: {
    marginTop: "20px", // Adds space above the alert
    width: "100%", // Ensures the alert spans the modal width
  },
};

export default TermsAndConditions;
