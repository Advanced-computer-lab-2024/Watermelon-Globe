import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Components/sidebar/Sidebar";
import "./HomeScreen.css";
// import ActivityForm from "../Components/ActivityForm";
import Navbar from "../Components/AdvertiserNavbar";
import Widget from "../Components/widgetAdvertiser/Widget";
import Featured from "../Components/featuredAdvertiser/Featured";
import Chart from "../Components/chartAdvertiser/Chart";
import Table from "../Components/tableAdvertiser/Table";
import AccountPage from "./AccountPage/AccountPage";
import SalesReportPage from "../Components/salesReport/SalesReport";

const HomeScreen = () => {
  const [activities, setActivities] = useState([]);
  const [advertiser, setAdvertiser] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Dashboard"); // 'all' or 'my'
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdvertiser = async () => {
      try {
        const response = await axios.get(
          "/api/advertiser/profiles/673259c7b9feab03bdc4e4fc"
        );
        setAdvertiser(response.data);
      } catch (error) {
        console.error("Error fetching advertiser profile:", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const activities = await axios.get("/api/Activities/activities");
        console.log(activities);
        setActivities(activities.data);
      } catch (error) {
        console.error("Error fetching activities", error);
      }
    };

    fetchAdvertiser();
    fetchActivities();
  }, []);

  const filteredActivities =
    selectedTab === "my"
      ? activities.filter(
          (activity) => activity.Advertiser?._id === advertiser?._id
        )
      : activities;

  
    // Handle change in search input
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

  return (
    <div className="homeAdmin">
      <Sidebar
        advertiser={advertiser}
        advertiserName={advertiser?.Name}
        advertiserId={advertiser?._id}
        onCreateActivity={() => navigate(`/add-activity/${advertiser?._id}`)}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="homeContainerAdmin">
        <Navbar advertiser={advertiser} advertiserId={advertiser?._id} />
        <div className="widgetsAdminHome">
          {/* <Widget type="user" /> */}
          <Widget type="product" />
          {/* <Widget type="itinerary" />
          <Widget type="activity" /> */}
        </div>
        <div className="chartsAdminHome">
          <Featured />
          <Chart title="Total Sales per Month" aspect={2 / 1} />
        </div>
        <div className="listContainerAdminHome">
          <div className="listTitleAdminHome">
            <span>Activities</span>
            <br />
            <br />
            <input
              type="text"
              placeholder="Search by itinerary name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="searchBar"
            />
          </div>
          <Table searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
