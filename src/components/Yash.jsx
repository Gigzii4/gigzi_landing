import React from "react";

const BirthdayComebackPlan = () => {
  const goals = [
    "Start my 20s with focus, discipline, and clarity",
    "Crack DSA fundamentals and problem-solving",
    "Master SQL + Development + Machine Coding + System Design",
    "Launch Gigzi officially & build powerful AI features",
    "Get top internship → top placement",
    "Balance health, relationship, and personal peace",
    "Become disciplined: mind > emotions",
  ];

  const principles = [
    "Birthday resolution: NO DISTRACTIONS YEAR",
    "Sit at desk → brain switches to study mode instantly",
    "Focus on one task → no multitasking",
    "Be busy so you don’t overthink",
    "Short breaks only, never long distractions",
    "Only productive conversations",
    "Respect time blocks",
    "Never skip: DSA + Dev (at least 1 hour)",
    "20–25 min walk daily = mental reset",
    "Keep room clean → mind automatically becomes clean",
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-[Poppins] p-6 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-[#0b0b0f] border border-[#27272f] p-8 rounded-2xl shadow-[0_0_25px_2px_#ff00ff30] backdrop-blur-xl relative overflow-hidden">

        {/* Neon glow rings */}
        <div className="absolute -top-20 -left-10 w-60 h-60 bg-pink-500/25 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

        {/* Happy Birthday Title */}
        <h1 className="text-4xl font-extrabold text-pink-300 drop-shadow-[0_0_12px_#ff30ff] text-center">
          🎉 HAPPY BIRTHDAY YASH 🎉
        </h1>

        <p className="text-center text-lg text-gray-300 mt-3">
          <span className="text-pink-400 font-semibold">Age 20 — Comeback Era Starts Today</span>
        </p>

        <p className="text-center text-gray-400 mt-1 italic">
          “This year I upgrade my life — mindset, skills, career, everything.”
        </p>

        {/* Divider */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-400 to-transparent my-6"></div>

        {/* Birthday Goals */}
        <h2 className="text-2xl font-semibold text-purple-300 drop-shadow-[0_0_8px_#b855ff] mb-3">
          🎯 Birthday Goals (Age 20)
        </h2>
        <ul className="space-y-3 text-gray-200 text-lg">
          {goals.map((g, i) => (
            <li key={i} className="hover:text-pink-300 transition">• {g}</li>
          ))}
        </ul>

        {/* Divider */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent my-6"></div>

        {/* Birthday Principles */}
        <h2 className="text-2xl font-semibold text-pink-300 drop-shadow-[0_0_8px_#ff50ff] mb-3">
          ⚡ Birthday Year Principles (Age 20 Rulebook)
        </h2>
        <ul className="space-y-3 text-gray-200 text-lg">
          {principles.map((p, i) => (
            <li key={i} className="hover:text-purple-300 transition">• {p}</li>
          ))}
        </ul>

        {/* Footer Quote */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          “This year belongs to me. No excuses, only growth.”
        </p>
      </div>
    </div>
  );
};

export default BirthdayComebackPlan;
