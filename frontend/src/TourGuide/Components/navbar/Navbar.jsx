
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import NotificationsBox from "../NotificationsBox";
import "./navbar.scss";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [guideLogo, setGuideLogo] = useState(null);
  const { id } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown visibility
  const navigate = useNavigate();

  // Fetch tour guide logo on component mount
  useEffect(() => {
    const fetchTourguideLogo = async () => {
      try {
        const response = await fetch(`/api/TourGuide/getGuide/${id}`);
        const data = await response.json();
        if (data.Logo) {
          setGuideLogo(`/uploads/${data.Logo}`);
        }
      } catch (error) {
        console.error("Error fetching tour guide logo:", error);
      }
    };
    fetchTourguideLogo();
  }, [id]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle Sign Out functionality
  const handleSignOut = () => {
    // Clear any stored user session or tokens if necessary
    navigate("/"); // Redirect to the main page
  };

  return (
    <div className="navbarAdmin">
      <div className="navbarBorder"></div>
      <div className="wrapperAdmin">
        <div className="topAdmin">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logoAdmin">GUIDE DASHBOARD</span>
          </Link>
        </div>

        <div className="itemsAdmin">
          {/* Notifications Button */}
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

          {/* Avatar and Dropdown */}
          <div className="itemAdmin relative">
            {guideLogo ? (
              <img
                src={guideLogo}
                alt="Tour Guide Logo"
                className="avatarAdmin w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
              />
            ) : (
              <div
                className="avatarAdmin w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <span className="text-gray-600 text-sm">Logo</span>
              </div>
            )}

            {/* Dropdown Menu */}
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
  );
};

export default Navbar;


