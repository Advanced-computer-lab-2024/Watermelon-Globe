import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupTourguide = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [guideId, setGuideId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    const tourguide = { username, email, password };

    try {
      const response = await fetch("api/TourGuide/addGuide", {
        method: "POST",
        body: JSON.stringify(tourguide),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await response.json(); // Correct method to parse JSON
      console.log(json);
      if (!response.ok) {
        throw new Error(
          json.error ||
            "Signup failed due to email or username already existing"
        );
      }

      //alert("Singing up as tourguide was successful");
      setGuideId(json._id);
      console.log(json._id);
      setUsername("");
      setEmail("");
      setPassword("");
      setError(null);
      //console.log("new tourguide added", json);

      navigate(`/terms-and-conditionsGuide/${json._id}`);
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3> Sign up</h3>

      <label>
        {" "}
        Username :
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </label>

      <label>
        {" "}
        Email :
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        {" "}
        Password :
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button> Sign up as tourguide</button>
      {error & <div className="error">{error}</div>}
    </form>
  );
};

export default SignupTourguide;
