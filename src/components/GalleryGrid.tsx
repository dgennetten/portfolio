import React, { useState, useEffect } from 'react';
import { Expand } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import { useArtworks } from '../hooks/useArtworks';
import type { Category } from '../types';

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

type ExtendedSlide = {
  src?: string;
  title?: string;
  type?: 'video';
  sources?: { src: string; type: string }[];
  artworkMedia?: string | null;
  artworkDescription?: string | null;
};

const TextPanel: React.FC<{
  slide: ExtendedSlide;
  beside: boolean;
}> = ({ slide, beside }) => (
  <div
    style={{
      color: 'rgba(255,255,255,0.9)',
      flexShrink: 0,
      overflowY: 'auto',
      ...(beside
        ? {
            width: '220px',
            padding: '1.5rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderLeft: '1px solid rgba(255,255,255,0.12)',
          }
        : {
            width: '100%',
            padding: '0.75rem 1.5rem 1rem',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.12)',
          }),
    }}
  >
    {slide.title && (
      <div style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.3rem' }}>
        {slide.title}
      </div>
    )}
    {slide.artworkMedia && (
      <div
        style={{
          fontSize: '0.65rem',
          opacity: 0.55,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: slide.artworkDescription ? '0.6rem' : 0,
        }}
      >
        {slide.artworkMedia}
      </div>
    )}
    {slide.artworkDescription && (
      <div
        style={{ fontSize: '0.8rem', opacity: 0.75, lineHeight: 1.55 }}
        dangerouslySetInnerHTML={{ __html: slide.artworkDescription }}
      />
    )}
  </div>
);

const ArtworkSlide: React.FC<{ slide: ExtendedSlide; rect: { width: number; height: number } }> = ({
  slide,
  rect,
}) => {
  const [imageAspect, setImageAspect] = useState<number | null>(null);
  const src = slide.src ?? '';
  const isVideoSlide = slide.type === 'video';

  useEffect(() => {
    if (isVideoSlide || !src) return;
    setImageAspect(null);
    const img = new Image();
    img.onload = () => setImageAspect(img.naturalWidth / img.naturalHeight);
    img.src = src;
  }, [src, isVideoSlide]);

  const containerAspect = rect.width / rect.height;
  const hasText = !!(slide.title || slide.artworkMedia || slide.artworkDescription);

  // Portrait image in landscape container → text beside the image
  const textBeside =
    hasText && !isVideoSlide && imageAspect !== null && imageAspect < 1 && containerAspect > 1;

  if (isVideoSlide) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0, width: '100%' }}>
          <video
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            controls
            autoPlay
            loop
            muted
            playsInline
          >
            {slide.sources?.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        </div>
        {hasText && <TextPanel slide={slide} beside={false} />}
      </div>
    );
  }

  if (textBeside) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', alignItems: 'stretch' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 0,
          }}
        >
          <img
            src={src}
            alt={slide.title ?? ''}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>
        <TextPanel slide={slide} beside />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'stretch' }}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 0,
        }}
      >
        <img
          src={src}
          alt={slide.title ?? ''}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>
      {hasText && <TextPanel slide={slide} beside={false} />}
    </div>
  );
};

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
                  <Expand
                    size={14}
                    strokeWidth={2}
                    className="absolute bottom-2 right-2 text-white drop-shadow md:hidden pointer-events-none"
                    aria-hidden
                  />
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
        plugins={[Fullscreen]}
        render={{
          slide: ({ slide, rect }) => (
            <ArtworkSlide slide={slide as ExtendedSlide} rect={rect} />
          ),
        }}
      />
    </div>
  );
};

export default GalleryGrid;
