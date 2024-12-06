import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import "./navbar.scss";

const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    
      fetchNotifications();
  
  }, [id]);

  const handleViewProfile = () => {
    navigate(`/TourGuideProfile/${id}`);
  };

  const handleNotificationsClick = async () => {
    if (showNotifications) {
      Store.removeAllNotifications();
      setShowNotifications(false);
    } else {
      const fetchedNotifications = await fetchNotifications();
      setNotifications(fetchedNotifications);
      setShowNotifications(true);
    
     fetchedNotifications.forEach((notification, index) => {
    Store.addNotification({
        id: `notification-${index}`,
        title: "New Notification",
        message: notification,
        type: "info",
        insert: "top",
        container: "top-right", // Ensure container is top-right
        animationIn: ["animate__animated", "animate__slideInRight"], // Sliding in from right
        animationOut: ["animate__animated", "animate__slideOutRight"], // Sliding out to right
        dismiss: {
          duration: 0,
          showIcon: true,
          click: true,
        },
        content: (
          <div
            style={{
              position: "absolute",
              backgroundColor: "#f1e9ed",
              color: "#000", // Text color
              padding: "5px", // Smaller padding
              fontSize: "12px", // Smaller font size
              borderRadius: "5px",
              borderWidth: "1px",
              borderColor: "#46975a",
              top: "20px",
              right: "230px",
              width: "400px", // Smaller width
              
            }}
          >
            {notification}
          </div> )
        });
      });
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/tourGuide/getNotificationsGuide/${id}`);
      const data = await response.json();
      setNotifications(data);
      return data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  return (
    <>
      <ReactNotifications /> {/* Ensure this is placed at the top */}
      <div className="navbar-guide">
        <div className="navbar-guide-wrapper">
          <div className="navbar-guide-search">
            <input type="text" placeholder="Search..." />
            <SearchOutlinedIcon />
          </div>
          <div className="navbar-guide-items">
            <div className="navbar-guide-item">
              <div className="navbar-guide-icon-container" onClick={handleNotificationsClick}>
                <NotificationsNoneOutlinedIcon className="navbar-guide-icon" />
                <div className="navbar-guide-counter">{notifications.length}</div>
              </div>
            </div>
            <div className="navbar-guide-item">
              <img
                onClick={handleViewProfile}
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="Profile"
                className="navbar-guide-avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
