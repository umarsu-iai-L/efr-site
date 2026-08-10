"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ReactNode } from "react";

export interface CardCarouselSlide {
  alt?: string;
  description?: string;
  image?: string;
  src?: string;
  title?: string;
}

interface CardCarouselProps {
  slides: CardCarouselSlide[];
  subtitle?: string;
  title?: string;
}

function getImageSource(slide: CardCarouselSlide) {
  return slide.src ?? slide.image ?? "";
}

export default function CardCarousel({
  slides,
  subtitle,
  title,
}: CardCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (slides.length === 0) return null;

  const selectSlide = (nextIndex: number) => {
    setDirection(nextIndex > selectedIndex ? 1 : -1);
    setSelectedIndex((nextIndex + slides.length) % slides.length);
  };

  const previousIndex = (selectedIndex - 1 + slides.length) % slides.length;
  const nextIndex = (selectedIndex + 1) % slides.length;
  const hasMultipleSlides = slides.length > 1;
  const activeSlide = slides[selectedIndex];

  return (
    <section className="overflow-hidden bg-[#f8fafc] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {(title || subtitle) && (
          <div className="mx-auto mb-12 max-w-3xl text-center">
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative mx-auto max-w-6xl">
          <div className="relative flex h-[460px] items-center justify-center sm:h-[560px]">
            {hasMultipleSlides && (
              <>
                <PreviewCard slide={slides[previousIndex]} side="left" />
                <PreviewCard slide={slides[nextIndex]} side="right" />
              </>
            )}

            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.article
                key={selectedIndex}
                custom={direction}
                initial={{ opacity: 0, scale: 0.94, x: direction * 70 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.94, x: direction * -70 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 aspect-[3/5] h-[430px] overflow-hidden rounded-[2rem] border border-white/80 bg-slate-900 shadow-2xl shadow-slate-900/25 sm:h-[530px]"
              >
                <img
                  src={getImageSource(activeSlide)}
                  alt={activeSlide.alt ?? activeSlide.title ?? ""}
                  className="h-full w-full object-cover"
                />
                {(activeSlide.title || activeSlide.description) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-transparent p-7 pt-20 text-white">
                    {activeSlide.title && (
                      <h3 className="text-xl font-semibold">{activeSlide.title}</h3>
                    )}
                    {activeSlide.description && (
                      <p className="mt-2 text-sm text-white/80">
                        {activeSlide.description}
                      </p>
                    )}
                  </div>
                )}
              </motion.article>
            </AnimatePresence>
          </div>

          {hasMultipleSlides && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <CarouselButton
                ariaLabel="Show previous slide"
                onClick={() => selectSlide(previousIndex)}
              >
                &#8592;
              </CarouselButton>
              <div className="flex gap-2" aria-label="Carousel progress">
                {slides.map((slide, index) => (
                  <button
                    key={`${getImageSource(slide)}-${index}`}
                    type="button"
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={index === selectedIndex}
                    onClick={() => selectSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex
                        ? "w-8 bg-[#224474]"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
              <CarouselButton
                ariaLabel="Show next slide"
                onClick={() => selectSlide(nextIndex)}
              >
                &#8594;
              </CarouselButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PreviewCard({
  side,
  slide,
}: {
  side: "left" | "right";
  slide: CardCarouselSlide;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute hidden aspect-[3/5] h-[390px] overflow-hidden rounded-[1.75rem] border border-white/50 opacity-35 grayscale sm:block ${
        side === "left"
          ? "left-0 -translate-x-20"
          : "right-0 translate-x-20"
      }`}
      animate={{ opacity: 0.35, scale: 0.86 }}
      transition={{ duration: 0.35 }}
    >
      <img src={getImageSource(slide)} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-slate-950/25" />
    </motion.div>
  );
}

function CarouselButton({
  ariaLabel,
  children,
  onClick,
}: {
  ariaLabel: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="grid h-12 w-12 place-items-center rounded-full border border-slate-300 bg-white text-xl text-slate-900 shadow-sm transition hover:border-[#224474] hover:text-[#224474] focus:outline-none focus:ring-2 focus:ring-[#224474] focus:ring-offset-2"
    >
      {children}
    </motion.button>
  );
}
