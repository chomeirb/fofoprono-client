<script lang="ts">
  import { fetchLoggedIn } from '../store';
  import Pronos from './Pronos.svelte';
</script>

<div class="flex flex-col items-center justify-center mt-5 w-full h-full">
  {#if !$fetchLoggedIn}
    <p class="text-5xl font-bold text-center w-2/3">Vous devez vous connecter pour effectuer des pronostics !</p>
  {:else}
    <div class="text-4xl m8:text-xl flex flex-row justify-between items-center w-full max-w-8xl m8:px-3">
      <p class="font-bold m8:text-xl">PRONOSTIQUER</p>
      <button
        type="submit"
        form="Pronos"
        class="bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded hover:translate-x-3 duration-300">Soumettre →</button>
    </div>
    <div class="w-full max-w-8xl mt-4 m8:mt-2">
      <Pronos />
    </div>
  {/if}
</div>
