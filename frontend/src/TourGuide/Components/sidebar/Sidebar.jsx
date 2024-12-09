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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosPricetags } from "react-icons/io";
import { MdOutlineTravelExplore } from "react-icons/md";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import MovingRoundedIcon from "@mui/icons-material/MovingRounded";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
const Sidebar = () => {
  const { id } = useParams();
  const [user, setUser] = useState(""); // State to store user details

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Make an API call to fetch user details using the ID
        const response = await axios.get(`/api/TourGuide/getGuide/${id}`);
        setUser(response.data); // Update state with the user details
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div className="sidebarAdmin">
      <div className="topAdmin">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logoAdmin">Hello, {user.username} </span>
        </Link>
      </div>
      {/* <hr /> */}
      <div className="centerAdmin">
        <ul>
          <p className="titleAdmin">MAIN</p>

          <Link
            to={`/TourguideHome/${id}`}
            style={{ textDecoration: "none" }}
            // onClick={() => setSelectedTab("Dashboard")}
          >
            {/* <li className={selectedTab === "Dashboard" ? "active-tab" : ""}> */}
            <li>
              <TbLayoutDashboardFilled className="iconAdmin" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="titleAdmin">ITINERARIES</p>

          <Link
            to={`/ViewMyItineraries/${id}`}
            style={{ textDecoration: "none" }}
          >
            <li>
              <MovingRoundedIcon className="iconAdmin" />
              <span>My Iteneraries</span>
            </li>
          </Link>

          <Link
            to={`/ViewItineraries/${id}`}
            style={{ textDecoration: "none" }}
          >
            <li>
              <MdOutlineTravelExplore className="iconAdmin" />
              {/* <span>All Iteneraries</span> */}
              <span>&nbsp;&nbsp;&nbsp;All Iteneraries</span>
            </li>
          </Link>

          <Link to={`/CreateItinerary/${id}`} style={{ textDecoration: "none" }}>
            <li>
              <AddIcon className="iconAdmin" />
              <span>Add Iteneraries</span>
            </li>
          </Link>

          <p className="titleAdmin">MANAGE ACCOUNT</p>
          <Link to={`/TourGuideProfile/${id}`} style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleRoundedIcon className="iconAdmin" />
              <span>View Profile</span>
            </li>
          </Link>
          <Link to={`/changePasswordTourGuide/${id}`} style={{ textDecoration: "none" }}>
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
