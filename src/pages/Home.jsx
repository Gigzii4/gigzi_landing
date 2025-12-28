import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getMethod } from '../utils/apiService';
import { Search, Calendar, Users, Video, Star, MapPin, TrendingUp, Sparkles } from 'lucide-react';

export default function Home() {
  const { username, city, token } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [featuredPortfolios, setFeaturedPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArtists: 0,
    activeEvents: 0,
    completedBookings: 0,
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [eventsRes, artistsRes, portfoliosRes] = await Promise.all([
        getMethod('/admin/eventCat/getEventCategories'),
        getMethod('/client/booking/getFeaturedArtists?limit=6'),
        getMethod('/client/booking/getFeaturedPortfolios?limit=5'),
      ]);

      if (eventsRes?.status) {
        setEvents(eventsRes.data || []);
        setStats((prev) => ({ ...prev, activeEvents: eventsRes.data?.length || 0 }));
      }

      if (artistsRes?.success && artistsRes?.data) {
        setFeaturedArtists(artistsRes.data);
        setStats((prev) => ({ ...prev, totalArtists: artistsRes.data.length }));
      }

      if (portfoliosRes?.success && portfoliosRes?.data) {
        setFeaturedPortfolios(portfoliosRes.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/search?category=${categoryId}&categoryName=${categoryName}&city=${city || ''}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] text-white pb-10 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="mb-6">
            <p className="text-white/70 text-sm font-medium mb-1 uppercase tracking-wide">
              {getGreeting()}
            </p>
            <h1 className="text-3xl font-bold mb-2">
              {username || 'User'} 👋
            </h1>
            <div className="flex items-center text-white/90 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {city || 'Select City'}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
              <Users className="w-6 h-6 mb-2 text-white/80" />
              <p className="text-2xl font-bold">{stats.totalArtists}</p>
              <p className="text-xs text-white/70">Artists</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
              <Calendar className="w-6 h-6 mb-2 text-white/80" />
              <p className="text-2xl font-bold">{stats.activeEvents}</p>
              <p className="text-xs text-white/70">Events</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
              <Star className="w-6 h-6 mb-2 text-white/80" />
              <p className="text-2xl font-bold">{stats.completedBookings}</p>
              <p className="text-xs text-white/70">Bookings</p>
            </div>
          </div>

          {/* Search Bar */}
          <button
            onClick={() => navigate('/search')}
            className="w-full bg-white rounded-2xl px-5 py-4 shadow-2xl flex items-center"
          >
            <div className="bg-gradient-to-r from-[#021d5c] to-[#4D55CC] w-12 h-12 rounded-xl flex items-center justify-center mr-4">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-400 text-xs mb-0.5">Search</p>
              <p className="text-gray-900 font-bold">Artists, Events, Shows</p>
            </div>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-6">
        <div className="bg-white rounded-3xl p-1.5 shadow-xl flex gap-2">
          {['events', 'artists', 'shows'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${
                activeTab === tab
                  ? 'bg-[#021d5c] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Event Categories</h2>
                <p className="text-gray-500 text-sm">Explore artists by category</p>
              </div>
              <button
                onClick={() => navigate('/search')}
                className="text-[#4D55CC] font-semibold text-sm flex items-center"
              >
                View All
                <TrendingUp className="w-4 h-4 ml-1" />
              </button>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-32" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {events.slice(0, 8).map((event) => (
                  <button
                    key={event._id}
                    onClick={() => handleCategoryClick(event._id, event.name)}
                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#021d5c] to-[#4D55CC] rounded-2xl flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{event.name}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Featured Artists */}
            {featuredArtists.length > 0 && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Featured Artists</h2>
                    <p className="text-gray-500 text-sm">Top-rated professionals</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('artists')}
                    className="text-[#4D55CC] font-semibold text-sm flex items-center"
                  >
                    View All
                    <TrendingUp className="w-4 h-4 ml-1" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredArtists.map((artist) => {
                    const artistPortfolio = featuredPortfolios.filter(
                      (item) => item.artistName === artist.name
                    );
                    return (
                      <div
                        key={artist._id || artist.id}
                        onClick={() => navigate(`/artist/${artist._id || artist.id}`)}
                        className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      >
                        <div className="h-48 bg-gradient-to-br from-[#021d5c] to-[#4D55CC] relative">
                          {artistPortfolio[0]?.url && (
                            <img
                              src={artistPortfolio[0].url}
                              alt={artist.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                          {artist.isVerified && (
                            <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1.5 flex items-center shadow-lg">
                              <Sparkles className="w-4 h-4 text-green-500 mr-1" />
                              <span className="text-xs font-bold text-gray-800">Verified</span>
                            </div>
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
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="font-bold text-gray-900">
                                {artist.rating?.average || artist.rating || '4.5'}
                              </span>
                              <span className="text-gray-500 text-sm ml-1">
                                ({artist.rating?.count || artist.reviews || '0'})
                              </span>
                            </div>
                            <button className="bg-[#021d5c] text-white px-4 py-2 rounded-full text-xs font-bold hover:opacity-90">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'artists' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Artists</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-3xl h-64" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArtists.map((artist) => (
                  <div
                    key={artist._id || artist.id}
                    onClick={() => navigate(`/artist/${artist._id || artist.id}`)}
                    className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#021d5c] to-[#4D55CC] rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
                        {artist.name?.[0] || 'A'}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{artist.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {artist.city}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-bold">
                          {artist.rating?.average || artist.rating || '4.5'}
                        </span>
                      </div>
                      <button className="bg-[#021d5c] text-white px-4 py-2 rounded-full text-xs font-bold">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'shows' && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Coming Soon</h2>
            <p className="text-gray-500 mb-6">
              We're working on bringing you amazing shows and events. Stay tuned for updates!
            </p>
            <button
              onClick={() => setActiveTab('events')}
              className="bg-[#4D55CC] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90"
            >
              Browse Events Instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

