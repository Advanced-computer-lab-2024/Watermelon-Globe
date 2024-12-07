// import "./sidebar.scss";
// import { useParams, useLocation } from "react-router-dom";
// import StoreIcon from "@mui/icons-material/Store";
// import { Link } from "react-router-dom";
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import AddIcon from '@mui/icons-material/Add';
// import CelebrationIcon from '@mui/icons-material/Celebration';

// const Sidebar = () => {
//   const { id } = useParams();
//   const location = useLocation();

//   // Function to determine if the menu item is active
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="sidebar">
//       <div className="top">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span className="logo">Tour Guide</span>
//         </Link>
//       </div>
//       <hr />
//       <div className="center">
//         <ul>
//           {/* My Products */}
//           <Link to={`/ItineraryComponent2/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/ItineraryComponent2/${id}`) ? "active" : ""}>
//               <CelebrationIcon className="icon" />
//               <span>My Itineraries</span>
//             </li>
//           </Link>

//           {/* Create New Product */}
//           <Link to={`/AllItineraries/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/AllItineraries/${id}`) ? "active" : ""}>
//               <CelebrationIcon className="icon" />
//               <span>All Itineraries</span>
//             </li>
//           </Link>

//           {/* Sales and Available Quantities */}
//           <Link to={`/CreateItinerary/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/CreateItinerary/${id}`) ? "active" : ""}>
//               <AddIcon className="icon" />
//               <span>Create an Itinerary</span>
//             </li>
//           </Link>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import "./sidebar.scss";
// import { useParams, useLocation } from "react-router-dom";
// import StoreIcon from "@mui/icons-material/Store";
// import { Link } from "react-router-dom";
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import AddIcon from '@mui/icons-material/Add';
// import CelebrationIcon from '@mui/icons-material/Celebration';

// const Sidebar = () => {
//   const { id } = useParams();
//   const location = useLocation();

//   // Function to determine if the menu item is active
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="sidebar-guide">
//       <div className="top-guide">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span className="logo-guide">Tour Guide</span>
//         </Link>
//       </div>
//       <hr />
//       <div className="center-guide">
//         <ul>
//           {/* My Products */}
//           <Link to={`/ItineraryComponent2/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/ItineraryComponent2/${id}`) ? "active-guide" : ""}>
//               <CelebrationIcon className="icon-guide" />
//               <span>My Itineraries</span>
//             </li>
//           </Link>

//           {/* All Itineraries */}
//           <Link to={`/AllItineraries/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/AllItineraries/${id}`) ? "active-guide" : ""}>
//               <CelebrationIcon className="icon-guide" />
//               <span>All Itineraries</span>
//             </li>
//           </Link>

//           {/* Create New Itinerary */}
//           <Link to={`/CreateItinerary/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/CreateItinerary/${id}`) ? "active-guide" : ""}>
//               <AddIcon className="icon-guide" />
//               <span>Create an Itinerary</span>
//             </li>
//           </Link>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import "./sidebar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserCog } from "react-icons/fa";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { TbSettingsCode } from "react-icons/tb";
import { HiQrcode } from "react-icons/hi";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import { MdOutlineTravelExplore } from "react-icons/md";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import MovingRoundedIcon from "@mui/icons-material/MovingRounded";
const Sidebar = (selectedTab, setSelectedTab) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenEvent, setIsDropdownOpenEvent] = useState(false);
  const [isDropdownOpenProductView, setIsDropdownProductView] = useState(false);
  const [isDropdownOpenProductAdd, setIsDropdownProductAdd] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownEvent = () => {
    setIsDropdownOpenEvent(!isDropdownOpenEvent);
  };

  const toggleDropdownProductView = () => {
    setIsDropdownProductView(!isDropdownOpenProductView);
  };
  const toggleDropdownProductAdd = () => {
    setIsDropdownProductAdd(!isDropdownOpenProductAdd);
  };

  return (
    <div className="sidebarAdmin">
      <div className="topAdmin">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logoAdmin">Hello, </span>
        </Link>
      </div>
      {/* <hr /> */}
      <div className="centerAdmin">
        <ul>
          <p className="titleAdmin">MAIN</p>

          <Link
            to="/AdminSales/674f760ed6b7ba513c4ea84d"
            style={{ textDecoration: "none" }}
            onClick={() => setSelectedTab("Dashboard")}
          >
            <li className={selectedTab === "Dashboard" ? "active-tab" : ""}>
              <TbLayoutDashboardFilled className="iconAdmin" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="titleAdmin">Itinearies</p>

          <Link to="/Categories" style={{ textDecoration: "none" }}>
            <li>
              <MovingRoundedIcon className="iconAdmin" />
              <span>My Iteneraries</span>
            </li>
          </Link>

          <Link to="/Categories" style={{ textDecoration: "none" }}>
            <li>
              <MdOutlineTravelExplore className="iconAdmin" />
              <span>All Iteneraries</span>
            </li>
          </Link>

          <p className="titleAdmin">Manage Account</p>
          <Link to="/Categories" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleRoundedIcon className="iconAdmin" />
              <span>View Profile</span>
            </li>
          </Link>
          <Link to="/Categories" style={{ textDecoration: "none" }}>
            <li>
              <PasswordRoundedIcon className="iconAdmin" />
              <span>Change Password</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

<Link to="/Tags" style={{ textDecoration: "none" }}>
  <li>
    <IoIosPricetags className="iconAdmin" />
    <span>Prefrence Tags</span>
  </li>
</Link>;
