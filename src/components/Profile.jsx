import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ArtistProfile = () => {
  const { id } = useParams();

  const artist = {
    name: "Riya Kapoor",
    genre: ["DJ / EDM Artist", "Music Producer"],
    categories: ["DJ", "Singing", "Tattoo Art"],
    address: "32/B Carter Road, Kalyani Nagar, Pune, India",
    city: "Pune, Maharashtra",
    bio: "Riya Kapoor is an award-winning DJ and music producer blending Indian classical vibes with modern EDM. She’s performed at 100+ national stages including Sunburn Goa, NH7 Weekender, and Mood Indigo.",
    banner:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&q=80&w=1500",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=900",
    followers: "15.8k",
    shows: 102,
    rating: 4.9,
    socials: {
      instagram: "https://instagram.com/riyakapoor",
      spotify: "https://spotify.com/",
      youtube: "https://youtube.com/",
    },
    portfolio: [
      "https://source.unsplash.com/900x600/?dj,concert,1",
      "https://source.unsplash.com/900x600/?artist,lights,2",
      "https://source.unsplash.com/900x600/?music,stage,3",
      "https://source.unsplash.com/900x600/?party,dj,4",
      "https://source.unsplash.com/900x600/?tattoo,artist,5",
    ],
    events: [
      { name: "Sunburn Goa", date: "Dec 2024", location: "Goa" },
      { name: "NH7 Weekender", date: "Oct 2024", location: "Pune" },
      { name: "Mood Indigo", date: "Jan 2025", location: "Mumbai" },
    ],
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* 🌈 Animated Magenta Gradient Background */}
      <div className="absolute inset-0 -z-30 animate-gradient bg-gradient-to-r from-pink-600 via-purple-700 to-fuchsia-600"></div>

      {/* 🖼️ HERO SECTION */}
      <section
        className="relative h-[60vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${artist.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <img
            src={artist.image}
            alt={artist.name}
            className="w-44 h-44 rounded-full object-cover border-4 border-pink-400 shadow-[0_0_30px_#ff4fc4] mx-auto mb-5"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold text-pink-300 drop-shadow-lg">
            {artist.name}
          </h1>
          <p className="text-lg text-pink-100 mt-2">{artist.genre.join(" • ")}</p>
          <p className="text-pink-200 flex justify-center items-center gap-2 mt-2">
            <FaMapMarkerAlt /> {artist.city}
          </p>
        </motion.div>
      </section>

      {/* 💫 STATS SECTION */}
      <section className="py-10 bg-white/10 backdrop-blur-md flex justify-center gap-12 flex-wrap text-center shadow-inner">
        {[
          ["Followers", artist.followers],
          ["Shows", artist.shows],
          ["Rating", `${artist.rating} ⭐`],
        ].map(([label, value]) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            key={label}
            className="p-4 rounded-2xl bg-pink-600/20 border border-pink-400/30 shadow-lg w-40"
          >
            <p className="text-3xl font-bold text-pink-200">{value}</p>
            <p className="uppercase text-xs tracking-wide text-pink-300 mt-1">
              {label}
            </p>
          </motion.div>
        ))}
      </section>

      {/* 💖 ABOUT SECTION */}
      <section className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-pink-300 mb-6">
          About {artist.name}
        </h2>
        <p className="text-pink-100 text-lg leading-relaxed mb-6">{artist.bio}</p>
        <p className="flex justify-center items-center text-pink-200 gap-2 mb-3">
          <FaMapMarkerAlt /> {artist.address}
        </p>

        {/* 🧿 Categories */}
        <div className="flex flex-wrap justify-center gap-3">
          {artist.categories.map((cat) => (
            <span
              key={cat}
              className="bg-pink-500/30 border border-pink-300 px-4 py-2 rounded-full text-sm text-pink-100 backdrop-blur-md hover:bg-pink-500/40 transition"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* 🎞️ PORTFOLIO */}
      <section className="py-16 bg-pink-500/10 backdrop-blur-lg text-center">
        <h2 className="text-3xl font-bold mb-10 text-pink-300">
          Portfolio & Highlights ✨
        </h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {artist.portfolio.map((url, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06 }}
              className="rounded-2xl overflow-hidden shadow-[0_0_20px_#ff58d6]"
            >
              <img
                src={url}
                alt={`Portfolio ${i + 1}`}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎉 PAST EVENTS */}
      <section className="py-16 bg-gradient-to-t from-pink-700/30 to-transparent text-center">
        <h2 className="text-3xl font-bold mb-8 text-pink-300">Past Events 💫</h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {artist.events.map((e, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-pink-500/20 rounded-2xl p-5 border border-pink-400/30 shadow-[0_0_15px_#ff4fc4]"
            >
              <p className="font-bold text-lg mb-1 text-pink-100">{e.name}</p>
              <p className="text-pink-200 flex items-center gap-2 text-sm mb-1">
                <FaCalendarAlt /> {e.date}
              </p>
              <p className="text-pink-300 flex items-center gap-2 text-sm">
                <FaMapMarkerAlt /> {e.location}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🌟 REVIEWS */}
      <section className="py-16 bg-pink-600/20 backdrop-blur-lg text-center">
        <h2 className="text-3xl font-bold mb-8 text-pink-300">Fan Reviews 🌸</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-6">
          {[1, 2].map((r) => (
            <div
              key={r}
              className="bg-pink-600/20 border border-pink-400/40 rounded-2xl p-6 shadow-[0_0_15px_#ff4fc4]"
            >
              <div className="flex items-center gap-1 text-yellow-300 mb-3 justify-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-pink-100 italic">
                “Riya’s energy on stage is magical — her music connects instantly with the crowd. A powerhouse performer!”
              </p>
              <p className="mt-3 text-pink-200 text-sm">– Event Organizer, Mumbai</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔗 SOCIALS */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-pink-300">
          Connect with {artist.name}
        </h2>
        <div className="flex justify-center gap-8 text-3xl">
          <a
            href={artist.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition transform hover:scale-125"
          >
            <FaInstagram />
          </a>
          <a
            href={artist.socials.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition transform hover:scale-125"
          >
            <FaSpotify />
          </a>
          <a
            href={artist.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition transform hover:scale-125"
          >
            <FaYoutube />
          </a>
        </div>
      </section>

      {/* ⚡ FOOTER */}
      <footer className="py-10 text-center text-pink-200 text-sm">
        © {new Date().getFullYear()} Gigzi. All rights reserved.
      </footer>

      {/* 🌈 Animation */}
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
      `}</style>
    </div>
  );
};

export default ArtistProfile;
