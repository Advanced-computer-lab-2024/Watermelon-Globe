import React from "react";
import { useNavigate } from "react-router-dom";
import GuestNavbar from "../Guest/Components/GuestNavBar";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GuestNavbar />

      <div className="flex-1 flex flex-col justify-center items-center p-4 mt-6">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Welcome to the Home Page
        </h1>

        {/* Centering the buttons in the middle of the screen */}
        <div className="flex flex-col justify-center items-center gap-4 w-full max-w-md">
          <button
            className="home-btn py-2 px-6 w-64 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryHover transition-colors"
            onClick={() => navigate("/BackendReq")}
          >
            Go to MS1 Saviour
          </button>
          <button
            className="home-btn py-2 px-6 w-64 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryHover transition-colors"
            onClick={() => navigate("/GuestPage")}
          >
            Go to Guest Page
          </button>
          <button
            className="home-btn py-2 px-6 w-64 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryHover transition-colors"
            onClick={() => navigate("/SellerLogin")}
          >
            Go to Seller Page
          </button>
          <button
            className="home-btn py-2 px-6 w-64 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryHover transition-colors"
            onClick={() => navigate("/advertiser")}
          >
            Go to Advertiser Page
          </button>
          <button
            className="home-btn py-2 px-6 w-64 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryHover transition-colors"
            onClick={() => navigate("/TouristLogin")}
          >
            Go to Tourist Page
          </button>
          <button
            className="home-btn py-2 px-6 w-64 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryHover transition-colors"
            onClick={() => navigate("/TourguideHome/670137227c5a3dade4ba11dc")}
          >
            Go to Tour Guide Page
          </button>
          <button
            className="home-btn py-2 px-6 w-64 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryHover transition-colors"
            onClick={() => navigate("/GovernorLogin")}
          >
            Go to Tourism Governor Page
          </button>
          <button
            className="home-btn py-2 px-6 w-64 bg-secondary text-white rounded-lg shadow-md hover:bg-secondaryHover transition-colors"
            onClick={() => navigate("/AdminSales/674f760ed6b7ba513c4ea84d")}
          >
            Go to Admin Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
