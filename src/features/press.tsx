import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
export default function Press() {
  return (
    <div>
      <div className="w-full px-12 py-10 relative" style={{backgroundImage: `url(/career-bg.jpg)`, backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <span className="relative flex z-10 text-[65px] font-[600] text-white w-[70%]">News & Announcements</span>
      </div>

    <div className="w-full px-2 md:px-12 py-10 bg-white flex justify-center">
      <div className="w-full max-w-[1800px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col overflow-hidden">
          <img src="/press-1.jpg" alt="Press 1" className="w-full h-64 object-cover" />
          <div className="p-6 flex flex-col flex-1">
            <div className="text-gray-500 text-sm mb-2">Published August 17, 2025</div>
            <div className="font-bold text-md mb-2">Aafaq Islamic Finance Partners with Emirates Face Recognition to Launch Advanced Digital KYC Services</div>
            <div className="text-gray-700 text-xs mb-6 flex-1">
              In a groundbreaking move towards digital innovation, Aafaq Islamic Finance PSC has proudly announced its partnership with Emirates Face Recognition (EFR) to roll out its advanced Digital KYC (Know Your Customer) services. This strategic collaboration marks a significant milestone in the financial sector, aligning with the UAE’s vision for a secure and seamless digital transformation.
            </div>
            <button className="mt-auto bg-[#224474] text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 w-fit">Read More <span className="ml-1">➞</span></button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col overflow-hidden">
          <img src="/press-2.jpeg" alt="Press 2" className="w-full h-64 object-cover" />
          <div className="p-6 flex flex-col flex-1">
            <div className="text-gray-500 text-sm mb-2">Published May 30, 2025</div>
            <div className="font-bold text-md mb-2">United Arab Bank partners with Emirates Face Recognition (EFR) to Launch a Seamless and Secure Digital Banking Experience via Its New Mobile App</div>
            <div className="text-gray-700 text-xs mb-6 flex-1">
              United Arab Bank (UAB) has signed a strategic partnership agreement with Emirates Face Recognition (EFR), a leading UAE-based technology provider of cutting-edge facial recognition and digital identity verification solutions. The signing ceremony was attended by Mr. Shirish Bhide, CEO of United Arab Bank; Mr. Emre Yalcin, Head of Retail Banking at United Arab Bank; and Mr. Zack Charkas, CEO of Emirates Face Recognition, along with senior executives from both organizations.
            </div>
            <button className="mt-auto bg-[#224474] text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 w-fit">Read More <span className="ml-1">➞</span></button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col overflow-hidden">
          <img src="/press-3.jpeg" alt="Press 3" className="w-full h-64 object-cover" />
          <div className="p-6 flex flex-col flex-1">
            <div className="text-gray-500 text-sm mb-2">Published January 8, 2025</div>
            <div className="font-bold text-md mb-2">Revolutionizing Border Clearance with Faster, Smarter Biometric Technology</div>
            <div className="text-gray-700 text-xs mb-6 flex-1">
              Reem Finance is delighted to announce its strategic partnership with Emirates Face Recognition (EFR), a leading innovator in AI-driven biometric solutions. This collaboration signifies a major milestone in advancing security measures, optimizing operational efficiency, and delivering seamless, state-of-the-art digital banking experiences. Together, we are shaping the future of banking by driving innovation and establishing new industry benchmarks.
            </div>
            <button className="mt-auto bg-[#224474] text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 w-fit">Read More <span className="ml-1">➞</span></button>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  );
}
