import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widgetAdmin/Widget";
import Featured from "../../components/featuredAdmin/Featured";
import Chart from "../../components/chartAdmin/Chart";
// import Table from "../../components/tableAdmin/Table";


import { Link } from "react-router-dom";
// import Table from "../../components/table/Table";

const HomeUser = () => {
  return (
    <div className="homeAdmin">
      <Sidebar />
      <div className="homeContainerAdmin">
        <Navbar />
        <div className="widgetsAdminHome">
        {/* <Link to={"/AdminUsers/674f760ed6b7ba513c4ea84d"}>  </Link> */}
          <Widget type="user" />  
          <Widget type="product" />
          <Widget type="itinerary" />
          <Widget type="activity" />
        </div>
        <div className="chartsAdminHome">
          <Featured />
          <Chart title="Total Users per Month" aspect={2 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default HomeUser;
