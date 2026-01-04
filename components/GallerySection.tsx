
import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';

const GallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(prev => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex(prev => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="gallery" className="py-32 px-4 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="font-oswald text-red-600 tracking-[0.5em] text-xs uppercase mb-2 block">Captured Moments</span>
          <h2 className="font-cinzel text-5xl md:text-6xl font-black mb-6">Gallery</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-neutral-900 border border-white/5"
            >
              <img 
                src={img} 
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <span className="text-white text-3xl font-light">+</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <button className="px-12 py-4 border-2 border-red-600 text-red-600 font-oswald uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
             View All Legends
           </button>
        </div>
      </div>

      {/* Lightbox Popup */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/98 backdrop-blur-2xl animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Controls */}
          <button 
            className="absolute top-6 right-6 text-white text-4xl font-light hover:text-red-500 transition-colors z-[110]"
            onClick={() => setSelectedIndex(null)}
          >
            ✕
          </button>
          
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-red-500 text-5xl font-light transition-all z-[110] p-4"
            onClick={handlePrev}
          >
            ‹
          </button>
          
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-red-500 text-5xl font-light transition-all z-[110] p-4"
            onClick={handleNext}
          >
            ›
          </button>

          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <img 
              src={GALLERY_IMAGES[selectedIndex]} 
              alt="Fullscreen" 
              className="max-w-full max-h-full object-contain rounded shadow-2xl animate-[scaleIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 font-oswald tracking-widest uppercase text-xs">
            {selectedIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </section>
  );
};

export default GallerySection;
