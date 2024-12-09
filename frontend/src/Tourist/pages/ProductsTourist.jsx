import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, LogOut, ShoppingBag, Search, Filter, SortDesc, RefreshCw, Heart, ChevronDown, ChevronUp, X, Trash2 } from 'lucide-react';
import axios from 'axios';
import TouristNavbar from "../Components/TouristNavBar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [price, setPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [addedToCart, setAddedToCart] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showWishlistPopup, setShowWishlistPopup] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchProducts();
    fetchWishlistItems();
  }, [id]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/Tourist/GetAllProducts');
      const data = await response.json();
      const activeProducts = data.filter(product => !product.archived);
      setProducts(activeProducts);
      setFilteredProducts(activeProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Failed to load products. Please try again.');
    }
  };

  const fetchWishlistItems = async () => {
    try {
      const response = await axios.get(`/api/Tourist/getWishList/${id}`);
      console.log('Wishlist API response:', response);
      if (response.status === 200 && response.data && response.data.wishList) {
        const wishlistIds = response.data.wishList;
        console.log('Wishlist IDs:', wishlistIds);
        const wishlistProducts = products.filter(product => wishlistIds.includes(product._id));
        console.log('Wishlist products:', wishlistProducts);
        setWishlistItems(wishlistProducts);
      } else {
        console.error('Error fetching wishlist items:', response.statusText);
        setWishlistItems([]);
      }
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      setWishlistItems([]);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const quantity = 1;
      const response = await axios.post(`/api/Tourist/addProductToCart/${id}`, { productId, quantity });

      if (response.status === 200) {
        setAddedToCart(prevState => ({ ...prevState, [productId]: true }));
        setTimeout(() => {
          setAddedToCart(prevState => ({ ...prevState, [productId]: false }));
        }, 3000);
        console.log('Item added to cart!');
      } else {
        alert('Failed to add product to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred while adding product to cart. Please try again.');
    }
  };

  const handleAddToWishlist = async (product) => {
    try {
      const response = await axios.put(`/api/Tourist/addToWishList/${id}/${product._id}`);
      console.log('Add to wishlist response:', response);
      if (response.status === 200) {
        await fetchWishlistItems();
        alert('Item added to wishlist!');
      } else {
        alert('Failed to add product to wishlist. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      alert('An error occurred while adding product to wishlist. Please try again.');
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await axios.put(`/api/Tourist/deleteFromWishlist/${id}/${productId}`);
      console.log('Remove from wishlist response:', response);
      if (response.status === 200) {
        await fetchWishlistItems();
        alert('Item removed from wishlist!');
      } else {
        alert('Failed to remove product from wishlist. Please try again.');
      }
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      alert('An error occurred while removing product from wishlist. Please try again.');
    }
  };

  const handleFilterByPrice = async () => {
    try {
      const response = await fetch(`/api/filter/filterProductPrice/${price}`);
      const data = await response.json();
      if (response.ok) {
        setFilteredProducts([data]);
        setErrorMessage('');
      } else {
        setErrorMessage(data.error || 'Failed to find product. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while filtering products.');
    }
  };

  const handleSearchByName = async () => {
    try {
      const response = await fetch(`/api/Tourist/searchProductName?name=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      if (response.ok) {
        setFilteredProducts(data);
        setErrorMessage('');
      } else {
        setErrorMessage('No product found with this name.');
      }
    } catch (error) {
      setErrorMessage('Error searching for product: ' + error.message);
    }
  };

  const handleSortByRatings = async () => {
    try {
      const response = await fetch('/api/Sort/sortProducts');
      const data = await response.json();
      if (response.ok) {
        setFilteredProducts(data);
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to sort products. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while sorting products.');
    }
  };

  const handleReset = () => {
    setFilteredProducts(products);
    setPrice('');
    setSearchTerm('');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="bg-secondary py-4 mb-8">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
          <span className="text-white text-2xl font-bold">Watermelon Globe</span>
          <div className="flex gap-6">
            <Link to={`/ShoppingCart/${id}`} className="text-white flex items-center gap-2">
              <ShoppingBag size={20} />
              View Cart
            </Link>
            <button onClick={() => {
              fetchWishlistItems();
              setShowWishlistPopup(true);
            }} className="text-white flex items-center gap-2">
              <Heart size={20} />
              Wish List
            </button>
            <Link to="/GuestPage" className="text-white flex items-center gap-2">
              <LogOut size={20} />
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Placeholder Image with Overlay Text */}
        <div className="mb-8 relative">
          <img
            src="https://img.freepik.com/premium-vector/people-mall_18591-35482.jpg?w=740"
            alt="Placeholder"
            className="w-full h-50 object-cover rounded-lg filter blur-sm"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center px-4 py-2 bg-primary bg-opacity-75 rounded-lg shadow-lg transform -skew-x-6">
              Embark on Your Next Adventure with Our Exclusive Travel Essentials!
            </h2>
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold text-secondary mb-8">Explore Our Products</h1>

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
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
                className="p-2 border rounded-lg border-lightGray"
              />
              <button
                onClick={handleSearchByName}
                className="bg-primary text-white p-2 rounded-lg flex items-center gap-2 hover:bg-hover"
              >
                <Search size={16} />
                Search
              </button>
            </div>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Filter by price"
                className="p-2 border rounded-lg border-lightGray"
              />
              <button
                onClick={handleFilterByPrice}
                className="bg-primary text-white p-2 rounded-lg flex items-center gap-2 hover:bg-hover"
              >
                <Filter size={16} />
                Filter
              </button>
            </div>
            <button
              onClick={handleSortByRatings}
              className="bg-primary text-white p-2 rounded-lg flex items-center gap-2 hover:bg-hover"
            >
              <SortDesc size={16} />
              Sort by Ratings
            </button>
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

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredProducts.map((product) => (
            product.quantity > 0 && (
              <div key={product._id} className="bg-cardBackground rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                <div className="relative">
                  <img
                    src={product.picture ? (product.picture.startsWith('http') ? product.picture : `/uploads/${product.picture}`) : "https://via.placeholder.com/150"}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <span className="absolute top-2 right-2 bg-primary text-white py-1 px-2 rounded-full text-xs">
                    {product.quantity} left
                  </span>
                </div>

                <div className="p-3 flex flex-col">
                  <h3 className="text-base font-bold mb-1">{product.name}</h3>
                  <p className="text-sm text-grayText mb-2 flex-1">{product.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price && product.price.$numberDecimal ? product.price.$numberDecimal : product.price}
                    </span>
                    <span className="text-xs text-grayText">Rating: {product.ratings || 'N/A'}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className={`p-1 rounded-lg flex items-center justify-center gap-1 w-full text-sm ${addedToCart[product._id] ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-hover'
                      }`}
                  >
                    <ShoppingCart size={14} />
                    {addedToCart[product._id] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="p-1 rounded-lg flex items-center justify-center gap-1 w-full text-sm bg-secondary hover:bg-hover mt-2"
                  >
                    <Heart size={14} />
                    Wishlist
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Wishlist Popup */}
      {showWishlistPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Wishlist</h2>
              <button onClick={() => setShowWishlistPopup(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            {wishlistItems.length === 0 ? (
              <p>Your wishlist is empty.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlistItems.map((item) => (
                  <div key={item._id} className="border rounded-lg p-4 flex flex-col">
                    <img
                      src={item.picture || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-primary">
                        ${item.price && item.price.$numberDecimal ? item.price.$numberDecimal : item.price}
                      </span>
                      <span className="text-xs text-gray-500">Rating: {item.ratings || 'N/A'}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item._id)}
                        className="p-2 rounded-lg flex items-center justify-center gap-2 w-full text-sm bg-primary hover:bg-hover text-white"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(item._id)}
                        className="p-2 rounded-lg flex items-center justify-center gap-2 w-full text-sm bg-darkPink hover:bg-darkPinkHover text-white"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

