<script lang="ts">
	import Checkmark from '../components/icons/Checkmark.svelte';
	import LoginArrow from '../components/icons/LoginArrow.svelte';
	import { session } from '../store';
	import Pronos from './Pronos.svelte';
	import Filter from '../components/icons/Filter.svelte';

	let showFilter = false;
</script>

<div class="flex h-full w-full flex-col items-center justify-start overflow-hidden pt-3 m8:pt-0">
	<div class="flex h-[10%] w-full max-w-8xl flex-row items-center justify-between px-3 text-4xl m12:px-3 m12:text-xl m8:h-[8%]">
		<p class="font-bold m12:text-xl">PRONOSTIQUER</p>
		<div class="flex flex-row gap-8 m6:gap-2">
			<button class="button hidden m12:flex" on:click={() => (showFilter = true)}>
				<Filter height={25} />
			</button>
			{#if $session.data}
				<button type="submit" form="Pronos" class="button flex flex-row items-center gap-5">
					<p class="m8:hidden">Valider</p>
					<Checkmark height={25} />
				</button>
			{:else}
				<a href="/login" class="button flex flex-row items-center gap-5">
					<p class="m8:hidden">Pronostiquer</p>
					<LoginArrow height={45} />
				</a>
			{/if}
		</div>
	</div>
	<div class="h-[83%] w-full max-w-8xl px-3 m12:mt-2 m12:h-[92%] m12:px-0 m8:mt-0">
		<Pronos bind:showFilter />
	</div>
</div>
