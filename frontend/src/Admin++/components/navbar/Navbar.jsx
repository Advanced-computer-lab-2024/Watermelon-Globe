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


const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const{id}=useParams();

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

// import React, { useState, useEffect } from "react";
// import { Button, Menu, MenuItem, IconButton, Avatar } from "@mui/material";
// import { Bell, HelpCircle, Mail } from "lucide-react"; // Import MUI and Lucide icons
// import { ChevronDown } from "lucide-react";
// import Sidebar from "../sidebar/Sidebar"; // Sidebar component (make sure it is created)
// import Store from "react-notifications-component"; // Assuming this is your notification store for managing notifications

// const Navbar = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null); // To control dropdown menu

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   // Fetch notifications from API
//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch("/api/Admin/getNotificationsAdmin");
//       const data = await response.json();
//       setNotifications(data);
//       return data;
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//       return [];
//     }
//   };

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleNotificationsClick = async () => {
//     if (showNotifications) {
//       // Remove all notifications and close the menu
//       Store.removeAllNotifications();
//       setShowNotifications(false);
//     } else {
//       const fetchedNotifications = await fetchNotifications();
//       setNotifications(fetchedNotifications);
//       setShowNotifications(true);

//       fetchedNotifications.forEach((notification, index) => {
//         Store.addNotification({
//           id: `notification-${index}`,
//           title: "New Notification",
//           message: notification,
//           type: "info",
//           insert: "top",
//           container: "top-right", // Ensure container is top-right
//           animationIn: ["animate__animated", "animate__slideInRight"], // Sliding in from right
//           animationOut: ["animate__animated", "animate__slideOutRight"], // Sliding out to right
//           dismiss: {
//             duration: 0,
//             showIcon: true,
//             click: true,
//           },
//           content: (
//             <div
//               style={{
//                 position: "absolute",
//                 backgroundColor: "#f1e9ed",
//                 color: "#000", // Text color
//                 padding: "5px", // Smaller padding
//                 fontSize: "12px", // Smaller font size
//                 borderRadius: "5px",
//                 borderWidth: "1px",
//                 borderColor: "#46975a",
//                 top: "20px",
//                 right: "230px",
//                 width: "400px", // Smaller width
//               }}
//             >
//               {notification}
//             </div>
//           ),
//         });
//       });
//     }
//   };

//   return (
//     <>
//       <nav className="bg-white border-b border-gray-200 fixed w-full z-10 py-2 px-6">
//         <div className="flex items-center justify-between h-14">
//           {/* Watermelon Globe (Left aligned) */}
//           <div className="flex items-center gap-2">
//             <span className="text-xl font-semibold text-[#e89bb5]">
//               Watermelon Globe
//             </span>
//           </div>

//           {/* Right-aligned components */}
//           <div className="flex items-center gap-4">
//             {/* Bell Icon Button with Notifications */}
//             <IconButton
//               onClick={handleNotificationsClick}
//               className="hover:bg-[#f6d8e576] relative"
//             >
//               <Bell className="h-5 w-5 text-[#d32e65]" />
//               <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#91c297] rounded-full" />
//             </IconButton>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="hover:bg-[#f6d8e576]"
//             >
//               <HelpCircle className="h-5 w-5 text-[#d32e65]" />
//             </Button>

//             <Button
//               variant="ghost"
//               size="icon"
//               className="hover:bg-[#f6d8e576] relative"
//             >
//               <Mail className="h-5 w-5 text-[#d32e65]" />
//               <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#91c297] rounded-full" />
//             </Button>

//             {/* Avatar IconButton with dropdown */}
//             <IconButton
//               onClick={handleMenuClick}
//               className="hover:bg-[#f6d8e576] pl-3"
//             >
//               <Avatar className="h-8 w-8 mr-2">
//                 <img
//                   src="/placeholder.svg"
//                   alt="user"
//                   className="w-full h-full object-cover"
//                 />
//               </Avatar>
//               <span className="text-sm font-medium text-gray-600 mr-1">
//                 John David
//               </span>
//               <ChevronDown className="h-4 w-4 text-gray-400" />
//             </IconButton>

//             {/* Dropdown Menu */}
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleMenuClose}
//             >
//               <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
//               <MenuItem onClick={handleMenuClose}>Sign out</MenuItem>
//             </Menu>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
