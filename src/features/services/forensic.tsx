import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "../../navigation";
import TrustedScroller from "../../components/TrustedScroller";
import {
  FaUserAlt,
  FaRegFileAlt,
  FaRegIdCard,
  FaLink,
  FaCheckCircle,
  FaDatabase,
} from "react-icons/fa";

/* ---------------- Parallax KYC Images Component ---------------- */

function ParallaxKYCImages() {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Observe visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate section-relative scroll
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // how far section has moved into viewport
      const progress =
        1 - Math.min(Math.max(rect.top / viewportHeight, 0), 1);

      setOffset(progress * 40); // 👈 controls intensity
    };

    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const kyc1Style = {
    transform: `translateY(${-20 + offset}px)`,
    transition: "transform 0.15s ease-out",
    willChange: "transform",
  };

  const kyc2Style = {
    transform: `translateY(${20 - offset}px)`,
    transition: "transform 0.15s ease-out",
    willChange: "transform",
  };

  return (
    <div
      ref={containerRef}
      className="flex gap-8 justify-end items-center w-full"
    >
      <img
        src="/kyc1.jpg"
        alt="kyc1"
        className="w-[340px] h-[340px] object-cover rounded-[60px] shadow-lg"
        style={kyc1Style}
      />
      <img
        src="/kyc5.jpg"
        alt="kyc2"
        className="w-[340px] h-[340px] object-cover rounded-[60px] shadow-lg"
        style={kyc2Style}
      />
    </div>
  );
}

/* ---------------- Main Component ---------------- */

export default function Forensic() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div
        className="w-full px-12 py-10 relative"
        style={{
          backgroundImage: `url(/contact-bg.jpg)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="relative z-10 w-[70%]">
          <span className="text-[65px] font-bold text-white">
Forensic Station
          </span>
        </div>

        <button
          className="mt-4 relative z-10 bg-[#224474] text-white rounded-full px-6 py-2 text-sm font-medium shadow hover:bg-[#18325a] transition"
          onClick={() => navigate("/contact")}
        >
          Contact Sales →
        </button>
      </div>

      {/* Key Features Hero */}
      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-8xl mx-auto py-12 flex flex-col md:flex-row gap-12 mt-16 px-4 items-center">
        <div className="w-[80%]">
          <h2 className="text-4xl font-bold mb-8 leading-tight">
High-Speed Forensic Face Recognition for Law Enforcement
          </h2>
          <p className="text-gray-700 text-sm max-w-xl">
          Emirates FR is a cutting-edge forensic face recognition solution designed for law enforcement. It enables rapid identification by searching millions of face-prints in seconds, using advanced image extraction, enhancement, and matching technologies—delivering fast, accurate, and scalable results.
          </p>
        
        </div>

        <div className="w-[50%] flex gap-8 justify-end items-center w-full">
          <ParallaxKYCImages />
        </div>
      </div>

      {/* Why EFR */}
      <div className="w-full max-w-[95vw] md:max-w-[90vw] py-20  lg:max-w-8xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between  mt-16 px-4 mb-16">
        <div className="w-[40%]">
          <div className="text-xs text-[#224474] font-semibold tracking-widest uppercase mb-2 flex items-center gap-2"> <span className="inline-block text-lg">→</span> PROVEN EXPERTISE IN BIOMETRICS </div>
          <h2 className="text-4xl font-bold mb-4">
            Why Emirates Face Recognition (EFR)?
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            With our proven expertise in biometrics, AI, and security solutions, EFR delivers cutting-edge tools that balance efficiency, compliance, and trust. Our Digital Onboarding Toolkit for KYC ensures organizations can securely onboard customers while staying ahead of regulatory requirements and cyber threats.
          </p>
          <button
            className="bg-[#224474] text-white rounded-full px-6 py-2 text-sm hover:bg-[#18325a]"
            onClick={() => navigate("/contact")}
          >
            Contact Sales →
          </button>
        </div>

          <div className="w-[30%] flex gap-8 justify-end items-center w-full">
          <ParallaxKYCImages />
        </div>
      </div>
    </div>
  );
}
