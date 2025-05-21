import { Artwork } from '../types';

export const artworks: Artwork[] = [
  // Logos
  { id: 'logo-1', title: 'trolley', media: 'vector, 2024', description: 'New trolley logo', imageSrc: '/images/Logos/Trolley.jpg', category: 'logos' },

  // Photography
  { id: 'photo-1', title: 'Untitled', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Photography/Tokyo10231999.jpg', category: 'photography' },

  // Design Projects 
  { id: 'project-a', title: 'Project A', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'projects' },
  { id: 'project-b', title: 'Project B', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'projects' },
  { id: 'project-c', title: 'Project C', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'projects' },

  // Design Project DETAILS
  { id: 'details-a-1', title: 'Saxy', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'details-a' },
  { id: 'details-a-2', title: 'Saxy', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'details-a' },
  { id: 'details-a-3', title: 'Saxy', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'details-a' },
  
  { id: 'details-b-1', title: 'Saxy', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'details-b' },
  { id: 'details-b-2', title: 'Saxy', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'details-b' },
  { id: 'details-b-3', title: 'Saxy', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'details-b' },

  { id: 'details-c-1', title: 'Saxy', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'details-c' },
  { id: 'details-c-2', title: 'Saxy', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'details-c' },
  { id: 'details-c-3', title: 'Saxy', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/Saxy.jpg', category: 'details-c' },
];

export const featuredArtworks: Artwork[] = [
  artworks.find(art => art.id === 'logo-1')!,
  artworks.find(art => art.id === 'photo-1')!,
  artworks.find(art => art.id === 'photo-1')!,
];

export const getCategoryArtworks = (category: string) => {
  return artworks.filter(artwork => artwork.category === category);
};