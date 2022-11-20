<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Game } from '$lib/types/game';
  import type { Prediction, PronoResult } from '$lib/types/prono';
  import GamesDisplay from '../GamesDisplay/GamesDisplay.svelte';

  import { fetchError, fetchStatus, games } from '../store';
  import { PUBLIC_API_URL } from '$env/static/public';
    import { isPassed } from '$lib/utils/display';

  let submitPronos: Prediction[] = [];
  let removePronos: Prediction[] = [];

  // fetchError.set('loading')

  games.subscribe((value: [PronoResult, Game][]) => {
    submitPronos = value.map(() => null!);
    removePronos = value.map(() => null!);

    // Force update store queries when games are loaded
    goto(window.location.href);
  });

  const submit = async () => {
    const toSubmit = submitPronos.filter((element, index) => {
      return element !== null && !isPassed($games[index][1].time);
    });

    const toDelete = removePronos.filter((element) => {
      return element !== null;
    });

    const res_s = await fetch(`${PUBLIC_API_URL}/prono`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSubmit),
    });

    const res_d = await fetch(`${PUBLIC_API_URL}/prono`, {
      method: 'DELETE',
      credentials: 'include',
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

<form class="h-full" id="Pronos" on:submit|preventDefault={submit}>
  <div class="flex flex-col items-center justify-center h-full w-full">
    {#if $fetchError !== ''}
      <div class="flex flex-row items-center justify-between bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded">
        <p class="font-bold">Aucun pronostique</p>
        <p>
          Problème rencontré lors du chargement: {$fetchStatus}
          {$fetchError}
        </p>
      </div>
    {:else}
      <GamesDisplay pronoMode={true} games={$games} bind:pronos={submitPronos} />
    {/if}
  </div>
</form>
