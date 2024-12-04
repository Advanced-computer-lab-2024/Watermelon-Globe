import "./AllTourists.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import NavTabs from "../../components/navTabs/navTabs";
import React, { useState } from "react";
import DatatableSeller from "../../components/Seller/dataTableSeller/dataTableSeller";

const AllTourists = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="listActiveUsers">
      <Sidebar />
      <div className="listContainerActiveUsers">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default AllTourists;
