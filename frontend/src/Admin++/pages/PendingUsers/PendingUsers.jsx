import "./PendingUsers.scss";
import Sidebar from "../../components/sidebarAdmin/Sidebar";
import Navbar from "../../components/navbarAdmin/Navbar";
import Datatable from "../../components/datatable/Datatable";
import NavTabs from "../../components/navTabs/navTabs";
import React, { useState } from "react";
import DatatableSeller from "../../components/Seller/dataTableSellerPending/dataTableSellerPending";
import NavTabsPending from "../../components/navTabsPending/navTabsPending";
import DatatableAdvertiserPending from "../../components/Advertiser/dataTableAdvertiserPending/dataTableAdvertiserPending";
import DatatableGuidePending from "../../components/Tour Guide/dataTableGuidePending/dataTableGuidePending";
const PendingUsers = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderComponent = () => {
    switch (selectedTab) {
      case 0:
        return <DatatableSeller />;
      case 1:
        return <DatatableAdvertiserPending />;
      case 2:
        return <DatatableGuidePending />;
    }
  };

  return (
    <div className="listActiveUsers">
      <Sidebar />
      <div className="listContainerActiveUsers">
        <Navbar />
        <div className="navTabsAndTable">
          <NavTabsPending onTabChange={setSelectedTab} />
          <div className="tableContainer">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default PendingUsers;
