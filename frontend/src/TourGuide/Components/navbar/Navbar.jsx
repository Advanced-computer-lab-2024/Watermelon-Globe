
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
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 0,
            showIcon: true,
            click: true,
          },
          content: (
            <div
              style={{
                backgroundColor: "#ff69b4", // Pink background
                color: "#fff", // White text
                padding: "10px",
                borderRadius: "5px",
                marginRight:100,
                position:"absolute"
              }}
            >
              {notification}
            </div>)
        });
      });
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/tourGuide/getNotificationsGuide/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };

  return (
    <>
      <ReactNotifications /> {/* Ensure this is placed at the top */}
      <div className="navbar">
        <div className="wrapper">
          <div className="search">
            <input type="text" placeholder="Search..." />
            <SearchOutlinedIcon />
          </div>
          <div className="items">
            <div className="item">
              <div className="icon-container" onClick={handleNotificationsClick}>
                <NotificationsNoneOutlinedIcon className="icon" />
                <div className="counter">{notifications.length}</div>
              </div>
            </div>
            <div className="item">
              <img
                onClick={handleViewProfile}
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
