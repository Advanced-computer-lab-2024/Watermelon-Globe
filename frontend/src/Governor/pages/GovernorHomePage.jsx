import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./home.scss";
import { useParams } from "react-router-dom";

const GovernorHome = () => {
  const { id } = useParams();
  return (
    <div className="home-guide ">
      <Sidebar />
      <div className="homeContainer-guide">
        <Navbar />
      </div>
    </div>
  );
};

export default GovernorHome;
