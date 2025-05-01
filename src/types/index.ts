export interface Artwork {
  id: string;
  title: string;
  media: string;
  description: string;
  imageSrc: string;
  category: 'drawings' | 'paintings' | 'sculptures' | 'geometric' | 'design' | 'photography' | 'WIPdrawings' | 'WIPsculptures' | 'WIPkinetics';
}

export type Category = 'drawings' | 'paintings' | 'sculptures' | 'geometric' | 'design' | 'photography' | 'WIPdrawings' | 'WIPsculptures' | 'WIPkinetics';