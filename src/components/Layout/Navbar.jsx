import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { Menu, X, User, LogOut, ShoppingCart, Heart, Package } from 'lucide-react';

export default function Navbar() {
  const { token, username, role, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#021d5c] to-[#4D55CC] bg-clip-text text-transparent">
              Gigzi
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-[#4D55CC] font-medium">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-[#4D55CC] font-medium">
              Shop
            </Link>
            {token ? (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-[#4D55CC] font-medium">
                  Orders
                </Link>
                <Link to="/cart" className="text-gray-700 hover:text-[#4D55CC] font-medium flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-1" />
                  Cart
                </Link>
                <Link to="/wishlist" className="text-gray-700 hover:text-[#4D55CC] font-medium flex items-center">
                  <Heart className="w-5 h-5 mr-1" />
                  Wishlist
                </Link>
                {role === 'artist' ? (
                  <Link to="/artist/dashboard" className="text-gray-700 hover:text-[#4D55CC] font-medium">
                    Dashboard
                  </Link>
                ) : null}
                <Link to="/account" className="text-gray-700 hover:text-[#4D55CC] font-medium flex items-center">
                  <User className="w-5 h-5 mr-1" />
                  {username || 'Account'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-[#4D55CC] font-medium">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-[#021d5c] to-[#4D55CC] text-white px-4 py-2 rounded-full font-medium hover:opacity-90"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-[#4D55CC]">
              Home
            </Link>
            <Link to="/shop" className="block py-2 text-gray-700 hover:text-[#4D55CC]">
              Shop
            </Link>
            {token ? (
              <>
                <Link to="/orders" className="block py-2 text-gray-700 hover:text-[#4D55CC]">
                  Orders
                </Link>
                <Link to="/cart" className="block py-2 text-gray-700 hover:text-[#4D55CC]">
                  Cart
                </Link>
                <Link to="/wishlist" className="block py-2 text-gray-700 hover:text-[#4D55CC]">
                  Wishlist
                </Link>
                {role === 'artist' && (
                  <Link to="/artist/dashboard" className="block py-2 text-gray-700 hover:text-[#4D55CC]">
                    Dashboard
                  </Link>
                )}
                <Link to="/account" className="block py-2 text-gray-700 hover:text-[#4D55CC]">
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block py-2 text-gray-700 hover:text-[#4D55CC]">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 bg-gradient-to-r from-[#021d5c] to-[#4D55CC] text-white rounded-full text-center font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

