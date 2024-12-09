import React, { useState, useEffect } from "react";
import "./AddGoverner.scss"; // Import the appropriate styling
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import AddGovernerForm from "../../components/addGovererForm/addGovererForm"; // Import the updated form component
import { FaUserCircle } from "react-icons/fa";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
const AddGoverner = () => {
  const [governors, setGovernors] = useState([]); // State to hold governor data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch governors from API
  useEffect(() => {
    const fetchGovernors = async () => {
      try {
        const response = await axios.get("/api/Admin/GetAllGoverner"); // Replace with your API endpoint
        setGovernors(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch governers");
        setLoading(false);
      }
    };

    fetchGovernors();
  }, []);

  // Handle new governor added
  const handleGovernorAdded = (newGovernor) => {
    setGovernors((prevGovernors) => [...prevGovernors, newGovernor]); // Add new governor to the list
  };

  // Delete governor handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Admin/DeleteGoverner/${id}`); // Replace with your delete API endpoint
      setGovernors(governors.filter((governor) => governor._id !== id)); // Remove from UI
    } catch (err) {
      console.error("Failed to delete governor:", err);
    }
  };

  // Show loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listAddGoverner">
      <Sidebar />
      <div className="listContainerAddGoverner">
        <Navbar />
        <div className="cardsContainer">
          {governors.map((governor) => (
            <Card
              key={governor._id}
              className="governorCard"
              sx={{ marginBottom: 2 }}
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  <AccountCircleRoundedIcon sx={{ color: "#91c297" }} />
                  {governor.username}
                </Typography>
                <div className="cardActions">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(governor._id)}
                    startIcon={<DeleteIcon sx={{ color: "#fff" }} />}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* AddGovernorForm component to add a new governor */}
        <AddGovernerForm onGovernorAdded={handleGovernorAdded} />
      </div>
    </div>
  );
};

export default AddGoverner;
