import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { Button } from "./ui/button";
import Modal from "../Components/Modal"; // Import a reusable modal component
import logoImage from "../Assets/logo.png"; // Adjust the path accordingly

import { ArrowLeft } from "react-feather";
export default function GuestNavbarRegister() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full bg-sectionBackground shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 text-3xl font-bold text-secondary">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:text-secondaryHover transition duration-200 w-8 h-8 flex items-center justify-center"
            style={{ backgroundColor: "transparent" }}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <img
            src={logoImage}
            alt="Logo"
            className="w-8 h-8" // Adjust size as needed
          />
          <Link to="/" className="homeButton ml-2 hover:text-secondaryHover">
            WaterMelon Globe
          </Link>
        </div>
      </nav>
    </header>
  );
}
