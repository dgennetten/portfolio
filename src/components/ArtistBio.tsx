import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const ArtistBio: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-12">About</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3">
            <div className="aspect-square overflow-hidden">
              <img 
                src="http://gennetten.org/PortfolioImages/mug.jpg" 
                alt="K. Douglas Gennetten" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <a 
                href="https://www.instagram.com/dgennetten" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-black transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="mailto:douglas@gennetten.com" 
                className="text-gray-500 hover:text-black transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="md:w-2/3">
            <p className="text-lg mb-6 leading-relaxed">
              After a long career in engineering, retirement has given me the freedom to pursue my 
              love for art, self-discovery, and learning.
              I've come to appreciate that art is not just a personal journey but a shared 
              experience that connects us in unexpected ways.
            </p>

            <p className="text-lg mb-6 leading-relaxed">
              Starting with figurative abstraction in Colorado marble, I now focus on classical 
              realism, honing my skills through academy-style atelier training. My lifelong 
              fascination with science and mathematics—especially geometry—fuels my appreciation 
              for Islamic art, where intricate patterns and symmetry offer endless inspiration.
            </p>

            <p className="text-lg mb-6 leading-relaxed">
              Years ago, I created a website called Foolscap as a place to share my thoughts. 
              Few people visited, but it became an outlet for reflection. The name has stayed 
              with me, and this page feels like a natural extension of that early project—a space 
              to explore art, science, and mathematics with an open mind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistBio;