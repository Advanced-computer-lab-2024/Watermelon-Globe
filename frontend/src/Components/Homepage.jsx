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
        <button className="home-btn" onClick={() => navigate("/SellerHome/6729244f151b6c9e346dd732")}>
        {/* <button className="home-btn" onClick={() => navigate("/SellerProduct")}> */}

          Go to Seller Page
        </button>
        <button className="home-btn" onClick={() => navigate("/advertiser")}>
          Go to Advertiser Page
        </button>
        <button
          className="home-btn"
          onClick={() => navigate("/MainTouristPage/672f80816271465fd87bbddf")}
        >
          Go to Tourist Page
        </button>
        <button
          className="home-btn"
          // onClick={() => navigate("/TourGuideHome/670137227c5a3dade4ba11dc")}
           onClick={() => navigate("/TourguideHome/670137227c5a3dade4ba11dc")}

        >
          Go to Tour Guide Page
        </button>
        <button className="home-btn" onClick={() => navigate("/GovernorHomePage/67475d9cf7b8b43827b99e08")}>
          Go to Tourism Governor Page
        </button>
        <button className="home-btn" onClick={() => navigate("/AdminHomepage")}>
          Go to Admin Page
        </button>

        <button className="home-btn" onClick={() => navigate("/AdminHome++")}>
          Go to Admin++ Page
        </button>
      </div>
    </div>
  );
};

export default HomePage;
