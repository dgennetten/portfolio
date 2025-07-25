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
  const [isFullScreen, setIsFullScreen] = useState(false);
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

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
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
          if (isFullScreen) {
            setIsFullScreen(false);
          } else {
            onClose();
          }
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
  }, [onClose, hasPrevious, hasNext, handlePrevious, handleNext, isFullScreen]);

  // Reset full screen state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setIsFullScreen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div 
        ref={modalRef} 
        className={isFullScreen 
          ? "relative w-full h-full flex items-center justify-center" 
          : "relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
        }
      >
        {/* Back Button */}
        {hasPrevious && (
          <button
            onClick={handlePrevious}
            className={`fixed top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 text-2xl font-bold ${
              isFullScreen ? 'opacity-60' : ''
            }`}
          >
            &lt;
          </button>
        )}

        {/* Forward Button */}
        {hasNext && (
          <button
            onClick={handleNext}
            className={`fixed top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 text-2xl font-bold ${
              isFullScreen ? 'opacity-60' : ''
            }`}
          >
            &gt;
          </button>
        )}

        {/* Full Screen Toggle Button */}
        <button
          onClick={toggleFullScreen}
          className={`fixed top-4 right-16 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 text-xl font-bold ${
            isFullScreen ? 'opacity-60' : ''
          }`}
          title={isFullScreen ? "Exit full screen" : "Enter full screen"}
        >
          {isFullScreen ? "⤡" : "⤢"}
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`fixed top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 text-2xl font-bold ${
            isFullScreen ? 'opacity-60' : ''
          }`}
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
            className={isFullScreen ? "w-screen h-screen object-contain" : "max-w-full max-h-[70vh] object-contain"}
          />
        ) : (
          <img 
            src={artwork.imageSrc} 
            alt={artwork.title} 
            className={isFullScreen ? "w-screen h-screen object-contain" : "max-w-full max-h-[70vh] object-contain"}
          />
        )}

        {/* Text Below Media - Hidden in full screen mode */}
        {!isFullScreen && (
          <div className="text-center mt-4">
            <h3 className="text-xl font-medium text-white">{artwork.title}</h3>
            <p className="text-gray-300">{artwork.media}</p>
            <div className="text-gray-400 mt-1">
              <p dangerouslySetInnerHTML={{ __html: artwork.description }}></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;