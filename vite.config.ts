import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = mode === 'development';

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        // Always proxy images to the live server in dev — images live there, not locally.
        ...(isDev && {
          '/images': {
            target: 'https://douglas.gennetten.com',
            changeOrigin: true,
            secure: true,
          },
        }),
        // Proxy /api to the live server only when explicitly opted in (VITE_PROXY_API=true).
        // By default, /api 404s and the static-data fallback handles it.
        ...(env.VITE_PROXY_API === 'true' && {
          '/api': {
            target: 'https://douglas.gennetten.com',
            changeOrigin: true,
            secure: true,
          },
        }),
      },
    },
  };
});
