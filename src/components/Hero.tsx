import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-end overflow-hidden">
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/Paintings/Car25.jpg')", filter: 'brightness(0.55)' }}
      />

      {/* Bottom-left editorial text block */}
      <div className="relative z-10 px-8 pb-12 md:px-16 md:pb-16 max-w-xl">
        <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">Student · Engineer · Artist</p>
        <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white leading-tight">
          Douglas<br />Gennetten
        </h1>
        <div className="mt-6 w-12 h-px bg-accent" />
      </div>

      {/* Subtle gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
