import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./home.scss";
import { useParams } from "react-router-dom";

const GovernorHome = () => {
  const { id } = useParams(); // Extract the governor ID from the URL
  return (
    <div className="home">
      {/* Pass the id to the Sidebar */}
      <Sidebar id={id} />
      <div className="homeContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default GovernorHome;
