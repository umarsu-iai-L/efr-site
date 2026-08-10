import React, { useRef } from "react";
import { useEffect, useState } from "react";

const trustImages = [
  "/trust1.png",
  "/trust2.png",
  "/trust3.png",
  "/trust4.png",
  "/trust5.png",
  "/trust6.png",
  "/trust7.png",
  "/trust8.png",
];

export default function TrustedScroller() {
  const scrollerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Infinite scroll effect
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let animationFrame;
    let speed = 0.7; // px per frame
    function animate() {
      scroller.scrollLeft += speed;
      // If reached end, reset to start
      if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
        scroller.scrollLeft = 0;
      }
      animationFrame = requestAnimationFrame(animate);
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Mouse drag to scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // drag speed
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Duplicate images for infinite effect
  const images = [...trustImages, ...trustImages];

  return (
    <div
      className="w-full overflow-x-hidden select-none"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div
        ref={scrollerRef}
        className="flex gap-8 items-center py-2"
        style={{ width: "100%", overflowX: "scroll", scrollBehavior: "auto", scrollbarWidth: "none" }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`trust${(i % trustImages.length) + 1}`}
            className="h-20 w-auto object-contain flex-shrink-0"
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}
