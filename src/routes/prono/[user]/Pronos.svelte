<script lang="ts">
	import { page } from '$app/stores';
	import type { Game } from '$lib/types/game';
	import type { Prono } from '$lib/types/prono';
	import type { ResponseResult } from '$lib/types/returnable';
	import { onMount } from 'svelte';
	import GamesDisplay from '../../components/Games/GamesDisplay.svelte';
	import { getGames } from '../../fetchGames';
	import { selected_competition } from '../../store';

	let games: ResponseResult<[Prono, Game][]> = {
		status: undefined!,
		text: 'LOADING',
		data: []
	};

	onMount(async () => {
		const user = $page.params.user;
		games = await getGames($selected_competition, user);
	});

	export let showFilter: boolean;
</script>

<div class="h-full">
	<GamesDisplay bind:showFilter {games} />
</div>
