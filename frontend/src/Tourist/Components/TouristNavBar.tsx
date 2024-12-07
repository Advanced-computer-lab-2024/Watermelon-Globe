import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import profileIcon from "../../Assets/Profile.png";
import { Bell } from "lucide-react";
import NotificationsBox from "./NotificationsBox";
import { FaShoppingCart, FaWallet } from 'react-icons/fa'
import WalletComponent from '../Components/Wallet';

interface TouristNavbarProps {
  id: string | undefined;
}

const TouristNavbar: React.FC<TouristNavbarProps> = ({ id }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  const openWallet = () => {
    setIsWalletOpen(true);
  };
}

const openWallet = () => {
  setIsWalletOpen(true);
};
  const closeWallet = () => {
    setIsWalletOpen(false);
  };

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

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/notifications/count/${id}`);
        const data = await response.json();
        setNotificationCount(data.count);
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();
  }, [id]);

  return (
    <header className="fixed top-0 left-0 w-full bg-sectionBackground shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-4 w-1/3">
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:text-secondaryHover transition duration-200 w-8 h-8 flex items-center justify-center"
            style={{ backgroundColor: "transparent" }}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-3xl font-bold text-secondary">
            <Link
              to="/Homepage"
              className="homeButton hover:text-secondaryHover"
            >
              WaterMelon Globe
            </Link>
          </div>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex justify-center space-x-4 w-1/3">
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

        {/* Right Section - Actions */}
        <div className="flex items-center justify-end space-x-3 relative w-1/3" ref={dropdownRef}>
          <button
            onClick={() => handleNavigation(`/shoppingCart/${id}`)}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 hover:bg-primary flex-shrink-0"
          >
            <FaShoppingCart />
          </button>
          <button
            onClick={openWallet}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 hover:bg-primary flex-shrink-0"
          >
            <FaWallet />
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 hover:bg-primary flex-shrink-0"
              >
              <Bell className="w-6 h-6 text-black" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <NotificationsBox
              id={id}
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div>

          {/* Profile Button */}
          <button
            onClick={toggleDropdown}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 hover:bg-primary flex-shrink-0"
          >
            <img
              src={profileIcon}
              alt="Profile Icon"
              className="w-6 h-6 rounded-full"
            />
          </button>
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
                    onClick={() =>
                      handleNavigation(`/MyHotelFlightBookings/${id}`)
                    }
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
                    onClick={() => handleNavigation(`/TouristBookmarks/${id}`)}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Bookmarks
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
      {isWalletOpen && (
        <WalletComponent touristId={id} onClose={closeWallet} />
      )}
    </header>
  );
};

export default TouristNavbar;

