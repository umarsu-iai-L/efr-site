"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SpaceParticles from "./SpaceParticles";
import { BiRightArrow } from "react-icons/bi";

const TrustedPartnersBillboard = dynamic(() => import("./TrustedPartners"), {
  loading: () => <div className="h-20 bg-gradient-to-b from-black/50 to-transparent" />,
  ssr: true,
});

gsap.registerPlugin(ScrollTrigger);

type FlightCard = {
  id: string;
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: string;
  dynamicWords?: string[];
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
    dynamicWords: ["Speed", "Security", "Compliance"],
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
  containerRef,
  revealStart,
  revealEnd,
}: {
  card: FlightCard;
  index: number;
  isMobile: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  revealStart: number;
  revealEnd: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // AnimatedWords component: cycles through provided words using GSAP
  function AnimatedWords({
    words,
    textClass,
  }: {
    words: string[];
    textClass?: string;
  }) {
    const container = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (!container.current) return;
      const children = Array.from(container.current.querySelectorAll(".anim-word")) as HTMLElement[];
      if (!children.length) return;

      // Start with all hidden and rotated
      children.forEach((el) => 
        gsap.set(el, { 
          rotationX: 90, 
          autoAlpha: 0,
          transformOrigin: "center center",
        })
      );
      
      // Make the first word visible immediately
      gsap.set(children[0], { rotationX: 0, autoAlpha: 1 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      children.forEach((el, index) => {
        // 3D flip in from back
        tl.to(
          el, 
          { 
            rotationX: 0, 
            autoAlpha: 1, 
            duration: 0.6, 
            ease: "back.out"
          },
          index === 0 ? 0 : "+=0"
        );
        
        // Stay visible and static
        tl.to(
          el,
          { duration: 3.5 },
          "+=0"
        );
        
        // 3D flip out to back
        tl.to(
          el,
          {
            rotationX: -90,
            autoAlpha: 0,
            duration: 0.6,
            ease: "back.in"
          }
        );
      });

      return () => {
        tl.kill();
      };
    }, [words]);

    const longestWord = words.reduce((a, b) => (a.length >= b.length ? a : b), words[0]);

    return (
      <span
        className={`inline-block relative align-middle ml-2 overflow-hidden ${textClass ?? ""}`}
        aria-hidden
        style={{ 
          lineHeight: 1.1,
          perspective: "1000px",
          display: "inline-flex",
          alignItems: "center"
        }}
      >
        <span className="invisible absolute whitespace-nowrap">{longestWord}</span>
        <span 
          ref={container} 
          className="relative inline-flex items-center justify-start font-bold"
          style={{
            position: "relative",
            width: "auto",
            height: "1em"
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="anim-word absolute left-0 top-1/2 whitespace-nowrap text-current"
              style={{ 
                willChange: "transform, opacity",
                transformStyle: "preserve-3d",
                transform: "translateY(-50%)",
              }}
            >
              {w}
            </span>
          ))}
        </span>
      </span>
    );
  }

  // Helper to extract title prefix when animating words
  const getTitlePrefix = (title: string, words?: string[]) => {
    if (!words || words.length === 0) return title;
    const first = words[0];
    const idx = title.indexOf(first);
    return idx >= 0 ? title.slice(0, idx) : title;
  };

  useEffect(() => {
    if (!cardRef.current || !containerRef.current || isMobile) return;

    const thisStop = sectionProgressStops[index];
    const nextStop = sectionProgressStops[index + 1] ?? 1;
    // window after the peak where the card fades out as camera flies past
    const exitStart = thisStop + (nextStop - thisStop) * 0.35;
    const exitEnd = thisStop + (nextStop - thisStop) * 0.72;

    const trigger = gsap.to(cardRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          let opacity = 0;
          let blur = 0;
          let scale = 1;

          if (progress < revealStart) {
            opacity = index === 0 ? 1 : 0.22;
            blur = index === 0 ? 0 : 3.2;
            scale = index === 0 ? 1 : 0.95;
          } else if (progress < revealEnd) {
            opacity = gsap.utils.mapRange(revealStart, revealEnd, index === 0 ? 1 : 0.42, 1, progress);
            blur = gsap.utils.mapRange(revealStart, revealEnd, index === 0 ? 0 : 2.1, 0, progress);
            scale = gsap.utils.mapRange(revealStart, revealEnd, index === 0 ? 1 : 0.97, 1, progress);
          } else if (index < cards.length - 1 && progress < exitStart) {
            opacity = 1;
            blur = 0;
            scale = 1;
          } else if (index < cards.length - 1 && progress < exitEnd) {
            // fade out as camera flies past this card
            const t = (progress - exitStart) / (exitEnd - exitStart);
            opacity = 1 - t;
            blur = t * 4;
            scale = 1 + t * 0.06;
          } else if (index < cards.length - 1) {
            opacity = 0;
            blur = 4;
            scale = 1.06;
          } else {
            opacity = 1;
          }

          gsap.set(cardRef.current, {
            opacity: Math.min(1, Math.max(0, opacity)),
            filter: `blur(${blur}px)`,
            scale,
          });
        },
      },
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      duration: 0,
    });

    return () => {
      trigger.scrollTrigger?.kill();
      trigger.kill();
    };
  }, [card, index, isMobile, containerRef, revealStart, revealEnd]);

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

  return (
    <div
      ref={cardRef}
      style={{
        width: isMobile ? "min(90vw, 420px)" : card.width,
        transform: isMobile ? "translateX(0)" : `translate3d(${card.x}px, 0, ${card.z}px)`,
      }}
      className={`absolute flex rounded-[1.5rem] border p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10 ${panelClass}`}
    >
      <div className={`flex w-full flex-col ${alignmentClass}`}>
        <span
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] ${badgeClass}`}
        >
          {card.eyebrow}
        </span>
        <div
          className={`mt-5 max-w-[22ch] text-2xl font-semibold leading-tight sm:mt-6 sm:text-3xl lg:text-5xl ${titleClass}`}
        >
          {card.dynamicWords && card.dynamicWords.length ? (
            <>
              {getTitlePrefix(card.title, card.dynamicWords)}
              <AnimatedWords words={card.dynamicWords} textClass={titleClass} />
            </>
          ) : (
            card.title
          )}
        </div>
        <p
          className={`mt-4 max-w-[38ch] text-sm leading-6 sm:mt-5 sm:text-base sm:leading-7 lg:text-xl ${bodyClass}`}
        >
          {card.description}
        </p>
        <button
          type="button"
          className={`mt-6 rounded-full border px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-1 flex gap-2 items-center sm:mt-8 ${buttonClass}`}
        >
          {card.cta} <BiRightArrow></BiRightArrow>
        </button>
      </div>
    </div>
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
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const gifRef = useRef<HTMLDivElement>(null);
  const glowTopRef = useRef<HTMLDivElement>(null);
  const glowDeepRef = useRef<HTMLDivElement>(null);
  const movingSceneRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);
        setIsDark(progress >= 0.36);

        // Color interpolation
        const getColor = (progress: number, stops: number[], colors: string[]) => {
          let colorStart = colors[0];
          let colorEnd = colors[0];
          let progressStart = 0;
          let progressEnd = 1;

          for (let i = 0; i < stops.length; i++) {
            if (progress >= stops[i]) {
              if (i < stops.length - 1) {
                colorStart = colors[i];
                colorEnd = colors[i + 1];
                progressStart = stops[i];
                progressEnd = stops[i + 1];
              } else {
                colorStart = colors[i];
                colorEnd = colors[i];
              }
            }
          }

          const ratio = (progress - progressStart) / (progressEnd - progressStart);
          return ratio > 0.5 ? colorEnd : colorStart;
        };

        const topColorStops = [0, 0.28, 0.44, 0.62, 1];
        const topColorValues = ["#ffffff", "#eff6ff", "#0f172a", "#040b1f", "#020617"];
        const bottomColorStops = [0, 0.28, 0.44, 0.62, 1];
        const bottomColorValues = ["#eef5ff", "#d8ebff", "#091225", "#020617", "#01030a"];

        const topColor = getColor(progress, topColorStops, topColorValues);
        const bottomColor = getColor(progress, bottomColorStops, bottomColorValues);

        if (sceneRef.current) {
          sceneRef.current.style.background = `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`;
        }

        // Hero image opacity, X, and scale
        let heroOpacity = 1;
        let heroX = 0;
        let heroScale = 1;
        let heroY = 20;

        if (progress < 0.16) {
          heroOpacity = 1;
          heroX = 0;
          heroScale = 1;
        } else if (progress < 0.42) {
          const heroProgress = (progress - 0.16) / (0.42 - 0.16);
          heroOpacity = 1 - (heroProgress * 0.6);
          heroX = heroProgress * 120;
          heroScale = 1 + (heroProgress * 0.06 - heroProgress * 0.22);
          heroY = -14 * heroProgress;
        } else {
          heroOpacity = 1;
          heroX = 120;
          heroScale = 0.84;
          heroY = -14;
        }

        if (heroImageRef.current) {
          gsap.set(heroImageRef.current, {
            opacity: heroOpacity,
            x: heroX,
            y: heroY,
            scale: heroScale,
          });
        }

        // Glow animations
        if (glowTopRef.current) {
          const lightGlowOpacity = progress < 0.28 ? 1 : progress < 0.42 ? 0.8 - (progress - 0.28) / (0.42 - 0.28) * 0.8 : 0;
          gsap.set(glowTopRef.current, { opacity: lightGlowOpacity });
        }

        if (glowDeepRef.current) {
          const deepGlowOpacity = progress < 0.42 ? 0 : progress < 0.58 ? (progress - 0.42) / (0.58 - 0.42) * 0.8 : 0.8;
          gsap.set(glowDeepRef.current, { opacity: deepGlowOpacity });
        }

        if (gifRef.current) {
          // tighter offsets so GIF sits closer to the first card
          // const gifX = cards[0].x + (isMobile ? 240 : 360);
          // const gifZ = cards[0].z + (isMobile ? 60 : 120);
          // const gifY = progress < 0.26 ? 0 : progress < 0.42 ? (progress - 0.26) / (0.42 - 0.26) * -8 : -8;
          // gsap.set(gifRef.current, {
          //   opacity: progress < 0.08 ? 0 : 1,
          //   x: gifX,
          //   y: gifY,
          //   z: gifZ + progress * (isMobile ? 60 : 90),
          // });
          if (gifRef.current) {
            // pushed further right so it clears the (up to 780px-wide) first card
            const gifX = cards[0].x + (isMobile ? 240 : 640);
            const gifZ = cards[0].z + (isMobile ? 60 : 140);
            const gifY = progress < 0.26 ? 0 : progress < 0.42 ? (progress - 0.26) / (0.42 - 0.26) * -8 : -8;
            gsap.set(gifRef.current, {
              opacity: 1,
              x: gifX,
              y: gifY,
              z: gifZ + progress * (isMobile ? 60 : 90),
            });
          }
        }

        // Camera Z position
        const zCam = progress * (isMobile ? 7800 : 8400);
        if (movingSceneRef.current) {
          movingSceneRef.current.style.transform = `translateZ(${zCam}px)`;
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [isMobile]);

  useEffect(() => {
    if (!heroImageRef.current) return;

    // Keep the brand/logo static and minimally styled — remove continuous animation.
    // Use gsap.set only to ensure consistent initial styling across renders.
    gsap.set(heroImageRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotateZ: 0,
    });
  }, []);

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
    const progress = Math.min(1, Math.max(0, scrollProgress));
    const activeId = getActiveSectionId(progress);

    window.dispatchEvent(
      new CustomEvent("flight-progress-update", {
        detail: { progress, activeId },
      }),
    );
  }, [scrollProgress]);

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
      <SpaceParticles />
      <div
        ref={containerRef}
        className="relative h-[1100vh] w-full bg-transparent"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden [perspective:1100px]"
        >
          <div
            ref={sceneRef}
            className="absolute inset-0"
            style={{ opacity: 0.8 }}
          />
          <div
            ref={glowTopRef}
            className="absolute inset-x-0 top-0 h-[45vh] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_62%)]"
          />
          <div
            ref={glowDeepRef}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,_rgba(56,189,248,0.12),_transparent_48%)]"
          />

          <div
            ref={heroImageRef}
            // place logo near the bottom-right on large screens with minimal animation
            className="pointer-events-none absolute right-[7vw] bottom-0 hidden w-[24vw] min-w-[260px] rounded-[2.2rem] bg-white/10 p-6 backdrop-blur-md lg:flex"
          >
            <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[1.8rem]">
              <Image
                src={isDark ? "/EFR-3D.png" : "/EFR-B-3D.png"}
                alt="EFR 3D Logo"
                width={520}
                height={360}
                className={`h-full w-full object-contain ${isDark ? "mix-blend-multiply" : "mix-blend-screen"}`}
                priority
              />
            </div>
          </div>

          <div
            ref={movingSceneRef}
            style={{
              transformStyle: "preserve-3d",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              ref={gifRef}
              className="pointer-events-none absolute hidden h-[40vh] w-[18vw] min-w-[220px] rounded-[2rem] border border-white/30 bg-white/10 p-4 shadow-xl backdrop-blur-xl lg:flex z-0"
              style={{
                opacity: 1,
                transform: `translate3d(${cards[0].x + 640}px, -12px, ${cards[0].z + 140}px)`,
              }}
            >
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.8rem]">
                <Image
                  src="/h-c3.gif"
                  alt="Flight animation"
                  width={320}
                  height={320}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
            {cards.map((card, index) => (
              <BillboardCard
                key={card.id}
                card={card}
                index={index}
                isMobile={isMobile}
                containerRef={containerRef}
                revealStart={getRevealWindow(index).start}
                revealEnd={getRevealWindow(index).end}
              />
            ))}
          </div>
        </div>
      </div>
      <TrustedPartnersBillboard />
    </>
  );
}
