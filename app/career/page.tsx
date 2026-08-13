import type { Metadata } from "next";
import SectionPage, { SectionCard } from "../components/SectionPage";

export const metadata: Metadata = {
  title: "Career | EFR",
  description:
    "Bring human oversight into autonomous security systems with EFR.",
};

export default function CareerPage() {
  return (
    <SectionPage
      eyebrow="06 / Career"
      title="Bring Human Oversight into Autonomous Security Systems"
      lead="Join a team that cares about precision under pressure — engineers, designers, operators, and strategists shaping trusted identity."
    >
      <SectionCard
        title="Build what matters"
        body="Ship systems used in live environments where latency, clarity, and reliability are non-negotiable."
      />
      <SectionCard
        title="Cross-disciplinary craft"
        body="Collaborate across research, product, and field operations so every release survives contact with reality."
      />
      <SectionCard
        title="Open roles"
        body="We hire for curiosity, rigor, and calm execution. Explore openings and grow with the next generation of biometric infrastructure."
      />
    </SectionPage>
  );
}
