import React, { useState } from 'react';
import SideBar from '../Components/SellerSideBar'; // Import the SideBar component
import GetAllProducts from '../Components/GetAllProducts';
import CreateProduct from '../Components/createProduct';
import SearchProductByName from '../Components/SearchProductByName';
import UpdateProduct from '../Components/updateProduct';
import FilterProduct from '../Components/filterProduct';
import SortProduct from '../Components/sortProduct';
import CreateProfile from '../Components/createProfile';
import ViewProfile from '../Components/viewProfile';
import UpdateProfile from '../Components/updateProfile';
import ChangePasswordSeller from '../Components/changePasswordSeller';



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
      case 'changePassword':
        return <ChangePasswordSeller/>
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