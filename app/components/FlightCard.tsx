type FlightCard = {
    id: string;
    eyebrow: string;
    eyebrowIcon?: React.ReactNode;
    title: string;
    dynamicWords?: string[];
    description: string;
    cta: string;
    align: "left" | "right";
    x: number;
    z: number;
    width: string;
    tone: "light" | "dark";
};

const cards: FlightCard[] = [
    {
        id: "home",
        dynamicWords: ["Speed", "Security", "Compliance"],
        eyebrowIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
  <path fill="currentColor" d="M5 19v-8.692q0-.384.172-.727t.474-.565l5.385-4.078q.423-.323.966-.323t.972.323l5.385 4.077q.303.222.474.566q.172.343.172.727V19q0 .402-.299.701T18 20h-3.384q-.344 0-.576-.232q-.232-.233-.232-.576v-4.769q0-.343-.232-.575q-.233-.233-.576-.233h-2q-.343 0-.575.233q-.233.232-.233.575v4.77q0 .343-.232.575T9.385 20H6q-.402 0-.701-.299T5 19"></path>
</svg>`,
        eyebrow: "01 / Home",
        title: "Next-Generation Facial Recognition for Speed, Security, Compliance",
        description:
            "We are at the forefront of providing cutting-edge biometric solutions to enhance security, streamline services, and revolutionize industries.",
        cta: "Explore More",
        align: "left",
        x: -320,
        z: 0,
        width: "clamp(400px, 60vw, 780px)",
        tone: "light",
    },
    {
        id: "about",
        eyebrow: "02 / About Us",
        title: "Identity Systems Built for Trust at Every Checkpoint",
        description:
            "Move through the first cluster as if each billboard is one section of a single flagship landing page, stitched together through depth instead of flat scrolling.",
        cta: "About EFR",
        align: "right",
        x: 280,
        z: -950,
        width: "clamp(300px, 36vw, 580px)",
        tone: "light",
    },
    {
        id: "services",
        eyebrow: "03 / Services",
        title: "Operational Security That Feels Fast, Precise, and Invisible",
        description:
            "Verification, access control, and compliance workflows stay grouped in the same cinematic fly-through before the experience opens into the next environment.",
        cta: "View Services",
        align: "left",
        x: -250,
        z: -1850,
        width: "clamp(320px, 40vw, 640px)",
        tone: "light",
    },
    {
        id: "innovation",
        eyebrow: "04 / Innovation",
        title: "A New Cluster Begins Beyond the Transit Corridor",
        description:
            "The longer empty stretch between groups creates a deliberate handoff, with the environment darkening before the next narrative stack comes into range.",
        cta: "Explore Innovation",
        align: "right",
        x: 260,
        z: -4700,
        width: "clamp(360px, 46vw, 760px)",
        tone: "dark",
    },
    {
        id: "press",
        eyebrow: "05 / Press",
        title: "Signals, Announcements, and Public Visibility in Orbit",
        description:
            "This second group uses the same flight language, but the darker atmosphere makes it feel like a distinct page reached through distance, not a hard cut.",
        cta: "Latest Press",
        align: "left",
        x: -290,
        z: -5750,
        width: "clamp(320px, 39vw, 620px)",
        tone: "dark",
    },
    {
        id: "career",
        eyebrow: "06 / Career",
        title: "Bring Human Oversight into Autonomous Security Systems",
        description:
            "Use this position as another billboard in the same cluster, ready for hiring, culture, or talent content once the next page narrative is defined.",
        cta: "Join the Team",
        align: "right",
        x: 300,
        z: -6800,
        width: "clamp(340px, 41vw, 680px)",
        tone: "dark",
    },
    {
        id: "contact",
        eyebrow: "07 / Contact Us",
        title: "Final Approach into a Soft, Faded White Horizon",
        description:
            "The closing card settles into the distant end state while the particle field shifts toward white, preparing the handoff into whatever comes next.",
        cta: "Contact EFR",
        align: "left",
        x: -220,
        z: -7900,
        width: "clamp(360px, 44vw, 740px)",
        tone: "dark",
    },
];
