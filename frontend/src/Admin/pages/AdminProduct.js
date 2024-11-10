import React, { useState } from 'react';
import SideBar from '../Components/AdminProduct/AdminSideBar'; // Import the SideBar component
import GetAllProducts from '../Components/AdminProduct/GetAllProducts';
import CreateProduct from '../Components/AdminProduct/createProduct';
import SearchProductByName from '../Components/AdminProduct/SearchProductByName';
import UpdateProduct from '../Components/AdminProduct/updateProduct';
import FilterProduct from '../Components/AdminProduct/filterProduct';
import SortProduct from '../Components/AdminProduct/sortProduct';
import ViewProductSales_AvailableQuantity from '../Components/AdminProduct/ViewAvailableQuantity';
import ArchiveProduct from '../Components/AdminProduct/ArchiveProduct';
import UnArchiveProduct from '../Components/AdminProduct/UnArchiveProduct';
import UploadImage from '../Components/AdminProduct/UploadImage';


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
      case 'viewAvailableQuantity':
        return <ViewProductSales_AvailableQuantity/>;
      case 'archiveProduct':
        return <ArchiveProduct/>
      case 'unarchiveProduct':
        return <UnArchiveProduct/>
      case 'filterProductByPrice':
        return <FilterProduct/>;
      case 'updateProduct':
        return <UpdateProduct/>;
      case 'sortProducts':
        return <SortProduct/>;
      case 'uploadImage':
        return <UploadImage/>;
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