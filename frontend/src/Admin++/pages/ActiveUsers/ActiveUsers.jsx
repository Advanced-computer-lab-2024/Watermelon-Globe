import "./ActiveUsers.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import NavTabs from "../../components/navTabs/navTabs";
import React, { useState } from "react";
import DatatableSeller from "../../components/Seller/dataTableSeller/dataTableSeller";
import DatatableAdvertiser from "../../components/Advertiser/dataTableAdvertiser/dataTableAdvertiser";
const ActiveUsers = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderComponent = () => {
    switch (selectedTab) {
      case 0:
        return <DatatableSeller />;
      case 1:
        return <DatatableAdvertiser />;
      // case 2:
      //   return <AdvertisersTable />;
      // case 3:
      //   return <TourGuidesTable />;
      // // default:
      // return <DatatableSeller />;
    }
  };

  return (
    <div className="listActiveUsers">
      <Sidebar />
      <div className="listContainerActiveUsers">
        <Navbar />
        <div className="navTabsAndTable">
          <NavTabs onTabChange={setSelectedTab} />
          <div className="tableContainer">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
