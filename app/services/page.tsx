import type { Metadata } from "next";
import SectionPage, { SectionCard } from "../components/SectionPage";

export const metadata: Metadata = {
  title: "Services | EFR",
  description:
    "Operational security that feels fast, precise, and invisible.",
};

export default function ServicesPage() {
  return (
    <SectionPage
      eyebrow="03 / Services"
      title="Operational Security That Feels Fast, Precise, and Invisible"
      lead="From verification to access control, EFR services are engineered for throughput, auditability, and calm operator confidence."
    >
      <SectionCard
        title="Biometric verification"
        body="Real-time facial matching designed for dense queues, variable lighting, and multi-lane operations."
      />
      <SectionCard
        title="Access & compliance"
        body="Policy-aware workflows that keep security teams aligned with regulatory requirements without slowing the floor."
      />
      <SectionCard
        title="Integration programs"
        body="Deployment support, systems integration, and lifecycle optimization for environments that cannot afford downtime."
      />
    </SectionPage>
  );
}
