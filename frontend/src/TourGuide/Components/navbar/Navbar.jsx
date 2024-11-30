// import "./navbar.scss";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// // import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
// import { Navigate, useNavigate, useParams } from "react-router-dom";



// const Navbar = () => {
//   const{id}=useParams();
//   const navigate=useNavigate();
//   const handleViewProfile =()=>{
//     navigate(`/TourGuideProfile/${id}`);
//   }
//  // const { dispatch } = useContext(DarkModeContext);

//   return (
//     <div className="navbar">
//       <div className="wrapper">
//         <div className="search">
//           <input type="text" placeholder="Search..." />
//           <SearchOutlinedIcon />
//         </div>
//         <div className="items">
//           <div className="item">
//             {/* <LanguageOutlinedIcon className="icon" />
//             English */}
//           </div>
//           {/* <div className="item">
//             <DarkModeOutlinedIcon
//               className="icon"
//               onClick={() => dispatch({ type: "TOGGLE" })}
//             />
//           </div> */}
//           <div className="item">
//             {/* <FullscreenExitOutlinedIcon className="icon" /> */}
//           </div>
//           <div className="item">
//             <NotificationsNoneOutlinedIcon className="icon" />
//             <div className="counter">1</div>
//           </div>
//           <div className="item">
//             <ChatBubbleOutlineOutlinedIcon className="icon" />
//             <div className="counter">2</div>
//           </div>
//           <div className="item">
//             <ListOutlinedIcon className="icon" />
//           </div>
//           <div className="item">
//             <img onClick={()=>{handleViewProfile()}}
//               src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//               alt=""
//               className="avatar"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
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

  // Add styles for notification container dynamically
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Notification container positioning */
      .notification-container-top-right {
        top: 55px !important; /* Adjust top margin */
        right: 20px !important; /* Adjust right margin */
        position: fixed !important; /* Ensure it's fixed at the top-right */
        z-index: 9999 !important; /* Make sure it's on top of other elements */
      }

      /* Custom Notification Styles */
      .notification-item {
        background-color: #FFC0CB !important; /* Pink background */
        border-left: 8px solid #FF69B4 !important; /* Pink border */
        color: black !important; /* Set text color to black */
      }

      /* Title and Message color customization */
      .notification-item .notification-title,
      .notification-item .notification-message {
        color: black !important; /* Ensure text is readable */
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

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
