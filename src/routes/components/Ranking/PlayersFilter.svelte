<script lang="ts">
	import groups from '$lib/data/groups.json';

	export let queryPlayers;
</script>

<div class="flex m12:justify-center">
	<div class="m12:-px-6 mt-4 flex h-min w-[90%] flex-col justify-start gap-3 rounded-md px-4 py-5 shadow-in">
		<div class="flex w-full flex-col" title="Vous pouvez entrer plusieurs joueurs en les séparant par une virgule">
			<label for="player m6:text-sm">Joueurs</label>
			<input id="player" type="text" class="h-10 w-full rounded bg-primary bg-opacity-20 px-3 py-1 text-primary dark:bg-white dark:bg-opacity-10 dark:text-secondary" bind:value={$queryPlayers} />
		</div>
		<div class="flex w-full flex-col">
			<label for="stage">Groupe</label>
			<select id="stage" type="text" class="h-10 w-full rounded bg-primary bg-opacity-20 px-3 py-1 text-primary dark:bg-white dark:bg-opacity-10 dark:text-secondary" bind:value={$queryPlayers}>
				<option class="bg-primary bg-opacity-20 dark:bg-opacity-90" value="">Tous</option>
				{#each groups as group}
					<option class="bg-primary bg-opacity-20 dark:bg-opacity-90" value={group.queryUsers}>{group.label}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
