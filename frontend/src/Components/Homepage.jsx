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
        <button className="home-btn" onClick={() => navigate("/SellerHome/6752d9fa9feae2aed06544b0")}>
          Go to Seller Page
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/advertiser/6728a73cf4ea4e0bd3d3b965")}
        >
          Go to Advertiser Page
        </button>
        <button className="home-btn" onClick={() => navigate("/MainTouristPage/67532485209ad8bcb291154d")}>
          Go to Tourist Page
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/TourguideHome/67013a5ea61889a87c124818")}
        >
          Go to Tour Guide Page
        </button>
        <button className="home-btn" onClick={() => navigate("/GovernorHomePage/67475d9cf7b8b43827b99e08")}>
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
