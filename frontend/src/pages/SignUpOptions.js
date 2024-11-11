import "./SignUp.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate(); // Initialize the navigate hook

  return (
    <div>
      <button onClick={() => navigate("/seller-signup")}>
        Sign up as Seller
      </button>
      {/* <button onClick={() => navigate('/advertiser-signup')}>Sign up as Advertiser</button> */}
      <button onClick={() => navigate("/advertiser-signup")}>
        Sign up as Advertiser
      </button>
      <button onClick={() => navigate("/tourist-signup")}>
        Sign up as Tourist
      </button>
      <button onClick={() => navigate("/tourguide-signup")}>
        Sign up as Tourguide
      </button>
    </div>
  );
};

export default Signup;
