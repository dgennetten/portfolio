export interface Artwork {
  id: string;
  title: string;
  media: string;
  description: string;
  imageSrc: string;
  category: 'logos' | 'photography' | 'projects';
}

export type Category = 'logos' | 'photography' | 'projects';