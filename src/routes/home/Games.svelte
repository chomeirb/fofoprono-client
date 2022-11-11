<script lang="ts">
  import { fetchError, fetchStatus, games } from '../store';
  import type { Game } from '$lib/types/game';
  import type { PronoResult } from '$lib/types/prono';
  import GamesDisplay from '../GamesDisplay/GamesDisplay.svelte';

  let gamesContent: [PronoResult, Game][] = [];
  let fetchErrorContent: String;
  let fetchStatusContent: number;

  games.subscribe((value: [PronoResult, Game][]) => {
    gamesContent = value;
  });

  fetchError.subscribe((value: String) => {
    fetchErrorContent = value;
  });

  fetchStatus.subscribe((value: number) => {
    fetchStatusContent = value;
  });
</script>

<div class="flex flex-col items-center justify-center mb-3 w-full">
  {#if fetchErrorContent !== ''}
    <div class="flex flex-row items-center justify-between bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded">
      <p class="font-bold">Aucun match</p>
      <p>Problème rencontré lors du chargement: {fetchStatusContent} {fetchErrorContent}</p>
    </div>
  {:else if gamesContent.length === 0}
    <div class="flex flex-row items-center justify-between bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded">
      <p class="font-bold">Aucun match</p>
      <p>Il n'y a aucun match</p>
    </div>
  {:else}
    <GamesDisplay pronoMode={false} games={$games} />
  {/if}
</div>
