import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const apiTarget = process.env.VITE_API_URL || 'http://localhost:4000';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: apiTarget,
        ws: true,
      },
    },
  },
});
