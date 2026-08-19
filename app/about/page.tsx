import type { Metadata } from "next";
import Image from "next/image";
import SectionPage, { SectionCard } from "../components/SectionPage";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
    title: "About Us | EFR",
    description:
        "Identity systems built for trust at every checkpoint — learn about EFR.",
};
const missionDescription = `CEO’s Message`
const missionTitle = "Shaping a Safer and Smarter Future"
const missionText =
    `Shaping a Safer and Smarter Future
Emirates Face Recognition (EFR) is a UAE-based pioneer in biometrics and facial recognition technology, built on principles of privacy, trust, and security.

Amongst the first to introduce this technology in the UAE, EFR supports the nation’s digital vision by delivering inclusive and accurate AI solutions across sectors.

With a mission to enhance safety and drive innovation, EFR empowers various industries such as law enforcement, finance, healthcare, and hospitality through intelligent, secure technologies. Led by a team committed to excellence and integrity, EFR aims to create a safer, smarter, and more connected world.

We are fortunate to operate in the UAE, a nation that not only embraces innovation but actively nurtures it. The UAE’s rich multicultural environment has enabled us to train our AI models in a way that reflects a wide spectrum of people and backgrounds, ensuring inclusivity, fairness, and unmatched accuracy across all ethnicities.

I am honored to lead a team of dedicated professionals who embody excellence, innovation, and integrity. Together, we are committed to delivering impactful solutions and building lasting partnerships that help shape a safer future.

Thank you,
EFR Team`
export default function AboutPage() {
    return (
        <SectionPage
            eyebrow="02 / About Us"
            title="Identity Systems Built for Trust at Every Checkpoint"
            lead="EFR designs biometric experiences that feel invisible in motion and absolute in assurance — from first glance to final clearance."
        >
            {/* Full-width Hero */}
            <section className="about-hero rounded-xl">
                <div className="about-hero__content">
                    <div className="about-hero__text">
                        <span>IDENTITY · SECURITY · TRUST</span>

                        <h2>
                            Seamless identity.
                            <br />
                            Trusted everywhere.
                        </h2>

                        <p>
                            Technology designed to make identity verification faster,
                            smarter, and more human.
                        </p>
                    </div>

                    <div className="about-hero__image">
                        <Image
                            src="/about-hero.svg"
                            alt="EFR biometric identity technology"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                    </div>
                </div>
            </section>

            <SectionCard
                Description={missionDescription}
                className="z-50 max-w-md ceo-msg"
                title={missionTitle}
                body={missionText}
            />

            <SectionCard
                className="about-approach-card col-span-full"
                Description="Our Mission & Values"
                title="Approach"
                body="At Emirates Face Recognition LLC, our mission is to harness the power of advanced biometric technologies to create safer, smarter, and more secure environments. We are guided by core values that shape every solution we deliver and every partnership we build.."
            ><div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        {
                            title: "Integrity",
                            icon: "solar:shield-check-bold-duotone",
                            description:
                                "We uphold the highest standards of honesty, transparency, and accountability in all that we do.",
                        },
                        {
                            title: "Excellence",
                            icon: "solar:cup-star-bold-duotone",
                            description:
                                "We are committed to delivering innovative, reliable, and world-class solutions that exceed expectations.",
                        },
                        {
                            title: "Collaboration",
                            icon: "solar:users-group-rounded-bold-duotone",
                            description:
                                "We believe in working hand-in-hand with clients, partners, and stakeholders to achieve shared goals.",
                        },
                        {
                            title: "Innovation",
                            icon: "solar:lightbulb-bolt-bold-duotone",
                            description:
                                "We continuously embrace cutting-edge technology and new ideas to stay ahead in a fast-changing world.",
                        },
                    ].map((value) => (
                        <div
                            key={value.title}
                            className="group/value rounded-2xl border border-[#124677]/10 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2f78bc]/25 hover:bg-white hover:shadow-[0_16px_36px_rgba(18,70,119,0.12)]"
                        >
                            <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2f78bc]/10 text-[#2f78bc] transition-transform duration-300 group-hover/value:scale-110">
                                <Icon
                                    icon={value.icon}
                                    width="24"
                                    height="24"
                                />
                            </span>
                            <h3 className="mb-3 text-xl font-semibold text-[#124677]">
                                {value.title}
                            </h3>

                            <p className="text-sm leading-7 text-slate-600">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div></SectionCard>

            <SectionCard
                title="Where we operate"
                body="Airports, borders, secure facilities, and high-throughput environments where milliseconds matter and false friction is expensive."
            />
        </SectionPage>
    );
}