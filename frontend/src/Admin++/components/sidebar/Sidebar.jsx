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
    <div className="sidebarAdmin">
      {/* Top */}
      <div className="topAdmin">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logoAdmin">Watermelon Globe </span>
        </Link>
      </div>

      <hr />

      {/* Center */}
      <div className="centerAdmin">
        <ul>
          <p className="titleAdmin">MAIN</p>

          <li>
            <TbLayoutDashboardFilled className="iconAdmin" />
            <span>Dashboard</span>
          </li>

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
              <MdCategory className="iconAdmin" />
              <span>Activity Categories</span>
            </li>
          </Link>

          <Link to="/Tags" style={{ textDecoration: "none" }}>
            <li>
              <IoIosPricetags className="iconAdmin" />
              <span>Prefrence Tags</span>
            </li>
          </Link>

          <p className="titleAdmin">PRODUCTS</p>
          <li>
            <FaCartArrowDown className="iconAdmin" />
            <span>Products</span>
          </li>

          <li>
            <HiQrcode className="iconAdmin" />
            <span>Promo Code</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
