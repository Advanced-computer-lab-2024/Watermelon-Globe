import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import "./home.css";
import Widget from "../../Components/widget/Widget";
import Featured from "../../Components/featured/Featured";
import Chart from "../../Components/chart/Chart";
import Table from "../../Components/table/Table";

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
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;