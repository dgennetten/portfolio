import React, { useRef } from 'react';
import { Instagram, Mail } from 'lucide-react';

const ArtistBio: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handlePrevious = () => {
    // Logic for handling previous artwork
  };

  const handleNext = () => {
    // Logic for handling next artwork
  };

  const onClose = () => {
    // Logic for closing the modal
  };

  const artwork = {
    imageSrc: 'http://gennetten.org/PortfolioImages/artwork.jpg',
    title: 'Artwork Title',
    media: 'Media Type',
    description: 'Description of the artwork',
  };

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
          </div>
        </div>
      </div>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
        <div 
          ref={modalRef} 
          className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
        >
          {/* Back Button */}
          <button
            onClick={handlePrevious}
            className="fixed top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
          >
            Back
          </button>

          {/* Forward Button */}
          <button
            onClick={handleNext}
            className="fixed top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
          >
            Forward
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
          >
            Close
          </button>

          {artwork.imageSrc.endsWith('.mp4') ? (
            <video 
              src={artwork.imageSrc} 
              controls 
              autoPlay 
              muted
              playsInline
              className="max-w-full max-h-[70vh] object-contain"
            />
          ) : (
            <img 
              src={artwork.imageSrc} 
              alt={artwork.title} 
              className="max-w-full max-h-[70vh] object-contain"
            />
          )}

          {/* Text Below Media */}
          <div className="text-center mt-4">
            <h3 className="text-xl font-medium text-white">{artwork.title}</h3>
            <p className="text-gray-300">{artwork.media}</p>
            <div className="text-gray-400 mt-1">
              <p dangerouslySetInnerHTML={{ __html: artwork.description }}></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistBio;