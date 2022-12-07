<script lang="ts">
	import { UserType, type RankedUser } from '$lib/types/player';

	export let player: RankedUser;
</script>

<a
	class={`flex w-full flex-row items-center justify-between rounded-md border-2 border-primary border-opacity-70 px-5 py-3 shadow-xl hover:opacity-60 dark:border-secondary dark:border-opacity-70 m6:py-1 ${
		player.user_type === UserType.Current ? 'bg-primary bg-opacity-10 dark:bg-white dark:bg-opacity-10' : ''
	}`}
	href="/prono/{player.name}?from=2022-11-20">
	<p class="h-full w-[10%] text-xl text-primary dark:text-secondary m6:text-base">{player.rank}</p>
	<p class="h-full w-[60%] truncate text-xl text-primary dark:text-secondary m6:text-base">
		{player.name}
	</p>
	<p class="h-full w-[17%] text-left text-xl text-primary dark:text-secondary m12:hidden m6:text-base">
		{player.results_perfect}
	</p>
	<p class="h-full w-[16%] text-left text-xl text-primary dark:text-secondary m12:hidden m6:text-base">
		{player.results_good}
	</p>
	<p class="h-full w-[7%] text-left text-xl text-primary dark:text-secondary m6:text-base">
		{player.score}
	</p>
</a>
