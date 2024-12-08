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
              <a
                href="/tourist-signup"
                style={{
                  color: "#d32e65",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Forgot Password?
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Star, ChevronDown, Eye, EyeOff } from "lucide-react";
// import NavTabs from "Components/navTabs/navTabs";
// import backgroundImage from "./Login-amico.png";
// import SignupAdvertiser from "pages/AdvertiserSignup";
// //import backgroundImage from "./Login-rafiki.png";
// const SignupGuideNew = () => {
//   const [username, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [sellerId, setSellerId] = useState(null);

//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   // Keep all existing validation functions
//   const validateUsername = () => {
//     if (username.length < 3 || username.length > 20) {
//       return "Username must be between 3 and 20 characters.";
//     }
//     return null;
//   };

//   const validateEmail = () => {
//     const emailRegex = /.+@.+\..+/;
//     if (!emailRegex.test(email)) {
//       return "Please enter a valid email address.";
//     }
//     return null;
//   };

//   const validatePassword = () => {
//     if (password.length < 8) {
//       return "Password must be at least 8 characters.";
//     }
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username || !email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     const tourguide = { username, email, password };

//     try {
//       const response = await fetch("/api/TourGuide/addGuide", {
//         method: "POST",
//         body: JSON.stringify(tourguide),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const json = await response.json();
//       if (!response.ok) {
//         throw new Error(json.error || "Signup failed");
//       }

//       setSellerId(json._id);
//       setName("");
//       setEmail("");
//       setPassword("");
//       setError(null);

//       navigate(`/terms-and-conditionsGuide/${json._id}`);
//     } catch (error) {
//       console.error("Error signing up:", error);
//       setError(error.message);
//     }
//   };

//   const [isFocused, setIsFocused] = useState(false);
//   const [isFocusedEmail, setIsFocusedEmail] = useState(false);
//   const [isFocusedPassword, setIsFocusedPassword] = useState(false);
//   const [error, setError] = useState("");

//   return (
//     <div
//       className="signup-tourist-wrapper"
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         fontFamily: "Poppins, sans-serif",
//         backgroundColor: "#f8f8f8",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           height: "800px", // Adjust height as needed
//           backgroundColor: "#f8f8f8", // Light gray background color
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: "cover", // Make the photo cover the whole area
//           backgroundPosition: "center", // Center the image
//           backgroundRepeat: "no-repeat",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           color: "white", // Text color for visibility
//           fontSize: "24px",
//           fontWeight: "bold",
//         }}
//       ></div>
//       {/* Right Section */}
//       <div
//         style={{
//           width: "100%",
//           padding: "48px 24px",
//           backgroundColor: "white",
//         }}
//         className="right-section"
//       >
//         <h2
//           style={{
//             fontSize: "40px",
//             fontWeight: 700,
//             color: "#444",
//             marginBottom: "32px",
//             marginLeft: "20px",
//           }}
//         >
//           Register
//         </h2>
//         <NavTabs />
//         <div
//           style={{
//             maxWidth: "480px",
//             margin: "0 auto",
//             marginTop: "20px", // Adds space between NavTabs and this div
//           }}
//         ></div>
//         <div style={{ maxWidth: "480px", margin: "0 auto" }}>
//           <h2
//             style={{
//               fontSize: "32px",
//               fontWeight: 700,
//               color: "#444",
//               marginBottom: "32px",
//             }}
//           >
//             Let's get started
//           </h2>

//           <form
//             onSubmit={handleSubmit}
//             style={{ display: "flex", flexDirection: "column", gap: "24px" }}
//           >
//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "14px",
//                   fontWeight: 500,
//                   color: isFocused ? "#d32e65" : "#555", // Change label color on focus
//                   marginBottom: "8px",
//                   transition: "color 0.3s ease",
//                 }}
//               >
//                 Username
//               </label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setName(e.target.value)}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 style={{
//                   width: "100%",
//                   height: "48px",
//                   padding: "0 16px",
//                   backgroundColor: "white",
//                   border: `2px solid ${isFocused ? "#d32e65" : "#ccc"}`,
//                   borderRadius: "8px",
//                   fontSize: "16px",
//                   transition: "border-color 0.3s ease",
//                 }}
//                 placeholder="Enter username"
//               />

//               {/* <input
//                 type="text"
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 style={{
//                   width: "100%",
//                   padding: "8px",
//                   fontSize: "14px",
//                   border: `2px solid ${isFocused ? "#1a73e8" : "#ccc"}`, // Outline color on focus
//                   borderRadius: "4px",
//                   outline: "none",
//                   transition: "border-color 0.3s ease",

//                 }}
//                 placeholder="Enter username"
//               /> */}
//             </div>

//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "14px",
//                   fontWeight: 500,
//                   color: isFocusedEmail ? "#d32e65" : "#555",
//                   marginBottom: "8px",
//                   transition: "color 0.3s ease",
//                 }}
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onFocus={() => setIsFocusedEmail(true)}
//                 onBlur={() => setIsFocusedEmail(false)}
//                 style={{
//                   width: "100%",
//                   height: "48px",
//                   padding: "0 16px",
//                   backgroundColor: "white",
//                   border: `2px solid ${isFocusedEmail ? "#d32e65" : "#ccc"}`,
//                   borderRadius: "8px",
//                   fontSize: "16px",
//                   transition: "border-color 0.3s ease",
//                 }}
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label
//                 style={{
//                   display: "block",
//                   fontSize: "14px",
//                   fontWeight: 500,
//                   color: isFocusedPassword ? "#d32e65" : "#555",
//                   marginBottom: "8px",
//                   transition: "color 0.3s ease",
//                 }}
//               >
//                 Password
//               </label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onFocus={() => setIsFocusedPassword(true)}
//                   onBlur={() => setIsFocusedPassword(false)}
//                   style={{
//                     width: "100%",
//                     height: "48px",
//                     padding: "0 16px",
//                     backgroundColor: "#f6d8e576",
//                     border: `2px solid ${
//                       isFocusedPassword ? "#d32e65" : "white"
//                     }`,
//                     borderRadius: "8px",
//                     fontSize: "16px",
//                     transition: "border-color 0.3s ease",
//                   }}
//                   placeholder="Create a password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   style={{
//                     position: "absolute",
//                     right: "16px",
//                     top: "50%",
//                     transform: "translateY(-50%)",
//                     background: "none",
//                     border: "none",
//                     cursor: "pointer",
//                     color: "#d32e65",
//                   }}
//                 >
//                   {showPassword ? (
//                     <EyeOff style={{ width: "20px", height: "20px" }} />
//                   ) : (
//                     <Eye style={{ width: "20px", height: "20px" }} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 height: "48px",
//                 backgroundColor: "#91c297",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "8px",
//                 fontSize: "16px",
//                 fontWeight: 500,
//                 cursor: "pointer",
//               }}
//             >
//               Create account
//             </button>

//             <p
//               style={{
//                 textAlign: "center",
//                 fontSize: "14px",
//                 color: "#4B5563",
//               }}
//             >
//               Already have an account?{" "}
//               <a
//                 href="/AllLogin"
//                 style={{
//                   color: "#d32e65",
//                   fontWeight: 500,
//                   textDecoration: "none",
//                 }}
//               >
//                 Sign in
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupGuideNew;
