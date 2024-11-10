import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronDown, Eye, EyeOff } from 'lucide-react';

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

    const tourist = { username, email, password, mobileNumber, nationality, dob, status };

    try {
      const response = await fetch('/api/tourist/createTourist', {
        method: 'POST',
        body: JSON.stringify(tourist),
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
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
          if (errorData.message.includes("username")) {
            setErrors((prev) => ({ ...prev, username: "Username is already in use." }));
          }
          if (errorData.message.includes("email")) {
            setErrors((prev) => ({ ...prev, email: "Email is already in use." }));
          }
        } else {
          throw new Error("Signup failed");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrors(prev => ({ ...prev, submit: "Failed to create account. Please try again." }));
    }
  };

  return (
    <div className="signup-tourist-wrapper" style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      {/* Left Section */}
      <div style={{
        display: 'none',
        width: '50%',
        backgroundColor: '#0066FF',
        padding: '48px',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }} className="left-section">
        <div>
          <h1 style={{ color: 'white', fontSize: '24px', fontWeight: 600 }}>WaterMelon Globe</h1>
          <div style={{ marginTop: '80px' }}>
            <h2 style={{ color: 'white', fontSize: '48px', fontWeight: 700, lineHeight: 1.2 }}>
              Start your travel
              <br />
              journey today
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '16px', fontSize: '20px' }}>
              Join our community of global travelers. Discover new destinations and create unforgettable memories.
            </p>
          </div>
        </div>
        
        {/* Testimonial */}
        <div style={{
          backgroundColor: 'rgba(0,82,204,0.5)',
          borderRadius: '12px',
          padding: '24px',
          color: 'white'
        }}>
          <p style={{ fontSize: '18px', marginBottom: '16px' }}>
            "The perfect platform for travelers! Made my journey planning seamless and helped me discover amazing destinations."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#0066FF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                M
              </div>
              <div>
                <p style={{ fontWeight: 500 }}>Maria Rodriguez</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Travel Enthusiast</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} style={{ width: '20px', height: '20px', color: '#FFD700' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div style={{
        width: '100%',
        padding: '48px 24px',
        backgroundColor: 'white'
      }} className="right-section">
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          {/* Progress Steps */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0066FF',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500
              }}>
                1
              </div>
              <div style={{ height: '2px', width: '96px', backgroundColor: '#E5E7EB', marginLeft: '8px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid #D1D5DB',
                color: '#9CA3AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500
              }}>
                2
              </div>
              <div style={{ height: '2px', width: '96px', backgroundColor: '#E5E7EB', marginLeft: '8px' }} />
            </div>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid #D1D5DB',
              color: '#9CA3AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 500
            }}>
              3
            </div>
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#111827', marginBottom: '32px' }}>Let's get started</h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  backgroundColor: '#F8F9FF',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="Enter username"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  backgroundColor: 'white',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: 'rgba(0,186,136,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#00BA88'
                  }}
                >
                  {showPassword ? <EyeOff style={{ width: '20px', height: '20px' }} /> : <Eye style={{ width: '20px', height: '20px' }} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Mobile Number</label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px',
                  backgroundColor: 'white',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
                placeholder="+2 "
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Nationality</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 16px',
                      backgroundColor: 'white',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      appearance: 'none'
                    }}
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="CA">Egypt</option>
                  </select>
                  <ChevronDown style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    color: '#9CA3AF',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Status</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 16px',
                      backgroundColor: 'white',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      appearance: 'none'
                    }}
                  >
                    <option value="">Select status</option>
                    <option value="student">student</option>
                    <option value="job">job</option>
                  </select>
                  <ChevronDown style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    color: '#9CA3AF',
                    pointerEvents: 'none'
                  }} />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Date of Birth</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    backgroundColor: 'white',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  placeholder="mm/dd/yyyy"
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = 'text'
                  }}
                />
                <ChevronDown style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#9CA3AF',
                  pointerEvents: 'none'
                }} />
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: '#00BA88',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Create account
            </button>

            <p style={{ textAlign: 'center', fontSize: '14px', color: '#4B5563' }}>
              Already have an account?{" "}
              <a href="/tourist-signup" style={{ color: '#0066FF', fontWeight: 500, textDecoration: 'none' }}>
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