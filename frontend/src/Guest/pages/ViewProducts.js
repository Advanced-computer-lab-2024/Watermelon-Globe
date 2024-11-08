import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch products from API
    fetch('/api/Admin/GetAllProducts') // Update with your actual API endpoint
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
const handleBuy=()=>{
    navigate('/tourist-signup')
}
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-600">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-5">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mb-1"><strong>Price:</strong> ${product.price}</p>
              <p className="text-gray-600 mb-1"><strong>Quantity:</strong> {product.quantity}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              {/* Optionally add an image if available */}
              {/* <img src={product.picture} alt={product.name} className="w-full h-40 object-cover mb-4 rounded" /> */}
              <button 
              onClick={handleBuy}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-600">
                Buy Now
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
