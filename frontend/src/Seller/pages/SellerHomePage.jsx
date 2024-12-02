import Sidebar from "../Components/sidebar/Sidebar";
import Navbar from "../Components/navbar/Navbar";
import "./homeSeller.scss";
import { useParams } from "react-router-dom";


const SellerHome = () => {
  const { id } = useParams();
  return (

    <div className="home-seller">
      <Sidebar  />
      <div className="homeContainer-seller">
        <Navbar />
      
      </div>
    </div>
  );
};

export default SellerHome;