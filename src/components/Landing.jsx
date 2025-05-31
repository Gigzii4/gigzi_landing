import React from "react";
import gigziLogo from "../assets/LOGO.png";
const Landing = () => {
  return (
    <div>
      <div>
        <div className="min-h-screen bg-black text-white font-sans">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-500">
            <div className="flex items-center gap-3">
              <img
                src={gigziLogo}
                alt="Gigzi Logo"
                className="h-40 w-40 object-contain"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Launching Soon
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Gigzi</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8">
              Book talented artists for your events with ease. Gigzi connects
              you with performers in your city for unforgettable moments.
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
              Get Started
            </button>
          </section>

          {/* Features Section */}
          <section className="py-20 px-6 bg-gray-900">
            <h2 className="text-4xl font-bold text-center mb-12">
              Why Choose Gigzi?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Verified Artists
                </h3>
                <p>
                  We verify every artist to ensure quality performances at your
                  event.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Easy Booking</h3>
                <p>
                  Find, book, and pay for artists effortlessly through our
                  platform.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Local Talent</h3>
                <p>
                  Browse artists based on your city for convenience and
                  relevance.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 bg-purple-700 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to book your next performer??
            </h2>
            <button className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Explore Artists
            </button>
          </section>

          {/* Footer */}
          <footer className="py-8 text-center bg-black text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Gigzi. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Landing;
