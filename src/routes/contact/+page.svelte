<script lang="ts">
	import Form from './Form.svelte';

	let result = '';
</script>

<div class="flex h-min m8:h-full m8:pb-3 w-full flex-col items-center justify-start px-3 pt-3">
	<div class="flex h-min w-full max-w-5xl flex-col items-center text-4xl m12:justify-center">
		<p class="text-2xl m8:text-lg m6:text-base text-center">Un problème, une suggestion, une remarque&nbsp;?</p>
		<p class="font-bold text-6xl text-center m8:text-4xl m6:text-3xl pb-3">CONTACTEZ-NOUS!</p>
	</div>
	<div class="flex w-full max-w-5xl flex-col items-center overflow-auto rounded-xl m8:h-full py-8 px-20 text-2xl shadow-in m12:w-full m12:px-5">
		<Form bind:result />
		{#if result}
			<p class="rounded px-5 text-center text-3xl font-bold mt-5">{result}</p>
		{/if}
	</div>
</div>
