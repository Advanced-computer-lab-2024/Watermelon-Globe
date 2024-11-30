import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, LogOut, ShoppingBag, Search, Filter, SortDesc, RefreshCw } from 'lucide-react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [price, setPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [addedToCart, setAddedToCart] = useState({}); // Track which product was added
  const { id } = useParams();

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddToCart = async (productId) => {
    try {
      const quantity = 1;
      const response = await axios.post(`/api/Tourist/addProductToCart/${id}`, { productId, quantity });

      if (response.status === 200) {
        // Temporarily change the button text to "Added to Cart"
        setAddedToCart(prevState => ({ ...prevState, [productId]: true }));

        // Reset the button text back to "Add to Cart" after 3 seconds
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
            <Link to="/signout" className="text-white flex items-center gap-2">
              <LogOut size={20} />
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-center text-3xl font-bold text-secondary mb-8">Explore Our Products</h1>

        {/* Search and Filter Section */}
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

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {filteredProducts.map((product) => (
            product.quantity > 0 && (
              <div key={product._id} className="bg-cardBackground rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
                <div className="relative">
                  <img
                    src={product.picture || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <span className="absolute top-2 right-2 bg-primary text-white py-1 px-2 rounded-full text-xs">
                    {product.quantity} left
                  </span>
                </div>

                <div className="p-4 flex flex-col">
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-grayText mb-4 flex-1">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-primary">
                      ${product.price && product.price.$numberDecimal ? product.price.$numberDecimal : product.price}
                    </span>
                    <span className="text-sm text-grayText">Rating: {product.ratings || 'N/A'}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className={`p-2 rounded-lg flex items-center justify-center gap-2 w-full ${
                      addedToCart[product._id] ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-hover'
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {addedToCart[product._id] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
