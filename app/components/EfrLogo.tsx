"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type EfrLogoProps = {
  width?: number;
  height?: number;
  className?: string;
  /** Force a specific theme instead of listening to flight events */
  theme?: "light" | "dark";
};

export default function EfrLogo({ width = 120, height = 42, className = "", theme }: EfrLogoProps) {
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    if (theme !== undefined) return;

    const handler = (event: Event) => {
      const e = event as CustomEvent<{ progress?: number }>;
      const progress = e.detail?.progress ?? 0;
      setIsDark(progress >= 0.36);
    };

    window.addEventListener("flight-progress-update", handler as EventListener);
    return () => window.removeEventListener("flight-progress-update", handler as EventListener);
  }, [theme]);

  return (
    <Image
      src={isDark ? "/EFR-3D.png" : "/EFR-B-3D.png"}
      alt="EFR Logo"
      width={width}
      height={height}
      className={`object-contain transition-opacity duration-500 ${className}`}
      priority
    />
  );
}
