<script lang="ts">
  import PlayerDisplay from './Player.svelte';
  import { fetchError, fetchStatus, players } from './store';
  import type { RankedUser } from "$lib/types/player";

  let orderedPlayers: RankedUser[];

  players.subscribe((value: RankedUser[]) => {
    orderedPlayers = value;
  });
</script>

<div class="flex flex-col items-center justify-center mb-3 w-full">
  <ul class="w-[95%] flex flex-col gap-3 pt-4">
    {#each $players as player, index}
      <PlayerDisplay player={player} rank={index + 1} />
    {/each}
  </ul>
</div>
