import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Modal from "../Components/Modal"; // Import a reusable modal component

export default function GuestNavbar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowModal(true); // Show the modal when a button is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleSignUpRedirect = () => {
    navigate(`/tourist-signup`);
  };


  return (
    <header className="fixed top-0 left-0 w-full bg-sectionBackground shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center">
        {/* Logo Section */}
        <div className="text-3xl font-bold text-secondary">
          <Link to="/Homepage" className="homeButton hover:text-secondaryHover">
            WaterMelon Globe
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-4 w-1/3">
          <Link
            to={`/tourist-signup`}
            className="text-secondary hover:text-secondaryHover relative group no-underline"
          >
            Hotel
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to={`/tourist-signup`}
            className="text-secondary hover:text-secondaryHover relative group no-underline"
          >
            Flight
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to={`/tourist-signup`}
            className="text-secondary hover:text-secondaryHover relative group no-underline"
          >
            Products
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="text-secondary hover:bg-secondaryHover hover:text-white">
            Login
          </Button>
          <Button 
          onClick={() => navigate(`/signup-options`)}
          variant="outline" className="text-secondary hover:bg-secondaryHover hover:text-white">
            Sign Up
          </Button>
        </div>
      </nav>
    </header>
  );
}

