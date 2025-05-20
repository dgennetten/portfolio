export interface Artwork {
  id: string;
  title: string;
  media: string;
  description: string;
  imageSrc: string;
  category: 'logos' | 'photography';
}

export type Category = 'logos' | 'photography';