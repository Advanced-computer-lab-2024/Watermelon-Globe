import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupAdvertiser = () => {
  const [Name, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [advertiserId, setAdvertiserId] = useState(null);
  const navigate = useNavigate(); // Use navigate instead of Link

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!Name || !Email || !Password) {
      setError("Please fill in all fields.");
      return; // Stop form submission
    }

    const advertiser = { Name, Email, Password };

    try {
      const response = await fetch("/api/guest/addAdvertiser", {
        method: "POST",
        body: JSON.stringify(advertiser),
        headers: {
          "Content-type": "application/json",
        },
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(
          json.error || "Signup failed most probably due to dup data"
        );
      }

      //alert("Sign up as seller was successful");
      setAdvertiserId(json._id);
      console.log(json);
      setUsername("");
      setEmail("");
      setPassword("");
      setError(null);

      // Redirect to terms and conditions after successful signup
      navigate(`/terms-and-conditionsAdvertiser/${json._id}`);
    } catch (error) {
      //console.error("Error signing up:", error);
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

        <button type="submit">Sign up as Advertiser</button>
      </form>
    </div>
  );
};

export default SignupAdvertiser;
