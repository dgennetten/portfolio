import React from 'react';
import { Link } from 'react-router-dom';
import { featuredArtworks } from '../data/artworks';
import { Component } from 'lucide-react'; // Import the Component icon from lucide-react

const CollectionSamples: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Centered Lucide Component icon above the heading */}
      <div className="flex justify-center items-center mb-8">
        <Component className="text-red-600 w-16 h-16" /> {/* Red and large icon */}
      </div>
      <h2 className="text-3xl md:text-4xl font-light text-center mb-12">Collection Samples</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredArtworks.map((artwork) => (
          <div key={artwork.id} className="group transition-all duration-300">
            <Link 
              to={`/gallery/${artwork.category}`}
              className="block overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden mb-4 rounded-lg">
                <img 
                  src={artwork.imageSrc} 
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <h3 className="text-xl font-medium mb-2">{artwork.title}</h3>
              <p className="text-gray-600">{artwork.media}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="container mx-auto px-4">
        {/* Centered Lucide Component icon */}
        <div className="flex justify-center items-center my-12">
          <Component className="text-red-600 w-16 h-16" /> {/* Red and large icon */}
        </div>
        <div className="flex space-x-4 items-center justify-center mt-12 py-0">
          <h4 className="text-3xl md:text-4xl font-light text-center mb-0">All Collections</h4>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center mt-12 mb-12 py-0">
          <Link
            to="/gallery/logos"
            className="inline-block px-6 py-0 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            Logos
          </Link>
         <Link
            to="/gallery/photography"
            className="inline-block px-6 py-0 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            Photographs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionSamples;