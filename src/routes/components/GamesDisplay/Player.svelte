<script lang="ts">
    import { UserType, type RankedUser } from '$lib/types/player';

    export let player: RankedUser;
</script>

<a
    class={`flex flex-row justify-between items-center w-full px-5 py-3 m6:py-1 shadow-xl border-2 rounded-md border-primary dark:border-secondary hover:opacity-60 ${
        player.user_type === UserType.Current ? 'bg-slate-300 dark:bg-slate-600' : ''
    }`}
    href="/prono/{player.name}">
    <p class="text-primary dark:text-secondary w-[10%] m6:text-base h-full text-xl">{player.rank}</p>
    <p class="text-primary dark:text-secondary w-[60%] m6:text-base h-full text-xl truncate">{player.name}</p>
    <p class="text-primary dark:text-secondary w-[17%] m6:text-base h-full text-xl text-left m12:hidden">{player.results_perfect}</p>
    <p class="text-primary dark:text-secondary w-[16%] m6:text-base h-full text-xl text-left m12:hidden">{player.results_good}</p>
    <p class="text-primary dark:text-secondary w-[7%] m6:text-base h-full text-xl text-left">{player.score}</p>
</a>
