import React, { useContext } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreateIcon from '@mui/icons-material/Create';
import StoreIcon from "@mui/icons-material/Store";
import { FaChartLine } from "react-icons/fa";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { DarkModeContext } from "../Context/darkModeContext";

const Sidebar = ({ advertiser, advertiserId, selectedTab, setSelectedTab }) => {
    const { dispatch } = useContext(DarkModeContext);

    return (
        <div className="sidebar">
        <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Watermelon Globe</span>
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link
                    style={{textDecoration: "none"}}
                    onClick={() => setSelectedTab('Dashboard')}>
                        <li className={selectedTab === "Dashboard" ? 'active-tab' : ''}>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                </Link>
                
                <p className="title">ACTIVITIES</p>
                <Link
                    style={{ textDecoration: "none" }}
                    onClick={() => setSelectedTab('addActivity')}>
                    <li className={selectedTab === 'addActivity' ? 'active-tab' : ''}> 
                        <CreateIcon className="icon" />
                        <span>Create Activity</span>
                    </li>
                </Link>
                <Link
                    style={{ textDecoration: "none" }}
                    onClick={() => setSelectedTab('all')}>
                    <li className={selectedTab === 'all' ? 'active-tab' : ''}> 
                        <StoreIcon className="icon" />
                        <span>All Activities</span>
                    </li>
                </Link>
                <Link
                    style={{ textDecoration: "none" }}
                    onClick={() => setSelectedTab('my')}>
                    <li className={selectedTab === 'my' ? 'active-tab' : ''}> 
                        <PersonOutlineIcon className="icon" />
                        <span>My Activities</span>
                    </li>
                </Link>
                <p className="title">USEFUL</p>
                <Link
                    style={{ textDecoration: "none" }}
                    onClick={() => setSelectedTab('salesReport')}>
                    <li className={selectedTab === 'salesReport' ? 'active-tab' : ''}>
                        <FaChartLine className="icon" style={ {fontSize: 30} }/> 
                        <span>Sales Report</span>
                    </li>
                </Link>
                <p className="title">USER</p>
                <Link
                    style={{ textDecoration: "none" }}
                    onClick={() => setSelectedTab('Account')}
                >
                    <li className={selectedTab === 'Account' ? 'active-tab' : ''}>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Account</span>
                    </li>
                </Link>
                
                <li>
                    <ExitToAppIcon className="icon" />
                    <span>Logout</span>
                </li>
            </ul>
        </div>
    </div>
    );
};

export default Sidebar;
