

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

import "./sidebar.scss";
import { useParams, useLocation } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddIcon from '@mui/icons-material/Add';
import CelebrationIcon from '@mui/icons-material/Celebration';

const Sidebar = () => {
  const { id } = useParams();
  const location = useLocation();

  // Function to determine if the menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-guide">
      <div className="top-guide">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo-guide">Tour Guide</span>
        </Link>
      </div>
      <hr />
      <div className="center-guide">
        <ul>
          {/* My Products */}
          <Link to={`/ItineraryComponent2/${id}`} style={{ textDecoration: "none" }}>
            <li className={isActive(`/ItineraryComponent2/${id}`) ? "active-guide" : ""}>
              <CelebrationIcon className="icon-guide" />
              <span>My Itineraries</span>
            </li>
          </Link>

          {/* All Itineraries */}
          <Link to={`/AllItineraries/${id}`} style={{ textDecoration: "none" }}>
            <li className={isActive(`/AllItineraries/${id}`) ? "active-guide" : ""}>
              <CelebrationIcon className="icon-guide" />
              <span>All Itineraries</span>
            </li>
          </Link>

          {/* Create New Itinerary */}
          <Link to={`/CreateItinerary/${id}`} style={{ textDecoration: "none" }}>
            <li className={isActive(`/CreateItinerary/${id}`) ? "active-guide" : ""}>
              <AddIcon className="icon-guide" />
              <span>Create an Itinerary</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
