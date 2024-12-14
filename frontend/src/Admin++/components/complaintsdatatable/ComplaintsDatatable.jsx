import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, MenuItem, Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import axios from "axios";
import "./ComplaintsDatatable.scss";

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

  const renderCellContent = (params) => (
    <div style={{
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      hyphens: 'auto',
      width: '100%',
      lineHeight: '1.5em',
      maxHeight: '4.5em', // Allows for 3 lines of text
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
    }}>
      {params.value}
    </div>
  );

  const columns = [
    { 
      field: "title", 
      headerName: "Title", 
      flex: 1,
      minWidth: 150,
      renderCell: renderCellContent,
    },
    { 
      field: "body", 
      headerName: "Body", 
      flex: 2,
      minWidth: 200,
      renderCell: renderCellContent,
    },
    { 
      field: "date", 
      headerName: "Date", 
      flex: 1,
      minWidth: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    { 
      field: "status", 
      headerName: "Status", 
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => handleUpdateStatus(params.row._id, e.target.value)}
          style={{ width: '100%' }}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
        </Select>
      ),
    },
    { 
      field: "reply", 
      headerName: "Reply", 
      flex: 1,
      minWidth: 150,
      renderCell: renderCellContent,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 120,
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
      <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
        <DataGrid
          className="complaintsDatagrid"
          rows={complaints}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
          autoHeight
          sx={{
            "& .MuiDataGrid-row": {
              maxHeight: "unset !important",
            },
            "& .MuiDataGrid-cell": {
              maxHeight: "unset !important",
              whiteSpace: "normal",
              wordWrap: "break-word",
              overflow: "visible",
              lineHeight: "1.5em",
              paddingTop: "8px",
              paddingBottom: "8px",
            },
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
    </div>
  );
};

export default ComplaintsDatatable;