import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, LogOut, Star, Search, RefreshCw, Eye, MessageSquare, ChevronDown, ChevronUp, X } from 'lucide-react';

const StarRating = ({ rating, onRate }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`cursor-pointer ${
            star <= rating 
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-yellow-300'
          } hover:text-yellow-400`}
          onClick={() => onRate(star)}
        />
      ))}
    </div>
  );
};

const ViewReviewsModal = ({ productId, reviews = [], onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary">Reviews for Product {productId}</h2>
        
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-200">
              <p className="font-semibold text-secondary">{review.reviewer?.username || 'Anonymous'}</p>
              <p className="text-gray-700">{review.review || 'No review provided'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet for this product.</p>
        )}
        
        <button
          onClick={onClose}
          className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-hover transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const PurchasedProducts = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState('');
  const [showReviewInput, setShowReviewInput] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPurchasedProducts();
  }, [id]);

  const fetchPurchasedProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/Tourist/getPurchasedProducts/${id}`);
      const productIds = await response.json();
      
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
      setFilteredProducts(productDetails);
    } catch (error) {
      console.error('Error fetching purchased products:', error);
      setErrorMessage('Failed to load purchased products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRateProduct = async (productId, rating) => {
    try {
      const response = await fetch(`/api/Seller/updateRatingProduct/${productId}?rating=${rating}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.message === 'Rating updated successfully') {
        setProducts(prevProducts => 
          prevProducts.map(product => 
            product._id === productId ? { ...product, rating } : product
          )
        );
        setFilteredProducts(prevProducts => 
          prevProducts.map(product => 
            product._id === productId ? { ...product, rating } : product
          )
        );
        window.location.reload();
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error rating product:', error);
    }
  };

  const handleAddReview = async (productId) => {
    if (!newReview.trim()) return;
    try {
      const response = await fetch(`/api/Seller/reviewProduct/${id}/${productId}?Review=${encodeURIComponent(newReview)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log('Review added:', data);
      setShowReviewInput(null);
      setNewReview('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };
  
  const handleViewReviews = async (productId) => {
    try {
      const response = await fetch(`/api/Seller/getProductReviews/${productId}`);
      const data = await response.json();
      setReviews(data);
      setSelectedProductId(productId);
      setShowReviewsModal(true);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  
    const filtered = products.filter(product => 
      (product.name && product.name.toLowerCase().includes(term)) || 
      (product.description && product.description.toLowerCase().includes(term))
    );
    setFilteredProducts(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilteredProducts(products);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="bg-secondary py-4 mb-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
          <span className="text-white text-2xl font-bold">Watermelon Globe</span>
          <div className="flex gap-6">
            <Link to={`/ProductTourist/${id}`} className="text-white flex items-center gap-2">
              <ShoppingBag size={20} />
              Products
            </Link>
            <Link to="/signout" className="text-white flex items-center gap-2">
              <LogOut size={20} />
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-center text-3xl font-bold text-secondary mb-8">Your Purchased Products</h1>

        {/* Toggle Filters Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full bg-primary text-white p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-hover mb-4"
        >
          {showFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Search and Filter Section */}
        {showFilters && (
          <div className="flex flex-wrap justify-between mb-8 gap-4">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name"
                className="p-2 border rounded-lg border-lightGray"
              />
              <button
                onClick={handleSearch}
                className="bg-primary text-white p-2 rounded-lg flex items-center gap-2 hover:bg-hover"
              >
                <Search size={16} />
                Search
              </button>
            </div>
            <button
              onClick={handleReset}
              className="bg-yellow-500 text-white p-2 rounded-lg flex items-center gap-2 hover:bg-yellow-400"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        )}

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-cardBackground rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                <div className="relative">
                  <img
                    src={product.picture || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                </div>

                <div className="p-3 flex flex-col">
                  <h3 className="text-base font-bold mb-1">{product.name}</h3>
                  <p className="text-sm text-grayText mb-2 flex-1">{product.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price && product.price.$numberDecimal ? product.price.$numberDecimal : product.price}
                    </span>
                    <span className="text-xs text-grayText">Rating: {product.rating || 'N/A'}</span>
                  </div>
                  <StarRating 
                    rating={product.rating || 0}
                    onRate={(rating) => handleRateProduct(product._id, rating)}
                  />
                  <button
                    onClick={() => setShowReviewInput(product._id)}
                    className="p-1 rounded-lg flex items-center justify-center gap-1 w-full text-sm bg-primary hover:bg-hover text-white mt-2"
                  >
                    <MessageSquare size={14} />
                    Write Review
                  </button>
                  <button
                    onClick={() => handleViewReviews(product._id)}
                    className="p-1 rounded-lg flex items-center justify-center gap-1 w-full text-sm bg-secondary hover:bg-hover text-white mt-2"
                  >
                    <Eye size={14} />
                    View Reviews
                  </button>
                  {showReviewInput === product._id && (
                    <div className="mt-2">
                      <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review..."
                        className="w-full p-2 border rounded-lg border-lightGray mb-2"
                        rows="3"
                      />
                      <button
                        onClick={() => handleAddReview(product._id)}
                        className="p-1 rounded-lg flex items-center justify-center gap-1 w-full text-sm bg-primary hover:bg-hover text-white"
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
          <p className="text-center text-grayText text-xl mt-8">No purchased products found.</p>
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

