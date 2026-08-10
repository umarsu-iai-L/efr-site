"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import TrustedPartnersBillboard from "./TrustedPartners";

type FlightCard = {
  id: string;
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  align: "left" | "right";
  x: number;
  z: number;
  width: string;
  tone: "light" | "dark";
};

const cards: FlightCard[] = [
  {
    id: "home",
    eyebrowIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
  <path fill="currentColor" d="M5 19v-8.692q0-.384.172-.727t.474-.565l5.385-4.078q.423-.323.966-.323t.972.323l5.385 4.077q.303.222.474.566q.172.343.172.727V19q0 .402-.299.701T18 20h-3.384q-.344 0-.576-.232q-.232-.233-.232-.576v-4.769q0-.343-.232-.575q-.233-.233-.576-.233h-2q-.343 0-.575.233q-.233.232-.233.575v4.77q0 .343-.232.575T9.385 20H6q-.402 0-.701-.299T5 19"></path>
</svg>`,
    eyebrow: "01 / Home",
    title: "Next-Generation Facial Recognition for Speed, Security, Compliance",
    description:
      "We are at the forefront of providing cutting-edge biometric solutions to enhance security, streamline services, and revolutionize industries.",
    cta: "Explore More",
    align: "left",
    x: -320,
    z: 0,
    width: "clamp(360px, 48vw, 780px)",
    tone: "light",
  },
  {
    id: "about",
    eyebrow: "02 / About Us",
    title: "Identity Systems Built for Trust at Every Checkpoint",
    description:
      "Move through the first cluster as if each billboard is one section of a single flagship landing page, stitched together through depth instead of flat scrolling.",
    cta: "About EFR",
    align: "right",
    x: 280,
    z: -950,
    width: "clamp(300px, 36vw, 580px)",
    tone: "light",
  },
  {
    id: "services",
    eyebrow: "03 / Services",
    title: "Operational Security That Feels Fast, Precise, and Invisible",
    description:
      "Verification, access control, and compliance workflows stay grouped in the same cinematic fly-through before the experience opens into the next environment.",
    cta: "View Services",
    align: "left",
    x: -250,
    z: -1850,
    width: "clamp(320px, 40vw, 640px)",
    tone: "light",
  },
  {
    id: "innovation",
    eyebrow: "04 / Innovation",
    title: "A New Cluster Begins Beyond the Transit Corridor",
    description:
      "The longer empty stretch between groups creates a deliberate handoff, with the environment darkening before the next narrative stack comes into range.",
    cta: "Explore Innovation",
    align: "right",
    x: 260,
    z: -4700,
    width: "clamp(360px, 46vw, 760px)",
    tone: "dark",
  },
  {
    id: "press",
    eyebrow: "05 / Press",
    title: "Signals, Announcements, and Public Visibility in Orbit",
    description:
      "This second group uses the same flight language, but the darker atmosphere makes it feel like a distinct page reached through distance, not a hard cut.",
    cta: "Latest Press",
    align: "left",
    x: -290,
    z: -5750,
    width: "clamp(320px, 39vw, 620px)",
    tone: "dark",
  },
  {
    id: "career",
    eyebrow: "06 / Career",
    title: "Bring Human Oversight into Autonomous Security Systems",
    description:
      "Use this position as another billboard in the same cluster, ready for hiring, culture, or talent content once the next page narrative is defined.",
    cta: "Join the Team",
    align: "right",
    x: 300,
    z: -6800,
    width: "clamp(340px, 41vw, 680px)",
    tone: "dark",
  },
  {
    id: "contact",
    eyebrow: "07 / Contact Us",
    title: "Final Approach into a Soft, Faded White Horizon",
    description:
      "The closing card settles into the distant end state while the particle field shifts toward white, preparing the handoff into whatever comes next.",
    cta: "Contact EFR",
    align: "left",
    x: -220,
    z: -7900,
    width: "clamp(360px, 44vw, 740px)",
    tone: "dark",
  },
];

const sectionProgressMap: Record<string, number> = {
  home: 0,
  about: 0.11,
  services: 0.22,
  innovation: 0.56,
  press: 0.69,
  career: 0.81,
  contact: 0.92,
};

const sectionProgressStops = cards.map((card) => sectionProgressMap[card.id]);

function getActiveSectionId(progress: number) {
  let activeId = cards[0]?.id ?? "home";

  for (let i = 0; i < cards.length; i++) {
    const stop = sectionProgressMap[cards[i].id];
    if (progress >= stop) {
      activeId = cards[i].id;
    }
  }

  return activeId;
}

function getRevealWindow(index: number) {
  if (index === 0) {
    return { start: 0, end: 0.01 };
  }

  const previous = sectionProgressStops[index - 1];
  const current = sectionProgressStops[index];
  const span = Math.max(current - previous, 0.08);

  return {
    start: Math.max(previous + span * 0.74, 0),
    end: Math.min(current + span * 0.16, 1),
  };
}

function getFocusWindow(index: number) {
  const current = sectionProgressStops[index];
  const previous = index > 0 ? sectionProgressStops[index - 1] : 0;
  const next =
    index < sectionProgressStops.length - 1
      ? sectionProgressStops[index + 1]
      : 1;

  const leftSpan = Math.max(current - previous, 0.08);
  const rightSpan = Math.max(next - current, 0.08);

  return {
    start: Math.max(current - leftSpan * 0.7, 0),
    peak: current,
    end: Math.min(current + rightSpan * 0.65, 1),
  };
}

function BillboardCard({
  card,
  index,
  isMobile,
  scrollYProgress,
  revealStart,
  revealEnd,
}: {
  card: FlightCard;
  index: number;
  isMobile: boolean;
  scrollYProgress: MotionValue<number>;
  revealStart: number;
  revealEnd: number;
}) {
  const isLight = card.tone === "light";
  const alignmentClass =
    isMobile || card.align === "left"
      ? "items-start text-left"
      : "items-end text-right";
  const titleClass = isLight ? "text-[#124677]" : "text-sky-50";
  const bodyClass = isLight ? "text-slate-600" : "text-slate-100/90";
  const panelClass = isLight
    ? "border-white/85 bg-white/74 shadow-[0_20px_64px_rgba(20,40,90,0.16)]"
    : "border-white/20 bg-slate-950/78 shadow-[0_24px_90px_rgba(2,8,23,0.52)]";
  const badgeClass = isLight
    ? "border-[#124677]/15 bg-[#124677]/10 text-[#124677]"
    : "border-sky-200/12 bg-sky-200/8 text-sky-100";
  const buttonClass = isLight
    ? "border-blue-200 bg-white/72 text-[#124677] hover:bg-blue-50"
    : "border-sky-200/20 bg-white/10 text-sky-50 hover:bg-white/14";
  const baseRotate = isMobile ? 0 : card.align === "left" ? 8 : -8;
  const focus = getFocusWindow(index);
  const upcomingOpacity = useTransform(
    scrollYProgress,
    [0, revealStart, revealEnd, 1],
    [index === 0 ? 1 : 0.22, index === 0 ? 1 : 0.42, 1, 1],
  );
  const upcomingBlur = useTransform(
    scrollYProgress,
    [0, revealStart, revealEnd, 1],
    [index === 0 ? 0 : 3.2, index === 0 ? 0 : 2.1, 0, 0],
  );
  const upcomingScale = useTransform(
    scrollYProgress,
    [0, revealStart, revealEnd, 1],
    [index === 0 ? 1 : 0.95, index === 0 ? 1 : 0.97, 1, 1],
  );
  const straightening = useTransform(
    scrollYProgress,
    [focus.start, focus.peak, focus.end],
    [0, 1, 0],
  );
  const activeRotateY = useTransform(
    straightening,
    (v) => baseRotate * Math.max(0, 1 - v * 1.45),
  );
  const activeReadabilityBoost = useTransform(straightening, [0, 1], [0, 1]);
  const effectiveBlur = useTransform(
    () => upcomingBlur.get() * (1 - straightening.get()),
  );
  const effectiveOpacity = useTransform(() =>
    Math.min(1, upcomingOpacity.get() + activeReadabilityBoost.get() * 0.38),
  );
  const cardFilter = useMotionTemplate`blur(${effectiveBlur}px)`;

  return (
    <motion.div
      style={{
        width: isMobile ? "min(90vw, 420px)" : card.width,
        translateX: isMobile ? 0 : card.x,
        translateZ: card.z,
        rotateY: activeRotateY,
        opacity: effectiveOpacity,
        filter: cardFilter,
        scale: upcomingScale,
      }}
      animate={{ y: [0, -10 - (index % 3) * 2, 0] }}
      transition={{
        duration: 5 + index * 0.25,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute flex rounded-[1.5rem] border p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10 ${panelClass}`}
    >
      <motion.div
        className={`flex w-full flex-col ${alignmentClass}`}
        style={{
          opacity: useTransform(activeReadabilityBoost, [0, 1], [0.9, 1]),
        }}
      >
        <span
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] ${badgeClass}`}
        >
          {card.eyebrow}
        </span>
        <h2
          className={`mt-5 max-w-[22ch] text-2xl font-semibold leading-tight sm:mt-6 sm:text-3xl lg:text-5xl ${titleClass}`}
        >
          {card.title}
        </h2>
        <p
          className={`mt-4 max-w-[38ch] text-sm leading-6 sm:mt-5 sm:text-base sm:leading-7 lg:text-xl ${bodyClass}`}
        >
          {card.description}
        </p>
        <button
          type="button"
          className={`mt-6 rounded-full border px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-1 sm:mt-8 ${buttonClass}`}
        >
          {card.cta}
        </button>
      </motion.div>
    </motion.div>
  );
}

function MobileCard({ card }: { card: FlightCard }) {
  const isLight = card.tone === "light";
  const titleClass = isLight ? "text-[#124677]" : "text-sky-100";
  const bodyClass = isLight ? "text-slate-600" : "text-slate-300";
  const panelClass = isLight
    ? "border-white/80 bg-white/70 shadow-lg"
    : "border-white/12 bg-slate-950/45 shadow-[0_18px_40px_rgba(2,8,23,0.35)]";
  const badgeClass = isLight
    ? "border-[#124677]/15 bg-[#124677]/10 text-[#124677]"
    : "border-sky-200/12 bg-sky-200/8 text-sky-100";
  const buttonClass = isLight
    ? "border-blue-200 bg-white/80 text-[#124677]"
    : "border-sky-200/20 bg-white/10 text-sky-50";

  return (
    <section
      id={`section-${card.id}`}
      className={`w-full rounded-3xl border p-5 backdrop-blur-xl sm:p-6 ${panelClass}`}
    >
      <div className="flex w-full flex-col items-start text-left">
        <span
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${badgeClass}`}
        >
          {card.eyebrow}
        </span>
        <h2
          className={`mt-4 text-2xl font-semibold leading-tight ${titleClass}`}
        >
          {card.title}
        </h2>
        <p className={`mt-3 text-sm leading-6 ${bodyClass}`}>
          {card.description}
        </p>
        <button
          type="button"
          className={`mt-5 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-300 ${buttonClass}`}
        >
          {card.cta}
        </button>
      </div>
    </section>
  );
}

