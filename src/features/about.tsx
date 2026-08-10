import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "../navigation";
import { FaShieldAlt, FaAward, FaUsers, FaLightbulb } from "react-icons/fa";
export default function About() {
    const navigate = useNavigate();
  const bgRef = useRef(null);
  useEffect(() => {
    if (bgRef.current) {
      bgRef.current.classList.add("fade-in-up");
    }
    let lastScrollY = window.scrollY;
    let imgTop = 0;
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = Math.max(-30, Math.min(30, window.scrollY * -0.25));
        bgRef.current.style.backgroundPosition = `center calc(50% + ${offset}px)`;
      }
      const img = document.getElementById('about-float-img');
      if (img) {
        const delta = window.scrollY - lastScrollY;
        imgTop += delta * 0.5; // adjust 0.5 for float speed
        imgTop = Math.max(-40, Math.min(120, imgTop));
        img.style.top = `${imgTop}px`;
        lastScrollY = window.scrollY;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const stats = [
    { label: "Years of experience", value: 12, suffix: "+" },
    { label: "Market Coverage", value: 93, suffix: "%" },
    { label: "Facial Transaction", value: 195, suffix: "M+" },
    { label: "Partners", value: 40, suffix: "+" },
  ];
  const [counts, setCounts] = useState(stats.map(() => 0));
  useEffect(() => {
    const durations = [1200, 1200, 1200, 1200];
    const intervals = stats.map((stat, i) => {
      const step = stat.value / (durations[i] / 20);
      return setInterval(() => {
        setCounts(prev => {
          const next = [...prev];
          if (next[i] < stat.value) {
            next[i] = Math.min(stat.value, +(next[i] + step).toFixed(stat.value > 100 ? 0 : 1));
          }
          return next;
        });
      }, 20);
    });
    const timeout = setTimeout(() => intervals.forEach(clearInterval), Math.max(...durations) + 100);
    return () => {
      intervals.forEach(clearInterval);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-start pt-16 pb-8 px-4">
      <div className="text-center mb-4 mt-4 w-full flex flex-col items-center justify-center">
        <div className="text-[#224474] font-[400]  mb-8" style={{letterSpacing:2}}>
          <span className="border-b border-[#224474] pb-3">ABOUT US</span></div>
        <h1 className="text-2xl md:text-5xl font-[600] mb-4 w-[75%]">Emirates Face Recognition is a leading provider of advanced biometric solutions.</h1>
      </div>
      <div
        ref={bgRef}
        className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-8xl h-[320px] md:h-[350px] lg:h-[400px] rounded-xl overflow-hidden relative shadow-lg bg-center bg-cover about-hero-bg"
        style={{
          backgroundImage: 'url(/career-bg.jpg)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />

      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-8xl mx-auto mt-10 mb-10">
        <div className="bg-[#224474] rounded-3xl flex flex-col md:flex-row justify-between items-center py-10 px-4 md:px-12 text-white text-center gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex-1 flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-bold mb-2">{counts[i]}{stat.suffix}</div>
              <div className="text-base md:text-lg opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-8xl mx-auto flex flex-col md:flex-row gap-8 items-start mt-8">
        <div className="w-[60%]">
          <div className="text-[#224474] text-xs font-semibold mb-2 tracking-wide uppercase">CEO'S MESSAGE</div>
          <div className="w-12 h-[0.5px] mb-6 bg-[#224474] rounded-full" />
          <h2 className="text-3xl md:text-5xl font-[600] mb-6">Shaping a Safer and Smarter Future</h2>
          <div className="text-base md:text-sm  mb-4 text-gray-900">
            Emirates Face Recognition (EFR) is a UAE-based pioneer in biometrics and facial recognition technology, built on principles of privacy, trust, and security.<br/><br/>
            Amongst the first to introduce this technology in the UAE, EFR supports the nation’s digital vision by delivering inclusive and accurate AI solutions across sectors.<br/><br/>
            With a mission to enhance safety and drive innovation, EFR empowers various industries such as law enforcement, finance, healthcare, and hospitality through intelligent, secure technologies. Led by a team committed to excellence and integrity, EFR aims to create a safer, smarter, and more connected world.<br/><br/>
            We are fortunate to operate in the UAE, a nation that not only embraces innovation but actively nurtures it. The UAE’s rich multicultural environment has enabled us to train our AI models in a way that reflects a wide spectrum of people and backgrounds, ensuring inclusivity, fairness, and unmatched accuracy across all ethnicities.<br/><br/>
            I am honored to lead a team of dedicated professionals who embody excellence, innovation, and integrity. Together, we are committed to delivering impactful solutions and building lasting partnerships that help shape a safer future.<br/><br/>
          Thank you, <br/>EFR Team
          </div>
        </div>
        <div className="flex items-center justify-center w-[40%]" style={{position: 'relative', minHeight: 350}}>
          <img
            id="about-float-img"
            src="/about.jpeg"
            alt="EFR Flags"
            className="rounded-2xl shadow-lg w-full h-auto object-cover max-h-[350px]"
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              zIndex: 1,
              transition: 'top 0.2s cubic-bezier(0.4,0,0.2,1)'
            }}
          />
        </div>
      </div>
      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-8xl mx-auto mt-16">
        <div className="text-center mb-8 w-full flex flex-col items-center justify-center px-4">
          <div className="text-xs text-[#224474] font-semibold tracking-widest uppercase mb-2">OUR MISSION & VALUES</div>
                    <div className="w-12 h-[0.5px] mb-6 bg-[#224474] rounded-full" />
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Driven by Innovation, Guided by Principles.</h2>
          <div className="text-base md:text-lg text-gray-700 max-w-5xl mx-auto">
            At Emirates Face Recognition LLC, our mission is to harness the power of advanced biometric technologies to create safer, smarter, and more secure environments. We are guided by core values that shape every solution we deliver and every partnership we build.
          </div>
        </div>
        <div className="bg-[#eaf3fd] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-stretch">
          <div className="flex-1 bg-white rounded-xl p-6 flex flex-col items-start shadow-sm min-w-[200px]">
            <span className="text-3xl mb-3 text-[#6fcf97]"><FaShieldAlt /></span>
            <div className="font-bold text-xl mb-2">Integrity</div>
            <div className="text-gray-700 text-sm">We uphold the highest standards of honesty, transparency, and accountability in all that we do.</div>
          </div>
          <div className="flex-1 bg-white rounded-xl p-6 flex flex-col items-start shadow-sm min-w-[200px]">
            <span className="text-3xl mb-3 text-[#f2c94c]"><FaAward /></span>
            <div className="font-bold text-xl mb-2">Excellence</div>
            <div className="text-gray-700 text-sm">We are committed to delivering innovative, reliable, and world-class solutions that exceed expectations.</div>
          </div>
          <div className="flex-1 bg-white rounded-xl p-6 flex flex-col items-start shadow-sm min-w-[200px]">
            <span className="text-3xl mb-3 text-[#6fcf97]"><FaUsers /></span>
            <div className="font-bold text-xl mb-2">Collaboration</div>
            <div className="text-gray-700 text-sm">We believe in working hand-in-hand with clients, partners, and stakeholders to achieve shared goals.</div>
          </div>
          <div className="flex-1 bg-white rounded-xl p-6 flex flex-col items-start shadow-sm min-w-[200px]">
            <span className="text-3xl mb-3 text-[#56ccf2]"><FaLightbulb /></span>
            <div className="font-bold text-xl mb-2">Innovation</div>
            <div className="text-gray-700 text-sm">We continuously embrace cutting-edge technology and new ideas to stay ahead in a fast-changing world.</div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-8xl mx-auto mt-14 mb-16">
        <div className="rounded-2xl p-8 md:p-12" style={{background: 'linear-gradient(120deg, #cbe5ff 0%, #e0ffe0 100%)'}}>
          <div className="text-xs text-[#224474] font-semibold tracking-widest uppercase mb-2 flex items-center gap-2">
            <span className="inline-block text-lg">→</span> PROVEN EXPERTISE IN BIOMETRICS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Emirates Face Recognition (EFR)?</h2>
          <div className="text-base md:text-lg text-gray-800 mb-8 max-w-3xl">
            With our proven expertise in biometrics, AI, and security solutions, EFR delivers cutting-edge tools that balance efficiency, compliance, and trust. Our Digital Onboarding Toolkit for KYC ensures organizations can securely onboard customers while staying ahead of regulatory requirements and cyber threats.
          </div>
          <button className="bg-[#224474] text-white rounded-full px-6 py-2 text-base font-medium shadow hover:bg-[#18325a] transition" onClick={() => navigate("/contact")}>Contact Sales →</button>
        </div>
      </div>
    </div>
  );
}
