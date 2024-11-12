import "./SignUp.css";
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
    const response = await fetch("/api/guest/addTourguide", {
      method: "POST",
      body: JSON.stringify(tourguide),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      alert("Singing up as tourguide was successful");
      setUsername("");
      setEmail("");
      setPassword("");
      setError(null);
      console.log("new tourguide added", json);
      navigate(`/terms-and-conditionsGuide/${json._id}`);
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
      <button> Sign up as Tour Guide</button>
      {/* {error & <div className='error'>{error}</div>} */}
    </form>
  );
};

export default SignupTourguide;
