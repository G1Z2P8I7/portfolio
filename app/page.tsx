import Hero from "@/components/Hero";
import GlobeShowcase from "@/components/GlobeShowcase";
import PhysicsLab from "@/components/PhysicsLab";
import TechnicalMatrix from "@/components/TechnicalMatrix";
import TerminalContact from "@/components/TerminalContact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <GlobeShowcase />
      <PhysicsLab />
      <TechnicalMatrix />
      <TerminalContact />
    </div>
  );
}
