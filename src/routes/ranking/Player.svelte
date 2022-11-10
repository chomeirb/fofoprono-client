<script lang="ts">
    import type { RankedUser } from "$lib/types/player";

    export let player: RankedUser;
    export let rank: number;

    console.log(player);
</script>

<li class="flex flex-row justify-between items-center w-full h-[50px] px-5 shadow-xl border">
    <p class="text-primary dark:text-secondary w-1/6 text-xl">{rank}</p>
    <p class="text-primary dark:text-secondary w-5/6 text-xl">{player.name}</p>
    <p class="text-primary dark:text-secondary w-1/4 text-xl text-right">{player.user_score.results_perfect}</p>
    <p class="text-primary dark:text-secondary w-1/4 text-xl text-right">{player.user_score.results_good}</p>
    <p class="text-primary dark:text-secondary w-1/4 text-xl text-right">{player.user_score.score}</p>
  </li>