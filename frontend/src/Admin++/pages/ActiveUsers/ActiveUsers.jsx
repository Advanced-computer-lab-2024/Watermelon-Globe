import "./ActiveUsers.scss";
import Sidebar from "../../components/sidebarAdmin/Sidebar";
import Navbar from "../../components/navbarAdmin/Navbar";
import Datatable from "../../components/datatable/Datatable";
import NavTabs from "../../components/navTabs/navTabs";
import React, { useState } from "react";
import DatatableSeller from "../../components/Seller/dataTableSeller/dataTableSeller";
import DatatableAdvertiser from "../../components/Advertiser/dataTableAdvertiser/dataTableAdvertiser";
import DatatableGuide from "../../components/Tour Guide/dataTableGuide/dataTableGuide";
const ActiveUsers = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderComponent = () => {
    switch (selectedTab) {
      case 0:
        return <DatatableSeller />;
      case 1:
        return <DatatableAdvertiser />;
      case 2:
        return <DatatableGuide />;

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
