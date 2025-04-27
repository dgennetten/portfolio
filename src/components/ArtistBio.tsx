import React from 'react';
import { Instagram, Mail } from 'lucide-react';

const ArtistBio: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-12">About the Artist</h2>
        
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
              After postponing my artistic pursuits during a 40-year engineering career, retirement has opened a new
              chapter—one filled with the joy of art creation.
            </p>

            <p className="text-lg mb-6 leading-relaxed">
              Initially exploring figurative abstraction in Colorado marble, I now ground my work in classical realism.
              Training in academy-style ateliers has emboldened my approach, allowing me to delve deeply into realism
              and portraiture with confidence. At the same time, my lifelong passion for science and mathematics—particularly
              geometry—continues to fuel my fascination with Islamic art, where intricate patterns and symmetry offer endless
              inspiration.
            </p>

            <p className="text-lg mb-6 leading-relaxed">
              My approach combines traditional techniques with contemporary themes, exploring the
              relationship between natural forms and geometric patterns, often incorporating elements
              of mathematical precision alongside organic spontaneity. These diverse influences intertwine,
              shaping a body of work that merges technical precision with
              artistic expression, structure with emotion, and logic with creativity.
            </p>

            <p className="text-lg leading-relaxed">

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistBio;