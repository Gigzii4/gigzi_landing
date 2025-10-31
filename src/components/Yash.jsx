import React from "react";
import { Heart } from "lucide-react";
import yash from "../assets/yash.jpg";
const Yash = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-rose-200 to-red-100 text-center p-6 overflow-hidden font-[Poppins]">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 opacity-40 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 25 + 10}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Optionally, you can play a soft music */}
      {/* <audio autoPlay loop>
        <source src="/assets/love-song.mp3" type="audio/mp3" />
      </audio> */}

      {/* Main Card */}
      <div className="relative bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-lg border border-white/30 z-10">
        {/* Her Image */}
        <div className="flex justify-center mb-6">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl ring-8 ring-rose-300 animate-pulse">
            <img
              src={yash} // 💡 Replace with her actual image
              alt="Rakgina"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-rose-600 mb-4 drop-shadow-lg animate-pulse">
          To My Sweetest Pillu Cheesecake 💗
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Hey <span className="text-rose-500 font-semibold">Rakgina</span>,  
          this page isn’t just a website — it’s a piece of my heart, wrapped in
          code and colors that remind me of you. You’re the softest thought that
          passes my mind every morning and the calm that ends my nights. 💞
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          You’ve become my favorite story to tell, my reason to smile, and my
          most beautiful coincidence. When I call you my{" "}
          <span className="italic text-rose-500">Pillu Cheesecake</span>, it’s
          not just a nickname — it’s every ounce of sweetness and warmth I feel
          when I think of you. 🧁💖
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          I still remember the first time we met — how everything around us
          faded for a second, and it just felt right. Since then, even your
          simplest smile has had the power to make everything better. ✨
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          You’ve taught me what calm feels like in chaos, what comfort feels
          like in silence, and what happiness feels like in the smallest
          moments. You are, without a doubt, the most precious chapter of my
          life so far. 📖❤️
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          I don’t know what the future holds, but I do know this — no matter
          where life takes us, there’ll always be a corner of my heart that
          belongs only to you. 💌
        </p>

        <div className="mt-6 flex justify-center items-center gap-3 text-rose-600">
          <Heart className="fill-rose-500 animate-pulse" size={28} />
          <span className="text-xl font-semibold tracking-wide">
            Forever Yours — Yash 💫
          </span>
        </div>
      </div>

      <footer className="mt-12 text-sm text-gray-700 opacity-80 z-10 italic">
        Made with infinite ❤️, just for you — my Pillu Cheesecake 🧁
      </footer>
    </div>
  );
};

export default Yash;
