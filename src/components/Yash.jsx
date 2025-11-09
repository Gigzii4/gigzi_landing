import React from "react";
import { Heart, Moon, Sparkles } from "lucide-react";
import rakgina from ".././assets/yash.jpg"; // 🩷 Replace this with her actual image path

const GoodNightRakgina = () => {
  const dialogues = [
    { text: "You’re my peace 🌙", color: "from-pink-400 to-rose-500" },
    { text: "Crazy girl 💕", color: "from-purple-400 to-fuchsia-500" },
    { text: "My favorite chaos 😍", color: "from-red-400 to-pink-500" },
    { text: "Good night, sunshine ☀️", color: "from-yellow-400 to-orange-500" },
    { text: "Dream of us 💭", color: "from-indigo-400 to-blue-500" },
    { text: "Forever mine 💫", color: "from-teal-400 to-emerald-500" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 text-center p-6 overflow-hidden font-[Poppins] text-white">
      
      {/* Floating Emoji Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-40 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 10}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            {["💖", "🌙", "✨", "💫"][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      {/* Floating Dialogues */}
      <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-2xl z-10">
        {dialogues.map((d, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-full bg-gradient-to-r ${d.color} text-white font-semibold shadow-lg animate-bounce`}
            style={{
              animationDelay: `${i * 0.3}s`,
            }}
          >
            “{d.text}”
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 max-w-lg border border-white/20 z-10 mt-10">
        {/* Her Image */}
        <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg shadow-pink-500/50 animate-[pulse_3s_ease-in-out_infinite]">
          <img
            src={rakgina}
            alt="Rakgina"
            className="w-full h-full object-cover"
          />
          {/* Glowing Aura */}
          <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-2xl animate-pulse"></div>
        </div>

        {/* Nicknames */}
        <div className="text-lg text-pink-200 font-semibold mb-6 tracking-wide animate-pulse">
          My Cheesecake 🍰 · My Pillu 🐣 · My Baby 💞
        </div>

        <h1 className="text-5xl font-extrabold text-pink-300 mb-4 drop-shadow-lg animate-pulse">
          Good Morning, Rak 💖
        </h1>

        <p className="text-lg text-gray-200 leading-relaxed mb-4">
          Another day may end, but thoughts of you never do 🌙.  
          You make even the simplest moments feel magical ✨
        </p>

        <p className="text-gray-300 mb-4 leading-relaxed">
          Close your eyes and drift into sweet dreams, knowing someone out here
          is smiling just thinking of you 💭💫
        </p>

        <p className="text-gray-300 mb-4 leading-relaxed">
          Sleep peacefully, my favorite person.  
          Tomorrow’s another day to annoy each other lovingly 😜
        </p>

        <div className="mt-8 flex justify-center items-center gap-4 text-pink-300">
          <Moon className="animate-bounce" size={28} />
          <Heart className="animate-bounce" size={28} />
          <Sparkles className="animate-bounce" size={28} />
        </div>

        <p className="mt-6 text-lg font-semibold text-gray-200 italic">
          — Yours always, Yash 💞
        </p>
      </div>

      <footer className="mt-10 text-sm text-gray-300 opacity-80 z-10 italic">
       YASH 
      </footer>
    </div>
  );
};

export default GoodNightRakgina;
