<script lang="ts">
	import { SortType } from '$lib/types/sort';

	export let sortType: SortType;
	export let sortAsc: boolean;

	function setSort(type: SortType) {
		if (sortType == type) {
			sortAsc = !sortAsc;
		} else {
			sortType = type;
		}
	}
</script>

<div class="flex h-min w-full flex-row items-center justify-between rounded-md border-[3px] border-primary border-opacity-70 px-10 py-3 shadow-in dark:border-secondary dark:border-opacity-30 m12:px-[5%]">
	<p class="w-[10%] text-xl text-primary dark:text-secondary m12:w-[25%] m6:text-base" title="rang">Rang</p>
	<button class="w-[60%] text-left text-xl text-primary hover:cursor-pointer hover:underline hover:opacity-70 dark:text-secondary m6:text-base" on:click={() => setSort(SortType.Name)}>
		Nom {sortType == SortType.Name ? (sortAsc ? '▲' : '▼') : ''}
	</button>
	<button
		class="w-[17%] text-left text-xl text-primary hover:cursor-pointer hover:underline hover:opacity-70 dark:text-secondary m12:hidden m6:text-base"
		title="Scores exacts trouvé"
		on:click={() => setSort(SortType.Perfect)}>
		Exact {sortType == SortType.Perfect ? (sortAsc ? '▲' : '▼') : ''}
	</button>
	<button
		class="w-[16%] text-left text-xl text-primary hover:cursor-pointer hover:underline hover:opacity-70 dark:text-secondary m12:hidden m6:text-base"
		title="Bon résulats de matchs trouvés, avec score inexact"
		on:click={() => setSort(SortType.Correct)}>
		Partiel {sortType == SortType.Correct ? (sortAsc ? '▲' : '▼') : ''}
	</button>
	<button
		class="w-[7%] text-left text-xl text-primary hover:cursor-pointer hover:underline hover:opacity-70 dark:text-secondary m12:w-[30%] m12:text-right m6:text-base"
		title="Points"
		on:click={() => setSort(SortType.Score)}>
		Pts {sortType == SortType.Score ? (sortAsc ? '▲' : '▼') : ''}
	</button>
</div>
