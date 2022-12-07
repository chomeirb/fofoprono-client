<script lang="ts">
	import { getQueryParamsStore } from '../../queryParamsStore';
	import PlayerDisplay from './Player.svelte';
	import Filter from './PlayersFilter.svelte';
	import FilterPopup from '../Popup/PlayerFilter.svelte';
	import RankingBanner from './PlayersBanner.svelte';
	import { SortType } from '$lib/types/sort';
	import type { ResponseResult } from '$lib/types/returnable';
	import type { RankedUser } from '$lib/types/player';

	export let showFilter: boolean;

	function hideFilter() {
		showFilter = false;
	}

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
		.sort((a, b) => {
			const [player1, player2] = sortAsc ? [b, a] : [a, b];
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
		});
</script>

<div class="flex h-full w-full flex-row m12:flex m12:flex-col m12:items-center">
	<div class="flex m12:hidden">
		<Filter bind:queryPlayers />
	</div>
	{#if players.text === 'LOADING'}
		<div class="mt-4 flex h-full w-full place-content-center items-center overflow-y-auto shadow-in m12:overflow-x-hidden m8:mt-0 m8:border-t">
			<p>Loading...</p>
		</div>
	{:else if players.text !== 'OK'}
		<div class="mt-4 flex h-full w-full place-content-center items-center overflow-y-auto shadow-in m12:overflow-x-hidden m8:mt-0 m8:border-t">
			<div class="justify-between rounded bg-primary py-2 px-5 text-secondary dark:bg-secondary dark:text-primary">
				<p class="font-bold">Aucun pronostique</p>
				<p>
					Problème rencontré lors du chargement: Code {players.status}<br />
					{players.text}
				</p>
			</div>
		</div>
	{:else}
		<div class="mt-4 flex h-full w-5/6 flex-col overflow-hidden rounded-md m12:w-full m8:mt-0">
			<RankingBanner bind:sortType bind:sortAsc />
			<div class="flex w-full flex-col items-center overflow-y-auto shadow-in m12:h-full">
				<ul class="flex h-full w-full flex-col gap-3 px-5 py-4">
					{#each filteredSorted as player}
						<PlayerDisplay {player} />
					{/each}
					<div class="mt-20">&nbsp;</div>
				</ul>
			</div>
		</div>
	{/if}
</div>

{#if showFilter}
	<FilterPopup hideFunction={hideFilter} bind:queryPlayers />
{/if}
