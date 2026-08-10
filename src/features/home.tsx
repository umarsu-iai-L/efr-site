import React from "react";
import Hero from "../components/hero";
import Services from "../components/services";
import TrustedScroller from "../components/TrustedScroller";
import Track from "../components/trackrecord";
export default function Home() {
  return (
    <div>
        <Hero />
        <Services />

      <div className="w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-8xl mx-auto text-center mt-8 mb-8 font-bold text-3xl text-gray-900">
       TRUSTED PARTNERS
        <div className="mt-4">
          <TrustedScroller />
        </div>
      </div>
      <Track />
    </div>
  );
}
