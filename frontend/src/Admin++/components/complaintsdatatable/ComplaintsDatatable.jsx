import "./ComplaintsDatatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, MenuItem, Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";

const ComplaintsDatatable = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchComplaints();
  }, [sortField, sortDirection, filterStatus]);

  const fetchComplaints = async () => {
    try {
      let url = "/api/admin/Complaint";
      if (sortField === "date") {
        url = "/api/admin/ComplaintsSortByDate";
      }
      if (filterStatus !== "all") {
        url = `/api/admin/ComplaintsFilterByStatus?status=${filterStatus}`;
      }
      const response = await axios.get(url);
      setComplaints(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch complaints.");
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      if (newStatus === 'resolved') {
        await axios.put(`/api/admin/Complaint/${id}`);
      } else {
        // If changing back to pending, we need a new API endpoint
        await axios.put(`/api/admin/reopenComplaint/${id}`);
      }
      fetchComplaints();
    } catch (err) {
      console.error("Failed to update complaint status:", err);
    }
  };

  const handleReply = async (id, reply) => {
    try {
      await axios.put(`/api/admin/replyComplaint/${id}`, { reply });
      fetchComplaints();
    } catch (err) {
      console.error("Failed to reply to complaint:", err);
    }
  };

  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "body", headerName: "Body", width: 300 },
    { 
      field: "date", 
      headerName: "Date", 
      width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    { 
      field: "status", 
      headerName: "Status", 
      width: 120,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => handleUpdateStatus(params.row._id, e.target.value)}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
        </Select>
      ),
    },
    { field: "reply", headerName: "Reply", width: 200 },
    { 
      field: "tourist", 
      headerName: "Tourist ID", 
      width: 220,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Button
              variant="contained"
              size="small"
              startIcon={<ReplyIcon />}
              onClick={() => {
                const reply = prompt("Enter your reply:");
                if (reply) handleReply(params.row._id, reply);
              }}
              sx={{
                backgroundColor: "#91c297",
                color: "#fff",
                "&:hover": { backgroundColor: "#7fa981" },
              }}
            >
              Reply
            </Button>
          </div>
        );
      },
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="complaintsDatatable">
      <div className="datatableTitle">
        View All Complaints
        <div>
          {/* <Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            sx={{ marginRight: 2 }}
          >
            <MenuItem value="date">Sort by Date</MenuItem>
            <MenuItem value="status">Sort by Status</MenuItem>
          </Select> */}
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </Select>
        </div>
      </div>
      <DataGrid
        className="complaintsDatagrid"
        rows={complaints}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        sx={{
          "& .MuiDataGrid-row:focus, & .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            color: "#d688a2",
            fontSize: "18px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            color: "#888",
            fontSize: "14px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "normal",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#f6d8e576",
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "#f6a4c276",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f6d8e576",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#ffffff",
            color: "#888",
          },
          "& .MuiCheckbox-root": {
            color: "#d32e65",
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: "#d32e65",
          },
        }}
      />
    </div>
  );
};

export default ComplaintsDatatable;

