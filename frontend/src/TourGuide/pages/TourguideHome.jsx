import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./homeGuide.scss";
import { useParams } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";


const TourguideHome = () => {
  const { id } = useParams();
  return (

    <div className="home-guide">
      <Sidebar  />
      <div className="homeContainer-guide">
        <Navbar />
      
      </div>
    </div>
  );
};

export default TourguideHome;