"use client";

import { useEffect, useRef } from "react";
import {
  type Container,
  type ISourceOptions,
  tsParticles,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const STARFIELD_OPTIONS: ISourceOptions = {
  autoPlay: true,
  background: {
    color: {
      value: "transparent",
    },
  },
  clear: true,
  detectRetina: true,
  fpsLimit: 60,
  fullScreen: false,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "parallax",
      },
      onClick: {
        enable: false,
      },
      resize: {
        enable: true,
      },
    },
    modes: {
      parallax: {
        force: 60,
        smooth: 12,
      },
    },
  },
  particles: {
    color: {
      value: ["#3b82f6", "#9ad6ff", "#f8fbff"],
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out",
      },
      random: true,
      speed: 1,
    },
    number: {
      density: {
        enable: true,
      },
      value: 300,
    },
    opacity: {
      animation: {
        enable: true,
        speed: 0.6,
      },
      value: {
        min: 0.15,
        max: 0.5,
      },
    },
    shape: {
      type: "star",
    },
    size: {
      value: {
        min: 0.5,
        max: 2.25,
      },
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
};

export default function SpaceParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: Container | undefined;
    let disposed = false;
    let lastScrollY = window.scrollY;
    let scrollImpulse = 0;
    let animationFrame: number | undefined;
    let flightProgress = 0;

    const handleFlightProgress = (event: Event) => {
      const progress = (event as CustomEvent<{ progress?: number }>).detail?.progress;
      flightProgress = Math.min(1, Math.max(0, progress ?? 0));

      if (element) {
        element.style.opacity = `${1 - flightProgress * 0.62}`;
      }
    };

    const animateScrollTravel = () => {
      if (!particles || particles.destroyed) {
        animationFrame = undefined;
        return;
      }

      const centerX = particles.canvas.size.width / 2;
      const centerY = particles.canvas.size.height / 2;

      particles.particles.filter(() => true).forEach((particle) => {
        const position = particle.getPosition();
        const deltaX = position.x - centerX;
        const deltaY = position.y - centerY;
        const distance = Math.max(Math.hypot(deltaX, deltaY), 1);

        particle.velocity.x = particle.initialVelocity.x + (deltaX / distance) * scrollImpulse;
        particle.velocity.y = particle.initialVelocity.y + (deltaY / distance) * scrollImpulse;
      });

      scrollImpulse *= 0.9;

      if (Math.abs(scrollImpulse) > 0.01) {
        animationFrame = requestAnimationFrame(animateScrollTravel);
      } else {
        scrollImpulse = 0;
        particles.particles.filter(() => true).forEach((particle) => {
          particle.velocity.x = particle.initialVelocity.x;
          particle.velocity.y = particle.initialVelocity.y;
        });
        animationFrame = undefined;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (reduceMotion || scrollDelta === 0) return;

      const depthMultiplier = 1 + flightProgress * 2.5;
      const maxImpulse = 5 + flightProgress * 7;
      scrollImpulse = Math.max(
        -maxImpulse,
        Math.min(maxImpulse, scrollImpulse + scrollDelta * 0.009 * depthMultiplier),
      );

      if (animationFrame === undefined) {
        animationFrame = requestAnimationFrame(animateScrollTravel);
      }
    };

    const initialize = async () => {
      await loadSlim(tsParticles);

      if (disposed) return;

      particles = await tsParticles.load({
        element,
        options: {
          ...STARFIELD_OPTIONS,
          autoPlay: !reduceMotion,
        },
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("flight-progress-update", handleFlightProgress);
    void initialize();

    return () => {
      disposed = true;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("flight-progress-update", handleFlightProgress);
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      particles?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-20 h-screen w-screen"
      aria-hidden="true"
      style={{
        filter:
          "drop-shadow(0 0 3px rgba(191, 219, 254, 0.95)) drop-shadow(0 0 9px rgba(59, 130, 246, 0.7))",
      }}
    />
  );
}