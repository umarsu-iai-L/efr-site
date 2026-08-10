import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
export default function Career() {
  return (
    <div>
      <div className="w-full px-12 py-10 relative" style={{backgroundImage: `url(/career-bg.jpg)`, backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <span className="relative flex z-10 text-[65px] font-[600] text-white w-[70%]">Shape the Future of Security with Us</span>
      </div>

    <div className="w-full px-2 md:px-12 py-10 bg-white flex justify-center">
      <div className="w-full max-w-8xl bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-lg flex flex-col gap-6">
        <div className="text-4xl md:text-5xl font-bold mb-2">Take The First Step Toward Joining EFR</div>
        <div className="text-gray-700 text-lg mb-6">Fill out the form below and share your details, skills, and resume. Our HR team will carefully review your application, and if your profile matches our needs, we’ll get in touch with you for the next steps.</div>
        <form className="flex flex-col gap-5">
          <div>
            <label className="block font-semibold mb-1">Full Name <span className="text-red-500">*</span></label>
            <input type="text" required placeholder="Enter your full name" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-[#224474] focus:ring-1 focus:ring-[#224474] outline-none" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email <span className="text-red-500">*</span></label>
            <input type="email" required placeholder="Enter your email address" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-[#224474] focus:ring-1 focus:ring-[#224474] outline-none" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Phone Number <span className="text-red-500">*</span></label>
            <input type="text" required placeholder="Enter your phone number" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-[#224474] focus:ring-1 focus:ring-[#224474] outline-none" />
          </div>
          <div>
            <label className="block font-semibold mb-1">LinkedIn Profile / Portfolio (Optional)</label>
            <input type="text" placeholder="Paste your LinkedIn or portfolio link" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-[#224474] focus:ring-1 focus:ring-[#224474] outline-none" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Upload Resume (PDF) <span className="text-red-500">*</span></label>
            <input type="file" accept="application/pdf" required className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#224474] file:text-white file:font-semibold" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" required className="accent-[#224474] w-4 h-4" />
            <span className="text-sm">I confirm that the information provided is accurate and agree to EFR’s data terms.</span>
          </div>
          <button type="submit" className="mt-4 w-full bg-[#224474] text-white py-4 rounded-full text-lg font-semibold tracking-widest shadow hover:bg-[#18325a] transition">APPLY NOW</button>
        </form>
      </div>
    </div>
    
    </div>
  );
}
