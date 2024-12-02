import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UploadProductPicture from './UploadImage'; // Assuming you have this component
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
// import "./actions.scss"

const ProductsDetailsGeneral = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [showUpdatePicture, setShowUpdatePicture] = useState(false);
  const watermelonGreen = '#4CAF50';
  const watermelonPink = '#FF4081';
  useEffect(() => {
    const fetchProduct = async () => {
        try {
          // Send the product ID in the body of the POST request
          const response = await axios.post('/api/Seller/getProductById', { id });
          
          // Set the fetched product data in the state
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      
    fetchProduct();
  }, [id]);

//   const handleUpdateProduct = async () => {
//     try {
//         const response = await fetch(`/api/Seller/editProduct?id=${id}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedProduct),
//           });
//       setProduct({ ...product, ...updatedProduct });
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };
const handleUpdateProduct = async () => {
    // Filter out fields that are empty
    const filteredUpdateData = Object.fromEntries(
      Object.entries(updatedProduct).filter(([key, value]) => value.trim() !== '')
    );
  
    try {
      const response = await fetch(`/api/Seller/editProduct?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredUpdateData),
      });
  
      if (response.ok) {
        setProduct({ ...product, ...filteredUpdateData }); // Update state with new details
        setIsEditing(false); // Exit editing mode
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

    const watermelonStyle = {
    // backgroundColor: '#ff6b6b',
    border: `1px solid ${watermelonGreen}`,
    color: '#4a4a4a',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: watermelonPink,
    width:"25%",
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    
  };

  return (
    <div className="listSeller">
      
      <Sidebar />
      <div className="listContainerSeller">
      <Navbar/>
      <div className="flex justify-center items-center min-h-screen p-6">
          <div style={watermelonStyle} className="w-full max-w-xl">
            <div className="flex justify-center mb-6">
          <img
            src={product?.picture || 'https://via.placeholder.com/300'}
            alt={product?.name}
            style={{ width: '30%', height: 'auto', marginBottom: '10px' }}

          />
          
                  {/* <img
                    src={product.picture}
                    alt={`Image of ${product.name}`}
                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                  /> */}
               
        </div>
       
        <div className="text-center mb-6">
              <h2 className="text-3xl font-semibold" style={{ color: watermelonGreen }}>{product?.name}</h2>
              <p className="text-xl" style={{ color: '#1a5d1a' }}>{`$${product?.price}`}</p>
            </div>
        {!isEditing ? (
          <div className="space-y-4">
             <p><strong>Id:</strong> {product?._id}</p>
            <p><strong>Quantity:</strong> {product?.quantity}</p>
            <p><strong>Description:</strong> {product?.description}</p>
            <p><strong>Rating:</strong> {product?.rating || 'Not Rated'}</p>
            <p><strong>Reviews:</strong> 
                {product && product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                    <div key={index} className="mb-4 pb-4 border-b border-gray-200">
                        {/* Display the reviewer's name and the review */}
                        {/* <p className="font-semibold text-blue-600">{review.reviewer.username || 'Anonymous'}</p> */}
                        <p className="text-gray-700">{review.review || 'No review provided'}</p>
                    </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet for this product.</p>
                )}
                </p>

            {/* <div className="flex justify-center space-x-4 mt-6"> */}
             
           
             
            {/* </div> */}
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Product Name"
            />
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Price"
            />
            {/* <input
              type="number"
              name="quantity"
              value={updatedProduct.quantity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Quantity"
            /> */}
            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Description"
            />
            <div className="flex justify-center space-x-4 mt-6">
             <button style={buttonStyle} onClick={handleUpdateProduct}>

                Confirm Update
              </button>
           
               <button style={{...buttonStyle, backgroundColor: '#808080'}} onClick={() => setIsEditing(false)}>

               
                Cancel
              </button>
            </div>
          </div>
        )}
        {showUpdatePicture && <UploadProductPicture id={id}/>}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProductsDetailsGeneral;

