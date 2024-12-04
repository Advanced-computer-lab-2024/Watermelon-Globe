import "./PendingUsers.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import NavTabs from "../../components/navTabs/navTabs";
import React, { useState } from "react";
import DatatableSeller from "../../components/Seller/dataTableSellerPending/dataTableSellerPending";
import NavTabsPending from "../../components/navTabsPending/navTabsPending";

const PendingUsers = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderComponent = () => {
    switch (selectedTab) {
      case 0:
        return <DatatableSeller />;
      case 1:
        return <DatatableSeller />;
        // case 2:
        //   return <AdvertisersTable />;
        // case 3:
        //   return <TourGuidesTable />;
        // default:
        return <Datatable />;
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
