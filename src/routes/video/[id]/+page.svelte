<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  const id = $derived($page.params.id);
  let video = $state<any>(null);
  let loading = $state(true);
  
  onMount(async () => {
    try {
      const res = await fetch(`/api/v1/videos/${id}`);
      const data = await res.json();
      video = data.data;
    } catch (e) {
      console.error('Failed:', e);
    } finally {
      loading = false;
    }
  });
  
  function playVideo() {
    goto(`/play/${id}`);
  }
</script>

<svelte:head>
  <title>{video?.title || 'Video'} - VideoSite</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  {#if loading}
    <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>
  {:else if video}
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <div class="aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer relative" onclick={playVideo}>
          <img src={video.cover} alt={video.title} class="w-full h-full object-cover" />
          <div class="absolute inset-0 flex items-center justify-center bg-black/30">
            <div class="w-16 h-16 bg-pink-500/80 rounded-full flex items-center justify-center">
              <span class="text-2xl">▶</span>
            </div>
          </div>
        </div>
        <h1 class="mt-4 text-xl font-bold">{video.title}</h1>
        <p class="mt-2 text-gray-400">{video.views?.toLocaleString()} views • {video.created_at}</p>
        <p class="mt-4">{video.description}</p>
      </div>
      <div>
        <h3 class="text-lg font-bold mb-4">Related Videos</h3>
        <div class="space-y-3">
          <!-- Related videos would go here -->
        </div>
      </div>
    </div>
  {:else}
    <div class="text-center py-20 text-gray-400">Video not found</div>
  {/if}
</div>
