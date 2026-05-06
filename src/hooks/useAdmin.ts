import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Artwork } from '../types';
import { getStoredAuthToken } from '../services/authService';

type ArtworkInput = Omit<Artwork, 'id' | 'created_at' | 'updated_at'>;

async function apiFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const token = getStoredAuthToken();
  const res = await fetch(path, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error((data as { error?: string }).error ?? 'Request failed');
  return data;
}

export function useAllArtworks() {
  return useQuery({
    queryKey: ['admin', 'artworks'],
    queryFn: () => apiFetch('/api/artworks.php') as Promise<Artwork[]>,
  });
}

export function useCreateArtwork() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ArtworkInput) =>
      apiFetch('/api/artworks.php', { method: 'POST', body: JSON.stringify(data) }) as Promise<Artwork>,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['artworks'] }),
  });
}

export function useUpdateArtwork() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Artwork) =>
      apiFetch('/api/artworks.php', { method: 'PUT', body: JSON.stringify(data) }) as Promise<Artwork>,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['artworks'] }),
  });
}

export function useDeleteArtwork() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/artworks.php?id=${id}`, { method: 'DELETE' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['artworks'] }),
  });
}

export function useReorderArtworks() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (order: { id: number; display_order: number }[]) =>
      apiFetch('/api/artworks.php', { method: 'PATCH', body: JSON.stringify({ order }) }),
    onSuccess: () => Promise.all([
      qc.invalidateQueries({ queryKey: ['artworks'] }),
      qc.invalidateQueries({ queryKey: ['admin', 'artworks'] }),
    ]),
  });
}

export function useUpdateSetting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) =>
      apiFetch('/api/settings.php', { method: 'PUT', body: JSON.stringify({ key, value }) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
  });
}

export function useUploadImage() {
  return useMutation({
    mutationFn: async ({ file, category }: { file: File; category: string }): Promise<{ path: string }> => {
      const token = getStoredAuthToken();
      const form = new FormData();
      form.append('image', file);
      form.append('category', category);
      const res = await fetch('/api/upload.php', {
        method: 'POST',
        credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      });
      const data = await res.json() as { path?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      return data as { path: string };
    },
  });
}
