import React from "react";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import EventCards from "../components/EventCards";
import Coordinators from "../components/ui/Coordinators";
import GalleryPreview from "../components/GalleryPreview";
import RegisterSection from "../components/RegisterSection";
import { getSectionContent } from "../constants";

const Home: React.FC = () => {
  return (
    <div className="animate-[pageFadeIn_1s_ease-out]">
      <Hero />
      <div className="bg-black relative z-10">
        <div className="py-24 px-4 text-center  from-black via-red-950/10 to-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,0,0.15)_0%,transparent_70%)] animate-pulse" />
          <p className="font-oswald text-red-600 uppercase tracking-[0.6em] mb-4 text-xs">
            The Cinematic Converge
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl max-w-4xl mx-auto leading-tight relative z-10">
            Experience where{" "}
            <span className="text-red-600 font-black text-glow">reality</span>{" "}
            dissolves into the{" "}
            <span className="italic text-gray-400">silver screen</span>.
          </h2>
        </div>
        <StatsSection />
        <div className="relative bg-black">
          <EventCards />
        </div>
        <Coordinators />
        <GalleryPreview />
        <RegisterSection />
      </div>
    </div>
  );
};

export default Home;
