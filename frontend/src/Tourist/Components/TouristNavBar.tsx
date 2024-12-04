import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../../Assets/Profile.png";

interface TouristNavbarProps {
  id: string | undefined;
}

const TouristNavbar: React.FC<TouristNavbarProps> = ({ id }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility state
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  const handleSignOut = () => {
    navigate("/"); // Redirect to home or login page
  };

  const handleNavigation = (path: string) => {
    navigate(path); // Navigate to the provided path
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  // Close the dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-sectionBackground shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-3xl font-bold text-secondary">
          <Link to="/Homepage" className="homeButton hover:text-secondaryHover">
            WaterMelon Globe
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to={`/Hotels/${id}`}
            className="text-secondary hover:text-secondaryHover relative group no-underline"
          >
            Hotel
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to={`/Flights/${id}`}
            className="text-secondary hover:text-secondaryHover relative group no-underline"
          >
            Flight
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to={`/ProductTourist/${id}`}
            className="text-secondary hover:text-secondaryHover relative group no-underline"
          >
            Products
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to={`/PurchasedProducts/${id}`}
            className="text-secondary hover:text-secondaryHover relative group no-underline"
          >
            Purchased Products
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-2 relative" ref={dropdownRef}>
          <button className="px-4 py-1 border border-lightGray rounded text-secondary hover:bg-secondaryHover hover:text-white transition-colors">
            EN
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-1 border border-lightGray rounded text-secondary hover:bg-secondaryHover hover:text-white transition-colors"
          >
            Sign Out
          </button>
          {/* Profile Button */}
          <button
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-white hover:border-secondary transition-colors"
          >
            <img
              src={profileIcon}
              alt="Profile Icon"
              className="w-6 h-6 rounded-full object-cover"
            />
          </button>
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg">
              <ul className="py-1">
                <li>
                  <button
                    onClick={() => handleNavigation(`/TouristDetails/${id}`)}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(`/MyBookings/${id}`)}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Itineraries/Activities
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(`/MyHotelFlightBookings/${id}`)}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Hotel/Flight Bookings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation(`/OrdersPage/${id}`)}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default TouristNavbar;
