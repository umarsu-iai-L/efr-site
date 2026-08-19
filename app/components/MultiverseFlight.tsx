"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Lenis from '@studio-freight/lenis'
const cardRoutes: Record<string, string> = {
  about: "/about",
  services: "/services",
  innovation: "/innovation",
  press: "/press",
  career: "/career",
  contact: "/contact",
};

function dispatchPageTransition(route: string) {
  window.dispatchEvent(
    new CustomEvent("page-transition-start", { detail: { route } }),
  );
}

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

// Static gradient layers crossfaded via opacity (GPU-compositable) instead of
// recomputing a `linear-gradient(...)` string from interpolated hex values on
// every scroll tick, which forces a style recalc + repaint at 60fps.
const sceneColorStops = [
  { stop: 0, top: "#ffffff", bottom: "#eef5ff" },
  { stop: 0.16, top: "#eff6ff", bottom: "#d8ebff" },
  { stop: 0.3, top: "#124677", bottom: "#124677" },
  { stop: 0.5, top: "#124677", bottom: "#124677" },
  { stop: 0.7, top: "#0f172a", bottom: "#091225" },
  { stop: 0.84, top: "#040b1f", bottom: "#020617" },
  { stop: 1, top: "#020617", bottom: "#01030a" },
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

// Scroll targets tuned to land in each card's stable focus zone (not oversized/exit phase).
const sectionNavTargetMap: Record<string, number> = Object.fromEntries(
  cards.map((card, index) => [
    card.id,
    index === 0 ? 0 : (() => {
      const current = sectionProgressStops[index];
      const next = sectionProgressStops[index + 1] ?? 1;
      const rightSpan = Math.max(next - current, 0.08);
      const settleOffset = Math.min(rightSpan * 0.18, 0.032);
      return Math.min(current + settleOffset, next - 0.018, 1);
    })(),
  ])
);

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

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateWindowScrollTo(targetY: number, duration = 1000) {
  if (typeof window === "undefined") return;

  const startY = window.scrollY;
  const deltaY = targetY - startY;
  const startTime = performance.now();

  const tick = (now: number) => {
    const elapsed = Math.min(1, (now - startTime) / duration);
    const eased = easeInOutCubic(elapsed);
    window.scrollTo({ top: startY + deltaY * eased, behavior: "auto" });

    if (elapsed < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

// AnimatedWords component: cycles through provided words using GSAP.
// Declared at module scope (not inside BillboardCard) so React sees a stable
// component type across renders instead of a brand-new one every time
// BillboardCard re-renders — that's what was triggering "Components created
// during render" and forcing AnimatedWords to remount (losing its GSAP
// timeline/state) on every parent re-render.
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

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    tl.set(children, {
      rotationX: 90,
      autoAlpha: 0,
      transformOrigin: "center center",
    });

    children.forEach((el, index) => {
      tl.set(children.filter((_, childIndex) => childIndex !== index), {
        autoAlpha: 0,
      });

      // 3D flip in one word at a time.
      tl.to(
        el,
        {
          rotationX: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "back.out"
        },
        index === 0 ? 0 : "+=0",
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
        alignItems: "center",
        width: "max-content",
      }}
    >
      <span className="invisible whitespace-nowrap font-bold">{longestWord}</span>
      <span
        ref={container}
        className="pointer-events-none absolute left-0 top-1/2 inline-flex -translate-y-1/2 items-center justify-start font-bold"
        style={{
          height: "1em",
          width: "100%",
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
              opacity: i === 0 ? 1 : 0,
              visibility: i === 0 ? "visible" : "hidden",
            }}
          >
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}

// How far behind its resting z-point a card starts, so it visibly sails
// forward into place during its reveal window instead of just fading in.
const SAIL_DISTANCE = 260;

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
  containerRef: React.RefObject<HTMLDivElement> | null;
  revealStart: number;
  revealEnd: number;
}) {
  const shouldPreMountContent = index <= 1;
  const mountLead = index <= 1 ? 0.02 : 0.06;
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentMountedRef = useRef(shouldPreMountContent);
  const contentAnimatedRef = useRef(shouldPreMountContent);
  const [contentMounted, setContentMounted] = useState(shouldPreMountContent);

  // GSAP owns the desktop transform so React re-renders never stomp it.
  // These must match the timeline's pre-reveal keyframe exactly below, since
  // the reveal tween animates FROM whatever the element's current value is.
  useLayoutEffect(() => {
    if (isMobile || !cardRef.current) return;
    const preReveal =
      index === 0
        ? { opacity: 1, blur: 0, scale: 1, z: card.z }
        : { opacity: 0.22, blur: 3.2, scale: 0.95, z: card.z - SAIL_DISTANCE };
    gsap.set(cardRef.current, {
      x: card.x,
      z: preReveal.z,
      opacity: preReveal.opacity,
      scale: preReveal.scale,
      filter: preReveal.blur > 0 ? `blur(${preReveal.blur}px)` : "none",
      pointerEvents: index === 0 ? "auto" : "none",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stagger home card content in on mount
  useEffect(() => {

    if (index !== 0 || isMobile || !contentRef.current) return;
    const els = Array.from(contentRef.current.children);
    gsap.fromTo(els,
      { y: 14, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.4 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper to extract title prefix when animating words
  const getTitlePrefix = (title: string, words?: string[]) => {
    if (!words || words.length === 0) return title;
    const first = words[0];
    const idx = title.indexOf(first);
    return idx >= 0 ? title.slice(0, idx) : title;
  };

  useEffect(() => {
    if (!cardRef.current || !containerRef?.current || isMobile) return;

    const el = cardRef.current;
    const isLast = index === cards.length - 1;
    const thisStop = sectionProgressStops[index];
    const nextStop = sectionProgressStops[index + 1] ?? 1;
    // window after the peak where the card fades out as camera flies past
    const exitStart = thisStop + (nextStop - thisStop) * 0.35;
    const exitEnd = thisStop + (nextStop - thisStop) * 0.72;

    const preReveal =
      index === 0
        ? { opacity: 1, blur: 0, scale: 1, z: card.z }
        : { opacity: 0.22, blur: 3.2, scale: 0.95, z: card.z - SAIL_DISTANCE };
    const stable = { opacity: 1, blur: 0, scale: 1, z: card.z };
    const postExit = { opacity: 0, blur: 4, scale: 1.06, z: card.z };

    // Applies a rounded blur() during a tween's own onUpdate (only fires
    // while that tween is actually active, i.e. for a fraction of the
    // scroll range) instead of every frame across the whole scrollbar.
    const setRoundedBlur = (from: number, to: number, self: gsap.core.Tween) => {
      const blur = from + (to - from) * self.progress();
      const rounded = Math.round(blur);
      gsap.set(el, { filter: rounded > 0 ? `blur(${rounded}px)` : "none" });
    };

    // Real GSAP tweens let the engine pre-calculate the interpolation and
    // only run per-frame work while a given tween is in its active window —
    // no more evaluating an if/else chain for every card on every scroll
    // tick regardless of whether that card is anywhere near the viewport.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;

          // Lazy-mount content just before the card becomes visible
          if (!contentMountedRef.current && progress >= Math.max(0, revealStart - mountLead)) {
            contentMountedRef.current = true;
            setContentMounted(true);
          }

          if (
            contentMountedRef.current &&
            !contentAnimatedRef.current &&
            contentRef.current &&
            progress >= Math.max(0, revealStart + 0.005)
          ) {
            contentAnimatedRef.current = true;
            const els = Array.from(contentRef.current.children);
            gsap.fromTo(
              els,
              { y: 18, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.65, ease: "power3.out" },
            );
          }
        },
      },
    });

    // Sail/fade into the stable, focused position.
    tl.to(
      el,
      {
        z: stable.z,
        opacity: stable.opacity,
        scale: stable.scale,
        duration: Math.max(revealEnd - revealStart, 0.0001),
        ease: "none",
        onUpdate: function (this: gsap.core.Tween) {
          setRoundedBlur(preReveal.blur, stable.blur, this);
        },
      },
      revealStart,
    );

    // Only the fully-focused, unblurred stable phase should accept clicks —
    // otherwise a faded/blurred card can sit in front of the active one and
    // swallow pointer events meant for its button.
    tl.set(el, { pointerEvents: "auto" }, revealEnd);

    if (!isLast) {
      // For most cards exitStart falls comfortably after revealEnd, leaving
      // a real "stable" gap where nothing touches opacity/scale/blur. But
      // for cards whose gap to the *next* section is much smaller than their
      // gap to the *previous* one (e.g. "innovation"), raw exitStart can
      // land before revealEnd. Clamping the fade's start to revealEnd keeps
      // it from ever overlapping the reveal tween — two tweens racing to set
      // the same properties in the same window produces a visibly janky,
      // non-monotonic fade, and would also leave pointerEvents stuck "auto"
      // forever (its "none" set firing before the reveal tween's "auto" set).
      const fadeStart = Math.max(exitStart, revealEnd);

      // Fade out as the camera flies past this card.
      tl.to(
        el,
        {
          opacity: postExit.opacity,
          scale: postExit.scale,
          duration: Math.max(exitEnd - exitStart, 0.0001),
          ease: "none",
          onUpdate: function (this: gsap.core.Tween) {
            setRoundedBlur(stable.blur, postExit.blur, this);
          },
        },
        fadeStart,
      );
      tl.set(el, { pointerEvents: "none" }, fadeStart);
    }

    // Pad the timeline out to progress 1 so the ScrollTrigger scrub maps
    // scroll progress directly onto timeline time 1:1 — without this, the
    // timeline's own duration (ending at whichever keyframe was added last)
    // would get stretched to fill the scrub range, shifting every keyframe.
    tl.to({}, { duration: 0 }, 1);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [card, index, isMobile, containerRef, revealStart, revealEnd, mountLead]);

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
  const loaderPanelClass =
    "border-white/30 bg-white/14 shadow-[0_20px_64px_rgba(20,40,90,0.14)]";
  const badgeClass = isLight
    ? "border-[#124677]/15 bg-[#124677]/10 text-[#124677]"
    : "border-sky-200/12 bg-sky-200/8 text-sky-100";
  const buttonClass = isLight
    ? "border-blue-200 bg-white/72 text-[#124677] hover:bg-blue-50"
    : "border-sky-200/20 bg-white/10 text-sky-50 hover:bg-white/14";
  const loaderTintClass = isLight ? "bg-white/35" : "bg-white/18";
  const loaderLineClass = isLight ? "bg-[#124677]/12" : "bg-white/22";

  return (
    <div
      ref={cardRef}
      style={{
        width: isMobile ? "min(90vw, 420px)" : card.width,
        // desktop transform is set by GSAP via useLayoutEffect; only mobile needs inline transform
        ...(isMobile ? { transform: "translateX(0)" } : {}),
      }}
      className={`absolute flex rounded-[1.5rem] border p-5 backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10 ${contentMounted ? panelClass : loaderPanelClass}`}
    >
      {contentMounted ? (
        <div ref={contentRef} className={`flex w-full flex-col ${alignmentClass}`}>
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
            onClick={() => {
              const route = cardRoutes[card.id];
              if (route) dispatchPageTransition(route);
            }}
            className={`mt-6 rounded-full border px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-1 flex gap-2 items-center sm:mt-8 ${buttonClass}${cardRoutes[card.id] ? "" : " opacity-0 pointer-events-none"}`}
          >
            {card.cta} <Icon icon="bi:arrow-right" />
          </button>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={`pointer-events-none relative flex h-full min-h-[240px] w-full items-stretch overflow-hidden rounded-[1.25rem] ${loaderTintClass}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.38),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.22),transparent_38%)] opacity-90" />
          <div className="absolute inset-0 backdrop-blur-md" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.24)_30%,transparent_55%)] animate-pulse" />
          <div className={`relative z-10 flex w-full flex-col ${alignmentClass} justify-end gap-3 p-6 opacity-90`}>
            <div className={`h-9 w-34 rounded-full border ${loaderLineClass}`} />
            <div className={`h-8 w-3/4 rounded-xl ${loaderLineClass}`} />
            <div className={`h-8 w-2/3 rounded-xl ${loaderLineClass}`} />
            <div className={`mt-1 h-4 w-5/6 rounded-full ${loaderLineClass}`} />
            <div className={`h-4 w-2/3 rounded-full ${loaderLineClass}`} />
            <div className={`mt-2 h-11 w-32 rounded-full border ${loaderLineClass}`} />
          </div>
        </div>
      )}
    </div>
  );
}

function MobileCard({ card }: { card: FlightCard }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mountedRef = useRef(false);
  const [contentMounted, setContentMounted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !mountedRef.current) {
          mountedRef.current = true;
          setContentMounted(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
      ref={sectionRef}
      id={`section-${card.id}`}
      className={`w-full rounded-3xl border p-5 backdrop-blur-xl sm:p-6 ${panelClass}`}
      style={{ minHeight: "180px" }}
    >
      {contentMounted ? (
        <div className="flex w-full flex-col items-start text-left">
          <span className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${badgeClass}`}>
            {card.eyebrow}
          </span>
          <h2 className={`mt-4 text-2xl font-semibold leading-tight ${titleClass}`}>
            {card.title}
          </h2>
          <p className={`mt-3 text-sm leading-6 ${bodyClass}`}>{card.description}</p>
          <button
            type="button"
            onClick={() => {
              const route = cardRoutes[card.id];
              if (route) dispatchPageTransition(route);
            }}
            className={`mt-5 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-300 ${buttonClass}${cardRoutes[card.id] ? "" : " opacity-0 pointer-events-none"}`}
          >
            {card.cta}
          </button>
        </div>
      ) : (
        <div className="animate-pulse space-y-3 pt-1">
          <div className="h-5 w-24 rounded-full bg-current opacity-10" />
          <div className="h-7 w-4/5 rounded-lg bg-current opacity-10" />
          <div className="h-4 w-full rounded-md bg-current opacity-[0.07]" />
          <div className="h-4 w-3/4 rounded-md bg-current opacity-[0.07]" />
          <div className="mt-3 h-9 w-28 rounded-full bg-current opacity-10" />
        </div>
      )}
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
  const sceneLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const gifRef = useRef<HTMLDivElement>(null);
  const glowTopRef = useRef<HTMLDivElement>(null);
  const glowDeepRef = useRef<HTMLDivElement>(null);
  const movingSceneRef = useRef<HTMLDivElement>(null);
  const currentSectionIndexRef = useRef(0);
  const isGlidingRef = useRef(false);

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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Clean up
    return () => lenis.destroy()
  }, [])
  useEffect(() => {
    if (!containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        if (containerRef.current) {
          if (progress >= 0.36) {
            containerRef.current.classList.add("theme-dark");
          } else {
            containerRef.current.classList.remove("theme-dark");
          }
        }

        // Crossfade between two adjacent static gradient layers via opacity
        // (GPU-compositable) instead of recomputing a gradient string from
        // interpolated hex values on every tick.
        let segmentIndex = 0;
        for (let i = 0; i < sceneColorStops.length - 1; i++) {
          if (progress >= sceneColorStops[i].stop) segmentIndex = i;
        }
        const segStart = sceneColorStops[segmentIndex].stop;
        const segEnd = sceneColorStops[segmentIndex + 1]?.stop ?? 1;
        const segT = Math.min(1, Math.max(0, (progress - segStart) / Math.max(segEnd - segStart, 0.0001)));

        sceneLayerRefs.current.forEach((el, i) => {
          if (!el) return;
          const opacity = i === segmentIndex ? 1 - segT : i === segmentIndex + 1 ? segT : 0;
          gsap.set(el, { opacity });
        });

        // Fade logo out gently as scene darkens
        const heroOpacity = progress < 0.28 ? 1 : progress < 0.44 ? 1 - (progress - 0.28) / (0.30 - 0.10) * 1 : 1;

        if (heroImageRef.current) {
          gsap.set(heroImageRef.current, { opacity: heroOpacity });
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
    gsap.set(heroImageRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
  }, []);

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>;
      const targetId = customEvent.detail?.id;
      const targetProgress = targetId
        ? sectionNavTargetMap[targetId]
        : undefined;
      const container = containerRef.current;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

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
      const targetTop = containerTop + scrollableHeight * targetProgress;

      if (prefersReducedMotion) {
        window.scrollTo({ top: targetTop, behavior: "auto" });
        return;
      }

      animateWindowScrollTo(targetTop, 950);
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
    const activeIndex = cards.findIndex((card) => card.id === activeId);
    if (activeIndex >= 0) currentSectionIndexRef.current = activeIndex;

    window.dispatchEvent(
      new CustomEvent("flight-progress-update", {
        detail: { progress, activeId },
      }),
    );
  }, [scrollProgress]);

  // A deliberate double-scroll (two same-direction wheel ticks in quick
  // succession) or an arrow key press glides to the next/previous section.
  // A single, ordinary wheel tick is left completely alone so normal
  // scrolling stays native and smooth instead of being hijacked every time.
  useEffect(() => {
    if (isMobile) return;

    const wheelTickCountRef = { current: 0 };
    const lastWheelDirectionRef = { current: 0 };
    let wheelResetTimeout: number | undefined;
    const WHEEL_TICKS_TO_GLIDE = 2;
    const WHEEL_TICK_WINDOW_MS = 260;

    const glideToIndex = (targetIndex: number) => {
      const container = containerRef.current;
      if (!container) return;

      const clampedIndex = Math.max(0, Math.min(cards.length - 1, targetIndex));
      const targetId = cards[clampedIndex].id;
      const targetProgress = sectionNavTargetMap[targetId] ?? 0;

      const containerTop = window.scrollY + container.getBoundingClientRect().top;
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const targetTop = containerTop + scrollableHeight * targetProgress;

      currentSectionIndexRef.current = clampedIndex;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        window.scrollTo({ top: targetTop, behavior: "auto" });
        return;
      }

      const duration = 850;
      isGlidingRef.current = true;
      animateWindowScrollTo(targetTop, duration);
      window.setTimeout(() => {
        isGlidingRef.current = false;
      }, duration + 60);
    };

    const isWithinContainer = () => {
      const container = containerRef.current;
      if (!container) return false;
      const rect = container.getBoundingClientRect();
      return rect.top <= 0 && rect.bottom >= window.innerHeight;
    };

    const canGlide = (direction: number) => {
      const atFirstSection = currentSectionIndexRef.current === 0;
      const atLastSection = currentSectionIndexRef.current === cards.length - 1;
      if (direction < 0 && atFirstSection) return false;
      if (direction > 0 && atLastSection) return false;
      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isWithinContainer()) return;

      // Swallow extra ticks while a glide animation is already in flight so
      // trackpad momentum can't fight the programmatic scroll and stutter.
      if (isGlidingRef.current) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
      if (direction === 0 || !canGlide(direction)) return;

      if (direction !== lastWheelDirectionRef.current) {
        wheelTickCountRef.current = 0;
      }
      lastWheelDirectionRef.current = direction;
      wheelTickCountRef.current += 1;

      if (wheelResetTimeout !== undefined) window.clearTimeout(wheelResetTimeout);
      wheelResetTimeout = window.setTimeout(() => {
        wheelTickCountRef.current = 0;
      }, WHEEL_TICK_WINDOW_MS);

      if (wheelTickCountRef.current < WHEEL_TICKS_TO_GLIDE) {
        // First tick: let it scroll normally, no interception.
        return;
      }

      event.preventDefault();
      wheelTickCountRef.current = 0;
      glideToIndex(currentSectionIndexRef.current + direction);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditableTarget =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);
      if (isEditableTarget) return;

      const direction =
        event.key === "ArrowDown" || event.key === "ArrowRight"
          ? 1
          : event.key === "ArrowUp" || event.key === "ArrowLeft"
            ? -1
            : 0;
      if (direction === 0) return;
      if (!isWithinContainer() || isGlidingRef.current || !canGlide(direction)) return;

      event.preventDefault();
      glideToIndex(currentSectionIndexRef.current + direction);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      if (wheelResetTimeout !== undefined) window.clearTimeout(wheelResetTimeout);
    };
  }, [isMobile]);

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
        <div
          ref={stickyRef}
          className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden [perspective:1100px]"
        >
          <div
            ref={sceneRef}
            className="absolute inset-0"
            style={{ opacity: 0.8 }}
          >
            {sceneColorStops.map((layer, i) => (
              <div
                key={layer.stop}
                ref={(el) => {
                  sceneLayerRefs.current[i] = el;
                }}
                className="absolute inset-0 will-change-[opacity]"
                style={{
                  background: `linear-gradient(180deg, ${layer.top} 0%, ${layer.bottom} 100%)`,
                  opacity: i === 0 ? 1 : 0,
                }}
              />
            ))}
          </div>
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

          >
            <div className="relative flex aspect-[2.8/1] w-full items-center justify-center overflow-hidden rounded-[1.8rem]">
              {/* <Image
                src="/EFR-B-3D.png"
                alt="EFR 3D Logo"
                fill
                sizes="18vw"
                className={`object-contain mix-blend-screen transition-opacity duration-700 ease-in-out ${isDark ? "opacity-0" : "opacity-100"}`}
                priority
              /> */}
              {/* <Image
                src="/EFR-3D.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="18vw"
                className={`object-contain mix-blend-multiply transition-opacity duration-700 ease-in-out ${isDark ? "opacity-100" : "opacity-0"}`}
                priority
              /> */}
            </div>
          </div>

          <div
            ref={movingSceneRef}

            style={{
              willChange: "transform",
              transformStyle: "preserve-3d"
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
                  unoptimized
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
