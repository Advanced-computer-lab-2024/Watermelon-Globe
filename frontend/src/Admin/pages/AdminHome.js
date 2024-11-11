import { Link } from "react-router-dom";
const AdminHome = () => {
  return (
    <div className="admin-container">
      <h1>Admin Panel</h1>
      <div className="option-list">
        <Link to="/Admin">
          <button className="admin-button">Admin Accounts</button>
        </Link>
        <Link to="/Governer">
          <button className="admin-button">Governor Accounts</button>
        </Link>
        <Link to="/ActivityCategory">
          <button className="admin-button">Activity Categories</button>
        </Link>
        <Link to="/PreferenceTag">
          <button className="admin-button">Preference Tags</button>
        </Link>
        <Link to="/AdminProduct">
          <button className="admin-button">Products</button>
        </Link>
        <Link to="/ChangePasswordAdmin">
          <button className="admin-button">Change Password</button>
        </Link>
        <Link to="/Complaint">
          <button className="admin-button">View Complaints</button>
        </Link>
        <Link to="/AdminViewItinerary">
          <button className="admin-button">View Itineraries</button>
        </Link>
        <Link to="/AcceptRejectPage">
          <button className="admin-button">Manage Users</button>
        </Link>
        <Link to="/AdminViewDocuments">
          <button className="admin-button">View Documents</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
