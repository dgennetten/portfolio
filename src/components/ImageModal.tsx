import React, { useEffect, useRef, useState } from 'react';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div 
        ref={modalRef} 
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
      >
        {/* Back Button */}
        <button
          onClick={handlePrevious}
          className="fixed top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 text-2xl font-bold"
        >
          &lt;
        </button>

        {/* Forward Button */}
        <button
          onClick={handleNext}
          className="fixed top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 text-2xl font-bold"
        >
          &gt;
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 text-2xl font-bold"
        >
          &times;
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
  );
};

export default ImageModal;