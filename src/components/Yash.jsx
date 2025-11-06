import React from "react";
import { Moon, Coffee, Bed } from "lucide-react";

const ThreeBHK = () => {
  const dialogues = [
    { text: "Crazy naa 🤪", color: "from-pink-400 to-rose-500" },
    { text: "Maycha puccha 😂", color: "from-indigo-400 to-blue-500" },
    { text: "I guess 😏", color: "from-yellow-400 to-orange-500" },
    { text: "Laka 💀", color: "from-green-400 to-emerald-500" },
    { text: "Kai mg 😎", color: "from-purple-400 to-fuchsia-500" },
    { text: "Lexical Analysis 💻", color: "from-red-400 to-pink-500" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 text-center p-6 overflow-hidden font-[Poppins] text-white">
      {/* Floating Emoji Animation */}
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
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 10}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            {["🌙", "⭐", "💤", "☕"][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 max-w-lg border border-white/20 z-10">
        <h1 className="text-5xl font-extrabold text-blue-300 mb-4 drop-shadow-lg animate-pulse">
          Good Night, 3BHK Legends 🌙
        </h1>

        <p className="text-lg text-gray-200 leading-relaxed mb-4">
          Another legendary day of laughter, late-night talks & zero productivity
          comes to an end 😂 Let’s rest our tired hostel souls before another
          round of chaos begins tomorrow.
        </p>

        <p className="text-gray-300 mb-4 leading-relaxed">
          May your dreams be peaceful, your Wi-Fi stay stable, and may the mess
          food tomorrow somehow taste good 🤞🍛
        </p>

        <p className="text-gray-300 mb-4 leading-relaxed">
          From 2 AM maggi sessions to random deep talks — this gang is pure
          gold. Grateful for the madness, legends. Sleep tight, snorers! 💙
        </p>

        <div className="mt-8 flex justify-center items-center gap-4 text-blue-300">
          <Moon className="animate-bounce" size={28} />
          <Coffee className="animate-bounce" size={28} />
          <Bed className="animate-bounce" size={28} />
        </div>

        <p className="mt-6 text-lg font-semibold text-gray-200 italic">
          — Yours truly, the 3BHK fam 💫
        </p>
      </div>

      {/* Dialogues Section */}
      

      <footer className="mt-10 text-sm text-gray-300 opacity-80 z-10 italic">
        Made with ☕, memes & midnight chaos — 3BHK Forever 🚀
      </footer>
    </div>
  );
};

export default ThreeBHK;
