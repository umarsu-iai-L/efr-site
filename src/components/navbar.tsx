import { useNavigate } from "../navigation";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between py-2 px-12 items-center text-sm">
    
      <a href="/">
        <img src="/ef-r-logo.png" alt="EFR Logo" className="h-14" />
      </a>

      <ul className="flex space-x-6 text-gray-900 font-[400]">
        <li className="uppercase cursor-pointer border-b border-transparent">
          <span
            onClick={() => navigate("/")}
            className="inline-block transition-transform duration-200 hover:text-gray-900"
          >
            Home
          </span>
        </li>

        <li className="uppercase cursor-pointer border-b border-transparent hover:border-gray-300">
          <span
            onClick={() => navigate("/about")}
            className="inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-gray-900"
          >
            About Us
          </span>
        </li>

        <li className="relative group uppercase cursor-pointer border-b border-transparent hover:border-gray-300">
          <span className="inline-block transition-transform duration-200 hover:-translate-y-1">
            Services
          </span>

          <ul className="absolute text-[10px] left-1/2 -translate-x-1/2 mt-2 w-56 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-auto transition-opacity duration-200 z-20">
            {[
              { label: "Digital Onboarding Toolkit for KYC", path: "/services/digital-kyc" },
              { label: "Secured Transactions with OTF", path: "/services/otf" },
              { label: "Border Clearance", path: "/services/border-clearance" },
              { label: "Preemptive Surveillance", path: "/services/surveillance" },
              { label: "Forensic Station", path: "/services/forensic" },
            ].map((item) => (
              <li
                key={item.label}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </li>

        <li className="uppercase cursor-pointer border-b border-transparent hover:border-gray-300">
          <span
            onClick={() => navigate("/innovation")}
            className="inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-gray-900"
          >
            Innovation
          </span>
        </li>

        <li className="uppercase cursor-pointer border-b border-transparent hover:border-gray-300">
          <span
            onClick={() => navigate("/press")}
            className="inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-gray-900"
          >
            Press
          </span>
        </li>

        <li className="uppercase cursor-pointer border-b border-transparent hover:border-gray-300">
          <span
            onClick={() => navigate("/career")}
            className="inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-gray-900"
          >
            Career
          </span>
        </li>

        <li className="uppercase cursor-pointer border-b border-transparent hover:border-gray-300">
          <span
            onClick={() => navigate("/contact")}
            className="inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-gray-900"
          >
            Contact Us
          </span>
        </li>
      </ul>

      <div
        className="bg-[#224474] text-[12px] font-[400] text-white py-[6px] px-[18px] rounded-[66px] cursor-pointer"
        onClick={() => navigate("/contact")}
      >
        <span className="uppercase">Book a Demo</span>
      </div>
    </nav>
  );

}