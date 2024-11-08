import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from '../Components/starRating';
import AddReview from '../Components/AddReview';
import ViewReviewsModal from '../Components/ViewReviews';

const PurchasedProducts = () => {
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState(''); // New state for review input

  useEffect(() => {
    setLoading(true);
    fetch(`/api/tourist/getPurchasedProducts/${id}`)
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
      setLoading(true);
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
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product details:', error);
          setLoading(false);
        }
      };
      fetchProductDetails();
    }
  }, [productIds]);

  const handleRateProduct = (productId, rating) => {
    fetch(`/api/Seller/updateRatingProduct/${productId}?rating=${rating}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Rating updated successfully') {
          console.log('Rating updated:', data);
        } else {
          console.error('Error:', data.message);
        }
      })
      .catch((error) => console.error('Error rating product:', error));
  };

  const handleAddReview = (productId, review) => {
    fetch('/api/Seller/reviewProduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, review, reviewerId: "userId" }),
    })
      .then(response => response.json())
      .then(data => console.log('Review added:', data))
      .catch(error => console.error('Error adding review:', error));
  };

  const handleViewReviews = (productId) => {
    fetch(`/api/Seller/getReviews/${productId}`)
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
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Purchased Products</h1>

        {loading ? (
          <div className="text-center mt-10">Loading...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h2>
                  <p className="text-gray-700 mb-4"><strong>Price:</strong> ${product.price}</p>
                  <p className="text-gray-500 mb-4">{product.description || 'No description available'}</p>
                  <p className="text-gray-500 mb-4"><strong>Rating:</strong> {product.rating || 0}</p>

                  <div className="flex items-center space-x-4">

                  <div className="rating-container">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                        key={star}
                        className={`star ${rating >= star ? 'filled' : ''}`}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
      
                    <StarRating productId={product._id} onRate={(rating) => handleRateProduct(product._id, rating)} />
                    <button
                      onClick={() => handleRateProduct(product._id, product.rating)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Submit Rating
                    </button>
                  </div>

                  <div className="mt-4">
                    <AddReview productId={product._id} onAddReview={(review) => handleAddReview(product._id, review)} />
                    <button
                      onClick={() => handleViewReviews(product._id)}
                      className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      View Reviews
                    </button>
                  </div>

                  {/* Add Review */}
                  <div className="mt-4">
                    <textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Write your review..."
                      className="w-full p-2 border rounded-md"
                    />
                    <button
                      onClick={() => handleAddReview(product._id, newReview)}
                      className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      Submit Review
                    </button>
                  </div>
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