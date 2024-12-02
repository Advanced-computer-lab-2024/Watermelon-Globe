import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  // const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbarAdmin">
      <div className="wrapperAdmin">
        <div className="searchAdmin">
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}
          <div className="itemAdmin">
            <ListOutlinedIcon className="iconAdmin" />
          </div>
        </div>

        <div className="itemsAdmin">
          {/* <div className="itemAdmin">
            <LanguageOutlinedIcon className="iconAdmin" />
            English
          </div> */}
          {/* <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div> */}
          {/* <div className="itemAdmin">
            <FullscreenExitOutlinedIcon className="iconAdmin" />
          </div> */}
          <div className="itemAdmin">
            <NotificationsIcon className="iconAdmin" />
            <div className="counterAdmin">1</div>
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
  );
};

export default Navbar;
