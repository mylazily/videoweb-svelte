<script lang="ts">
  import '../app.css';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import TabBar from './components/TabBar.svelte';
  import { page } from '$app/stores';
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-1">
    <slot />
  </main>
  <Footer />
  <TabBar />
</div>
