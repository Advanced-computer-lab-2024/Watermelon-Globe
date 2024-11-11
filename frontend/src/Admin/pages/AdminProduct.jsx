import React, { useState } from 'react';
import SideBar from '../Components/AdminProduct/AdminSideBar'; // Import the SideBar component
import GetAllProducts from '../Components/AdminProduct/GetAllProducts';
import GetProductsIDs from '../Components/AdminProduct/GetProductsIDs';
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
  const [selectedOption, setSelectedOption] = useState('allProducts'); // Default option
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle sidebar

  const renderContent = () => {
    return (
      <div style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '5px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        {(() => {
          switch (selectedOption) {
            case 'allProducts':
              return <GetAllProducts />;
            case 'GetProductsIDs':
              return <GetProductsIDs/>;
            case 'createProduct':
              return <CreateProduct />;
            case 'searchProductByName':
              return <SearchProductByName />;
            case 'viewAvailableQuantity':
              return <ViewProductSales_AvailableQuantity />;
            case 'archiveProduct':
              return <ArchiveProduct />;
            case 'unarchiveProduct':
              return <UnArchiveProduct />;
            case 'filterProductByPrice':
              return <FilterProduct />;
            case 'updateProduct':
              return <UpdateProduct />;
            case 'sortProducts':
              return <SortProduct />;
            case 'uploadImage':
              return <UploadImage />;
            default:
              return <div>Invalid option selected</div>; // Handle invalid option
          }
        })()}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside
        style={{
          backgroundColor: '#f1f1f1',
          width: '250px',
          minHeight: '100vh',
          padding: '10px',
          display: isSidebarOpen ? 'block' : 'none',
        }}
      >
        <SideBar setSelectedOption={setSelectedOption} />
      </aside>

      <div style={{ flex: 1 }}>
        {/* Header */}
        <header
          style={{
            height: '60px',
            backgroundColor: '#008000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            padding: '0 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                color: 'white',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                marginRight: '15px',
              }}
            >
              ☰
            </button>
            <h1 style={{ fontSize: '24px', margin: 0 }}>Watermelon Globe</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              style={{
                color: 'white',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              🛒 View Cart
            </button>
            <button
              style={{
                color: 'white',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              🚪 Sign Out
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ padding: '20px' }}>
          <div
            style={{
              minHeight: 'calc(100vh - 100px)',
              backgroundColor: 'white',
              borderRadius: '5px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              padding: '20px',
            }}
          >
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProduct;
