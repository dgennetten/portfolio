import { useQuery } from '@tanstack/react-query';

const FALLBACK: Record<string, string> = {
  hero_image: '/images/Paintings/Car25.jpg',
};

async function fetchSettings(): Promise<Record<string, string>> {
  const res = await fetch('/api/settings.php', { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<Record<string, string>>;
}

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: import.meta.env.DEV ? () => Promise.resolve(FALLBACK) : fetchSettings,
    staleTime: import.meta.env.DEV ? Infinity : 0,
    retry: false,
  });
}
