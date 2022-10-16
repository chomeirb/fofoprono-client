<script lang="ts">
  import { formatDate, formatTime } from "$lib/utils/time";
  import { fetchError, fetchStatus, games } from "../store";
  import type { Game } from "$lib/types/game";
  import type { Prono } from "$lib/types/prono";

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
    {#if fetchErrorContent !== ""}
      <li
        class="flex flex-row items-center justify-between bg-col1 text-col4 py-2 px-5 rounded"
      >
        <p class="font-bold">Aucun match</p>
        <p>Problème rencontré lors du chargement: {fetchErrorContent}</p>
      </li>
    {:else if gamesContent.length === 0}
      <li
        class="flex flex-row items-center justify-between bg-col1 text-col4 py-2 px-5 rounded"
      >
        <p class="font-bold">Aucun match</p>
        <p>Il n'y a aucun match</p>
      </li>
    {:else}
      {#each gamesContent as content}
        <li
          class="flex flex-row justify-between w-full gap-5 h-full items-center py-3 shadow-xl border px-3"
        >
          <div class="flex flex-row gap-10 justify-between w-1/4 text-lg pr-24">
            <p>{formatDate(content[1].time)}</p>
            <p>{formatTime(content[1].time)}</p>
          </div>
          <div
            class="flex flex-row text-2xl gap-5 h-full items-center justify-between w-2/5"
          >
            <p class="w-1/3">{content[1].team_home.toUpperCase()}</p>
            <div class="flex flex-row justify-center gap-5 w-1/5">
              <p class="w-7 bg-col1 text-col4 rounded text-center">
                {content[1].score_home || content[1].score_home == 0
                  ? content[1].score_home
                  : ""}
              </p>
              <p class="w-7 bg-col1 text-col4 rounded text-center">
                {content[1].score_away || content[1].score_away == 0
                  ? content[1].score_away
                  : ""}
              </p>
            </div>
            <p class="w-1/3 text-right">{content[1].team_away.toUpperCase()}</p>
          </div>
          <div class="flex flex-row justify-end w-1/4">
            <p class="text-lg">{content[1].stage}</p>
          </div>
        </li>
      {/each}
    {/if}
  </ul>
</div>
