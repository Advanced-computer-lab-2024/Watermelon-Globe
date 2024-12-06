import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupTourguide = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tourguide = { username, email, password };

    try {
      const response = await fetch("/api/guest/addTourguide", {
        method: "POST",
        body: JSON.stringify(tourguide),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        return;
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setError(null);
      alert("Signing up as tour guide was successful");
      console.log("New tour guide added", json);
      navigate(`/terms-and-conditionsGuide/${json._id}`);
    } catch (error) {
      console.error("Error signing up:", error);
      setError("An error occurred during signup.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#ffffff] to-[#e4fae4]">
      <form className="bg-[#fbd4d4] shadow-lg rounded-lg px-8 py-10 max-w-md w-full" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-semibold text-center text-[#ee9b9b] mb-6">Sign Up as Tour Guide</h3>

        <div className="mb-4">
          <label className="block text-[#ee9b9b] font-bold mb-2">Username:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-[#e3d2d2] rounded focus:outline-none focus:ring-2 focus:ring-[#ee9b9b]"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#ee9b9b] font-bold mb-2">Email:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-[#e3d2d2] rounded focus:outline-none focus:ring-2 focus:ring-[#ee9b9b]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[#ee9b9b] font-bold mb-2">Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-[#e3d2d2] rounded focus:outline-none focus:ring-2 focus:ring-[#ee9b9b]"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button className="w-full bg-[#ee9b9b] text-white font-bold py-2 px-4 rounded hover:bg-[#fbd4d4] transition-colors duration-300">
          Sign up as Tour Guide
        </button>
      </form>
    </div>
  );
};

export default SignupTourguide;
