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
          <button onClick={() => setSelectedOption('createProduct')}>Create New Product</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('searchProductByName')}>Search Product by Name</button>
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
          <button onClick={() => setSelectedOption('createProfile')}>Create a Profile</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('viewProfile')}>View Profile</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('updateProfile')}>Update my Profile</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('changePassword')}>Change Password</button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
