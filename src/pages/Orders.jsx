import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getMethod } from '../utils/apiService';
import { Package, Calendar, MapPin, Clock, CheckCircle, X } from 'lucide-react';

export default function Orders() {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const response = await getMethod('/client/order/getUserOrders', token);
        if (response?.success && response?.data) {
          setOrders(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your bookings</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-40" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">Start booking artists to see your orders here</p>
          <button
            onClick={() => navigate('/home')}
            className="bg-[#4D55CC] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90"
          >
            Browse Artists
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const canViewDetails = order.status !== 'cancelled' && order.status !== 'completed';
            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-900 mr-3">
                        {order.artistName || order.artist?.name || 'Artist Booking'}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status || 'Pending'}
                      </span>
                    </div>
                    {order.eventCategory && (
                      <p className="text-gray-600 text-sm mb-2">
                        {typeof order.eventCategory === 'object' 
                          ? order.eventCategory.name || order.eventCategory 
                          : order.eventCategory}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  {order.eventDate && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(order.eventDate).toLocaleDateString()}
                    </div>
                  )}
                  {order.eventLocation && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {order.eventLocation}
                    </div>
                  )}
                  {order.totalAmount && (
                    <div className="flex items-center text-gray-900 font-semibold">
                      <span>₹{order.totalAmount}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="flex-1 bg-[#4D55CC] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

