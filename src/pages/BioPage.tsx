import React from 'react';
import ArtistBio from '../components/ArtistBio';
import CollectionSamples from '../components/CollectionSamples';

const BioPage: React.FC = () => {
  return (
    <div className="pt-16 md:pt-24 pb-24 md:pb-0"> {/* Add padding to account for fixed nav */}
      <ArtistBio />
      <CollectionSamples />
    </div>
  );
};

export default BioPage;