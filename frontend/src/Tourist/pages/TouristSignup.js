import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronDown, Eye, EyeOff } from "lucide-react";
import NavTabs from "Components/navTabs/navTabs";
import backgroundImage from "./Login-amico.png";
//import backgroundImage from "./Login-rafiki.png";
const SignupTourist = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDOB] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Keep all existing validation functions
  const validateUsername = () => {
    if (username.length < 3 || username.length > 20) {
      return "Username must be between 3 and 20 characters.";
    }
    return null;
  };

  const validateEmail = () => {
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }
    return null;
  };

  const validateMobileNumber = () => {
    const mobileRegex = /^\+?[0-9]{10,15}$/;
    if (!mobileRegex.test(mobileNumber)) {
      return "Please enter a valid mobile number.";
    }
    return null;
  };

  const validateDOB = () => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      return "You must be at least 18 years old.";
    }
    return null;
  };

  const validateStatus = () => {
    if (status !== "job" && status !== "student") {
      return 'Status must be either "job" or "student".';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: validateUsername(),
      email: validateEmail(),
      password: validatePassword(),
      mobileNumber: validateMobileNumber(),
      dob: validateDOB(),
      status: validateStatus(),
    };

    if (Object.values(newErrors).some((error) => error !== null)) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const tourist = {
      username,
      email,
      password,
      mobileNumber,
      nationality,
      dob,
      status,
    };

    try {
      const response = await fetch("/api/tourist/createTourist", {
        method: "POST",
        body: JSON.stringify(tourist),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(response);
        setUsername("");
        setEmail("");
        setPassword("");
        setMobileNumber("");
        setNationality("");
        setDOB("");
        setStatus("");
        navigate("/SelectMyPref");
        // navigate(`/TouristHomepage/${data._id}`);
      } else {
        const errorData = await response.json();
        if (errorData.message.includes("duplicate key error")) {
          if (errorData.message.includes("username")) {
            setErrors((prev) => ({
              ...prev,
              username: "Username is already in use.",
            }));
          }
          if (errorData.message.includes("email")) {
            setErrors((prev) => ({
              ...prev,
              email: "Email is already in use.",
            }));
          }
        } else {
          throw new Error("Signup failed");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to create account. Please try again.",
      }));
    }
  };
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedNo, setIsFocusedNo] = useState(false);
  const [isFocusedNationality, setIsFocusedNationality] = useState(false);
  const [isFocusedStatus, setIsFocusedStatus] = useState(false);
  const [isFocusedDOB, setIsFocusedDOB] = useState(false);

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
      <div
        style={{
          width: "100%",
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
          }}
        >
          Sign Up
        </h2>
        <NavTabs />
        <div
          style={{
            maxWidth: "480px",
            margin: "0 auto",
            marginTop: "20px", // Adds space between NavTabs and this div
          }}
        ></div>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#444",
              marginBottom: "32px",
            }}
          >
            Let's get started
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
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

              {/* <input
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                  width: "100%",
                  padding: "8px",
                  fontSize: "14px",
                  border: `2px solid ${isFocused ? "#1a73e8" : "#ccc"}`, // Outline color on focus
                  borderRadius: "4px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  
                }}
                placeholder="Enter username"
              /> */}
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isFocusedEmail ? "#d32e65" : "#555",
                  marginBottom: "8px",
                  transition: "color 0.3s ease",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 16px",
                  backgroundColor: "white",
                  border: `2px solid ${isFocusedEmail ? "#d32e65" : "#ccc"}`,
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.3s ease",
                }}
                placeholder="Enter your email"
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

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isFocusedNo ? "#d32e65" : "#555",

                  marginBottom: "8px",
                  transition: "color 0.3s ease",
                }}
              >
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                onFocus={() => setIsFocusedNo(true)}
                onBlur={() => setIsFocusedNo(false)}
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 16px",
                  backgroundColor: "white",
                  border: `2px solid ${isFocusedNo ? "#d32e65" : "#ccc"}`,
                  borderRadius: "8px",
                  fontSize: "16px",
                  transition: "border-color 0.3s ease",
                }}
                placeholder="Enter your number "
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isFocusedNationality ? "#d32e65" : "#555",
                    marginBottom: "8px",
                    transition: "color 0.3s ease",
                  }}
                >
                  Nationality
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    onFocus={() => setIsFocusedNationality(true)}
                    onBlur={() => setIsFocusedNationality(false)}
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 16px",
                      backgroundColor: "white",
                      border: `2px solid ${
                        isFocusedNationality ? "#d32e65" : "#ccc"
                      }`,
                      borderRadius: "8px",
                      fontSize: "16px",
                      appearance: "none",
                    }}
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="EG">Egypt</option>
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

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: isFocusedStatus ? "#d32e65" : "#555",
                    marginBottom: "8px",
                    transition: "color 0.3s ease",
                  }}
                >
                  Status
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    onFocus={() => setIsFocusedStatus(true)}
                    onBlur={() => setIsFocusedStatus(false)}
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "0 16px",
                      backgroundColor: "white",
                      border: `2px solid ${
                        isFocusedStatus ? "#d32e65" : "#ccc"
                      }`,
                      borderRadius: "8px",
                      fontSize: "16px",
                      appearance: "none",
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    <option value="">Select status</option>
                    <option value="student">student</option>
                    <option value="job">job</option>
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
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isFocusedDOB ? "#d32e65" : "#555",
                  marginBottom: "8px",
                  transition: "color 0.3s ease",
                }}
              >
                Date of Birth
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "0 16px",
                    backgroundColor: "white",
                    border: `2px solid ${isFocusedDOB ? "#d32e65" : "#ccc"}`, // Border color changes on focus
                    borderRadius: "8px",
                    fontSize: "16px",
                    transition: "border-color 0.3s ease", // Smooth transition for the border color
                  }}
                  placeholder="mm/dd/yyyy"
                  onFocus={(e) => {
                    e.target.type = "date"; // Change input type to "date" on focus
                    setIsFocusedDOB(true); // Update focus state
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text"; // Change back to text if input is empty
                    setIsFocusedDOB(false); // Update focus state
                  }}
                />

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
              Create account
            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#4B5563",
              }}
            >
              Already have an account?{" "}
              <a
                href="/tourist-signup"
                style={{
                  color: "#d32e65",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupTourist;
