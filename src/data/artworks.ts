import { Artwork } from '../types';

export const artworks: Artwork[] = [
  // Logos
  { id: 'logo-1', title: 'Luminary Brewing', media: 'vector, 2013', description: 'New Logo for Luminary Brewing', imageSrc: '/images/Logos/lumbrewlogo.jpg', category: 'logos' },

  // Photography
  { id: 'photo-1', title: 'Rainbo Club', media: 'nikon', description: 'Foggy night outside of the Rainbo Club', imageSrc: '/images/Photography/photography1.jpg', category: 'photography' },
  { id: 'photo-2', title: 'helloi', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography2.jpg', category: 'photography' },
  { id: 'photo-3', title: 'hi', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography3.jpg', category: 'photography' },
  { id: 'photo-4', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography4.jpg', category: 'photography' },
  { id: 'photo-5', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography5.jpg', category: 'photography' },
  { id: 'photo-6', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography6.jpg', category: 'photography' },
  { id: 'photo-7', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography7.jpg', category: 'photography' },    
  { id: 'photo-8', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography8.jpg', category: 'photography' },
  { id: 'photo-9', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography9.jpg', category: 'photography' },
  { id: 'photo-10', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography10.jpg', category: 'photography' },
  { id: 'photo-11', title: 'Untitled', media: 'nikon', description: 'Some description..', imageSrc: '/images/Photography/photography11.jpg', category: 'photography' },
  // Design Projects 
  { id: 'projectA', title: 'Abbott', media: 'Vector Illustration', description: 'Design work for Abbott Labs', imageSrc: '/images/Projects/Abbott/AbbottLogo.png', category: 'projects' },
  { id: 'projectB', title: 'Luminary Brewing Identity', media: '', description: 'Identity for my brother\'s Home Brew', imageSrc: '/images/Projects/LuminaryBrewingIdentity/LuminaryLogo.jpg', category: 'projects' },

  // Design Project DETAILS
  { id: 'detailsA-1', title: 'Time Cover', media: 'Vector Illustration and Design', description: 'Time covdr', imageSrc: '/images/Projects/Abbott/TIME_cover.jpg', category: 'detailsA' },
  { id: 'detailsA-2', title: 'Virus Hunters Logo', media: 'Vector Illustration and Design', description: 'Abbott Labs Logo', imageSrc: '/images/Projects/Abbott/VirusHunters_lockup_926x926.jpg', category: 'detailsA' },
  { id: 'detailsA-3', title: 'Abbott Logo 2', media: 'Vector Illustration and Design', description: 'Abbott Labs Logo 2', imageSrc: '/images/Projects/Abbott/AbbottLogo2.png', category: 'detailsA' },
  { id: 'detailsA-4', title: 'Abbott Logo 3', media: 'Vector Illustration and Design', description: 'Abbott Labs Logo 3', imageSrc: '/images/Projects/Abbott/AbbottLogo3.png', category: 'detailsA' },
  { id: 'detailsA-5', title: 'Abbott Logo 4', media: 'Vector Illustration and Design', description: 'Abbott Labs Logo 4', imageSrc: '/images/Projects/Abbott/AbbottLogo4.png', category: 'detailsA' },
  { id: 'detailsA-6', title: 'Abbott Logo 5', media: 'Vector Illustration and Design', description: 'Abbott Labs Logo 5', imageSrc: '/images/Projects/Abbott/AbbottLogo5.png', category: 'detailsA' },  
  { id: 'detailsB-1', title: 'Small logo and Bottle Cap Version', media: 'Photo and Vector Illustration', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/LuminaryBrewingIdentity/identity1.jpg', category: 'detailsB' },
  { id: 'detailsB-2', title: 'Bottle Label', media: 'Photo and Vector Illustration', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/LuminaryBrewingIdentity/identity2.jpg', category: 'detailsB' },
  { id: 'detailsB-3', title: 'Bottle Label 2', media: 'Photo and Vector Illustration', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/LuminaryBrewingIdentity/identity3.jpg', category: 'detailsB' },
  { id: 'detailsB-4', title: 'Bottle Label 3', media: 'Photo and Vector Illustration', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/LuminaryBrewingIdentity/identity4.jpg', category: 'detailsB' },
  { id: 'detailsB-5', title: 'Bottle Label 4', media: 'Photo and Vector Illustration', description: 'These bonnett and apron decorations are in honor of a still-born or aborted child. Tokyo, Japan.', imageSrc: '/images/Projects/LuminaryBrewingIdentity/identity5.jpg', category: 'detailsB' },
];

export const featuredArtworks: Artwork[] = [
  artworks.find(art => art.id === 'logo-1')!,
  artworks.find(art => art.id === 'photo-1')!,
  artworks.find(art => art.id === 'photo-1')!,
];

export const getCategoryArtworks = (category: string) => {
  return artworks.filter(artwork => artwork.category === category);
};