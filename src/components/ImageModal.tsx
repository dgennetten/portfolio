import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Artwork } from '../types';

interface ImageModalProps {
  artwork: Artwork;
  artworks: Artwork[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (artwork: Artwork) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ artwork, artworks, isOpen, onClose, onNavigate }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isWide, setIsWide] = useState(false); // State to track if the image is wide
  const currentIndex = artworks.findIndex(art => art.id === artwork.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < artworks.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      const previousArtwork = artworks[currentIndex - 1];
      onNavigate(previousArtwork);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const nextArtwork = artworks[currentIndex + 1];
      onNavigate(nextArtwork);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyboard = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious) handlePrevious();
          break;
        case 'ArrowRight':
          if (hasNext) handleNext();
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyboard);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [onClose, hasPrevious, hasNext, handlePrevious, handleNext]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setIsWide(img.naturalWidth > img.naturalHeight); // Check if the image is wide
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div 
        ref={modalRef} 
        className={`relative max-w-[90vw] max-h-[90vh] flex flex-col items-center ${isWide ? 'justify-center' : ''}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Navigation Arrows */}
        {hasPrevious && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>
        )}
        
        {hasNext && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        )}
        
        <img 
          src={artwork.imageSrc} 
          alt={artwork.title} 
          className="max-w-full max-h-[90vh] object-contain"
          onLoad={handleImageLoad} // Handle image load to determine aspect ratio
        />
        
        {isWide ? (
          // Text below the image for wide images
          <div className="text-center mt-4">
            <h3 className="text-xl font-medium text-white">{artwork.title}</h3>
            <p className="text-gray-300">{artwork.media}</p>
            <p className="text-gray-400 mt-1">{artwork.description}</p>
          </div>
        ) : (
          // Overlay text for non-wide images
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
            <h3 className="text-xl font-medium">{artwork.title}</h3>
            <p className="text-gray-300">{artwork.media}</p>
            <p className="text-gray-400 mt-1">{artwork.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;