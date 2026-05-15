<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Hls from 'hls.js';
  
  const id = $derived($page.params.id);
  
  let video = $state<any>(null);
  let loading = $state(true);
  let videoEl: HTMLVideoElement | undefined = $state();
  let hls: Hls | undefined = $state();
  
  onMount(async () => {
    try {
      const res = await fetch(`/api/v1/videos/${id}`);
      const data = await res.json();
      video = data.data;
      
      // 初始化 HLS 播放器
      if (video?.play_url && videoEl) {
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(video.play_url);
          hls.attachMedia(videoEl);
        } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
          videoEl.src = video.play_url;
        }
      }
    } catch (e) {
      console.error('Failed to load video:', e);
    } finally {
      loading = false;
    }
    
    return () => {
      hls?.destroy();
    };
  });
</script>

<svelte:head>
  <title>{video?.title || 'Loading...'} - VideoSite</title>
</svelte:head>

<div class="container mx-auto px-4 py-4">
  {#if loading}
    <div class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
    </div>
  {:else if video}
    <div class="aspect-video bg-black rounded-lg overflow-hidden">
      <video bind:this={videoEl} controls autoplay class="w-full h-full"></video>
    </div>
    
    <div class="mt-4">
      <h1 class="text-xl font-bold">{video.title}</h1>
      <div class="flex items-center gap-4 mt-2 text-sm text-gray-400">
        <span>{video.views?.toLocaleString() || 0} views</span>
        <span>{video.created_at}</span>
      </div>
      <p class="mt-4 text-gray-300">{video.description}</p>
    </div>
    
    <div class="mt-6 flex gap-4">
      <button class="px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-600 transition">Like</button>
      <button class="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Share</button>
      <button class="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Save</button>
    </div>
  {:else}
    <div class="text-center py-20 text-gray-400">Video not found</div>
  {/if}
</div>
