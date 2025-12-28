import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getMethod, postMethod, putMethod } from '../utils/apiService';
import { ArrowLeft, MapPin, Home, Briefcase, MapPinned, Plus, Edit, Trash2 } from 'lucide-react';

export default function Addresses() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'Home',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const addressTypes = ['Home', 'Work', 'Other'];

  useEffect(() => {
    fetchAddresses();
  }, [token]);

  const fetchAddresses = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await getMethod('/client/booking/getAddresses', token);
      const addressesData = response?.data?.data || response?.data || response?.Addresses || [];
      setAddresses(Array.isArray(addressesData) ? addressesData : []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.street || !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      await postMethod(
        '/client/booking/addAddress',
        {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          type: formData.type,
        },
        token
      );
      alert('Address saved successfully');
      setShowModal(false);
      setFormData({ type: 'Home', street: '', city: '', state: '', pincode: '' });
      fetchAddresses();
    } catch (error) {
      console.error('Error adding address:', error);
      alert('Failed to save address');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      type: address.type || 'Home',
      street: address.street || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.pincode || '',
    });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!formData.street || !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill in all required fields');
      return;
    }

    if (!editingAddress?._id) {
      alert('Address not found');
      return;
    }

    try {
      setSaving(true);
      await putMethod(
        '/client/booking/updateAddress',
        {
          addressId: editingAddress._id,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          type: formData.type,
        },
        token
      );
      alert('Address updated successfully');
      setShowModal(false);
      setEditingAddress(null);
      setFormData({ type: 'Home', street: '', city: '', state: '', pincode: '' });
      fetchAddresses();
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Failed to update address');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      await postMethod('/client/booking/deleteAddress', { addressId: id }, token);
      setAddresses(addresses.filter((addr) => addr._id !== id));
      alert('Address deleted successfully');
    } catch (error) {
      console.error('Error deleting address:', error);
      alert('Failed to delete address');
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'Home':
        return Home;
      case 'Work':
        return Briefcase;
      default:
        return MapPinned;
    }
  };

  const getAddressColor = (type) => {
    switch (type) {
      case 'Home':
        return '#4D55CC';
      case 'Work':
        return '#10B981';
      default:
        return '#F59E0B';
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
          <h1 className="text-3xl font-bold mb-2">My Addresses</h1>
          <p className="text-white/80">Manage your delivery addresses</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4D55CC]"></div>
            <p className="text-gray-500 mt-4">Loading addresses...</p>
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No addresses saved</h3>
            <p className="text-gray-500 mb-6">Add your first address to get started</p>
            <button
              onClick={() => {
                setEditingAddress(null);
                setFormData({ type: 'Home', street: '', city: '', state: '', pincode: '' });
                setShowModal(true);
              }}
              className="bg-[#4D55CC] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90"
            >
              Add Address
            </button>
          </div>
        ) : (
          <>
            {addresses.map((address) => {
              const Icon = getAddressIcon(address.type || 'Home');
              const color = getAddressColor(address.type || 'Home');
              return (
                <div
                  key={address._id}
                  className="bg-white rounded-2xl p-6 shadow-sm mb-4 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center flex-1">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mr-3"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className="font-bold text-lg text-gray-900 mr-2">
                            {address.type || 'Address'}
                          </h3>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{address.street}</p>
                        <p className="text-gray-500 text-sm">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(address)}
                        className="p-2 text-[#4D55CC] hover:bg-gray-100 rounded-lg"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(address._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => {
                setEditingAddress(null);
                setFormData({ type: 'Home', street: '', city: '', state: '', pincode: '' });
                setShowModal(true);
              }}
              className="w-full bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 flex items-center justify-center hover:border-[#4D55CC] transition-colors"
            >
              <Plus className="w-5 h-5 text-[#4D55CC] mr-2" />
              <span className="text-[#4D55CC] font-semibold">Add New Address</span>
            </button>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingAddress(null);
                  setFormData({ type: 'Home', street: '', city: '', state: '', pincode: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Address Type</label>
                <div className="flex gap-2">
                  {addressTypes.map((type) => {
                    const Icon = getAddressIcon(type);
                    const color = getAddressColor(type);
                    return (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, type })}
                        className={`flex-1 py-3 rounded-xl border-2 flex flex-col items-center ${
                          formData.type === type
                            ? 'border-[#4D55CC] bg-[#4D55CC]/10'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-1" style={{ color: formData.type === type ? color : '#6B7280' }} />
                        <span className={`text-sm font-semibold ${formData.type === type ? 'text-[#4D55CC]' : 'text-gray-600'}`}>
                          {type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Street Address *</label>
                <textarea
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  placeholder="Enter your street address"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC] min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Enter your city"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">State *</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Enter your state"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Pincode *</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                  placeholder="Enter pincode"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
                />
              </div>

              <button
                onClick={editingAddress ? handleUpdate : handleAdd}
                disabled={saving}
                className="w-full bg-gradient-to-r from-[#021d5c] to-[#4D55CC] text-white py-4 rounded-full font-semibold hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingAddress ? 'Update Address' : 'Save Address'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

