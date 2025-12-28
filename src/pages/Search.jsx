import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getMethod } from '../utils/apiService';
import { Search as SearchIcon, MapPin, Star, Filter } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (selectedCity) params.city = selectedCity;
        if (searchQuery) params.search = searchQuery;

        const response = await getMethod('/client/booking/getArtists', null, params);
        if (response?.success && response?.data) {
          setArtists(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, [selectedCategory, selectedCity, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Artists</h1>
        <p className="text-gray-600">Find the perfect artist for your event</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
            />
          </div>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4D55CC]"
          >
            <option value="">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-64" />
          ))}
        </div>
      ) : artists.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No artists found</h3>
          <p className="text-gray-500">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <div
              key={artist._id || artist.id}
              onClick={() => navigate(`/artist/${artist._id || artist.id}`)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-[#021d5c] to-[#4D55CC] relative">
                {artist.profilePicture && (
                  <img
                    src={artist.profilePicture}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl text-gray-900 mb-1">{artist.name}</h3>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {artist.city}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-semibold">
                      {artist.rating?.average || artist.rating || '4.5'}
                    </span>
                  </div>
                  <button className="bg-[#021d5c] text-white px-4 py-2 rounded-full text-xs font-bold hover:opacity-90">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

