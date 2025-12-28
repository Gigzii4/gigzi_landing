import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getMethod, postMethod } from '../utils/apiService';
import { ArrowLeft, Calendar, MapPin, Clock, User, X, AlertCircle, CheckCircle } from 'lucide-react';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [eligibility, setEligibility] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');

  useEffect(() => {
    fetchOrderDetails();
    checkEligibility();
  }, [id, token]);

  const fetchOrderDetails = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await getMethod(`/client/order/getOrderDetails/${id}`, token);
      if (response?.success && response?.data) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    if (!token) return;
    try {
      const response = await getMethod(`/client/order/cancel/${id}/eligibility`, token);
      if (response?.success && response?.data) {
        setEligibility(response.data);
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
    }
  };

  const handleCancel = async () => {
    if (!cancellationReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }

    try {
      setCancelling(true);
      const response = await postMethod(
        `/client/order/cancel/${id}`,
        { cancellationReason: cancellationReason.trim() },
        token
      );

      if (response?.success) {
        alert(`Order cancelled successfully. ${response.data?.refund ? `Refund: ${response.data.refund.refundAmount || 'Processing...'}` : ''}`);
        setShowCancelModal(false);
        setCancellationReason('');
        fetchOrderDetails();
        navigate('/orders');
      } else {
        alert(response?.error || response?.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert(error?.response?.data?.error || error?.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4D55CC]"></div>
          <p className="text-gray-500 mt-4">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Order not found</h3>
          <button
            onClick={() => navigate('/orders')}
            className="bg-[#4D55CC] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const canCancel = eligibility?.allowed && order.status !== 'cancelled' && order.status !== 'completed';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] text-white pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/orders" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold mb-2">Order Details</h1>
          <p className="text-white/80">Order ID: {order._id?.slice(-8)}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {order.artistName || order.artist?.name || 'Artist Booking'}
              </h2>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status || 'Pending'}
              </span>
            </div>
            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-2 rounded-full font-semibold flex items-center"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel Order
              </button>
            )}
          </div>

          {eligibility && !eligibility.allowed && order.status !== 'cancelled' && order.status !== 'completed' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900 mb-1">Cancellation Not Available</p>
                  <p className="text-yellow-700 text-sm">{eligibility.message}</p>
                </div>
              </div>
            </div>
          )}

          {eligibility && eligibility.allowed && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Cancellation Available</p>
                  <p className="text-blue-700 text-sm">
                    {eligibility.message}
                    {eligibility.refundPercentage && (
                      <span className="font-semibold"> Refund: {eligibility.refundPercentage}%</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Event Details</h3>
              <div className="space-y-3">
                {order.eventCategory && (
                  <div>
                    <p className="text-xs text-gray-500">Event Type</p>
                    <p className="text-gray-900 font-semibold">
                      {typeof order.eventCategory === 'object' 
                        ? order.eventCategory.name || order.eventCategory 
                        : order.eventCategory}
                    </p>
                  </div>
                )}
                {order.eventDate && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(order.eventDate).toLocaleDateString()}</span>
                    {order.slotId?.slotNumber && <span className="ml-2">(Slot {order.slotId.slotNumber})</span>}
                  </div>
                )}
                {order.eventLocation && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{order.eventLocation}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Payment Details</h3>
              <div className="space-y-3">
                {order.totalAmount && (
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="text-gray-900 font-bold text-xl">₹{order.totalAmount}</p>
                  </div>
                )}
                {order.paymentStatus && (
                  <div>
                    <p className="text-xs text-gray-500">Payment Status</p>
                    <p className={`font-semibold ${
                      order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {order.paymentStatus}
                    </p>
                  </div>
                )}
                {order.refundPercentage !== undefined && order.refundPercentage > 0 && (
                  <div>
                    <p className="text-xs text-gray-500">Refund Percentage</p>
                    <p className="text-gray-900 font-semibold">{order.refundPercentage}%</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {order.cancellationReason && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Cancellation Details</h3>
              <p className="text-gray-600 text-sm mb-1">
                <strong>Reason:</strong> {order.cancellationReason}
              </p>
              {order.cancelledAt && (
                <p className="text-gray-500 text-xs">
                  Cancelled on: {new Date(order.cancelledAt).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancel Order</h2>
            
            {eligibility && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-blue-900">
                  <strong>Refund:</strong> {eligibility.refundPercentage || 0}% will be processed.
                </p>
                <p className="text-xs text-blue-700 mt-1">{eligibility.message}</p>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reason for Cancellation *
              </label>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Please provide a reason for cancellation..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC] min-h-[100px]"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancellationReason('');
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50"
                disabled={cancelling}
              >
                Cancel
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling || !cancellationReason.trim()}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

