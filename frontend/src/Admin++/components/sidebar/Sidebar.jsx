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
const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenEvent, setIsDropdownOpenEvent] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownEvent = () => {
    setIsDropdownOpenEvent(!isDropdownOpenEvent);
  };

  return (
    <div className="sidebar">
      {/* Top */}
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Watermelon Globe </span>
        </Link>
      </div>

      <hr />

      {/* Center */}
      <div className="center">
        <ul>
          <p className="title">MAIN</p>

          <li>
            <TbLayoutDashboardFilled className="icon" />
            <span>Dashboard</span>
          </li>

          <p className="title">MANAGE</p>
          <li onClick={toggleDropdown} style={{ cursor: "pointer" }}>
            <FaUserCog className="icon" />
            <span className="manage-text">
              Users
              {isDropdownOpen ? (
                <FaAngleDown className="arrow" />
              ) : (
                <FaAngleRight className="arrow" />
              )}
            </span>
          </li>

          {isDropdownOpen && (
            <ul className="dropdown">
              <Link to="/AddAdmins" style={{ textDecoration: "none" }}>
                <li>
                  <span>Add Admin</span>
                </li>
              </Link>
              <Link to="/AddGoverner" style={{ textDecoration: "none" }}>
                <li>
                  <span>Add Governor</span>
                </li>
              </Link>
              <Link to="/ManageActive" style={{ textDecoration: "none" }}>
                <li>
                  <span>View Active Users</span>
                </li>
              </Link>
              <Link to="/ManagePending" style={{ textDecoration: "none" }}>
                <li>
                  <span>View Pending Users</span>
                </li>
              </Link>
            </ul>
          )}

          <li onClick={toggleDropdownEvent} style={{ cursor: "pointer" }}>
            <MdEvent className="icon" />
            <span className="manage-text">
              Events & Itineraries
              {isDropdownOpenEvent ? (
                <FaAngleDown className="arrow" />
              ) : (
                <FaAngleRight className="arrow" />
              )}
            </span>
          </li>

          {isDropdownOpenEvent && (
            <ul className="dropdown">
              <Link to="/users/admins" style={{ textDecoration: "none" }}>
                <li>
                  <span>View Events/Itineraries</span>
                </li>
              </Link>
              <Link to="/users/governers" style={{ textDecoration: "none" }}>
                <li>
                  <span>View Complaints</span>
                </li>
              </Link>
            </ul>
          )}
          <Link to="/Categories" style={{ textDecoration: "none" }}>
            <li>
              <MdCategory className="icon" />
              <span>Activity Categories</span>
            </li>
          </Link>

          <Link to="/Tags" style={{ textDecoration: "none" }}>
            <li>
              <IoIosPricetags className="icon" />
              <span>Prefrence Tags</span>
            </li>
          </Link>

          <p className="title">PRODUCTS</p>
          <li>
            <FaCartArrowDown className="icon" />
            <span>Products</span>
          </li>

          <li>
            <HiQrcode className="icon" />
            <span>Promo Code</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
