import React, { useState } from "react";
import roseImg from "../assets/rose.jpeg";

const SorryFor = () => {
  const [noPosition, setNoPosition] = useState({ top: "60%", left: "55%" });
  const [accepted, setAccepted] = useState(false);

  const moveNoButton = () => {
    const randomTop = Math.floor(Math.random() * 70);
    const randomLeft = Math.floor(Math.random() * 70);

    setNoPosition({
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      <div className="text-center z-10">
        <img
          src={roseImg}
          alt="rose"
          className="w-40 mx-auto mb-6 rounded-2xl shadow-lg"
        />

        {!accepted ? (
          <>
            <h1 className="text-3xl font-semibold text-rose-400 mb-4">
              Rutu… I’m Sorry 🥺
            </h1>

            <p className="mb-8 text-gray-300">
              Will you forgive me?
            </p>

            {/* YES BUTTON */}
            <button
              onClick={() => setAccepted(true)}
              className="px-6 py-2 bg-rose-500 rounded-full mr-6 hover:scale-105 transition"
            >
              Yes, I Did ❤️
            </button>

            {/* NO BUTTON (MOVES) */}
            <button
              onMouseEnter={moveNoButton}
              style={{
                position: "absolute",
                top: noPosition.top,
                left: noPosition.left,
              }}
              className="px-6 py-2 bg-gray-600 rounded-full transition"
            >
              No 😅
            </button>
          </>
        ) : (
          <h2 className="text-2xl text-rose-300 animate-pulse">
            Thank you bala ❤️  
            <br />
            I promise I’ll show it with actions.
          </h2>
        )}
      </div>
    </div>
  );
};

export default SorryFor;