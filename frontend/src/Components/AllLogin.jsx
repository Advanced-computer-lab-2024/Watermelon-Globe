import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronDown, Eye, EyeOff } from "lucide-react";
import GuestNavbarRegister from "./GuestNavBar";
//import backgroundImage from "./Login-amico.png";
import axios from "axios";
import SignupAdvertiser from "pages/AdvertiserSignup";
import backgroundImage from "./Login-rafiki.png";
// import NavTabsLogin from "./navTabsLogin/navTabs";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import TourIcon from "@mui/icons-material/TravelExplore";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const AllLogin = () => {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sellerId, setSellerId] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [value, setValue] = useState("Tourist"); // State to track selected tab
  const [userType, setUserType] = useState("Tourist"); // State to track user type

  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const inputRefs = useRef([]);

  const [alertVisibleOTP, setAlertVisibleOTP] = useState(false); // State to track alert visibility
  const [alertVisibleOTPUser, setAlertVisibleOTPUser] = useState(false);

  const [generatedOtp, setGeneratedOtp] = useState(""); // To store the generated OTP
  const [enteredOtp, setEnteredOtp] = useState(Array(6).fill("")); // To store user's entered OTP
  const [userId, setUserId] = useState("");

  // LinkTab Component for handling tab clicks
  function LinkTab(props) {
    const { label, icon, value, onClick } = props;
    return (
      <Tab
        label={label}
        icon={icon}
        value={value} // Pass value for easier tab identification
        onClick={() => onClick(value)} // Call onClick with value
      />
    );
  }

  LinkTab.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.node,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  // function NavTabsLogin() {
  useEffect(() => {
    console.log("Current User Type:", userType);
  }, [userType]); // Debug: Logs userType whenever it changes

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setUserType(newValue);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // if (/^\d$/.test(value) || value === "") {
    //   // Only allow a digit or empty string
    //   const newOtp = otp.split("");
    //   newOtp[index] = value;
    //   setEnteredOtp(newOtp.join(""));

    if (/^[0-9]$/.test(value) || value === "") {
      // Accept only digits
      const newOtp = [...enteredOtp];
      newOtp[index] = value;
      setEnteredOtp(newOtp);

      // Move to next input field after entering a digit
      if (value && index < 5) {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        }
      } else if (!value && index > 0) {
        // Move to previous input field on delete
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      }
    }
  };

  const handleSubmitOtp = async () => {
    const enteredOtpString = enteredOtp.join(""); // Combine entered OTP into a single string

    if (enteredOtpString === generatedOtp.toString()) {
      // alert("OTP verified successfully!"); // Successful OTP verification

      const endpoint = `/api/login/loginOTP`; // Common API endpoint for all user types

      try {
        // API request to log in the user
        const response = await axios.post(
          endpoint,
          {
            email: username,
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
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrorMessage(
          error.response?.data?.error || "An error occurred during login."
        );
      }
    } else {
      alert("Invalid OTP. Please try again."); // OTP verification failed
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  // const handleForgotPassword = async (e) => {
  //   // Check if username is valid (not null, undefined, or empty string)
  //   if (username && username.trim() !== "") {
  //     try {
  //       setOtp("");
  //       setIsLoading(true); // Start loading indicator

  //       // Check if username exists for the given userType
  //       console.log(userType);
  //       const userTypeEndpoint = `/api/login/check-username/${userType}`; // Make sure your backend has this route

  //       const usernameCheckResponse = await axios.post(userTypeEndpoint, {
  //         email: username,
  //       });

  //       if (usernameCheckResponse.status !== 200) {
  //         setIsLoading(false);
  //         setAlertVisibleOTPUser(true); // Show alert if username doesn't exist
  //         return;
  //       }

  //       // Generate a 6-digit OTP
  //       const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit number

  //       // Call the backend to send the OTP to the user's email
  //       const response = await axios.post("/api/login/send-otp", {
  //         email: username, // Username is the email entered by the user
  //         otp: otp, // The OTP to be sent
  //       });

  //       setIsLoading(false); // Stop loading indicator

  //       if (response.status === 200) {
  //         setShowPopup(true); // Show the OTP popup
  //         setAlertVisibleOTPUser(false); // Hide the alert
  //       } else {
  //         setAlertVisibleOTPUser(true); // Handle errors if the OTP sending failed
  //       }
  //     } catch (error) {
  //       console.error("Error sending OTP:", error);
  //       setIsLoading(false); // Stop loading indicator on error
  //       setAlertVisibleOTPUser(true); // Show error alert if something goes wrong
  //     }
  //   } else {
  //     setAlertVisibleOTP(true); // Show the alert if username is invalid
  //   }
  // };

  const handleForgotPassword = async (e) => {
    if (username && username.trim() !== "") {
      try {
        setEnteredOtp("");
        setIsLoading(true);

        // Check if username exists
        const userTypeEndpoint = `/api/login/check-username/${userType}`;
        const usernameCheckResponse = await axios.post(userTypeEndpoint, {
          email: username,
        });

        if (usernameCheckResponse.status !== 200) {
          setIsLoading(false);
          setAlertVisibleOTP(false);
          setAlertVisibleOTPUser(true);
          return;
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        setGeneratedOtp(otp); // Store the OTP in state

        // Send the OTP to the backend
        await axios.post("/api/login/send-otp", { email: username, otp });

        setIsLoading(false);
        setShowPopup(true);
        setAlertVisibleOTP(false);
        setAlertVisibleOTPUser(false);
      } catch (error) {
        console.error("Error sending OTP:", error);
        setIsLoading(false);
        setAlertVisibleOTP(false);
        setAlertVisibleOTPUser(true);
      }
    } else {
      setAlertVisibleOTP(true);
    }
  };

  // Handle close popup
  const handleClosePopup = () => {
    setShowPopup(false);
    setEnteredOtp(""); // Clear OTP input when closing
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if the username, password, and userType are filled out
    if (!username || !password || !userType) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
    const userEmail =
      userType === "seller" || userType === "advertiser" ? "Email" : "email";

    try {
      const endpoint = `/api/login/login`; // Common API endpoint for all user types

      const response = await axios.post(
        endpoint,
        {
          email: username,
          password: password,
          userType: userType,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Invalid credentials for `);

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

  const handleRegisterClick = () => {
    navigate("/tourist-signup"); // Redirect to the home page
  };

  // Keep all existing validation functions
  const validateUsername = () => {
    if (username.length < 3 || username.length > 20) {
      return "Username must be between 3 and 20 characters.";
    }
    return null;
  };

  // const validateEmail = () => {
  //   const emailRegex = /.+@.+\..+/;
  //   if (!emailRegex.test(email)) {
  //     return "Please enter a valid email address.";
  //   }
  //   return null;
  // };

  const validatePassword = () => {
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const tourguide = { username, password };

    try {
      const response = await fetch("/api/TourGuide/addGuide", {
        method: "POST",
        body: JSON.stringify(tourguide),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "SignInfailed");
      }

      setSellerId(json._id);
      setName("");
      setPassword("");
      setError(null);

      navigate(`/terms-and-conditionsGuide/${json._id}`);
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [error, setError] = useState("");

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Use the 'Discover' button to find amazing destinations.",
    "Search for hotels, flights, or guides using the top navigation.",
    "Click 'Explore' to dive deeper into your favorite spots.",
    "Sign up to create personalized travel plans and access special offers.",
    "Stay connected through our social media channels for updates!",
  ];

  return (
    <div
      className="signup-tourist-wrapper"
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f8f8f8",
      }}
    >
      <GuestNavbarRegister />
      <div
        style={{
          width: "50%",
          height: "800px", // Adjust height as needed
          backgroundColor: "#f8f8f8", // Light gray background color
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover", // Make the photo cover the whole area
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white", // Text color for visibility
          fontSize: "24px",
          fontWeight: "bold",
        }}
      ></div>
      {/* Right Section */}
      <div
        style={{
          width: "100%",
          padding: "48px 24px",
          backgroundColor: "white",
        }}
        className="right-section"
      >
        <h2
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: "#444",
            marginBottom: "32px",
            marginLeft: "20px",
            paddingBottom: "40px",
          }}
        >
          Sign In
        </h2>
        <Box sx={{ width: "100%", display: "flex" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            orientation="vertical"
            sx={{ borderRight: 1, borderColor: "divider", minWidth: "200px" }}
          >
            <Tab
              label="As Tourist"
              icon={<PersonIcon />}
              value="Tourist"
              sx={{
                color: value === "Tourist" ? "primary.main" : "text.secondary",
                backgroundColor:
                  value === "Tourist" ? "action.selected" : "transparent",
              }}
            />
            <Tab
              label="As Advertiser"
              icon={<LocalActivityRoundedIcon />}
              value="Advertiser"
              sx={{
                color:
                  value === "Advertiser" ? "primary.main" : "text.secondary",
                backgroundColor:
                  value === "Advertiser" ? "action.selected" : "transparent",
              }}
            />
            <Tab
              label="As Tour Guide"
              icon={<TourIcon />}
              value="TourGuide"
              sx={{
                color:
                  value === "TourGuide" ? "primary.main" : "text.secondary",
                backgroundColor:
                  value === "TourGuide" ? "action.selected" : "transparent",
              }}
            />
            <Tab
              label="As Seller"
              icon={<StoreIcon />}
              value="Seller"
              sx={{
                color: value === "Seller" ? "primary.main" : "text.secondary",
                backgroundColor:
                  value === "Seller" ? "action.selected" : "transparent",
              }}
            />
            <Tab
              label="As Governor"
              icon={<AccountBalanceIcon />}
              value="Governor"
              sx={{
                color: value === "Governor" ? "primary.main" : "text.secondary",
                backgroundColor:
                  value === "Governor" ? "action.selected" : "transparent",
              }}
            />
            <Tab
              label="As Admin"
              icon={<AdminPanelSettingsIcon />}
              value="Admin"
              sx={{
                color: value === "Admin" ? "primary.main" : "text.secondary",
                backgroundColor:
                  value === "Admin" ? "action.selected" : "transparent",
              }}
            />
          </Tabs>

          <Box
            sx={{
              flexGrow: 1,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                // textAlign: "center",
                marginBottom: "14px", // Space below the heading
                marginLeft: "10px",
                color: "#91c297",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold", // Makes the text bold
              }}
            >
              Welcome Back
            </Typography>

            {/* <Typography
              variant="h9"
              component="h9"
              sx={{
                // textAlign: "center",
                marginBottom: "24px", // Space below the heading
                marginLeft: "30px",
                color: "#555",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold", // Makes the text bold
              }}
            >
              You can sign in to access with our existing account
            </Typography> */}
            <form
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {/* Show the alert if alertVisible is true */}
              {alertVisibleOTP && (
                <Alert
                  severity="info"
                  sx={{
                    backgroundColor: "#f6d8e576", // Set your desired background color
                    color: "#333", // Optionally set text color for better contrast
                  }}
                >
                  Please enter a valid email to receive OTP.
                </Alert>
              )}
              {alertVisibleOTPUser && (
                <Alert
                  severity="info"
                  sx={{
                    backgroundColor: "#f6d8e576", // Set your desired background color
                    color: "#333", // Optionally set text color for better contrast
                  }}
                >
                  No account of type {userType} is associated with this email.
                  Please enter a valid email to receive the OTP.
                </Alert>
              )}
              <div>
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
                  Email
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
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
                  placeholder="Enter email"
                />
              </div>

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
                    placeholder="Enter password"
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

              <button
                type="submit"
                style={{
                  width: "100%",
                  height: "48px",
                  backgroundColor: "#91c297",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Sign In
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#4B5563",
                }}
              >
                Can't Remember Password?{" "}
                <a
                  onClick={handleForgotPassword}
                  style={{
                    color: "#d32e65",
                    fontWeight: 500,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password
                </a>
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#4B5563",
                  fontWeight: 600,
                  // margin: "2px 0", // Adds spacing above and below
                }}
              >
                or
              </p>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#4B5563",
                }}
              >
                Don't have an account yet?{" "}
                <a
                  onClick={handleRegisterClick}
                  style={{
                    color: "#d32e65",
                    fontWeight: 500,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Register Now
                </a>
              </p>

              {/* OTP Popup */}
              {showPopup && (
                <>
                  {/* Background blur */}
                  <div
                    style={{
                      position: "fixed",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                      backdropFilter: "blur(5px)", // Apply blur effect to the background
                      zIndex: 999, // Set a lower zIndex so that the popup is on top
                    }}
                  />
                  <div
                    style={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "#fff",
                      padding: "30px", // Increased padding for more space inside the popup
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                      zIndex: 1000,
                      borderRadius: "8px",
                      width: "400px", // Increased width for a larger popup
                      border: "2px solid #91c297", // Added border color
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <h1
                      style={{
                        marginBottom: "10px",
                        fontSize: "30px", // Make the text larger
                        color: "#91c297", // Set the color of the text (you can replace this with any color you prefer)
                        fontWeight: "bold", // Make the text bold
                      }}
                    >
                      Forgot Password
                    </h1>

                    <p
                      style={{
                        marginBottom: "20px",
                        fontSize: "14px",
                        color: "#4B5563",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      A 6-digit OTP has been sent to your email. Please enter it
                      below to continue. Make sure to check your inbox and spam
                      folder.
                    </p>

                    {isLoading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "20px",
                          color: "#91c297",
                        }}
                      >
                        <div
                          className="spinner"
                          style={{ marginRight: "10px" }}
                        >
                          {/* You can add a CSS spinner here */}
                          Loading...
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 style={{ marginBottom: "10px", color: "#333" }}>
                          Enter 6-Digit OTP
                        </h3>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {[...Array(6)].map((_, index) => (
                            <input
                              key={index}
                              ref={(el) => (inputRefs.current[index] = el)} // Store references to input fields
                              type="text"
                              value={enteredOtp[index] || ""}
                              onChange={(e) => handleOtpChange(e, index)}
                              maxLength={1} // Limit input to 1 character
                              placeholder=""
                              style={{
                                width: "45px", // Width for each OTP box
                                height: "45px", // Height of the input box to make it square
                                textAlign: "center",
                                fontSize: "20px",
                                marginBottom: "10px",
                                border: "2px solid #91c297",
                                borderRadius: "4px",
                                outline: "none",
                              }}
                            />
                          ))}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "10px",
                          }}
                        >
                          <button
                            onClick={handleSubmitOtp}
                            style={{
                              width: "60%",
                              padding: "10px 15px",
                              backgroundColor: "#e89bb5",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            Submit OTP
                          </button>

                          <button
                            onClick={handleClosePopup}
                            style={{
                              width: "36%", // Take up nearly half the space for Close button
                              padding: "10px 15px", // Increased padding for a larger button
                              backgroundColor: "#e89bb5",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </form>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AllLogin;
