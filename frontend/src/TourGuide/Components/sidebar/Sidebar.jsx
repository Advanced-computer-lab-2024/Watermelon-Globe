import "./sidebar.scss";
import { useParams, useLocation } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddIcon from '@mui/icons-material/Add';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { TbLayoutDashboardFilled } from "react-icons/tb";

const Sidebar = () => {
  const { id } = useParams();
  const location = useLocation();

  // Function to determine if the menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebarAdmin">
      <div className="topAdmin">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logoAdmin">Tour Guide</span>
        </Link>
      </div>
      <hr />
      <div className="centerAdmin">
        <ul>
        <p className="titleAdmin">MAIN</p>

        <Link
            to={`/TourGuideHome/${id}`}
            style={{ textDecoration: "none" }}
          >
            <li>
              <TbLayoutDashboardFilled className="iconAdmin" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="titleAdmin">MANAGE</p>
          <Link to={`/ItineraryComponent2/${id}`} style={{ textDecoration: "none" }}>
            <li className={isActive(`/ItineraryComponent2/${id}`) ? "active-guide" : ""}>
              <CelebrationIcon className="iconAdmin" />
              <span>My Itineraries</span>
            </li>
          </Link>

          {/* All Itineraries */}
          <Link to={`/AllItineraries/${id}`} style={{ textDecoration: "none" }}>
            <li className={isActive(`/AllItineraries/${id}`) ? "active-guide" : ""}>
              <CelebrationIcon className="iconAdmin" />
              <span>All Itineraries</span>
            </li>
          </Link>

          {/* Create New Itinerary */}
          <Link to={`/CreateItinerary/${id}`} style={{ textDecoration: "none" }}>
            <li className={isActive(`/CreateItinerary/${id}`) ? "active-guide" : ""}>
              <AddIcon className="iconAdmin" />
              <span>Create an Itinerary</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
