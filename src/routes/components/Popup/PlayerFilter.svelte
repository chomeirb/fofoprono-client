<script lang="ts">
	import { PUBLIC_API_URL } from '$env/static/public';
	import type { Unsubscriber } from 'svelte/store';
	import Filter from '../Ranking/PlayersFilter.svelte';
	import Checkmark from '../icons/Checkmark.svelte';

	export let hideFunction: () => void;

	export let queryPlayers: { subscribe: (cb: Function) => Unsubscriber; set: (value: string) => void; };

	// add a listener to the window to close the popup if the user clicks outside of it
	window.addEventListener('click', (e) => {
		if (e.target === document.getElementById('window') && e.target !== document.getElementById('popup')) {
			hideFunction();
		}
	});
</script>

<div id="window" class="fixed bottom-0 left-0 z-50 flex h-[100vh] w-[100vw] flex-row items-center justify-center bg-primary bg-opacity-50 text-3xl text-secondary m12:text-xl">
	<div
		id="popup"
		class="flex flex-col gap-5 py-8 items-center rounded-3xl border-4 border-primary bg-secondary bg-opacity-100 text-primary shadow-xl dark:border-secondary dark:bg-primary dark:text-secondary m12:w-[90vw]">
    <Filter bind:queryPlayers />
    <button class="button" on:click={hideFunction}>
      <Checkmark height={25} />
    </button>
	</div>
</div>
