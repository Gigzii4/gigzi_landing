import React, { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import confetti from "canvas-confetti";

import roseImg from "../assets/rose.jpeg";
import memoryImg from "../assets/memory.jpeg";
import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import song from "../assets/song.mp3";

const images = [roseImg, memoryImg, image1, image2, image3];

const BirthdaySurprise = () => {

  const [started, setStarted] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [index, setIndex] = useState(0);

  const audioRef = useRef(null);
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {

    if(started){

      audioRef.current.play();

      typed.current = new Typed(el.current, {
        strings: [
          "Happy Birthday Rutu 🎂",
          "You make my life brighter ✨",
          "Your smile means everything to me ❤️"
        ],
        typeSpeed: 20,
        backSpeed: 20,
        loop: true
      });

      const slide = setInterval(()=>{
        setIndex((prev)=> (prev+1)%images.length);
      },3000);

      return ()=>clearInterval(slide);
    }

  },[started]);

  const triggerSurprise = () => {

    setShowSurprise(true);

    confetti({
      particleCount:200,
      spread:90,
      origin:{y:0.6}
    });

  }

  if(!started){
    return(
      <div className="h-screen flex items-center justify-center bg-black text-white">

        <button
        onClick={()=>setStarted(true)}
        className="px-8 py-4 bg-pink-500 text-xl rounded-full hover:scale-110 transition">
          Tap to start surprise ❤️
        </button>

      </div>
    )
  }

  return (

    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      <audio ref={audioRef} src={song} loop />

      {/* glowing background */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500/30 blur-[200px] -top-40 -left-40 rounded-full"/>
      <div className="absolute w-[500px] h-[500px] bg-rose-500/30 blur-[200px] top-40 -right-40 rounded-full"/>

      {/* heart rain */}
      <div className="absolute text-pink-400 text-2xl animate-heart">❤️</div>
      <div className="absolute left-20 text-pink-400 text-2xl animate-heart">❤️</div>
      <div className="absolute right-20 text-pink-400 text-2xl animate-heart">❤️</div>

      <div className="z-10 bg-[#111] p-10 rounded-3xl shadow-xl text-center max-w-md w-[90%]">

        {/* slideshow */}
        <div className="h-[250px] mb-6 flex justify-center">
          <img
          src={images[index]}
          className="w-60 h-70 object-cover rounded-2xl shadow-lg transition duration-1000"
          />
        </div>

        <h1 className="text-3xl mt-3 text-pink-300 mb-4">
          Happy Birthday 🎉
        </h1>

        {/* typing */}
        <div className="text-lg text-gray-300">
          <span ref={el}></span>
        </div>

        <button
        onClick={triggerSurprise}
        className="mt-6 px-6 py-3 bg-rose-500 rounded-full hover:scale-110 transition">
          Click for Surprise 🎁
        </button>

        {showSurprise && (
          <div className="mt-6 text-xl text-pink-300">
            🎉 Happy Birthday My Queen 🎉
            <p className="text-gray-300 mt-2">
              Among all the gifts, the most precious one is you ❤️
            </p>
          </div>
        )}

      </div>

      <style>{`

      @keyframes heart{
        0%{transform:translateY(0);opacity:1}
        100%{transform:translateY(-100vh);opacity:0}
      }

      .animate-heart{
        animation:heart 6s linear infinite;
      }

      `}</style>

    </div>
  )
}

export default BirthdaySurprise;