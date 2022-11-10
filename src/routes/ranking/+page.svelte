<script>
  import { onMount } from 'svelte';
  import { getPlayers } from './fetchPlayers';
  import Ranking from './Ranking.svelte';
  import RankingBanner from './RankingBanner.svelte';

  onMount(async () => {
    getPlayers();
  });
</script>

<div class="flex flex-col items-center justify-center py-10 w-full h-full">
  <div class="text-4xl flex flex-row justify-between items-center w-full max-w-8xl">
    <p class="font-bold">CLASSEMENT</p>
  </div>
  <div class="w-full max-w-7xl mt-5 bg-primary dark:bg-secondary text-secondary dark:text-primary items-center">
    <RankingBanner />
  </div>
  <div class="flex flex-col justify-start overflow-y-scroll w-full max-w-7xl mb-10 shadow-in">
    <Ranking />
  </div>
</div>
