"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const runTransition = useCallback(
    (route: string) => {
      const overlay = overlayRef.current;
      if (!overlay) {
        router.push(route);
        return;
      }

      // Reset off-screen left, make visible
      overlay.style.transition = "none";
      overlay.style.transform = "translateX(-100%)";
      overlay.style.pointerEvents = "all";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Sweep across screen from left → right (feels like flying into the right)
          overlay.style.transition =
            "transform 360ms cubic-bezier(0.76, 0, 0.24, 1)";
          overlay.style.transform = "translateX(0)";

          overlay.addEventListener(
            "transitionend",
            () => {
              router.push(route);

              // Brief hold so new page can render, then sweep out to the right
              setTimeout(() => {
                overlay.style.transition =
                  "transform 420ms cubic-bezier(0.76, 0, 0.24, 1)";
                overlay.style.transform = "translateX(100%)";

                overlay.addEventListener(
                  "transitionend",
                  () => {
                    overlay.style.pointerEvents = "none";
                    // Snap back off-screen left, ready for next transition
                    overlay.style.transition = "none";
                    overlay.style.transform = "translateX(-100%)";
                  },
                  { once: true },
                );
              }, 60);
            },
            { once: true },
          );
        });
      });
    },
    [router],
  );

  useEffect(() => {
    const handler = (event: Event) => {
      const e = event as CustomEvent<{ route: string }>;
      if (e.detail?.route) runTransition(e.detail.route);
    };

    window.addEventListener("page-transition-start", handler as EventListener);
    return () =>
      window.removeEventListener(
        "page-transition-start",
        handler as EventListener,
      );
  }, [runTransition]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ transform: "translateX(-100%)" }}
    >
      {/* Leading edge accent stripe */}
      <div className="absolute inset-y-0 right-0 w-1 bg-[linear-gradient(180deg,#2f78bc,#124677)]" />
      {/* Main curtain */}
      <div className="absolute inset-0 bg-[linear-gradient(130deg,#f0f7ff_0%,#dbeafe_30%,#bfdbfe_60%,#93c5fd_100%)] opacity-[0.97]" />
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(18,70,119,0.12),transparent_55%)]" />
    </div>
  );
}
