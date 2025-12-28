import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getMethod, postMethod } from '../utils/apiService';
import { ArrowLeft, Tag, Copy, Check } from 'lucide-react';

export default function Coupons() {
  const { token } = useAuthStore();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, [token]);

  const fetchCoupons = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await getMethod('/client/coupons', token);
      if (response?.success && response?.data) {
        setCoupons(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApply = async (couponId) => {
    try {
      const response = await postMethod('/client/coupons/apply', { couponId }, token);
      if (response?.success) {
        alert('Coupon applied successfully!');
      } else {
        alert(response?.message || 'Failed to apply coupon');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      alert('Failed to apply coupon');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] text-white pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/account" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="text-3xl font-bold mb-2">Coupons & Discounts</h1>
          <p className="text-white/80">Save more with exclusive offers</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4D55CC]"></div>
            <p className="text-gray-500 mt-4">Loading coupons...</p>
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No coupons available</h3>
            <p className="text-gray-500">Check back later for exciting offers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="bg-gradient-to-br from-[#021d5c] to-[#4D55CC] rounded-2xl p-6 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Tag className="w-8 h-8" />
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{coupon.code}</h3>
                  <p className="text-white/80 text-sm mb-4">{coupon.description || 'Use this coupon to get discount'}</p>
                  {coupon.minPurchaseAmount && (
                    <p className="text-white/70 text-xs mb-4">
                      Min. purchase: ₹{coupon.minPurchaseAmount}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="flex-1 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center"
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Code
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleApply(coupon._id)}
                      className="flex-1 bg-white text-[#4D55CC] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/90"
                    >
                      Apply
                    </button>
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

