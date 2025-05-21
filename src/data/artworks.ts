import { Artwork } from '../types';

export const artworks: Artwork[] = [
  // Logos
  { id: 'logo-1', title: 'trolley', media: 'vector, 2024', description: 'New trolley logo', imageSrc: '/images/Logos/Trolley.jpg', category: 'logos' },

  // Photography
  { id: 'photo-1', title: 'Untitled', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Photography/Tokyo10231999.jpg', category: 'photography' },

  // Design Projects 
  { id: 'projectA', title: 'Project A', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/ProjectA/Saxy1.jpg', category: 'projects' },
  { id: 'projectB', title: 'Project B', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/ProjectB/MarbleMuse1.jpg', category: 'projects' },

  // Design Project DETAILS
  { id: 'detailsA-1', title: 'Detail 1 of Project A', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/ProjectA/Saxy2.jpg', category: 'detailsA' },
  { id: 'detailsA-2', title: 'Detail 2 of Project A', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/ProjectA/Saxy3.jpg', category: 'detailsA' },
  { id: 'detailsA-3', title: 'Detail 3 of Project A', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/ProjectA/Saxy4.jpg', category: 'detailsA' },
  
  { id: 'detailsB-1', title: 'Detail 1 of B', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/ProjectB/MarbleMuse2.jpg', category: 'detailsB' },
  { id: 'detailsB-2', title: 'Detail 2 of B', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/ProjectB/MarbleMuse3.jpg', category: 'detailsB' },
  { id: 'detailsB-3', title: 'Detail 3 of B', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/ProjectB/MarbleMuse4.jpg', category: 'detailsB' },
];

export const featuredArtworks: Artwork[] = [
  artworks.find(art => art.id === 'logo-1')!,
  artworks.find(art => art.id === 'photo-1')!,
  artworks.find(art => art.id === 'photo-1')!,
];

export const getCategoryArtworks = (category: string) => {
  return artworks.filter(artwork => artwork.category === category);
};