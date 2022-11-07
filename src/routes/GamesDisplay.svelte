<script lang="ts">
  import type { Game } from '$lib/types/game';
  import type { Prediction, PronoResult } from '$lib/types/prono';
  import { displayStage } from '$lib/utils/display';
  import { getQueryParamsStore } from './prono/store';
  import PronoDisplay from './Prono.svelte';
  import Filter from './Filter.svelte';

  export let pronoMode: boolean;
  export let games: [PronoResult, Game][];
  export let pronos: Prediction[] = null!;
  export let removes: Prediction[] = null!;

  let teamFilter: boolean[] = [];
  let stageFilter: boolean[] = [];

  let queryTeam = getQueryParamsStore('team');
  let queryStage = getQueryParamsStore('stage');

  queryTeam.subscribe((team: string) => {
    teamFilter = games.map(([, game]) => game.team_home.concat(' ', game.team_away).toUpperCase().includes(team.toUpperCase()));
  });

  queryStage.subscribe((stage: string) => {
    stageFilter = games.map(([, game]) => displayStage(game.stage).toUpperCase().includes(stage.toUpperCase()));
  });
</script>

<Filter bind:queryTeam bind:queryStage />
<div class="w-full mt-4 mb-10 overflow-y-scroll h-[60vh] shadow-in items-center flex flex-col">
  <ul class="w-[95%] flex flex-col gap-3 pt-4 items-center pb-6">
  {#each games as [fetchedProno, fetchedGame], index}
    {#if teamFilter[index] && stageFilter[index]}
      {#if pronoMode}
        <PronoDisplay pronoMode fetchedProno={fetchedProno} fetchedGame={fetchedGame} bind:prono={pronos[index]} bind:remove={removes[index]} />
      {:else}
        <PronoDisplay fetchedGame={fetchedGame} />
      {/if}
    {/if}
  {/each}
  </ul>
</div>
