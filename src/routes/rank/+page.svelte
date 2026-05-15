<script lang="ts">
  import { onMount } from 'svelte';
  
  let rankings = $state<any[]>([]);
  let loading = $state(true);
  let activeTab = $state('daily');
  
  onMount(async () => {
    await loadRankings();
  });
  
  async function loadRankings() {
    loading = true;
    try {
      const res = await fetch(`/api/v1/rank?type=${activeTab}`);
      const data = await res.json();
      rankings = data.data || [];
    } catch (e) {
      console.error('Failed:', e);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Rankings - VideoSite</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  <h1 class="text-xl font-bold mb-4">Rankings</h1>
  
  <div class="flex gap-2 mb-6">
    {#each ['daily', 'weekly', 'monthly'] as type}
      <button 
        onclick={() => { activeTab = type; loadRankings(); }}
        class="px-4 py-2 rounded-lg {activeTab === type ? 'bg-pink-500' : 'bg-gray-700'} transition"
      >
        {type}
      </button>
    {/each}
  </div>
  
  {#if loading}
    <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>
  {:else if rankings.length > 0}
    <div class="space-y-3">
      {#each rankings as video, i}
        <a href="/video/{video.id}" class="flex items-center gap-4 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
          <span class="w-8 text-center font-bold {i < 3 ? 'text-pink-500' : 'text-gray-400'}">{i + 1}</span>
          <img src={video.cover} alt={video.title} class="w-24 h-14 object-cover rounded" />
          <div class="flex-1">
            <h3 class="font-medium">{video.title}</h3>
            <p class="text-sm text-gray-400">{video.views?.toLocaleString()} views</p>
          </div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="text-center py-20 text-gray-400">No rankings</div>
  {/if}
</div>
