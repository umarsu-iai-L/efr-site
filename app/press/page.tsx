import type { Metadata } from "next";
import SectionPage, { SectionCard } from "../components/SectionPage";

export const metadata: Metadata = {
  title: "Press | EFR",
  description: "Signals, announcements, and public visibility from EFR.",
};

export default function PressPage() {
  return (
    <SectionPage
      eyebrow="05 / Press"
      title="Signals, Announcements, and Public Visibility in Orbit"
      lead="Product milestones, partnerships, and stories from the environments where EFR is already in motion."
    >
      <SectionCard
        title="Latest announcements"
        body="Stay close to release notes, deployment stories, and media updates as the platform expands."
      />
      <SectionCard
        title="Media kit"
        body="Brand assets, executive bios, and approved product descriptions for journalists and partners."
      />
      <SectionCard
        title="Speaking & briefings"
        body="Request briefings on biometric operations, passenger experience, and secure identity infrastructure."
      />
    </SectionPage>
  );
}
