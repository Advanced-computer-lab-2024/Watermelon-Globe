import React, { useState, useEffect } from "react";
import axios from "axios";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Link } from "react-router-dom";
import NotificationsBox from "../NotificationsBox";
import { useParams } from "react-router-dom";
import {Bell} from "lucide-react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For avatar dropdown
  const navigate= useNavigate();

  const{id}=useParams();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    console.log("drop down toggled")
  };

   // Handle Sign Out functionality
   const handleSignOut = () => {
    // Clear any stored user session or tokens if necessary
    navigate("/"); // Redirect to the main page
  };

  return (
    <>
      <div className="navbarAdmin">
        <div class="navbarBorder"></div>
        <div className="wrapperAdmin">
          <div className="topAdmin">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logoAdmin">Admin Dashboard </span>
            </Link>
          </div>

          <div className="itemsAdmin">
            <div className="itemAdmin" >
              {/* <NotificationsIcon className="iconAdmin" /> */}

              <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="w-10 h-10 rounded-full bg-[#FF3366] flex items-center justify-center border-2 border-white hover:border-secondary transition-colors"
              >
                <Bell className="w-6 h-6 text-white" />
              </button>
              <NotificationsBox
                id={id}
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
              />
            </div>
             
            </div>

            {/* <div className="itemAdmin">
              <button>
              onClick={toggleDropdown}

              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatarAdmin"

              />
              </button>

                {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                  onMouseLeave={() => setIsDropdownOpen(false)} // Close on mouse leave
                >
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 font-medium"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div> */}

<div className="itemAdmin">
  <button onClick={toggleDropdown} className="avatarButton">
    <img
      src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      alt="Avatar"
      className="avatarAdmin"
    />
  </button>

  {isDropdownOpen && (
    <div
      className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
      onMouseLeave={() => setIsDropdownOpen(false)} // Close on mouse leave
    >
      <ul className="py-2">
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 font-medium"
          onClick={handleSignOut}
        >
          Sign Out
        </li>
      </ul>
    </div>
  )}
</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

