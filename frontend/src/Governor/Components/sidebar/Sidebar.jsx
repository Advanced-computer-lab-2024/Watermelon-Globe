import "./sidebar.scss";
import { useParams, useLocation } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import { Link } from "react-router-dom";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = () => {
  const { id } = useParams(); // Extract the id from the URL
  const location = useLocation();

  // Function to determine if the menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Home</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* My Sites */}
          <Link to={`/GetMySites/${id}`} style={{ textDecoration: "none" }}>
            <li className={isActive(`/GetMySites/${id}`) ? "active" : ""}>
              <StoreIcon className="icon" />
              <span>My Sites</span>
            </li>
          </Link>


          {/* Add New Site */}
          <Link to={`/AddSite/${id}`} style={{ textDecoration: "none" }}>
            <li className={isActive(`/AddSite/${id}`) ? "active" : ""}>
              <AddIcon className="icon" />
              <span>Add New Site</span>
            </li>
          </Link>

          {/* Change Password */}
          <Link to={`/ChangePasswordGovernor/${id}`} style={{ textDecoration: "none" }}>
            <li className={isActive(`/ChangePasswordGovernor/${id}`) ? "active" : ""}>
              <ProductionQuantityLimitsIcon className="icon" />
              <span>Change Password</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
