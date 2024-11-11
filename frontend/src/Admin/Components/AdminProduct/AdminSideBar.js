import React from 'react';

const SideBar = ({ setSelectedOption }) => {
  return (
    <div className="sidebar">
      <h2>Product Actions</h2> 
      <ul>
        <li>
          <button onClick={() => setSelectedOption('allProducts')}>View All Products</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('GetProductsIDs')}>View All Products IDs</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('createProduct')}>Create New Product</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('searchProductByName')}>Search Product by Name</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('viewAvailableQuantity')}>View Sales & Avaiable Quantity</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('archiveProduct')}>Archive a Product</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('unarchiveProduct')}>UnArchive a Product</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('filterProductByPrice')}>Filter Products by Price</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('updateProduct')}>Update Product</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('sortProducts')}>Sort Products by Rating</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('uploadImage')}>View Product Image</button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
