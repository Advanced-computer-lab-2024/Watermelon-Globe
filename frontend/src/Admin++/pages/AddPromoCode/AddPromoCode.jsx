import React, { useState, useEffect } from "react";
import "./AddPromoCode.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import AddPromoCodeForm from "../../components/addPromoCodeForm/addPromoCodeForm"; // Import the updated form component
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import QrCode2Icon from "@mui/icons-material/QrCode2";

const AddPromoCode = () => {
  const [codes, setCodes] = useState([]); // State to hold admin data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch codes from API
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/Admin/getPromoCodes"); // Replace with your API endpoint
        setCodes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch codes");
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Handle new admin added
  const handleAdminAdded = (newAdmin) => {
    setCodes((prevAdmins) => [...prevAdmins, newAdmin]); // Add new admin to the list
  };

  // Delete admin handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/Admin/deletePromoCode/${id}`); // Replace with your delete API endpoint
      setCodes(codes.filter((admin) => admin._id !== id)); // Remove from UI
    } catch (err) {
      console.error("Failed to delete admin:", err);
    }
  };

  // Show loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listAddPromo">
      <Sidebar />
      <div className="listContainerAddPromo">
        <Navbar />
        <div className="cardsContainerAddPromo">
          {codes.map((admin) => (
            <Card
              key={admin._id}
              className="adminCardPromo"
              sx={{ marginBottom: 2 }}
            >
              <CardContent>
                <QrCode2Icon />
                <Typography variant="h6" component="div">
                  {/* <AccountCircleRoundedIcon /> */}
                  {admin.code}
                </Typography>
                <Typography variant="h1" component="div">
                  {admin.discountValue}%
                </Typography>
                <div className="cardActions">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(admin._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* AddAdminForm component to add a new admin */}
        <AddPromoCodeForm onAdminAdded={handleAdminAdded} />
      </div>
    </div>
  );
};

export default AddPromoCode;
