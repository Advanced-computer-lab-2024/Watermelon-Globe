import './AdvertiserNavbar.css';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
// import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';

const Navbar = ({advertiser, advertiserId}) => {
    console.log("navbar id: ",advertiserId);
//   const { dispatch } = useContext(DarkModeContext);
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (advertiserId) {
      fetchNotifications();
    }
  }, [advertiserId]);
 

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
      const response = await fetch(`/api/advertiser/getNotificationsAdvertiser/${advertiserId}`);
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
        <ReactNotifications />
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className="icon" />
                        English
                    </div>
                    {/* <div className="item">
                        <DarkModeOutlinedIcon
                        className="icon"
                        onClick={() => dispatch({ type: "TOGGLE" })}
                        /> 
                    </div>*/}
                    <div className="item">
                        <FullscreenExitOutlinedIcon className="icon" />
                    </div>
                    <div className="item" onClick={handleNotificationsClick}>
                <NotificationsNoneOutlinedIcon className="icon" />
                <div className="counter">{notifications.length}</div>
              </div>
            
                    <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icon" />
                        <div className="counter">2</div>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon className="icon" />
                    </div>
                    <div className="profile-logo" onClick={() => navigate(`/edit-logo/${advertiserId}`)}>
                        <img
                        src={`/uploads/${advertiser?.Logo}`}
                        alt="Advertiser Logo"
                        className="logo-image"
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Navbar;

