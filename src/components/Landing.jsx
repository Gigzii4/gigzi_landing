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

  useEffect(() => {
    // ✨ Particles animation setup
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function update() {
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
      });
    }

    function loop() {
      draw();
      update();
      requestAnimationFrame(loop);
    }

    loop();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden text-center text-gray-800">
      {/* 🌈 Live Gradient Background */}
      <div className="absolute inset-0 -z-30 animate-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"></div>

      {/* ✨ Floating Particles */}
      <canvas id="particles" className="absolute inset-0 -z-20"></canvas>

      {/* 🌊 Soft Waves */}
      <div className="absolute top-0 left-0 right-0 -z-10 opacity-20 overflow-hidden">
        <div className="absolute w-[200%] h-96 bg-white/20 rounded-full animate-[wave_20s_linear_infinite]"></div>
        <div className="absolute w-[200%] h-96 bg-white/15 rounded-full top-10 animate-[wave_25s_linear_infinite]"></div>
        <div className="absolute w-[200%] h-96 bg-white/10 rounded-full top-20 animate-[wave_30s_linear_infinite]"></div>
      </div>

      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-6 text-center text-white">
        <h1 className="text-4xl md:text-7xl font-extrabold mb-4 animate-pulse">
          Gigzi is Launching Soon 🚀
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/80">
          Until launch, we’re working offline — join our waitlist to get notified when we go live!
        </p>

        {/* Countdown */}
        <div className="flex flex-wrap justify-center gap-3  md:gap-5 mb-12">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div
              key={key}
              className="bg-white/20 shadow-lg rounded-2xl px-6 py-5 w-20 md:w-28 hover:scale-105 transform transition backdrop-blur-lg"
            >
              <p className="text-4xl font-bold text-white">{value}</p>
              <p className="text-xs uppercase text-white/80 mt-1">{key}</p>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <form className="flex flex-col md:flex-row gap-3 justify-center mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-white/40 rounded-xl px-4 py-3 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-white/60 bg-white/10 text-white placeholder-white/70"
          />
          <button className="bg-white text-purple-700 px-6 py-3 rounded-xl hover:bg-gray-100 transition transform hover:scale-105">
            Notify Me
          </button>
        </form>

        {/* Register + Play Store Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
          <Link
            to="/register"
            className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105"
          >
            Register as Artist
          </Link>

          {/* Play Store Badge */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-14 md:h-16 hover:scale-105 transition transform"
            />
          </a>
        </div>
      </section>

      {/* SNEAK PEEK SECTION */}
      <section className="bg-white/70 backdrop-blur-md py-20 w-full text-center text-purple-900">
        <h2 className="text-3xl font-bold mb-10">What’s Coming with Gigzi ✨</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            ["🎤 Artist Discovery", "Find and book verified performers effortlessly."],
            ["🎉 Event Management", "Simplify bookings and schedules for smooth experiences."],
            ["💡 Smart Platform", "Tech-first approach connecting artists and organizers."],
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
            ["“Finally, a platform that supports independent creators.”", "– Artist"],
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

      {/* FOOTER */}
      <footer className="py-12 text-center text-white">
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://instagram.com/gigzii_official"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 text-2xl transition transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/company/gigzii"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 text-2xl transition transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.gigzi.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 text-2xl transition transform hover:scale-110"
          >
            <FaGlobe />
          </a>
        </div>
        <p className="text-white/70 text-sm">
          © {new Date().getFullYear()} Gigzi. All rights reserved.
        </p>
      </footer>

      {/* ANIMATIONS */}
      <style>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes wave {
          0% { transform: translateX(0) }
          50% { transform: translateX(-25%) }
          100% { transform: translateX(0) }
        }
      `}</style>
    </div>
  );
}
