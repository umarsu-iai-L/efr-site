import type { Metadata } from "next";
import SectionPage, { SectionCard } from "../components/SectionPage";

export const metadata: Metadata = {
  title: "Innovation | EFR",
  description: "Explore the next cluster of EFR identity innovation.",
};

export default function InnovationPage() {
  return (
    <SectionPage
      eyebrow="04 / Innovation"
      title="A New Cluster Begins Beyond the Transit Corridor"
      lead="Research and product experiments that push recognition quality, edge performance, and human-in-the-loop assurance."
    >
      <div className="col-span-full">
        <blockquote className="relative rounded-[1.75rem] border border-[#2f78bc]/20 bg-[linear-gradient(135deg,rgba(47,120,188,0.08),rgba(18,70,119,0.05))] px-8 py-7 shadow-[0_16px_48px_rgba(15,23,42,0.06)]">
          <span className="absolute left-6 top-4 text-6xl leading-none text-[#2f78bc]/20 select-none">&ldquo;</span>
          <p className="relative z-10 text-xl font-semibold italic leading-snug text-[#124677] sm:text-2xl">
            There is nothing called a free lunch.
          </p>
          <footer className="mt-3 text-sm font-medium tracking-wide text-slate-500">
            — The cost of progress is always paid somewhere
          </footer>
        </blockquote>
      </div>
      <SectionCard
        title="Edge intelligence"
        body="Models tuned for constrained hardware so accuracy stays high even when connectivity does not."
      />
      <SectionCard
        title="Adaptive capture"
        body="Smarter guidance and capture quality signals that reduce retries and improve first-pass success."
      />
      <SectionCard
        title="Trust architecture"
        body="Privacy-preserving patterns and explainable decision layers built for regulated deployments."
      />
    </SectionPage>
  );
}
