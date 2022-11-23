<script lang="ts">
    import { UserType, type RankedUser } from '$lib/types/player';

    export let player: RankedUser;
</script>

<li
    class={`flex flex-row justify-between items-center w-full px-5 py-3 m6:py-1 shadow-xl border ${
        player.user_type === UserType.Current ? 'bg-slate-300 dark:bg-slate-600' : ''
    }`}>
    <p class="text-primary dark:text-secondary w-[10%] m6:text-base h-full text-xl">{player.rank}</p>
    <p class="text-primary dark:text-secondary w-[52%] m6:text-base h-full text-xl truncate">{player.name}</p>
    <p class="text-primary dark:text-secondary w-[15%] m6:text-base h-full text-xl text-left pl-[4%] m12:hidden">{player.user_score.results_perfect}</p>
    <p class="text-primary dark:text-secondary w-[15%] m6:text-base h-full text-xl text-left pl-[4%] m12:hidden">{player.user_score.results_good}</p>
    <p class="text-primary dark:text-secondary w-[8%] m6:text-base h-full text-xl text-left pl-[4%]">{player.user_score.score}</p>
</li>
