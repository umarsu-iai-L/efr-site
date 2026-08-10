import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const words = ["Speed", "Security", "Compliance"];
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const securityRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (securityRef.current) securityRef.current.classList.add("fade-in-up");
    if (descRef.current) descRef.current.classList.add("fade-in-up");
  }, []);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < words[wordIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(words[wordIndex].slice(0, displayed.length + 1));
        }, 90);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((prev) => (prev + 1) % words.length);
          setTyping(true);
        }, 200);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIndex, words]);

  return (
    <section className="py-20  w-full max-w-[1400px] mx-auto flex flex-row">
      <div className="w-[50%] flex flex-col items-start justify-start py-20 ">
        <h2 className="text-2xl text-gray-700 font-[400]">Next-Generation</h2>
        <p className="mt-4 md:text-6xl font-bold uppercase">Facial Recognition</p>
        <span
          ref={securityRef}
          className="mt-4 ml-20 md:text-6xl font-bold uppercase opacity-0 flex items-center"
        >
          for
          <span
            className="text-[#224474] pl-4 inline-block hero-typewriter"
            style={{ minWidth: 10 + "ch", display: "inline-block" }}
          >
            {displayed}
          </span>
        </span>
        <h2
          ref={descRef}
          className="mt-4 ml-20 text-md w-[80%] text-gray-500 opacity-0"
        >
          We are at the forefront of providing cutting-edge biometric solutions to enhance security, streamline services, and revolutionize industries.
        </h2>
        <button className="mt-8 ml-20 px-6 py-2 bg-[#224474] text-white rounded-full hover:bg-blue-700">
          Explore More  →
        </button>
      </div>
      <div className="w-[50%] ">
        <video
          src="/hero.mp4"
          className="h-auto mt-10"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        />
      </div>
    </section>
  );
}

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    .fade-in-up {
      opacity: 1 !important;
      animation: fadeInUpHero 1.1s cubic-bezier(0.23, 1, 0.32, 1);
    }
    @keyframes fadeInUpHero {
      0% {
        opacity: 0;
        transform: translateY(40px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  if (!document.head.querySelector('style[data-hero-typewriter]')) {
    style.setAttribute('data-hero-typewriter', 'true');
    document.head.appendChild(style);
  }
}
