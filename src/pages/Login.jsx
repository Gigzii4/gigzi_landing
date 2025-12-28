import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postMethod } from '../utils/apiService';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken, setUsername, setCity, setUser, setRole } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !otp) {
      alert('Please enter email and OTP');
      return;
    }
    try {
      setLoading(true);
      const response = await postMethod('/v3/auth/login', { email, otp });

      if (response?.error) {
        alert(response.error);
        return;
      }

      if (response?.status || response?.data?.status || response?.success) {
        const token = response?.token || response?.data?.token;
        const userData = response?.user || response?.data?.user || response?.data;

        if (token) {
          try {
            const decoded = jwtDecode(token);
            const userRole = decoded.role || userData?.role || 'user';
            setToken(token);
            setUser(userData);
            setRole(userRole);
            setUsername(userData?.name || decoded.name || '');
            setCity(userData?.city || decoded.city || '');

            // Redirect based on role
            if (userRole === 'artist') {
              navigate('/artist/dashboard');
            } else {
              navigate('/home');
            }
          } catch (e) {
            console.error('Token decode error:', e);
            const userRole = userData?.role || 'user';
            setToken(token);
            setUser(userData);
            setRole(userRole);
            setUsername(userData?.name || '');
            setCity(userData?.city || '');

            // Redirect based on role
            if (userRole === 'artist') {
              navigate('/artist/dashboard');
            } else {
              navigate('/home');
            }
          }
        } else {
          alert('Login failed. Please try again.');
        }
      } else {
        alert(response?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    const emailToSend = String(email || '').trim();
    if (!emailToSend) {
      alert('Please enter your email address');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToSend)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setOtpLoading(true);
      const response = await postMethod('/v3/auth/sendOtp', { email: emailToSend });

      if (response?.status || response?.data?.status) {
        alert(response?.message || response?.data?.message || 'OTP sent successfully to your email');
        setIsEmailEntered(true);
      } else {
        alert(response?.error || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('OTP sending failed:', error);
      alert(error?.message || 'Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <Link to="/preauth" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Login 👋</h1>
        <p className="text-gray-600 mb-8">Welcome back! Please login to continue</p>

        <div className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC] focus:border-transparent"
            />
          </div>

          {isEmailEntered && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Lock className="w-4 h-4 mr-2" />
                  Enter OTP
                </label>
                <button
                  onClick={sendOtp}
                  disabled={otpLoading || !email}
                  className={`text-xs px-3 py-1 rounded-full ${
                    otpLoading || !email
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-[#4D55CC] text-white'
                  }`}
                >
                  {otpLoading ? 'Sending...' : 'Resend'}
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC] focus:border-transparent"
              />
            </div>
          )}

          {!isEmailEntered ? (
            <button
              onClick={sendOtp}
              disabled={otpLoading || !email}
              className="w-full bg-gradient-to-r from-[#021d5c] to-[#4D55CC] text-white py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {otpLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          ) : (
            <button
              onClick={handleLogin}
              disabled={loading || !otp}
              className="w-full bg-gradient-to-r from-[#021d5c] to-[#4D55CC] text-white py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          )}

          <div className="text-center space-y-2">
            <div>
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-[#4D55CC] font-semibold hover:underline">
                Sign Up
              </Link>
            </div>
            <div>
              <span className="text-gray-600">Are you an artist? </span>
              <Link to="/artist/login" className="text-[#4D55CC] font-semibold hover:underline">
                Artist Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

