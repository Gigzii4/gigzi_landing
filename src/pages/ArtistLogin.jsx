import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postMethod } from '../utils/apiService';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock, ArrowLeft, Brush } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

export default function ArtistLogin() {
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
      const response = await postMethod('/v3/auth/artistLogin', { email, otp });

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
            setToken(token);
            setUser(userData);
            setRole(decoded.role || userData?.role || 'artist');
            setUsername(userData?.name || decoded.name || '');
            setCity(userData?.city || decoded.city || '');

            navigate('/artist/dashboard');
          } catch (e) {
            console.error('Token decode error:', e);
            setToken(token);
            setUser(userData);
            setUsername(userData?.name || '');
            setCity(userData?.city || '');
            setRole('artist');
            navigate('/artist/dashboard');
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

        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-[#4D55CC] rounded-full flex items-center justify-center mr-3">
            <Brush className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Artist Login</h1>
            <p className="text-gray-600 text-sm">Welcome back, artist! 👋</p>
          </div>
        </div>

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

          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/artist/signup" className="text-[#4D55CC] font-semibold hover:underline">
              Sign Up as Artist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

