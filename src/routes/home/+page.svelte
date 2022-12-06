<script>
	import { slide } from '$lib/utils/effects';
	import { curtain } from '../store';
	import Games from './Games.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-start">
	{#if $curtain}
		<div
			id="welcome"
			class="absolute z-10 flex h-[calc(100vh_-_180px)] w-full flex-row items-center  justify-between bg-gradient-to-bl from-primary to-black text-secondary duration-500 dark:bg-secondary m12:hidden">
			<p class="ml-10 text-center text-6xl font-bold">Bienvenue sur FOFOPRONO, le site de pronostics de la coupe du monde 2022!</p>
			<button class="h-full w-[20%] rounded py-2 px-5 text-8xl" on:mouseenter={slide(-10, 'welcome')} on:mouseleave={slide(0, 'welcome')} on:click={slide(-100, 'welcome')}> →</button>
		</div>
	{/if}
	<div class="flex h-full w-full flex-col items-center justify-start pt-3 m8:pt-0" on:mouseenter={slide(-100, 'welcome')}>
		<div class="flex h-[10%] w-full max-w-8xl flex-row items-center justify-between px-3 text-4xl m12:flex-col m12:justify-center m12:gap-5 m12:text-2xl m8:h-[8%]">
			<p class="font-bold text-primary dark:text-secondary">CALENDRIER/RÉSULTATS</p>
			<a href="/prono" class="button  m12:hidden m12:text-lg">Pronostiquer →</a>
		</div>
		<div class="h-[83%] w-full max-w-8xl px-3 m12:px-0">
			<Games />
		</div>
	</div>
</div>
