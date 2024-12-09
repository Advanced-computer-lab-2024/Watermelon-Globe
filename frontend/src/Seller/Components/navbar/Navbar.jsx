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
import { Bell } from "lucide-react";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sellerLogo, setSellerLogo] = useState(null);
  const { id } = useParams();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const fetchSellerLogo = async () => {
      try {
        const response = await fetch(`/api/Seller/GetSeller/${id}`);
        const data = await response.json();
        if (data.Logo) {
          setSellerLogo(`/uploads/${data.Logo}`);
        }
      } catch (error) {
        console.error("Error fetching seller logo:", error);
      }
    };
    fetchSellerLogo();
  }, [id]);

  return (
    <>
      <div className="navbarAdmin">
        <div class="navbarBorder"></div>
        <div className="wrapperAdmin">
          <div className="topAdmin">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logoAdmin">SELLER DASHBOARD </span>
            </Link>
          </div>

          <div className="itemsAdmin">
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

            <div className="itemAdmin">
              {sellerLogo ? (
                <img
                  src={sellerLogo}
                  alt="Seller Logo"
                  className="avatarAdmin w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="avatarAdmin w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Logo</span>
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
