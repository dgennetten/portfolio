import React from 'react';
import Hero from '../components/Hero';
import CollectionSamples from '../components/CollectionSamples';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <CollectionSamples />
    </div>
  );
};

export default HomePage;