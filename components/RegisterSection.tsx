import React from "react";
import { useNavigate } from "react-router-dom";
import CinematicButton from "../components/ui/CinematicButton";
import { getSectionContent, getButtonLabel } from "../constants";
import { useFooterContent } from "../hooks/useSupabaseData";

const RegisterSection: React.FC = () => {
  const navigate = useNavigate();
  const sectionContent = getSectionContent('register');
  const { data: footerContent } = useFooterContent();
  
  return (
    <section className="relative py-32 px-4 text-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="font-cinzel text-5xl md:text-6xl font-black mb-8 leading-tight">
          {sectionContent?.title}
          <br />
          <span className="text-red-600">ARE YOU READY?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          {sectionContent?.description}
        </p>

        <div className="flex flex-col items-center gap-4">
          <CinematicButton
            text={getButtonLabel('register-now')}
            onClick={() => navigate("/events")}
            className="w-full sm:w-auto"
          />
          {footerContent?.note && (
            <span className="text-xs uppercase tracking-widest text-gray-500 mt-4 animate-pulse">
              {footerContent.note}
            </span>
          )}
        </div>
      </div>

      {/* Decorative Symbols */}
      <div className="absolute bottom-10 left-10 opacity-10 text-6xl rotate-12 hidden lg:block">
        🎭
      </div>
      <div className="absolute top-10 right-10 opacity-10 text-6xl -rotate-12 hidden lg:block">
        ⚔️
      </div>
    </section>
  );
};

export default RegisterSection;
