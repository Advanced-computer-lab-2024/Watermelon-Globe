import React, { useState } from "react";

// Import your existing components
import GetAllProducts from "../Components/GetAllProducts";
import CreateProduct from "../Components/createProduct";
import SearchProductByName from "../Components/SearchProductByName";
import ViewProductSales_AvailableQuantity from "../Components/ViewAvailableQuantity";
import ArchiveProduct from "../Components/ArchiveProduct";
import UnArchiveProduct from "../Components/UnArchiveProduct";
import UpdateProduct from "../Components/updateProduct";
import FilterProduct from "../Components/filterProduct";
import SortProduct from "../Components/sortProduct";
import CreateProfile from "../Components/createProfile";
import ViewProfile from "../Components/viewProfile";
import UpdateProfile from "../Components/updateProfile";
import UploadImage from "../Components/UploadImage";
import ChangePasswordSeller from "../Components/changePasswordSeller";

const id = "6729244f151b6c9e346dd732";

const menuItems = [
  { id: "allProducts", label: "View All Products" },
  { id: "createProduct", label: "Create New Product" },
  { id: "searchProductByName", label: "Search Product by Name" },
  { id: "viewAvailableQuantity", label: "View Sales & Available Quantity" },
  { id: "archiveProduct", label: "Archive a Product" },
  { id: "unarchiveProduct", label: "UnArchive a Product" },
  { id: "filterProductByPrice", label: "Filter Products by Price" },
  { id: "updateProduct", label: "Update Product" },
  { id: "sortProducts", label: "Sort Products by Rating" },
  { id: "uploadImage", label: "Upload Product Image" },
  { id: "createProfile", label: "Create a Profile" },
  { id: "viewProfile", label: "View Profile" },
  { id: "updateProfile", label: "Update my Profile" },
  { id: "changePasswordSeller", label: "Change Password" },
];

function SellerPage() {
  const [selectedOption, setSelectedOption] = useState("allProducts");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "5px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {(() => {
          switch (selectedOption) {
            case "allProducts":
              return <GetAllProducts />;
            case "createProduct":
              return <CreateProduct />;
            case "searchProductByName":
              return <SearchProductByName />;
            case "viewAvailableQuantity":
              return <ViewProductSales_AvailableQuantity />;
            case "archiveProduct":
              return <ArchiveProduct />;
            case "unarchiveProduct":
              return <UnArchiveProduct />;
            case "filterProductByPrice":
              return <FilterProduct />;
            case "updateProduct":
              return <UpdateProduct />;
            case "sortProducts":
              return <SortProduct />;
            case "uploadImage":
              return <UploadImage />;
            case "createProfile":
              return <CreateProfile />;
            case "viewProfile":
              return <ViewProfile />;
            case "updateProfile":
              return <UpdateProfile />;
            case "changePasswordSeller":
              return <ChangePasswordSeller />;
            default:
              return <GetAllProducts />;
          }
        })()}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar on the most left */}
      <aside
        style={{
          backgroundColor: "#f1f1f1",
          width: "250px",
          minHeight: "100vh",
          padding: "10px",
          display: isSidebarOpen ? "block" : "none",
        }}
      >
        <div style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
            Product Actions
          </h2>
        </div>
        <nav>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {menuItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "5px" }}>
                <button
                  onClick={() => setSelectedOption(item.id)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    textAlign: "left",
                    backgroundColor:
                      selectedOption === item.id ? "#007BFF" : "transparent",
                    color: selectedOption === item.id ? "#fff" : "#000",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div style={{ flex: 1 }}>
        {/* Header */}
        <header
          style={{
            height: "60px",
            backgroundColor: "#008000",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "white",
            padding: "0 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                color: "white",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                marginRight: "15px",
              }}
            >
              ☰
            </button>
            <h1 style={{ fontSize: "24px", margin: 0 }}>Watermelon Globe</h1>
          </div>
          <div>
            <button
              style={{
                color: "white",
                background: "none",
                border: "none",
                cursor: "pointer",
                marginRight: "15px",
              }}
            >
              🛒 View Cart
            </button>
            <button
              style={{
                color: "white",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              🚪 Sign Out
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ padding: "20px" }}>
          <div
            style={{
              minHeight: "calc(100vh - 100px)",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default SellerPage;
