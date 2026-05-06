export type Category =
  | 'drawings' | 'paintings' | 'sculptures' | 'prints' | 'geometric'
  | 'design' | 'photography' | 'code'
  | 'WIPdrawings' | 'WIPsculptures' | 'WIPkinetics' | 'WIPprints';

export interface Artwork {
  id: number;
  title: string;
  media: string | null;
  description: string | null;
  image_src: string;
  category: Category;
  display_order: number;
  is_featured: number;        // 0 | 1
  featured_order: number | null;
  created_at?: string;
  updated_at?: string;
}
