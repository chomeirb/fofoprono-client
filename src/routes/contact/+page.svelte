<script lang="ts">
	import Form from './Form.svelte';

	let result = '';
</script>

<div class="flex h-min w-full flex-col items-center justify-start px-3 pt-3 m8:h-full m8:pb-3">
	<div class="flex h-min w-full max-w-5xl flex-col items-center text-4xl m12:justify-center">
		<p class="text-center text-2xl m8:text-lg m6:text-base">Un problème, une suggestion, une remarque&nbsp;?</p>
		<p class="pb-3 text-center text-6xl font-bold m8:text-4xl m6:text-3xl">CONTACTEZ-NOUS!</p>
	</div>
	<div class="flex w-full max-w-5xl flex-col items-center overflow-auto rounded-xl py-8 px-20 text-2xl shadow-in m12:w-full m12:px-5 m8:h-full">
		<Form bind:result />
		{#if result}
			<p class="mt-5 rounded px-5 text-center text-3xl font-bold">{result}</p>
		{/if}
	</div>
</div>
