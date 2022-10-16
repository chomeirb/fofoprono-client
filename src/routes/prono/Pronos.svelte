<script lang="ts">
  import type { Game } from '$lib/types/game';
  import type { Prono } from '$lib/types/prono';
  import { formatDate, formatTime, isPassed } from '$lib/utils/time';
  import { fetchError, fetchStatus, games } from '../store';

  let gamesContent: [Prono, Game][] = [];
  let fetchErrorContent: String = 'loading';
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
    {#if fetchStatusContent > 203}
      <li class="flex flex-row items-center justify-between bg-col1 text-col4 py-2 px-5 rounded">
        <p class="font-bold">Erreur {fetchStatusContent}</p>
        <p>{fetchErrorContent}</p>
      </li>
    {:else}
      {#each gamesContent as content}
        <li class="flex flex-row justify-between w-full gap-5 h-full items-center py-3 shadow-xl border px-3">
          <div class="flex flex-row gap-10 justify-between w-1/4 text-lg pr-24">
            <p>{formatDate(content[1].time)}</p>
            <p>{formatTime(content[1].time)}</p>
          </div>
          <div class="flex flex-row text-2xl gap-5 h-full items-center justify-between w-2/5">
            <p class="w-1/3">{content[1].team_home.toUpperCase()}</p>
            <div class="flex flex-row justify-center gap-5 w-1/5">
              <input
                type="text"
                class="w-7 bg-col1 text-col4 rounded text-center"
                placeholder={content[0] ? content[0].prediction_home.toString() : '...'}
                disabled={isPassed(content[1].time)} />
              <input
                type="text"
                class="w-7 bg-col1 text-col4 rounded text-center"
                placeholder={content[0] ? content[0].prediction_away.toString() : '...'}
                disabled={isPassed(content[1].time)} />
            </div>
            <p class="w-1/3 text-right">{content[1].team_away.toUpperCase()}</p>
          </div>
          <div class="flex flex-row justify-end w-1/4 gap-5">
            <p class="text-lg">{content[1].stage}</p>
            <div class="flex flex-row gap-1">
              <p class="text-xl border-2">{content[1].odds_home}</p>
              <p class="text-xl border-2">{content[1].odds_draw}</p>
              <p class="text-xl border-2">{content[1].odds_away}</p>
            </div>
          </div>
        </li>
      {/each}
    {/if}
  </ul>
</div>
