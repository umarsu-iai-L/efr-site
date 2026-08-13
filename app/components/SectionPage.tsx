import type { ReactNode } from "react";

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
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef4fb_42%,#e8eef7_100%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42vh] bg-[radial-gradient(circle_at_top,_rgba(47,120,188,0.14),_transparent_62%)]" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#2f78bc]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-24 h-80 w-80 rounded-full bg-[#124677]/8 blur-3xl" />

      <div className="relative mx-auto w-full max-w-5xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:pl-36">
        <article className="section-page-content flex w-full flex-col gap-10">
          <header className="max-w-3xl space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#2f78bc]">
              {eyebrow}
            </p>
            <h1 className="text-balance text-[#124677]">{title}</h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {lead}
            </p>
          </header>

          {children ? (
            <div className="grid gap-5 md:grid-cols-2 [&>[class*=col-span-full]]:md:col-span-2">{children}</div>
          ) : null}
        </article>
      </div>
    </div>
  );
}

export function SectionCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/80 bg-white/75 p-5 shadow-[0_16px_48px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-6">
      <h2 className="mb-2 text-xl text-[#124677]">{title}</h2>
      <p className="leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}
