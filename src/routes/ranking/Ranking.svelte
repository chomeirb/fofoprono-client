<script lang="ts">
  import PlayerDisplay from './Player.svelte';
  import { getQueryParamsStore } from './store';
  import type { RankedUser } from '$lib/types/player';
  import Filter from './Filter.svelte';
  import { getPlayers } from './fetchPlayers';
  import { onMount } from 'svelte';
  import RankingBanner from './RankingBanner.svelte';

  let orderedPlayers: RankedUser[] = [];
  let playerFilter: Boolean[] = [];
  let queryPlayer = getQueryParamsStore('player', localStorage.getItem('player') || '');

  let currentSortLabel = 'score';
  let currentSortOrder = 'asc';

  onMount(async () => {
    orderedPlayers = await getPlayers();
    sortPlayers('score');
    orderedPlayers = orderedPlayers.map((player, index, players) => {
      if (players[index - 1]?.user_score.score == player.user_score.score) {
        player.rank = players[index - 1].rank;
      } else {
        player.rank = index + 1;
      }
      return player;
    });
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
      return orderedPlayers.map((player) =>
        queryPlayersArray.reduce((acc, current) => acc || (player.name.toUpperCase().includes(current.toUpperCase()) && current !== ''), false)
      );
    }
  }

  // Sort the players
  function sortPlayers(label: string) {
    currentSortOrder = currentSortLabel === label ? (currentSortOrder === 'asc' ? 'desc' : 'asc') : 'desc';
    currentSortLabel = label;

    orderedPlayers = orderedPlayers.sort((a, b) => {
      if (currentSortLabel === 'rank') {
        return currentSortOrder === 'asc' ? b.rank - a.rank : a.rank - b.rank;
      } else if (currentSortLabel === 'name') {
        return currentSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (currentSortLabel === 'perfect') {
        return currentSortOrder === 'asc'
          ? a.user_score.results_perfect - b.user_score.results_perfect
          : b.user_score.results_perfect - a.user_score.results_perfect;
      } else if (currentSortLabel === 'good') {
        return currentSortOrder === 'asc' ? a.user_score.results_good - b.user_score.results_good : b.user_score.results_good - a.user_score.results_good;
      } else {
        return currentSortOrder === 'asc' ? a.user_score.score - b.user_score.score : b.user_score.score - a.user_score.score;
      }
    });
  }
</script>

<div class="w-full grid grid-cols-20-80 m8:flex m8:flex-col m8:items-center">
  <Filter bind:queryPlayer />
  <div class="flex flex-col items-center justify-center mt-4 w-full h-[60vh] m8:h-[50vh] shadow-in">
    <RankingBanner sortingFunction={sortPlayers} currentSortLabel={currentSortLabel} currentSortOrder={currentSortOrder}/>
    <ul class="w-full px-5 h-full flex flex-col gap-3 pt-4 overflow-y-scroll">
      {#each orderedPlayers as player, index}
        {#if playerFilter[index]}
          <PlayerDisplay player={player} />
        {/if}
      {/each}
    </ul>
  </div>
</div>
