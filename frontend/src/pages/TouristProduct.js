import React, { useState } from 'react';
import SideBar from '../Tourist/Components/TouristProduct/TouristSideBar'; // Import the SideBar component
import GetAllProducts from '../Tourist/Components/TouristProduct/GetAllProducts';
import SearchProductByName from '../Tourist/Components/TouristProduct/SearchProductByName';
import FilterProduct from '../Tourist/Components/TouristProduct/filterProduct';
import SortProduct from '../Tourist/Components/TouristProduct/sortProduct';

const TouristProduct = () => {
  const [selectedOption, setSelectedOption] = useState('allProducts'); // Default option to display all products

  // Function to render content based on selected option
  const renderContent = () => {
    switch (selectedOption) {
        case 'allProducts':
            return <GetAllProducts/>;
        case 'searchProductByName':
            return <SearchProductByName/>;
        case 'filterProductByPrice':
            return <FilterProduct/>;
        case 'sortProducts':
            return <SortProduct/>;
      default:
        return <GetAllProducts/>;
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <SideBar setSelectedOption={setSelectedOption} /> {/* Pass the setter function to SideBar */}

      {/* Main content */}
      <div className="pages">
        <h1>Product Management</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default TouristProduct;