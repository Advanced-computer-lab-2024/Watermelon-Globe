import React, { useState } from 'react';
import SideBar from '../../Components/Seller/SellerSideBar'; // Import the SideBar component
import GetAllProducts from '../../Components/Seller/GetAllProducts';
import CreateProduct from '../../Components/Seller/createProduct';
import SearchProductByName from '../../Components/Seller/SearchProductByName';
import UpdateProduct from '../../Components/Seller/updateProduct';
import FilterProduct from '../../Components/Seller/filterProduct';
import SortProduct from '../../Components/Seller/sortProduct';
import CreateProfile from '../../Components/Seller/createProfile';
import ViewProfile from '../../Components/Seller/viewProfile';
import UpdateProfile from '../../Components/Seller/updateProfile';



const SellerProduct = () => {
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
      case 'createProfile':
        return <CreateProfile/>;
      case 'viewProfile':
        return <ViewProfile/>;
      case 'updateProfile':
        return <UpdateProfile/>;
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
        {renderContent()}
      </div>
    </div>
  );
};

export default SellerProduct