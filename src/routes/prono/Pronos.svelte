<script lang="ts">
  import { goto } from '$app/navigation';
  import { displayStage, type Game } from '$lib/types/game';
  import type { Prediction, PronoResult } from '$lib/types/prono';
  import { fetchError, fetchStatus, games } from '../store';
  import PronoC from '../Prono.svelte';

  let inputs: [number, number][] = [];

  let submitPronos: Prediction[] = [];
  let removePronos: Prediction[] = [];

  let teamFilter: boolean[] = [];
  let stageFilter: boolean[] = [];

  // fetchError.set('loading')

  games.subscribe((value: [PronoResult, Game][]) => {
    inputs = value.map(() => [null!, null!]);

    submitPronos = value.map(() => null!);
    removePronos = value.map(() => null!);

    // Force update store queries when games are loaded
    goto(window.location.href);
  });

  export let queryTeam;
  export let queryStage;

  queryTeam.subscribe((team: string) => {
    teamFilter = $games.map(([, game]) => game.team_home.concat(' ', game.team_away).toUpperCase().includes(team.toUpperCase()));
  });

  queryStage.subscribe((stage: string) => {
    stageFilter = $games.map(([, game]) => displayStage(game.stage).toUpperCase().includes(stage.toUpperCase()));
  });

  const submit = async () => {
    const toSubmit = submitPronos.filter((element) => {
      return element !== null;
    });

    const toDelete = removePronos.filter((element) => {
      return element !== null;
    });

    const res_s = await fetch('/api/prono', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSubmit),
    });

    const res_d = await fetch('/api/prono', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toDelete),
    });

    if (res_s.ok && res_d.ok) {
      window.location.href = '/prono';
    }
  };
</script>

<form id="Pronos" on:submit|preventDefault={submit}>
  <div class="flex flex-col items-center justify-center mb-3 w-full">
    <ul class="w-[95%] flex flex-col gap-3 pt-4">
      {#if $fetchError !== ''}
        <li class="flex flex-row items-center justify-between bg-col1 text-col4 py-2 px-5 rounded">
          <p class="font-bold">Aucun pronostique</p>
          <p>
            Problème rencontré lors du chargement: {$fetchStatus}
            {$fetchError}
          </p>
        </li>
      {:else}
        {#each $games as [fetchedProno, fetchedGame], index}
          {#if teamFilter[index] && stageFilter[index]}
            <PronoC pronoMode={true} fetchedProno={fetchedProno} fetchedGame={fetchedGame} bind:prono={submitPronos[index]} bind:remove={removePronos[index]} />
          {/if}
        {/each}
      {/if}
    </ul>
  </div>
</form>
