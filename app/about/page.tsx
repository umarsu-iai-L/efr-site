import type { Metadata } from "next";
import SectionPage, { SectionCard } from "../components/SectionPage";

export const metadata: Metadata = {
  title: "About Us | EFR",
  description:
    "Identity systems built for trust at every checkpoint — learn about EFR.",
};

export default function AboutPage() {
  return (
    <SectionPage
      eyebrow="02 / About Us"
      title="Identity Systems Built for Trust at Every Checkpoint"
      lead="EFR designs biometric experiences that feel invisible in motion and absolute in assurance — from first glance to final clearance."
    >
      <SectionCard
        title="Mission"
        body="We help organizations move people faster without compromising security, privacy, or operational clarity. Every product decision starts with real-world checkpoint pressure."
      />
      <SectionCard
        title="Approach"
        body="Our systems combine high-accuracy facial recognition with human-centered workflows, so teams can trust the signal and travelers can keep moving."
      />
      <SectionCard
        title="Where we operate"
        body="Airports, borders, secure facilities, and high-throughput environments where milliseconds matter and false friction is expensive."
      />
    </SectionPage>
  );
}
