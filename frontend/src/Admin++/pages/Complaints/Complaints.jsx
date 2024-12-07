import "./Complaints.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
//import ComplaintsDatatablee from "../../components/datatable/ComplaintsDatatable";
import ComplaintsDatatable from "../../components/complaintsdatatable/ComplaintsDatatable";
const AllComplaints = () => {
  return (
    <div className="listComplaints">
      <Sidebar />
      <div className="listContainerComplaints">
        <Navbar />
        <ComplaintsDatatable />
      </div>
    </div>
  );
};

export default AllComplaints;

