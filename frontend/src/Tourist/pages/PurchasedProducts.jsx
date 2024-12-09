import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, LogOut, Star, Search, RefreshCw, Eye, MessageSquare } from 'lucide-react';

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
        <h2 className="text-2xl font-bold mb-4 text-green-700">Reviews for Product {productId}</h2>
        
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-200">
              {/* Display the reviewer's name and the review */}
              <p className="font-semibold text-blue-600">{review.reviewer?.username || 'Anonymous'}</p>
              <p className="text-gray-700">{review.review || 'No review provided'}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet for this product.</p>
        )}
        
        <button
          onClick={onClose}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
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
        );window.location.reload();
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f0fdf4' }}>
      {/* Navigation Bar */}
      <div style={{ 
        backgroundColor: '#00b341',
        padding: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ 
            color: 'white', 
            fontSize: '1.5rem', 
            fontWeight: 'bold'
          }}>
            Watermelon Globe
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to={`/ProductTourist/${id}`} style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <ShoppingBag size={20} />
              Products
            </Link>
            <Link to="/signout" style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <LogOut size={20} />
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h1 style={{ 
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#00b341',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Your Purchased Products
        </h1>

        {/* Search Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name"
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button onClick={handleReset} style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        </div>

        {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{errorMessage}</p>}

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '3px solid rgba(0, 179, 65, 0.3)',
              borderRadius: '50%',
              borderTopColor: '#00b341',
              animation: 'spin 1s ease-in-out infinite',
            }} />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '1rem',
            width: '100%'
          }}>
            {filteredProducts.map((product) => (
              <div key={product._id} style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={product.picture || "/placeholder.svg"}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ 
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {product.name}
                  </h3>
                  <p style={{ 
                    fontSize: '0.875rem',
                    color: '#666',
                    marginBottom: '1rem',
                    flex: 1
                  }}>
                    {product.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ 
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      color: '#00b341'
                    }}>
                      ${product.price && product.price.$numberDecimal ? product.price.$numberDecimal : product.price}
                    </span>
                    <span style={{ 
                      fontSize: '0.875rem',
                      color: '#666'
                    }}>
                      Rating: {product.rating || 'N/A'}
                    </span>
                  </div>
                  
                  <StarRating 
                    rating={product.rating || 0}
                    onRate={(rating) => handleRateProduct(product._id, rating)}
                  />
                  <button
                    onClick={() => setShowReviewInput(product._id)}
                    style={{
                      backgroundColor: '#00b341',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      marginTop: '0.5rem',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#009933'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00b341'}
                  >
                    <MessageSquare size={16} />
                    Write Review
                  </button>
                  <button
                    onClick={() => handleViewReviews(product._id)}
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      marginTop: '0.5rem',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                  >
                    <Eye size={16} />
                    View Reviews
                  </button>
                  {showReviewInput === product._id && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <textarea
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review..."
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                          marginBottom: '0.5rem'
                        }}
                        rows="3"
                      />
                      <button
                        onClick={() => handleAddReview(product._id)}
                        style={{
                          backgroundColor: '#8b5cf6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.5rem',
                          cursor: 'pointer',
                          width: '100%',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          transition: 'background-color 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
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
          <p style={{ textAlign: 'center', color: '#666', fontSize: '1.25rem', marginTop: '2rem' }}>No purchased products found.</p>
        )}

        {showReviewsModal && (
          <ViewReviewsModal
            productId={selectedProductId}
            reviews={reviews}
            onClose={() => setShowReviewsModal(false)}
          />
        )}
      </div>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PurchasedProducts;