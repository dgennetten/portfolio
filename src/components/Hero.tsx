import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg')",
          filter: "brightness(0.7)"
        }}
      />
      <div className="relative z-10 text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-light tracking-wider mb-4">
          K. Douglas Gennetten
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wide">
          Artist · Creator · Visionary
        </p>
      </div>
    </div>
  );
};

export default Hero;