export default function MultiverseFlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const zCamera = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? 7800 : 8400],
  );
  const topColor = useTransform(
    scrollYProgress,
    [0, 0.28, 0.44, 0.62, 1],
    ["#ffffff", "#eff6ff", "#0f172a", "#040b1f", "#020617"],
  );
  const bottomColor = useTransform(
    scrollYProgress,
    [0, 0.28, 0.44, 0.62, 1],
    ["#eef5ff", "#d8ebff", "#091225", "#020617", "#01030a"],
  );
  const sceneBackground = useMotionTemplate`linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`;
  const heroImageOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.26],
    [1, 1, 0],
  );
  const heroImageX = useTransform(scrollYProgress, [0, 0.26], [0, 120]);
  const heroImageScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.26],
    [1, 1.06, 0.84],
  );
  const lightGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.42],
    [1, 0.8, 0],
  );
  const deepGlowOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.58, 1],
    [0, 0.8, 1],
  );

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>;
      const targetId = customEvent.detail?.id;
      const targetProgress = targetId
        ? sectionProgressMap[targetId]
        : undefined;
      const container = containerRef.current;

      if (window.innerWidth < 1024 && targetId) {
        document.getElementById(`section-${targetId}`)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      if (targetProgress === undefined || !container) {
        return;
      }

      const containerTop =
        window.scrollY + container.getBoundingClientRect().top;
      const scrollableHeight = container.offsetHeight - window.innerHeight;

      window.scrollTo({
        top: containerTop + scrollableHeight * targetProgress,
        behavior: "smooth",
      });
    };

    window.addEventListener(
      "navigate-flight-section",
      handleNavigation as EventListener,
    );

    return () => {
      window.removeEventListener(
        "navigate-flight-section",
        handleNavigation as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const progress = Math.min(1, Math.max(0, value));
      const activeId = getActiveSectionId(progress);

      window.dispatchEvent(
        new CustomEvent("flight-progress-update", {
          detail: { progress, activeId },
        }),
      );
    });

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-x-hidden bg-transparent pt-24"
      >
        <div className="mx-auto flex w-full max-w-xl flex-col gap-5">
          {cards.map((card) => (
            <MobileCard key={card.id} card={card} />
          ))}
        </div>
        <div className="mt-14">
          <TrustedPartnersBillboard />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-[1100vh] w-full bg-transparent"
      >
        <div className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden [perspective:1100px]">
          <motion.div
            className="absolute inset-0"
            style={{ background: sceneBackground, opacity: 0.8 }}
          />
          <motion.div
            className="absolute inset-x-0 top-0 h-[45vh] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_62%)]"
            style={{ opacity: lightGlowOpacity }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,_rgba(56,189,248,0.12),_transparent_48%)]"
            style={{ opacity: deepGlowOpacity }}
          />

          <motion.div
            className="pointer-events-none absolute right-[7vw] top-1/2 hidden h-[52vh] w-[24vw] min-w-[260px] -translate-y-1/2 rounded-[2.2rem] border border-white/40 bg-white/10 p-6 backdrop-blur-md lg:flex"
            style={{
              opacity: heroImageOpacity,
              x: heroImageX,
              scale: heroImageScale,
            }}
            animate={{ y: [0, -14, 0], rotateZ: [0, 1.2, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[1.8rem]">
              <Image
                src="/EFR-3D.png"
                alt="EFR 3D Logo"
                width={520}
                height={360}
                className="h-full w-full object-contain mix-blend-multiply"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            style={{
              translateZ: zCamera,
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {cards.map((card, index) => (
              <BillboardCard
                key={card.id}
                card={card}
                index={index}
                isMobile={isMobile}
                scrollYProgress={scrollYProgress}
                revealStart={getRevealWindow(index).start}
                revealEnd={getRevealWindow(index).end}
              />
            ))}
          </motion.div>
        </div>
      </div>
      <TrustedPartnersBillboard />
    </>
  );
}
