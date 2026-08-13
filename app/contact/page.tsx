import type { Metadata } from "next";
import SectionPage, { SectionCard } from "../components/SectionPage";

export const metadata: Metadata = {
  title: "Contact Us | EFR",
  description: "Final approach — contact EFR for demos and partnerships.",
};

export default function ContactPage() {
  return (
    <SectionPage
      eyebrow="07 / Contact Us"
      title="Final Approach into Partnership"
      lead="Tell us about your environment, throughput goals, and compliance constraints. We’ll map the right biometric path forward."
    >
      <SectionCard
        title="Book a demo"
        body="See EFR in a scenario tailored to your lanes, cameras, and operational model."
      />
      <SectionCard
        title="Partnerships"
        body="Integrators, airports, and security programs can connect with our solutions team for joint deployments."
      />
      <SectionCard
        title="General inquiries"
        body="Reach out for product questions, press requests, or support pathways. We respond with clarity and next steps."
      />
    </SectionPage>
  );
}
