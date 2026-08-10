import React, { useEffect, useRef, useState } from "react";

/* ---------- Animated Number ---------- */
function AnimatedNumber({ value, duration = 1500, format = v => v, ...props }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    let start;
    setDisplay(0); // reset on reload

    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(Math.floor(progress * value));

      if (progress < 1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    }

    raf.current = requestAnimationFrame(animate);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [value, duration]);

  return <span {...props}>{format(display)}</span>;
}

/* ---------- Stats Grid ---------- */
function StatsGrid() {
  return (
    <div className="flex flex-col gap-16 justify-center items-center w-full max-w-2xl mt-10 md:mt-0">
      
      {/* Row 1 */}
      <div className="flex gap-40 justify-center w-full">
        <div className="flex flex-col items-center min-w-[140px]">
          <AnimatedNumber
            value={12}
            format={v => `${v}+`}
            className="text-6xl font-bold text-white"
          />
          <span className="text-lg text-white/80 mt-2">
            Years of Experience
          </span>
        </div>

        <div className="flex flex-col items-center min-w-[140px]">
          <AnimatedNumber
            value={93}
            format={v => `${v}%`}
            className="text-6xl font-bold text-white"
          />
          <span className="text-lg text-white/80 mt-2">
            Market Coverage
          </span>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex gap-40 justify-center w-full">
        <div className="flex flex-col items-center min-w-[140px]">
          <AnimatedNumber
            value={195}
            duration={2000}
            format={v => `${v}M+`}
            className="text-6xl font-bold text-white"
          />
          <span className="text-lg text-white/80 mt-2">
            Facial Transactions
          </span>
        </div>

        <div className="flex flex-col items-center min-w-[140px]">
          <AnimatedNumber
            value={40}
            format={v => `${v}+`}
            className="text-6xl font-bold text-white"
          />
          <span className="text-lg text-white/80 mt-2">
            Partners
          </span>
        </div>
      </div>

    </div>
  );
}

/* ---------- Main Section ---------- */
export default function TrackRecord() {
  return (
    <section className="py-20 w-full bg-black flex flex-col relative overflow-hidden min-h-[480px]">
      
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        src="/hero-black.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" aria-hidden="true" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full h-full gap-10 px-6">
        
        {/* Left Content */}
        <div
          className="rounded-3xl p-8 md:p-12 max-w-2xl w-full text-left shadow-2xl"
          style={{
            background:
              "linear-gradient(180deg, #FFFFFF5C 0%, #FFFFFF0D 100%)",
          }}
        >
          <h2 className="text-3xl md:text-3xl font-bold text-white mb-6">
            Our Proven Track Record
          </h2>

          <p className="text-md text-white/90 font-[400] leading-relaxed">
            At Emirates Face Recognition (EFR), numbers tell our story. Since
            2012, we’ve been setting new benchmarks in biometric security,
            delivering unmatched accuracy, reliability, and trust to clients
            worldwide.
          </p>
        </div>

        {/* Right Stats */}
        <StatsGrid />
      </div>
    </section>
  );
}
