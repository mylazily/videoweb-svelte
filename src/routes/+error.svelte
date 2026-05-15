<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="min-h-screen flex items-center justify-center">
  <div class="text-center">
    <h1 class="text-6xl font-bold text-pink-500">{$page.status}</h1>
    <p class="mt-4 text-xl">{$page.error?.message || 'Page not found'}</p>
    <a href="/" class="mt-6 inline-block px-6 py-2 bg-pink-500 rounded-lg hover:bg-pink-600 transition">Go Home</a>
  </div>
</div>
