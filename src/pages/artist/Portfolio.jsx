import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getMethod, postMethod } from '../../utils/apiService';
import { Image, Video, Plus, Trash2 } from 'lucide-react';

export default function ArtistPortfolio() {
  const { token } = useAuthStore();
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const response = await getMethod('/artist/profile/getPortfolio', token);
        if (response?.success && response?.data) {
          setPortfolio(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [token]);

  const handleAddItem = () => {
    // Implement add portfolio item functionality
    alert('Add portfolio item functionality - implement file upload');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await postMethod(`/artist/profile/deletePortfolio/${id}`, {}, token);
      if (response?.success) {
        setPortfolio((items) => items.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio</h1>
        <p className="text-gray-600">Manage your portfolio items</p>
      </div>

      <button
        onClick={handleAddItem}
        className="mb-6 bg-gradient-to-r from-[#021d5c] to-[#4D55CC] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Item
      </button>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-64" />
          ))}
        </div>
      ) : portfolio.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No portfolio items</h3>
          <p className="text-gray-500">Add items to showcase your work</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm overflow-hidden relative group">
              <div className="h-64 bg-gray-200 relative">
                {item.type === 'video' ? (
                  <video src={item.url} className="w-full h-full object-cover" controls />
                ) : (
                  <img src={item.url} alt="Portfolio" className="w-full h-full object-cover" />
                )}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {item.caption && (
                <div className="p-4">
                  <p className="text-gray-600 text-sm">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

