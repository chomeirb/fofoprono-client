<script lang="ts">
	import { getQueryParamsStore } from '../../queryParamsStore';
	import type { Game } from '$lib/types/game';
	import type { Prediction, PronoResult } from '$lib/types/prono';
	import { sysTimeToDate } from '$lib/utils/display';
	import PronoDisplay from './Game.svelte';
	import Filter from './GamesFilter.svelte';
	import type { ResponseResult } from '$lib/types/returnable';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import FilterPopup from '../Popup/GameFilter.svelte';
	export let games: ResponseResult<[PronoResult, Game][]>;
	export let inputs: Record<number, [number, number]> = {};

	export let showFilter: boolean;

	function hideFilter() {
		showFilter = false;
	}

	let queryTeam = getQueryParamsStore('team');
	let queryStage = getQueryParamsStore('stage');
	let queryFrom = getQueryParamsStore('from');
	let queryTo = getQueryParamsStore('to');

	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() - 1);
	const date = currentDate.toISOString().split('T')[0];

	$: if (!$queryFrom) $queryFrom = date;

	$: filtered = games.data
		.filter(([, game]) => game.team_home.concat(' ', game.team_away).toUpperCase().includes($queryTeam.toUpperCase()))
		.filter(([, game]) => game.stage == $queryStage || $queryStage == '')
		.filter(([, game]) => $queryFrom === '' || sysTimeToDate(game.time) >= new Date($queryFrom))
		.filter(([, game]) => $queryTo === '' || sysTimeToDate(game.time) <= new Date($queryTo));
</script>

<div class="grid h-full w-full grid-cols-20-80 m12:flex m12:flex-col m12:items-center">
	<div class="w-full m12:hidden">
		<Filter bind:queryTeam bind:queryStage bind:queryFrom bind:queryTo requiredFrom={$queryFrom === date} />
	</div>
	{#if games.text === 'LOADING'}
		<div class="mt-4 flex h-full w-full place-content-center items-center overflow-y-auto shadow-in m12:overflow-x-hidden m8:mt-0">
			<p>Loading...</p>
		</div>
	{:else if games.text !== 'OK'}
		<div class="mt-4 flex h-full w-full place-content-center items-center overflow-y-auto shadow-in m12:overflow-x-hidden m8:mt-0">
			<div class="justify-between rounded bg-primary py-2 px-5 text-secondary dark:bg-secondary dark:text-primary">
				<p class="font-bold">Aucun pronostique</p>
				<p>
					Problème rencontré lors du chargement: Code {games.status}<br />
					{games.text}
				</p>
			</div>
		</div>
	{:else}
		<div class="mt-4 flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden rounded-md shadow-in m8:mt-0">
			<ul class="flex h-full w-full flex-col gap-2 px-5 pt-4 m8:px-2">
				{#each filtered as [prono, game] (game.id)}
					<div animate:flip={{ duration: 500 }} in:fade>
						<PronoDisplay {prono} {game} bind:input={inputs[game.id]} />
					</div>
					{/each}
					<div class="mt-4">&nbsp;</div>
			</ul>
		</div>
	{/if}
</div>

{#if showFilter}
	<FilterPopup hideFunction={hideFilter} bind:queryTeam bind:queryStage bind:queryFrom bind:queryTo requiredFrom={$queryFrom === date} />
{/if}
