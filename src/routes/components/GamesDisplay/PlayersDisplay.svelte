<script lang="ts">
    import { getQueryParamsStore } from '../../queryParamsStore';
    import PlayerDisplay from './Player.svelte';
    import Filter from './PlayersFilter.svelte';
    import RankingBanner from './PlayersBanner.svelte';
    import { SortType } from '$lib/types/sort';
    import type { ResponseResult } from '$lib/types/returnable';
    import type { RankedUser } from '$lib/types/player';

    export let players: ResponseResult<RankedUser[]>;

    let sortType = SortType.Score;
    let sortAsc = false;

    let queryPlayers = getQueryParamsStore('player');
    queryPlayers.set(localStorage.getItem('player') || '');

    $: localStorage.setItem('player', $queryPlayers);

    $: names = $queryPlayers
        .split(',')
        .map((name: string) => name.trim())
        .filter((name: string) => name !== '');

    $: filteredSorted = players.data
        .filter((player) => names.length == 0 || names.find((val: string) => player.name.includes(val)) !== undefined)
        .sort((player1, player2) => {
            switch (sortType) {
                case SortType.Score:
                    return player2.score - player1.score;
                case SortType.Perfect:
                    return player2.results_perfect - player1.results_perfect;
                case SortType.Correct:
                    return player2.results_good - player1.results_good;
                case SortType.Name:
                    return player1.name.localeCompare(player2.name);
            }
        })
        .sort(() => (sortAsc ? 1 : 0));
</script>

<div class="w-full h-full flex flex-row m12:flex m12:flex-col m12:items-center">
    <Filter bind:queryPlayers />
    {#if players.text === 'LOADING'}
        <div class="w-full h-full m12:overflow-x-hidden mt-4 m8:mt-0 m8:border-t overflow-y-auto shadow-in items-center flex place-content-center">
            <p>Loading...</p>
        </div>
    {:else if players.text !== 'OK'}
        <div class="w-full h-full m12:overflow-x-hidden mt-4 m8:mt-0 m8:border-t overflow-y-auto shadow-in items-center flex place-content-center">
            <div class="justify-between bg-primary dark:bg-secondary text-secondary dark:text-primary py-2 px-5 rounded">
                <p class="font-bold">Aucun pronostique</p>
                <p>
                    Problème rencontré lors du chargement: Code {players.status}<br />
                    {players.text}
                </p>
            </div>
        </div>
    {:else}
        <div class="flex flex-col h-full overflow-hidden mt-4 m8:mt-0 w-5/6 m12:w-full">
            <RankingBanner bind:sortType bind:sortAsc />
            <div class="flex flex-col items-center w-full m12:h-full overflow-y-auto shadow-in">
                <ul class="w-full px-5 h-full flex flex-col gap-3 py-4">
                    {#each filteredSorted as player}
                        <PlayerDisplay {player} />
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
</div>
