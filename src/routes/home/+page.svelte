<script>
  import { slide } from '$lib/utils/effects';
  import Games from './Games.svelte';
  import { curtain } from '../store';

  let curtainValue = true;
  curtain.subscribe((value) => {
    curtainValue = value;
  });
</script>

<div class="flex flex-col items-center justify-center w-full h-full">
  {#if curtainValue}
    <div id="welcome" class="absolute bg-primary dark:bg-secondary text-secondary dark:text-primary  h-[calc(100vh_-_180px)] w-full flex flex-row items-center justify-center duration-500 z-10">
      <p class="text-6xl font-bold p-60 text-center">Bienvenue sur FOFOPRONO, sur le site de pronostics de la coupe du monde 2022!</p>
      <button
        class="py-2 px-5 rounded h-full text-8xl w-1/3"
        on:mouseenter={slide(-10, 'welcome')}
        on:mouseleave={slide(0, 'welcome')}
        on:click={slide(-100, 'welcome')}>
        →</button>
    </div>
  {/if}
  <!-- <Welcome /> -->
  <div class="flex flex-col items-center mt-10 justify-center w-full" on:mouseenter={slide(-100, 'welcome')}>
    <div class="text-4xl flex flex-row justify-between items-center pt-10 w-full max-w-8xl">
      <p class="text-primary dark:text-secondary font-bold">MATCHS</p>
      <a href="/prono" class="bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded hover:translate-x-3 duration-300">Pronostiquer →</a>
    </div>
    <div class="w-full max-w-8xl mt-4 mb-10">
      <Games />
    </div>
  </div>
</div>
