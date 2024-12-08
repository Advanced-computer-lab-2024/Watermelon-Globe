import React, { useState } from "react";
import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./homeGuide.scss";
import Widget from "../Components/widgetGuide/Widget";
import Featured from "../Components/featuredGuide/Featured";
import Chart from "../Components/chartGuide/Chart";
import Table from "../Components/tableGuide/Table";

const TourguideHome = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle change in search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="homeAdmin">
      <Sidebar />
      <div className="homeContainerAdmin">
        <Navbar />
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
            <span>Itineraries</span>
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

export default TourguideHome;
