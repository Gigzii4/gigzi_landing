import React from "react";
import roseImg from "../assets/rose.jpeg";
import memoryImg from "../assets/memory.jpeg";

const BirthdayComebackPlan = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-[Poppins]">

      {/* 🌌 NEON BACKGROUND GLOWS */}
      <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-pink-500/30 rounded-full blur-[190px]" />
      <div className="absolute top-1/3 -right-40 w-[34rem] h-[34rem] bg-rose-500/25 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-1/3 w-[32rem] h-[32rem] bg-fuchsia-500/20 rounded-full blur-[170px]" />

      {/* 💎 MAIN GLASS CARD */}
      <div
        className="relative z-10 w-[92%] max-w-md rounded-[2.8rem]
        bg-gradient-to-br from-[#0b0b12]/95 via-[#10101d]/90 to-[#0b0b12]/95
        border border-white/10
        p-10
        backdrop-blur-2xl
        shadow-[0_0_140px_30px_#ff4d6d45]"
      >

        {/* 🖼 IMAGE STACK */}
        <div className="relative flex justify-center mb-10 h-[22rem]">

          {/* MEMORY IMAGE */}
          <img
            src={memoryImg}
            alt="Memory"
            className="absolute w-56 h-72 object-cover rounded-3xl
              grayscale
              border border-white/10
              shadow-[0_0_45px_#ffffff25]
              animate-memorySwap"
          />

          {/* ROSE IMAGE */}
          <img
            src={roseImg}
            alt="Rose"
            className="absolute w-56 h-72 object-cover rounded-3xl
              border border-rose-400/70
              shadow-[0_0_80px_#ff6b81]
              animate-roseSwap"
          />

          {/* NEON IMAGE GLOW */}
          <div className="absolute w-60 h-80 rounded-3xl bg-rose-500/30 blur-[90px]" />
        </div>

        {/* 🌹 HEADING */}
        <h1
          className="text-3xl font-semibold text-center text-rose-300
          drop-shadow-[0_0_22px_#ff6b81]"
        >
          Happy Propose Day 🌹
        </h1>

        {/* 🌫 MAIN MESSAGE */}
        <p className="text-center text-gray-300 mt-5 leading-relaxed text-[15px]">
          I’m not here to rush anything.
          <br />
          Not here to demand answers.
          <br />
          Just here — honestly.
        </p>

        {/* ⭐ BEST LINE */}
        <p
          className="text-center mt-6 text-rose-200 italic text-[15px]
          drop-shadow-[0_0_14px_#ff6b81]"
        >
          “I’m not asking you to choose me today —
          <br />
          I’m choosing to be here, honestly.”
        </p>

        {/* ✨ SIGNATURE */}
        <p className="text-center mt-8 text-rose-200 font-medium tracking-wide leading-relaxed">
          — Kahi bolaychi garaj nahi.
          <br />
          Fakt itkach… mi ikde aahe, My Queen .
        </p>

        {/* 🔖 FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-4 tracking-[0.35em]">
          PATIENCE · RESPECT · REAL
        </p>
      </div>

      {/* 🎞️ ANIMATIONS */}
      <style>
        {`
        @keyframes roseSwap {
          0% {
            transform: rotate(4deg) translate(18px, 0) scale(1);
            z-index: 2;
          }
          45% {
            transform: rotate(-3deg) translate(34px, -8px) scale(1.07);
            z-index: 2;
          }
          50% {
            z-index: 1;
          }
          100% {
            transform: rotate(4deg) translate(18px, 0) scale(1);
            z-index: 1;
          }
        }

        @keyframes memorySwap {
          0% {
            transform: rotate(-8deg) translate(-22px, 0) scale(1);
            z-index: 1;
          }
          45% {
            transform: rotate(-13deg) translate(-36px, 8px) scale(1.05);
            z-index: 1;
          }
          50% {
            z-index: 2;
            transform: rotate(-9deg) translate(-12px, -10px) scale(1.09);
          }
          100% {
            transform: rotate(-8deg) translate(-22px, 0) scale(1);
            z-index: 2;
          }
        }

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
