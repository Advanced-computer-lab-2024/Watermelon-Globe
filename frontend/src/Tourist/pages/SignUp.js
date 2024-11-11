import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupSeller = () => {
  const [Name, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [touristId, setTouristId] = useState(null);
  const navigate = useNavigate(); // Use navigate instead of Link

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!Name || !Email || !Password) {
      setError("Please fill in all fields.");
      return; // Stop form submission
    }

    const tourist = { Name, Email, Password };

    try {
      const response = await fetch("/api/Tourist/createTourist", {
        method: "POST",
        body: JSON.stringify(tourist),
        headers: {
          "Content-type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "Signup failed");
      }

      //alert("Sign up as seller was successful");
      setSellerId(json._id);
      setUsername("");
      setEmail("");
      setPassword("");
      setError(null);

      // Redirect to terms and conditions after successful signup
      navigate(`/terms-and-conditions/${json._id}`);
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <label>
          Username:
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={Name}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Sign up as seller</button>
      </form>
    </div>
  );
};

export default SignupSeller;
