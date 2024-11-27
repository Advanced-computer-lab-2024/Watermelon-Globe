import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./home.scss";
import { useParams } from "react-router-dom";


const SellerHome = () => {
  const { id } = useParams();
  return (

    <div className="home">
      <Sidebar  />
      <div className="homeContainer">
        <Navbar />
      
      </div>
    </div>
  );
};

export default SellerHome;