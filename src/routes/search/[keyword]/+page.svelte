<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  const keyword = $derived($page.params.keyword);
  let results = $state<any[]>([]);
  let loading = $state(true);
  let total = $state(0);
  
  onMount(async () => {
    try {
      const res = await fetch(`/api/v1/search?keyword=${encodeURIComponent(keyword)}&page=1`);
      const data = await res.json();
      results = data.data?.items || [];
      total = data.data?.total || 0;
    } catch (e) {
      console.error('Search failed:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Search: {keyword} - VideoSite</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  <h1 class="text-xl font-bold">Search results for "{keyword}"</h1>
  <p class="text-gray-400 mt-1">{total} results found</p>
  
  {#if loading}
    <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>
  {:else if results.length > 0}
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
      {#each results as video}
        <a href="/video/{video.id}" class="group">
          <div class="aspect-video rounded-lg overflow-hidden bg-gray-800">
            <img src={video.cover} alt={video.title} class="w-full h-full object-cover group-hover:scale-105 transition" />
          </div>
          <h3 class="mt-2 text-sm line-clamp-2">{video.title}</h3>
        </a>
      {/each}
    </div>
  {:else}
    <div class="text-center py-20 text-gray-400">No results found</div>
  {/if}
</div>
