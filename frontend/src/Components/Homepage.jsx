import React from "react";
import { useNavigate } from "react-router-dom";
import "../Components/Navbar.css";
import Navbar from "../Components/Navbar.jsx";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <h1 className="home-heading">Welcome to the Home Page</h1>

      <div className="home-buttons">
        <button className="home-btn" onClick={() => navigate("/BackendReq")}>
          Go to MS1 Saviour
        </button>
        <button className="home-btn" onClick={() => navigate("/GuestPage")}>
          Go to Guest Page
        </button>
        <button className="home-btn" onClick={() => navigate("/SellerLogin")}>
          Go to Seller Page
        </button>
        <button className="home-btn" onClick={() => navigate("/advertiser")}>
          Go to Advertiser Page
        </button>
        <button className="home-btn" onClick={() => navigate("/TouristLogin")}>
          Go to Tourist Page
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/TourguideHome/670137227c5a3dade4ba11dc")}
        >
          Go to Tour Guide Page
        </button>
        <button className="home-btn" onClick={() => navigate("/GovernorLogin")}>
          Go to Tourism Governor Page
        </button>

        <button
          className="home-btn"
          onClick={() => navigate("/AdminSales/674a3e827a6dcbe8e5bd8069")}
        >
          Go to Admin Page
        </button>
      </div>
    </div>
  );
};

export default HomePage;
