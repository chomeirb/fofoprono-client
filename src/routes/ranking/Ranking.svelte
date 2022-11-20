<script lang="ts">
  import PlayerDisplay from './Player.svelte';
  import { getQueryParamsStore } from './store';
  import type { RankedUser } from '$lib/types/player';
  import Filter from './Filter.svelte';
  import { getPlayers } from './fetchPlayers';
  import { onDestroy, onMount } from 'svelte';
  import RankingBanner from './RankingBanner.svelte';
  import type { Unsubscriber } from 'svelte/store';

  let orderedPlayers: RankedUser[] = [];
  let queryPlayers: {
    subscribe: (cb: Function) => Unsubscriber;
    set: (value: string) => void;
  } = {
    subscribe: () => () => {},
    set: () => {},
  };

  let currentSortLabel = 'score';
  let currentSortOrder = 'asc';

  onMount(async () => {
    queryPlayers = getQueryParamsStore('player', localStorage.getItem('player') || '');
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
    orderedPlayers = filterPlayers($queryPlayers);
  });

  const unsubscribePlayers = queryPlayers.subscribe((players: string) => {
    localStorage.setItem('player', players);
    orderedPlayers = filterPlayers(players);
  });

  function filterPlayers(players: string): RankedUser[] {
    if (players == '') {
      return orderedPlayers.map((player) => {
        player.show = true;
        return player;
      });
    } else {
      let queryPlayersArray = players.split(',').map((player) => player.trim());
      return orderedPlayers.map((player) => {
        player.show = queryPlayersArray.reduce((acc, current) => acc || (player.name.toUpperCase().includes(current.toUpperCase()) && current !== ''), false);
        return player;
      });
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

  onDestroy(() => {
    unsubscribePlayers();
  });
</script>

<div class="w-full h-full flex flex-row m12:flex m12:flex-col m12:items-center">
  <Filter bind:queryPlayers />
  <div class="flex flex-col h-full overflow-hidden mt-4 w-5/6 m12:w-full">
    <RankingBanner sortingFunction={sortPlayers} currentSortLabel={currentSortLabel} currentSortOrder={currentSortOrder} />
    <div class="flex flex-col items-center w-full  h-[93%] m12:h-full overflow-y-auto shadow-in">
      <ul class="w-full px-5 h-full flex flex-col gap-3 py-4">
        {#each orderedPlayers as player}
          {#if player.show}
            <PlayerDisplay player={player} />
          {/if}
        {/each}
      </ul>
    </div>
  </div>
</div>
