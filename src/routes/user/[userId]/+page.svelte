<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  const userId = $derived($page.params.userId);
  let user = $state<any>(null);
  let videos = $state<any[]>([]);
  let loading = $state(true);
  
  onMount(async () => {
    try {
      const [userRes, videosRes] = await Promise.all([
        fetch(`/api/v1/users/${userId}`),
        fetch(`/api/v1/users/${userId}/videos`)
      ]);
      const userData = await userRes.json();
      const videosData = await videosRes.json();
      user = userData.data;
      videos = videosData.data?.items || [];
    } catch (e) {
      console.error('Failed:', e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{user?.name || 'User'} - VideoSite</title>
</svelte:head>

<div class="container mx-auto px-4 py-6">
  {#if loading}
    <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>
  {:else if user}
    <div class="flex items-center gap-4 mb-6">
      <img src={user.avatar || '/default-avatar.png'} alt={user.name} class="w-20 h-20 rounded-full" />
      <div>
        <h1 class="text-xl font-bold">{user.name}</h1>
        <p class="text-gray-400">{user.bio || 'No bio'}</p>
        <div class="flex gap-4 mt-2 text-sm text-gray-400">
          <span>{user.followers} followers</span>
          <span>{user.following} following</span>
        </div>
      </div>
    </div>
    
    <h2 class="text-lg font-bold mb-4">Videos</h2>
    {#if videos.length > 0}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      <p class="text-gray-400">No videos yet</p>
    {/if}
  {:else}
    <div class="text-center py-20 text-gray-400">User not found</div>
  {/if}
</div>
