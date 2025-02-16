import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.BASE_PATH || '/',
  plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'], // Add more static pages as needed
				// previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
		tailwindcss(),
	],
  build: {
    outDir: 'dist',
  },
  server: {
    open: false, // Automatically open in your browser during dev
  },
});
