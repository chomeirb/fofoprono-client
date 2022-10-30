<script lang="ts">
  import { formatDate, formatTime } from '$lib/utils/time';
  import { fetchError, fetchStatus, games } from '../store';
  import type { Game } from '$lib/types/game';
  import type { Prono } from '$lib/types/prono';

  let gamesContent: [Prono, Game][] = [];
  let fetchErrorContent: String;
  let fetchStatusContent: number;

  games.subscribe((value: [Prono, Game][]) => {
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
        <li class="flex flex-row justify-between w-full gap-5 h-full items-center py-3 shadow-xl border px-3">
          <div class="flex flex-row gap-10 justify-between w-1/4 text-lg pr-24">
            <p>{formatDate(game.time)}</p>
            <p>{formatTime(game.time)}</p>
          </div>
          <div class="flex flex-row text-2xl gap-5 h-full items-center justify-between w-2/5">
            <p class="w-1/3">{game.team_home.toUpperCase()}</p>
            <div class="flex flex-row justify-center gap-5 w-1/5">
              <p class="w-7 bg-col1 text-col4 rounded text-center">
                {game.score_home == null ? '' : game.score_home}
              </p>
              <p class="w-7 bg-col1 text-col4 rounded text-center">
                {game.score_away == null ? '' : game.score_away}
              </p>
            </div>
            <p class="w-1/3 text-right">{game.team_away.toUpperCase()}</p>
          </div>
          <div class="flex flex-row justify-end w-1/4">
            <p class="text-lg">{game.stage}</p>
          </div>
        </li>
      {/each}
    {/if}
  </ul>
</div>
