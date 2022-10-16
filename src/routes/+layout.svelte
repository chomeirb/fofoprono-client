<script>
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { onMount } from 'svelte';
	import { getGames } from './fetchGames';

	onMount(async () => {
		getGames();
	});
</script>

<div class="flex flex-col h-[100vh]">
	<Header />

	<main class="h-full">
		<slot />
	</main>

	<Footer />
</div>
