import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';

export default function RecentlyViewed() {
  // This would typically fetch from localStorage or API
  const [recentItems, setRecentItems] = useState([]);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      try {
        setRecentItems(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing recently viewed:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] text-white pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/account" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="text-3xl font-bold mb-2">Recently Viewed</h1>
          <p className="text-white/80">Your browsing history</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {recentItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No recent views</h3>
            <p className="text-gray-500">Start browsing artists to see them here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

