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

const List = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/Admin/GetAllProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by name based on the search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TableContainer component={Paper} className="tableContainer">
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell className="tableCell">ProductID</TableCell> */}
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Sales</TableCell>
            <TableCell className="tableCell">Total Revenue</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product._id}>
              {/* <TableCell className="tableCell">{product._id}</TableCell> */}
              <TableCell className="tableCell">
                <div className="cellWrapper">
                <img src={product.picture} className="image" style={{ width: '32px', height: '32px' }} />
                  {product.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{product.quantity}</TableCell>
              <TableCell className="tableCell">${product.price}</TableCell>
              <TableCell className="tableCell">{product.sales}</TableCell>
              <TableCell className="tableCell">${(product.sales * product.price).toFixed(2)}</TableCell>
              <TableCell className="tableCell">
              <span
                style={{
                  padding: '5px',
                  borderRadius: '5px',
                  color: product.quantity > 0 ? 'green' : 'rgb(238, 155, 155)',
                  backgroundColor: product.quantity > 0 ? 'rgba(0, 128, 0, 0.151)' : 'rgb(227, 210, 210)',
                }}
              >
                {product.quantity > 0 ? 'InStock' : 'OutofStock'}
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
