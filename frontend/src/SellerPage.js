import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// json page
const SellerPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [sellerId, setSellerId] = useState("");
  const [prodId, setProdId] = useState(""); // New constant for Product ID
  const [rawJson, setRawJson] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const navigate = useNavigate();

  const handleRequest = async (url, method = "get", rawJson = null) => {
    try {
      let response;
      let options = {
        headers: { "Content-Type": "application/json" },
      };

      if (method === "get" && rawJson) {
        const queryParams = new URLSearchParams(JSON.parse(rawJson)).toString();
        url = `${url}?${queryParams}`;
      } else if (method === "post" || method === "put") {
        const body = JSON.parse(rawJson);
        options.data = body;
      }

      response = await axios({ method, url, ...options });
      setData(response.data);
      setError(null);
      setRawJson("");
      setSellerId("");
      setProductName("");
      setProductPrice("");
    } catch (err) {
      setError(err.response ? err.response.data : "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Seller Management</h1>

      {/* Raw JSON Input */}
      <h2>Raw JSON Body</h2>
      <textarea
        rows={10}
        cols={50}
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        placeholder="Enter raw JSON Here"
        style={{ width: "100%", marginBottom: "20px" }}
      />

      {/* Seller Routes */}
      <h2>Sellers</h2>
      <button onClick={() => handleRequest("/createSeller", "post", rawJson)}>
        Create Seller
      </button>
      <button
        onClick={() =>
          handleRequest(`/updateSeller/${sellerId}`, "put", rawJson)
        }
      >
        Update Seller
      </button>
      <button onClick={() => handleRequest(`/getSeller/${sellerId}`)}>
        Get Seller
      </button>
      <button onClick={() => handleRequest("/sellers")}>Get All Sellers</button>
      <button
        onClick={() => handleRequest(`/deleteSeller/${sellerId}`, "delete")}
      >
        Delete Seller
      </button>

      <div>
        <input
          type="text"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          placeholder="Enter Seller ID"
        />
      </div>

      <hr />

      {/* Products Routes */}
      <h2>Products</h2>
      <button onClick={() => handleRequest("/createProduct", "post", rawJson)}>
        Create Product
      </button>
      <button onClick={() => handleRequest("/products")}>
        Get All Products
      </button>
      <button
        onClick={() =>
          handleRequest(
            `/searchProductName?name=${productName}`,
            "get",
            rawJson
          )
        }
      >
        Search Product by Name
      </button>

      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter product name"
      />

      <button
        onClick={() => handleRequest(`/filterProductPrice/${productPrice}`)}
      >
        Filter Products by Price
      </button>

      {/* Input for Product Price */}
      <input
        type="number"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        placeholder="Enter product price"
      />

      <button onClick={() => handleRequest("/sortProducts")}>
        Sort Products by Ratings
      </button>

      {/* Input for Product Rating */}

      <button
        onClick={() =>
          handleRequest(`/editProduct?id=${prodId}`, "put", rawJson)
        }
      >
        Update Product
      </button>

      {/* Input for Product ID */}
      <input
        type="text"
        value={prodId}
        onChange={(e) => setProdId(e.target.value)}
        placeholder="Enter product ID"
      />

      <hr />

      {/* Display data or error */}
      <div>
        <h2>Response Data:</h2>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {/* Navigation */}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default SellerPage;
