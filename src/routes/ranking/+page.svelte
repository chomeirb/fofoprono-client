<script>
  import { onMount } from 'svelte';
  import Ranking from './Ranking.svelte';
  import RankingBanner from './RankingBanner.svelte';
</script>

<div class="flex flex-col items-center justify-center mt-10 w-full h-full">
  <div class="text-4xl flex flex-row justify-between items-center w-full max-w-8xl">
    <p class="font-bold">CLASSEMENT</p>
  </div>
  <div class="w-full max-w-8xl mt-4 mb-10">
    <Ranking />
  </div>
</div>
