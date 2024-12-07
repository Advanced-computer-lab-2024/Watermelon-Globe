import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";

import "./homeSeller.scss";
import { useParams } from "react-router-dom";
import Widget from "Seller/Components/widgetSeller/Widget";
import Featured from "Seller/Components/featuredSeller/Featured";
import Chart from "Seller/Components/chartSeller/Chart";
import Table from "Seller/Components/tableSeller/Table";


const SellerHome = () => {
  const { id } = useParams();
  return (

    <div className="home-seller">
      <Sidebar  />
      <div className="homeContainer-seller">
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
          {/* <div className="listTitleAdminHome">
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
          </div> */}
          {/* <Table searchTerm={searchTerm} /> */}
        </div>
      </div>
    </div>
  );
};

export default SellerHome;