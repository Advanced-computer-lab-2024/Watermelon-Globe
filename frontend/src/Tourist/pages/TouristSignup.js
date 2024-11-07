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
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-12 flex-col justify-between">
        <div>
          <div className="text-white font-semibold text-xl">WaterMelon Globe</div>
          <div className="mt-20">
            <h1 className="text-white text-5xl font-bold leading-tight">
              Start your travel
              <br />
              journey today
            </h1>
            <p className="text-blue-100 mt-4 text-lg">
              Join our community of global travelers. Discover new destinations and create unforgettable memories.
            </p>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="bg-blue-700 rounded-xl p-6 text-white">
          <p className="text-lg mb-4">
            "The perfect platform for travelers! Made my journey planning seamless and helped me discover amazing destinations."
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                M
              </div>
              <div>
                <p className="font-medium">Maria Rodriguez</p>
                <p className="text-blue-200 text-sm">Travel Enthusiast</p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12">
        <div className="max-w-md mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</div>
            <div className="flex-1 h-1 mx-4 bg-gray-200">
              <div className="w-0 h-full bg-blue-600"></div>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center text-sm">2</div>
            <div className="flex-1 h-1 mx-4 bg-gray-200"></div>
            <div className="w-8 h-8 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center text-sm">3</div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">Let's get started</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.username ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter username"
              />
              {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 pr-10 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-transparent border-none cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.mobileNumber ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <div className="relative">
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`w-full px-4 py-2 border ${errors.status ? 'border-red-300' : 'border-gray-300'} rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select status</option>
                    <option value="student">Student</option>
                    <option value="job">Professional</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.dob ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupTourist;