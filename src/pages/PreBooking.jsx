import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getMethod, postMethod } from '../utils/apiService';
import { Calendar, MapPin, CreditCard, ArrowLeft } from 'lucide-react';

export default function PreBooking() {
  const { artistId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [artist, setArtist] = useState(null);
  const [slot, setSlot] = useState(null);
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const slotId = searchParams.get('slotId');
        
        const [artistRes, slotRes] = await Promise.all([
          getMethod(`/client/booking/getArtistById/${artistId}`),
          slotId ? getMethod(`/artist/addSlots/getSlotById/${slotId}`, token) : Promise.resolve(null),
        ]);

        if (artistRes?.success || artistRes?.data) {
          setArtist(artistRes.data || artistRes);
        }

        if (slotRes?.success && slotRes?.data) {
          setSlot(slotRes.data);
          setEventDate(slotRes.data.date);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [artistId, searchParams, token]);

  const handleBooking = async () => {
    if (!eventLocation || !eventDate || !slot) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await postMethod(
        '/client/booking/createBooking',
        {
          artistId,
          slotId: slot._id,
          eventDate,
          eventLocation,
          eventCategory: artist?.eventcategories?.[0] || 'General',
        },
        token
      );

      if (response?.success || response?.data) {
        const orderId = response.data?._id || response.data?.orderId || response._id;
        navigate(`/orders/${orderId}`);
      } else {
        alert(response?.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert(error?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-200 animate-pulse rounded-2xl h-96" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(`/artist/${artistId}`)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="bg-white rounded-3xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Booking</h1>
        <p className="text-gray-600 mb-8">Fill in the details to book {artist?.name}</p>

        <div className="space-y-6">
          {slot && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 mr-2 text-[#4D55CC]" />
                <span className="font-semibold text-gray-900">
                  {new Date(slot.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{slot.startTime} - {slot.endTime}</p>
              {slot.price && (
                <p className="text-[#4D55CC] font-bold mt-2">₹{slot.price}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Event Date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Event Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter event location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
                required
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-gray-900">
                ₹{slot?.price || artist?.pricing || '0'}
              </span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={submitting || !eventLocation || !eventDate}
            className="w-full bg-gradient-to-r from-[#021d5c] to-[#4D55CC] text-white py-4 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {submitting ? (
              'Processing...'
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

