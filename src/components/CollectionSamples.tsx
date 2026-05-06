import React from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedArtworks } from '../hooks/useArtworks';

const collections = [
  { to: '/gallery/drawings',    label: 'Draw'    },
  { to: '/gallery/paintings',   label: 'Paint'   },
  { to: '/gallery/sculptures',  label: 'Sculpt'  },
  { to: '/gallery/prints',      label: 'Print'   },
  { to: '/gallery/geometric',   label: 'Geom'    },
  { to: '/gallery/design',      label: 'Design'  },
  { to: '/gallery/photography', label: 'Snap'    },
  { to: '/gallery/code',        label: 'Code'    },
];

const wip = [
  { to: '/gallery/WIPdrawings',   label: 'WIP Drawings'           },
  { to: '/gallery/WIPsculptures', label: 'WIP Sculptures'         },
  { to: '/gallery/WIPkinetics',   label: 'WIP Kinetic Sculptures' },
  { to: '/gallery/WIPprints',     label: 'WIP Prints'             },
];

const CollectionSamples: React.FC = () => {
  const { data: featured = [], isLoading } = useFeaturedArtworks();

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-light text-center mb-12">Collection Samples</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-stone-200 rounded-lg mb-3" />
                <div className="h-4 bg-stone-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-stone-100 rounded w-1/2" />
              </div>
            ))
          : featured.map((artwork) => (
              <div key={artwork.id} className="group">
                <Link to={`/gallery/${artwork.category}`} className="block">
                  <div className="relative aspect-square overflow-hidden mb-3 rounded-lg bg-stone-100">
                    <img
                      src={artwork.image_src}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                  </div>
                  <h3 className="text-base font-medium text-stone-800 mb-0.5">{artwork.title}</h3>
                  {artwork.media && (
                    <p className="text-xs text-stone-500 uppercase tracking-wide">{artwork.media}</p>
                  )}
                </Link>
              </div>
            ))}
      </div>

      <hr className="border-stone-200 mb-16" />

      <h4 className="text-2xl font-light text-center mb-8">All Collections</h4>
      <div className="flex flex-wrap gap-3 justify-center mb-16">
        {collections.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="px-5 py-1.5 border border-stone-700 text-stone-700 text-sm tracking-widest uppercase hover:bg-stone-700 hover:text-white transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </div>

      <hr className="border-stone-200 mb-16" />

      <h4 className="text-2xl font-light text-center mb-8">Works In Progress</h4>
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {wip.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="px-5 py-1.5 border border-stone-400 text-stone-500 text-sm tracking-widest uppercase hover:bg-stone-500 hover:text-white transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionSamples;
