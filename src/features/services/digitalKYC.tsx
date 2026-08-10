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
        src="/kyc2.jpg"
        alt="kyc2"
        className="w-[340px] h-[340px] object-cover rounded-[60px] shadow-lg"
        style={kyc2Style}
      />
    </div>
  );
}

/* ---------------- Main Component ---------------- */

export default function DigitalKYC() {
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
            Digital Onboarding Toolkit (RHServ)
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
        <div className="flex-1">
          <h2 className="text-5xl font-bold mb-8 leading-tight">
            Key Features that power
            <br />
            Secure Onboarding
          </h2>
          <p className="text-gray-700 text-lg max-w-xl">
            Our Digital Onboarding Toolkit streamlines customer verification
            using AI-powered face recognition, document authentication, and
            real-time identity validation.
          </p>
        </div>

        <div className="flex-1 flex gap-8 justify-end items-center w-full">
          <ParallaxKYCImages />
        </div>
      </div>

      {/* Trusted By */}
      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-8xl mx-auto text-center mt-8 mb-8 font-semibold text-gray-900">
        Trusted by industry-leading organizations around the world
        <div className="mt-4">
          <TrustedScroller />
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-8xl mx-auto flex flex-col md:flex-row gap-8 mt-16 px-4">
        <div className="md:w-1/2 pt-8">
          <div className="flex items-center gap-2 mb-2 text-sm">
            <span>→</span>
            <span className="italic font-medium">KEY FEATURES</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Key Features That Power Secure Onboarding
          </h2>
          <p className="text-gray-700 max-w-xl">
            Advanced biometrics, AI-driven document checks, and seamless
            integrations — built for security, speed, and compliance.
          </p>
        </div>

        <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <FaUserAlt />,
              title: "Liveness Detection",
              desc: "Real-time human presence verification.",
            },
            {
              icon: <FaRegIdCard />,
              title: "Facial Biometric Verification",
              desc: "Accurate facial recognition for fraud prevention.",
            },
            {
              icon: <FaDatabase />,
              title: "Automated Data Capture",
              desc: "OCR-based document data extraction.",
            },
            {
              icon: <FaRegFileAlt />,
              title: "Document Authentication",
              desc: "Detect forged or manipulated documents.",
            },
            {
              icon: <FaLink />,
              title: "Integration Ready",
              desc: "Secure APIs and SDKs for fast deployment.",
            },
            {
              icon: <FaCheckCircle />,
              title: "End-to-End Compliance",
              desc: "Meets KYC & AML regulatory requirements.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-8">
              <div className="bg-[#223a57] text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <div className="font-bold text-lg">{item.title}</div>
              <div className="text-gray-700 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Simple Steps Process Section */} <div className="w-full bg-[#0d1a2f] mt-16 flex flex-col md:flex-row items-stretch justify-between"> <div className="flex-1 p-10 flex flex-col gap-6 text-white"> <div className="text-2xl md:text-3xl font-bold mb-4">3 Simple Steps Process</div> <div className="mb-4 text-sm opacity-80">From ID upload to instant approval, our step-by-step process combines biometric checks, AI validation, and fraud detection to deliver a seamless and secure onboarding experience.</div> <div className="flex flex-col gap-6"> <div style={{background: 'linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)'}} className="rounded-2xl p-5"> <div className="mb-2 font-semibold">1. Capture</div> <div className="mb-1 text-sm opacity-80">Seamless client capture: documents, liveness, and facial verification</div> </div> <div style={{background: 'linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)'}} className="rounded-2xl p-5"> <div className="mb-2 font-semibold">2. Trusted Validation</div> <div className="mb-1 text-sm opacity-80">Secure validation against government databases to ensure full regulatory compliance</div> </div> <div style={{background: 'linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)'}} className="rounded-2xl p-5"> <div className="mb-2 font-semibold">3. Certificate Generation</div> <div className="mb-1 text-sm opacity-80">Obtain a certified certificate digitally signed by the official source authority</div> </div> </div> </div> <div className="flex-1 flex items-center justify-center bg-[#0d1a2f]"> <img src="/kyc3.webp" alt="kyc3" className="w-full object-cover shadow-lg" /> </div> </div>

      {/* Why EFR */}
      <div className="w-full max-w-[95vw] md:max-w-[90vw] py-20  lg:max-w-8xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between  mt-16 px-4 mb-16">
        <div className="w-[40%]">
          <div className="text-xs text-[#224474] font-semibold tracking-widest uppercase mb-2 flex items-center gap-2"> <span className="inline-block text-lg">→</span> PROVEN EXPERTISE IN BIOMETRICS </div>
          <h2 className="text-4xl font-bold mb-4">
            Why Emirates Face Recognition (EFR)?
          </h2>
          <p className="text-gray-700 mb-4">
            With over 12 years of proven expertise in biometrics, AI, and security solutions, EFR delivers cutting-edge tools that prioritize efficiency, compliance, and trust. Our Digital Onboarding Toolkit for KYC empowers organizations to securely onboard customers while staying ahead of evolving regulatory requirements and cyber threats. Trusted across the security and financial sectors, EFR has facilitated more than 200 million facial recognition transactions to date.
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
