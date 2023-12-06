import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true
    }),
  ],
  base: "/world-of-warships/",
  server: {
    host: 'localhost',
    port: 3000
  }
})
