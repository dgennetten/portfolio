import React from 'react';
import ArtistBio from '../components/ArtistBio';
import CollectionSamples from '../components/CollectionSamples';

const BioPage: React.FC = () => {
  return (
    <div className="pt-14 pb-24 md:pb-0">
      <ArtistBio />
      <CollectionSamples />
    </div>
  );
};

export default BioPage;