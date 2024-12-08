import React from 'react';
import { X, ShoppingCart } from 'lucide-react';

const WishlistPopup = ({ wishlistItems, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Wishlist</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
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
                <button
                  onClick={() => onAddToCart(item._id)}
                  className="p-2 rounded-lg flex items-center justify-center gap-2 w-full text-sm bg-primary hover:bg-hover text-white"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPopup;

