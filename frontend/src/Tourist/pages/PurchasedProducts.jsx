
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import StarRating from '../Components/starRating';
// import ViewReviewsModal from '../Components/ViewReviews';

// const PurchasedProducts = () => {
//   const [productIds, setProductIds] = useState([]);
//   const [products, setProducts] = useState([]);
//   const { id } = useParams();
//   const [reviews, setReviews] = useState([]);
//   const [showReviewsModal, setShowReviewsModal] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [newReview, setNewReview] = useState('');
//   const [showReviewInput, setShowReviewInput] = useState(null); // Controls review input visibility
//   const [selectedRating, setSelectedRating] = useState(null); // Holds the rating to submit

//   useEffect(() => {
//     setLoading(true);
//     fetch(`/api/tourist/getPurchasedProducts/${id}`)
//       .then(response => response.json())
//       .then(data => {
//         setProductIds(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching product IDs:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   useEffect(() => {
//     if (productIds.length > 0) {
//       const fetchProductDetails = async () => {
//         try {
//           const productDetails = await Promise.all(
//             productIds.map(productId =>
//               fetch('/api/Seller/getProductById', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ id: productId }),
//               }).then(response => response.json())
//             )
//           );
//           setProducts(productDetails);
//         } catch (error) {
//           console.error('Error fetching product details:', error);
//         }
//       };
//       fetchProductDetails();
//     }
//   }, [productIds]);

//   const handleRateProduct = (productId) => {
//     fetch(`/api/Seller/updateRatingProduct/${productId}?rating=${selectedRating}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.message === 'Rating updated successfully') {
//           console.log('Rating updated:', data);
//         } else {
//           console.error('Error:', data.message);
//         }
//       })
//       .catch(error => console.error('Error rating product:', error));
//   };

//   const handleAddReview = (newReview,productId) => {
//     fetch(`/api/Seller/reviewProduct/${id}/${productId}?Review=${newReview}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Review added:', data);
//         setShowReviewInput(null); // Hide review input after submission
//         setNewReview(''); // Clear review input
//       })
//       .catch(error => console.error('Error adding review:', error));
//   };
  
//   const handleViewReviews = (productId) => {
//     fetch(`/api/Seller/getProductReviews/${productId}`)
//       .then(response => response.json())
//       .then(data => {
//         setReviews(data.reviews);
//         setSelectedProductId(productId);
//         setShowReviewsModal(true);
//       })
//       .catch(error => console.error('Error fetching reviews:', error));
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen py-10">
//       <div className="container mx-auto px-6">
//         <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Purchased Products</h1>

//         {loading ? (
//           <div className="text-center mt-10">Loading...</div>
//         ) : products.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {products.map((product) => (
//               <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
//                 <div className="p-6">
//                   <h2 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h2>
//                   <p className="text-gray-700 mb-4"><strong>Price:</strong> ${product.price}</p>
//                   <p className="text-gray-500 mb-4">{product.description || 'No description available'}</p>
//                   <p className="text-gray-500 mb-4"><strong>Rating:</strong> {product.rating || 0}</p>

//                   <StarRating 
//                     productId={product._id} 
//                     onRate={(rating) => setSelectedRating(rating)} 
//                     onHover={(rating) => console.log("Hover Rating:", rating)}
//                   />
                  
//                   <button
//                     onClick={() => handleRateProduct(product._id)}
//                     className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     Submit Rating
//                   </button>

//                   <button
//                     onClick={() => setShowReviewInput(product._id)}
                    
//                     className="mt-4 px-4 py-2 bg-green-500 border border-green-700 text-white rounded hover:bg-green-600"
//                     >
//                     Review Product
//                   </button>
//                   <button
//                     onClick={() => handleViewReviews(product._id)}
//                     className="mt-4 px-4 py-2 rounded bg-[#add8e6] text-white"
//                     >
//                     View Reviews
//                   </button>

