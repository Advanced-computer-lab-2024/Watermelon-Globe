

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

const Sidebar = () => {
  const { id } = useParams();
  const location = useLocation();

  // Function to determine if the menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar-seller">
      <div className="top-seller">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo-seller">Seller</span>
        </Link>
      </div>
      <hr />
      <div className="center-seller">
        <ul>
          {/* My Products */}
          <Link to={`/GetAllProducts/${id}`} style={{ textDecoration: "none" }}>
            <li
              className={isActive(`/GetAllProducts/${id}`) ? "active-seller" : ""}
            >
              <StoreIcon className="icon-seller" />
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
                isActive(`/GetAllProductsGeneral/${id}`)
                  ? "active-seller"
                  : ""
              }
            >
              <StoreIcon className="icon-seller" />
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
              <AddIcon className="icon-seller" />
              <span>Create New Product</span>
            </li>
          </Link>

          {/* Sales and Available Quantities */}
          <Link to={`/ViewQuantity/${id}`} style={{ textDecoration: "none" }}>
            <li
              className={
                isActive(`/ViewQuantity/${id}`) ? "active-seller" : ""
              }
            >
              <ProductionQuantityLimitsIcon className="icon-seller" />
              <span>Sales and Available Quantities</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
