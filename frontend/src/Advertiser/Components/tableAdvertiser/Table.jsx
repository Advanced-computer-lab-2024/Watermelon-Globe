import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from 'react-router-dom';

const List = ({ searchTerm }) => {
  const [activities, setActivities] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`/api/Advertiser/getAllActivitiesByAdvertiser/${id}`);
        setActivities(response.data.bookedActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, [id]);

  // Filter activities by name based on the search term
  const filteredActivities = activities.filter(activity =>
    activity.activity.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer component={Paper} className="tableContainer">
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Activity</TableCell>
            <TableCell className="tableCell">Buyer</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Chosen Dates</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredActivities.map((activity) => (
            <TableRow key={activity._id}>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {activity.activity.Name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{activity.tourist.username}</TableCell>
              <TableCell className="tableCell">${activity.activity.Price}</TableCell>
              <TableCell className="tableCell">
                  {new Date(activity.chosenDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="tableCell">
                <span
                  style={{
                    padding: '5px',
                    borderRadius: '5px',
                    color: activity.status === 'confirmed' ? 'green' : 
                           activity.status === 'pending' ? 'orange' : 'red',
                    backgroundColor: activity.status === 'confirmed' ? 'rgba(0, 128, 0, 0.151)' : 
                                     activity.status === 'pending' ? 'rgba(255, 165, 0, 0.151)' : 'rgba(255, 0, 0, 0.151)',
                  }}
                >
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
