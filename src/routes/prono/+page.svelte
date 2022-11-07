<script lang="ts">
  import Filter from '../Filter.svelte';
import { fetchLoggedIn } from '../store';
  import Pronos from './Pronos.svelte';
  import { getQueryParamsStore } from './store';
</script>

<div class="flex flex-col items-center justify-center mt-10 w-full h-full">
  {#if !$fetchLoggedIn}
    <p class="text-5xl font-bold text-center w-2/3">Vous devez vous connecter pour effectuer des pronostics !</p>
  {:else}
    <div class="text-4xl flex flex-row justify-between items-center w-full max-w-7xl">
      <p class="font-bold">PRONOSTIQUER</p>
      <button type="submit" form="Pronos" class="bg-col1 text-col4 py-2 px-5 rounded hover:translate-x-3 duration-300">Soumettre →</button>
    </div>
    <div class="w-full max-w-7xl mt-4 mb-10">
      <Pronos />
    </div>
  {/if}
</div>
