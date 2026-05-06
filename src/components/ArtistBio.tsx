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
          <p className="text-base text-stone-700 leading-[1.85] mb-6">
            After a long career in engineering, retirement has given me the freedom to pursue my
            love for art, self-discovery, and learning.
            I've come to appreciate that art is not just a personal journey but a shared
            experience that connects us in unexpected ways.
          </p>

          <p className="text-base text-stone-700 leading-[1.85] mb-6">
            Starting with figurative abstraction in Colorado marble, I now focus on classical
            realism, honing my skills through academy-style atelier training. My lifelong
            fascination with science and mathematics—especially geometry—fuels my appreciation
            for Islamic art, where intricate patterns and symmetry offer endless inspiration.
          </p>

          <p className="text-base text-stone-700 leading-[1.85]">
            Years ago, I created a website called Foolscap as a place to share my thoughts.
            Few people visited, but it became an outlet for reflection. The name has stayed
            with me, and this page feels like a natural extension of that early project—a space
            to explore art, science, and mathematics with an open mind.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistBio;
