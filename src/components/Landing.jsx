import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";

export default function ComingSoon() {
  const launchDate = new Date("2026-01-10T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-purple-50 to-purple-100 flex flex-col items-center overflow-hidden">

      {/* Soft animated glow behind hero */}
      <div className="absolute -z-10 w-[700px] h-[700px] bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse top-20 left-1/2 -translate-x-1/2" />

      {/* Same-colored Waves */}
      <div className="absolute w-full h-96 top-0 -z-20 overflow-hidden">
        <div className="absolute w-[200%] h-96 bg-purple-200 opacity-20 rounded-full animate-[wave_20s_linear_infinite]"></div>
        <div className="absolute w-[200%] h-96 bg-purple-200 opacity-15 rounded-full top-10 animate-[wave_25s_linear_infinite]"></div>
        <div className="absolute w-[200%] h-96 bg-purple-200 opacity-10 rounded-full top-20 animate-[wave_30s_linear_infinite]"></div>
      </div>

      {/* Floating Glowing Orbs */}
      <div className="absolute w-6 h-6 bg-purple-400 rounded-full blur-2xl opacity-40 animate-[float_6s_ease-in-out_infinite] top-32 left-20"></div>
      <div className="absolute w-10 h-10 bg-purple-400 rounded-full blur-3xl opacity-30 animate-[float_8s_ease-in-out_infinite] top-64 right-32"></div>
      <div className="absolute w-8 h-8 bg-purple-400 rounded-full blur-2xl opacity-35 animate-[float_10s_ease-in-out_infinite] bottom-32 left-1/3"></div>

      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-6 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-purple-800 mb-4 animate-pulse">
          Gigzi is Launching Soon 🚀
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-10">
          Until launch, we’re working offline — join our waitlist to get notified when we go live!
        </p>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-5 mb-12">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div
              key={key}
              className="bg-white shadow-lg rounded-2xl px-6 py-5 w-24 md:w-28 hover:scale-105 transform transition"
            >
              <p className="text-4xl font-bold text-purple-700">{value}</p>
              <p className="text-xs uppercase text-gray-600 mt-1">{key}</p>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <form className="flex flex-col md:flex-row gap-3 justify-center mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-purple-300 rounded-xl px-4 py-3 w-72 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition transform hover:scale-105">
            Notify Me
          </button>
        </form>

        {/* Register as Artist Button */}
        <Link
          to="/register"
          className="mt-6 inline-block bg-purple-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-800 transition transform hover:scale-105"
        >
          Register as Artist
        </Link>
      </section>

      {/* SNEAK PEEK SECTION */}
      <section className="bg-white/60 backdrop-blur-sm py-20 w-full text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-10">
          What’s Coming with Gigzi ✨
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            ["🎤 Artist Discovery", "Find and book verified performers effortlessly."],
            ["🎉 Event Management", "Simplify bookings and schedules for smooth experiences."],
            ["💡 Smart Platform", "Tech-first approach connecting artists and organizers."]
          ].map(([title, desc]) => (
            <div
              key={title}
              className="p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-2">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-gradient-to-t from-purple-100 via-white to-white w-full text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-10">What People Say 💬</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto px-6">
          {[
            ["“Gigzi is changing how artists connect with events — can’t wait for launch!”", "– Early User"],
            ["“The UI looks clean and intuitive. Excited to explore more!”", "– Beta Tester"],
            ["“Finally, a platform that supports independent creators.”", "– Artist"]
          ].map(([quote, author]) => (
            <div
              key={author}
              className="bg-white shadow-md rounded-2xl p-6 max-w-sm hover:shadow-xl transition transform hover:scale-105"
            >
              <p className="text-gray-700 italic">{quote}</p>
              <p className="text-purple-700 mt-3 font-semibold">{author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL LINKS + FOOTER */}
      <footer className="py-12 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://instagram.com/gigzii_official"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-900 text-2xl transition transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/company/gigzii"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-900 text-2xl transition transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.gigzi.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-900 text-2xl transition transform hover:scale-110"
          >
            <FaGlobe />
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Gigzi. All rights reserved.
        </p>
      </footer>

      {/* Tailwind keyframes */}
      <style>
        {`
          @keyframes wave {
            0% { transform: translateX(0) }
            50% { transform: translateX(-25%) }
            100% { transform: translateX(0) }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) }
            50% { transform: translateY(-20px) }
          }
        `}
      </style>
    </div>
  );
}
