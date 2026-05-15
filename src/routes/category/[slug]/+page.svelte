<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  const slug = $derived($page.params.slug);
  let videos = $state<any[]>([]);
  let category = $state<any>(null);
  let loading = $state(true);
  
  onMount(async () => {
    try {
      const res = await fetch(`/api/v1/categories/${slug}/videos?page=1`);
      const data = await res.json();
      videos = data.data?.items || [];
      category = data.data?.category;
    } catch (e) {
      console.error('Failed:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{category?.name || 'Category'} - VideoSite</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  <h1 class="text-xl font-bold">{category?.name || slug}</h1>
  
  {#if loading}
    <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>
  {:else if videos.length > 0}
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
      {#each videos as video}
        <a href="/video/{video.id}" class="group">
          <div class="aspect-video rounded-lg overflow-hidden bg-gray-800">
            <img src={video.cover} alt={video.title} class="w-full h-full object-cover group-hover:scale-105 transition" />
          </div>
          <h3 class="mt-2 text-sm line-clamp-2">{video.title}</h3>
        </a>
      {/each}
    </div>
  {:else}
    <div class="text-center py-20 text-gray-400">No videos in this category</div>
  {/if}
</div>
