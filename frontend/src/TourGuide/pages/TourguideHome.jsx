import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./homeGuide.scss";
import { useParams } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";

const id = "67013950229bd3b168a94dde";
const TourguideHome = () => {
  // const { id } = useParams();
  return (

    <div className="home-guide">
      <Sidebar  
      id={id}/>
      <div className="homeContainer-guide">
        <Navbar 
        id={id}/>
      
      </div>
    </div>
  );
};

export default TourguideHome;