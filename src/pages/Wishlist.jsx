import { useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  const removeItem = (id) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">Items you've saved for later</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Add items to your wishlist to see them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                )}
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                <button className="w-full mt-3 bg-[#4D55CC] text-white py-2 rounded-full text-sm font-semibold hover:opacity-90">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

