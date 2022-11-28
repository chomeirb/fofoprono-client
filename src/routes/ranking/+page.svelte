<script>
	import Ranking from './Ranking.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-start pt-3 m8:pt-0">
	<div class="flex h-[10%] w-full max-w-8xl flex-row items-center justify-between px-3 text-4xl m12:px-3 m12:text-xl m8:h-[8%]">
		<p class="font-bold m12:text-xl">CLASSEMENT</p>
	</div>
	<div class="h-[83%] w-full max-w-8xl px-3 m12:mt-2 m12:px-0  m8:mt-0">
		<Ranking />
	</div>
</div>
