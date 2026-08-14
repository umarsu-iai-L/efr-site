"use client";

import type { Children, ReactNode } from "react";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionPageProps = {
    eyebrow: string;
    title: string;
    lead: string;
    children?: ReactNode;
};

export default function SectionPage({
    eyebrow,
    title,
    lead,
    children,
}: SectionPageProps) {
    const pageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const intro = gsap.timeline({
                    defaults: {
                        ease: "power3.out",
                    },
                });

                // Initial page elements
                intro
                    .from(".section-back", {
                        y: -20,
                        opacity: 0,
                        duration: 0.6,
                    })
                    .from(
                        ".section-eyebrow",
                        {
                            y: 20,
                            opacity: 0,
                            duration: 0.6,
                        },
                        "-=0.35"
                    )
                    .from(
                        ".section-title",
                        {
                            y: 45,
                            opacity: 0,
                            duration: 0.9,
                            ease: "power4.out",
                        },
                        "-=0.35"
                    )
                    .from(
                        ".section-lead",
                        {
                            y: 25,
                            opacity: 0,
                            duration: 0.7,
                        },
                        "-=0.5"
                    );

                // Cards reveal on scroll
                gsap.utils.toArray<HTMLElement>(".section-card").forEach(
                    (card, index) => {
                        gsap.fromTo(
                            card,
                            {
                                y: 70,
                                opacity: 0,
                                scale: 0.96,
                            },
                            {
                                y: 0,
                                opacity: 1,
                                scale: 1,
                                duration: 0.8,
                                ease: "power3.out",
                                delay: index * 0.08,
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 85%",
                                    toggleActions:
                                        "play none none reverse",
                                },
                            }
                        );

                        const descriptionUnderline = card.querySelector<HTMLElement>(
                            ".section-card__description-underline"
                        );

                        if (descriptionUnderline) {
                            gsap.fromTo(
                                descriptionUnderline,
                                { scaleX: 0 },
                                {
                                    scaleX: 1,
                                    duration: 0.9,
                                    ease: "power3.out",
                                    scrollTrigger: {
                                        trigger: card,
                                        start: "top 85%",
                                        toggleActions:
                                            "play none none reverse",
                                    },
                                }
                            );
                        }

                        // Card hover
                        const hoverIn = () => {
                            gsap.to(card, {
                                y: -8,
                                scale: 1.015,
                                rotateX: 1.5,
                                rotateY: -1.5,
                                duration: 0.35,
                                ease: "power2.out",
                            });
                        };

                        const hoverOut = () => {
                            gsap.to(card, {
                                y: 0,
                                scale: 1,
                                rotateX: 0,
                                rotateY: 0,
                                duration: 0.45,
                                ease: "power3.out",
                            });
                        };

                        card.addEventListener("mouseenter", hoverIn);
                        card.addEventListener("mouseleave", hoverOut);

                        return () => {
                            card.removeEventListener(
                                "mouseenter",
                                hoverIn
                            );
                            card.removeEventListener(
                                "mouseleave",
                                hoverOut
                            );
                        };
                    }
                );

                // Background floating blobs
                gsap.to(".bg-blob-left", {
                    x: 80,
                    y: 40,
                    scale: 1.15,
                    duration: 7,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });

                gsap.to(".bg-blob-right", {
                    x: -60,
                    y: -50,
                    scale: 1.2,
                    duration: 9,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });

                // Subtle parallax for the top glow
                gsap.to(".bg-top-glow", {
                    yPercent: 25,
                    ease: "none",
                    scrollTrigger: {
                        trigger: pageRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });
            });
            const ceoCard = document.querySelector(".section-card.z-50");

            if (ceoCard) {
                const paragraphs = ceoCard.querySelectorAll(
                    ".section-card__body p"
                );

                // Animate the card without changing its position
                gsap.fromTo(
                    ceoCard,
                    {
                        opacity: 0,
                        y: 35,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ceoCard,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                // Reveal paragraphs while keeping the card in place
                gsap.fromTo(
                    paragraphs,
                    {
                        opacity: 0,
                        y: 15,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.55,
                        stagger: 0.08,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ceoCard,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
            return () => mm.revert();
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={pageRef}
            className="relative min-h-screen w-full overflow-x-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef4fb_42%,#e8eef7_100%)]"
        >
            {/* Top glow */}
            <div
                className="
                    bg-top-glow
                    pointer-events-none
                    absolute
                    inset-x-0
                    top-0
                    h-[42vh]
                    bg-[radial-gradient(circle_at_top,_rgba(47,120,188,0.14),_transparent_62%)]
                "
            />

            {/* Floating left blob */}
            <div
                className="
                    bg-blob-left
                    pointer-events-none
                    absolute
                    -left-24
                    top-40
                    h-72
                    w-72
                    rounded-full
                    bg-[#2f78bc]/10
                    blur-3xl
                "
            />

            {/* Floating right blob */}
            <div
                className="
                    bg-blob-right
                    pointer-events-none
                    absolute
                    -right-16
                    bottom-24
                    h-80
                    w-80
                    rounded-full
                    bg-[#124677]/8
                    blur-3xl
                "
            />

            <div className="relative mx-auto w-full px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:pl-36 lg:pr-16">
                <article className="section-page-content flex w-full flex-col gap-10">
                    {/* Back button */}
                    <Link
                        href="/"
                        className="
                            section-back
                            group
                            inline-flex
                            w-fit
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#124677]/15
                            bg-white/70
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            uppercase
                            tracking-[0.16em]
                            text-[#124677]
                            shadow-sm
                            transition
                            duration-300
                            hover:-translate-x-1
                            hover:border-[#124677]/30
                            hover:bg-white
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            focus-visible:outline-[#124677]
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="
                                text-base
                                leading-none
                                transition-transform
                                duration-300
                                group-hover:-translate-x-0.5
                            "
                        >
                            ←
                        </span>

                        Back to home
                    </Link>

                    {/* Header */}
                    <header className="max-w-6xl space-y-5">
                        <p className="section-eyebrow text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2f78bc]">
                            {eyebrow}
                        </p>

                        <h1 className="max-w-[1100px] text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05] tracking-[-0.035em] text-[#124677]">
                            {title}
                        </h1>
                        <p className="section-lead max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
                            {lead}
                        </p>
                    </header>

                    {/* Cards */}
                    {children ? (
                        <div className="grid gap-5 md:grid-cols-2 [&>[class*=col-span-full]]:md:col-span-2">
                            {children}
                        </div>
                    ) : null}
                </article>
            </div>
        </div>
    );
}

type SectionCardProps = {
    title: string;
    body: string;
    className?: string;
    Description?: string
    children?: any
};

export function SectionCard({
    title,
    body,
    className = "",
    Description = "",
    children
}: SectionCardProps) {
    return (
        <article
            className={`
                section-card
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/70
                bg-white/70
                p-7
                shadow-[0_20px_60px_rgba(18,70,119,0.08)]
                backdrop-blur-xl
                will-change-transform
                transition-shadow
                duration-500
                hover:shadow-[0_30px_80px_rgba(18,70,119,0.15)]
                ${className}
            `}
        >
            {/* Animated card glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-40
                    w-40
                    rounded-full
                    bg-[#2f78bc]/10
                    blur-3xl
                    transition-all
                    duration-700
                    group-hover:scale-150
                "
            />

            {/* Accent line */}
            <div
                className="
                    absolute
                    left-0
                    top-0
                    h-1
                    w-0
                    bg-gradient-to-r
                    from-[#00273f]
                    to-[#006c9f]
                    transition-all
                    duration-700
                    group-hover:w-full
                "
            />

            <div className="relative z-10">
                {Description ? (
                    <div className="mb-4 w-fit">
                        <p className="section-card__description text-xs font-semibold uppercase tracking-[0.18em] text-[#2f78bc]">
                            {Description}
                        </p>
                        <span
                            aria-hidden="true"
                            className="section-card__description-underline mt-2 block h-px w-full origin-left bg-gradient-to-r from-[#00273f] via-[#006c9f] to-transparent"
                        />
                    </div>
                ) : null}
                <h2 className="section-card__title text-xl font-semibold text-[#124677]">
                    {title}
                </h2>

                <div className="section-card__body mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {body.split("\n\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
            {children && <div className="section-card__description-underline mt-2 block h-px w-full origin-left bg-gradient-to-r from-[#00273f] via-[#006c9f] to-transparent">{children}</div>}
        </article>
    );
}