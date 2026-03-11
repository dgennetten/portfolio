import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Artwork, Category } from '../types';
import { getCategoryArtworks } from '../data/artworks';
import ImageModal from './ImageModal';

const categoryNames: Record<Category, string> = {
  drawings: 'Draw',
  paintings: 'Paint',
  sculptures: 'Sculpt',
  prints: 'Print',
  geometric: 'Geom',
  design: 'Design',
  photography: 'Snap',
  code: 'Code',
  WIPdrawings: 'Works In Progress - Drawings',
  WIPsculptures: 'Works In Progress - Sculptures',
  WIPkinetics: 'Works In Progress - Kinetic Sculptures',
  WIPprints: 'Works In Progress - Prints',
};

const GalleryGrid: React.FC = () => {
  const { category } = useParams<{ category: Category }>();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      const categoryArtworks = getCategoryArtworks(category);
      setArtworks(categoryArtworks);
      // Reset modal state when category changes
      setIsModalOpen(false);
      setSelectedArtwork(null);
    }
  }, [category]);

  const openModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
    document.body.style.overflow = 'auto';
  };

  const handleNavigate = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-light text-center mb-12 flex items-center justify-center gap-4">
        {category && category.includes('WIP') && (
          <button
            onClick={() => navigate(-1)}
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded mr-4 text-base"
            style={{ minWidth: 45, fontWeight: 500, fontSize: '0.95rem' }} // 0.875rem = 14px
          >
            {'< BACK'}
          </button>
        )}
        {category && categoryNames[category]}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <div 
            key={artwork.id} 
            className="group cursor-pointer transition-all duration-300"
            onClick={() => openModal(artwork)}
          >
            <div className="relative aspect-square overflow-hidden mb-4 rounded-lg">
              {artwork.imageSrc.endsWith('.mp4') ? (
                <video
                  src={artwork.imageSrc}
                  controls
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <img 
                  src={artwork.imageSrc} 
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
            </div>
            <h3 className="text-xl font-medium mb-1">{artwork.title}</h3>
            <p className="text-gray-600 mb-2">{artwork.media}</p>
            <p 
              className="text-gray-500 text-sm"
              dangerouslySetInnerHTML={{ __html: artwork.description }}
            ></p>
          </div>
        ))}
      </div>

      {isModalOpen && selectedArtwork && (
        <ImageModal 
          artwork={selectedArtwork}
          artworks={artworks}
          isOpen={isModalOpen}
          onClose={closeModal}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
};

export default GalleryGrid;