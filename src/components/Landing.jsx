import React from "react";
import { Link } from "react-router-dom"; // or 'next/link' if using Next.js
import gigziLogo from "../assets/LOGO.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-r from-purple-600 to-pink-500">
        <img
          src={gigziLogo}
          alt="Gigzi Logo"
          className="h-40 w-40 object-contain mb-6"
        />
        <h1 className="text-5xl md:text-6xl font-bold mb-2">Launching Soon</h1>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Gigzi</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-100">
          Book talented artists for your events with ease. Gigzi connects you
          with performers in your city for unforgettable moments.
        </p>
        {/* Link for artists to register */}
        <Link
          to="/register"
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Register as Artist
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-400">
          Why Choose Gigzi?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">
              Verified Artists
            </h3>
            <p className="text-gray-300">
              We verify every artist to ensure quality performances at your
              event.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">
              Easy Booking
            </h3>
            <p className="text-gray-300">
              Find, book, and pay for artists effortlessly through our platform.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">
              Local Talent
            </h3>
            <p className="text-gray-300">
              Browse artists based on your city for convenience and relevance.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-700 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">
          Ready to showcase your talent?
        </h2>
        {/* Link for artists to register */}
        <Link
          to="/register"
          className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Register as Artist
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-black text-gray-400 text-sm space-y-2">
        <div>&copy; {new Date().getFullYear()} Gigzi. All rights reserved.</div>
        <div>
          <Link
            to="/privacy"
            className="text-purple-400 hover:text-purple-300 transition"
          >
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
