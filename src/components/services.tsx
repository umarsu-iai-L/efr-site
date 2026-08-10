import React, { useRef, useState } from "react";
import { useNavigate } from "../navigation";

const services = [
  {
    title: "Digital Onboarding Toolkit for KYC",
    desc: "At Emirates Face Recognition (EFR), we understand that Know Your Customer (KYC) compliance is the foundation of trust in financial institutions, government entities, and digital platforms.",
    img: "/service1.jpg",
    link: "/services/digitalKYC",
  },
  {
    title: "Secured Transactions with OTF",
    desc: "With EFR, your face becomes your authorization – enabling faster, more secured, real time transaction approvals. We’re bring the future of frictionless, verified transactions to life.",
    img: "/service2.jpg",
    link: "/services/otf",
  },
  {
    title: "EFR Innovation",
    desc: "At the core of our business is innovation — not just in our technology, but in every process, partnership, and solution we deliver. We don’t just adopt innovation; we cultivate it.",
    img: "/service3.jpg",
    link: "/innovation",
  },
  {
    title: "Border Clearance",
    desc: "Secure Facilitated Border Clearance Effective border clearance means a safe and secure nation. It is one of the key frontline components of protecting a nation’s critical infrastructure!",
    img: "/service4.jpg",
    link: "/services/borderClearance",
  },
  {
    title: "Forensic & Surveillance",
    desc: "EFR delivers advanced forensic and surveillance solutions, empowering organizations to detect, prevent, and respond to threats with unmatched accuracy and speed.",
    img: "/service5.jpg",
    link: "/services/forensic",
  },
];

export default function Service() {
  const navigate = useNavigate();
  const scrollerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollerRef.current.scrollLeft = scrollLeft - walk;
    updateActiveDot();
  };

  const updateActiveDot = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setActiveDot(0);
      return;
    }
    const percent = el.scrollLeft / maxScroll;
    if (percent < 0.33) setActiveDot(0);
    else if (percent < 0.66) setActiveDot(1);
    else setActiveDot(2);
  };

  const handleScroll = () => {
    updateActiveDot();
  };

  return (
    <section className="py-20 w-full bg-black flex flex-col relative overflow-hidden">
      <img
        src="/backgroud-line.png"
        alt="background lines"
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none select-none z-0"
        aria-hidden="true"
      />
      <h2 className="text-6xl font-bold text-white mb-12 tracking-tight text-left px-8 relative z-10">OUR SERVICES</h2>
      <div
        ref={scrollerRef}
        className="flex gap-8 overflow-x-auto px-8 pb-4 select-none hide-scrollbar relative z-10"
        style={{ cursor: isDragging ? "grabbing" : "grab", WebkitOverflowScrolling: "touch" }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={handleScroll}
      >
        {services.map((service, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[370px] h-[440px] rounded-[24px] p-0.5 transition-all duration-300 shadow-xl group"
            style={{
              background: "linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)",
            }}
          >
            <div
              className="w-full h-full rounded-[22px] flex flex-col bg-black/80 p-6 transition-all duration-300 group-hover:bg-black/60"
              style={{
                background: "inherit",
                boxShadow: "0 4px 32px #0004",
                backgroundBlendMode: "overlay",
              }}
            >
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-48 object-cover rounded-[18px] mb-6"
                draggable={false}
                style={{ pointerEvents: "none" }}
              />
              <div className="text-white text-xl font-semibold mb-2 leading-tight">{service.title}</div>
              <div className="text-gray-300 text-sm mb-6 flex-1">{service.desc}</div>
              <button
                className="mt-auto text-white font-semibold text-sm flex items-center gap-2 group-hover:underline px-0 py-2 transition-all"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  backgroundImage: "none",
                }}
                onClick={() => navigate(service.link)}
                onMouseOver={e => {
                  e.currentTarget.parentElement.parentElement.style.background = "linear-gradient(180deg, #CAA74966 0%, #FFFFFF0D 68%)";
                }}
                onMouseOut={e => {
                  e.currentTarget.parentElement.parentElement.style.background = "linear-gradient(217deg, #FFFFFF2B 0%, #0000000D 42%)";
                }}
              >
                Know More <span className="ml-1">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 gap-2 relative z-10">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeDot === dot ? 'bg-white' : 'bg-gray-600'} inline-block`}
          />
        ))}
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
