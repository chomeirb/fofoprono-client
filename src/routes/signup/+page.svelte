<script lang="ts">
	import Form from './Form.svelte';

	let result = '';
</script>

<div class="flex h-full w-full flex-col items-center justify-start pt-[3%]">
	<div class="flex h-[10%] w-full max-w-xl flex-row items-center text-4xl m12:justify-center">
		<p class="font-bold">INSCRIPTION</p>
	</div>
	<div class="flex w-full max-w-xl flex-col items-center gap-5 overflow-auto rounded-xl py-8 px-20 text-2xl shadow-in m12:w-full m12:px-5">
		<Form bind:result />
		<p class="rounded px-5 text-center text-3xl font-bold">{result}</p>
		<a href="/login" class="rounded px-5 text-center text-xl underline hover:opacity-70">Déjà un compte ?</a>
	</div>
</div>
