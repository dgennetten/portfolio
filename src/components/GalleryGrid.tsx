import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Video from 'yet-another-react-lightbox/plugins/video';
import { useArtworks } from '../hooks/useArtworks';
import type { Category } from '../types';

// Extend YARL slide types with artwork metadata
declare module 'yet-another-react-lightbox' {
  interface SlideImage {
    artworkMedia?: string | null;
    artworkDescription?: string | null;
  }
  interface SlideVideo {
    artworkMedia?: string | null;
    artworkDescription?: string | null;
  }
}

const categoryLabels: Record<Category, string> = {
  drawings: 'Draw',
  paintings: 'Paint',
  sculptures: 'Sculpt',
  prints: 'Print',
  geometric: 'Geom',
  design: 'Design',
  photography: 'Snap',
  code: 'Code',
  WIPdrawings: 'Works In Progress — Drawings',
  WIPsculptures: 'Works In Progress — Sculptures',
  WIPkinetics: 'Works In Progress — Kinetic Sculptures',
  WIPprints: 'Works In Progress — Prints',
};

const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

const GalleryGrid: React.FC = () => {
  const { category } = useParams<{ category: Category }>();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const { data: artworks = [], isLoading, isError } = useArtworks(category ?? '');

  const slides = artworks.map((a) => {
    const base = { title: a.title, artworkMedia: a.media, artworkDescription: a.description };
    return isVideo(a.image_src)
      ? { ...base, type: 'video' as const, sources: [{ src: a.image_src, type: 'video/mp4' }] }
      : { ...base, src: a.image_src, alt: a.title };
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-light text-center mb-12 flex items-center justify-center gap-4">
        {category?.includes('WIP') && (
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded text-sm font-medium transition-colors"
          >
            ← Back
          </button>
        )}
        {category && categoryLabels[category]}
      </h2>

      {isError && (
        <p className="text-center text-red-500 py-16">Failed to load artworks. Please try again.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-stone-200 rounded-lg mb-3" />
                <div className="h-4 bg-stone-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-stone-100 rounded w-1/2" />
              </div>
            ))
          : artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="group cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative aspect-square overflow-hidden mb-3 rounded-lg bg-stone-100">
                  {isVideo(artwork.image_src) ? (
                    <video
                      src={artwork.image_src}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={artwork.image_src}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 rounded-lg" />
                </div>
                <h3 className="text-base font-medium text-stone-800 mb-0.5">{artwork.title}</h3>
                {artwork.media && (
                  <p className="text-xs text-stone-500 uppercase tracking-wide">{artwork.media}</p>
                )}
              </div>
            ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Captions, Fullscreen, Video]}
        captions={{ descriptionTextAlign: 'center', showToggle: true }}
        render={{
          slideFooter: ({ slide }) => {
            const desc = (slide as { artworkDescription?: string | null }).artworkDescription;
            const media = (slide as { artworkMedia?: string | null }).artworkMedia;
            if (!desc && !media) return null;
            return (
              <div className="yarl__slide_footer_custom">
                {media && <p className="text-xs text-white/60 uppercase tracking-widest mb-1">{media}</p>}
                {desc && (
                  <p
                    className="text-sm text-white/80 text-center"
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                )}
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default GalleryGrid;