//                   {showReviewInput === product._id && (
//                     <div className="mt-4">
//                       <textarea
//                         value={newReview}
//                         onChange={(e) => setNewReview(e.target.value)}
//                         placeholder="Write your review..."
//                         className="w-full p-2 border rounded-md"
//                       />
//                       <button
//                         onClick={() => handleAddReview(newReview,product._id)}
//                         className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//                       >
//                         Submit Review
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500 text-xl mt-10">No products purchased yet.</p>
//         )}

//         {showReviewsModal && (
//           <ViewReviewsModal
//             productId={selectedProductId}
//             reviews={reviews}
//             onClose={() => setShowReviewsModal(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default PurchasedProducts;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';

const StarRating = ({ productId, onRate, onHover }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          onClick={() => {
            setRating(star);
            onRate(star);
          }}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={() => onHover(0)}
          className={`cursor-pointer ${star <= rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-400'}`}
        />
      ))}
    </div>
  );
};

const ViewReviewsModal = ({ productId, reviews, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Reviews for Product {productId}</h2>
        {reviews.map((review, index) => (
          <div key={index} className="mb-4 pb-4 border-b border-gray-200">
            <p>{review}</p>
          </div>
        ))}
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const PurchasedProducts = () => {
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState('');
  const [showReviewInput, setShowReviewInput] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/Tourist/getPurchasedProducts/${id}`)
      .then(response => response.json())
      .then(data => {
        setProductIds(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product IDs:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (productIds.length > 0) {
      const fetchProductDetails = async () => {
        try {
          const productDetails = await Promise.all(
            productIds.map(productId =>
              fetch('/api/Seller/getProductById', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: productId }),
              }).then(response => response.json())
            )
          );
          setProducts(productDetails);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      fetchProductDetails();
    }
  }, [productIds]);

  const handleRateProduct = (productId) => {
    fetch(`/api/Seller/updateRatingProduct/${productId}?rating=${selectedRating}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Rating updated successfully') {
          console.log('Rating updated:', data);
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch(error => console.error('Error rating product:', error));
  };

  const handleAddReview = (newReview, productId) => {
    fetch(`/api/Seller/reviewProduct/${id}/${productId}?Review=${encodeURIComponent(newReview)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Review added:', data);
        setShowReviewInput(null);
        setNewReview('');
      })
      .catch(error => console.error('Error adding review:', error));
  };
  
  const handleViewReviews = (productId) => {
    fetch(`/api/Seller/getProductReviews/${productId}`)
      .then(response => response.json())
      .then(data => {
        setReviews(data.reviews);
        setSelectedProductId(productId);
        setShowReviewsModal(true);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Purchased Products</h1>

        {loading ? (
          <div className="text-center mt-10">Loading...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
                  <p className="text-gray-600 mb-4"><strong>Price:</strong> ${product.price}</p>
                  <p className="text-gray-500 mb-4 h-20 overflow-hidden">{product.description || 'No description available'}</p>
                  <p className="text-gray-500 mb-4"><strong>Rating:</strong> {product.rating || 0}</p>

                  <StarRating 
                    productId={product._id} 
                    onRate={(rating) => setSelectedRating(rating)} 
                    onHover={(rating) => console.log("Hover Rating:", rating)}
                  />
                  
                  <button
                    onClick={() => handleRateProduct(product._id)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Submit Rating
                  </button>

                  <button
                    onClick={() => setShowReviewInput(product._id)}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Review Product
                  </button>
                  <button
                    onClick={() => handleViewReviews(product._id)}
                    className="mt-4 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-400 transition-colors"
                  >
                    View Reviews
                  </button>

                  {showReviewInput === product._id && (
                    <div className="mt-4">
                      <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review..."
                        className="w-full p-2 border rounded-md"
                      />
                      <button
                        onClick={() => handleAddReview(newReview, product._id)}
                        className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl mt-10">No products purchased yet.</p>
        )}

        {showReviewsModal && (
          <ViewReviewsModal
            productId={selectedProductId}
            reviews={reviews}
            onClose={() => setShowReviewsModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PurchasedProducts;