import React from 'react';
import ArtistBio from '../components/ArtistBio';

const BioPage: React.FC = () => {
  return (
    <div className="pt-16 md:pt-24 pb-24 md:pb-0"> {/* Add padding to account for fixed nav */}
      <ArtistBio />
    </div>
  );
};

export default BioPage;