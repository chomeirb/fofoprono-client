<script lang="ts">
  import PlayerDisplay from './Player.svelte';
  import { getQueryParamsStore } from './store';
  import type { RankedUser } from '$lib/types/player';
  import Filter from './Filter.svelte';
  import { getPlayers } from './fetchPlayers';
  import { onMount } from 'svelte';

  let orderedPlayers: RankedUser[] = [];
  let playerFilter: Boolean[] = [];
  let queryPlayer = getQueryParamsStore('player', localStorage.getItem('player') || '');

  onMount(async () => {
    orderedPlayers = await getPlayers();
    playerFilter = filterPlayers($queryPlayer);
  });


  queryPlayer.subscribe((players: string) => {
    localStorage.setItem('player', players);
    playerFilter = filterPlayers(players);
  });

  function filterPlayers(players: string): boolean[] {
    if (players == '') {
      return orderedPlayers.map(() => true);
    } else {
      let queryPlayersArray = players.split(',').map((player) => player.trim());
      return orderedPlayers.map((player) => queryPlayersArray.reduce((acc, current) => acc || player.name.toUpperCase().includes(current.toUpperCase()) && current !== '', false));
    }
  }

</script>

<div class="w-full grid grid-cols-20-80">
  <Filter bind:queryPlayer />
  <div class="flex flex-col items-center justify-center mt-4 mb-10 w-full h-[60vh] overflow-y-scroll shadow-in">
    <ul class="w-[95%] h-full flex flex-col gap-3 pt-4">
      {#each orderedPlayers as player, index}
        {#if playerFilter[index]}
          <PlayerDisplay player={player} rank={index + 1} />
        {/if}
      {/each}
    </ul>
  </div>
</div>
