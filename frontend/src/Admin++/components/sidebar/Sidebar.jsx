import "./sidebar.scss";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
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
const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenEvent, setIsDropdownOpenEvent] = useState(false);
  const [isDropdownOpenProductView, setIsDropdownProductView] = useState(false);
  const [isDropdownOpenProductAdd, setIsDropdownProductAdd] = useState(false);

  const { id } = useParams();

  const [user, setUser] = useState(""); // State to store user details

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Make an API call to fetch user details using the ID
        const response = await axios.get(`/api/Admin/getAdmin/${id}`);
        setUser(response.data); // Update state with the user details
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

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
          <span className="logoAdmin">Hello, {user.username}</span>
        </Link>
      </div>
      {/* <hr /> */}
      <div className="centerAdmin">
        <ul>
          <p className="titleAdmin">MAIN</p>

          <Link
            to={`/AdminSales/${id}`}
            style={{ textDecoration: "none" }}
            // onClick={() => setSelectedTab("Dashboard")}
          >
            {/* <li className={selectedTab === "Dashboard" ? "active-tab" : ""}> */}
            <li>
              <TbLayoutDashboardFilled className="iconAdmin" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="titleAdmin">MANAGE</p>
          <li onClick={toggleDropdown} style={{ cursor: "pointer" }}>
            <FaUserCog className="iconAdmin" />
            <span className="manage-textAdmin">
              Users
              {isDropdownOpen ? (
                <FaAngleDown className="arrowAdmin" />
              ) : (
                <FaAngleRight className="arrowAdmin" />
              )}
            </span>
          </li>

          {isDropdownOpen && (
            <ul className="dropdownAdmin">
              <Link to={`/AddAdmins/${id}`} style={{ textDecoration: "none" }}>
                <li>
                  <span>Add Admin</span>
                </li>
              </Link>
              <Link
                to={`/AddGoverner/${id}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <span>Add Governor</span>
                </li>
              </Link>
              <Link to={`/Tourists/${id}`} style={{ textDecoration: "none" }}>
                <li>
                  <span>View All Tourists</span>
                </li>
              </Link>
              <Link
                to={`/ManageActive/${id}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <span>View Active Users</span>
                </li>
              </Link>
              <Link
                to={`/ManagePending/${id}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <span>View Pending Users</span>
                </li>
              </Link>
            </ul>
          )}

          <li onClick={toggleDropdownEvent} style={{ cursor: "pointer" }}>
            <MdEvent className="iconAdmin" />
            <span className="manage-textAdmin">
              Events & Itineraries
              {isDropdownOpenEvent ? (
                <FaAngleDown className="arrowAdmin" />
              ) : (
                <FaAngleRight className="arrowAdmin" />
              )}
            </span>
          </li>

          {isDropdownOpenEvent && (
            <ul className="dropdownAdmin">
              <Link
                to={`/ViewItinerariesEvents/${id}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <span>View Events/Itineraries</span>
                </li>
              </Link>
              <Link to="/complaintss" style={{ textDecoration: "none" }}>
                <li>
                  <span>View Complaints</span>
                </li>
              </Link>
            </ul>
          )}

          <Link to={`/Categories/${id}`} style={{ textDecoration: "none" }}>
            <li>
              <MdCategory className="iconAdmin" />
              <span>Activity Categories</span>
            </li>
          </Link>

          <Link to={`/Tags/${id}`} style={{ textDecoration: "none" }}>
            <li>
              <IoIosPricetags className="iconAdmin" />
              <span>Prefrence Tags</span>
            </li>
          </Link>

          <p className="titleAdmin">PRODUCTS</p>

          <li onClick={toggleDropdownProductView} style={{ cursor: "pointer" }}>
            <FaCartArrowDown className="iconAdmin" />
            <span className="manage-textAdmin">
              &nbsp;&nbsp;&nbsp;View Products
              {isDropdownOpenProductView ? (
                <FaAngleDown className="arrowAdmin" />
              ) : (
                <FaAngleRight className="arrowAdmin" />
              )}
            </span>
          </li>

          {isDropdownOpenProductView && (
            <ul className="dropdownAdmin">
              <Link
                to={`/viewAllProducts/${id}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <span>View All Products</span>
                </li>
              </Link>
              <Link
                to={`/viewMyProducts/${id}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <span>View My Products</span>
                </li>
              </Link>
              {/* <Link
                to={`/viewSaleQuantities/${id}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <span>View Sales & Quantites</span>
                </li>
              </Link> */}
            </ul>
          )}

          <li onClick={toggleDropdownProductAdd} style={{ cursor: "pointer" }}>
            <AddCircleIcon className="iconAdmin" />
            <span className="manage-textAdmin">
              Add Products & Promo Code
              {isDropdownOpenProductAdd ? (
                <FaAngleDown className="arrowAdmin" />
              ) : (
                <FaAngleRight className="arrowAdmin" />
              )}
            </span>
          </li>

          {isDropdownOpenProductAdd && (
            <ul className="dropdownAdmin">
              <Link
                to={`/adminAddProduct/${id}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <span>Add Product</span>
                </li>
              </Link>
              <Link
                to={`/adminAddPromoCode/${id}`}
                style={{ textDecoration: "none" }}
              >
                <li>
                  <span>Add Promo Code</span>
                </li>
              </Link>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
