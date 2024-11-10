import React, { useEffect, useState } from 'react';

const GetAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/Tourist/GetAllProducts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Filter out archived products
        const activeProducts = data.filter(product => !product.archived);
        setProducts(activeProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal).toFixed(2);
    }
    return typeof price === 'number' ? price.toFixed(2) : 'N/A';
  };

  const addToCart = (productId) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loader"></div>
        <span style={{ marginLeft: '10px', fontSize: '18px' }}>Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>Our Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', transition: 'box-shadow 0.3s ease-in-out' }} className="product-card">
            <div style={{ padding: '15px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{product.name}</h3>
              <p style={{ color: '#666', marginBottom: '15px', height: '60px', overflow: 'hidden' }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#2ecc71' }}>${formatPrice(product.price)}</span>
                <span style={{ fontSize: '14px', color: '#7f8c8d' }}>In stock: {product.quantity}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  onClick={() => addToCart(product._id)}
                  style={{
                    flex: '1',
                    padding: '10px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px 0 0 5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }} 
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
                {cart[product._id] && (
                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f1f1', padding: '5px 10px', borderRadius: '0 5px 5px 0' }}>
                    <button 
                      onClick={() => removeFromCart(product._id)}
                      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                    >
                      -
                    </button>
                    <span style={{ margin: '0 10px' }}>{cart[product._id]}</span>
                    <button 
                      onClick={() => addToCart(product._id)}
                      style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && !loading && !error && (
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginTop: '30px' }}>No products available at the moment.</p>
      )}
      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Cart Summary</h3>
        {Object.keys(cart).length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.entries(cart).map(([productId, quantity]) => {
              const product = products.find(p => p._id === productId);
              return (
                <li key={productId} style={{ marginBottom: '5px' }}>
                  {product.name}: {quantity} x ${formatPrice(product.price)} = ${formatPrice(quantity * product.price)}
                </li>
              );
            })}
            <li style={{ fontWeight: 'bold', marginTop: '10px' }}>
              Total: ${formatPrice(
                Object.entries(cart).reduce((total, [productId, quantity]) => {
                  const product = products.find(p => p._id === productId);
                  return total + (quantity * product.price);
                }, 0)
              )}
            </li>
          </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default GetAllProducts;
