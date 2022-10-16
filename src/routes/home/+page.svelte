<script>
  import { slide } from "$lib/utils/effects";
  import Games from "./Games.svelte";
  import { curtain } from "../store";

  let curtainValue = true;
  curtain.subscribe((value) => {
    curtainValue = value;
  });
</script>

<div class="flex flex-col items-center justify-center w-full h-[83vh]">
  {#if curtainValue}
    <div
      id="welcome"
      class="absolute bg-col1 text-col4  h-[83vh] w-full flex flex-row items-center justify-center duration-500"
    >
      <p class="text-6xl font-bold p-60 text-center">
        Bienvenue sur FOFOPRONO, sur le site de pronostics de la coupe du monde
        2022!
      </p>
      <button
        class="py-2 px-5 rounded h-full text-8xl w-1/3"
        on:mouseenter={slide(-10, "welcome")}
        on:mouseleave={slide(0, "welcome")}
        on:click={slide(-100, "welcome")}
      >
        →</button
      >
    </div>
  {/if}
  <!-- <Welcome /> -->
  <div
    class="flex flex-col items-center justify-center w-full h-[83vh]"
    on:mouseenter={slide(-100, "welcome")}
  >
    <div
      class="text-4xl flex flex-row justify-between items-center pt-10 w-full max-w-7xl"
    >
      <p class="font-bold">MATCHS</p>
      <a
        href="/prono"
        class="bg-col1 text-col4 py-2 px-5 rounded hover:translate-x-3 duration-300"
        >Pronostiquer →</a
      >
    </div>
    <div class="w-full max-w-7xl mt-4 mb-10 overflow-y-scroll shadow-in">
      <Games />
    </div>
  </div>
</div>
