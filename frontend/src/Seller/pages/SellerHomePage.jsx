import React, { useState } from "react";
import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./homeSeller.scss";
import Widget from "../Components/widgetSeller/Widget";
import Featured from "../Components/featuredSeller/Featured";
import Chart from "../Components/chartSeller/Chart";
import Table from "../Components/tableSeller/Table";

const SellerHome = () => {
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

export default SellerHome;
