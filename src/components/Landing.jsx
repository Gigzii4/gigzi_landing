import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaInstagram, FaLinkedin, FaGlobe, FaCheckCircle, FaStar, FaUsers, 
  FaCalendarAlt, FaRocket, FaShieldAlt, FaHeadset, FaAward,
  FaCreditCard, FaSearch, FaHandshake,
  FaChevronDown, FaChevronUp, FaChevronRight
} from "react-icons/fa";

export default function ComingSoon() {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!email) {
      setEmailError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  useEffect(() => {
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
        dx: (Math.random() - 0.5),
        dy: (Math.random() - 0.5),
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function update() {
      particles.forEach(p => {
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

      {/* Background */}
      <div className="absolute inset-0 -z-30 animate-gradient bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"></div>

      {/* Particles */}
      <canvas id="particles" className="absolute inset-0 -z-20"></canvas>

      {/* NAVBAR */}
      <nav className="w-full z-50 pt-6 pb-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            Gigzi
          </Link>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-20 pb-24 px-6 text-center text-white">

        <h1 className="text-4xl md:text-7xl font-extrabold mb-6">
          Gigzi is Live 🚀
        </h1>

        <p className="text-lg md:text-xl mb-10 text-white/80">
          Discover and book amazing artists for your events.  
          Download the Gigzi app now!
        </p>

        {/* PLAY STORE BUTTON */}
        <a
          href="https://play.google.com/store/apps/details?id=com.yash2121.gigzi"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-105 transition-transform"
        >
          <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3 border-2 border-white/30 shadow-xl inline-block">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-16"
            />
          </div>
        </a>

        {/* SOCIAL PROOF */}
        {/* <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <FaUsers />
            <span className="font-semibold">10K+</span>
            <span className="text-sm">Users</span>
          </div>

          <div className="h-6 w-px bg-white/30"></div>

          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-300"/>
            <span className="font-semibold">4.8</span>
            <span className="text-sm">Rating</span>
          </div>
        </div> */}

      </section>

      {/* FEATURES */}
      <section className="bg-white py-20 w-full text-purple-900">
        <h2 className="text-3xl font-bold mb-10">What’s Coming with Gigzi</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

          <div className="p-6 bg-white shadow-md rounded-2xl">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              🎤 Artist Discovery
            </h3>
            <p className="text-gray-700">
              Find and book verified performers effortlessly.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              🎉 Event Management
            </h3>
            <p className="text-gray-700">
              Manage bookings and schedules easily.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-2xl">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
              💡 Smart Platform
            </h3>
            <p className="text-gray-700">
              Connecting artists and organizers with technology.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-white">

        <div className="flex justify-center gap-6 mb-6">

          <a
            href="https://instagram.com/gigzii_official"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={28}/>
          </a>

          <a
            href="https://linkedin.com/company/gigzii"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={28}/>
          </a>

          <a
            href="https://www.gigzi.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe size={28}/>
          </a>

        </div>

        <p className="text-white/70 text-sm">
          © {new Date().getFullYear()} Gigzi. All rights reserved.
        </p>

        <p className="text-white/60 text-xs mt-2">
          Registration: UDYAM-MH-18-0478176 | Email: official@gigzi.in
        </p>

      </footer>

      <style>{`

      .animate-gradient{
        background-size:400% 400%;
        animation:gradientMove 15s ease infinite;
      }

      @keyframes gradientMove{
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
      }

      `}</style>

    </div>
  );
}