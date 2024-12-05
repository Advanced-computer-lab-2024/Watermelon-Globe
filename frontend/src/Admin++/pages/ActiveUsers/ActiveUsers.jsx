import "./ActiveUsers.scss";
import Sidebar from "../../components/sidebarAdmin/Sidebar";
import Navbar from "../../components/navbarAdmin/Navbar";
import Datatable from "../../components/datatable/Datatable";
import NavTabs from "../../components/navTabs/navTabs";

const ActiveUsers = () => {
  return (
    <div className="listActiveUsers">
      <Sidebar />
      <div className="listContainerActiveUsers">
        <Navbar />
        <div className="navTabsAndTable">
          <NavTabs />
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
