import React from 'react';
import GalleryGrid from '../components/GalleryGrid';

const GalleryPage: React.FC = () => {
  return (
    <div className="pt-16 md:pt-24 pb-24 md:pb-0"> {/* Add padding to account for fixed nav */}
      <GalleryGrid />
    </div>
  );
};

export default GalleryPage;