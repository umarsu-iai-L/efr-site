"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EfrLogo from "./EfrLogo";

const sectionRoutes: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  innovation: "/innovation",
  press: "/press",
  career: "/career",
  contact: "/contact",
};

function pathToSectionId(pathname: string) {
  if (pathname === "/") return "home";
  const match = Object.entries(sectionRoutes).find(
    ([, route]) => route === pathname,
  );
  return match?.[0] ?? "home";
}

const navLinks = [
  {
    label: "Home",
    id: "home",
    svgPath: (
      <path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1" />
    ),
  },
  {
    label: "About Us",
    id: "about",
    svgPath: (
      <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c.02.01.03.03.04.04c1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5" />
    ),
  },
  {
    label: "Services",
    id: "services",
    svgPath: (
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2m5-3s1.5 2 4 2s4-2 4-2M9 9h.01M15 9h.01" />
    ),
  },
  {
    label: "Innovation",
    id: "innovation",
    svgPath: (
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M5.143 14A7.8 7.8 0 0 1 4 9.919C4 5.545 7.582 2 12 2s8 3.545 8 7.919A7.8 7.8 0 0 1 18.857 14" />
        <path d="M7.383 17.098c-.092-.276-.138-.415-.133-.527a.6.6 0 0 1 .382-.53c.104-.041.25-.041.54-.041h7.656c.291 0 .436 0 .54.04a.6.6 0 0 1 .382.531c.005.112-.041.25-.133.527c-.17.511-.255.767-.386.974a2 2 0 0 1-1.2.869c-.238.059-.506.059-1.043.059h-3.976c-.537 0-.806 0-1.043-.06a2 2 0 0 1-1.2-.868c-.131-.207-.216-.463-.386-.974ZM15 19l-.13.647c-.14.707-.211 1.06-.37 1.34a2 2 0 0 1-1.113.912C13.082 22 12.72 22 12 22s-1.082 0-1.387-.1a2 2 0 0 1-1.113-.913c-.159-.28-.23-.633-.37-1.34L9 19" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m12.308 12l-1.461-4.521A.72.72 0 0 0 10.154 7a.72.72 0 0 0-.693.479L8 12m7-5v5m-6.462-1.5h3.231" />
      </g>
    ),
  },
  {
    label: "Press",
    id: "press",
    svgPath: (
      <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11l5 5v11q0 .825-.587 1.413T19 21zm2-4h10v-2H7zm0-4h10v-2H7zm8-4h4l-4-4zM7 9h5V7H7z" />
    ),
  },
  {
    label: "Career",
    id: "career",
    svgPath: (
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" d="M11.007 21H9.605c-3.585 0-5.377 0-6.491-1.135S2 16.903 2 13.25s0-5.48 1.114-6.615S6.02 5.5 9.605 5.5h3.803c3.585 0 5.378 0 6.492 1.135c.857.873 1.054 2.156 1.1 4.365" />
        <path d="M17.111 13.255c.185-.17.277-.255.389-.255s.204.085.389.255l.713.657c.086.079.129.119.182.138c.054.02.112.018.23.013l.962-.038c.248-.01.372-.014.457.057s.102.194.135.44l.132.986c.016.114.023.17.051.22c.028.048.073.083.163.154l.776.61c.192.152.288.227.307.335s-.046.212-.174.42l-.526.847c-.06.097-.09.146-.1.2s.002.111.026.223l.209.978c.05.24.076.36.021.456s-.172.134-.405.21l-.926.301c-.11.036-.166.054-.209.09c-.043.037-.07.089-.123.192l-.452.871c-.115.223-.173.334-.278.372s-.22-.01-.452-.106l-.888-.368c-.109-.045-.163-.068-.22-.068s-.111.023-.22.068l-.888.368c-.232.096-.347.144-.452.106s-.163-.15-.278-.372l-.452-.871c-.054-.103-.08-.155-.123-.191s-.099-.055-.209-.09l-.926-.302c-.233-.076-.35-.114-.405-.21s-.03-.215.021-.456l.21-.978c.023-.112.035-.168.025-.222a.6.6 0 0 0-.1-.2l-.525-.848c-.13-.208-.194-.312-.175-.42s.115-.183.307-.334l.776-.61c.09-.072.135-.107.163-.156s.035-.105.05-.22l.133-.985c.033-.245.05-.369.135-.44s.209-.067.457-.057l.963.038c.117.005.175.007.229-.013c.053-.02.096-.059.182-.138zM16 5.5l-.1-.31c-.495-1.54-.742-2.31-1.331-2.75C13.979 2 13.197 2 11.63 2h-.263c-1.565 0-2.348 0-2.937.44c-.59.44-.837 1.21-1.332 2.75L7 5.5" />
      </g>
    ),
  },
  {
    label: "Contact Us",
    id: "contact",
    svgPath: (
      <path fill="currentColor" d="M13.17 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41l-4.83-4.83c-.37-.38-.88-.59-1.41-.59M12 10c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m4 8H8v-.57c0-.81.48-1.53 1.22-1.85a6.95 6.95 0 0 1 5.56 0A2.01 2.01 0 0 1 16 17.43z" />
    ),
  },
];

