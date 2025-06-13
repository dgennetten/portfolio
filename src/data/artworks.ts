import { Artwork } from '../types';

export const artworks: Artwork[] = [
  // Logos
  { id: 'logo-1', title: 'Luminary Brewing', media: 'vector, 2013', description: 'New Logo for Luminary Brewing', imageSrc: '/images/Logos/lumbrewlogo.jpg', category: 'logos' },

  // Photography
  { id: 'photo-1', title: 'Rainbo Club', media: 'nikon', description: 'Foggy night outside of the Rainbo Club', imageSrc: '/images/Photography/photography1.jpg', category: 'photography' },
  { id: 'photo-2', title: 'hello', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography2.jpg', category: 'photography' },
  { id: 'photo-3', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography3.jpg', category: 'photography' },
  { id: 'photo-4', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography4.jpg', category: 'photography' },
  { id: 'photo-5', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography5.jpg', category: 'photography' },
  { id: 'photo-6', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography6.jpg', category: 'photography' },
  { id: 'photo-7', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography7.jpg', category: 'photography' },    
  { id: 'photo-8', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography8.jpg', category: 'photography' },
  { id: 'photo-9', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography9.jpg', category: 'photography' },
  { id: 'photo-10', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography10.jpg', category: 'photography' },
  { id: 'photo-11', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography11.jpg', category: 'photography' },
  // Design Projects 
  { id: 'projectA', title: 'Saxy', media: 'Colorado Yule Marble, 70cm, 2.5cm granite base, 80kg, 2008', description: 'Abstract Saxaphone sculpted from Colorado Yule Marble', imageSrc: '/images/Projects/ProjectA/Saxy0.jpg', category: 'projects' },
  { id: 'projectB', title: 'Project B', media: 'Digital photography, Olympus prototype, 1999`', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/ProjectB/MarbleMuse1.jpg', category: 'projects' },

  // Design Project DETAILS
  { id: 'detailsA-1', title: 'Saxy', media: 'Colorado Yule Marble, 70cm, 2.5cm granite base, 80kg, 2008', description: 'Saxy, a 250 pound abstact saxaphone sculpted from marble', imageSrc: '/images/Projects/ProjectA/Saxy1.jpg', category: 'detailsA' },
  { id: 'detailsA-2', title: 'Saxy on Display', media: 'On display in the Centennial Gallery', description: 'Fort Collins, CO', imageSrc: '/images/Projects/ProjectA/Saxy2.jpg', category: 'detailsA' },
  { id: 'detailsA-3', title: 'Saxy in Process', media: 'MARBLEmarble symposium, Marble, CO', description: 'Marble, Colorado', imageSrc: '/images/Projects/ProjectA/Saxy3.jpg', category: 'detailsA' },
  { id: 'detailsA-4', title: 'Saxy in the raw', media: 'MARBLEmarble symposium, Marble, CO', description: 'Marble, Colorado', imageSrc: '/images/Projects/ProjectA/Saxy4.jpg', category: 'detailsA' },
  
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