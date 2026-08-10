import React, { useState } from "react";
import { BASE_URL } from "./lib/config";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export default function Footer() {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalImg, setModalImg] = useState("");
	const certModalMap = {
		"/1-2.png": "/EFR-ISO-CERTI-2023-2026_250908_163510-1_page-0003.jpg",
		"/2-2.png": "/EFR-ISO-CERTI-2023-2026_250908_163510-1_page-0002.jpg",
		"/3-1.png": "/EFR-ISO-CERTI-2023-2026_250908_163510-1_page-0001.jpg",
		"/4-3.png": "/EFR-ISO-CERTI-2023-2026_250908_163510-1_page-0004.jpg",
		"/5-2.png": "/EMIRATES-FACE-AQU-70041_250908_163611-1_page-0001.jpg",
		"/2-1.png": "/CN-1895744.jpg",
	};
	const openModal = (img) => {
		setModalImg(certModalMap[img] || img);
		setModalOpen(true);
	};
	const closeModal = () => setModalOpen(false);
	const [email, setEmail] = useState("");
	const [subStatus, setSubStatus] = useState("");

	const handleSubscribe = async (e) => {
		e.preventDefault();
		setSubStatus("");
		if (!email) {
			setSubStatus("Please enter an email.");
			return;
		}
		try {
			const res = await fetch(`${BASE_URL}/subscribe`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const data = await res.json();
			if (res.ok) {
				setSubStatus("Subscribed successfully!");
				setEmail("");
			} else {
				setSubStatus(data.message || "Subscription failed.");
			}
		} catch (err) {
			setSubStatus("Subscription failed. Please try again later.");
		}
	};

	return (
		<footer className=" w-full relative overflow-hidden bg-gradient-to-r from-[#07131b] to-black text-[14px] text-white p-8 pt-16 pb-8">
			<div className="absolute inset-0 z-0">
				<img src="/footer-light-bg-1.png" alt="footer bg" className="w-full h-full object-cover opacity-30" />
			</div>
			<div className="relative z-10 flex flex-wrap justify-between gap-8  mx-auto max-w-[1400px]">
				<div className="min-w-[320px] max-w-[400px] flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<img src="/ef-r-logo.png" alt="EFR Logo" className="h-16" />
					</div>
					<p className="text-white  text-base">
						Emirates Face Recognition (EFR), UAE-based since 2012, provides secure biometric solutions for global banks, fintechs, governments, and enterprises.
					</p>
					<form className="mt-4" onSubmit={handleSubscribe}>
						<div className="flex items-center bg-transparent border border-gray-500 rounded-xl px-4 py-2">
							<input
								type="email"
								placeholder="Enter Email"
								className="bg-transparent outline-none flex-1 text-white placeholder-gray-300"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
							<button type="submit" className="ml-2 text-white text-xl">→</button>
						</div>
						{subStatus && (
							<div className="text-xs mt-2 text-gray-300">{subStatus}</div>
						)}
					</form>
				</div>

				<div className="min-w-[180px]">
					<h3 className="font-semibold mb-2">Quick Links</h3>
					<ul className="space-y-1">
						<li>Home</li>
						<li>About Us</li>
						<li>Innovation Hub</li>
						<li>Press</li>
						<li>Career</li>
						<li>Contact Us</li>
					</ul>
							<div className="flex gap-3 mt-4">
								<a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
									<FaFacebookF className="text-blue-900"/>
								</a>
								<a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
									<FaInstagram  className="text-blue-900"/>
								</a>
								<a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
									<FaYoutube className="text-blue-900" />
								</a>
								<a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
									<FaXTwitter className="text-blue-900" />
								</a>
								<a href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
									<FaLinkedinIn className="text-blue-900" />
								</a>
							</div>
				</div>

				<div className="min-w-[220px]">
					<h3 className="font-semibold mb-2">Services</h3>
					<ul className="space-y-1">
						<li>Digital Onboarding Toolkit for KYC</li>
						<li>Secured Transactions with OTF</li>
						<li>Border Clearance</li>
						<li>Preemptive Surveillance</li>
						<li>Forensic Station</li>
					</ul>
				</div>

				<div className="min-w-[260px]">
					<h3 className="font-semibold mb-2">Connect Us</h3>
					<div className="mb-2">
						Emirates Face Recognition LLC PO Box 107755<br />
						Abu Dhabi United Arab Emirates
					</div>
							<div className="flex items-center gap-3 mb-2">
								<span className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-black text-xl">
									<FaPhoneAlt />
								</span>
								<div>
									<div className="font-semibold">Call Us</div>
									<div>+9712 622 8121</div>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<span className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-black text-xl">
									<FaEnvelope />
								</span>
								<div>
									<div className="font-semibold">Email Us</div>
									<div>info@facerecognition.ae</div>
								</div>
							</div>
				</div>
			</div>
			<div className="relative z-10 flex flex-wrap gap-6 justify-start items-center mt-12 max-w-[1400px] mx-auto">
								{[
									{src: "/1-2.png", alt: "ISO1"},
									{src: "/2-2.png", alt: "ISO3"},
									{src: "/3-1.png", alt: "ISO4"},
									{src: "/4-3.png", alt: "ISO5"},
									{src: "/5-2.png", alt: "ICV"},
									{src: "/2-1.png", alt: "ISO2"},
								].map((img, i) => (
									<img
										key={img.src}
										src={img.src}
										alt={img.alt}
										className="h-20 cursor-pointer transition-transform hover:scale-105"
										onClick={() => openModal(img.src)}
									/>
								))}
						</div>
						{modalOpen && (
							<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={closeModal}>
								<div className="bg-white rounded-lg p-4 max-w-full max-h-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
									<img src={modalImg} alt="Certification" className="max-h-[80vh] max-w-[90vw] object-contain" />
									
								</div>
							</div>
						)}
		</footer>
	);
}
