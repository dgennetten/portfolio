import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const ArtistBio: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-20 max-w-4xl">
      <p className="text-xs tracking-[0.3em] uppercase text-accent text-center mb-2">About</p>
      <h2 className="text-3xl md:text-4xl font-light text-center text-ink mb-16">K. Douglas Gennetten</h2>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Portrait — 2:3 aspect ratio for editorial feel */}
        <div className="md:w-5/12 lg:w-1/3 flex-shrink-0">
          <div className="aspect-[2/3] overflow-hidden bg-stone-100">
            <img
              src="http://gennetten.org/trackedImages/mug.jpg"
              alt="K. Douglas Gennetten"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/dgennetten"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="mailto:douglas@gennetten.com"
              className="text-stone-400 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Text */}
        <div className="md:w-7/12 lg:w-2/3">
          <p className="text-base font-semibold text-ink leading-[1.85] mb-6">
            Artist. Engineer. Lifelong Student.
          </p>

          <p className="text-base text-stone-700 leading-[1.85] mb-6">
            Driven by a relentless curiosity, I spend my time at the intersection of technical
            precision and creative expression. With a background in engineering and a current focus
            on fine art and classical realism, I view the world as a canvas of complex patterns,
            geometry, and structure.
          </p>

          <p className="text-base text-stone-700 leading-[1.85]">
            For me, the learning never stops. Whether carving stone, writing code, or exploring the
            elegant mathematics of design, I am constantly studying the mechanics of our world. I
            remain deeply bullish on the future of life on Earth—convinced that human curiosity,
            art, and innovation will continue to drive us toward remarkable horizons. This space is
            an extension of that ongoing exploration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistBio;
