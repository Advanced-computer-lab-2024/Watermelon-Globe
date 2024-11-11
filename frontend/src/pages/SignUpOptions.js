import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h1 className="signup-heading">Create an Account</h1>
      <div className="signup-buttons">
        <button
          className="signup-btn seller-btn"
          onClick={() => navigate("/seller-signup")}
        >
          Sign up as Seller
        </button>
        <button
          className="signup-btn advertiser-btn"
          onClick={() => navigate("/advertiser-signup")}
        >
          Sign up as Advertiser
        </button>
        <button
          className="signup-btn tourist-btn"
          onClick={() => navigate("/tourist-signup")}
        >
          Sign up as Tourist
        </button>
        <button
          className="signup-btn tourguide-btn"
          onClick={() => navigate("/tourguide-signup")}
        >
          Sign up as Tourguide
        </button>
      </div>
    </div>
  );
};

export default Signup;
