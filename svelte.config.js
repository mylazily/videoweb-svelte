import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: true,
      strict: false
    }),
    prerender: {
      entries: ['*', '/video', '/category', '/search', '/play', '/user', '/actor', '/rank', '/moments', '/messages', '/shop', '/tasks', '/achievements'],
      handleHttpError: 'ignore'
    }
  }
};
