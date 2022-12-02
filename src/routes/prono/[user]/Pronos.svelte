<script lang="ts">
	import { page } from '$app/stores';
	import type { Game } from '$lib/types/game';
	import type { PronoResult } from '$lib/types/prono';
	import type { ResponseResult } from '$lib/types/returnable';
	import { onMount } from 'svelte';
	import GamesDisplay from '../../components/Games/GamesDisplay.svelte';
	import { getGames } from './fetchPronos';

	let games: ResponseResult<[PronoResult, Game][]> = {
		status: undefined!,
		text: 'LOADING',
		data: []
	};

	onMount(async () => {
		const user = $page.params.user;
		games = await getGames(user);
	});
</script>

<div class="h-full">
	<GamesDisplay pronoMode={true} {games} />
</div>
