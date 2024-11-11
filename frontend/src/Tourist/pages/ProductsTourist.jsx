import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, LogOut, ShoppingBag, Search, Filter, SortDesc, RefreshCw } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [price, setPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
     // setProducts(data);
      setFilteredProducts(activeProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Failed to load products. Please try again.');
    }
  };

  const handleBuy = async (productId) => {
    try {
      const response = await fetch(`/api/tourist/buyProduct/${id}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert("Thank you for your purchase");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
        );
        setFilteredProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
        );
      } else {
        alert("Failed to purchase product. Please try again.");
      }
    } catch (error) {
      console.error('Error purchasing product:', error);
      alert("Failed to purchase product. Please try again.");
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
            <Link to="/cart" style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <ShoppingBag size={20} />
              View Cart
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
          Explore Our Products
        </h1>

        {/* Search and Filter Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name"
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button onClick={handleSearchByName} style={{
              backgroundColor: '#00b341',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Search size={16} />
              Search
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Filter by price"
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button onClick={handleFilterByPrice} style={{
              backgroundColor: '#00b341',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Filter size={16} />
              Filter
            </button>
          </div>
          <button onClick={handleSortByRatings} style={{
            backgroundColor: '#00b341',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <SortDesc size={16} />
            Sort by Ratings
          </button>
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

        {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{errorMessage}</p>}

        {/* Product Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '1rem',
          width: '100%'
        }}>
          {filteredProducts.map((product) => (
            product.quantity > 0 && (
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
                  <span style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#00b341',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    {product.quantity} left
                  </span>
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
                      Rating: {product.ratings || 'N/A'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBuy(product._id)}
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
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#009933'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00b341'}
                  >
                    <ShoppingCart size={16} />
                    Buy Now
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