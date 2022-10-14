<script>
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="flex flex-col h-[100vh]">
	<Header />

	<main class="h-full">
		<slot />
	</main>

	<Footer />
</div>
