import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/AdvertiserNavbar";
import Widget from "../../Components/widgetAdvertiser/WidgetTourist";
import Chart from "../../Components/chartAdvertiser/ChartTourist";

const HomeScreen = () => {
  const {id} = useParams();
  const [activities, setActivities] = useState([]);
  const [advertiser, setAdvertiser] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Dashboard"); // 'all' or 'my'

  const navigate = useNavigate();

  return (
    <div className="homeAdmin">
      <Sidebar/>
      <div className="homeContainerAdmin">
        <Navbar advertiser={advertiser} advertiserId={advertiser?._id} />
        <div className="widgetsAdminHome">
          <Widget type="user" />
          {/* <Widget type="product" />
          <Widget type="itinerary" />
          <Widget type="activity" /> */}
        </div>
        <div className="chartsAdminHome">
          <Chart title="Total Bookings per Month" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
