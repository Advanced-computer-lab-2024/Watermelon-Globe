import "./list.scss";
import Sidebar from "../../components/sidebarAdmin/Sidebar";
import Navbar from "../../components/navbarAdmin/Navbar";
import Datatable from "../../components/datatable/Datatable";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
