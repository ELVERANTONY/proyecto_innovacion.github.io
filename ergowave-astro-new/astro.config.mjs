import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-site.com',
  base: '/',
  build: {
    outDir: './dist',
  },
  devToolbar: {
    enabled: false
  }
});
