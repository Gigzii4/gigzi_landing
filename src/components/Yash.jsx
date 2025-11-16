import React from "react";

const HiiMyBabe = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-rose-900 via-pink-800 to-fuchsia-900 text-white font-[Poppins] text-center overflow-hidden relative">
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 10}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            {["💖", "💫", "✨", "🌙", "💕"][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <h1 className="text-5xl sm:text-6xl font-extrabold text-pink-300 drop-shadow-lg animate-pulse z-10">
        Hii my universe 💞
      </h1>

      <p className="text-2xl sm:text-3xl mt-4 text-pink-200 font-semibold animate-bounce z-10">
       
      </p>

      <p className="text-3xl sm:text-4xl mt-6 text-pink-100 font-bold animate-[pulse_2s_ease-in-out_infinite] z-10">
       💫
      </p>

      <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>

      <footer className="mt-20 text-sm text-gray-300 italic z-10">
        — Yours, Yash 💕
      </footer>
    </div>
  );
};

export default HiiMyBabe;
