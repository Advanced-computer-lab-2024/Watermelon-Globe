import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    
    fetchNotifications();

}, []);

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
    const response = await fetch(`/api/Admin/getNotificationsAdmin`);
    const data = await response.json();
    setNotifications(data);
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <ReactNotifications /> 
    <div className="navbarAdmin">
      <div className="wrapperAdmin">
        <div className="searchAdmin">
          <div className="itemAdmin">
            <ListOutlinedIcon className="iconAdmin" />
          </div>
        </div>

        <div className="itemsAdmin">
          <div className="itemAdmin" onClick={handleNotificationsClick}>
            <NotificationsIcon className="iconAdmin" />
            {notifications.length > 0 && (
              <div className="counterAdmin">{notifications.length}</div>
            )}
            {/* {showNotifications && (
              <div className="notificationsDropdown">
                {notifications.length === 0 ? (
                  <div className="notificationItem">No new notifications</div>
                ) : (
                  notifications.map((notification, index) => (
                    <div key={index} className="notificationItem">
                      <span>{notification}</span>
                      <span className="notificationTime">Just now</span>
                    </div>
                  ))
                )}
              </div>
            )} */}
          </div>
          <div className="itemAdmin">
            <ChatBubbleOutlineOutlinedIcon className="iconAdmin" />
            <div className="counterAdmin">2</div>
          </div>

          <div className="itemAdmin">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatarAdmin"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;