import dynamic from "next/dynamic";

const MultiverseFlight = dynamic(() => import("./components/MultiverseFlight"), {
  loading: () => <div className="h-screen bg-black" />,
});

export default function Home() {
  return <MultiverseFlight />;
}

