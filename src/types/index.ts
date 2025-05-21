export interface Artwork {
  id: string;
  title: string;
  media: string;
  description: string;
  imageSrc: string;
  category: 'logos' | 'photography' | 'projects' | 'detailsA' | 'detailsB' | 'detailsC';
  // Add more categories as needed
}

export type Category = 'logos' | 'photography' | 'projects' | 'detailsA' | 'detailsB' | 'detailsC';