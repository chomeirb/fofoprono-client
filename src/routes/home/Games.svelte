<script lang="ts">
  import { fetchError, fetchStatus, games } from '../store';
  import type { Game } from '$lib/types/game';
  import type { PronoResult } from '$lib/types/prono';
  import GamesDisplay from '../components/GamesDisplay/GamesDisplay.svelte';
    import { onDestroy } from 'svelte';

  let gamesContent: [PronoResult, Game][] = [];
  let fetchErrorContent: String;
  let fetchStatusContent: number;

  const unsubscribeGames = games.subscribe((value: [PronoResult, Game][]) => {
    gamesContent = value;
  });

  const unsubscribeFetchError = fetchError.subscribe((value: String) => {
    fetchErrorContent = value;
  });

  const unsubscribeFetchStatus = fetchStatus.subscribe((value: number) => {
    fetchStatusContent = value;
  });

  onDestroy(() => {
    unsubscribeGames();
    unsubscribeFetchError();
    unsubscribeFetchStatus();
  });
</script>

<div class="flex flex-col items-center justify-center h-full w-full">
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
