import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./actions.scss";

const ViewQuantity = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/Admin/getQuantity`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div>
      <div className="listAdminProduct">
        <Sidebar />
        <div className="listContainerAdminProduct">
          <Navbar />
          <div className=" bg-white p-6 rounded-lg ">
            <h2
              style={{ color: "#2E8B57" }}
              className="text-2xl font-bold text-800 text-center mb-6"
            >
              {" "}
              Quantities and Sales
            </h2>

            {errorMessage && (
              <p style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </p>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)", // 4 products per row
                gap: "20px",
                padding: "10px",
              }}
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "10px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #4CAF50",
                  }}
                >
                  <h4>{product.name}</h4>
                  <p>Quantity: {product.quantity}</p>
                  <p>Sales: {product.sales}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuantity;