function navigateToSection(id: string) {
  window.dispatchEvent(new CustomEvent("navigate-flight-section", { detail: { id } }));
}

const sectionProgressMap: Record<string, number> = {
  home: 0,
  about: 0.11,
  services: 0.22,
  innovation: 0.56,
  press: 0.69,
  career: 0.81,
  contact: 0.92,
};

export default function NeumorphicNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeId, setActiveId] = useState(() => pathToSectionId(pathname));
  const [journeyProgress, setJourneyProgress] = useState(
    () => sectionProgressMap[pathToSectionId(pathname)] ?? 0,
  );
  const [isDark, setIsDark] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setActiveId(pathToSectionId(pathname));
    setJourneyProgress(sectionProgressMap[pathToSectionId(pathname)] ?? 0);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;

    const handleProgressUpdate = (event: Event) => {
      const e = event as CustomEvent<{ progress?: number; activeId?: string }>;
      const progress = e.detail?.progress;
      const nextActive = e.detail?.activeId;
      if (typeof progress === "number") {
        setJourneyProgress(Math.min(1, Math.max(0, progress)));
        setIsDark(progress >= 0.36);
      }
      if (nextActive) setActiveId(nextActive);
    };

    window.addEventListener("flight-progress-update", handleProgressUpdate as EventListener);
    return () => window.removeEventListener("flight-progress-update", handleProgressUpdate as EventListener);
  }, [isHome]);

  const handleNavigate = (id: string) => {
    const route = sectionRoutes[id] ?? "/";
    setActiveId(id);
    setJourneyProgress(sectionProgressMap[id] ?? 0);

    if (isHome) {
      navigateToSection(id);
      return;
    }

    router.push("/");
  };

  const activeDot = isDark ? "bg-sky-300" : "bg-[#124677]";
  const labelActive = isDark ? "text-sky-200" : "text-[#124677]";
  const labelInactive = isDark ? "text-slate-300" : "text-slate-500";
  const iconActive = isDark ? "text-sky-200" : "text-[#124677]";
  const iconInactive = isDark ? "text-slate-400" : "text-slate-400";
  const panelBg = isDark
    ? "border-white/10 bg-slate-900/80"
    : "border-white/50 bg-white/75";
  const dividerColor = isDark ? "bg-white/10" : "bg-slate-200";
  const trackColor = isDark ? "bg-white/10" : "bg-slate-200";
  const fillColor = isDark
    ? "bg-[linear-gradient(90deg,#38bdf8,#7dd3fc)]"
    : "bg-[linear-gradient(90deg,#2f78bc,#124677)]";

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2">
      <div className={`relative overflow-hidden rounded-2xl border shadow-[0_16px_48px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-colors duration-500 ${panelBg}`}>

        <div className="flex items-center gap-1 px-3 py-2 sm:px-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavigate("home")}
            aria-label="Go to home"
            className="mr-1 shrink-0 flex items-center"
          >
            <EfrLogo width={64} height={28} className="h-7 w-auto" />
          </button>

          <div className={`mx-2 h-6 w-px shrink-0 ${dividerColor}`} />

          {/* Nav links */}
          <div className="flex flex-1 items-center justify-between gap-0.5 overflow-x-auto scrollbar-none">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavigate(link.id)}
                  aria-label={link.label}
                  aria-current={isActive ? "page" : undefined}
                  className="group relative flex min-w-0 flex-col items-center gap-0.5 rounded-xl px-2.5 py-1.5 transition-all duration-200 hover:bg-black/5 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className={`shrink-0 transition-colors duration-200 ${isActive ? iconActive : iconInactive}`}
                  >
                    {link.svgPath}
                  </svg>
                  <span
                    className={`hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 sm:block ${isActive ? labelActive : labelInactive}`}
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <span className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${activeDot}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal progress strip */}
        <div className={`absolute bottom-0 left-0 h-0.5 w-full ${trackColor}`}>
          <div
            className={`h-full rounded-full transition-[width] duration-500 ease-out ${fillColor}`}
            style={{ width: `${Math.max(2, journeyProgress * 100)}%` }}
          />
        </div>
      </div>
    </nav>
  );
}
