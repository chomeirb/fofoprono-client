<script lang="ts">
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { onMount } from 'svelte';
	import { session, competitions, selected_competition, games, players } from './store';
	import { storeGames } from './fetchGames';
	import { storeSession } from './fetchSession';
	import { storePlayers } from './fetchRanking';
	import { storeCompetitions } from './fetchCompetitions';
	import { fade } from 'svelte/transition';
	import * as countries from 'i18n-iso-countries';
	import fr from 'i18n-iso-countries/langs/fr.json';

	onMount(() => {
		storeSession();
		storeCompetitions();
		competitions.subscribe((value) => {
			// If competitions are loading or there is an error, than games and players too.
			if (value.text !== 'OK') {
				games.set({ ...value, data: [] });
				players.set({ ...value, data: [] });
			}
		});

		selected_competition.subscribe((value) => {
			if (value) {
				storeGames(value);
				storePlayers(value);
			}
		});

        countries.registerLocale(fr);
	});
</script>

<head>
	<style>
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		input[type='number'] {
			-moz-appearance: textfield;
		}
	</style>
</head>

<div class="flex h-[100vh] flex-col font-medium">
	{#if $session.text !== 'LOADING' && $competitions.text !== 'LOADING'}
		<div transition:fade={{ duration: 250 }}>
			<Header />

			<main class="h-[calc(100vh_-_180px)] text-primary dark:text-secondary m12:h-[calc(100vh_-_60px)]">
				<slot />
			</main>

			<div class="m12:hidden">
				<Footer />
			</div>
		</div>
	{/if}
</div>
