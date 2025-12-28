import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { getMethod } from '../../utils/apiService';
import { Package, Calendar, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

export default function ArtistDashboard() {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalEarnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const response = await getMethod('/artist/order/getMyOrders', token);
        if (response?.success && response?.data) {
          const ordersList = Array.isArray(response.data) ? response.data : [];
          setOrders(ordersList);
          
          setStats({
            totalOrders: ordersList.length,
            pendingOrders: ordersList.filter((o) => o.status === 'pending').length,
            completedOrders: ordersList.filter((o) => o.status === 'completed').length,
            totalEarnings: ordersList
              .filter((o) => o.status === 'completed')
              .reduce((sum, o) => sum + (o.totalAmount || 0), 0),
          });
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Artist Dashboard</h1>
        <p className="text-gray-600">Manage your bookings and earnings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-[#4D55CC]" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-yellow-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-green-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{stats.totalEarnings}</p>
          <p className="text-sm text-gray-600">Total Earnings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => navigate('/artist/portfolio')}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
        >
          <h3 className="font-bold text-gray-900 mb-2">Portfolio</h3>
          <p className="text-gray-600 text-sm mb-4">Manage your portfolio</p>
          <ArrowRight className="w-5 h-5 text-[#4D55CC]" />
        </button>

        <button
          onClick={() => navigate('/artist/slots')}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
        >
          <h3 className="font-bold text-gray-900 mb-2">Slots</h3>
          <p className="text-gray-600 text-sm mb-4">Manage availability</p>
          <ArrowRight className="w-5 h-5 text-[#4D55CC]" />
        </button>

        <button
          onClick={() => navigate('/artist/wallet')}
          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
        >
          <h3 className="font-bold text-gray-900 mb-2">Wallet</h3>
          <p className="text-gray-600 text-sm mb-4">View earnings</p>
          <ArrowRight className="w-5 h-5 text-[#4D55CC]" />
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-20" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="border-b pb-4 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{order.userName || 'Customer'}</p>
                    <p className="text-sm text-gray-600">
                      {typeof order.eventCategory === 'object' 
                        ? order.eventCategory.name || JSON.stringify(order.eventCategory)
                        : order.eventCategory || 'General'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{order.totalAmount || 0}</p>
                    <p className={`text-xs px-2 py-1 rounded-full inline-block ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

