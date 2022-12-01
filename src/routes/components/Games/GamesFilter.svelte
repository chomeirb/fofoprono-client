<script>
	import { Stage } from '$lib/types/game';
	import { displayStage } from '$lib/utils/display';

	export let queryTeam;
	export let queryStage;
	export let queryFrom;
	export let queryTo;
</script>

<div class="mt-4 flex h-min w-[90%] flex-col justify-start gap-3 rounded-md px-4 py-5 shadow-in m12:mt-0 m12:w-full m12:flex-row m12:justify-around m12:px-1 m12:py-2 m12:text-base">
	<div class="flex w-full flex-col i2:w-[20%] i3:w-[20%] m8:w-12 m8:text-xs">
		<label for="from">Du</label>
		<input id="from" type="date" class="h-10 w-full rounded bg-primary px-3 py-1 text-secondary dark:shadow-sm-light m8:text-lg" bind:value={$queryFrom} />
	</div>
	<div class="flex w-full flex-col i2:w-[20%] i3:w-[20%] m8:w-12 m8:text-xs">
		<label for="to">Au</label>
		<input id="to" type="date" class="h-10 w-full rounded bg-primary px-3 py-1 text-secondary dark:shadow-sm-light m8:text-lg" bind:value={$queryTo} />
	</div>
	<div class="flex w-full flex-col m12:w-[20%] m8:w-[33%] m8:text-xs">
		<label for="team">Équipe</label>
		<input id="team" type="text" class="h-10 w-full rounded bg-primary px-3 py-1 text-secondary dark:shadow-sm-light" bind:value={$queryTeam} />
	</div>
	<div class="flex w-full flex-col m12:w-[20%] m8:w-[25%] m8:text-xs">
		<label for="stage">Étape</label>
		<select id="stage" type="text" class="h-10 w-full rounded bg-primary px-3 py-1 text-secondary dark:shadow-sm-light" bind:value={$queryStage}>
			<option value="">Tous</option>
			{#each Object.values(Stage) as stage}
				<option value={stage}>{displayStage(stage)}</option>
			{/each}
		</select>
	</div>
</div>
