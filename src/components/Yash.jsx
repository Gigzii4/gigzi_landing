import React from "react";

const ComebackPlan = () => {
  const goals = [
    "Crack DSA fundamentals and problem-solving",
    "Master SQL + Development + Machine Coding + System Design",
    "Finish all core CS subjects strongly",
    "Build real projects that show depth",
    "Stay distraction-free, mentally stable, and consistent",
    "Maintain relationship with balance",
    "Become disciplined: mind > emotions",
  ];

  const principles = [
    "Sit at desk → brain switches to study mode instantly",
    "Focus on one task → no multitasking",
    "Be busy so you don't overthink",
    "Consistency beats motivation",
    "Short breaks, never long distractions",
    "Only productive conversations",
    "Respect time blocks",
    "Never skip: DSA + Dev (at least 1 hour)",
    "Daily 20–25 min walk = mental reset",
    "Keep room clean = mind clean",
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-[Poppins] p-6 flex justify-center items-center">
      
      <div className="max-w-3xl w-full bg-[#0b0b0f] border border-[#27272f] p-8 rounded-2xl shadow-[0_0_25px_2px_#00f6ff30] backdrop-blur-xl relative overflow-hidden">

        {/* Neon glow rings */}
        <div className="absolute -top-20 -left-10 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>

        {/* ULTIMATE GOAL */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-300 drop-shadow-[0_0_10px_#00eaff] text-center">
          ULTIMATE GOAL
        </h1>
        <p className="text-center text-xl text-gray-300 mt-2 tracking-wide">
          TOP PLACEMENT · HIGH-PAYING SDE ROLE 
          Yash AGhane Plan it is 
        </p>

        {/* Divider */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-6"></div>

        {/* GOALS */}
        <h2 className="text-2xl font-semibold text-purple-300 drop-shadow-[0_0_8px_#b855ff] mb-3">
          🎯 GOALS
        </h2>
        <ul className="space-y-3 text-gray-200 text-lg">
          {goals.map((g, i) => (
            <li key={i} className="hover:text-cyan-300 transition">
              • {g}
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent my-6"></div>

        {/* DAILY PRINCIPLES */}
        <h2 className="text-2xl font-semibold text-cyan-300 drop-shadow-[0_0_8px_#00eaff] mb-3">
          ⚡ DAILY PRINCIPLES (Rulebook)
        </h2>
        <ul className="space-y-3 text-gray-200 text-lg">
          {principles.map((p, i) => (
            <li key={i} className="hover:text-purple-300 transition">
              • {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComebackPlan;
