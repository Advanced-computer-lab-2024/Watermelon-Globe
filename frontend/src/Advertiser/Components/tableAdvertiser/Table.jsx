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
  const [itineraries, setItineraries] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await axios.get(`/api/TourGuide/getAllItinerariesByGuide/${id}`);
        setItineraries(response.data.bookedItineraries);
      } catch (error) {
        console.error('Error fetching itineraries:', error);
      }
    };

    fetchItineraries();
  }, [id]);

  // Filter itineraries by name based on the search term
  const filteredItineraries = itineraries.filter(itinerary =>
    itinerary.itinerary.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer component={Paper} className="tableContainer">
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Itinerary</TableCell>
            <TableCell className="tableCell">Buyer</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Chosen Dates</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItineraries.map((itinerary) => (
            <TableRow key={itinerary._id}>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {itinerary.itinerary.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{itinerary.buyer.username}</TableCell>
              <TableCell className="tableCell">${itinerary.totalPrice.toFixed(2)}</TableCell>
              <TableCell className="tableCell">
                {itinerary.chosenDates.map(date => new Date(date).toLocaleDateString()).join(', ')}
              </TableCell>
              <TableCell className="tableCell">
                <span
                  style={{
                    padding: '5px',
                    borderRadius: '5px',
                    color: itinerary.status === 'confirmed' ? 'green' : 
                           itinerary.status === 'pending' ? 'orange' : 'red',
                    backgroundColor: itinerary.status === 'confirmed' ? 'rgba(0, 128, 0, 0.151)' : 
                                     itinerary.status === 'pending' ? 'rgba(255, 165, 0, 0.151)' : 'rgba(255, 0, 0, 0.151)',
                  }}
                >
                  {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
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