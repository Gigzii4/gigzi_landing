import { useNavigate } from 'react-router-dom';
import { Users, Brush, ArrowRight, Star } from 'lucide-react';

export default function PreAuth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021d5c] via-[#06328c] to-[#4D55CC] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-3">Welcome to Gigzi</h1>
          <p className="text-white/90 text-lg">Choose how you want to get started</p>
        </div>

        {/* Hire Artist Button */}
        <button
          onClick={() => navigate('/signup')}
          className="w-full mb-5 bg-gradient-to-r from-[#021d5c] via-[#06328c] to-[#4D55CC] text-white rounded-full p-6 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mr-4 border-2 border-white/30">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1">Hire Artist</h3>
                <p className="text-white/80 text-sm">Find and book artists for your events</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </button>

        {/* Be Artist Button */}
        <button
          onClick={() => navigate('/artist/signup')}
          className="w-full mb-6 bg-white text-[#4D55CC] rounded-full p-6 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 border-3 border-[#4D55CC] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[#4D55CC]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-[#4D55CC] rounded-full flex items-center justify-center mr-4 shadow-lg">
                <Brush className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold mb-1 text-[#4D55CC]">Be Artist</h3>
                <p className="text-[#6366F1] text-sm">Join as an artist and get bookings</p>
              </div>
            </div>
            <Star className="w-6 h-6 text-[#4D55CC]" />
          </div>
        </button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-white/90 mb-2">Already have an account?</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="text-white font-semibold hover:underline"
            >
              User Login
            </button>
            <span className="text-white/50">|</span>
            <button
              onClick={() => navigate('/artist/login')}
              className="text-white font-semibold hover:underline"
            >
              Artist Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

