import Image from "next/image";

const partnerLogos = [
  "/trust1.png",
  "/trust2.png",
  "/trust3.png",
  "/trust4.png",
  "/trust5.png",
  "/trust6.png",
  "/trust7.png",
  "/trust8.png",
];

const marqueeLogos = [...partnerLogos, ...partnerLogos];

export default function TrustedPartnersBillboard() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-900 via-[#0b1222] to-slate-950 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(125,211,252,0.26),transparent_48%)]" />

      <div className="relative mx-auto w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[1320px]">
        <div className="rounded-3xl border border-white/12 bg-white/[0.06] px-5 py-10 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-sm sm:px-8 md:px-10 md:py-12">
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
        
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Trusted Partners
            </h2>
            <p className="mt-3 text-sm text-slate-100 sm:text-base">
              Banking, telecom, and financial institutions rely on EFR for
              secure identity and fraud prevention solutions.
            </p>
          </div>

          <div className="trusted-billboard-mask">
            <div
              className="trusted-billboard-track"
              aria-label="Trusted partner logos"
            >
              {marqueeLogos.map((src, index) => (
                <article
                  key={`${src}-${index}`}
                  className="trusted-billboard-card"
                  aria-hidden={index >= partnerLogos.length}
                >
                  <Image
                    src={src}
                    alt={`Trusted partner ${(index % partnerLogos.length) + 1}`}
                    width={210}
                    height={84}
                    className="h-14 w-auto max-w-[78%] object-contain opacity-95 sm:h-16"
                    loading="lazy"
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trusted-billboard-mask {
          position: relative;
          overflow: hidden;
          padding: 0.35rem 0;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .trusted-billboard-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: trusted-billboard-scroll 30s linear infinite;
          will-change: transform;
        }

        .trusted-billboard-card {
          flex: 0 0 clamp(210px, 22vw, 260px);
          min-width: clamp(210px, 22vw, 260px);
          border-radius: 1.1rem;
          border: 1px solid rgba(148, 163, 184, 0.24);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(241, 245, 249, 0.95) 100%
          );
          box-shadow: 0 12px 32px rgba(2, 6, 23, 0.16);
          padding: 1.1rem 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .trusted-billboard-mask:hover .trusted-billboard-track {
          animation-play-state: paused;
        }

        @media (max-width: 1023px) {
          .trusted-billboard-card {
            flex-basis: clamp(180px, 30vw, 220px);
            min-width: clamp(180px, 30vw, 220px);
          }
        }

        @media (max-width: 767px) {
          .trusted-billboard-card {
            flex-basis: clamp(145px, 42vw, 180px);
            min-width: clamp(145px, 42vw, 180px);
          }
        }

        @keyframes trusted-billboard-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 0.5rem));
          }
        }
      `}</style>
    </section>
  );
}
