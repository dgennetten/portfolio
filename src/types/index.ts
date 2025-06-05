export interface Artwork {
  id: string;
  title: string;
  media: string;
  description: string;
  imageSrc: string;
  category: 'drawings' | 'paintings' | 'sculptures' | 'prints' | 'geometric' | 'design' | 'photography' | 'WIPdrawings' | 'WIPsculptures' | 'WIPkinetics' | 'WIPprints';
}

export type Category = 'drawings' | 'paintings' | 'sculptures' | 'prints' | 'geometric' | 'design' | 'photography' | 'WIPdrawings' | 'WIPsculptures' | 'WIPkinetics' | 'WIPprints';