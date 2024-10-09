import './SignUp.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupTourist = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDOB] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({}); // Object to store error messages
  const navigate = useNavigate();

  // Validation Functions
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

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
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

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    const newErrors = {
      username: validateUsername(),
      email: validateEmail(),
      password: validatePassword(),
      mobileNumber: validateMobileNumber(),
      dob: validateDOB(),
      status: validateStatus(),
    };

    // Check if there are any validation errors
    if (Object.values(newErrors).some((error) => error !== null)) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passed
    setErrors({});

    const tourist = { username, email, password, mobileNumber, nationality, dob, status };

    try {
      const response = await fetch('/addTourist', {
        method: 'POST',
        body: JSON.stringify(tourist),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert("Signing up as a tourist was successful");
        setUsername('');
        setEmail('');
        setPassword('');
        setMobileNumber('');
        setNationality('');
        setDOB('');
        setStatus('');
        navigate(`/MainTouristPage/${data._id}`);
      } else {
        const errorData = await response.json();
        if (errorData.message.includes("duplicate key error")) {
          // Check for specific duplicate keys and set error messages
          if (errorData.message.includes("username")) {
            setErrors((prev) => ({ ...prev, username: "Username is already in use." }));
          }
          if (errorData.message.includes("email")) {
            setErrors((prev) => ({ ...prev, email: "Email is already in use." }));
          }
        } else {
          alert("There was an error during signup.");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("There was an error during signup.");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label> Username:
        <input 
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={errors.username ? 'input-error' : ''}
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </label>

      <label> Email:
        <input 
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </label>

      <label> Password:
        <input 
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </label>

      <label> Mobile Number:
        <input 
          type="text"
          onChange={(e) => setMobileNumber(e.target.value)}
          value={mobileNumber}
          className={errors.mobileNumber ? 'input-error' : ''}
        />
        {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
      </label>

      <label> Nationality:
        <input 
          type="text"
          onChange={(e) => setNationality(e.target.value)}
          value={nationality}
        />
      </label>

      <label> DOB:
        <input 
          type="date"
          onChange={(e) => setDOB(e.target.value)}
          value={dob}
          className={errors.dob ? 'input-error' : ''}
        />
        {errors.dob && <p className="error">{errors.dob}</p>}
      </label>

      <label> Job:
        <input 
          type="text"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          className={errors.status ? 'input-error' : ''}
        />
        {errors.status && <p className="error">{errors.status}</p>}
      </label>

      <button>Sign up as tourist</button>
    </form>
  );
};

export default SignupTourist;
