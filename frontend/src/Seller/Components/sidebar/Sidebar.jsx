// import "./sidebar.scss";
// import { useParams, useLocation } from "react-router-dom";
// import StoreIcon from "@mui/icons-material/Store";
// import { Link } from "react-router-dom";
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import AddIcon from '@mui/icons-material/Add';

// const Sidebar = () => {
//   const { id } = useParams();
//   const location = useLocation();

//   // Function to determine if the menu item is active
//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="sidebar">
//       <div className="top">
//         <Link to="/" style={{ textDecoration: "none" }}>
//           <span className="logo">Seller</span>
//         </Link>
//       </div>
//       <hr />
//       <div className="center">
//         <ul>
//           {/* My Products */}
//           <Link to={`/GetAllProducts/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/GetAllProducts/${id}`) ? "active" : ""}>
//               <StoreIcon className="icon" />
//               <span>My Products</span>
//             </li>
//           </Link>

//           <Link to={`/GetAllProductsGeneral/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/GetAllProductsGeneral/${id}`) ? "active" : ""}>
//               <StoreIcon className="icon" />
//               <span>All Products</span>
//             </li>
//           </Link>

//           {/* Create New Product */}
//           <Link to={`/CreateProduct/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/CreateProduct/${id}`) ? "active" : ""}>
//               <AddIcon className="icon" />
//               <span>Create New Product</span>
//             </li>
//           </Link>

//           {/* Sales and Available Quantities */}
//           <Link to={`/ViewQuantity/${id}`} style={{ textDecoration: "none" }}>
//             <li className={isActive(`/ViewQuantity/${id}`) ? "active" : ""}>
//               <ProductionQuantityLimitsIcon className="icon" />
//               <span>Sales and Available Quantities</span>
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
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AddIcon from "@mui/icons-material/Add";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Sidebar = () => {
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(""); // State to store user details

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Make an API call to fetch user details using the ID
        const response = await axios.get(`/api/Seller/GetSeller/${id}`);
        setUser(response.data); // Update state with the user details
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  // Function to determine if the menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebarAdmin">
      <div className="topAdmin">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logoAdmin">Hello , {user.Name} </span>
        </Link>
      </div>
      {/* <hr /> */}
      <div className="centerAdmin">
        <ul>
          <p className="titleAdmin">MAIN</p>

          <Link
            to="/SellerHome/6729244f151b6c9e346dd732"
            style={{ textDecoration: "none" }}
          >
            <li>
              <TbLayoutDashboardFilled className="iconAdmin" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="titleAdmin">MANAGE</p>

          {/* My Products */}
          <Link to={`/GetAllProducts/${id}`} style={{ textDecoration: "none" }}>
            <li
              className={
                isActive(`/GetAllProducts/${id}`) ? "active-seller" : ""
              }
            >
              <StoreIcon className="iconAdmin" />
              <span>My Products</span>
            </li>
          </Link>

          {/* All Products */}
          <Link
            to={`/GetAllProductsGeneral/${id}`}
            style={{ textDecoration: "none" }}
          >
            <li
              className={
                isActive(`/GetAllProductsGeneral/${id}`) ? "active-seller" : ""
              }
            >
              <StoreIcon className="iconAdmin" />
              <span>All Products</span>
            </li>
          </Link>

          {/* Create New Product */}
          <Link to={`/CreateProduct/${id}`} style={{ textDecoration: "none" }}>
            <li
              className={
                isActive(`/CreateProduct/${id}`) ? "active-seller" : ""
              }
            >
              <AddIcon className="iconAdmin" />
              <span>Create New Product</span>
            </li>
          </Link>

          {/* Sales and Available Quantities */}
          <Link to={`/ViewQuantity/${id}`} style={{ textDecoration: "none" }}>
            <li
              className={isActive(`/ViewQuantity/${id}`) ? "active-seller" : ""}
            >
              <ProductionQuantityLimitsIcon className="iconAdmin" />
              <span>Sales and Available Quantities</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
