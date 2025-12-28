import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getMethod } from '../utils/apiService';
import { User, Package, Heart, Settings, MapPin, LogOut, Edit, ShoppingCart, Bell, History, Tag, HelpCircle, Info, FileText, Lock } from 'lucide-react';

export default function Account() {
  const { user, username, city, token, logout } = useAuthStore();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    wishlistItems: 0,
    cartItems: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const [profileRes, statsRes] = await Promise.all([
          getMethod('/client/profile', token),
          getMethod('/client/stats', token).catch(() => null),
        ]);
        
        if (profileRes?.success || profileRes?.data) {
          setUserData(profileRes.data || profileRes);
        }
        
        if (statsRes?.success && statsRes?.data) {
          setUserStats({
            totalOrders: statsRes.data.totalOrders || 0,
            pendingOrders: statsRes.data.pendingOrders || 0,
            completedOrders: statsRes.data.completedOrders || 0,
            wishlistItems: statsRes.data.wishlistItems || 0,
            cartItems: statsRes.data.cartItems || 0,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  const quickActions = [
    { icon: Package, label: 'My Orders', path: '/orders', count: userStats.totalOrders, color: '#4D55CC' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', count: userStats.cartItems, color: '#9333EA' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist', count: userStats.wishlistItems, color: '#EF4444' },
    { icon: MapPin, label: 'Addresses', path: '/account/addresses', color: '#10B981' },
  ];

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: Edit, label: 'Edit Profile', path: '/account/edit' },
        { icon: Settings, label: 'Settings', path: '/account/settings' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: History, label: 'Recently Viewed', path: '/recently-viewed' },
      ],
    },
    {
      title: 'Offers',
      items: [
        { icon: Tag, label: 'Coupons & Discounts', path: '/coupons' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Support', path: '/support' },
        { icon: Info, label: 'About Us', path: '/about' },
        { icon: FileText, label: 'Terms & Conditions', path: '/terms' },
        { icon: Lock, label: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4D55CC]"></div>
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] rounded-3xl p-8 text-white mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 text-4xl font-bold">
              {username?.[0]?.toUpperCase() || 'U'}
            </div>
            <h1 className="text-3xl font-bold mb-2">{username || 'User'}</h1>
            <p className="text-white/80">{city || 'No city set'}</p>
            {userData?.email && <p className="text-white/70 text-sm mt-1">{userData.email}</p>}
          </div>
          <button
            onClick={() => navigate('/account/edit')}
            className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <Package className="w-6 h-6 mb-2 text-white/80" />
            <p className="text-2xl font-bold">{userStats.totalOrders}</p>
            <p className="text-xs text-white/70">Orders</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <Package className="w-6 h-6 mb-2 text-white/80" />
            <p className="text-2xl font-bold">{userStats.pendingOrders}</p>
            <p className="text-xs text-white/70">Pending</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
            <Package className="w-6 h-6 mb-2 text-white/80" />
            <p className="text-2xl font-bold">{userStats.completedOrders}</p>
            <p className="text-xs text-white/70">Completed</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <action.icon className="w-6 h-6" style={{ color: action.color }} />
                </div>
                {action.count !== undefined && action.count > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {action.count}
                  </span>
                )}
              </div>
              <p className="font-semibold text-gray-900 text-sm">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {section.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                    <item.icon className="w-5 h-5 text-[#4D55CC]" />
                  </div>
                  <span className="font-semibold text-gray-900">{item.label}</span>
                </div>
                <span className="text-gray-400">›</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm">App Version 1.0.0</p>
        <p className="text-gray-400 text-xs mt-1">© 2024 Gigzi. All rights reserved.</p>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl p-4 font-semibold flex items-center justify-center transition-colors"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </button>
    </div>
  );
}

