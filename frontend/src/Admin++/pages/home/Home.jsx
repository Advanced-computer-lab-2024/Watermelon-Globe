import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
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
          <Chart title="Total Users per Month" aspect={2 / 1} />
        </div>
        <div className="listContainerAdminHome">
          <div className="listTitleAdminHome">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
