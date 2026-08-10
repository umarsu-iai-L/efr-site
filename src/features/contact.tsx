import React, { useState } from "react";
import { BASE_URL } from "../components/lib/config";
import { GrMapLocation } from "react-icons/gr";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
export default function Contact() {
  return (
    <div>
      <div className="w-full px-12 py-10 relative" style={{backgroundImage: `url(/contact-bg.jpg)`, backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <span className="relative z-10 text-[65px] font-[700] text-white">Contact Us</span>
      </div>

      <div className="w-full px-12 py-10 bg-white flex flex-col md:flex-row gap-8">

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">

            <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-4 shadow-sm">
              <span className="w-12 h-12 rounded-full bg-[#224474] flex items-center justify-center text-white text-xl mb-2">
                <FaMapMarkerAlt />
              </span>
              <div className="text-xl  mb-1">Address</div>
              <div className="text-base">
                Emirates Face Recognition LLC PO Box 107755 Abu Dhabi United Arab Emirates
              </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-4 shadow-sm">
              <span className="w-12 h-12 rounded-full bg-[#224474] flex items-center justify-center text-white text-xl mb-2">
                <FaPhoneAlt />
              </span>
              <div className="text-xl  mb-1">Contact Info</div>
              <div className="text-base">Call : +9712 622 8121</div>
              <div className="text-base">Email : info@facerecognition.ae</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-4 shadow-sm">
            <span className="w-12 h-12 rounded-full bg-[#224474] flex items-center justify-center text-white text-xl mb-2">
              <FaEnvelope />
            </span>
            <div className="text-xl  mb-1">Live Support</div>
            <div className="text-base">customersupport@emiratesface.com</div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col gap-6 min-w-[350px]">
          <div className="text-4xl font-bold mb-4">Let’s schedule a demo</div>
          <ContactForm />
        </div>
      </div>
      <div className="w-full px-12 py-10 h-[400px] relative flex justify-end items-end" style={{backgroundImage: `url(/map.jpg)`, backgroundPosition: "center center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div
          className="relative z-10 backdrop-md bg-[#ffffff20] shadow border-[0.05px] border-white/20 rounded-full py-1 px-6 w-fit flex items-center gap-2 cursor-pointer hover:bg-[#224474] transition"
          onClick={() => window.open('https://maps.app.goo.gl/2g7iZs5CiUAMGRyh6', '_blank')}
        >
          <GrMapLocation  className="text-white text-xl" />
          <span className="text-white">Open In Maps</span>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/contact-us`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Thank you! We have received your message.");
        setName(""); setPhone(""); setEmail(""); setMessage("");
      } else {
        setStatus(data.message || "Submission failed.");
      }
    } catch (err) {
      setStatus("Submission failed. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter First Name"
        className="border-b border-gray-300 outline-none py-2 px-1"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Company Phone"
          className="flex-1 border-b border-gray-300 outline-none py-2 px-1"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Company Email Address"
          className="flex-1 border-b border-gray-300 outline-none py-2 px-1"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <textarea
        placeholder="Message (Optional)"
        className="border-b border-gray-300 outline-none py-2 px-1 min-h-[80px]"
        value={message}
        onChange={e => setMessage(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="mt-4 w-full bg-[#224474] text-white py-2 rounded-full text-sm font-medium"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Now"}
      </button>
      {status && <div className="text-xs mt-2 text-gray-500">{status}</div>}
    </form>
  );
}
