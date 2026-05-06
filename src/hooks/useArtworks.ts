import { useQuery } from '@tanstack/react-query';
import type { Artwork } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptStatic(a: any, index: number): Artwork {
  return {
    id: index + 1,
    title: a.title,
    media: a.media ?? null,
    description: a.description ?? null,
    image_src: a.imageSrc,
    category: a.category,
    display_order: index,
    is_featured: 0,
    featured_order: null,
  };
}

// ── Static fallbacks (dev only) ───────────────────────────────────────────────

async function staticCategory(category: string): Promise<Artwork[]> {
  const { getCategoryArtworks } = await import('../data/artworks');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (getCategoryArtworks(category) as any[]).map(adaptStatic);
}

async function staticFeatured(): Promise<Artwork[]> {
  const { featuredArtworks } = await import('../data/artworks');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (featuredArtworks as any[]).map((a, i) => ({
    ...adaptStatic(a, i),
    is_featured: 1,
    featured_order: i + 1,
  }));
}

// ── Live API fetches (production) ─────────────────────────────────────────────

async function apiCategory(category: string): Promise<Artwork[]> {
  const res = await fetch(`/api/artworks.php?category=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<Artwork[]>;
}

async function apiFeatured(): Promise<Artwork[]> {
  const res = await fetch('/api/artworks.php?featured=1');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<Artwork[]>;
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

export function useArtworks(category: string) {
  return useQuery({
    queryKey: ['artworks', category],
    queryFn: import.meta.env.DEV
      ? () => staticCategory(category)
      : () => apiCategory(category),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useFeaturedArtworks() {
  return useQuery({
    queryKey: ['artworks', 'featured'],
    queryFn: import.meta.env.DEV ? staticFeatured : apiFeatured,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
