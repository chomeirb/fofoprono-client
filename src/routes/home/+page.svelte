<script>
  import { slide } from '$lib/utils/effects';
  import Games from './Games.svelte';
  import { curtain } from '../store';
  import { onDestroy } from 'svelte';

  let curtainValue = true;
  const unsubscribeCurtain = curtain.subscribe((value) => {
    curtainValue = value;
  });

  onDestroy(unsubscribeCurtain);
</script>

<div class="flex flex-col items-center justify-start w-full h-full">
  {#if curtainValue}
    <div
      id="welcome"
      class="absolute m12:hidden bg-gradient-to-bl from-primary to-black dark:bg-secondary text-secondary  h-[calc(100vh_-_180px)] w-full flex flex-row items-center justify-between duration-500 z-10">
      <p class="text-6xl font-bold ml-10 text-center">Bienvenue sur FOFOPRONO, le site de pronostics de la coupe du monde 2022!</p>
      <button
        class="py-2 px-5 rounded h-full text-8xl w-[20%]"
        on:mouseenter={slide(-10, 'welcome')}
        on:mouseleave={slide(0, 'welcome')}
        on:click={slide(-100, 'welcome')}>
        →</button>
    </div>
  {/if}
  <div class="flex flex-col items-center justify-start h-full w-full pt-3 m8:pt-0" on:mouseenter={slide(-100, 'welcome')}>
    <div class="text-4xl h-[10%] m8:h-[8%] m12:text-2xl flex flex-row m12:flex-col justify-between m12:justify-center m12:gap-5 items-center w-full max-w-8xl px-3">
      <p class="text-primary dark:text-secondary font-bold">CALENDRIER/RÉSULTATS</p>
      <a
        href="/prono"
        class="bg-primary dark:bg-secondary text-secondary dark:text-primary m12:text-lg py-2 px-5 m12:hidden rounded hover:translate-x-3 duration-300"
        >Pronostiquer →</a>
    </div>
    <div class="w-full max-w-8xl px-3 m12:px-0 h-[83%]">
      <Games />
    </div>
  </div>
</div>
