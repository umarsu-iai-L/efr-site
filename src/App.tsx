import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./features/home";
import About from "./features/about";
import Innovation from "./features/innovation";
import Press from "./features/press";
import Career from "./features/career";
import Contact from "./features/contact";
import DigitalKYC from "./features/services/digitalKYC";
import OTF from "./features/services/otf";
import BorderClearance from "./features/services/borderClearance";
import Surveillance from "./features/services/surveillance";
import Forensic from "./features/services/forensic";
export default function App() {
  const pathname = usePathname();
  const routes: Record<string, ComponentType> = {
    "/": Home,
    "/about": About,
    "/innovation": Innovation,
    "/press": Press,
    "/career": Career,
    "/contact": Contact,
    "/services/digital-kyc": DigitalKYC,
    "/services/digitalKYC": DigitalKYC,
    "/services/otf": OTF,
    "/services/border-clearance": BorderClearance,
    "/services/borderClearance": BorderClearance,
    "/services/surveillance": Surveillance,
    "/services/forensic": Forensic,
  };
  const Page = routes[pathname] ?? Home;

  return (
    <>
      <Navbar />
      <Page />
      <Footer />
    </>
  );
}
