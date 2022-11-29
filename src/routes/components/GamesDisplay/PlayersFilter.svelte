<script lang="ts">
	import groups from '$lib/data/groups.json';

	export let queryPlayers;
</script>

<div class="flex w-1/6 m12:w-full">
	<div class="m12:-px-6 mt-4 flex h-min w-[90%] flex-col justify-start gap-3 rounded-md px-4 py-5 shadow-in m12:mt-0 m12:w-full m12:flex-row m12:px-2 m12:py-2">
		<div class="flex w-full flex-col" title="Vous pouvez entrer plusieurs joueurs en les séparant par une virgule">
			<label for="player m6:text-sm">Joueurs</label>
			<input id="player" type="text" class="h-10 w-full rounded bg-primary px-3 py-1 text-secondary dark:bg-secondary dark:text-primary m6:h-6 m6:text-sm" bind:value={$queryPlayers} />
		</div>
		<div class="flex w-full flex-col">
			<label for="stage">Groupe</label>
			<select id="stage" type="text" class="h-10 w-full rounded bg-primary px-3 py-1 text-secondary dark:bg-secondary dark:text-primary m6:h-6 m6:text-sm" bind:value={$queryPlayers}>
				<option value="">Tous</option>
				{#each groups as group}
					<option value={group.queryUsers}>{group.label}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
