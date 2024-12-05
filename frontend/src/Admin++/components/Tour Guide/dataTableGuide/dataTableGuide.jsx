import "./dataTableGuide.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const userColumns = [
  {
    field: "name",
    headerName: "User",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  // {
  //   field: "age",
  //   headerName: "Age",
  //   width: 100,
  // },
  {
    field: "status",
    headerName: "Status",
    width: 160,
  },
  // { field: "Action", headerName: "Action", width: 160 },
];

const DatatableGuide = () => {
  const [data, setData] = useState([]); // Initial state for rows
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/TourGuide/frontendGuidesTable");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));

    axios
      .delete(`/api/TourGuide/deleteGuide/${id}`)
      .catch((err) => console.error(err));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 270,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              {/* <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#91c297", // Background color
                  color: "#fff", // Text color
                  "&:hover": {
                    backgroundColor: "#7fa981", // Hover background color
                  },
                }}
              >
                View
              </Button> */}
            </Link>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#d32e65", // Background color
                color: "#fff", // Text color
                "&:hover": {
                  backgroundColor: "#b12454", // Hover background color
                },
              }}
              onClick={() => handleDelete(params.row.id)}
              startIcon={<DeleteIcon sx={{ color: "#fff" }} />}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  // Show loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        View Active Tour Guides
        {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        sx={{
          "& .MuiDataGrid-row:focus, & .MuiDataGrid-cell:focus": {
            outline: "none", // Removes the blue outline
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5", // Header background color
            color: "#d688a2", // Header font color
            fontSize: "18px", // Header font size
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold", // Header font weight
          },
          "& .MuiDataGrid-cell": {
            color: "#888", // Cell font color
            fontSize: "14px", // Cell font size
            fontFamily: "Poppins, sans-serif",
            fontWeight: "normal", // Cell font weight
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#f6d8e576", // Selected row background color
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: "#f6a4c276", // Custom hover color for selected rows
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f6d8e576", // Row hover background color
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#ffffff", // Footer background color
            color: "#888", // Footer font color
          },
          "& .MuiCheckbox-root": {
            //color: "#91c297", // Unchecked checkbox color (pink)
            color: "#d32e65",
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: "#d32e65", // Checked checkbox color (dark pink)
          },
        }}
      />
    </div>
  );
};

export default DatatableGuide;
