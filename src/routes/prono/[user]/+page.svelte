<script lang="ts">
	import { page } from '$app/stores';
	import Pronos from './Pronos.svelte';
	import Filter from '../../components/icons/Filter.svelte';
	let showFilter = false;
</script>

<div class="flex h-full w-full flex-col items-center justify-start pt-3 m8:pt-0">
	<div class="flex h-[10%] w-full max-w-8xl flex-row items-center justify-between px-3 text-4xl m12:px-3 m12:text-xl m8:h-[8%]">
		<p class="font-bold m12:text-xl">PRONOSTIQUES DE {$page.params.user.toUpperCase()}</p>
		<button class="button hidden m12:flex" on:click={() => showFilter = true} >
			<Filter height={25}/>
		</button>
	</div>
	<div class="h-[83%] m12:h-[92%] w-full max-w-8xl px-3 m12:mt-2 m12:px-0  m8:mt-0">
		<Pronos bind:showFilter/>
	</div>
</div>
