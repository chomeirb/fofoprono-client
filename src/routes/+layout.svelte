<script lang="ts">
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { onMount } from 'svelte';
	import { session } from './store';
	import { storeGames } from './fetchGames';
	import { storeSession } from './fetchSession';
	import { storePlayers } from './fetchRanking';
	import { fade } from 'svelte/transition';

	onMount(() => {
		storeSession();
		storeGames();
		storePlayers();
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

<div class="flex h-[100vh] flex-col font-medium m8:h-[calc(100vh_+_90px)]">
	{#if $session.text !== 'LOADING'}
		<div transition:fade={{ duration: 250 }}>
			<Header />

			<main class="h-[calc(100vh_-_180px)] overflow-y-auto text-primary dark:text-secondary m8:h-[calc(100vh_-_60px)]">
				<slot />
			</main>

			<Footer />
		</div>
	{/if}
</div>
