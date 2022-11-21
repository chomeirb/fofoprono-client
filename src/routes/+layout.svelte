<script>
  import '../app.css';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import { onMount } from 'svelte';
  import { getGames } from './fetchGames';

  onMount(async () => {
    getGames();
  });
</script>

<head>
  <style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type='number'] {
      -moz-appearance: textfield;
    }
  </style>
</head>

<div class="flex flex-col h-[100vh] m8:h-[calc(100vh_+_90px)]">
  <Header />

  <main class="h-[calc(100vh_-_180px)] m8:h-[calc(100vh_-_60px)] text-primary dark:text-secondary overflow-y-auto">
    <slot />
  </main>

  <Footer />
</div>
