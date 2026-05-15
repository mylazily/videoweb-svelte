<script lang="ts">
  import { onMount } from 'svelte';
  
  let categories = $state<any[]>([]);
  let loading = $state(true);
  
  onMount(async () => {
    try {
      const res = await fetch('/api/v1/categories');
      const data = await res.json();
      categories = data.data || [];
    } catch (e) {
      console.error('Failed:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Categories - VideoSite</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  <h1 class="text-xl font-bold mb-6">Categories</h1>
  
  {#if loading}
    <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>
  {:else if categories.length > 0}
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {#each categories as cat}
        <a href="/category/{cat.slug}" class="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-center">
          <div class="text-3xl mb-2">{cat.icon || '📁'}</div>
          <div class="font-medium">{cat.name}</div>
          <div class="text-sm text-gray-400">{cat.count} videos</div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="text-center py-20 text-gray-400">No categories</div>
  {/if}
</div>
