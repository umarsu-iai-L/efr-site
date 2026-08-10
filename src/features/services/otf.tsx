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
        src="/kyc4.jpg"
        alt="kyc4"
        className="w-[340px] h-[340px] object-cover rounded-[60px] shadow-lg"
        style={kyc2Style}
      />
    </div>
  );
}

/* ---------------- Main Component ---------------- */

export default function OTF() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div
        className="w-full px-12 py-10 relative"
        style={{
          backgroundImage: `url(/page2.jpg)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="relative z-10 w-[70%]">
          <span className="text-[65px] font-bold text-white">
            Secured Transactions with One Time Facial (OTF)
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
            Seamless, Secure, and Smart Customer Verification
          </h2>
          <p className="text-gray-700 text-lg max-w-xl">
            At EFR , we understand that the trust is cornerstone of every transaction- whether in finance, government or digital platforms. That’s why we enable secure, real time transaction approvals through facial recognition, replacing outdated unsecured methods
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

      {/* One Time Facial Features Section */} 
      <div className="w-full bg-[#0d1a2f] mt-16 flex flex-col md:flex-row items-stretch justify-between"> 
        <div className="flex-1 p-10 flex flex-col gap-6 text-white"> <div className="text-2xl md:text-3xl font-bold mb-4">One Time Facial Features</div> 
        <div className="mb-4 text-sm opacity-80">The EFR One-Time Facial (OTF) Toolkit combines advanced biometrics, AI-driven technology, and seamless integration capabilities to deliver secure, fast, and compliant transaction authorization. Designed for maximum flexibility, 
          OTF supports integration across multiple platforms such as SDKs, web platforms, and SMS channels—ensuring a smooth and reliable user experience</div>
           
           <div className="flex flex-row gap-2">
           <div className="flex flex-col gap-6"> 
          <div style={{background: 'linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)'}} className="rounded-2xl p-5"> 
          <div className="mb-2 font-semibold">1. Facial Recognition</div> 
          <div className="mb-1 text-sm opacity-80">Verify customer identities instantly through face recognition technology with high accuracy and liveness detection to prevent fraud.</div>
           </div> 
          
          <div style={{background: 'linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)'}} className="rounded-2xl p-5"> 
            <div className="mb-2 font-semibold">3. Omnichannel</div> <div className="mb-1 text-sm opacity-80">With true omnichannel support, we make OTF effortless across all your communication channels</div> 
            </div> 
            <div style={{background: 'linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)'}} className="rounded-2xl p-5"> 
              <div className="mb-2 font-semibold">5. End to End Compliance</div> 
            <div className="mb-1 text-sm opacity-80">Meet KYC/AML requirements, ensuring safe onboarding while reducing operational risks.
              </div> 
            
            </div> 
            
          </div> 
                     <div className="flex flex-col gap-6"> 
          <div style={{background: 'linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)'}} className="rounded-2xl p-5"> 
          <div className="mb-2 font-semibold">1. Facial Recognition</div> 
          <div className="mb-1 text-sm opacity-80">Verify customer identities instantly through face recognition technology with high accuracy and liveness detection to prevent fraud.</div>
           </div> 
          
          <div style={{background: 'linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)'}} className="rounded-2xl p-5"> 
            <div className="mb-2 font-semibold">3. Omnichannel</div> <div className="mb-1 text-sm opacity-80">With true omnichannel support, we make OTF effortless across all your communication channels</div> 
            </div> 
            <div style={{background: 'linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)'}} className="rounded-2xl p-5"> 
              <div className="mb-2 font-semibold">5. End to End Compliance</div> 
            <div className="mb-1 text-sm opacity-80">Meet KYC/AML requirements, ensuring safe onboarding while reducing operational risks.
              </div> 
            
            </div> 
            
          </div> 
          </div>
          </div> 
          
          
          <div className="flex-1 flex items-center justify-center bg-[#0d1a2f]"> <img src="/kyc3.webp" alt="kyc3" className="w-full object-cover shadow-lg" /> 
          </div> 
          </div>
    </div>
  );
}
