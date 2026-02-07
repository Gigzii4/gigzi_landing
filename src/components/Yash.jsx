import React from "react";
import roseImg from "../assets/rose.jpeg";
import memoryImg from "../assets/memory.jpeg";

const BirthdayComebackPlan = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center font-[Poppins] overflow-hidden bg-black">

      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-rose-500/20 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-pink-500/20 rounded-full blur-[180px]"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 max-w-md w-full bg-[#0b0b12]/90 border border-[#2a2a35] rounded-3xl p-10 backdrop-blur-2xl shadow-[0_0_80px_12px_#ff4d6d30]">

        {/* IMAGE STACK */}
        <div className="relative flex justify-center mb-8 h-[22rem]">

          {/* MEMORY IMAGE */}
          <img
            src={memoryImg}
            alt="Memory"
            className="absolute w-52 h-72 object-cover rounded-2xl
                       grayscale
                       border border-white/10
                       shadow-[0_0_40px_#ffffff20]
                       animate-memorySwap"
          />

          {/* ROSE IMAGE */}
          <img
            src={roseImg}
            alt="Rose"
            className="absolute w-52 h-72 object-cover rounded-2xl
                       border border-rose-400/50
                       shadow-[0_0_50px_#ff6b81]
                       animate-roseSwap"
          />

          {/* GLOW */}
          <div className="absolute w-56 h-80 rounded-2xl bg-rose-500/20 blur-[70px]"></div>
        </div>

        {/* TEXT */}
        <h1 className="text-2xl font-semibold text-center text-rose-300 drop-shadow-[0_0_12px_#ff6b81]">
          Happy Rose Day 🌹
        </h1>

        <p className="text-center text-gray-300 mt-4 leading-relaxed">
          Some memories don’t need explanations.
          <br />
          They just exist — quietly.
        </p>

        <p className="text-center mt-7 text-rose-300 font-medium tracking-wide">
          — For Rutu
        </p>

        <p className="text-center text-xs text-gray-500 mt-3 tracking-widest">
          CALM · HONEST · REAL
        </p>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
        @keyframes roseSwap {
          0% {
            transform: rotate(3deg) translate(20px, 0) scale(1);
            z-index: 2;
          }
          45% {
            transform: rotate(-2deg) translate(30px, -6px) scale(1.05);
            z-index: 2;
          }
          50% {
            z-index: 1;
          }
          100% {
            transform: rotate(3deg) translate(20px, 0) scale(1);
            z-index: 1;
          }
        }

        @keyframes memorySwap {
          0% {
            transform: rotate(-6deg) translate(-20px, 0) scale(1);
            z-index: 1;
          }
          45% {
            transform: rotate(-10deg) translate(-30px, 6px) scale(1);
            z-index: 1;
          }
          50% {
            z-index: 2;
            transform: rotate(-8deg) translate(-10px, -6px) scale(1.06);
          }
          100% {
            transform: rotate(-6deg) translate(-20px, 0) scale(1);
            z-index: 2;
          }
        }

        /* 🔥 5 SECOND DURATION */
        .animate-roseSwap {
          animation: roseSwap 5s ease-in-out infinite;
        }

        .animate-memorySwap {
          animation: memorySwap 5s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
};

export default BirthdayComebackPlan;
