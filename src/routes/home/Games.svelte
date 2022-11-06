<script lang="ts">
  import { formatDate, formatTime } from '$lib/utils/time';
  import { fetchError, fetchStatus, games } from '../store';
  import type { Game } from '$lib/types/game';
  import type { Prono, PronoResult } from '$lib/types/prono';
  import PronoC from '../prono/Prono.svelte';

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
  <ul class="w-[95%] flex flex-col gap-3 pt-4">
    {#if fetchErrorContent !== ''}
      <li class="flex flex-row items-center justify-between bg-col1 text-col4 py-2 px-5 rounded">
        <p class="font-bold">Aucun match</p>
        <p>Problème rencontré lors du chargement: {fetchStatusContent} {fetchErrorContent}</p>
      </li>
    {:else if gamesContent.length === 0}
      <li class="flex flex-row items-center justify-between bg-col1 text-col4 py-2 px-5 rounded">
        <p class="font-bold">Aucun match</p>
        <p>Il n'y a aucun match</p>
      </li>
    {:else}
      {#each gamesContent as [_, game]}
        <PronoC fetchedGame={game} />
      {/each}
    {/if}
  </ul>
</div>
