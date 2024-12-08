import React, { useState, useEffect } from "react";
import "./AddAdmin.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import AddAdminForm from "../../components/addAdminForm/addAdminForm"; // Import the updated form component
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
const AddAdmin = () => {
  const [admins, setAdmins] = useState([]); // State to hold admin data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch admins from API
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/Admin/GetAllAdmin"); // Replace with your API endpoint
        setAdmins(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch admins");
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Handle new admin added
  const handleAdminAdded = (newAdmin) => {
    setAdmins((prevAdmins) => [...prevAdmins, newAdmin]); // Add new admin to the list
  };

  // Delete admin handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Admin/DeleteAdmin/${id}`); // Replace with your delete API endpoint
      setAdmins(admins.filter((admin) => admin._id !== id)); // Remove from UI
    } catch (err) {
      console.error("Failed to delete admin:", err);
    }
  };

  // Show loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listAddAdmin">
      <Sidebar />
      <div className="listContainerAddAdmin">
        <Navbar />
        <div className="cardsContainer">
          {admins.map((admin) => (
            <Card
              key={admin._id}
              className="adminCard"
              sx={{ marginBottom: 2 }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  <AccountCircleRoundedIcon sx={{ color: "#91c297" }} />
                  {admin.username}
                </Typography>
                <div className="cardActions">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    // onClick={() => handleDelete(admin._id)}
                    startIcon={<DeleteIcon sx={{ color: "#fff" }} />}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* AddAdminForm component to add a new admin */}
        <AddAdminForm onAdminAdded={handleAdminAdded} />
      </div>
    </div>
  );
};

export default AddAdmin;
