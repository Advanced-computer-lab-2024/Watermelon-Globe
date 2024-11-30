import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./home.scss";
import { useParams } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";


const TourguideHome = () => {
  const { id } = useParams();
  return (

    <div className="home">
      <Sidebar  />
      <div className="homeContainer">
      <ReactNotifications />
        <Navbar />
      
      </div>
    </div>
  );
};

export default TourguideHome;