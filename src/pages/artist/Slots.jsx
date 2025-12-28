import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getMethod, postMethod, deleteMethod } from '../../utils/apiService';
import { Calendar, Plus, Trash2, Clock } from 'lucide-react';

export default function ArtistSlots() {
  const { token } = useAuthStore();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    price: '',
  });

  useEffect(() => {
    const fetchSlots = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const response = await getMethod('/artist/addSlots/getMySlots', token);
        if (response?.success && response?.data) {
          setSlots(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error('Error fetching slots:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [token]);

  const handleAddSlot = async () => {
    if (!formData.date || !formData.startTime || !formData.endTime || !formData.price) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await postMethod('/artist/addSlots/addSlot', formData, token);
      if (response?.success || response?.data) {
        setSlots([...slots, response.data || response]);
        setFormData({ date: '', startTime: '', endTime: '', price: '' });
        setShowAddForm(false);
      } else {
        alert(response?.error || 'Failed to add slot');
      }
    } catch (error) {
      console.error('Error adding slot:', error);
      alert('Failed to add slot');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this slot?')) return;
    try {
      const response = await deleteMethod(`/artist/addSlots/deleteSlot/${id}`, token);
      if (response?.success) {
        setSlots((items) => items.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error('Error deleting slot:', error);
      alert('Failed to delete slot');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Slots</h1>
          <p className="text-gray-600">Set your availability</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-[#021d5c] to-[#4D55CC] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Slot
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Slot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddSlot}
              className="bg-[#4D55CC] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90"
            >
              Add Slot
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-24" />
          ))}
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No slots added</h3>
          <p className="text-gray-500">Add slots to make yourself available for bookings</p>
        </div>
      ) : (
        <div className="space-y-4">
          {slots.map((slot) => (
            <div key={slot._id} className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-[#4D55CC] mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {new Date(slot.date).toLocaleDateString()}
                  </p>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {slot.startTime} - {slot.endTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-[#4D55CC]">₹{slot.price}</span>
                <button
                  onClick={() => handleDelete(slot._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

