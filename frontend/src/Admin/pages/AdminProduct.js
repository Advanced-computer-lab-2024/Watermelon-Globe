import React, { useState } from 'react';
import SideBar from '../Components/AdminProduct/AdminSideBar'; // Import the SideBar component
import GetAllProducts from '../Components/AdminProduct/GetAllProducts';
import CreateProduct from '../Components/AdminProduct/createProduct';
import SearchProductByName from '../Components/AdminProduct/SearchProductByName';
import UpdateProduct from '../Components/AdminProduct/updateProduct';
import FilterProduct from '../Components/AdminProduct/filterProduct';
import SortProduct from '../Components/AdminProduct/sortProduct';


const AdminProduct = () => {
  const [selectedOption, setSelectedOption] = useState('allProducts'); // Default option to display all products

  // Function to render content based on selected option
  const renderContent = () => {
    switch (selectedOption) {
      case 'allProducts':
        return <GetAllProducts/>;
      case 'createProduct':
        return <CreateProduct/>;
      case 'searchProductByName':
        return <SearchProductByName/>;
      case 'filterProductByPrice':
        return <FilterProduct/>;
      case 'updateProduct':
        return <UpdateProduct/>;
      case 'sortProducts':
        return <SortProduct/>;
    default:
      return <div>Invalid option selected</div>; // Handle invalid option
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <SideBar setSelectedOption={setSelectedOption} /> {/* Pass the setter function to SideBar */}

      {/* Main content */}
      <div className="pages">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminProduct;