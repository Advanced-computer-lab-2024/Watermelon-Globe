import Sidebar from "../../components/sidebarAdmin/Sidebar";
import Navbar from "../../components/navbarAdmin/Navbar";
import "./home.scss";
import Widget from "../../components/widgetAdmin/Widget";
import Featured from "../../components/featuredAdmin/Featured";
import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="itinerary" />
          <Widget type="activity" />
        </div>
        <div className="charts">
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

export default Home;