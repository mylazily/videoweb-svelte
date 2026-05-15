<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  let searchQuery = $state('');
  
  function handleSearch(e: KeyboardEvent) {
    if (e.key === 'Enter' && searchQuery.trim()) {
      goto(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  }
</script>

<header class="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
  <div class="container mx-auto px-4 h-14 flex items-center justify-between">
    <a href="/" class="text-xl font-bold text-pink-500">VideoSite</a>
    
    <div class="flex-1 max-w-md mx-4">
      <input 
        type="text" 
        placeholder="Search videos..."
        bind:value={searchQuery}
        onkeydown={handleSearch}
        class="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:border-pink-500 outline-none text-sm"
      />
    </div>
    
    <nav class="flex items-center gap-4">
      <a href="/category" class="text-sm hover:text-pink-500 transition">Category</a>
      <a href="/rank" class="text-sm hover:text-pink-500 transition">Rank</a>
      <a href="/user/me" class="text-sm hover:text-pink-500 transition">Profile</a>
    </nav>
  </div>
</header>
