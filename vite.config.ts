import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/gbachnguyen-jwst-backend-processor\.hf\.space\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'nasa-deepsky-cache',
              expiration: {
                maxEntries: 10000, // Có thể chứa tới 10,000 ảnh mảnh nhỏ (tiles)
                maxAgeSeconds: 60 * 60 * 24 * 30, // Lưu trong 30 ngày
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
});
