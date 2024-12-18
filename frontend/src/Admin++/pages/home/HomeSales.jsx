import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widgetAdmin/Widget";
import Featured from "../../components/featuredAdmin/Featured";
import Chart from "../../components/chartAdmin/Chart2";
import Table from "../../components/tableAdmin/Table";
import { Link } from "react-router-dom";

const HomeSales = () => {
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
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="itinerary" />
          <Widget type="activity" />
        </div>
        <div className="chartsAdminHome">
          <Featured />
          <Chart title="Total Sales per Month" aspect={2 / 1} />
        </div>
        <div className="listContainerAdminHome">
          <div className="listTitleAdminHome">
            <span>Products</span>
            <br />
            <br />
            <input
              type="text"
              placeholder="Search by product name"
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

export default HomeSales;
