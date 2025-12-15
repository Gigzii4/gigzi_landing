import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaInstagram, FaLinkedin, FaGlobe, FaCheckCircle, FaStar, FaUsers, 
  FaCalendarAlt, FaRocket, FaShieldAlt, FaClock, FaHeadset, FaAward,
  FaMobileAlt, FaCreditCard, FaChartLine, FaBell, FaSearch, FaHandshake,
  FaQuestionCircle, FaChevronDown, FaChevronUp, FaChevronRight, FaCheck, FaTimes
} from "react-icons/fa";
import { HiSparkles, HiLightningBolt, HiTrendingUp } from "react-icons/hi";

export default function ComingSoon() {
  const launchDate = new Date("2026-01-10T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

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
    
    // Simulate API call - Replace with actual backend integration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

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

      <section className="pt-32 pb-24 px-6 text-center text-white">
        <h1 className="text-4xl md:text-7xl font-extrabold mb-4 animate-pulse">
          Gigzi is Launching Soon 🚀
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/80">
          Until launch, we’re working offline — join our waitlist to get notified when we go live!
        </p>

        {/* Enhanced Countdown */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div
              key={key}
              className="bg-white/25 backdrop-blur-xl shadow-2xl rounded-2xl px-6 py-6 w-24 md:w-32 hover:scale-110 transform transition-all duration-300 border border-white/30 hover:border-white/50"
            >
              <p className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
                {String(value).padStart(2, '0')}
              </p>
              <p className="text-xs md:text-sm uppercase text-white/90 font-semibold tracking-wider">
                {key}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced Email Form */}
        <div className="max-w-md mx-auto mb-8">
          {isSubmitted ? (
            <div className="bg-green-500/90 backdrop-blur-lg text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
              <FaCheckCircle className="text-2xl" />
              <p className="font-semibold">Thank you! We'll notify you when we launch.</p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="Enter your email address"
                  className={`w-full border-2 rounded-xl px-5 py-4 focus:outline-none focus:ring-4 transition-all bg-white/15 backdrop-blur-lg text-white placeholder-white/70 ${
                    emailError
                      ? "border-red-400 focus:ring-red-400/50"
                      : "border-white/40 focus:ring-white/60 focus:border-white/60"
                  }`}
                />
                {emailError && (
                  <p className="text-red-300 text-sm mt-2 text-left ml-1">{emailError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <FaRocket className="text-sm" />
                    <span>Join Waitlist</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            to="/register"
            className="group bg-white/20 backdrop-blur-xl text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all transform hover:scale-105 shadow-xl border-2 border-white/30 hover:border-white/50 flex items-center gap-2 min-w-[200px] justify-center"
          >
            <FaUsers className="text-lg" />
            <span>Register as Artist</span>
          </Link>

          <a
            href="https://play.google.com/store/apps/details?id=com.yash2121.gigzi&hl=en-US&ah=CsEEvfm8Pyh0QgjLYmveiw-mvwc&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:scale-105 transition-transform"
          >
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-2 border-2 border-white/30 hover:border-white/50 shadow-xl">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-12 md:h-16"
              />
            </div>
          </a>
        </div>

        {/* Social Proof */}
        <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <FaUsers className="text-xl" />
            <span className="font-semibold">10K+</span>
            <span className="text-sm">Waitlist Members</span>
          </div>
          <div className="h-6 w-px bg-white/30"></div>
          <div className="flex items-center gap-2">
            <FaStar className="text-xl text-yellow-300" />
            <span className="font-semibold">4.8</span>
            <span className="text-sm">Rating</span>
          </div>
        </div>
      </section>

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

      <section className="py-20 bg-gradient-to-t from-purple-100 via-white to-white w-full text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-10">What People Say 💬</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto px-6">
          {[
            ["“Gigzi is changing how artists connect with events — can’t wait for launch!”", "– Early User"],
            ["“The UI looks clean and7 intuitive. Excited to explore more!”", "– Beta Tester"],
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

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-purple-50 to-white w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              📊 Platform Stats
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join a Growing Community
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Thousands of artists and event organizers trust Gigzi
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: FaUsers, number: "10K+", label: "Waitlist Members", color: "from-blue-500 to-cyan-500" },
              { icon: FaAward, number: "500+", label: "Verified Artists", color: "from-purple-500 to-pink-500" },
              { icon: FaCalendarAlt, number: "2K+", label: "Events Booked", color: "from-pink-500 to-orange-500" },
              { icon: FaStar, number: "4.8", label: "Average Rating", color: "from-orange-500 to-yellow-500" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-2xl" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-white w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              🚀 How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Simple. Fast. Reliable.
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get started in just a few easy steps
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Sign Up", desc: "Create your account in seconds. Choose to be an artist or event organizer.", icon: FaUsers },
              { step: "02", title: "Browse & Discover", desc: "Explore verified artists, view portfolios, and check availability.", icon: FaSearch },
              { step: "03", title: "Book & Pay", desc: "Select your preferred slot, add details, and complete secure payment.", icon: FaCreditCard },
              { step: "04", title: "Enjoy Event", desc: "Attend your event and leave reviews. Manage everything from one place.", icon: FaHandshake },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                  <div className="text-6xl font-extrabold text-purple-100 mb-4">{item.step}</div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-6">
                    <item.icon className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <FaChevronRight className="text-white text-sm" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-purple-50 to-white w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              ✨ Why Choose Gigzi
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Built for Artists & Organizers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need in one powerful platform
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* For Artists */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-purple-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <FaRocket className="text-2xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">For Artists</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Showcase your portfolio and talent",
                  "Get discovered by event organizers",
                  "Manage bookings and schedules easily",
                  "Secure payments and transparent pricing",
                  "Build your reputation with reviews",
                  "Access analytics and insights",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* For Organizers */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border-2 border-pink-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white">
                  <FaCalendarAlt className="text-2xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">For Organizers</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Discover verified artists instantly",
                  "Compare portfolios and pricing",
                  "Book with secure payment system",
                  "Manage multiple events efficiently",
                  "Real-time availability tracking",
                  "24/7 customer support",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-white w-full">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              ❓ Frequently Asked Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Got Questions?
            </h2>
            <p className="text-gray-600 text-lg">
              We've got answers to help you get started
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "When will Gigzi launch?",
                answer: "We're working hard to launch Gigzi in early 2026. Join our waitlist to be notified as soon as we go live!"
              },
              {
                question: "Is it free to join the waitlist?",
                answer: "Yes, absolutely! Joining our waitlist is completely free. You'll get early access and exclusive updates."
              },
              {
                question: "How do I register as an artist?",
                answer: "Click the 'Register as Artist' button above, or wait for launch when we'll have a full registration process with portfolio uploads and verification."
              },
              {
                question: "What types of events can I book artists for?",
                answer: "Gigzi supports a wide range of events including weddings, corporate events, parties, concerts, festivals, and more. Our platform connects you with artists for any occasion."
              },
              {
                question: "How does payment work?",
                answer: "We use secure payment gateways to process all transactions. Payments are held securely until the event is completed, ensuring both artists and organizers are protected."
              },
              {
                question: "Can I use Gigzi on mobile?",
                answer: "Yes! Gigzi will be available as a mobile app on both iOS and Android. You can also access it through any web browser on your mobile device."
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-300 transition-all shadow-md hover:shadow-lg"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <FaChevronUp className="text-purple-600 flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-purple-600 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-5 animate-fade-in">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-purple-50 to-white w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              🔒 Trust & Security
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Security is Our Priority
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FaShieldAlt, title: "Secure Payments", desc: "Bank-level encryption for all transactions" },
              { icon: FaCheckCircle, title: "Verified Artists", desc: "All artists go through verification process" },
              { icon: FaHeadset, title: "24/7 Support", desc: "Round-the-clock customer assistance" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mx-auto mb-6">
                  <item.icon className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 md:py-16 text-center text-white relative z-10 bg-gradient-to-t from-black/20 to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <p className="text-white/80 mb-6">Follow us for updates and announcements</p>
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://instagram.com/gigzii_official"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-14 h-14 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-pink-500 transition-all transform hover:scale-110 border-2 border-white/30 hover:border-pink-400"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl group-hover:text-white" />
              </a>
              <a
                href="https://linkedin.com/company/gigzii"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-14 h-14 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-blue-500 transition-all transform hover:scale-110 border-2 border-white/30 hover:border-blue-400"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-2xl group-hover:text-white" />
              </a>
              <a
                href="https://www.gigzi.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-14 h-14 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-purple-500 transition-all transform hover:scale-110 border-2 border-white/30 hover:border-purple-400"
                aria-label="Website"
              >
                <FaGlobe className="text-2xl group-hover:text-white" />
              </a>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8">
            <p className="text-white/70 text-sm mb-2">
              © {new Date().getFullYear()} Gigzi. All rights reserved.
            </p>
            <p className="text-white/60 text-xs">
              Registration: UDYAM-MH-18-0478176 | Email: official@gigzi.in
            </p>
          </div>
        </div>
      </footer>

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

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

