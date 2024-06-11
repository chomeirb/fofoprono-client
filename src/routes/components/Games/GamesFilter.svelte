<script lang="ts">
	import { Stage } from '$lib/types/game';
	import { displayStage } from '$lib/utils/display';

	export let queryTeam;
	export let queryStage;
	export let queryFrom;
	export let queryTo;

	export let requiredFrom = false;
	export let requiredTo = false;
</script>

<div class="mt-4 flex h-min w-[90%] flex-col justify-start gap-3 rounded-md px-4 py-5 shadow-in">
	<div class="flex w-full flex-col">
		<label for="from">Du</label>
		<input
			id="from"
			type="date"
			class="h-10 w-full rounded bg-primary bg-opacity-20 px-3 py-1 text-primary dark:bg-white dark:bg-opacity-10 dark:text-secondary m8:text-lg"
			bind:value={$queryFrom}
			required={requiredFrom} />
	</div>
	<div class="flex w-full flex-col">
		<label for="to">Au</label>
		<input
			id="to"
			type="date"
			class="h-10 w-full rounded bg-primary bg-opacity-20 px-3 py-1 text-primary dark:bg-white dark:bg-opacity-10 dark:text-secondary"
			bind:value={$queryTo}
			required={requiredTo} />
	</div>
	<div class="flex w-full flex-col">
		<label for="team">Équipe</label>
		<input id="team" type="text" class="h-10 w-full rounded bg-primary bg-opacity-20 px-3 py-1 text-primary dark:bg-white dark:bg-opacity-10 dark:text-secondary" bind:value={$queryTeam} />
	</div>
	<div class="flex w-full flex-col">
		<label for="stage">Étape</label>
		<select id="stage" class="h-10 w-full rounded bg-primary bg-opacity-20 px-3 py-1 text-primary dark:bg-white dark:bg-opacity-10 dark:text-secondary" bind:value={$queryStage}>
			<option class="bg-primary bg-opacity-20 dark:bg-opacity-90" value="">Tous</option>
			{#each Object.values(Stage) as stage}
				<option class="bg-primary bg-opacity-20 dark:bg-opacity-90" value={stage}>{displayStage(stage)}</option>
			{/each}
		</select>
	</div>
</div>
