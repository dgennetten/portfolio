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
              chapter—one filled with the joy of art creation, self-discovery, and endless learning. Initially, this 
              page was a simple,if somewhat stuffy, attempt to create an artists bio. But as I began to explore the
              worlds of art, science and mathemnatics, I realized that my journey was not just about the art itself, but about the
              connections I was making along the way. I have come to understand that art is not just a solitary pursuit, but a
              shared experience that transcends boundaries and connects us all. I am grateful for the opportunity to share my work with you,
              and I hope that it resonates with you in some way. I invite you to join me on this journey of exploration and discovery, 
              as we navigate the worlds of art, science, and mathematics together.
            </p>

            <p className="text-lg mb-6 leading-relaxed">
              Initially exploring figurative abstraction in Colorado marble, I now ground my work in classical realism.
              Training in academy-style ateliers has emboldened my approach, allowing me to delve deeply into realism
              and portraiture with confidence. At the same time, my lifelong passion for science and mathematics—particularly
              geometry—continues to fuel my fascination with Islamic art, where intricate patterns and symmetry offer endless
              inspiration.
            </p>

            <p className="text-lg mb-6 leading-relaxed">
              Years ago, around the birth of weblogs (blogs), I created a website to share my thoughts and ideas. It was
              called 'Foolscap' and was a place where I could express myself freely. Very few people visited, but I found it to be a
              valuable outlet. I have since moved on to other platforms, but the name 'Foolscap' has stuck with me. 
              Foolscap refers to a paper size that was traditionally used in Europe and the British Commonwealth before the adoption 
              of the A4 standard. The name comes from an old watermark depicting a fools cap, which was commonly used on paper 
              in the 15th century.
            </p>

            <p className="text-lg leading-relaxed">
              I'm thinking this page will become an extension of my old Foolscap site, a place to share my thoughts and ideas about art, 
              science, and mathematics. 

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistBio;