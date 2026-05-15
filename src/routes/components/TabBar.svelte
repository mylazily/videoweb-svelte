<script lang="ts">
  import { page } from '$app/stores';
  
  const tabs = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/category', label: 'Category', icon: '📁' },
    { path: '/rank', label: 'Rank', icon: '🏆' },
    { path: '/moments', label: 'Moments', icon: '📸' },
    { path: '/user/me', label: 'Profile', icon: '👤' },
  ];
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-gray-800 md:hidden">
  <div class="flex justify-around py-2">
    {#each tabs as tab}
      <a 
        href={tab.path} 
        class="flex flex-col items-center px-3 py-1 {$page.url.pathname === tab.path ? 'text-pink-500' : 'text-gray-400'}"
      >
        <span class="text-lg">{tab.icon}</span>
        <span class="text-xs mt-1">{tab.label}</span>
      </a>
    {/each}
  </div>
</nav>
