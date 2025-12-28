import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMethod } from '../utils/apiService';
import { Star, MapPin, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ArtistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        const [artistRes, slotsRes] = await Promise.all([
          getMethod(`/client/booking/getArtistById/${id}`),
          getMethod(`/artist/addSlots/getSlots/${id}`),
        ]);

        if (artistRes?.success || artistRes?.data) {
          setArtist(artistRes.data || artistRes);
        }

        if (slotsRes?.success && slotsRes?.data) {
          setSlots(Array.isArray(slotsRes.data) ? slotsRes.data : []);
        }
      } catch (error) {
        console.error('Error fetching artist:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  const handleBookNow = () => {
    if (!selectedSlot) {
      alert('Please select a slot');
      return;
    }
    navigate(`/booking/${id}?slotId=${selectedSlot._id}`);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-200 animate-pulse rounded-2xl h-96" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Artist not found</h2>
          <button
            onClick={() => navigate('/home')}
            className="text-[#4D55CC] font-semibold"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/home')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">
        <div className="h-64 bg-gradient-to-br from-[#021d5c] to-[#4D55CC] relative">
          {artist.profilePicture && (
            <img
              src={artist.profilePicture}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900 mr-3">{artist.name}</h1>
                {artist.isVerified && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                {artist.city}
              </div>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                <span className="text-lg font-bold">
                  {artist.rating?.average || artist.rating || '4.5'}
                </span>
                <span className="text-gray-600 ml-2">
                  ({artist.rating?.count || artist.reviews || '0'} reviews)
                </span>
              </div>
            </div>
          </div>

          {artist.bio && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">About</h2>
              <p className="text-gray-600">{artist.bio}</p>
            </div>
          )}

          {artist.eventcategories && artist.eventcategories.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Event Categories</h2>
              <div className="flex flex-wrap gap-2">
                {artist.eventcategories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-[#4D55CC] px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Slots</h2>
        {slots.length === 0 ? (
          <p className="text-gray-600">No available slots at the moment</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {slots.map((slot) => (
              <button
                key={slot._id}
                onClick={() => setSelectedSlot(slot)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  selectedSlot?._id === slot._id
                    ? 'border-[#4D55CC] bg-blue-50'
                    : 'border-gray-200 hover:border-[#4D55CC]'
                }`}
              >
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
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleBookNow}
          disabled={!selectedSlot || slots.length === 0}
          className="w-full bg-gradient-to-r from-[#021d5c] to-[#4D55CC] text-white py-4 rounded-full font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

