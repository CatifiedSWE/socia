import React, { useState, useEffect } from "react";
import { GALLERY_IMAGES, getSectionContent } from "../constants";

const GalleryFull: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sectionContent = getSectionContent('gallery-full');

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev! - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === GALLERY_IMAGES.length - 1 ? 0 : prev! + 1
    );
  };

  const highlightImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <section className="bg-black pt-32 pb-20 relative min-h-screen overflow-x-hidden">
      <div className="mb-32">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="font-cinzel text-3xl md:text-4xl font-black text-white tracking-widest">
            {sectionContent?.title}
          </h2>
          <div className="w-full h-[1px] bg-red-600/30 mt-4" />
        </div>

        <div className="relative h-[500px] overflow-hidden cursor-pointer perspective-[1500px]">
          <div className="flex gap-10 absolute animate-[carousel_60s_linear_infinite] hover:[animation-play-state:paused] py-12 px-4">
            {highlightImages.map((img, idx) => (
              <div
                key={idx}
                className="relative w-64 md:w-80 h-[400px] flex-shrink-0 group/card preserve-3d cursor-pointer"
                onClick={() => setSelectedIndex(idx % GALLERY_IMAGES.length)}
              >
                <div className="relative w-full h-full transition-transform duration-[800ms] preserve-3d group-hover/card:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 backface-hidden bg-[#0a0a0a] rounded-2xl flex flex-col items-center justify-center border border-red-900/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
                    <div className="absolute top-4 left-4 border-l-2 border-t-2 border-red-600/40 w-8 h-8" />
                    <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-red-600/40 w-8 h-8" />
                    <div className="text-center z-10 p-6 border border-red-900/20 rounded-lg bg-black/40 backdrop-blur-sm">
                      <span className="font-cinzel text-6xl text-red-600 opacity-20 block mb-2">
                        Z
                      </span>
                      <p className="font-oswald text-[11px] text-red-700 uppercase tracking-[0.6em] font-bold">
                        Classified
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,1)]">
                    <img
                      src={img}
                      alt="Highlight"
                      className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12 justify-center lg:justify-start">
          <div className="h-[2px] w-12 bg-red-600" />
          <h3 className="font-oswald text-2xl uppercase tracking-[0.4em] text-white">
            {sectionContent?.label}
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 justify-items-center opacity-100">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/5 cursor-pointer opacity-100 transition-all duration-500 hover:border-red-600/50"
            >
              <img
                src={img}
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-red-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-4 rounded-full border border-white/40 scale-50 group-hover:scale-100 transition-transform duration-500">
                  <span className="text-white text-2xl">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed h-screen inset-0 z-[100] flex items-start justify-center bg-black/98 backdrop-blur-2xl"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white text-4xl font-light hover:text-red-500 transition-all z-[110]"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>

          <button
            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-red-600 text-4xl md:text-6xl font-light transition-all z-[110] p-2 md:p-4"
            onClick={handlePrev}
          >
            ‹
          </button>

          <button
            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-red-600 text-4xl md:text-6xl font-light transition-all z-[110] p-2 md:p-4"
            onClick={handleNext}
          >
            ›
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={GALLERY_IMAGES[selectedIndex]}
              alt="Fullscreen"
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-[0_0_100px_rgba(220,38,38,0.3)] animate-[scaleIn_0.3s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/30 font-oswald tracking-[0.5em] uppercase text-xs md:text-sm">
            FRAME {selectedIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}

      <style>{`
        .perspective-1500 { perspective: 1500px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        @keyframes carousel {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </section>
  );
};

export default GalleryFull;
