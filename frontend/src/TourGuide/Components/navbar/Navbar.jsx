
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
                position:"absolute",
                backgroundColor: "#f1e9ed", 
                color: "#000", // White text
                padding: "20px",
                borderRadius: "5px",
                borderWidth:"2px",
                borderColor:"#46975a",
                 top: "20px", // Adjust top position
                right: "230px"

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
