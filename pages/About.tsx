import React from "react";
import GalleryPreview from "../components/GalleryPreview";
import Coordinators from "../components/ui/Coordinators";

const About: React.FC = () => {
  return (
    <div className="pt-40 pb-20 min-h-screen bg-black animate-[pageFadeIn_1s_ease-out]">
      <div className="max-w-6xl mx-auto px-6 mb-32">
        <div className="flex flex-col items-center text-center">
          <div className="mb-12 relative animate-[logoIn_1.5s_ease-out]">
            <img
              src="../assets/logo.png"
              alt="Zynora Logo"
              className="w-64 md:w-96 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            />
          </div>
          <div className="w-32 h-1 bg-red-600 mb-12" />
          <p className="font-inter text-xl md:text-3xl text-gray-200 leading-relaxed font-light max-w-4xl">
            Zynora is not just a{" "}
            <span className="text-red-600 font-medium">cultural fest</span>
            —it is a celebration of diversity and a dynamic platform for
            self-expression.
          </p>
          <p className="font-inter text-lg md:text-xl text-gray-400 leading-relaxed font-light max-w-4xl mt-10">
            Zynora is not just a cultural fest—it is a celebration of diversity
            and a dynamic platform for self-expression. It brings together the
            brightest talents from colleges near and far, offering students the
            opportunity to shine across dance, music, theatre, fine arts, and
            literary competitions. Each event is thoughtfully designed to
            inspire creativity, highlight individual skills, and bring out the
            best in every participant.
          </p>
        </div>
      </div>
      <GalleryPreview />
      <Coordinators />
    </div>
  );
};

export default About;
