import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('/images/Hero.jpg')",
          filter: "brightness(0.7)"
        }}
      />
      <div className="relative z-10 text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-4">
          Darren Gennetten
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wide">
          Designer · Artist
        </p>
      </div>
    </div>
  );
};

export default Hero;