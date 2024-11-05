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
          <button onClick={() => setSelectedOption('searchProductByName')}>Search Product by Name</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('filterProductByPrice')}>Filter Products by Price</button>
        </li>
        <li>
          <button onClick={() => setSelectedOption('sortProducts')}>Sort Products by Rating</button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
