<script lang="ts">
	import Checkmark from '../components/icons/Checkmark.svelte';
	import { session } from '../store';
	import Pronos from './Pronos.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-start pt-3 m8:pt-0">
	{#if !$session.data}
		<div class="flex h-full flex-col items-center justify-center gap-10">
			<p class="w-2/3 items-center text-center text-4xl font-bold">Vous devez vous connecter pour effectuer des pronostics !</p>
			<a href="/login" class="rounded-3xl bg-primary bg-opacity-20 p-3 text-3xl font-semibold duration-200 hover:translate-x-5 dark:bg-white dark:bg-opacity-10">Connexion →</a>
		</div>
	{:else}
		<div class="flex h-[10%] w-full max-w-8xl flex-row items-center justify-between px-3 text-4xl m12:px-3 m12:text-xl m8:h-[8%]">
			<p class="font-bold m12:text-xl">PRONOSTIQUER</p>
			<button
				type="submit"
				form="Pronos"
				class="flex flex-row items-center gap-5 rounded-3xl bg-primary bg-opacity-20 py-2 px-5 text-primary duration-300 hover:translate-x-3 dark:bg-white dark:bg-opacity-10 dark:text-secondary">
				<p class="m8:hidden">Valider</p>
				<Checkmark height={25} /></button>
		</div>
		<div class="h-[83%] w-full max-w-8xl px-3 m12:mt-2 m12:px-0 m8:mt-0">
			<Pronos />
		</div>
	{/if}
</div>
