import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] text-white pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Link to="/account" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h1 className="text-3xl font-bold mb-2">About Us</h1>
          <p className="text-white/80">Learn more about Gigzi</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Gigzi</h2>
          <p className="text-gray-600 mb-4">
            Gigzi is a platform that connects talented artists with clients who need their services for events, 
            celebrations, and special occasions. We make it easy to discover, book, and work with verified artists 
            in your city.
          </p>
          <p className="text-gray-600">
            Our mission is to empower artists and make professional services accessible to everyone, creating 
            memorable experiences for all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <Users className="w-12 h-12 text-[#4D55CC] mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Verified Artists</h3>
            <p className="text-gray-600 text-sm">All artists are verified and professional</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <Target className="w-12 h-12 text-[#4D55CC] mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-sm">Simple and secure booking process</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <Award className="w-12 h-12 text-[#4D55CC] mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Quality Service</h3>
            <p className="text-gray-600 text-sm">Guaranteed satisfaction</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="space-y-3">
            <p className="text-gray-600">
              <strong>Email:</strong> contact@gigzi.com
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> +91 123 456 7890
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> 123 Main Street, City, State - 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

